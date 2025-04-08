import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { LoginRequestInterface, LoginResponseInterface } from "./Login.types";

const Login: FunctionComponent = () => {
    const [formData, setFormData] = useState<LoginRequestInterface>({
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

            const responseData: LoginResponseInterface = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || "Login failed.");
            }

            if (responseData && responseData.access_token && responseData.expires_in && responseData.refresh_token) {
                // Store token in localStorage.
                localStorage.setItem("access_token", responseData.access_token);
                localStorage.setItem("refresh_token", responseData.refresh_token);
                localStorage.setItem("expiry_in", (Date.now() + responseData?.expires_in * 1000).toString());
            }

            // Redirect to dashboard or main page.
            window.location.href = "/dashboard";
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred... 😱");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: "rgb(215, 60, 65)" }}>
            {/* Logo */}
            <div className="text-center text-white mb-8">
                <div className="mb-2">
                    <h1 className="text-4xl font-bold">Fast Mercatorum Courses</h1>
                </div>
                <p className="text-lg mt-4">By DA</p>
            </div>

            {/* Login card form */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Accedi alla Piattaforma</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            autoComplete="username"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            placeholder="La tua password qui"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-70"
                            style={{ backgroundColor: "rgb(215, 60, 65)" }}
                        >
                            {isLoading ? "Accesso in corso..." : "Accedi"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
