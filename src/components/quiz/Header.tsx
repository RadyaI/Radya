"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AuthButton from './AuthButton';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function Header() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { contextSafe } = useGSAP({ scope: titleRef });

  useGSAP(() => {
    const spans = titleRef.current?.querySelectorAll(".char");
    if (!spans) return;

    gsap.fromTo(spans, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "back.out(2)" }
    );

    spans.forEach((span, i) => {
      const originalText = span.textContent || "";
      const tl = gsap.timeline({ delay: i * 0.05 });
      
      tl.to(span, {
        duration: 1,
        onUpdate: function() {
          const progress = this.progress();
          if (progress < 1) {
            span.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
          } else {
            span.textContent = originalText;
          }
        }
      });
    });
  }, { scope: titleRef });

  const handleMouseMove = contextSafe((e: React.MouseEvent) => {
    const spans = titleRef.current?.querySelectorAll(".char");
    if (!spans) return;

    spans.forEach((span) => {
      const rect = (span as HTMLElement).getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;
      
      const dist = Math.hypot(e.clientX - charCenterX, e.clientY - charCenterY);
      const maxDist = 100; 

      if (dist < maxDist) {
        const force = (maxDist - dist) / maxDist;
        const angle = Math.atan2(e.clientY - charCenterY, e.clientX - charCenterX);
        
        gsap.to(span, {
          x: -Math.cos(angle) * force * 30, 
          y: -Math.sin(angle) * force * 30,
          rotation: Math.random() * 20 - 10,
          color: "#2563eb", 
          duration: 0.2,
          ease: "power2.out"
        });
      } else {
        gsap.to(span, {
          x: 0,
          y: 0,
          rotation: 0,
          color: "black",
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      }
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(".char", {
      x: 0, y: 0, rotation: 0, color: "black", duration: 0.5, ease: "elastic.out(1, 0.3)"
    });
  });

  return (
    <header className="relative mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-black border-double pb-6">
      <div 
        ref={titleRef} 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="cursor-crosshair select-none py-2" 
      >
        <div className="inline-block bg-black text-white px-2 py-1 font-mono text-xs mb-2 -rotate-2">
          EST. 2026 // RADYA.MY.ID
        </div>
        <h1 className="text-7xl md:text-9xl font-serif font-black tracking-tighter leading-[0.8]">
          {"QUIZ_CUY".split("").map((char, i) => (
             <span key={i} className="char inline-block relative">{char}</span>
          ))}
        </h1>
      </div>
      
      <div className="flex flex-col items-end gap-4 mt-8 md:mt-0 pointer-events-none md:pointer-events-auto">
         <div className="hidden md:block w-32 h-32 relative">
             <img src="/images/cats/cat5.png" className="absolute -top-10 -left-10 w-full h-full object-contain animate-bounce" alt="mascot" />
         </div>
         <AuthButton />
      </div>
    </header>
  );
}