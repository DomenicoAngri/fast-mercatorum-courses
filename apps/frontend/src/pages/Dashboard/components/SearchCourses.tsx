// import { FunctionComponent } from "preact";
// import { useState } from "preact/hooks";
// import { CourseData } from "../../types/dashboard.types";

// const CourseSearch: FunctionComponent = () => {
//     const [searchCode, setSearchCode] = useState<string>("");
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     const [searchResults, setSearchResults] = useState<CourseData[]>([]);
//     const [showResults, setShowResults] = useState<boolean>(false);

//     const handleInputChange = (e: Event) => {
//         const target = e.target as HTMLInputElement;
//         setSearchCode(target.value);
//     };

//     const handleSearch = async (e: Event) => {
//         e.preventDefault();

//         if (!searchCode.trim()) {
//             setError("Inserisci un codice corso valido.");
//             return;
//         }

//         setIsLoading(true);
//         setError(null);

//         try {
//             const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
//             const token = localStorage.getItem("access_token");

//             if (!token) {
//                 throw new Error("No authentication token found.");
//             }

//             const response = await fetch(`${apiUrl}/course/search?code=${searchCode}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error("Ricerca corso fallita.");
//             }

//             const data = await response.json();
//             setSearchResults(data.courses || []);
//             setShowResults(true);

//             if (data.courses?.length === 0) {
//                 setError("Nessun corso trovato con questo codice.");
//             }
//         } catch (err) {
//             setError(err instanceof Error ? err.message : "Si è verificato un errore.");
//             setShowResults(false);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleSelectCourse = (courseCode: string) => {
//         // Navigate to course viewer with the course ID.
//         window.location.href = `/course/${courseCode}`;
//     };

//     return (
//         <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Cerca corso per codice</h2>

//             <form onSubmit={handleSearch} className="mb-4">
//                 <div className="flex flex-col md:flex-row gap-4">
//                     <input
//                         type="text"
//                         value={searchCode}
//                         onChange={handleInputChange}
//                         placeholder="Inserisci il codice del corso"
//                         className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
//                     />
//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="px-6 py-2 text-white rounded-md"
//                         style={{ backgroundColor: "rgb(215, 60, 65)" }}
//                     >
//                         {isLoading ? "Ricerca..." : "Cerca"}
//                     </button>
//                 </div>
//             </form>

//             {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

//             {/* Search results */}
//             {showResults && searchResults.length > 0 && (
//                 <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3">Risultati della ricerca</h3>
//                     <div className="space-y-3">
//                         {searchResults.map((course) => (
//                             <div
//                                 key={course.id}
//                                 className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
//                                 onClick={() => handleSelectCourse(course.code)}
//                             >
//                                 <div className="flex justify-between items-start">
//                                     <div>
//                                         <h4 className="text-md font-medium text-gray-800">{course.name}</h4>
//                                         <p className="text-sm text-gray-600">
//                                             Codice: {course.code} | CFU: {course.cfu}
//                                         </p>
//                                     </div>
//                                     <button
//                                         className="px-3 py-1 text-sm text-white rounded-md"
//                                         style={{ backgroundColor: "rgb(215, 60, 65)" }}
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             handleSelectCourse(course.code);
//                                         }}
//                                     >
//                                         Visualizza
//                                     </button>
//                                 </div>

//                                 {/* Progress bar if available */}
//                                 {course.completionPercentage !== undefined && (
//                                     <div className="mt-3">
//                                         <div className="flex justify-between text-xs mb-1">
//                                             <span>Completamento</span>
//                                             <span style={{ color: "rgb(215, 60, 65)" }}>{course.completionPercentage}%</span>
//                                         </div>
//                                         <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                                             <div
//                                                 className="h-full rounded-full"
//                                                 style={{
//                                                     width: `${course.completionPercentage}%`,
//                                                     backgroundColor: "rgb(215, 60, 65)",
//                                                 }}
//                                             ></div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CourseSearch;
