"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { isAdmin } from '@/utils/admins';
import { getAllQuizResults } from '@/utils/quiz/firebase-quiz';

interface QuizResultData {
  id: string;
  displayName: string;
  email: string;
  quizSlug: string;
  score: number;
  timestamp: Date;
  totalQuestions: number;
}

interface Stats {
  totalAttempts: number;
  uniqueUsers: number;
  avgScore: number;
  passRate: number;
}

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [results, setResults] = useState<QuizResultData[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [stats, setStats] = useState<Stats>({ totalAttempts: 0, uniqueUsers: 0, avgScore: 0, passRate: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!user || !isAdmin(user.email)) {
      return; 
    }

    const fetchData = async () => {
      const data: any[] = await getAllQuizResults();
      setResults(data);
      calculateStats(data);
      setLoadingData(false);
    };

    fetchData();
  }, [user, authLoading]);

  const calculateStats = (data: QuizResultData[]) => {
    if (data.length === 0) return;

    const totalAttempts = data.length;
    const uniqueEmails = new Set(data.map(r => r.email)).size;
    const totalScore = data.reduce((acc, curr) => acc + curr.score, 0);
    const passedCount = data.filter(r => r.score >= 70).length;

    setStats({
      totalAttempts,
      uniqueUsers: uniqueEmails,
      avgScore: Math.round(totalScore / totalAttempts),
      passRate: Math.round((passedCount / totalAttempts) * 100),
    });
  };

  const filteredResults = results.filter(r => 
    r.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.quizSlug.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-[#f4f3ef] dark:bg-zinc-950 font-mono">Loading Auth...</div>;

  if (!user || !isAdmin(user.email)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-200 p-4 font-mono text-center">
        <h1 className="text-4xl font-black mb-4">ACCESS DENIED</h1>
        <p>You do not have permission to view this classified area.</p>
        <Link href="/quiz" className="mt-8 border-2 border-red-600 dark:border-red-400 px-6 py-2 hover:bg-red-600 hover:text-white transition-all uppercase font-bold">
          Get Out
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f3ef] dark:bg-zinc-950 text-black dark:text-zinc-100 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        
         
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b-4 border-black dark:border-white pb-6 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black font-serif uppercase tracking-tight">
              Admin <span className="text-blue-600 dark:text-blue-400">Dashboard</span>
            </h1>
            <p className="font-mono text-gray-500 dark:text-gray-400 mt-2">Welcome, Commander {user.displayName || "Admin"}</p>
          </div>
          <div className="flex gap-2">
             <Link href="/quiz" className="px-6 py-3 border-2 border-black dark:border-zinc-500 font-bold hover:bg-black hover:text-white dark:hover:bg-zinc-800 transition-all uppercase text-sm">
                Exit
             </Link>
          </div>
        </div>

         
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
           <StatCard label="Total Attempts" value={stats.totalAttempts} color="bg-yellow-200 dark:bg-yellow-900" />
           <StatCard label="Unique Users" value={stats.uniqueUsers} color="bg-blue-200 dark:bg-blue-900" />
           <StatCard label="Avg. Score" value={stats.avgScore} color="bg-purple-200 dark:bg-purple-900" suffix="/100" />
           <StatCard label="Pass Rate" value={`${stats.passRate}%`} color="bg-green-200 dark:bg-green-900" />
        </div>

         
        <div className="mb-6">
          <input 
            type="text" 
            placeholder="Search user, email, or slug..." 
            className="w-full md:w-1/3 p-4 border-2 border-black dark:border-zinc-600 bg-white dark:bg-zinc-900 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] dark:focus:shadow-[4px_4px_0px_0px_#fff] transition-all font-mono text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

         
        <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#555] overflow-hidden">
          {loadingData ? (
             <div className="p-12 text-center font-mono animate-pulse">Scanning database...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white dark:bg-zinc-800 font-mono uppercase text-xs tracking-wider">
                    <th className="p-4 border-r border-gray-700">Time</th>
                    <th className="p-4 border-r border-gray-700">User</th>
                    <th className="p-4 border-r border-gray-700">Quiz Slug</th>
                    <th className="p-4 border-r border-gray-700 text-center">Score</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black/10 dark:divide-zinc-700">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((result) => (
                      <tr key={result.id} className="hover:bg-yellow-50 dark:hover:bg-zinc-800/50 transition-colors group">
                        
                         
                        <td className="p-4 font-mono text-xs whitespace-nowrap text-gray-600 dark:text-gray-400">
                          {result.timestamp.toLocaleDateString('id-ID')} <br/>
                          {result.timestamp.toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}
                        </td>

                         
                        <td className="p-4">
                          <div className="font-bold text-sm">{result.displayName}</div>
                          <div className="font-mono text-xs text-gray-500 dark:text-gray-400">{result.email}</div>
                        </td>

                         
                        <td className="p-4 font-mono text-xs">
                           <span className="bg-gray-200 dark:bg-zinc-700 px-2 py-1 rounded-sm border border-black/20 dark:border-zinc-500">
                             {result.quizSlug}
                           </span>
                        </td>

                         
                        <td className="p-4 text-center">
                           <span className={`inline-block font-black text-lg ${result.score >= 70 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {result.score}
                           </span>
                        </td>

                         
                        <td className="p-4 text-center">
                          <Link 
                            href={`/quiz/${result.quizSlug}/result?id=${result.id}`}
                            target="_blank"
                            className="inline-block border border-black dark:border-zinc-500 bg-white dark:bg-zinc-800 px-3 py-1 text-xs font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-zinc-100 dark:hover:text-black shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#777] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                          >
                            Inspect
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center font-mono text-gray-500">No data found matching your query.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, color, suffix = '' }: { label: string, value: string | number, color: string, suffix?: string }) {
  return (
    <div className={`p-4 border-2 border-black dark:border-zinc-600 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#555] ${color} text-black dark:text-zinc-100 flex flex-col justify-between h-32 md:h-40 transition-transform hover:-translate-y-1`}>
       <span className="font-mono text-xs uppercase font-bold tracking-widest opacity-70">{label}</span>
       <div className="text-right">
          <span className="text-4xl md:text-5xl font-black">{value}</span>
          {suffix && <span className="text-lg font-mono ml-1">{suffix}</span>}
       </div>
    </div>
  );
}