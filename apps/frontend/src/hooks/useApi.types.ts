/**
 * Extended options for API requests, including standard fetch options and a timeout.
 */
export interface ApiOptionsInterface extends RequestInit {
    // Request timeout in milliseconds. Default is 10000ms (10 seconds).
    timeout?: number;
}

/**
 * The state for the useApi hook, including data response, loading state, or error message.
 *
 * @template T - The type of data returned by the API.
 */
export interface UseApiStateInterface<T> {
    // The data returned by the API, or null if not yet loaded.
    data: T | null;

    // Whether the API request is currently in progress.
    isLoading: boolean;

    // Error message if the request failed, or null if no error.
    error: string | null;
}

/**
 * Interface for useApi hook, return the methods that hook provides.
 *
 * @template T - The type of data returned by the API.
 */
export interface UseApiInterface<T> extends UseApiStateInterface<T> {
    /**
     * Function to make an API request with the given URL and options
     *
     * @param url - The URL to request
     * @param options - Request options including timeout
     * @returns A promise that resolves to the fetched data or null if an error occurred
     */
    fetchData: (url: string, options?: ApiOptionsInterface) => Promise<T | null>;

    // Function to reset the hook state to its initial values.
    reset: () => void;
}
