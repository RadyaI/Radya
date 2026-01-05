'use client'
import { useEffect } from 'react'
import hljs from 'highlight.js'

export default function CodeEnhancer() {
  useEffect(() => {
    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightElement(block)
    })
  }, [])

  return null
}
