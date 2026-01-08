import type { Metadata } from "next";
import DontClickGame from "@/components/tools/dont-click/DontClickGame";

export const metadata: Metadata = {
  title: "Don't Click The Button | A Pointless Interactive Game",
  description:
    "A useless but fun interactive button game built with Next.js. You were warned not to click it.",
  keywords: [
    "dont click the button",
    "fun web game",
    "interactive experiment",
    "nextjs game",
    "random web game",
    "radya",
  ],
  openGraph: {
    title: "Don't Click The Button",
    description:
      "A harmless button. Or is it? A fun interactive experiment on the web.",
    url: "https://radya.my.id/tools/dont-click",
    siteName: "Radya Personal Web",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Don't Click The Button",
    description:
      "A pointless but fun interactive button game. You were warned.",
  },
};

export default function DontClickPage() {
  return (
    <main className="relative min-h-screen bg-[#0B0F1A] text-white overflow-hidden">
      <h1 className="sr-only">
        Don&apos;t Click The Button - A Fun Interactive Web Game
      </h1>

      <p className="sr-only">
        This page contains a useless but entertaining interactive button game.
        Clicking the button may cause unexpected visual chaos.
      </p>

      <DontClickGame />

      <noscript>
        <div className="p-6 text-center text-sm text-gray-400">
          This interactive experience requires JavaScript to function properly.
        </div>
      </noscript>
    </main>
  );
}
