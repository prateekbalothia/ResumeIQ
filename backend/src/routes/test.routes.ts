import { Router } from "express";
import { testGemini } from "../controllers/test.controller";

const router = Router();

router.get("/", testGemini);

export default router;