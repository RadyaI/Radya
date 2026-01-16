import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { PERSONAS } from "@/components/tools/AiChat/persona";
import { aiRateLimit } from "@/utils/ai-ratelimit";

const API_KEY = process.env.GROQ_API_KEY;

const MAX_MESSAGES = 20;
const MAX_TOTAL_CHARS = 8_000;

export async function POST(req) {

    // IDENTIFIER (IP + USER AGENT)
    const ip =
        req.headers
            .get("x-forwarded-for")
            ?.split(",")[0]
            ?.trim() ??
        req.headers.get("x-real-ip") ??
        "anonymous";

    const ua = req.headers.get("user-agent") ?? "unknown";
    const identifier = `${ip}:${ua}`;

    const { success } = await aiRateLimit.limit(identifier);

    if (!success) {
        return NextResponse.json(
            { error: "Too many requests. Please slow down." },
            { status: 429 }
        );
    }

    // VALIDASI API KEY
    if (!API_KEY) {
        return NextResponse.json(
            { error: "AI service not configured" },
            { status: 500 }
        );
    }

    try {

        // PARSE & VALIDASI BODY
        const body = await req.json();
        const { history, persona = "radya" } = body ?? {};

        if (!Array.isArray(history)) {
            return NextResponse.json(
                { error: "Invalid request format" },
                { status: 400 }
            );
        }

        if (history.length === 0) {
            return NextResponse.json(
                { error: "Empty conversation" },
                { status: 400 }
            );
        }

        if (history.length > MAX_MESSAGES) {
            return NextResponse.json(
                { error: "Conversation too long" },
                { status: 413 }
            );
        }

        const totalChars = history.reduce(
            (sum, msg) => sum + (msg?.text?.length ?? 0),
            0
        );

        if (totalChars > MAX_TOTAL_CHARS) {
            return NextResponse.json(
                { error: "Input too large" },
                { status: 413 }
            );
        }

        // PREPARE GROQ PAYLOAD
        const groq = new Groq({ apiKey: API_KEY });

        const systemPrompt =
            PERSONAS[persona] ?? PERSONAS["radya"];

        const messages = [
            { role: "system", content: systemPrompt },
            ...history.map(msg => ({
                role: msg.role === "model" ? "assistant" : "user",
                content: msg.text,
            })),
        ];


        // CALL GROQ
        const completion =
            await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages,
                temperature: 0.7,
            });

        return NextResponse.json({
            text:
                completion.choices[0]?.message?.content ??
                "",
        });

    } catch (error) {
        console.error("Groq API Error:", error);

        return NextResponse.json(
            { error: "AI service error" },
            { status: 500 }
        );
    }
}
