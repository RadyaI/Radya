'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { isAdmin } from '@/utils/admins';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { auth } from '@/utils/firebase';
import { signOut } from 'firebase/auth';
import { format, formatDistanceToNow } from 'date-fns';
import { 
  Users, Activity, Search, LogOut, 
  Zap, Radio, Shield, Terminal, Copy, Check, Calendar, Clock, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { users, stats, loading: dataLoading, updateUserRole, toggleUserStatus } = useAdminDashboard();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'users'>('overview');
  const [copiedUid, setCopiedUid] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user || !isAdmin(user.email)) {
        router.replace('/'); 
      }
    }
  }, [user, authLoading, router]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUid(text);
    toast.success("UID Copied!");
    setTimeout(() => setCopiedUid(null), 2000);
  };

  if (authLoading || dataLoading || !user || !isAdmin(user.email)) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center">
        <div className="text-xl tracking-widest animate-pulse">FETCHING_FULL_DATA...</div>
      </div>
    );
  }

  const filteredUsers = users.filter(u => 
    (u.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (u.displayName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (u.uid || '').includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono selection:bg-green-900 selection:text-green-100 relative overflow-x-hidden">
      
      {}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
        <div className="w-full px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-900/20 border border-green-500/50 flex items-center justify-center rounded">
              <Terminal className="w-5 h-5 text-green-500" />
            </div>
            <span className="font-bold tracking-widest text-white">ADMIN<span className="text-green-600">.MASTER</span></span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-bold text-white">{user.displayName}</span>
              <span className="text-[10px] text-green-500">SUPER_ADMIN</span>
            </div>
            <button onClick={() => signOut(auth)} className="p-2 hover:text-red-500 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full pt-24 px-4 pb-20">
        <div className="flex gap-2 mb-8 border-b border-gray-800 pb-1">
          {['overview', 'users'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab 
                ? 'text-green-400 border-b-2 border-green-500' 
                : 'text-gray-600 hover:text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              {[
                { title: "TOTAL_USERS", value: stats.totalUsers, icon: Users, color: "text-blue-400", border: "border-blue-500/30" },
                { title: "ONLINE_NOW", value: stats.onlineNow, icon: Radio, color: "text-green-400", border: "border-green-500/30" },
                { title: "ACTIVE_TODAY", value: stats.activeToday, icon: Zap, color: "text-yellow-400", border: "border-yellow-500/30" },
                { title: "NEW_MEMBERS", value: stats.newUsers, icon: Shield, color: "text-purple-400", border: "border-purple-500/30" },
              ].map((stat, i) => (
                <div key={i} className={`bg-gray-900/20 border ${stat.border} p-6 rounded relative overflow-hidden`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{stat.title}</h3>
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                    </div>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div 
              key="users"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="w-full flex items-center bg-black border border-gray-700 rounded-lg px-3 py-2 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500/50 transition-all">
                <Search className="h-4 w-4 text-gray-500 mr-3 shrink-0" />
                <input 
                  type="text" 
                  placeholder="SEARCH BY UID, EMAIL, OR NAME..." 
                  className="bg-transparent border-none outline-none text-white placeholder-gray-600 w-full text-sm h-full py-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="border border-gray-800 rounded bg-gray-900/20 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[1200px]">
                    <thead>
                      <tr className="border-b border-gray-800 bg-gray-900/50">
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold w-[300px]">User Profile & UID</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Activity Log</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Account Age</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Access Control</th>
                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {filteredUsers.map((u) => {
                         const isOnline = u.lastOnline 
                          ? (new Date().getTime() - u.lastOnline.toDate().getTime() < 5 * 60 * 1000) 
                          : false;

                         return (
                          <tr key={u.uid} className="hover:bg-white/5 transition-colors">
                            
                            {}
                            <td className="px-6 py-4 align-top">
                              <div className="flex gap-4">
                                <div className="relative shrink-0 mt-1">
                                  <img 
                                    src={u.photoURL || `https://ui-avatars.com/api/?name=${u.email}&background=000&color=fff`} 
                                    className={`w-10 h-10 rounded border ${isOnline ? 'border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'border-gray-700'}`}
                                    alt=""
                                  />
                                  {isOnline && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />}
                                </div>
                                <div className="min-w-0 flex flex-col gap-1">
                                  <div className="text-sm font-bold text-white truncate">{u.displayName || 'NO_NAME'}</div>
                                  <div className="text-[11px] text-gray-500 font-mono">{u.email}</div>
                                  
                                  {}
                                  <div 
                                    onClick={() => handleCopy(u.uid)}
                                    className="flex items-center gap-1.5 mt-1 text-[9px] font-mono text-gray-600 bg-black/40 px-1.5 py-0.5 rounded border border-gray-800 w-fit cursor-pointer hover:border-gray-600 hover:text-gray-400 transition-colors"
                                    title="Click to Copy UID"
                                  >
                                    <Lock size={8} />
                                    {u.uid}
                                    {copiedUid === u.uid ? <Check size={8} className="text-green-500"/> : <Copy size={8} />}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {}
                            <td className="px-6 py-4 align-top">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                                   <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-700'}`}></div>
                                   <span className="font-bold uppercase tracking-wider text-[9px] text-gray-600">PRESENCE:</span>
                                   <span className={isOnline ? 'text-green-400 font-bold' : 'text-gray-500'}>
                                     {isOnline ? 'ONLINE NOW' : (u.lastOnline ? formatDistanceToNow(u.lastOnline.toDate(), { addSuffix: true }) : 'NEVER')}
                                   </span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                                   <Activity size={10} className="text-blue-500" />
                                   <span className="font-bold uppercase tracking-wider text-[9px] text-gray-600">LAST LOGIN:</span>
                                   <span>
                                     {u.lastLogin ? format(u.lastLogin.toDate(), "dd MMM yyyy, HH:mm") : '-'}
                                   </span>
                                </div>
                              </div>
                            </td>

                            {}
                            <td className="px-6 py-4 align-top">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                                   <Calendar size={10} className="text-purple-500" />
                                   <span className="font-bold uppercase tracking-wider text-[9px] text-gray-600">CREATED:</span>
                                   <span>
                                     {u.createdAt ? format(u.createdAt.toDate(), "dd MMM yyyy") : 'Unknown'}
                                   </span>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                                   <Clock size={10} className="text-orange-500" />
                                   <span className="font-bold uppercase tracking-wider text-[9px] text-gray-600">AGE:</span>
                                   <span>
                                     {u.createdAt ? formatDistanceToNow(u.createdAt.toDate()) : '-'}
                                   </span>
                                </div>
                              </div>
                            </td>

                            {}
                            <td className="px-6 py-4 align-top">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-bold text-gray-600 uppercase w-10">Role:</span>
                                  <select 
                                    value={u.role}
                                    onChange={(e) => updateUserRole(u.uid, e.target.value as any)}
                                    className={`bg-black border rounded px-2 py-0.5 text-[10px] font-bold uppercase cursor-pointer focus:outline-none focus:border-white transition-colors ${
                                      u.role === 'admin' 
                                      ? 'border-purple-900 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]' 
                                      : 'border-gray-700 text-gray-400'
                                    }`}
                                  >
                                    <option value="user">USER</option>
                                    <option value="admin">ADMIN</option>
                                  </select>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-bold text-gray-600 uppercase w-10">Status:</span>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                    u.status === 'suspended' 
                                    ? 'bg-red-900/20 text-red-500 border-red-900' 
                                    : 'bg-green-900/20 text-green-500 border-green-900'
                                  }`}>
                                    {u.status === 'suspended' ? 'SUSPENDED' : 'ACTIVE'}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-bold text-gray-600 uppercase w-10">Via:</span>
                                  <span className="text-[10px] text-gray-400 font-mono">
                                    {u.provider || 'firebase_auth'}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {}
                            <td className="px-6 py-4 align-top text-right">
                              <button 
                                onClick={() => toggleUserStatus(u.uid, u.status)}
                                className={`w-full text-[10px] font-bold px-3 py-2 rounded border transition-all uppercase tracking-widest ${
                                  u.status === 'suspended'
                                  ? 'border-green-900 text-green-500 hover:bg-green-900/20'
                                  : 'border-red-900 text-red-500 hover:bg-red-900/20'
                                }`}
                              >
                                {u.status === 'suspended' ? 'ENABLE ACCESS' : 'REVOKE ACCESS'}
                              </button>
                              <div className="mt-2 text-[9px] text-gray-700 font-mono">
                                ID: {u.uid.slice(0, 8)}...
                              </div>
                            </td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {filteredUsers.length === 0 && (
                    <div className="py-20 text-center text-gray-600 font-mono text-xs tracking-widest">
                      // DATABASE_QUERY_RETURNED_NULL
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}