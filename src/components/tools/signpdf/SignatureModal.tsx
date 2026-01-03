"use client";
import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { X, Check, Upload, Type, PenTool, Eraser, PenLine } from "lucide-react";

interface Props {
  onSave: (dataUrl: string) => void;
  onClose: () => void;
}

export default function SignatureModal({ onSave, onClose }: Props) {
  const [tab, setTab] = useState<"draw" | "type" | "upload">("draw");
  const [text, setText] = useState("");
  
  const [penType, setPenType] = useState<"monoline" | "variable">("monoline");
  
  const sigRef = useRef<SignatureCanvas>(null);

  const handleSave = () => {
    if (tab === "draw" && sigRef.current) {
      if (sigRef.current.isEmpty()) return;
      onSave(sigRef.current.getTrimmedCanvas().toDataURL("image/png"));
    } else if (tab === "type" && text) {
      const canvas = document.createElement("canvas");
      canvas.width = text.length * 30 + 40;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.font = "italic bold 48px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText(text, 20, 70);
        onSave(canvas.toDataURL("image/png"));
      }
    }
    onClose();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) onSave(evt.target.result as string);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between p-4 border-b dark:border-zinc-800">
          <h3 className="font-bold text-lg">Buat Tanda Tangan</h3>
          <button onClick={onClose} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="flex p-2 gap-2 justify-center bg-zinc-50 dark:bg-zinc-950/50">
          {[
            { id: "draw", label: "Gambar", icon: PenTool },
            { id: "type", label: "Ketik", icon: Type },
            { id: "upload", label: "Upload", icon: Upload },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                tab === t.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 min-h-[250px] bg-zinc-100 dark:bg-zinc-950/30 relative flex flex-col">
          
          {tab === "draw" && (
            <>
              <div className="flex justify-center mb-3 gap-3">
                <button
                  onClick={() => setPenType("monoline")}
                  className={`text-xs px-3 py-1 rounded-full border transition flex items-center gap-1 ${
                    penType === "monoline"
                      ? "bg-zinc-800 text-white border-zinc-800 dark:bg-white dark:text-black"
                      : "bg-white text-zinc-600 border-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-700"
                  }`}
                >
                  <PenLine size={12} /> Ballpoint
                </button>
                <button
                  onClick={() => setPenType("variable")}
                  className={`text-xs px-3 py-1 rounded-full border transition flex items-center gap-1 ${
                    penType === "variable"
                      ? "bg-zinc-800 text-white border-zinc-800 dark:bg-white dark:text-black"
                      : "bg-white text-zinc-600 border-zinc-300 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-700"
                  }`}
                >
                  <PenTool size={12} /> Kuas
                </button>
              </div>

              <div className="relative w-full h-[200px] bg-white rounded-xl shadow-sm border border-dashed border-zinc-300 overflow-hidden">
                <SignatureCanvas
                  ref={sigRef}
                  penColor="black"
                  minWidth={penType === "monoline" ? 2 : 0.5}
                  maxWidth={penType === "monoline" ? 2 : 2.5}
                  velocityFilterWeight={penType === "monoline" ? 0 : 0.7}
                  canvasProps={{ className: "w-full h-full" }}
                />
                
                <button 
                  onClick={() => sigRef.current?.clear()} 
                  className="absolute top-2 right-2 p-2 bg-zinc-100 rounded-full hover:bg-red-100 text-zinc-500 hover:text-red-500 transition shadow-sm z-10"
                  title="Hapus"
                >
                  <Eraser size={16} />
                </button>
              </div>
              <p className="text-center text-xs text-zinc-400 mt-2">
                Tips: Gunakan mode "Ballpoint" jika menggunakan mouse.
              </p>
            </>
          )}

          {tab === "type" && (
            <div className="flex items-center justify-center flex-1">
              <input
                autoFocus
                type="text"
                placeholder="Ketik nama anda..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full text-center text-4xl font-bold italic bg-transparent border-b-2 border-blue-500 outline-none py-2"
              />
            </div>
          )}

          {tab === "upload" && (
            <div className="text-center w-full flex-1 flex items-center justify-center">
              <label className="cursor-pointer block p-8 border-2 border-dashed border-zinc-300 rounded-xl hover:border-blue-500 transition hover:bg-blue-50 dark:hover:bg-blue-900/10 w-full">
                <Upload className="mx-auto h-10 w-10 text-zinc-400 mb-2" />
                <span className="text-sm font-medium">Klik untuk upload gambar</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
            </div>
          )}
        </div>

        <div className="p-4 border-t dark:border-zinc-800 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg">
            Batal
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-500/30 transition-all"
          >
            <Check size={16} /> Pakai Tanda Tangan
          </button>
        </div>
      </div>
    </div>
  );
}