import { Metadata } from 'next';
import ClientWrapper from '@/components/tools/qrcode/ClientWrapper';

export const metadata: Metadata = {
  title: 'Free QR Code Generator - Radya.my.id',
  description: 'Generate high-quality custom QR codes for URLs, WiFi, Text, and more. Fast, secure, and client-side processing only.',
  keywords: ['QR Code Generator', 'React QR', 'WiFi QR Code', 'Client Side Tools'],
  openGraph: {
    title: 'QR Code Generator | Radya.my.id Tools',
    description: 'Create custom QR codes instantly directly in your browser.',
    url: 'https://radya.my.id/tools/qrcode',
    siteName: 'Radya Project',
    type: 'website',
  },
};

export default function QRCodePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center md:text-left mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            QR Code Generator
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl">
            Create custom, permanent QR codes instantly. No sign-up required, processing happens entirely in your browser.
          </p>
        </div>

        <ClientWrapper />
      </div>
    </main>
  );
}