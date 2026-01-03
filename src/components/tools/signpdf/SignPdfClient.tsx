"use client";

import { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import toast, { Toaster } from "react-hot-toast";
import {
  Upload, FileText, ChevronLeft, ChevronRight,
  Plus, Download, Lock, ShieldCheck
} from "lucide-react";
import SignatureItem from "./SignatureItem";
import SignatureModal from "./SignatureModal";
import { embedSignatureAndSave, SignatureData } from "@/lib/pdfUtils";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export default function SignPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState(1.0);
  const [signatures, setSignatures] = useState<SignatureData[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const pdfWrapperRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setSignatures([]);
      setPageNumber(1);
    } else {
      toast.error("Format harus PDF ya bro!");
    }
  };

  const addSignature = (dataUrl: string) => {
    const newSig: SignatureData = {
      id: crypto.randomUUID(),
      image: dataUrl,
      x: 50,
      y: 50,
      width: 150,
      height: 75,
      pageIndex: pageNumber - 1,
    };
    setSignatures([...signatures, newSig]);
  };

  const updateSignature = (id: string, newData: Partial<SignatureData>) => {
    setSignatures((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...newData } : s))
    );
  };

  const removeSignature = (id: string) => {
    setSignatures(signatures.filter((s) => s.id !== id));
  };

  const handleDownload = async () => {
    if (!file) return;
    if (isLocked && (!password || password.trim() === "")) {
      toast.error("Password wajib diisi!");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sedang memproses PDF...");

    try {
      const pdfBlob = await embedSignatureAndSave(
        file,
        signatures,
        scale,
        isLocked ? password : undefined,
      );

      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `signed-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Berhasil didownload!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan PDF", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster
        position="bottom-right"
      />
      <div className="overflow-y-hidden min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans">

        <div className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="text-blue-600" />
              <h1 className="font-bold text-lg">SignPDF <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-1">Beta</span></h1>
            </div>

            {file && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFile(null)}
                  className="text-sm text-red-500 hover:text-red-600 font-medium"
                >
                  Ganti File
                </button>
                <button
                  disabled={loading}
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition disabled:opacity-50"
                >
                  {loading ? "Processing..." : <><Download size={16} /> Download PDF</>}
                </button>
              </div>
            )}
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-8">

          {!file ? (
            <div className="mt-10 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
              <div className="w-full max-w-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl p-12 text-center bg-white dark:bg-zinc-900 shadow-sm hover:border-blue-500 transition-colors group">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Upload File PDF Kamu</h2>
                <p className="text-zinc-500 mb-8">
                  Tanda tangan digital aman & gratis. <br />
                  <span className="text-green-600 font-medium flex items-center justify-center gap-1 mt-2 text-sm">
                    <ShieldCheck size={14} /> 100% Client-Side (Privasi Terjaga)
                  </span>
                </p>
                <label className="bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-medium cursor-pointer hover:opacity-80 transition inline-block">
                  Pilih File PDF
                  <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 items-start">

              <div className="w-full lg:w-80 space-y-6 flex-shrink-0">

                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border dark:border-zinc-800 shadow-sm">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Halaman</p>
                  <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                    <button
                      disabled={pageNumber <= 1}
                      onClick={() => setPageNumber(prev => prev - 1)}
                      className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-md disabled:opacity-30 transition"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="font-mono font-medium">{pageNumber} / {numPages}</span>
                    <button
                      disabled={pageNumber >= numPages}
                      onClick={() => setPageNumber(prev => prev + 1)}
                      className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-md disabled:opacity-30 transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border dark:border-zinc-800 shadow-sm space-y-3">
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition shadow-blue-500/20 shadow-lg"
                  >
                    <Plus size={18} /> Tambah Tanda Tangan
                  </button>
                  <p className="text-xs text-zinc-500 text-center">
                    Klik tombol di atas, lalu geser tanda tangan ke posisi yang diinginkan di halaman PDF.
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border dark:border-zinc-800 shadow-sm transition-all hover:shadow-md">

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-full transition-colors ${isLocked ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'}`}>
                        <Lock size={18} />
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-zinc-700 dark:text-zinc-200 block">
                          Proteksi PDF
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsLocked(!isLocked)}
                      className={`relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLocked ? "bg-blue-600" : "bg-zinc-300 dark:bg-zinc-700"
                        }`}
                    >
                      <span className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-300 transform ${isLocked ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-0 pl-1">
                    Dokumen tidak bisa dibuka tanpa password.
                  </p>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isLocked ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>

                    <input
                      type="password"
                      placeholder="Masukkan password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl outline-none transition-all mb-3"
                    />

                  </div>
                </div>
              </div>

              <div className="flex-1 w-full bg-zinc-200 dark:bg-zinc-800/50 rounded-2xl p-4 lg:p-8 flex justify-center min-h-[600px] overflow-auto">
                <div className="relative shadow-2xl" ref={pdfWrapperRef}>
                  <Document
                    file={file}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    loading={<div className="animate-pulse text-zinc-500">Memuat PDF...</div>}
                  >
                    <Page
                      pageNumber={pageNumber}
                      scale={scale}
                      className="shadow-lg"
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </Document>

                  {signatures
                    .filter((sig) => sig.pageIndex === pageNumber - 1)
                    .map((sig) => (
                      <SignatureItem
                        key={sig.id}
                        data={sig}
                        scale={scale}
                        pdfWrapperRef={pdfWrapperRef}
                        onUpdate={updateSignature}
                        onRemove={removeSignature}
                      />
                    ))}
                </div>
              </div>

            </div>
          )}

          {showModal && (
            <SignatureModal
              onSave={addSignature}
              onClose={() => setShowModal(false)}
            />
          )}
        </main>
      </div>
    </>
  );
}