export default function Tachometer({ state }) {
    let rotation = -90; 
    let shake = ""; 

    if (state === "idle") rotation = -90; 
    if (state === "waiting") {
        rotation = 0;
        shake = "animate-pulse"; 
    }
    if (state === "now") rotation = 90; 
    if (state === "false") rotation = 120;
    if (state === "result") rotation = -45; 

    return (
        <div className={`relative w-48 h-24 overflow-hidden mt-6 transition-all duration-300 ${shake}`}>
            <div className="absolute w-48 h-48 bg-gray-800 rounded-full border-[10px] border-gray-700 box-border"></div>
            
            <div className="absolute right-0 bottom-24 w-24 h-24 bg-transparent border-[10px] border-transparent border-r-red-600 rounded-full rotate-45 opacity-50"></div>

            <div className="absolute bottom-0 w-full text-center text-xs font-mono font-bold text-gray-500 tracking-widest">
                x1000 RPM
            </div>

            <div 
                className="absolute bottom-0 left-1/2 w-1 h-24 bg-red-500 origin-bottom rounded-full transition-transform duration-200 ease-out z-10 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
            >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-200 rounded-full border-2 border-gray-900"></div>
            </div>
        </div>
    );
}