import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { LoginFormData, LoginResponse } from "./Login.types";

const Login: FunctionComponent = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        username: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: Event) => {
        const target = e.target as HTMLInputElement;

        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

            const response = await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }

            const data: LoginResponse = await response.json();

            // Store token in localStorage
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("token_expiry", (Date.now() + data.expires_in * 1000).toString());

            // Redirect to dashboard or main page
            window.location.href = "/dashboard";
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred... 😱");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-80 space-y-8 p-8 bg-white rounded-lg shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                autocomplete="username"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autocomplete="current-password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
