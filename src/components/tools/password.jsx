"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import CryptoJS from 'crypto-js';
import { db } from "../../utils/firebase";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    doc,
    updateDoc,
    deleteDoc,
    Timestamp
} from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';


// const CORRECT_HASH = process.env.NEXT_PUBLIC_MASTER_HASH;
const CORRECT_HASH = "9b6a9ff395eec29a5232270ccefaf2bfafef0778814399570eb30237d9c4a780";

// Auto-lock setelah idle (15 menit)
const IDLE_TIMEOUT_MS = 15 * 60 * 1000;

// Lockout setelah gagal N kali
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 30 * 1000; // 30 detik

export default function PasswordManager() {
    // --- STATE AUTH ---
    const [inputPass, setInputPass] = useState("");
    const [masterKey, setMasterKey] = useState(null);
    const [authError, setAuthError] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [lockedUntil, setLockedUntil] = useState(null);
    const [lockCountdown, setLockCountdown] = useState(0);

    // --- STATE DATA ---
    const [passwords, setPasswords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [decryptErrors, setDecryptErrors] = useState(0);

    // --- STATE UI ---
    const [showPassMap, setShowPassMap] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({ platform: "", email: "", pass: "", desc: "" });
    const [formError, setFormError] = useState("");
    const [showFormPass, setShowFormPass] = useState(false);

    // --- STATE FILTER & SORT ---
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState("time");
    const [sortDir, setSortDir] = useState("desc");
    const [filterCategory, setFilterCategory] = useState("all");

    // --- IDLE TIMER ---
    const idleTimer = useRef(null);
    const resetIdleTimer = useCallback(() => {
        clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => {
            handleLock();
            toast("🔒 Auto-locked karena idle.", { icon: "⏰" });
        }, IDLE_TIMEOUT_MS);
    }, []);

    useEffect(() => {
        if (!masterKey) return;
        const events = ["mousemove", "keydown", "click", "scroll"];
        events.forEach(e => window.addEventListener(e, resetIdleTimer));
        resetIdleTimer();
        return () => {
            events.forEach(e => window.removeEventListener(e, resetIdleTimer));
            clearTimeout(idleTimer.current);
        };
    }, [masterKey, resetIdleTimer]);

    // --- LOCKOUT COUNTDOWN ---
    useEffect(() => {
        if (!lockedUntil) return;
        const interval = setInterval(() => {
            const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
            if (remaining <= 0) {
                setLockedUntil(null);
                setLockCountdown(0);
                setAttempts(0);
                clearInterval(interval);
            } else {
                setLockCountdown(remaining);
            }
        }, 500);
        return () => clearInterval(interval);
    }, [lockedUntil]);

    // --- AUTH ---
    const handleUnlock = (e) => {
        e.preventDefault();
        if (lockedUntil && Date.now() < lockedUntil) return;

        const hash = CryptoJS.SHA256(inputPass).toString();
        if (hash === CORRECT_HASH) {
            setMasterKey(inputPass);
            setAuthError("");
            setAttempts(0);
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            if (newAttempts >= MAX_ATTEMPTS) {
                const until = Date.now() + LOCKOUT_MS;
                setLockedUntil(until);
                setAuthError(`Terlalu banyak percobaan! Coba lagi dalam ${LOCKOUT_MS / 1000} detik.`);
            } else {
                setAuthError(`Password salah! Sisa percobaan: ${MAX_ATTEMPTS - newAttempts}`);
            }
        }
    };

    const handleLock = () => {
        setMasterKey(null);
        setInputPass("");
        setPasswords([]);
        setShowPassMap({});
        clearTimeout(idleTimer.current);
    };

    // --- AMBIL DATA DARI FIRESTORE ---
    useEffect(() => {
        if (!masterKey) return;
        setLoading(true);
        setDecryptErrors(0);

        const q = query(collection(db, "passwords"), orderBy("time", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const decryptedData = [];
            let errCount = 0;
            snapshot.forEach((docSnap) => {
                const rawData = docSnap.data();
                try {
                    if (rawData.encryptedContent) {
                        const bytes = CryptoJS.AES.decrypt(rawData.encryptedContent, masterKey);
                        const originalText = bytes.toString(CryptoJS.enc.Utf8);
                        if (originalText) {
                            const data = JSON.parse(originalText);
                            decryptedData.push({
                                id: docSnap.id,
                                ...data,
                                time: rawData.time,
                                updatedAt: rawData.updatedAt || null
                            });
                        } else {
                            errCount++;
                        }
                    }
                } catch {
                    errCount++;
                }
            });
            setPasswords(decryptedData);
            setDecryptErrors(errCount);
            if (errCount > 0) toast.error(`${errCount} data gagal didekripsi.`);
            setLoading(false);
        }, (err) => {
            toast.error("Gagal terhubung ke Firestore.");
            console.error(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [masterKey]);

    // --- CRUD ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        if (!formData.platform.trim() || !formData.email.trim() || !formData.pass.trim()) {
            setFormError("Platform, Username/Email, dan Password wajib diisi!");
            return;
        }
        try {
            const contentString = JSON.stringify({
                platform: formData.platform.trim(),
                email: formData.email.trim(),
                pass: formData.pass,
                desc: formData.desc.trim(),
            });
            const encryptedContent = CryptoJS.AES.encrypt(contentString, masterKey).toString();
            if (editMode && currentId) {
                await updateDoc(doc(db, "passwords", currentId), {
                    encryptedContent,
                    updatedAt: Timestamp.now()
                });
                toast.success("Password diperbarui!");
            } else {
                await addDoc(collection(db, "passwords"), {
                    encryptedContent,
                    time: Timestamp.now().toMillis()
                });
                toast.success("Password tersimpan!");
            }
            closeModal();
        } catch (err) {
            toast.error("Gagal menyimpan: " + err.message);
        }
    };

    const confirmDelete = (id) => {
        setDeleteTargetId(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "passwords", deleteTargetId));
            toast.success("Password dihapus.");
        } catch (err) {
            toast.error("Gagal hapus: " + err.message);
        } finally {
            setIsDeleteModalOpen(false);
            setDeleteTargetId(null);
        }
    };

    // --- CLIPBOARD ---
    const copyToClipboard = async (text, label = "Teks") => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success(`${label} disalin!`);
        } catch {
            toast.error("Gagal menyalin.");
        }
    };

    // --- MODAL HELPERS ---
    const openAddModal = () => {
        setFormData({ platform: "", email: "", pass: "", desc: "" });
        setFormError("");
        setShowFormPass(false);
        setEditMode(false);
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setFormData({
            platform: item.platform,
            email: item.email,
            pass: item.pass,
            desc: item.desc || ""
        });
        setFormError("");
        setShowFormPass(false);
        setEditMode(true);
        setCurrentId(item.id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormError("");
    };

    const toggleShowPass = (id) =>
        setShowPassMap(prev => ({ ...prev, [id]: !prev[id] }));

    // --- FILTER, SEARCH, SORT ---
    const categories = ["all", ...Array.from(new Set(passwords.map(p => p.platform.toLowerCase())))];

    const processedData = passwords
        .filter(item => {
            const q = search.toLowerCase();
            const matchSearch =
                item.platform.toLowerCase().includes(q) ||
                item.email.toLowerCase().includes(q) ||
                (item.desc || "").toLowerCase().includes(q);
            const matchCat = filterCategory === "all" || item.platform.toLowerCase() === filterCategory;
            return matchSearch && matchCat;
        })
        .sort((a, b) => {
            let valA = a[sortKey] ?? "";
            let valB = b[sortKey] ?? "";
            if (typeof valA === "string") valA = valA.toLowerCase();
            if (typeof valB === "string") valB = valB.toLowerCase();
            if (valA < valB) return sortDir === "asc" ? -1 : 1;
            if (valA > valB) return sortDir === "asc" ? 1 : -1;
            return 0;
        });

    const handleSort = (key) => {
        if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
        else { setSortKey(key); setSortDir("asc"); }
    };

    const SortIcon = ({ col }) => {
        if (sortKey !== col) return <span className="text-gray-700 ml-1">↕</span>;
        return <span className="text-blue-400 ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>;
    };

    const formatDate = (ts) => {
        if (!ts) return "-";
        return new Date(typeof ts === "number" ? ts : ts.toMillis?.() ?? ts).toLocaleDateString("id-ID", {
            day: "2-digit", month: "short", year: "numeric"
        });
    };

    // ============================================================
    // VIEW 1: LOCK SCREEN
    // ============================================================
    if (!masterKey) {
        return (
            <div className="min-h-screen w-full bg-[#0d0d0d] flex items-center justify-center p-4"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap');`}</style>

                <div className="w-full max-w-sm">
                    {/* ASCII-style border top */}
                    <div className="text-[#2a2a2a] text-xs mb-2 select-none">
                        ┌──────────────────────────────────┐
                    </div>

                    <div className="border border-[#2a2a2a] bg-[#111] px-8 py-10">
                        <div className="text-center mb-8">
                            <div className="text-4xl mb-3">🔐</div>
                            <h1 className="text-white text-xl font-bold tracking-widest uppercase">
                                RESTRICTED
                            </h1>
                            <p className="text-[#444] text-xs mt-2 tracking-wider">
                                VAULT ACCESS REQUIRED
                            </p>
                        </div>

                        <form onSubmit={handleUnlock} className="flex flex-col gap-3">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444] text-xs select-none">
                                    $
                                </span>
                                <input
                                    type="password"
                                    value={inputPass}
                                    onChange={(e) => setInputPass(e.target.value)}
                                    placeholder="master_password"
                                    disabled={!!lockedUntil}
                                    className="h-11 w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white text-sm pl-7 pr-4
                                               focus:outline-none focus:border-blue-600 transition disabled:opacity-40
                                               placeholder:text-[#333]"
                                    autoFocus
                                />
                            </div>

                            {authError && (
                                <p className="text-red-500 text-xs text-center">
                                    {lockedUntil ? `⏳ Locked — tunggu ${lockCountdown}s` : `⚠ ${authError}`}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={!!lockedUntil}
                                className="h-11 bg-blue-700 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed
                                           text-white text-sm font-bold tracking-widest uppercase transition active:scale-[.98]"
                            >
                                {lockedUntil ? `LOCKED (${lockCountdown}s)` : "UNLOCK →"}
                            </button>
                        </form>

                        <p className="text-[#2a2a2a] text-xs text-center mt-6">
                            auto-lock after 15 min idle
                        </p>
                    </div>

                    <div className="text-[#2a2a2a] text-xs mt-2 select-none">
                        └──────────────────────────────────┘
                    </div>
                </div>
            </div>
        );
    }

    // ============================================================
    // VIEW 2: DASHBOARD (TABLE)
    // ============================================================
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

                .pm-root { font-family: 'IBM Plex Sans', sans-serif; }
                .pm-mono { font-family: 'IBM Plex Mono', monospace; }

                .table-row:hover td { background: #161616; }

                input::-webkit-search-cancel-button { display: none; }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .modal-card { animation: slideUp .18s ease-out; }

                .tag-pill {
                    display: inline-block;
                    padding: 2px 8px;
                    font-size: 11px;
                    border: 1px solid #2a2a2a;
                    background: #161616;
                    color: #666;
                    cursor: pointer;
                    transition: all .15s;
                    white-space: nowrap;
                }
                .tag-pill:hover { border-color: #555; color: #ccc; }
                .tag-pill.active { border-color: #3b82f6; color: #93c5fd; background: #1e3a5f20; }

                .sort-th { cursor: pointer; user-select: none; white-space: nowrap; }
                .sort-th:hover { color: #ccc; }

                ::-webkit-scrollbar { width: 4px; height: 4px; }
                ::-webkit-scrollbar-track { background: #0d0d0d; }
                ::-webkit-scrollbar-thumb { background: #2a2a2a; }
            `}</style>

            <Toaster position="bottom-right" toastOptions={{
                style: { background: '#1a1a1a', color: '#e5e7eb', border: '1px solid #2a2a2a', fontFamily: 'IBM Plex Mono', fontSize: '13px' }
            }} />

            <div className="pm-root min-h-screen bg-[#0d0d0d] text-gray-300">

                {/* TOP BAR */}
                <header className="border-b border-[#1f1f1f] px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🔐</span>
                        <div>
                            <h1 className="text-white font-semibold text-base leading-tight">Password Vault</h1>
                            <p className="text-[#444] text-xs pm-mono">
                                {passwords.length} entries · AES-256 encrypted
                                {decryptErrors > 0 && <span className="text-red-500 ml-2">· {decryptErrors} err</span>}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={openAddModal}
                            className="h-8 px-4 bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium transition"
                        >
                            + Tambah
                        </button>
                        <button
                            onClick={handleLock}
                            className="h-8 px-3 border border-[#2a2a2a] text-[#666] hover:text-red-400 hover:border-red-900 text-sm transition pm-mono"
                        >
                            lock
                        </button>
                    </div>
                </header>

                <main className="px-6 py-5">

                    {/* SEARCH + FILTER ROW */}
                    <div className="flex flex-col md:flex-row gap-3 mb-5">
                        {/* Search */}
                        <div className="relative flex-1 max-w-sm">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444] text-sm">⌕</span>
                            <input
                                type="search"
                                placeholder="Cari platform, email, catatan..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="h-9 w-full bg-[#111] border border-[#222] text-white text-sm pl-8 pr-3
                                           focus:outline-none focus:border-blue-600 transition placeholder:text-[#444]"
                            />
                        </div>

                        {/* Category filter pills */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs text-[#444] mr-1 pm-mono">filter:</span>
                            {categories.slice(0, 8).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilterCategory(cat)}
                                    className={`tag-pill pm-mono ${filterCategory === cat ? "active" : ""}`}
                                >
                                    {cat === "all" ? "semua" : cat}
                                </button>
                            ))}
                        </div>

                        <div className="md:ml-auto text-xs text-[#444] pm-mono self-center">
                            {processedData.length} / {passwords.length} hasil
                        </div>
                    </div>

                    {/* TABLE */}
                    {loading ? (
                        <div className="text-center py-24 text-[#444] pm-mono text-sm">
                            <div className="animate-pulse">loading vault...</div>
                        </div>
                    ) : (
                        <div className="border border-[#1f1f1f] overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="border-b border-[#1f1f1f] bg-[#111]">
                                        <th
                                            className="sort-th text-left px-4 py-3 text-xs text-[#555] font-medium pm-mono uppercase tracking-wider"
                                            onClick={() => handleSort("platform")}
                                        >
                                            Platform <SortIcon col="platform" />
                                        </th>
                                        <th
                                            className="sort-th text-left px-4 py-3 text-xs text-[#555] font-medium pm-mono uppercase tracking-wider"
                                            onClick={() => handleSort("email")}
                                        >
                                            Username / Email <SortIcon col="email" />
                                        </th>
                                        <th className="text-left px-4 py-3 text-xs text-[#555] font-medium pm-mono uppercase tracking-wider">
                                            Password
                                        </th>
                                        <th
                                            className="sort-th text-left px-4 py-3 text-xs text-[#555] font-medium pm-mono uppercase tracking-wider hidden lg:table-cell"
                                            onClick={() => handleSort("desc")}
                                        >
                                            Catatan <SortIcon col="desc" />
                                        </th>
                                        <th
                                            className="sort-th text-left px-4 py-3 text-xs text-[#555] font-medium pm-mono uppercase tracking-wider hidden xl:table-cell"
                                            onClick={() => handleSort("time")}
                                        >
                                            Ditambah <SortIcon col="time" />
                                        </th>
                                        <th className="text-left px-4 py-3 text-xs text-[#555] font-medium pm-mono uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {processedData.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-20 text-[#444] pm-mono text-sm">
                                                {search || filterCategory !== "all"
                                                    ? "Tidak ada hasil. Coba ubah filter."
                                                    : "Vault kosong. Klik + Tambah untuk mulai."}
                                            </td>
                                        </tr>
                                    ) : processedData.map((item, idx) => (
                                        <tr
                                            key={item.id}
                                            className={`table-row border-b border-[#161616] transition-colors ${idx % 2 === 0 ? "" : "bg-[#0f0f0f]"}`}
                                        >
                                            {/* Platform */}
                                            <td className="px-4 py-3">
                                                <span className="text-white font-medium">{item.platform}</span>
                                            </td>

                                            {/* Email */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2 pm-mono">
                                                    <span className="text-gray-300 text-xs truncate max-w-[180px]">
                                                        {item.email}
                                                    </span>
                                                    <button
                                                        onClick={() => copyToClipboard(item.email, "Email")}
                                                        className="text-[#444] hover:text-blue-400 transition text-xs flex-shrink-0"
                                                        title="Salin email"
                                                    >
                                                        ⎘
                                                    </button>
                                                </div>
                                            </td>

                                            {/* Password */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2 pm-mono">
                                                    <span className="text-xs text-gray-400 truncate max-w-[140px]">
                                                        {showPassMap[item.id] ? item.pass : "••••••••••"}
                                                    </span>
                                                    <div className="flex gap-1.5 flex-shrink-0">
                                                        <button
                                                            onClick={() => toggleShowPass(item.id)}
                                                            className="text-[#444] hover:text-yellow-400 transition text-xs"
                                                            title={showPassMap[item.id] ? "Sembunyikan" : "Tampilkan"}
                                                        >
                                                            {showPassMap[item.id] ? "◉" : "○"}
                                                        </button>
                                                        <button
                                                            onClick={() => copyToClipboard(item.pass, "Password")}
                                                            className="text-[#444] hover:text-green-400 transition text-xs"
                                                            title="Salin password"
                                                        >
                                                            ⎘
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Catatan */}
                                            <td className="px-4 py-3 hidden lg:table-cell">
                                                <span className="text-[#555] text-xs italic">
                                                    {item.desc || <span className="text-[#333]">—</span>}
                                                </span>
                                            </td>

                                            {/* Tanggal */}
                                            <td className="px-4 py-3 hidden xl:table-cell pm-mono">
                                                <span className="text-[#444] text-xs">{formatDate(item.time)}</span>
                                            </td>

                                            {/* Aksi */}
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openEditModal(item)}
                                                        className="text-xs text-[#555] hover:text-blue-400 transition pm-mono px-2 py-1 border border-transparent hover:border-[#2a2a2a]"
                                                        title="Edit"
                                                    >
                                                        edit
                                                    </button>
                                                    <button
                                                        onClick={() => confirmDelete(item.id)}
                                                        className="text-xs text-[#555] hover:text-red-400 transition pm-mono px-2 py-1 border border-transparent hover:border-[#2a2a2a]"
                                                        title="Hapus"
                                                    >
                                                        del
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>

            {/* ============================================================
                MODAL: TAMBAH / EDIT
            ============================================================ */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                        onClick={closeModal}
                    />
                    <div className="modal-card relative w-full max-w-md bg-[#111] border border-[#2a2a2a] p-6 shadow-2xl pm-root">

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-white font-semibold">
                                {editMode ? "Edit Password" : "Tambah Password Baru"}
                            </h2>
                            <button onClick={closeModal} className="text-[#555] hover:text-white text-lg leading-none">×</button>
                        </div>

                        {formError && (
                            <div className="mb-4 border border-red-900/50 bg-red-950/20 px-3 py-2 text-red-400 text-xs pm-mono">
                                ⚠ {formError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            {/* Platform */}
                            <div>
                                <label className="block text-xs text-[#555] mb-1 pm-mono uppercase tracking-wider">
                                    Platform / Nama Akun *
                                </label>
                                <input
                                    type="text"
                                    value={formData.platform}
                                    onChange={e => setFormData({ ...formData, platform: e.target.value })}
                                    className={`h-10 w-full bg-[#0a0a0a] border text-white text-sm px-3
                                                focus:outline-none focus:border-blue-600 transition
                                                ${formError && !formData.platform.trim() ? "border-red-600" : "border-[#222]"}`}
                                    placeholder="Instagram, Gmail, Netflix..."
                                    autoFocus
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs text-[#555] mb-1 pm-mono uppercase tracking-wider">
                                    Username / Email *
                                </label>
                                <input
                                    type="text"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className={`h-10 w-full bg-[#0a0a0a] border text-white text-sm px-3
                                                focus:outline-none focus:border-blue-600 transition
                                                ${formError && !formData.email.trim() ? "border-red-600" : "border-[#222]"}`}
                                    placeholder="user@example.com"
                                />
                            </div>

                            {/* Password — FIXED: type=password by default */}
                            <div>
                                <label className="block text-xs text-[#555] mb-1 pm-mono uppercase tracking-wider">
                                    Password *
                                </label>
                                <div className="relative">
                                    <input
                                        type={showFormPass ? "text" : "password"}
                                        value={formData.pass}
                                        onChange={e => setFormData({ ...formData, pass: e.target.value })}
                                        className={`h-10 w-full bg-[#0a0a0a] border text-white text-sm px-3 pr-10 pm-mono
                                                    focus:outline-none focus:border-blue-600 transition
                                                    ${formError && !formData.pass.trim() ? "border-red-600" : "border-[#222]"}`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowFormPass(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-white transition text-xs"
                                    >
                                        {showFormPass ? "hide" : "show"}
                                    </button>
                                </div>
                            </div>

                            {/* Desc */}
                            <div>
                                <label className="block text-xs text-[#555] mb-1 pm-mono uppercase tracking-wider">
                                    Catatan (opsional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.desc}
                                    onChange={e => setFormData({ ...formData, desc: e.target.value })}
                                    className="h-10 w-full bg-[#0a0a0a] border border-[#222] text-white text-sm px-3
                                               focus:outline-none focus:border-blue-600 transition"
                                    placeholder="PIN 6 digit, akun personal, dll..."
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 h-10 border border-[#2a2a2a] text-[#666] hover:text-white hover:border-[#444] text-sm transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 h-10 bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium transition"
                                >
                                    {editMode ? "Simpan Perubahan" : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ============================================================
                MODAL: KONFIRMASI HAPUS
            ============================================================ */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                        onClick={() => setIsDeleteModalOpen(false)}
                    />
                    <div className="modal-card relative w-full max-w-sm bg-[#111] border border-[#2a2a2a] p-6 shadow-2xl pm-root">
                        <h2 className="text-white font-semibold mb-2">Hapus Password?</h2>
                        <p className="text-[#666] text-sm mb-6">
                            Data ini akan dihapus permanen dari vault dan tidak bisa dikembalikan.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 h-10 border border-[#2a2a2a] text-[#666] hover:text-white text-sm transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 h-10 bg-red-800 hover:bg-red-700 text-white text-sm font-medium transition"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}