import { db } from '@/utils/firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';

export const syncUserToFirestore = async (user: User) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Unnamed User',
      photoURL: user.photoURL || null,
      provider: user.providerData[0]?.providerId || 'password',
      role: user.email === 'radyaiftikhar@gmail.com' ? 'admin' : 'user', 
      status: 'active',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      lastOnline: serverTimestamp(),
    });
  } else {
    await updateDoc(userRef, {
      lastLogin: serverTimestamp(),
      displayName: user.displayName, 
      photoURL: user.photoURL,
      lastOnline: serverTimestamp(),
    });
  }
};