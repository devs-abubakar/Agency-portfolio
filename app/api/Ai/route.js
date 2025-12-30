import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    // 1. Read JSON body
    const { prompt } = await req.json();

    if (!prompt || !prompt.trim()) {
      return new Response(
        JSON.stringify({ error: "Prompt missing" }),
        { status: 400 }
      );
    }

    // 2. Ensure API key exists
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("GOOGLE_API_KEY not found");
    }

    // 3. Init Gemini
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });

    // 4. Generate content
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    // 5. Return response
    return new Response(
      JSON.stringify({ text: result.text || "No response" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("AI ERROR:", err);
    return new Response(
      JSON.stringify({ error: err.message || "AI failed" }),
      { status: 500 }
    );
  }
}
