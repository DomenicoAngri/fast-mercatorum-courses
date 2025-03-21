/**
 * Course interface defining the structure of a course object
 */
export interface Course {
    id: number;
    title: string;
    completed: boolean;
    in_progress: boolean;
}

/**
 * API response interface
 */
export interface ApiResponse {
    status: string;
    message?: string;
}

/**
 * Course response interface
 */
export interface CourseResponse extends ApiResponse {
    course?: Course;
}

/**
 * Status response interface
 */
export interface CourseStatusResponse extends ApiResponse {
    count: number;
    courses: CourseStatus[];
}

/**
 * Course status interface
 */
export interface CourseStatus {
    id: number;
    title: string;
    startTime: Date;
    duration: number;
}

/**
 * Course process info interface for tracking active courses
 */
export interface CourseProcessInfo {
    courseId: number;
    startTime: Date;
    [key: string]: any; // For any additional data
}
