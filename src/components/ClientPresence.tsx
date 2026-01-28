'use client';
import { useOnlinePresence } from '@/hooks/useOnlinePresence';

export default function ClientPresence() {
  useOnlinePresence();
  return null;
}