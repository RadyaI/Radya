"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Trash2, Maximize2 } from "lucide-react";
import { SignatureData } from "@/lib/pdfUtils";

interface Props {
  data: SignatureData;
  scale: number;
  pdfWrapperRef: React.RefObject<HTMLDivElement>;
  onUpdate: (id: string, newData: Partial<SignatureData>) => void;
  onRemove: (id: string) => void;
}

export default function SignatureItem({ data, scale, pdfWrapperRef, onUpdate, onRemove }: Props) {
  const [isResizing, setIsResizing] = useState(false);
  
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    
    startX.current = e.clientX;
    startWidth.current = data.width;

    window.addEventListener("mousemove", handleResizeMove);
    window.addEventListener("mouseup", handleResizeEnd);
  };

  const handleResizeMove = (e: MouseEvent) => {
    const deltaX = e.clientX - startX.current;
    
    const newWidth = Math.max(30, startWidth.current + deltaX);
    
    onUpdate(data.id, { width: newWidth });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    window.removeEventListener("mousemove", handleResizeMove);
    window.removeEventListener("mouseup", handleResizeEnd);
  };

  const handleDragEnd = (event: any, info: any) => {
    const el = document.getElementById(`sig-${data.id}`);
    const container = pdfWrapperRef.current;
    
    if (el && container) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      
      const newX = elRect.left - containerRect.left;
      const newY = elRect.top - containerRect.top;

      onUpdate(data.id, { x: newX, y: newY });
    }
  };

  return (
    <motion.div
      id={`sig-${data.id}`}
      drag
      dragMomentum={false}
      dragConstraints={pdfWrapperRef}
      onDragEnd={handleDragEnd}
      dragListener={!isResizing}
      initial={{ x: data.x, y: data.y }}
      className={`absolute top-0 left-0 group z-50 ${isResizing ? 'cursor-ew-resize' : 'cursor-move'}`}
      style={{ 
        width: data.width, 
        touchAction: "none"
      }}
    >
      <div className={`relative border-2 ${isResizing ? 'border-blue-500' : 'border-transparent group-hover:border-blue-400 border-dashed'} rounded transition-colors`}>
        
        <img 
          src={data.image} 
          alt="Signature" 
          className="w-full h-auto pointer-events-none select-none" 
          draggable={false}
        />

        <button
          onClick={() => onRemove(data.id)}
          onPointerDown={(e) => e.stopPropagation()} 
          className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-20"
          title="Hapus"
        >
          <Trash2 size={12} />
        </button>

        <div 
          className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full cursor-se-resize flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20"
          onMouseDown={handleResizeStart}
        >
          <Maximize2 size={10} className="text-white rotate-90" />
        </div>

      </div>
    </motion.div>
  );
}