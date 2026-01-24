import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';

export const saveQuizResult = async (userId: string, quizSlug: string, score: number, total: number, answers: any[]) => {
  try {
    const docRef = await addDoc(collection(db, "quiz_answers"), {
      userId,
      quizSlug,
      score,
      totalQuestions: total,
      answers,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error saving score: ", e);
    return null;
  }
};

export const getQuizHistory = async (userId: string, quizSlug: string) => {
  const q = query(
    collection(db, "quiz_answers"),
    where("userId", "==", userId),
    where("quizSlug", "==", quizSlug),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getQuizResultById = async (resultId: string) => {
  const docRef = doc(db, "quiz_answers", resultId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
  return null;
};