import { useState } from "react";
import { Mail, Phone, MapPin, Copy, Check, ExternalLink, Smartphone } from "lucide-react";
import 'animate.css';

export default function Contact() {
    
    const [copied, setCopied] = useState(null);

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="h-full relative overflow-hidden">
            
            <style>{`
                .scroll-container {
                    overflow-y: auto;
                    height: 100%;
                    padding-right: 8px;
                }
                .scroll-container::-webkit-scrollbar { width: 4px; }
                .scroll-container::-webkit-scrollbar-track { background: transparent; }
                .scroll-container::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 10px; }
                .scroll-container::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.4); }
            `}</style>

            <div className="scroll-container">
                <div className="px-2 md:px-4 pb-10 font-sans text-gray-300">
                    
                    <div className="mb-8 animate__animated animate__fadeInDown">
                        <div className="relative z-10 flex justify-end items-center gap-3">
                            <span className="text-purple-400 font-mono text-sm">// 05</span>
                            <h3 className="text-2xl font-bold text-white text-right">Transmission.</h3>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">

                        <div className="bg-[#111] border border-white/5 rounded-2xl p-6 relative overflow-hidden group animate__animated animate__fadeInUp">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                            
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="p-3 bg-blue-900/20 text-blue-400 rounded-xl border border-blue-500/20 group-hover:scale-110 transition duration-300">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Base Location</h4>
                                    <p className="text-lg font-bold text-white">Malang, Indonesia</p>
                                    <p className="text-sm text-gray-400 font-mono">Postal Code: 65139</p>
                                </div>
                            </div>
                        </div>

                        <div className="animate__animated animate__fadeInUp animate__delay-1s">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 pl-1">Email Frequency</h4>
                            <div className="flex flex-col gap-3">
                                <EmailCard 
                                    email="radyaiftikhar@gmail.com" 
                                    label="Personal" 
                                    copied={copied} 
                                    onCopy={handleCopy} 
                                />
                                <EmailCard 
                                    email="radyaproject@gmail.com" 
                                    label="Work / Project" 
                                    copied={copied} 
                                    onCopy={handleCopy} 
                                />
                            </div>
                        </div>

                        <div className="animate__animated animate__fadeInUp animate__delay-2s">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 pl-1">Direct Line</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <a 
                                    href="https://wa.me/6287716212000" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 bg-[#111] border border-green-500/20 rounded-xl hover:bg-green-900/10 hover:border-green-500/50 transition duration-300 group"
                                >
                                    <div className="p-2 bg-green-900/20 text-green-400 rounded-lg">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-green-400 font-bold uppercase">WhatsApp</div>
                                        <div className="text-sm text-white font-mono">+62 877...</div>
                                    </div>
                                    <ExternalLink className="w-3 h-3 text-gray-600 ml-auto group-hover:text-green-400 transition" />
                                </a>

                                <a 
                                    href="tel:+6287716212000"
                                    className="flex items-center gap-3 p-4 bg-[#111] border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/30 transition duration-300 group"
                                >
                                    <div className="p-2 bg-white/5 text-gray-300 rounded-lg">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 font-bold uppercase">Call / Cell</div>
                                        <div className="text-sm text-white font-mono">+62 877...</div>
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

function EmailCard({ email, label, copied, onCopy }) {
    const isCopied = copied === email;

    return (
        <div className="group flex items-center justify-between p-4 bg-[#111] border border-white/5 rounded-xl hover:border-blue-500/30 transition duration-300">
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg transition-colors ${isCopied ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-400 group-hover:text-blue-400'}`}>
                    <Mail className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold mb-0.5">{label}</div>
                    <div className="text-sm md:text-base font-bold text-white font-mono break-all">{email}</div>
                </div>
            </div>

            <button 
                onClick={() => onCopy(email, email)}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition active:scale-95"
                title="Copy Email"
            >
                {isCopied ? (
                    <Check className="w-5 h-5 text-green-400 animate__animated animate__bounceIn" />
                ) : (
                    <Copy className="w-5 h-5" />
                )}
            </button>
        </div>
    );
}