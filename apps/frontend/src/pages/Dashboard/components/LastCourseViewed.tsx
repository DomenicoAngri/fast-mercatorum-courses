// import { FunctionComponent } from "preact";
// import { CourseData } from "../../types/dashboard.types";

// interface LastCourseProps {
//     course: CourseData;
// }

// const LastCourse: FunctionComponent<LastCourseProps> = ({ course }) => {
//     const { name, code, cfu, completionPercentage, lastAccessDate } = course;

//     // Format the date for display.
//     const formattedDate = lastAccessDate
//         ? new Date(lastAccessDate).toLocaleDateString("it-IT", {
//               day: "2-digit",
//               month: "2-digit",
//               year: "numeric",
//               hour: "2-digit",
//               minute: "2-digit",
//           })
//         : "N/A";

//     const handleContinue = () => {
//         // Navigate to course viewer with the course ID.
//         window.location.href = `/course/${code}`;
//     };

//     return (
//         <div className="bg-white rounded-lg shadow-md p-6 h-full">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Ultimo corso seguito</h2>

//             <div className="p-4 border border-gray-200 rounded-lg">
//                 <h3 className="text-lg font-medium text-gray-800 mb-1">{name}</h3>
//                 <p className="text-sm text-gray-600 mb-4">
//                     Codice: {code} | CFU: {cfu}
//                 </p>

//                 {/* Last access date */}
//                 {lastAccessDate && <p className="text-xs text-gray-500 mb-3">Ultimo accesso: {formattedDate}</p>}

//                 {/* Progress bar */}
//                 <div className="mb-4">
//                     <div className="flex justify-between text-sm mb-1">
//                         <span>Completamento</span>
//                         <span style={{ color: "rgb(215, 60, 65)" }}>{completionPercentage}%</span>
//                     </div>
//                     <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                             className="h-full rounded-full"
//                             style={{
//                                 width: `${completionPercentage}%`,
//                                 backgroundColor: "rgb(215, 60, 65)",
//                             }}
//                         ></div>
//                     </div>
//                 </div>

//                 {/* Continue button */}
//                 <button
//                     onClick={handleContinue}
//                     className="w-full mt-2 px-4 py-2 text-white rounded-md transition-colors"
//                     style={{ backgroundColor: "rgb(215, 60, 65)" }}
//                 >
//                     Continua
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default LastCourse;
