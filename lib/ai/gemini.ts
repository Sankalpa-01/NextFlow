import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GOOGLE_GEMINI_API_KEY in .env.local");
}

const ai = new GoogleGenAI({
  apiKey: apiKey, 
});

export const GEMINI_MODEL = "gemini-3-flash";

export async function generateAiResponse(prompt: string) {
  try {
    // The new SDK uses ai.models.generateContent
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    // In the new SDK, response.text is a direct property string
    return response.text;
  } catch (error) {
    console.error("Gemini Execution Error:", error);
    throw new Error("Failed to generate response from Gemini API");
  }
}

export default ai;