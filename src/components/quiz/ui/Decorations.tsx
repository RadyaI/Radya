export function Barcode({ className }: { className?: string }) {
  return (
    <div className={`font-mono text-xs tracking-[0.5em] opacity-50 ${className}`}>
      ||| || ||| | |||| || || |||
      <div className="tracking-normal text-[10px] mt-1">ID: 882-192-X</div>
    </div>
  );
}

export function GridPattern({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0" 
         style={{ 
           backgroundImage: `linear-gradient(${isDark ? '#333' : '#e5e7eb'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#333' : '#e5e7eb'} 1px, transparent 1px)`, 
           backgroundSize: '40px 40px',
           opacity: 0.5
         }} 
    />
  );
}

export function SecretStamp() {
  return (
    <div className="secret-stamp absolute top-0 right-0 border-4 border-red-600 text-red-600 px-4 py-2 text-xl font-black uppercase -rotate-12 opacity-0 mix-blend-multiply select-none pointer-events-none">
      TOP SECRET
    </div>
  );
}