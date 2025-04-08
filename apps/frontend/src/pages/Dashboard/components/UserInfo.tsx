// import { FunctionComponent } from "preact";
// import { UserInfoData } from "../../types/dashboard.types";

// interface UserInfoProps {
//     userInfo: UserInfoData;
// }

// const UserInfo: FunctionComponent<UserInfoProps> = ({ userInfo }) => {
//     const { fullName, matricola, academicYear, completedExams, totalExams, averageGrade, completedCFU, totalCFU } = userInfo;

//     // Calculate completion percentage for the progress bars.
//     const examsPercentage = Math.round((completedExams / totalExams) * 100) || 0;
//     const cfuPercentage = Math.round((completedCFU / totalCFU) * 100) || 0;

//     return (
//         <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">La mia carriera universitaria</h2>

//             {/* User info header */}
//             <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-700">{fullName}</h3>
//                 <div className="flex flex-wrap text-sm text-gray-600">
//                     <p className="mr-4">Matricola: {matricola}</p>
//                     <p>Anno accademico: {academicYear}</p>
//                 </div>
//             </div>

//             {/* Progress cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                 {/* Exams progress */}
//                 <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="text-sm font-medium text-gray-700 mb-2">Esami sostenuti</h4>
//                     <div className="flex items-center justify-between mb-2">
//                         <span className="text-xl font-bold text-gray-800">
//                             {completedExams}/{totalExams}
//                         </span>
//                         <span className="text-sm font-medium" style={{ color: "rgb(215, 60, 65)" }}>
//                             {examsPercentage}%
//                         </span>
//                     </div>
//                     <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                             className="h-full rounded-full"
//                             style={{
//                                 width: `${examsPercentage}%`,
//                                 backgroundColor: "rgb(215, 60, 65)",
//                             }}
//                         ></div>
//                     </div>
//                 </div>

//                 {/* CFU progress */}
//                 <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="text-sm font-medium text-gray-700 mb-2">CFU</h4>
//                     <div className="flex items-center justify-between mb-2">
//                         <span className="text-xl font-bold text-gray-800">
//                             {completedCFU}/{totalCFU}
//                         </span>
//                         <span className="text-sm font-medium" style={{ color: "rgb(215, 60, 65)" }}>
//                             {cfuPercentage}%
//                         </span>
//                     </div>
//                     <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                             className="h-full rounded-full"
//                             style={{
//                                 width: `${cfuPercentage}%`,
//                                 backgroundColor: "rgb(215, 60, 65)",
//                             }}
//                         ></div>
//                     </div>
//                 </div>

//                 {/* Average grade */}
//                 <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="text-sm font-medium text-gray-700 mb-2">Media voto</h4>
//                     <div className="flex items-center justify-between">
//                         <span className="text-xl font-bold text-gray-800">{averageGrade.toFixed(2)}/30</span>
//                     </div>
//                     <div className="mt-2 w-full flex-1">
//                         <div className="relative pt-4">
//                             <div className="flex h-20 items-center justify-center">
//                                 <div
//                                     className="relative rounded-full w-20 h-20 flex items-center justify-center"
//                                     style={{ backgroundColor: "rgb(215, 60, 65)" }}
//                                 >
//                                     <span className="text-white text-lg font-bold">{Math.round((averageGrade / 30) * 100)}%</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserInfo;
