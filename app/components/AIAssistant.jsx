
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Bot, X, Send, Sparkles, Loader2 } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateStrategy = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResponse(null);

    try {
      // Use direct process.env.API_KEY as per initialization guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a senior consultant at Aivora Digitals. Based on this business description: "${prompt}", provide 3 brief, high-impact digital growth strategies involving web dev, ads, or chatbots. Keep it professional, blue-themed (metaphorically), and encouraging. Use bullet points.`,
        config: {
            temperature: 0.7,
            // Removed maxOutputTokens to ensure thinking tokens do not consume the entire output budget
        }
      });
      
      // Accessing text as a property as per GenerateContentResponse guidelines
      setResponse(result.text || "I couldn't generate a strategy at the moment. Please try again.");
    } catch (error) {
      console.error("AI Error:", error);
      setResponse("We're currently scaling our AI minds. Please try again in a moment!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-60">
      {/* Trigger Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl shadow-blue-500/50 flex items-center space-x-2 group transition-all"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-950 animate-ping"></span>
          </div>
          <span className="font-bold pr-2 hidden md:block">Get Free Growth Plan</span>
        </button>
      )}

      {/* Assistant Modal */}
      {isOpen && (
        <div className="w-[90vw] md:w-96 bg-slate-900 border border-blue-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
          <div className="bg-blue-600 p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3 text-white">
              <Sparkles className="w-6 h-6" />
              <div>
                <h4 className="font-black text-sm uppercase">Aivora AI Agent</h4>
                <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Strategy Engine</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 flex-1 max-h-[400px] overflow-y-auto">
            {!response && !isLoading ? (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm leading-relaxed">
                  Tell me about your business, and our AI will generate a custom growth strategy based on Aivora methodology.
                </p>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A local coffee shop looking to expand nationally via e-commerce..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm focus:border-blue-500 outline-none h-24 resize-none transition-all"
                />
              </div>
            ) : (
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-10 space-y-4">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Architecting Strategy...</p>
                  </div>
                ) : (
                  <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap animate-in fade-in duration-700">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-4 text-xs font-bold text-blue-400 flex items-center">
                       <Sparkles className="w-3 h-3 mr-2" /> AI Generated Insights
                    </div>
                    {response}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-950/50 border-t border-slate-800">
            {response ? (
              <button 
                onClick={() => { setResponse(null); setPrompt(''); }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl text-sm font-bold transition-all"
              >
                Create Another Plan
              </button>
            ) : (
              <button 
                disabled={isLoading || !prompt.trim()}
                onClick={generateStrategy}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 transition-all"
              >
                <span>Generate Strategy</span>
                <Send className="w-4 h-4" />
              </button>
            )}
            <p className="text-[10px] text-center text-slate-600 mt-4 uppercase font-bold">Powered by Gemini AI • Aivora Labs</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;