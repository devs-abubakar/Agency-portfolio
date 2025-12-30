// netlify/functions/deep-dive.js
import { GoogleGenAI, Type } from "@google/genai";

export const handler = async (event) => {
  try {
    // 1. Parse the incoming POST request
    const body = JSON.parse(event.body || "{}");
    const { topic, description } = body;

    if (!topic || !description) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Topic or description missing" }),
      };
    }

    // 2. Check API key
    if (!process.env.GOOGLE_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "GOOGLE_API_KEY not found" }),
      };
    }

    // 3. Initialize Gemini AI
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });

    // 4. Generate AI response
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
Provide a highly technical yet accessible deep dive.

Topic: ${topic}
Context: ${description}
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insight: { type: Type.STRING },
            technicalDetails: { type: Type.STRING },
          },
          required: ["insight", "technicalDetails"],
        },
      },
    });

    // 5. Return the parsed AI output
    return {
      statusCode: 200,
      body: response.text || JSON.stringify({ insight: "", technicalDetails: "" }),
    };
  } catch (err) {
    console.error("Deep-dive AI ERROR:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Server error" }),
    };
  }
};
