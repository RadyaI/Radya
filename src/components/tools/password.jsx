"use client"

import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { db } from "../../config/firebase";
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
import Cursor from '../cursor';

const CORRECT_HASH = "9b6a9ff395eec29a5232270ccefaf2bfafef0778814399570eb30237d9c4a780";

export default function PasswordManager() {
    // --- STATE AUTH ---
    const [inputPass, setInputPass] = useState("");
    const [masterKey, setMasterKey] = useState(null);
    const [error, setError] = useState("");

    // --- STATE DATA ---
    const [passwords, setPasswords] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // --- STATE UI ---
    const [showPassMap, setShowPassMap] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [formData, setFormData] = useState({ platform: "", email: "", pass: "", desc: "" });
    const [formError, setFormError] = useState(""); // State buat nampung pesan error form

    const handleUnlock = (e) => {
        e.preventDefault();
        const hash = CryptoJS.SHA256(inputPass).toString();
        if (hash === CORRECT_HASH) {
            setMasterKey(inputPass);
            setError("");
        } else {
            setError("Password salah! Hash tidak cocok.");
        }
    };

    const handleLock = () => {
        setMasterKey(null);
        setInputPass("");
        setPasswords([]);
    };

    // --- 2. AMBIL DATA DARI FIRESTORE ---
    useEffect(() => {
        if (!masterKey) return;

        setLoading(true);
        const q = query(collection(db, "passwords"), orderBy("time", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const decryptedData = [];
            snapshot.forEach((docSnap) => {
                const rawData = docSnap.data();
                try {
                    if (rawData.encryptedContent) {
                        const bytes = CryptoJS.AES.decrypt(rawData.encryptedContent, masterKey);
                        const originalText = bytes.toString(CryptoJS.enc.Utf8);
                        if (originalText) {
                            const data = JSON.parse(originalText);
                            decryptedData.push({ id: docSnap.id, ...data });
                        }
                    }
                } catch (err) {
                    console.error("Gagal decrypt:", docSnap.id);
                }
            });
            setPasswords(decryptedData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [masterKey]);

    // --- 3. CRUD (TAMBAH / EDIT / HAPUS) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(""); // Reset error dulu

        // VALIDASI: Cek kalau kosong
        if (!formData.platform.trim() || !formData.email.trim() || !formData.pass.trim()) {
            setFormError("⚠️ Username, Password, dan Platform wajib diisi!");
            return; // Stop proses kalau ada yang kosong
        }

        try {
            // Data Description (desc) otomatis ikut terenkripsi disini
            const contentString = JSON.stringify(formData);
            const encryptedContent = CryptoJS.AES.encrypt(contentString, masterKey).toString();

            if (editMode && currentId) {
                await updateDoc(doc(db, "passwords", currentId), {
                    encryptedContent: encryptedContent,
                    updatedAt: Timestamp.now()
                });
            } else {
                await addDoc(collection(db, "passwords"), {
                    encryptedContent: encryptedContent,
                    time: Timestamp.now().toMillis()
                });
            }
            closeModal();
        } catch (err) {
            console.error(err);
            alert("Error: " + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Hapus password ini?")) {
            await deleteDoc(doc(db, "passwords", id));
        }
    };

    // --- HELPER UI ---
    const openAddModal = () => {
        setFormData({ platform: "", email: "", pass: "", desc: "" });
        setFormError("");
        setEditMode(false);
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        // Load description juga kalau ada
        setFormData({
            platform: item.platform,
            email: item.email,
            pass: item.pass,
            desc: item.desc || ""
        });
        setFormError("");
        setEditMode(true);
        setCurrentId(item.id);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);
    const toggleShowPass = (id) => setShowPassMap(prev => ({ ...prev, [id]: !prev[id] }));
    const copyToClipboard = (text) => {
        toast.success("Copied")
        navigator.clipboard.writeText(text);
    }

    // Filter Search
    const filteredData = passwords.filter(item =>
        item.platform.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    );

    // --- VIEW 1: LOCK SCREEN ---
    if (!masterKey) {
        return (
            <div className="min-h-screen w-full bg-[#111] flex items-center justify-center p-4 font-sans">
                <div className="w-full max-w-md bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-white mb-2">Restricted Area 🔒</h1>
                        <p className="text-gray-400 text-sm">Masukkan password untuk membuka database.</p>
                    </div>
                    <form onSubmit={handleUnlock} className="flex flex-col gap-4">
                        <input
                            type="password"
                            value={inputPass}
                            onChange={(e) => setInputPass(e.target.value)}
                            placeholder="Master Password..."
                            className="h-12 w-full bg-[#0a0a0a] border border-[#333] text-white rounded-lg px-4 focus:outline-none focus:border-blue-500 transition"
                            autoFocus
                        />
                        {error && <p className="text-red-500 text-sm text-center animate-pulse">{error}</p>}
                        <button type="submit" className="cursor-pointer h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition active:scale-95">
                            Masuk
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- VIEW 2: DASHBOARD ---
    return (
        <>
            <Cursor />
            <Toaster
                position='bottom-right'
                gutter={8}
            />
            <div className="min-h-screen w-full bg-[#111] text-gray-200 p-4 md:p-10 relative font-sans">
                <div className="max-w-6xl mx-auto">

                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Password Manager</h1>
                            <p className="text-gray-500 text-sm">Terkoneksi ke Firestore (Encrypted)</p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Cari..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-10 w-full md:w-64 bg-[#1a1a1a] border border-[#333] rounded-lg px-4 text-sm text-white focus:outline-none focus:border-blue-500"
                            />
                            <button onClick={openAddModal} className="cursor-pointer h-10 px-4 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition text-sm flex items-center gap-2">
                                <span>+</span> Baru
                            </button>
                            <button onClick={handleLock} className="cursor-pointer h-10 px-4 bg-red-900/30 text-red-400 border border-red-900/50 hover:bg-red-900/50 rounded-lg transition text-sm">
                                Lock
                            </button>
                        </div>
                    </div>

                    {loading && <p className="text-center text-gray-500 animate-pulse mt-10">Mengambil data dari Firebase...</p>}

                    {/* CARD GRID */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredData.map((item) => (
                            <div key={item.id} className="bg-[#1a1a1a] border border-[#333] rounded-xl p-5 hover:border-gray-600 transition group relative flex flex-col justify-between">

                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-white truncate pr-2">{item.platform}</h3>
                                            {/* Tampilkan deskripsi kalau ada */}
                                            {item.desc && <p className="text-xs text-gray-500 mt-1 italic line-clamp-2">{item.desc}</p>}
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openEditModal(item)} className="cursor-pointer text-gray-400 hover:text-blue-400">✏️</button>
                                            <button onClick={() => handleDelete(item.id)} className="cursor-pointer text-gray-400 hover:text-red-400">🗑️</button>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {/* Email */}
                                        <div className="bg-[#0f0f0f] p-3 rounded-lg border border-[#2a2a2a] flex justify-between items-center">
                                            <p className="text-sm text-gray-300 font-mono truncate">{item.email}</p>
                                            <button onClick={() => copyToClipboard(item.email)} className="cursor-pointer text-gray-500 hover:text-white ml-2">📋</button>
                                        </div>

                                        {/* Password */}
                                        <div className="bg-[#0f0f0f] p-3 rounded-lg border border-[#2a2a2a] flex justify-between items-center">
                                            <p className="text-sm font-mono text-white truncate">
                                                {showPassMap[item.id] ? item.pass : "•••••••••••••"}
                                            </p>
                                            <div className="flex gap-2 ml-2">
                                                <button onClick={() => toggleShowPass(item.id)} className="cursor-pointer text-gray-500 hover:text-white">
                                                    {showPassMap[item.id] ? "🙈" : "👁️"}
                                                </button>
                                                <button onClick={() => copyToClipboard(item.pass)} className="cursor-pointer text-gray-500 hover:text-green-400">📋</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {!loading && filteredData.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            <p>Database kosong atau tidak ditemukan.</p>
                            <p className="text-sm mt-2">Klik tombol <span className="cursor-pointer text-green-500 font-bold">+ Baru</span> di atas.</p>
                        </div>
                    )}
                </div>

                {/* --- MODAL POPUP (FORM UPDATE) --- */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal}></div>
                        <div className="relative w-full max-w-md bg-[#1a1a1a] border border-[#333] rounded-2xl p-6 shadow-2xl animate__animated animate__fadeInUp">

                            <h2 className="text-xl font-bold text-white mb-6">
                                {editMode ? "Edit Password" : "Tambah Password Baru"}
                            </h2>

                            {/* ERROR MESSAGE JIKA ADA YANG KOSONG */}
                            {formError && (
                                <div className="mb-4 bg-red-900/20 border border-red-900/50 p-3 rounded-lg text-red-400 text-sm text-center">
                                    {formError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                                {/* INPUT PLATFORM */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                                        Platform / Nama Akun
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.platform}
                                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                        className={`h-10 w-full bg-[#0a0a0a] border text-white rounded-lg px-3 outline-none focus:border-blue-500 transition ${formError && !formData.platform ? 'border-red-500' : 'border-[#333]'}`}
                                        placeholder="Contoh: Instagram / Facebook"
                                        autoFocus
                                    />
                                </div>

                                {/* INPUT USERNAME / EMAIL */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                                        Username / Email
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`h-10 w-full bg-[#0a0a0a] border text-white rounded-lg px-3 outline-none focus:border-blue-500 transition ${formError && !formData.email ? 'border-red-500' : 'border-[#333]'}`}
                                        placeholder="user@example.com"
                                    />
                                </div>

                                {/* INPUT PASSWORD */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                                        Password
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.pass}
                                        onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
                                        className={`h-10 w-full bg-[#0a0a0a] border text-white rounded-lg px-3 outline-none focus:border-blue-500 font-mono transition ${formError && !formData.pass ? 'border-red-500' : 'border-[#333]'}`}
                                        placeholder="Rahasia123"
                                    />
                                </div>

                                {/* INPUT DESCRIPTION (OPTIONAL) */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
                                        Description (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.desc}
                                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                        className="h-10 w-full bg-[#0a0a0a] border border-[#333] text-white rounded-lg px-3 outline-none focus:border-blue-500"
                                        placeholder="Catatan tambahan (misal: PIN 6 digit)"
                                    />
                                </div>

                                <div className="flex gap-3 mt-4">
                                    <button type="button" onClick={closeModal} className="cursor-pointer flex-1 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition">
                                        Batal
                                    </button>
                                    <button type="submit" className="cursor-pointer flex-1 h-10 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition">
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}