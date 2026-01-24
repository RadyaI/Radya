import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learning Quiz',
  description: 'Test your knowledge',
}

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="quiz-normalization-zone min-h-screen bg-black">
      <style>{`
        .pixel-mode-container .quiz-normalization-zone,
        .pixel-mode-container .quiz-normalization-zone * {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
          letter-spacing: normal !important;
          border-radius: 0.5rem !important; /* Kembalikan rounded default (0.5rem = rounded-lg) */
        }

      `}</style>

      {children}
    </div>
  )
}