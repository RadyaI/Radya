import { Metadata } from 'next'
import LearningDashboard from './LearningDashboard'

export const metadata: Metadata = {
  title: 'Learning Dashboard | Radya.my.id',
  description: 'Manage personal learning paths, track progress, and document the journey.',
  openGraph: {
    title: 'Learning Dashboard - Radya',
    description: 'My personal learning management system.',
    type: 'website',
  }
}

export default function LearningPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 selection:text-blue-200">
      <LearningDashboard />
    </main>
  )
}