import type { Metadata } from 'next'
import { VT323 } from 'next/font/google'

const pixelFont = VT323({ 
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Learning Log | Pixel Mode',
}

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${pixelFont.variable} antialiased min-h-screen bg-[#050505] text-white selection:bg-blue-600 selection:text-white`}>
      <style>{`
        :root {
          --font-pixel: ${pixelFont.style.fontFamily}, monospace;
        }
        
        /* Force Pixel Style: NO ROUNDED CORNERS */
        .pixel-mode-container, 
        .pixel-mode-container * {
          font-family: var(--font-pixel) !important;
          border-radius: 0px !important;
          letter-spacing: 0.02em;
        }

        /* Scrollbar Modern Pixel */
        ::-webkit-scrollbar { width: 14px; }
        ::-webkit-scrollbar-track { background: #000; border-left: 1px solid #333; }
        ::-webkit-scrollbar-thumb { background: #333; border: 2px solid #000; }
        ::-webkit-scrollbar-thumb:hover { background: #fff; }
      `}</style>

      <div className="pixel-mode-container">
        {children}
      </div>
    </div>
  )
}