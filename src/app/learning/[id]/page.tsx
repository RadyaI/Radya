import { Metadata } from 'next'
import PlanDetail from './PlanDetail'

export const metadata: Metadata = {
  title: 'Learning Details | Radya.my.id',
  description: 'Track progress and document learning journey.',
}

export default function Page() {
  return <PlanDetail />
}