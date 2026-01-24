"use client";
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

export default function ThemeToggle({ isDark, toggle }: ThemeToggleProps) {
  return (
    <button 
      onClick={toggle}
      className={`fixed top-6 right-6 z-50 p-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-transform active:translate-y-1 active:shadow-none ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}