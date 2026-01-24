import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { auth, db } from "../../utils/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { Send, Trash2, LogIn, MessageSquare, User, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import gsap from "gsap";

export default function Guestbook() {

    const [input, setInput] = useState("");
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const messagesEndRef = useRef(null);
    const containerRef = useRef(null);

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

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [messages]);

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
        });

        return () => unsubscribe();
    }, []);

    useLayoutEffect(() => {
        if (messages.length > 0 && isInitialLoad) {
            let ctx = gsap.context(() => {
                gsap.from(".msg-card", {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "back.out(1.2)",
                    clearProps: "all",
                    onComplete: () => setIsInitialLoad(false)
                });
            }, containerRef);
            return () => ctx.revert();
        }
    }, [messages, isInitialLoad]);

    return (
        <>
            <Toaster position="top-right" />
            <div ref={containerRef} className="h-full w-full relative overflow-hidden flex flex-col bg-white text-neutral-900">

                <style>{`
                    .scroll-container {
                        overflow-y: auto;
                        padding-right: 8px;
                        scroll-behavior: smooth;
                    }
                    .scroll-container::-webkit-scrollbar { width: 6px; }
                    .scroll-container::-webkit-scrollbar-track { background: transparent; }
                    .scroll-container::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; border: 1px solid #000; }
                    .scroll-container::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
                `}</style>

                <div className="px-2 md:px-4 pt-4 pb-2 border-b-2 border-black bg-white/95 backdrop-blur-sm z-30 shrink-0 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm font-bold bg-black text-white px-2 py-0.5 rounded-sm">06 //</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Public Logs</span>
                        </div>
                        <h2 className="text-3xl font-black text-black tracking-tighter uppercase">
                            GUESTBOOK
                        </h2>
                    </div>
                    <div className="bg-gray-100 border border-black px-3 py-1 rounded-md text-xs font-bold text-black flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <MessageSquare className="w-3 h-3" />
                        {messages.length} Msgs
                    </div>
                </div>

                <div className="scroll-container flex-1 min-h-0 px-2 md:px-4 pb-4 pt-4">
                    <div className="flex flex-col gap-6">
                        {messages.length === 0 ? (
                            <div className="text-center text-gray-500 mt-10 font-mono text-sm border-2 border-dashed border-gray-300 p-8 rounded-lg">
                                &lt;No transmissions yet. Be the first./&gt;
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div key={msg.id} className="msg-card group relative flex gap-4 p-4 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                                    
                                    <div 
                                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-yellow-200/80 rotate-1 shadow-sm border-l border-r border-white/40 z-10"
                                    ></div>

                                    <div className="shrink-0 relative z-10">
                                        {msg.photoURL ? (
                                            <img src={msg.photoURL} alt="User" className="w-10 h-10 rounded-full border-2 border-black bg-gray-200" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-black text-black">
                                                <User className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0 relative z-10">
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="flex items-baseline gap-2 flex-wrap">
                                                <span className="text-sm font-black text-black">{msg.name}</span>
                                                {msg.email === "radyaiftikhar@gmail.com" && (
                                                    <span className="text-[9px] bg-black text-white px-2 py-0.5 rounded border border-black font-bold uppercase tracking-wider">
                                                        Owner
                                                    </span>
                                                )}
                                            </div>

                                            {isAdmin && (
                                                <button
                                                    onClick={() => handleDelete(msg.id)}
                                                    className="opacity-0 group-hover:opacity-100 p-1.5 bg-red-100 text-red-600 border border-red-600 hover:bg-red-500 hover:text-white rounded shadow-sm transition duration-200"
                                                    title="Delete Message"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-800 break-words leading-relaxed font-serif">
                                            {msg.msg}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} className="h-1" />
                    </div>
                </div>

                <div className="px-2 md:px-4 pt-4 pb-4 border-t-2 border-black bg-[#f4f1ea] shrink-0 z-40">
                    {!user ? (
                        <button
                            onClick={handleLogin}
                            className="w-full py-3 flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 border-2 border-black text-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition font-bold text-sm"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>Sign in with Google to Chat</span>
                        </button>
                    ) : (
                        <div className="flex gap-3 items-end">
                            <div className="relative flex-1">
                                <div className="flex justify-between items-center mb-2 px-1">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                        Identity: <span className="text-black">{user.email}</span>
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-[10px] font-bold text-red-500 hover:text-red-700 hover:underline"
                                    >
                                        SIGN OUT
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Write a message..."
                                    className="w-full bg-white border-2 border-black rounded-lg px-4 py-3 text-sm text-black focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400 font-mono"
                                    disabled={isLoading}
                                />
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="bg-black text-white h-[46px] w-[46px] rounded-lg border-2 border-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(100,100,100,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}