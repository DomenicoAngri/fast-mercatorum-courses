import { FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./app.css";

// TODO: Vedere se inserire una library logger nell'app.
// TODO: inserire module import anche nel FE.

const App: FunctionComponent = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem("access_token");
        const tokenExpiry = localStorage.getItem("expiry_in");

        if (token && tokenExpiry && parseInt(tokenExpiry) > Date.now()) {
            setIsAuthenticated(true);
        } else {
            // Clear invalid tokens
            localStorage.removeItem("access_token");
            localStorage.removeItem("expiry_in");
        }
    }, []);

    // This will be replaced with your actual application
    // once we implement the course viewing features
    // const Dashboard = () => (
    //     <div className="p-4">
    //         <h1 className="text-xl font-bold">Dashboard</h1>
    //         <p>You are logged in!</p>
    //         <button
    //             className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
    //             onClick={() => {
    //                 localStorage.removeItem("access_token");
    //                 localStorage.removeItem("expiry_in");
    //                 setIsAuthenticated(false);
    //             }}
    //         >
    //             Logout
    //         </button>
    //     </div>
    // );

    return <div>{isAuthenticated ? <Dashboard /> : <Login />}</div>;
};

export default App;
