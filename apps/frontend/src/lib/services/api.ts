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
interface ApiResponse {
  status: string;
  message?: string;
}

/**
 * Course response interface
 */
interface CourseResponse extends ApiResponse {
  course?: Course;
}

/**
 * Status response interface
 */
interface CourseStatusResponse extends ApiResponse {
  count: number;
  courses: CourseStatus[];
}

/**
 * Course status interface
 */
interface CourseStatus {
  id: number;
  title: string;
  startTime: Date;
  duration: number;
}

/**
 * Class to handle API calls to courses
 */
class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3000/api') {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic API response handler with error checking
   */
  private async _handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Try to read error message from server
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
      } catch (e) {
        if (e instanceof Error) {
          throw e;
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    }

    return (await response.json()) as T;
  }

  /**
   * Check server connection status
   */
  async checkHealth(): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return this._handleResponse<ApiResponse>(response);
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  }

  /**
   * Load all available courses
   */
  async getCourses(): Promise<Course[]> {
    const response = await fetch(`${this.baseUrl}/courses`);
    return this._handleResponse<Course[]>(response);
  }

  /**
   * Start automatic viewing of a course
   */
  async startCourse(id: number): Promise<CourseResponse> {
    const response = await fetch(`${this.baseUrl}/courses/${id}/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return this._handleResponse<CourseResponse>(response);
  }

  /**
   * Stop viewing a course
   */
  async stopCourse(id: number): Promise<CourseResponse> {
    const response = await fetch(`${this.baseUrl}/courses/${id}/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return this._handleResponse<CourseResponse>(response);
  }

  /**
   * Get current status of running courses
   */
  async getCourseStatus(): Promise<CourseStatusResponse> {
    const response = await fetch(`${this.baseUrl}/courses/status`);
    return this._handleResponse<CourseStatusResponse>(response);
  }
}

// Export a single instance of the service
export default new ApiService();
