// // apps/backend/src/controllers/courseController.ts
// import { Request, Response } from "express";
// import axios from "axios";
// import { Course, CourseProcessInfo } from "../types";

// // In-memory database simulation
// let courses: Course[] = [
//     { id: 1, title: "Introduction to JavaScript", completed: false, in_progress: false },
//     { id: 2, title: "Advanced Node.js", completed: true, in_progress: false },
//     { id: 3, title: "Svelte for Beginners", completed: false, in_progress: false },
// ];

// // Keep track of viewing processes
// const activeCourses = new Map<number, CourseProcessInfo>();

// // Custom error class with HTTP status code
// class AppError extends Error {
//     statusCode: number;

//     constructor(message: string, statusCode: number) {
//         super(message);
//         this.statusCode = statusCode;
//         this.name = "AppError";
//     }
// }

// // Get all courses
// export const getCourses = (req: Request, res: Response) => {
//     res.json(courses);
// };

// // Get a specific course by ID
// export const getCourseById = (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     const course = courses.find((c) => c.id === id);

//     if (!course) {
//         throw new AppError("Course not found", 404);
//     }

//     res.json(course);
// };

// // Start automatic viewing of a course
// export const startCourse = async (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     const course = courses.find((c) => c.id === id);

//     if (!course) {
//         throw new AppError("Course not found", 404);
//     }

//     if (course.completed) {
//         throw new AppError("Course already completed", 400);
//     }

//     if (course.in_progress) {
//         throw new AppError("Course already in progress", 400);
//     }

//     try {
//         // Here you'll implement the logic to call your APIs
//         // This is just an example, should be replaced with your actual API calls
//         /*
//     const response = await axios.post('https://yourapi.com/startCourse', {
//       courseId: id,
//       // other necessary parameters
//     });
//     */

//         // Update course status
//         course.in_progress = true;

//         // Save reference to the process for later stopping
//         activeCourses.set(id, {
//             courseId: id,
//             startTime: new Date(),
//         });

//         res.json({
//             status: "success",
//             message: "Course started successfully",
//             course,
//         });
//     } catch (error) {
//         console.error(`Error starting course ${id}:`, error);
//         let errorMessage = "Unknown error";

//         if (error instanceof Error) {
//             errorMessage = error.message;
//         }

//         throw new AppError(`Unable to start course: ${errorMessage}`, 500);
//     }
// };

// // Stop viewing a course
// export const stopCourse = async (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     const course = courses.find((c) => c.id === id);

//     if (!course) {
//         throw new AppError("Course not found", 404);
//     }

//     if (!course.in_progress) {
//         throw new AppError("Course not in progress", 400);
//     }

//     try {
//         // Here you'll implement the logic to stop your APIs
//         // This is just an example, should be replaced with your actual API calls
//         /*
//     const response = await axios.post('https://yourapi.com/stopCourse', {
//       courseId: id,
//       // other necessary parameters
//     });
//     */

//         // Update course status
//         course.in_progress = false;

//         // Remove reference to the process
//         activeCourses.delete(id);

//         res.json({
//             status: "success",
//             message: "Course stopped successfully",
//             course,
//         });
//     } catch (error) {
//         console.error(`Error stopping course ${id}:`, error);
//         let errorMessage = "Unknown error";

//         if (error instanceof Error) {
//             errorMessage = error.message;
//         }

//         throw new AppError(`Unable to stop course: ${errorMessage}`, 500);
//     }
// };

// // Get current status of running courses
// export const getCourseStatus = (req: Request, res: Response) => {
//     const courseStatus = [];

//     for (const [id, info] of activeCourses.entries()) {
//         const course = courses.find((c) => c.id === id);
//         if (course) {
//             courseStatus.push({
//                 id: course.id,
//                 title: course.title,
//                 startTime: info.startTime,
//                 duration: Math.floor((new Date().getTime() - info.startTime.getTime()) / 1000), // duration in seconds
//             });
//         }
//     }

//     res.json({
//         status: "success",
//         count: courseStatus.length,
//         courses: courseStatus,
//     });
// };
