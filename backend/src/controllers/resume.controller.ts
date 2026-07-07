import { Request, Response } from "express";
import fs from "fs/promises";
import { PDFParse } from "pdf-parse";
import { analyzeResumeWithAI } from "../services/gemini.service";
import Analysis from "../models/analysis.model";

export const analyzeResume = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "Resume PDF is required.",
            });
            return;
        }

        const jobDescription = req.body.jobDescription;

        // Read uploaded PDF
        const pdfBuffer = await fs.readFile(req.file.path);

        // Extract text
        const parser = new PDFParse({ data: pdfBuffer });
        const parsedPdf = await parser.getText();

        // Delete uploaded file (we don't need to keep it)
        await fs.unlink(req.file.path);

        const analysis = await analyzeResumeWithAI(
            parsedPdf.text,
            jobDescription
        );

        const savedAnalysis = await Analysis.create({
            userId: (req as any).user.id,
            jobDescription,

            ...analysis,
        });

        res.status(200).json({
            success: true,
            analysis: savedAnalysis
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to analyze resume.",
        });
    }
};

export const getUserHistory = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const history = await Analysis.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            history
        });
    } catch (error) {
        console.error("Get user history error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve history."
        });
    }
};