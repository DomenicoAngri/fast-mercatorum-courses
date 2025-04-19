import { UserProfileResponseInterface, CareerResponseInterface, CoursesToCompleteResponseInterface } from "@app-types/student/index.js";
import { createApiClient } from "@utils/index.js";

// Create a pre-configured API client for student API.
const apiClient = createApiClient({
    baseUrl: "https://lms-api.prod.mercatorum.multiversity.click/student",
    apiName: "Student API",
});

// TODO: Lato FE implementare exipiry, implementare in auth service il refresh token, ed inserire ad ogni chiamata sempre il token
// sempre attraverso il layer di auth service
// TODO: sto implementando tutta la roba lato FE.

export const getStudentInfoService = async (): Promise<UserProfileResponseInterface> => {
    return await apiClient.get<UserProfileResponseInterface>("/info");
};

export const getStudentCareerService = async (): Promise<CareerResponseInterface> => {
    return await apiClient.get<CareerResponseInterface>("/home/gr/pds-stats");
};

export const getStudentCoursesToCompleteService = async (): Promise<CoursesToCompleteResponseInterface> => {
    return await apiClient.get<CoursesToCompleteResponseInterface>("/video-lessons/getCourses/tocomplete");
};
