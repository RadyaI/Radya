import { useEffect } from 'react';
import { db } from '@/utils/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; 
import { useAuth } from './useAuth';

export function useOnlinePresence() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const reportPresence = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'No Name',
          photoURL: user.photoURL,
          lastOnline: serverTimestamp(),
        }, { merge: true });

      } catch (error) {
        console.error("Gagal lapor online:", error);
      }
    };

    reportPresence();

    const interval = setInterval(reportPresence, 2 * 60 * 1000); 

    return () => clearInterval(interval);
  }, [user]);
}