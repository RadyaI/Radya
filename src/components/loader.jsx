export default function Loader() {
    return (
        <div className="fixed top-0 left-0 w-full h-[4px] z-[9999] overflow-hidden pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-laser shadow-[0_0_20px_#3b82f6]"></div>

            <style>{`
                @keyframes laser {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-laser {
                    animation: laser 0.8s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}