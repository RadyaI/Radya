import Assistant from "@/components/tools/AiChat/Assistant"
import Dashboard from "../components/dashboard"

const baseUrl = 'https://radya.vercel.app';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Radya~🐱',
  description: 'Personal web Muhammad Radya Iftikhar (Radya). Berisi portfolio, blog, dan project seputar web development dan software engineering.',
  keywords: [
    'Radya',
    'Muhammad Radya',
    'Muhammad Radya Iftikhar'
  ],
  authors: [{ name: 'Radya' }],
  robots: {
    index: true,
    follow: true,
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
