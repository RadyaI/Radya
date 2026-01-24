"use client";

import { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth } from '@/utils/firebase';

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden md:block text-right">
          <p className="text-sm font-bold">{user.displayName}</p>
          <p className="text-xs font-mono text-gray-500">Ready to quiz</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 border-2 border-black font-bold hover:bg-red-400 shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          LOGOUT
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="px-8 py-3 bg-yellow-400 border-2 border-black font-black text-lg hover:bg-yellow-300 shadow-[6px_6px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
    >
      LOGIN TO START
    </button>
  );
}