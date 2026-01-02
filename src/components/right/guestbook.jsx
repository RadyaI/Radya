import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { auth, db } from "../../config/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { Send, Trash2, LogIn, MessageSquare, User, Loader2 } from "lucide-react";
import 'animate.css';
import toast, { Toaster } from "react-hot-toast";

export default function Guestbook() {

    const [input, setInput] = useState("");
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    async function handleLogin() {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const userData = result.user.providerData[0];

            Cookies.set("loginData", JSON.stringify(userData));
            Cookies.set("isLoggedIn", "true");

            setUser(userData);
            checkAdmin(userData.email);

        } catch (error) {
            console.error("Login Failed:", error);
        }
    }

    async function handleLogout() {
        try {
            await signOut(auth)
            Cookies.remove("isLoggedIn");
            setUser(null);
            setIsAdmin(false)
            toast.success("Berhasil logout")
        } catch (error) {
            console.log("Logout error: ", error)
        }
    }

    function checkAdmin(email) {
        if (email === "radyaiftikhar@gmail.com") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            const { scrollHeight, clientHeight } = messagesEndRef.current;
            messagesEndRef.current.scrollTop = scrollHeight - clientHeight;
        }
    };

    async function handleSend() {
        if (!input.trim()) return;
        setIsLoading(true);

        try {
            await addDoc(collection(db, "guestbook"), {
                time: Timestamp.now().toMillis(),
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                msg: input,
            });
            setInput("");

            setTimeout(scrollToBottom, 100);

        } catch (error) {
            console.error("Send Failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id) {
        if (!isAdmin) return;
        if (!confirm("Hapus pesan ini permanen?")) return;

        try {
            await deleteDoc(doc(db, "guestbook", id));
        } catch (error) {
            console.error("Delete Failed:", error);
        }
    }

    useEffect(() => {
        const cookieLogin = Cookies.get("isLoggedIn");
        if (cookieLogin === "true") {
            const cookieData = Cookies.get("loginData");
            if (cookieData) {
                const parsedUser = JSON.parse(cookieData);
                setUser(parsedUser);
                checkAdmin(parsedUser.email);
            }
        }

        const q = query(collection(db, "guestbook"), orderBy('time', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tempData = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setMessages(tempData);

            setTimeout(scrollToBottom, 200);
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <Toaster
                position="top-right"
            />
            <div className="h-full relative overflow-hidden flex flex-col">

                <style>{`
                .scroll-container {
                    overflow-y: auto;
                    height: 100%;
                    padding-right: 8px;
                    scroll-behavior: smooth; /* Biar halus */
                }
                .scroll-container::-webkit-scrollbar { width: 4px; }
                .scroll-container::-webkit-scrollbar-track { background: transparent; }
                .scroll-container::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 10px; }
                .scroll-container::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.4); }
            `}</style>

                <div className="px-2 md:px-4 mb-4 shrink-0 animate__animated animate__fadeInDown">
                    <div className="flex justify-between items-end border-b border-white/10 pb-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                                GUESTBOOK
                            </h2>
                            <div className="flex items-center gap-2 text-purple-400 font-mono text-sm mt-1">
                                <span>// 06</span>
                                <span className="text-gray-500">Public Logs</span>
                            </div>
                        </div>
                        <div className="bg-white/5 px-3 py-1 rounded-full text-xs font-bold text-gray-400 flex items-center gap-2">
                            <MessageSquare className="w-3 h-3" />
                            {messages.length} Msgs
                        </div>
                    </div>
                </div>

                <div
                    ref={messagesEndRef}
                    className="scroll-container flex-1 px-2 md:px-4 pb-4"
                >
                    <div className="flex flex-col gap-3">
                        {messages.length === 0 ? (
                            <div className="text-center text-gray-600 mt-10 font-mono text-sm">
                                &lt;No transmissions yet. Be the first./&gt;
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div key={msg.id} className="group flex gap-3 p-3 bg-[#111] border border-white/5 hover:border-white/10 rounded-xl transition-all animate__animated animate__fadeInUp">
                                    {/* Avatar */}
                                    <div className="shrink-0">
                                        {msg.photoURL ? (
                                            <img src={msg.photoURL} alt="User" className="w-8 h-8 rounded-full border border-gray-700" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                                                <User className="w-4 h-4 text-gray-500" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-sm font-bold text-gray-200">{msg.name}</span>
                                                {msg.email === "radyaiftikhar@gmail.com" && (
                                                    <span className="text-[9px] bg-blue-900/30 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20 font-bold uppercase">
                                                        Owner
                                                    </span>
                                                )}
                                            </div>

                                            {isAdmin && (
                                                <button
                                                    onClick={() => handleDelete(msg.id)}
                                                    className="opacity-0 group-hover:opacity-100 p-1.5 bg-red-900/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition duration-200"
                                                    title="Delete Message"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-400 mt-1 break-words leading-relaxed font-mono">
                                            {msg.msg}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="px-2 md:px-4 pt-4 pb-2 bg-gradient-to-t from-[#050505] to-transparent shrink-0">
                    {!user ? (
                        <button
                            onClick={handleLogin}
                            className="w-full py-3 flex items-center justify-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 rounded-xl transition font-bold text-sm"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>Sign in with Google to Chat</span>
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Write a transmission..."
                                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition placeholder:text-gray-700 font-mono"
                                    disabled={isLoading}
                                />
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="bg-white text-black p-3 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </button>
                        </div>
                    )}

                    {user && (
                        <div className="flex justify-between items-center mt-2 px-1">
                            <span className="text-[10px] text-gray-600">
                                Logged as: <span className="text-gray-400">{user.email}</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-[10px] text-red-500/50 hover:text-red-400 underline"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}