import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { PERSONAS } from "@/components/tools/AiChat/persona";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function POST(req) {
    if (!API_KEY) {
        return NextResponse.json({ error: "Gemini API Key missing" }, { status: 500 });
    }

    try {
        const { history, persona = 'radya' } = await req.json();

        const ai = new GoogleGenAI({ apiKey: API_KEY });
        
        const selectedPersona = PERSONAS[persona] || PERSONAS['radya'];

        const chatHistory = history
            .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
            .join('\n');

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite", 
            contents: `
                Role & Persona:
                ${selectedPersona}

                History Percakapan (Jangan lupa konteks ini):
                ${chatHistory}
                
                (Jawablah respon terakhir dari User di atas dengan singkat dan jelas sesuai persona yang ditentukan)
            `,
        });


        return NextResponse.json({ text: response.text }); 

    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}