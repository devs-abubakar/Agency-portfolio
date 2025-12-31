export const dynamic = 'force-dynamic';
import { GoogleGenerativeAI } from "@google/generative-ai"; // Ensure correct import

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    
    // 1. Check API Key first
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API Key missing" }), { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // 2. Use a valid model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("AI API ERROR:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}