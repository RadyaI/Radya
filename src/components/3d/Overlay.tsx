export function Overlay({ isLocked }: { isLocked: boolean }) {
  if (isLocked) return null

  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, left: 0, width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
      color: 'white', 
      fontFamily: 'monospace', 
      textAlign: 'center',
      pointerEvents: 'none', 
      zIndex: 10
    }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>KLIK LAYAR UNTUK MAIN</h1>
        <p>W A S D : Gerak</p>
        <p>MOUSE : Arah Kamera</p>
        <p>SPASI : Lompat</p>
        <p style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.7 }}>ESC untuk pause/keluar</p>
    </div>
  )
}