import { FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useParallelApis } from "../../hooks/useApi";
import { UserProfileResponseInterface, CoursesToCompleteResponseInterface, CareerResponseInterface } from "./Dashboard.types";
// import UserInfo from "./dashboard/UserInfo";
// import LastCourse from "./dashboard/LastCourse";
// import CourseSearch from "./dashboard/CourseSearch";
// import { UserInfoData, CourseData } from "../types/dashboard.types";

const Dashboard: FunctionComponent = () => {
    const { data, isLoading, error, fetchParallel } =
        useParallelApis<[UserProfileResponseInterface, CoursesToCompleteResponseInterface, CareerResponseInterface]>();

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    const userProfileApiUrl = `${apiUrl}/student/info`;
    const coursesToCompleteApiUrl = `${apiUrl}/student/video-lessons/getCourses/tocomplete`;
    const careerApiUrl = `${apiUrl}/student/home/gr/pds-stats`;

    // const [userInfo, setUserInfo] = useState<UserInfoData | null>(null);
    // const [lastCourse, setLastCourse] = useState<CourseData | null>(null);

    useEffect(() => {
        fetchParallel([{ url: userProfileApiUrl }, { url: coursesToCompleteApiUrl }, { url: careerApiUrl }]);

        console.log(data);

        // const fetchDashboardData = async () => {
        //     setIsLoading(true);
        //     try {
        //         const token = localStorage.getItem("access_token");
        //         if (!token) {
        //             throw new Error("No authentication token found.");
        //         }
        //         // Fetch user info
        //         const userResponse = await fetch(`${apiUrl}/user/info`, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         });
        //         // Fetch last course
        //         const lastCourseResponse = await fetch(`${apiUrl}/course/last-viewed`, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         });
        //         if (!userResponse.ok) {
        //             throw new Error("Failed to fetch user info.");
        //         }
        //         if (!lastCourseResponse.ok) {
        //             throw new Error("Failed to fetch last course.");
        //         }
        //         const userData = await userResponse.json();
        //         const lastCourseData = await lastCourseResponse.json();
        //         setUserInfo(userData);
        //         setLastCourse(lastCourseData);
        //     } catch (err) {
        //         setError(err instanceof Error ? err.message : "An unknown error occurred.");
        //         // If authentication error, redirect to login
        //         if (err instanceof Error && err.message.includes("authentication")) {
        //             localStorage.removeItem("access_token");
        //             localStorage.removeItem("refresh_token");
        //             localStorage.removeItem("expiry_in");
        //             window.location.href = "/";
        //         }
        //     } finally {
        //         setIsLoading(false);
        //     }
        // };
        // fetchDashboardData();
    }, [fetchParallel]);

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("expiry_in");

        // Redirect to login page
        window.location.href = "/";
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-mercatorum">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-gray-800 text-lg">Caricamento in corso...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-mercatorum">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-red-600 font-bold">Errore:</p>
                    <p className="text-gray-800">{error}</p>
                    <button onClick={handleLogout} className="mt-4 px-4 py-2 text-white rounded-md bg-mercatorum">
                        Torna al login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {" "}
            sono in dashboard
            <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("expiry_in");
                }}
            >
                Logout
            </button>
        </>

        // <div className="min-h-screen bg-gray-100">
        //     {/* Header */}
        //     <header className="bg-white shadow-md">
        //         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        //             <h1 className="text-2xl font-bold text-gray-800">Fast Mercatorum Courses</h1>
        //             <div className="flex items-center">
        //                 {userInfo && <span className="text-gray-700 mr-4">Benvenuto, {userInfo.fullName}</span>}
        //                 <button onClick={handleLogout} className="px-4 py-2 text-white rounded-md" style={{ backgroundColor: "rgb(215, 60, 65)" }}>
        //                     Logout
        //                 </button>
        //             </div>
        //         </div>
        //     </header>

        //     {/* Main content */}
        //     <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        //             {/* User Information */}
        //             <div className="lg:col-span-2">{userInfo && <UserInfo userInfo={userInfo} />}</div>

        //             {/* Last Course */}
        //             <div className="lg:col-span-1">{lastCourse && <LastCourse course={lastCourse} />}</div>

        //             {/* Course Search */}
        //             <div className="lg:col-span-3">
        //                 <CourseSearch />
        //             </div>
        //         </div>
        //     </main>
        // </div>
    );
};

export default Dashboard;
