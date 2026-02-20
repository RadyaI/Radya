export default function BlogStyles({ isDark }) {
    return (
        <style>{`
            .bg-grid {
                background-size: 20px 20px;
                background-image: ${isDark
                    ? 'radial-gradient(circle, #ffffff10 1px, transparent 1px)'
                    : 'radial-gradient(circle, #00000010 1px, transparent 1px)'};
            }

            .custom-scroll::-webkit-scrollbar { width: 10px; }
            .custom-scroll::-webkit-scrollbar-track { 
                background: ${isDark ? '#1a1a1a' : '#f4f4f0'}; 
                border-left: 1px solid ${isDark ? '#333' : '#ccc'};
            }
            .custom-scroll::-webkit-scrollbar-thumb { 
                background: ${isDark ? '#333' : '#ccc'}; 
                border: 2px solid ${isDark ? '#1a1a1a' : '#f4f4f0'}; /* Efek padding */
                border-radius: 0px; /* Hapus radius */
            }
            .custom-scroll::-webkit-scrollbar-thumb:hover { 
                background: ${isDark ? '#555' : '#999'}; 
            }

            ::selection {
                background: ${isDark ? '#e5e5e5' : '#1a1a1a'};
                color: ${isDark ? '#1a1a1a' : '#e5e5e5'};
            }
        `}</style>
    );
}