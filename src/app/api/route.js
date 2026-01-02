import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        status: "ok",
        uptime: process.uptime?.(),
        env: process.env.NODE_ENV,
    });
}