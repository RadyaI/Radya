import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { PERSONAS } from "@/components/tools/AiChat/persona";
import { aiRateLimit } from "@/utils/ai-ratelimit";

const API_KEY = process.env.CLAUDE_API_KEY;
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

    // API KEY CHECK
    if (!API_KEY) {
        return NextResponse.json(
            { error: "AI service not configured" },
            { status: 500 }
        );
    }

    try {
        // PARSE & VALIDATE BODY
        const body = await req.json();
        const { history, persona = "default" } = body ?? {};

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

        // PREPARE CLAUDE PAYLOAD
        const client = new Anthropic({ apiKey: API_KEY });
        const systemPrompt = PERSONAS[persona] ?? PERSONAS["default"];

        const messages = history.map(msg => ({
            role: msg.role === "model" ? "assistant" : msg.role,
            content: msg.text,
        }));

        // CALL CLAUDE
        const response = await client.messages.create({
            model: "claude-haiku-4-5",   
            max_tokens: 1024,
            system: systemPrompt,      
            messages,
        });

        return NextResponse.json({
            text: (response.content[0] as any).text ?? "",
        });

    } catch (error) {
        console.error("Claude API Error:", error);
        return NextResponse.json(
            { error: "AI service error" },
            { status: 500 }
        );
    }
}