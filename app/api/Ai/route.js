export async function POST(request) {
  try {
    console.log("Function called"); 
    console.log("Raw body:", event.body);

    const body = JSON.parse(event.body || "{}");
    const prompt = body.prompt;
    console.log("Prompt:", prompt);

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Prompt missing" }),
      };
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });

    console.log("AI client initialized");

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    console.log("AI response received:", result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        text: result.text || "No text returned",
      }),
    };
  } catch (err) {
  console.error("Full error:", err);
  return {
    statusCode: 500,
    body: JSON.stringify({ error: err.message || "Server failed" }),
  };
}  
}