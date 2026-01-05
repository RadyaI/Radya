import { Metadata } from 'next';
import PdfLoader from '@/components/tools/signpdf/PdfLoader';

const baseUrl = 'https://radya.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Tanda Tangan PDF Digital Gratis & Aman - Tanpa Upload Server',
  description: 'Tools tanda tangan PDF online gratis. Proses 100% di browser (client-side), file tidak akan di-upload ke server. Aman, cepat, dan privasi terjaga.',
  keywords: [
    'tanda tangan pdf', 
    'tanda tangan pdf gratis',
    'sign pdf online', 
    'edit pdf gratis', 
    'tanda tangan digital', 
    'privacy first pdf tool',
    'free pdf signer',
    'tanda tangan elektronik'
  ],
  authors: [{ name: 'Radya' }],
  openGraph: {
    title: 'Tanda Tangan PDF Gratis & Aman',
    description: 'Edit dan tanda tangan dokumen PDF langsung di browser kamu. Privasi 100% terjaga.',
    url: '/signpdf',
    siteName: 'Radya Personal Web',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/SignPdf.svg', 
        width: 1200,
        height: 630,
        alt: 'Preview Tanda Tangan PDF Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tanda Tangan PDF Gratis & Aman',
    description: 'Tools tanda tangan PDF tanpa upload ke server. Aman & Cepat.',
    images: ['/SignPdf.svg'],
  },
  alternates: {
    canonical: '/signpdf', 
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <PdfLoader />;
}