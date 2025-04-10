import { useState, useCallback } from "preact/hooks";
import { ApiOptionsInterface, UseApiStateInterface, UseApiInterface } from "./useApi.types";

/**
 * A custom hook for making API requests with built-in loading, error, and authentication handling.
 *
 * @template T - The type of data returned by the API
 * @returns An object containing the current state (data, isLoading, error) and functions to interact with the API
 *
 * @example
 * // Basic usage
 * const { data, isLoading, error, fetchData } = useApi<UserProfile>();
 *
 * useEffect(() => {
 *   fetchData('/api/user/profile');
 * }, [fetchData]);
 *
 * @example
 * // With options
 * const { data, fetchData } = useApi<CourseData>();
 *
 * const handleSubmit = async (courseId) => {
 *   await fetchData(`/api/courses/${courseId}`, {
 *     method: 'GET',
 *     timeout: 5000,
 *     headers: {
 *       'Accept': 'application/json'
 *     }
 *   });
 * };
 */
export const useApi = <T = any>(): UseApiInterface<T> => {
    /**
     * State to manage the API request status.
     *
     * - data: The response data from the API.
     * - isLoading: A boolean indicating if the request is in progress.
     * - error: An error message if the request failed.
     */
    const [state, setState] = useState<UseApiStateInterface<T>>({
        data: null,
        isLoading: false,
        error: null,
    });

    // Resets the hook state to its initial values.
    const reset = useCallback(() => {
        setState({
            data: null,
            isLoading: false,
            error: null,
        });
    }, []);

    /**
     * Makes an API request with the given URL and options.
     *
     * Features:
     * - Automatic loading state handling
     * - Timeout support
     * - Authentication token inclusion
     * - Error handling with appropriate messages
     *
     * @param url - The URL to request
     * @param options - Request options including timeout
     * @returns A promise that resolves to the fetched data or null if an error occurred
     */
    const fetchData = useCallback(async (url: string, options: ApiOptionsInterface = {}): Promise<T | null> => {
        const { timeout = 10000, ...fetchOptions } = options;

        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        // Create an AbortController to handle timeout if request takes too long.
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            // Add authentication token if not already specified.
            if (!fetchOptions.headers || !("Authorization" in fetchOptions.headers)) {
                const token = localStorage.getItem("access_token");

                if (token) {
                    fetchOptions.headers = {
                        ...fetchOptions.headers,
                        Authorization: `Bearer ${token}`,
                    };
                }
            }

            // Set the controller signal for fetch.
            const response = await fetch(url, {
                ...fetchOptions,
                signal: controller.signal,
            });

            // Clear the timeout.
            clearTimeout(timeoutId);

            // Handle HTTP errors.
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || `HTTP Error: ${response.status}.`;
                throw new Error(errorMessage);
            }

            // Parse the response body if the request was successful.
            const data = (await response.json()) as T;
            setState({ data, isLoading: false, error: null });

            return data;
        } catch (err) {
            clearTimeout(timeoutId);

            // Handle timeout errors specifically.
            if (err && typeof err === "object" && "name" in err && err.name === "AbortError") {
                const errorMessage = "Request timed out. Please try again.";
                setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
                return null;
            }

            // Other errors.
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred 😱";
            setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));

            return null;
        }
    }, []);

    return {
        ...state,
        fetchData,
        reset,
    };
};

/**
 * A version of useApi that accepts multiple URL and options for parallel API calls.
 *
 * @template T - The type of data array returned by the API calls (tuple)
 * @returns Functions to make parallel requests and the current state
 *
 * @example
 * // Basic usage with two API calls
 * const { data, isLoading, fetchParallel } = useParallelApis<[UserData, CourseData]>();
 *
 * useEffect(() => {
 *   fetchParallel([
 *     { url: '/api/user' },
 *     { url: '/api/courses/recent' }
 *   ]);
 * }, [fetchParallel]);
 *
 * // Access the results
 * const userData = data ? data[0] : null;
 * const courseData = data ? data[1] : null;
 */
export const useParallelApis = <T extends any[] = any[]>() => {
    const [state, setState] = useState<{
        data: T | null;
        isLoading: boolean;
        error: string | null;
    }>({
        data: null,
        isLoading: false,
        error: null,
    });

    /**
     * Executes multiple API calls in parallel.
     *
     * @param requests - Array of {url, options} objects for each request
     * @returns A promise that resolves to an array of all call results, or null if an error occurred
     */
    const fetchParallel = useCallback(async (requests: { url: string; options?: ApiOptionsInterface }[]): Promise<T | null> => {
        if (!requests.length) return null;

        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        const token = localStorage.getItem("access_token");

        try {
            // Prepare all promises with the same logic as fetchData
            const promises = requests.map(({ url, options = {} }) => {
                const { timeout = 10000, ...fetchOptions } = options;

                // Add authentication token if not already present
                if (!fetchOptions.headers || (!("Authorization" in fetchOptions.headers) && token)) {
                    fetchOptions.headers = {
                        ...fetchOptions.headers,
                        Authorization: `Bearer ${token}`,
                    };
                }

                // Create an AbortController for timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeout);

                return fetch(url, {
                    ...fetchOptions,
                    signal: controller.signal,
                })
                    .then((response) => {
                        clearTimeout(timeoutId);

                        if (!response.ok) {
                            return response
                                .json()
                                .then((errorData) => {
                                    throw new Error(errorData.message || `HTTP Error: ${response.status}`);
                                })
                                .catch(() => {
                                    throw new Error(`HTTP Error: ${response.status}`);
                                });
                        }

                        return response.json();
                    })
                    .catch((err) => {
                        clearTimeout(timeoutId);
                        throw err;
                    });
            });

            // Execute all promises in parallel
            const results = (await Promise.all(promises)) as T;
            setState({ data: results, isLoading: false, error: null });
            return results;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
            setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));

            if (errorMessage.includes("401") || errorMessage.includes("403")) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("expiry_in");
                window.location.href = "/";
            }

            return null;
        }
    }, []);

    return {
        ...state,
        fetchParallel,
    };
};
