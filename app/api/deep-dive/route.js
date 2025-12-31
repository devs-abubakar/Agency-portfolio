export const runtime = "nodejs"; // REQUIRED for @google/genai

import { GoogleGenAI, Type } from "@google/genai";

export async function POST(request) {
  try {
    // 1. Parse request body
    const { topic, description } = await request.json();

    if (!topic || !description) {
      return new Response(
        JSON.stringify({ error: "Topic or description missing" }),
        { status: 400 }
      );
    }

    // 2. Validate API key
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GOOGLE_API_KEY not found" }),
        { status: 500 }
      );
    }

    // 3. Initialize Gemini
    const ai = new GoogleGenAI({ apiKey });

    // 4. Generate response
    const result = await ai.models.generateContent({
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

    // 5. Parse and return JSON
    const text = result.text;
    if (!text) {
      throw new Error("No text returned from Gemini");
    }

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Deep-dive API ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Deep-dive generation failed" }),
      { status: 500 }
    );
  }
}
