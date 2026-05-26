import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { PERSONAS } from "@/components/tools/AiChat/persona";
import { aiRateLimit } from "@/utils/ai-ratelimit";

const API_KEY = process.env.GEMINI_API_KEY;
const MAX_MESSAGES = 20;
const MAX_TOTAL_CHARS = 15_000;

const ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://hrdai.radya.my.id",
    "https://tukarilmu.radya.my.id"
];

export async function OPTIONS(req) {
    const origin = req.headers.get("origin");
    const isAllowed = !origin || ALLOWED_ORIGINS.includes(origin);

    const headers = {
        "Access-Control-Allow-Origin": isAllowed ? (origin || "*") : "null",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    return new NextResponse(null, { status: 204, headers });
}

export async function POST(req) {
    const origin = req.headers.get("origin");

    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
        return NextResponse.json(
            { error: "Akses ditolak oleh CORS" },
            { status: 403 }
        );
    }

    const corsHeaders = {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        req.headers.get("x-real-ip") ??
        "anonymous";

    const ua = req.headers.get("user-agent") ?? "unknown";
    const identifier = `${ip}:${ua}`;

    try {
        const { success } = await aiRateLimit.limit(identifier);

        if (!success) {
            return NextResponse.json(
                { error: "Too many requests. Please slow down." },
                { status: 429, headers: corsHeaders }
            );
        }
    } catch (rateLimitError) {
        console.warn("Rate limiter gagal (Upstash offline), melanjutkan request tanpa limit:", rateLimitError.message);
    }

    if (!API_KEY) {
        return NextResponse.json(
            { error: "AI service not configured" },
            { status: 500, headers: corsHeaders }
        );
    }

    try {
        const body = await req.json();
        const { history, persona = "radya" } = body ?? {};

        if (!Array.isArray(history)) {
            return NextResponse.json(
                { error: "Invalid request format" },
                { status: 400, headers: corsHeaders }
            );
        }

        if (history.length === 0) {
            return NextResponse.json(
                { error: "Empty conversation" },
                { status: 400, headers: corsHeaders }
            );
        }

        if (history.length > MAX_MESSAGES) {
            return NextResponse.json(
                { error: "Conversation too long" },
                { status: 413, headers: corsHeaders }
            );
        }

        const totalChars = history.reduce(
            (sum, msg) => sum + (msg?.text?.length ?? 0),
            0
        );

        if (totalChars > MAX_TOTAL_CHARS) {
            return NextResponse.json(
                { error: "Input too large" },
                { status: 413, headers: corsHeaders }
            );
        }

        const selectedPersona = PERSONAS[persona] ?? PERSONAS["radya"];

        const chatHistory = history
            .map(msg => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.text}`)
            .join("\n");

        const prompt = `
            Role & Persona:
            ${selectedPersona}

            History Percakapan (Jangan lupa konteks ini):
            ${chatHistory}

            (Jawablah respon terakhir dari User di atas dengan singkat dan jelas sesuai persona yang ditentukan)
        `;

        const ai = new GoogleGenAI({ apiKey: API_KEY });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });

        return NextResponse.json(
            { text: response.text ?? "" },
            { headers: corsHeaders }
        );

    } catch (error) {
        console.error("Gemini API Error:", error);

        return NextResponse.json(
            { error: "AI service error" },
            { status: 500, headers: corsHeaders }
        );
    }
}
