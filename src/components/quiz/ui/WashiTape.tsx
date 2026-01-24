interface WashiTapeProps {
  color?: string;
  className?: string;
}

export default function WashiTape({ color = "bg-yellow-300", className = "" }: WashiTapeProps) {
  return (
    <div className={`absolute h-8 w-32 ${color} opacity-90 shadow-sm ${className}`}
         style={{ 
           clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0% 100%)',
           maskImage: 'url("data:image/svg+xml;utf8,<svg width=\'100%\' height=\'100%\' xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'noise\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'3\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23noise)\' opacity=\'0.5\'/></svg>")' 
         }} 
    />
  );
}