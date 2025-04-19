import express from "express";
import { getStudentInfoController, getStudentCareerController, getStudentCoursesToCompleteController } from "@controllers/student/index.js";

const router = express.Router();

// Student routes.
router.get("/student-info", getStudentInfoController);
router.get("/career-info", getStudentInfoController);
router.get("/course-to-complete", getStudentInfoController);

export default router;
