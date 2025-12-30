import { GoogleGenAI, Type } from "@google/genai";

export async function POST(req) {
  try {
    const { topic, description } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });

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

    return Response.json(JSON.parse(response.text));
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
