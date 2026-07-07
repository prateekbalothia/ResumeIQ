import { Request, Response } from "express";
import { ai } from "../services/gemini.service";


export const testGemini = async (_req:Request, res:Response) => {
    try{
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Say 'Gemini API is working!' in one sentence."
        });

        res.status(200).json({
            success: true,
            response: response.text,
        });
    }catch(error){
        console.error(error);

        res.status(500).json({
            success:false,
            message: "Gemini API failed"
        });
        
    }
};