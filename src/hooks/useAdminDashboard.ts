import { useState, useEffect } from 'react';
import { db } from '@/utils/firebase';
import { collection, onSnapshot, doc, updateDoc, Timestamp } from 'firebase/firestore'; 
import { toast } from 'react-hot-toast';

export interface UserData {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: 'admin' | 'user';
  createdAt: Timestamp | null;
  lastLogin: Timestamp | null;
  lastOnline: Timestamp | null;
  status?: 'active' | 'suspended';
  provider?: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeToday: number;
  onlineNow: number;
  newUsers: number;
}

export function useAdminDashboard() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeToday: 0,
    onlineNow: 0,
    newUsers: 0,
  });

  const updateUserRole = async (uid: string, newRole: 'user' | 'admin') => {
    try {
      await updateDoc(doc(db, 'users', uid), { role: newRole });
      toast.success(`Role updated to ${newRole}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    }
  };

  const toggleUserStatus = async (uid: string, currentStatus: string = 'active') => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    try {
      await updateDoc(doc(db, 'users', uid), { status: newStatus });
      toast.success(`User ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      
      const fetchedUsers: UserData[] = [];
      const now = new Date();
      
      const fiveMinutesAgo = now.getTime() - 5 * 60 * 1000; 
      const oneDayAgo = now.getTime() - 24 * 60 * 60 * 1000;
      const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

      let onlineCount = 0;
      let activeTodayCount = 0;
      let newUsersCount = 0;

      snapshot.forEach((doc) => {
        const data = doc.data() as UserData;
        fetchedUsers.push({ ...data, uid: doc.id });

        const lastOnlineTime = data.lastOnline?.toDate().getTime() || 0;
        const createdAtTime = data.createdAt?.toDate().getTime() || 0;

        if (lastOnlineTime > fiveMinutesAgo) onlineCount++;
        
        if (lastOnlineTime > oneDayAgo) activeTodayCount++;
        if (createdAtTime > sevenDaysAgo) newUsersCount++;
      });

      setUsers(fetchedUsers);
      setStats({
        totalUsers: fetchedUsers.length,
        onlineNow: onlineCount,
        activeToday: activeTodayCount,
        newUsers: newUsersCount,
      });
      
      setLoading(false);
    }, (error) => {
      console.error("Error fetching realtime users:", error);
      toast.error("Gagal koneksi ke database realtime");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { users, stats, loading, updateUserRole, toggleUserStatus };
}