"use client";
import { useState } from 'react';
import { Sparkles, X, BrainCircuit, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AIFeedbackButtonProps {
    result: any;
    questions?: any[];
    quizTitle: string;
}

export default function AIFeedbackButton({ result, questions = [], quizTitle }: AIFeedbackButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    const generatePrompt = () => {
        const score = result.score;
        const scorableAnswers = result.answers.filter((a: any) => a.type !== 'essay');
        const totalScorable = scorableAnswers.length;
        const incorrectAnswers = scorableAnswers.filter((a: any) => !a.isCorrect);

        let details = "";
        if (incorrectAnswers.length > 0) {
            details = incorrectAnswers.map((a: any, i: number) => {
                let originalQuestion = questions.find(q => String(q.id) === String(a.questionId));

                if (!originalQuestion) {
                    const indexInResult = result.answers.findIndex((ans: any) => ans.questionId === a.questionId);
                    if (indexInResult !== -1 && questions[indexInResult]) {
                        originalQuestion = questions[indexInResult];
                    }
                }

                const finalQuestion = originalQuestion || {};
                const qText = finalQuestion.q || 'Teks soal tidak tersedia';
                const qExplanation = finalQuestion.explanation || 'Tidak ada penjelasan.';

                return `[Poin Evaluasi ${i + 1}]
                    - Soal: "${qText}"
                    - Jawaban User: "${a.selectedOption}" (SALAH)
                    - Jawaban Benar: "${a.correctAnswer}"
                    - Penjelasan Asli: "${qExplanation}"`;
            }).join("\n");
        }
        return `
      Context: User baru saja menyelesaikan kuis berjudul "${quizTitle}".
      
      Data Nilai:
      - Skor Akhir (dari Pilihan Ganda): ${score} / 100.
      - Jumlah Soal Pilihan Ganda: ${totalScorable}.
      - Jumlah Kesalahan Pilihan Ganda: ${incorrectAnswers.length}.

      Detail Kesalahan (Hanya Pilihan Ganda):
      ${details || "Tidak ada kesalahan pada pilihan ganda."}

      Instruksi:
      Fokuskan evaluasi HANYA pada performa skor Pilihan Ganda di atas. 
      JANGAN menghitung ulang persentase sendiri, percayalah pada "Skor Akhir" yang saya berikan (${score}).
      
      Panduan Format Jawaban:
      1. Berikan analisis yang mendalam namun mudah dipahami, GUNAKAN FORMAT MARKDOWN H2 untuk kata kata judul per-section dan H1 untuk judul paling atas.
      2. WAJIB gunakan format MARKDOWN (Bullet points) untuk menjabarkan poin-poin saran atau kesalahan. Jangan menulis paragraf yang terlalu panjang dan menumpuk.
      3. BOLD format markdown kata/kalimat yang penting.
      4. Kelompokkan saran berdasarkan topik materi yang perlu dipelajari.
      5. Di paling akhir kasih quotes random dari tokoh terkenal yang kira kira cocok, gunakan format quote markdown.
      6. JIKA ADA kodingan maka gunakan format markdown pre atau code jika inline.
    `;
    };

    const handleClick = async () => {
        setIsOpen(true);
        if (feedback) return;

        setLoading(true);
        try {
            const prompt = generatePrompt();

            const res = await fetch('/api/chat/groq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    persona: 'academicMentor',
                    history: [
                        { role: 'user', text: prompt }
                    ]
                }),
            });

            const data = await res.json();
            if (data.text) {
                setFeedback(data.text);
            } else {
                setFeedback("Maaf, sistem sedang sibuk. Silakan coba lagi nanti.");
            }
        } catch (error) {
            console.error(error);
            setFeedback("Terjadi kesalahan saat memuat analisis.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="mt-3 group flex items-center gap-2 bg-black text-white hover:bg-gray-800 px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider border border-transparent hover:border-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]"
            >
                <BrainCircuit size={16} />
                <span>Analisis AI</span>
                <Sparkles size={12} className="text-yellow-400" />
            </button>

            {isOpen && (
                <div className="fixed h-screen inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">

                    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] w-full max-w-3xl flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200 relative">

                        <div className="p-6 border-b-2 border-black flex justify-between items-center bg-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="bg-black text-white p-2">
                                    <BrainCircuit size={24} />
                                </div>
                                <h3 className="font-bold text-xl uppercase font-serif">Performance Review</h3>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-red-600 hover:text-white border-2 border-transparent hover:border-black transition-colors rounded-sm"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 min-h-0 overflow-y-auto p-6 bg-gray-50">
                            {loading ? (
                                <div className="h-full flex flex-col items-center justify-center gap-3 text-gray-500 py-10">
                                    <Loader2 className="animate-spin w-8 h-8 text-black" />
                                    <p className="animate-pulse text-xs tracking-widest font-mono">MEMPROSES DATA...</p>
                                </div>
                            ) : (
                                <div className="text-sm md:text-base text-gray-900 leading-relaxed pb-2">
                                    <ReactMarkdown
                                        components={{

                                            h1: ({ node, ...props }) => <h1 className="text-xl font-bold" {...props} />,
                                            h2: ({ node, ...props }) => <h2 className="mb-5 mt-6 text-lg font-bold underline" {...props} />,

                                            ul: ({ node, ...props }) => <ul className="list-disc pl-5 ml-8 space-y-2 my-4 text-gray-800" {...props} />,

                                            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 ml-8 space-y-2 my-4 text-gray-800" {...props} />,

                                            li: ({ node, ...props }) => <li className="pl-1 marker:font-bold" {...props} />,
                                            strong: ({ node, ...props }) => <strong className="text-blue-800 font-semibold" {...props} />,
                                            p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
                                            blockquote: ({ node, ...props }) => (
                                                <blockquote className="border-l-4 border-black pl-4 italic text-gray-700 my-4 bg-gray-100 py-2 rounded-r" {...props} />
                                            ),
                                            pre: ({ node, ...props }) => (
                                                <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto my-4 font-mono text-sm shadow-md" {...props} />
                                            ),
                                            code: ({ node, inline, className, children, ...props }: any) => {
                                                if (inline) {
                                                    return (
                                                        <code className="bg-gray-200 text-red-600 px-1.5 py-0.5 rounded-md font-mono text-sm font-bold" {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                }
                                                return (
                                                    <code className="bg-transparent font-mono text-inherit" {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            }
                                        }}
                                    >
                                        {feedback || ''}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t-2 border-black bg-white flex justify-end shrink-0">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-black text-white font-bold px-6 py-2 hover:bg-gray-800 text-xs uppercase"
                            >
                                Tutup
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}