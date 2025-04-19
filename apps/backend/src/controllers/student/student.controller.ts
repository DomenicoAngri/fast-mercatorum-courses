import type { NextFunction, Request, Response } from "express";
import { getStudentInfoService, getStudentCareerService, getStudentCoursesToCompleteService } from "@services/student/index.js";

// Get student info controller.
export const getStudentInfoController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Call service layer to handle business logic.
        const result = await getStudentInfoService();

        // Return response.
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

// Get student career controller.
export const getStudentCareerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Call service layer to handle business logic.
        const result = await getStudentCareerService();

        // Return response.
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

// Get student courses to complete controller.
export const getStudentCoursesToCompleteController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Call service layer to handle business logic.
        const result = await getStudentCoursesToCompleteService();

        // Return response.
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
