'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, ChevronRight, Activity, Shield, Thermometer, UserCheck, Eye, Settings } from 'lucide-react'

interface Hotspot {
  id: number
  x: number
  y: number
  title: string
  desc: string
  icon: React.ReactNode
}

export default function CockpitViewer({ lang, dict }: { lang: string, dict: any }) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)

  const hotspots: Hotspot[] = [
    { 
      id: 1, x: 25, y: 35, // Glass Cockpit Area
      title: dict.features.hotspot_1_title, 
      desc: dict.features.hotspot_1_desc,
      icon: <Activity size={20} />
    },
    { 
      id: 2, x: 45, y: 55, // Steering Wheel Controls
      title: dict.features.hotspot_2_title, 
      desc: dict.features.hotspot_2_desc,
      icon: <Shield size={20} />
    },
    { 
      id: 3, x: 60, y: 40, // Central AC / Vents
      title: dict.features.hotspot_3_title, 
      desc: dict.features.hotspot_3_desc,
      icon: <Thermometer size={20} />
    },
    { 
      id: 4, x: 80, y: 65, // Seating / Ergonomics
      title: dict.features.hotspot_4_title, 
      desc: dict.features.hotspot_4_desc,
      icon: <UserCheck size={20} />
    },
    { 
      id: 5, x: 65, y: 60, // Air Brake Levers (Yellow/Red)
      title: dict.features.hotspot_5_title, 
      desc: dict.features.hotspot_5_desc,
      icon: <Settings size={20} />
    },
    { 
      id: 6, x: 55, y: 70, // Diff Lock Switches
      title: dict.features.hotspot_6_title, 
      desc: dict.features.hotspot_6_desc,
      icon: <Eye size={20} />
    },
  ]

  return (
    <div className={`w-full h-[700px] relative bg-black rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/5 ${lang === 'ar' ? 'font-arabic' : ''}`}>
      {/* High-Fidelity Background */}
      <div className="absolute inset-0 select-none">
        <Image 
          src="/forland_cockpit.png" 
          alt="Modern Motors Industrial Cockpit" 
          fill
          className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Interactive Hotspots */}
      <div className="absolute inset-0 z-20">
        {hotspots.map((spot) => (
          <motion.button
            key={spot.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + spot.id * 0.1 }}
            onClick={() => setActiveHotspot(spot)}
            className="absolute w-14 h-14 flex items-center justify-center group/spot"
            style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="absolute inset-0 bg-primary animate-ping rounded-full opacity-20" />
            <div className="absolute inset-0 bg-primary/20 group-hover/spot:bg-primary/40 rounded-full transition-all duration-500 border border-primary/40 group-hover/spot:scale-110" />
            <div className="absolute inset-[3px] bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Plus className="text-primary relative z-10 transition-transform duration-500 group-hover/spot:rotate-90" size={20} />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Side Details Panel */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? -400 : 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: lang === 'ar' ? -400 : 400 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className={`absolute top-0 ${lang === 'ar' ? 'left-0 border-r' : 'right-0 border-l'} bottom-0 w-full md:w-[450px] bg-[var(--background)]/80 backdrop-blur-3xl z-50 border-[var(--border-color)] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]`}
          >
            <div className="p-12 flex-1">
              <button 
                onClick={() => setActiveHotspot(null)}
                className="inline-flex items-center gap-2 text-[var(--foreground)]/40 hover:text-primary transition-colors mb-16 uppercase font-industrial text-[10px] font-black tracking-[0.5em]"
              >
                <X size={14} /> Close Interface
              </button>

              <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center text-primary mb-10 border border-primary/20 shadow-[0_0_30px_var(--primary-glow)]">
                {activeHotspot.icon}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span className="text-primary/60 font-industrial text-[10px] font-black tracking-[0.6em] uppercase">SYSTEM ANALYSIS</span>
              </div>
              
              <h3 className="text-5xl font-industrial font-black text-[var(--foreground)] italic leading-none uppercase mb-8 tracking-tighter">
                {activeHotspot.title}
              </h3>
              
              <div className="w-full h-px bg-gradient-to-r from-primary/40 to-transparent mb-8" />
              
              <p className="text-[var(--foreground)]/70 text-xl leading-relaxed font-light">
                {activeHotspot.desc}
              </p>

              <div className="mt-16 grid grid-cols-2 gap-4">
                 <div className="p-6 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--border-color)] space-y-2">
                    <span className="text-[9px] font-black text-[var(--foreground)]/20 tracking-widest uppercase block">Status</span>
                    <span className="text-primary text-xs font-black tracking-widest uppercase block">NOMINAL</span>
                 </div>
                 <div className="p-6 rounded-2xl bg-[var(--foreground)]/5 border border-[var(--border-color)] space-y-2">
                    <span className="text-[9px] font-black text-[var(--foreground)]/20 tracking-widest uppercase block">Mechanical</span>
                    <span className="text-[var(--foreground)] text-xs font-black tracking-widest uppercase block">ULTRA-HEAVY</span>
                 </div>
              </div>
            </div>

            <div className="p-10 bg-[var(--background)]/60 backdrop-blur-xl border-t border-[var(--border-color)]">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-industrial text-[10px] font-black tracking-widest text-[var(--foreground)]/40 uppercase">Industrial Standard Certified</span>
                  </div>
                  <ChevronRight size={16} className="text-primary" />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Permanent Header Overlay */}
      <div className="absolute top-12 left-12 p-8 glass rounded-[2rem] border border-white/10 z-10 pointer-events-none group-hover:border-primary/30 transition-all duration-1000">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_20px_#00e5ff]" />
          <span className="font-industrial text-[10px] font-black tracking-[0.5em] text-primary/80 uppercase">{dict.features.title}</span>
        </div>
        <h2 className="font-industrial text-4xl font-black text-white italic uppercase leading-none tracking-tighter">
          {dict.features.subtitle.split(' ').slice(0, 2).join(' ')} <br/>
          <span className="text-primary drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">{dict.features.subtitle.split(' ').slice(2).join(' ')}</span>
        </h2>
      </div>

      {/* Interaction Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 pointer-events-none"
      >
        <div className="w-px h-12 bg-gradient-to-t from-primary to-transparent" />
        <span className="text-[8px] font-black tracking-[0.4em] text-white uppercase italic">EXPLORE MECHANICAL INTERFACE</span>
      </motion.div>
    </div>
  )
}
