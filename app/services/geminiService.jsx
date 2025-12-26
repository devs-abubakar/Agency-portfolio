
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Service to interact with Gemini API for technology insights.
 */
export const getDeepDiveInsight = async (topic, description) => {
  try {
    // Always create a new GoogleGenAI instance right before making an API call 
    // to ensure it uses the most up-to-date API key from the environment.
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a highly technical yet accessible "deep dive" insight into the following technology concept. 
      Topic: ${topic}
      Context: ${description}
      
      The response should be in two parts: 
      1. An "insight" that explains the core benefit.
      2. "Technical details" that explain how it theoretically works.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insight: {
              type: Type.STRING,
              description: 'A punchy, creative insight about the technology.',
            },
            technicalDetails: {
              type: Type.STRING,
              description: 'A more detailed technical explanation.',
            },
          },
          required: ["insight", "technicalDetails"],
          propertyOrdering: ["insight", "technicalDetails"],
        },
      },
    });

    // Access the .text property directly (do not call it as a method).
    const text = response.text;
    if (!text) {
      throw new Error("No text content returned from Gemini");
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
        insight: "Unable to retrieve real-time insights.",
        technicalDetails: "Check your connection or API configuration."
    };
  }
};
