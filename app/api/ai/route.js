import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

/* ✅ Handle preflight */
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request) {
     console.log("🔥 /api/ai POST hit!"); 
  try {
    const { prompt } = await request.json();

    if (!prompt || !prompt.trim()) {
      return new Response(
        JSON.stringify({ error: "Prompt missing" }),
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "GOOGLE_API_KEY missing" }),
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return new Response(
      JSON.stringify({ text: result.text ?? "No response" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err) {
    console.error("AI API ERROR:", err);
    return new Response(
      JSON.stringify({ error: "AI failed" }),
      { status: 500 }
    );
  }
}
