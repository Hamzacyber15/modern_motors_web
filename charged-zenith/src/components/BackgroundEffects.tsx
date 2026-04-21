'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function BackgroundEffects() {
  const [mounted, setMounted] = useState(false)
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains('light'))
    }
    
    checkTheme()
    
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  if (!mounted) return null

  return (
    <div className={`fixed inset-0 pointer-events-none z-[-1] overflow-hidden ${isLight ? 'bg-gradient-to-br from-[#f8f9fa] via-white to-[#f0f4f8]' : 'bg-[var(--background)]'}`}>
      
      {/* 1. ARCHITECTURAL GRID */}
      <div className="absolute inset-0 bg-architectural-grid opacity-100" />

      {/* 2. DYNAMIC VELOCITY LINES (Speed) */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute velocity-line animate-velocity" 
            style={{ 
              top: `${20 + i * 15}%`, 
              left: `${-20 + (i * 10)}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${3 + i}s`
            }} 
          />
        ))}
      </div>

      {/* 3. HIGH-VOLTAGE THUNDERBOLTS (Energy) */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute lightning-bolt animate-lightning"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 80}%`,
              animationDelay: `${i * 3}s`
            }}
          >
            <svg width="200" height="400" viewBox="0 0 200 400" fill="none">
              <path 
                d="M120 20L40 220L100 220L20 380" 
                stroke={isLight ? '#00b8cc' : '#00e5ff'} 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* 4. POWER PULSE RIPPLES (Raw Power) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-1 rounded-full border border-primary animate-ripple opacity-20" />
        <div className="w-1 h-1 rounded-full border border-primary animate-ripple opacity-20" style={{ animationDelay: '2s' }} />
      </div>

      {/* 5. ATMOSPHERIC LUMINOUS DRIFTS */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] flex items-center justify-center pointer-events-none">
         <div className="absolute top-[5%] left-[10%] w-[50%] h-[50%] bg-luminous-drift" />
         <div className="absolute bottom-[5%] right-[10%] w-[60%] h-[60%] bg-luminous-drift" style={{ animationDelay: '-10s' }} />
      </div>

      {/* 6. VIGNETTE FOR SENSORY FOCUS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-40" />
      
      {/* 7. CINEMATIC FILM GRAIN NOISE */}
      <div className="noise-overlay" />
    </div>
  )
}
