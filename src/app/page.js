import Assistant from "@/components/tools/AiChat/Assistant"
import Dashboard from "../components/dashboard"

const baseUrl = 'https://radya.my.id';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Muhammad Radya Iftikhar | Portfolio',
  description: 'Website pribadi Muhammad Radya Iftikhar (Radya), mahasiswa Informatika. Berisi portfolio, blog, project, dan perjalanan belajar seputar software engineering, backend development, dan data engineering.',
  keywords: [
    'Muhammad Radya Iftikhar',
    'Muhammad Radya',
    'Radya',
    'Portfolio',
    'Software Engineer',
    'Backend Developer',
    'Data Engineer',
    'Web Developer',
  ],
  authors: [{ name: 'Muhammad Radya Iftikhar' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Muhammad Radya Iftikhar | Portfolio',
    description:
      'Website pribadi Muhammad Radya Iftikhar (Radya). Portfolio, blog, dan project.',
    url: baseUrl,
    siteName: 'Radya',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Radya Iftikhar | Portfolio',
    description:
      'Website pribadi Muhammad Radya Iftikhar.',
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <Dashboard />
      <Assistant />
    </>
  );
}
