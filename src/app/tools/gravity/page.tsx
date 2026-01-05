import type { Metadata } from 'next';
import GravityScene from '@/components/tools/gravity/GravityScene';

export const metadata: Metadata = {
  title: 'Gravity Playground | Radya',
  description: 'Interactive physics playground built with Matter.js and Next.js. Drag, throw, and play with the tech stack icons.',
  openGraph: {
    title: 'Gravity Playground - Radya',
    description: 'Zero brain, full fun. Mainkan physics simulation di web personal Radya.',
    // images: ['/og-gravity.png'], // Bikin gambar nanti kalo sempet
  },
};

export default function GravityPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center relative">
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
            
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 relative">
                <GravityScene />
            </div>

            <div className="mt-8 text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                    How it's built?
                </h2>
                <div className="flex flex-wrap justify-center gap-2">
                    {['Next.js 14', 'Matter.js', 'Lucide React', 'Tailwind CSS'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-md text-xs font-mono text-neutral-600 dark:text-neutral-400">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}