// netlify/functions/ai.js
import { GoogleGenAI } from "@google/genai";

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { prompt } = body;

    if (!prompt) {
      return { statusCode: 400, body: JSON.stringify({ error: "Prompt missing" }) };
    }

    if (!process.env.GOOGLE_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: "API key missing" }) };
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ text: result.text || "No response" }),
    };
  } catch (err) {
    console.error("AI ERROR:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
