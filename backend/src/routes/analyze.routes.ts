import { Router } from "express";
import upload from "../middleware/upload.middleware";
import { analyzeResume, getUserHistory } from "../controllers/resume.controller";
import { auth } from "../middleware/auth.middleware";

const router = Router();

router.post(
    "/analyze",
    auth as any,
    upload.single("resume"),
    analyzeResume
);

router.get(
    "/history",
    auth as any,
    getUserHistory
);

export default router;