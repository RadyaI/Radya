import { useState, useRef, useLayoutEffect } from "react";
import { Mail, Phone, MapPin, Copy, Check, ExternalLink, Smartphone } from "lucide-react";
import gsap from "gsap";

export default function Contact() {
    
    const [copied, setCopied] = useState(null);
    const containerRef = useRef(null);

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".contact-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.2)"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="h-full relative overflow-hidden bg-white text-neutral-900">
            
            <style>{`
                .scroll-container {
                    overflow-y: auto;
                    height: 100%;
                    padding-right: 8px;
                }
                .scroll-container::-webkit-scrollbar { width: 6px; }
                .scroll-container::-webkit-scrollbar-track { background: transparent; }
                .scroll-container::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; border: 1px solid #000; }
                .scroll-container::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
            `}</style>

            <div className="scroll-container">
                <div className="px-2 md:px-4 pb-10 font-serif">
                    
                    <div className="contact-item mb-8 pt-4 flex items-center gap-3 border-b-2 border-black pb-2 sticky top-0 bg-white/95 backdrop-blur-sm z-20">
                        <span className="font-mono text-sm font-bold bg-black text-white px-2 py-0.5 rounded-sm">// 05</span>
                        <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Contact.</h3>
                    </div>

                    <div className="flex flex-col gap-6">

                        <div className="contact-item relative group">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-red-200/80 rotate-1 z-10 shadow-sm border-l border-r border-white/40"></div>
                            
                            <div className="bg-white border-2 border-black rounded-lg p-6 relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                                <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#000_0px,#000_1px,transparent_1px,transparent_10px)] pointer-events-none"></div>
                                
                                <div className="relative z-10 flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 text-blue-900 rounded-lg border-2 border-black group-hover:scale-110 group-hover:rotate-6 transition duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <MapPin className="w-6 h-6 stroke-[2.5px]" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1 bg-white w-fit px-1">Base Location</h4>
                                        <p className="text-xl font-black text-black">Malang, Indonesia</p>
                                        <p className="text-sm text-gray-600 font-mono font-bold">Postal Code: 65139</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-item">
                            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-3 pl-1 flex items-center gap-2">
                                <Mail className="w-3 h-3" /> Email Frequency
                            </h4>
                            <div className="flex flex-col gap-4">
                                <EmailCard 
                                    email="radyaiftikhar@gmail.com" 
                                    label="Personal" 
                                    copied={copied} 
                                    onCopy={handleCopy} 
                                    tapeColor="#facc15"
                                />
                                <EmailCard 
                                    email="radyaproject@gmail.com" 
                                    label="Work / Project" 
                                    copied={copied} 
                                    onCopy={handleCopy} 
                                    tapeColor="#60a5fa"
                                />
                            </div>
                        </div>

                        <div className="contact-item">
                            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-3 pl-1 flex items-center gap-2">
                                <Phone className="w-3 h-3" /> Direct Line
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <a 
                                    href="https://wa.me/6287716212000" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 bg-green-50 border-2 border-black rounded-lg hover:bg-green-100 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 group"
                                >
                                    <div className="p-2 bg-green-200 text-green-900 border-2 border-black rounded-md shadow-sm">
                                        <Smartphone className="w-5 h-5 stroke-[2.5px]" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-green-800 font-black uppercase">WhatsApp</div>
                                        <div className="text-sm text-black font-mono font-bold">+62 877...</div>
                                    </div>
                                    <ExternalLink className="w-3 h-3 text-black ml-auto group-hover:scale-125 transition-transform" />
                                </a>

                                <a 
                                    href="tel:+6287716212000"
                                    className="flex items-center gap-3 p-4 bg-white border-2 border-black rounded-lg hover:bg-gray-50 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 group"
                                >
                                    <div className="p-2 bg-gray-200 text-gray-900 border-2 border-black rounded-md shadow-sm">
                                        <Phone className="w-5 h-5 stroke-[2.5px]" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-800 font-black uppercase">Call / Cell</div>
                                        <div className="text-sm text-black font-mono font-bold">+62 877...</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

function EmailCard({ email, label, copied, onCopy, tapeColor }) {
    const isCopied = copied === email;

    return (
        <div className="group relative flex items-center justify-between p-4 bg-white border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all duration-300">
            
            <div 
                className="absolute -top-2 -left-2 w-12 h-4 rotate-[-10deg] shadow-sm opacity-90 border-l border-r border-white/40 z-10"
                style={{ backgroundColor: tapeColor }}
            ></div>

            <div className="flex items-center gap-4 relative z-10">
                <div className={`p-2 rounded-lg border-2 border-black transition-colors ${isCopied ? 'bg-green-200 text-green-900' : 'bg-gray-100 text-black group-hover:bg-yellow-200'}`}>
                    <Mail className="w-5 h-5 stroke-[2.5px]" />
                </div>
                <div>
                    <div className="text-[10px] text-gray-500 uppercase font-black mb-0.5">{label}</div>
                    <div className="text-sm md:text-base font-bold text-black font-mono break-all group-hover:underline decoration-2 underline-offset-2">{email}</div>
                </div>
            </div>

            <button 
                onClick={() => onCopy(email, email)}
                className="p-2 rounded-md hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition active:scale-95 text-gray-400"
                title="Copy Email"
            >
                {isCopied ? (
                    <Check className="w-5 h-5 text-green-600 stroke-[3px]" />
                ) : (
                    <Copy className="w-5 h-5 stroke-[2.5px]" />
                )}
            </button>
        </div>
    );
}