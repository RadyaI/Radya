"use client";

import dynamic from "next/dynamic";

const SignPdfClient = dynamic(
  () => import("./SignPdfClient"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-black flex items-center justify-center min-h-screen text-zinc-500">
        <span className="animate-pulse" >Menyiapkan Canvas PDF...</span>
      </div>
    ),
  }
);

export default function PdfLoader() {
  return <SignPdfClient />;
}