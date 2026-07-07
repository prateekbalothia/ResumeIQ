import { GoogleGenAI } from "@google/genai";
import interviewAnalysisPrompt from "../prompts/interviewAnalysis.prompt";
import { retryWithBackoff } from "../utils/retry";

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const analyzeResumeWithAI = async (
  resume: string,
  jobDescription: string
) => {
  const prompt = `
${interviewAnalysisPrompt}

Resume:

${resume}

Job Description:

${jobDescription}
`;

  const response = await retryWithBackoff(() =>
    ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    })
  );

  const text = response.text?.trim() ?? "";

  // Remove Markdown if Gemini returns ```json
  const cleaned = text
    .replace(/^```json/i, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

  return JSON.parse(cleaned);
};