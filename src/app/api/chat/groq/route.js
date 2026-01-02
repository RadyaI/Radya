import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "@/components/tools/AiChat/persona"; 

const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

export async function POST(req) {
    if (!API_KEY) {
        return NextResponse.json({ error: "Groq API Key missing" }, { status: 500 });
    }

    try {
        const { history } = await req.json();

        const groq = new Groq({ apiKey: API_KEY });
        
        const groqMessages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...history.map(msg => ({ 
                role: msg.role === "model" ? "assistant" : "user", 
                content: msg.text 
            }))
        ];

        const completion = await groq.chat.completions.create({
            messages: groqMessages,
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
        });

        const replyText = completion.choices[0]?.message?.content || "";
        
        return NextResponse.json({ text: replyText });

    } catch (error) {
        console.error("Groq API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}