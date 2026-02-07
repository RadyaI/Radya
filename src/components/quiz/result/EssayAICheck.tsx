"use client";
import { useState } from 'react';
import { Sparkles, Loader2, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface EssayAICheckProps {
  question: string;
  userAnswer: string;
  answerKey: string;
}

export default function EssayAICheck({ question, userAnswer, answerKey }: EssayAICheckProps) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheck = async () => {
    if (feedback) {
      setIsOpen(!isOpen);
      return;
    }

    setLoading(true);
    setIsOpen(true);

    try {
      const prompt = `
        Context: Bertindaklah sebagai Dosen IT yang menilai jawaban essay mahasiswa.
        
        Soal: "${question}"
        Jawaban User: "${userAnswer}"
        Kunci Jawaban (Referensi): "${answerKey}"

        Instruksi Penilaian (PENTING):
        1. Fokus pada SUBSTANSI dan PEMAHAMAN KONSEP, bukan kemiripan kata-kata.
        2. Jika jawaban user menggunakan kalimat berbeda TAPI maksud/logikanya BENAR sesuai konteks soal, maka ANGGAP BENAR.
        3. Berikan toleransi pada penggunaan sinonim atau bahasa sendiri, selama konsep teknisnya tidak salah.
        4. Jangan menyalahkan jawaban hanya karena kurang lengkap sedikit, selama inti utamanya sudah kena.

        Format Respon:
        - Gunakan emoji checklist kalo benar, dan emoji silang kalo salah
        - Jika Benar (Secara Konsep): Berikan validasi/pujian singkat (Contoh: "Pemahaman konsep sudah tepat.", "Logika benar meskipun bahasanya berbeda.").
        - Jika Salah/Melenceng: Koreksi bagian fatalnya saja.
        - Wajib SINGKAT & PADAT (Maksimal 2 kalimat). Gunakan Bahasa Indonesia yang santai tapi edukatif.
      `;

      const res = await fetch('/api/chat/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: 'academicMentor',
          history: [{ role: 'user', text: prompt }]
        }),
      });

      const data = await res.json();
      setFeedback(data.text || "Gagal memuat analisis.");
    } catch (error) {
      setFeedback("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block ml-2">
      { }
      <button
        onClick={handleCheck}
        disabled={loading}
        className={`
          flex items-center gap-1.5 px-2 py-0.5 text-xs font-bold border transition-all cursor-pointer select-none
          ${isOpen || loading
            ? 'bg-indigo-600 text-white border-indigo-600'
            : 'bg-indigo-100 text-indigo-700 border-indigo-300 hover:bg-indigo-200'
          }
        `}
      >
        {loading ? (
          <Loader2 size={10} className="animate-spin" />
        ) : (
          <Sparkles size={10} className={isOpen ? "text-white fill-white" : "text-indigo-500 fill-indigo-500"} />
        )}
        <span>AI CHECK</span>
      </button>

      { }
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[300px] md:w-[400px] z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-left">
          { }
          <div className="absolute -top-1.5 left-4 w-3 h-3 bg-white border-t border-l border-gray-900 rotate-45 transform"></div>

          <div className="bg-white border-2 border-gray-900 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs md:text-sm text-gray-900 leading-relaxed relative">

            { }
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X size={14} />
            </button>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-4 gap-2 text-indigo-500">
                <Loader2 size={20} className="animate-spin" />
                <span className="font-mono text-[10px] uppercase tracking-widest">Analyzing...</span>
              </div>
            ) : (
              <div className="markdown-feedback pr-4">
                <ReactMarkdown>{feedback || ''}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}