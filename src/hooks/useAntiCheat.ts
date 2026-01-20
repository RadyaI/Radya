import { useEffect } from 'react'
import toast from 'react-hot-toast'

export const useAntiCheat = (isActive: boolean) => {
  useEffect(() => {
    if (!isActive) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        toast('Fokus ngerjain ga usah kemana mana', {
          icon: '⚠️',
          style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' },
          duration: 4000
        })
      }
    }

    const handleBlur = () => {
      toast('Hayoo fokus fokus...! ', {
        icon: '🚫',
        style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' },
        duration: 4000
      })
    }

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      toast.error('Gak boleh Copy Paste! ')
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      toast.error('Klik kanan dimatikan!')
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.key === 'c') || 
        (e.ctrlKey && e.key === 'v') || 
        (e.key === 'PrintScreen') ||
        (e.key === 'F12')
      ) {
        e.preventDefault()
        toast.error('Mau ngapain?')
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleBlur)
    document.addEventListener('copy', handleCopy)
    document.addEventListener('paste', handleCopy)
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleBlur)
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('paste', handleCopy)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isActive])
}