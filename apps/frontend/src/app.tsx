import { FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import Login from "./pages/Login/Login";
import "./app.css";

const App: FunctionComponent = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem("token");
        const tokenExpiry = localStorage.getItem("token_expiry");

        if (token && tokenExpiry && parseInt(tokenExpiry) > Date.now()) {
            setIsAuthenticated(true);
        } else {
            // Clear invalid tokens
            localStorage.removeItem("token");
            localStorage.removeItem("token_expiry");
        }
    }, []);

    // This will be replaced with your actual application
    // once we implement the course viewing features
    const Dashboard = () => (
        <div className="p-4">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p>You are logged in!</p>
            <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("token_expiry");
                    setIsAuthenticated(false);
                }}
            >
                Logout
            </button>
        </div>
    );

    return <div>{isAuthenticated ? <Dashboard /> : <Login />}</div>;
};

export default App;
