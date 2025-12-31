import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || !prompt.trim()) {
      return new Response(
        JSON.stringify({ error: "Prompt missing" }),
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GOOGLE_API_KEY missing" }),
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return new Response(
      JSON.stringify({ text: result.text || "No response" }),
      { status: 200 }
    );

  } catch (error) {
    console.error("AI API ERROR:", error);
    return new Response(
      JSON.stringify({ error: "AI failed" }),
      { status: 500 }
    );
  }
}
