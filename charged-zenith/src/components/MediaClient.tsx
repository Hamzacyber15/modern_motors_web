'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Camera, 
  Play, 
  X, 
  ChevronRight, 
  Maximize2, 
  Calendar,
  Tag,
  Share2,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

interface MediaItem {
  id: string
  title: string
  category: 'launches' | 'events' | 'operations'
  type: 'image' | 'video'
  url: string
  date: string
}

const mediaData: MediaItem[] = [
  {
    id: 'launch-forland',
    title: 'OFFICIAL UNVEILING: FORLAND L2 Light Duty',
    category: 'launches',
    type: 'image',
    url: '/WhatsApp Image 2025-11-19 at 16.05.29_0c329cac.jpg',
    date: 'Nov 19, 2025'
  },
  {
    id: 'launch-aumark',
    title: 'FOTON AUMARK S: Muscat Premiere',
    category: 'launches',
    type: 'image',
    url: '/WhatsApp Image 2025-11-19 at 16.05.30_edb468eb.jpg',
    date: 'Nov 19, 2025'
  },
  {
    id: 'event-muscat',
    title: 'Heavy Industry Expo 2025 Highlights',
    category: 'events',
    type: 'image',
    url: '/PHOTO-2025-10-03-04-59-46.jpg',
    date: 'Oct 03, 2025'
  },
  {
    id: 'event-salalah',
    title: 'New Service Center Opening - Salalah',
    category: 'events',
    type: 'image',
    url: '/PHOTO-2025-10-03-04-59-47.jpg',
    date: 'Oct 03, 2025'
  },
  {
    id: 'ops-desert',
    title: 'The Howo T7H conquering Omani Desert Peaks',
    category: 'operations',
    type: 'video',
    url: '/VIDEO-2025-02-17-17-45-47.mp4',
    date: 'Feb 17, 2025'
  },
  {
    id: 'ops-heavy',
    title: 'Midnight Logistics: HOWO Heavy Duty Series',
    category: 'operations',
    type: 'image',
    url: '/heavy.png',
    date: 'Mar 12, 2025'
  }
]

export default function MediaClient({ lang, dict }: { lang: string, dict: any }) {
  const [filter, setFilter] = useState<'all' | 'launches' | 'events' | 'operations'>('all')
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  const filteredItems = mediaData.filter(item => filter === 'all' || item.category === filter)

  return (
    <div className="min-h-screen bg-transparent pb-32">
       {/* 1. CONTROL BAR (Back to Home) */}
       <div className="sticky top-0 z-[100] w-full bg-[var(--background)]/80 backdrop-blur-3xl border-b border-[var(--primary)]/10 py-6 mb-12">
         <div className="container mx-auto px-6 flex justify-between items-center">
           <Link 
             href={`/${lang}`} 
             className="flex items-center gap-4 text-primary font-industrial text-sm font-black tracking-[0.3em] uppercase hover:gap-6 transition-all group"
           >
             <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
             BACK_TO_HOME
           </Link>
           
           <div className="flex items-center gap-6">
              <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.5em]">SYSTEM_MEDIA_ARCHIVE_SYNC</span>
           </div>
         </div>
       </div>

       {/* Background Grid Decoration */}
       <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 scanline-grid" />
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/10 to-transparent" />
       </div>

       <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
             <span className="text-primary font-industrial text-xl font-black tracking-[0.5em] uppercase flex items-center gap-6 mb-8">
                <div className="h-[2px] w-20 bg-primary" />
                INDUSTRIAL_ARCHIVE
             </span>
             <h1 className="text-8xl md:text-9xl font-industrial font-black text-[var(--foreground)] italic uppercase leading-[0.8]">
                CHRONICLES <br /> <span className="text-outline">OF POWER</span>
             </h1>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-6 mb-16 border-b border-[var(--primary)]/10 pb-12">
             {['all', 'launches', 'events', 'operations'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={`px-10 py-4 rounded-2xl font-industrial text-sm font-black tracking-widest uppercase transition-all backdrop-blur-3xl border ${
                    filter === cat 
                    ? 'bg-primary text-brand-secondary border-primary shadow-neon' 
                    : 'bg-[var(--foreground)]/5 text-[var(--foreground)]/40 border-[var(--border-color)] hover:text-primary hover:border-primary/40'
                  }`}
                >
                   {cat === 'all' ? 'FULL ARCHIVE' : cat === 'launches' ? 'RELEASES' : cat === 'events' ? 'EVENTS' : 'SITE OPS'}
                </button>
             ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layoutId={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedItem(item)}
                    className="group relative bg-[var(--foreground)]/5 rounded-[3rem] overflow-hidden border border-[var(--border-color)] cursor-pointer hover:border-primary/50 transition-all duration-700 shadow-2xl"
                  >
                     <div className="relative aspect-[4/3] overflow-hidden">
                        {item.type === 'image' ? (
                           <Image 
                             src={item.url} 
                             alt={item.title} 
                             fill 
                             className="object-cover transition-transform duration-1000 group-hover:scale-110 image-pop" 
                           />
                        ) : (
                           <video 
                             src={item.url} 
                             muted 
                             loop 
                             playsInline 
                             className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                           />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/60 via-transparent to-transparent opacity-80" />
                        
                        {/* Status Tags */}
                        <div className="absolute top-6 left-6 flex items-center gap-3">
                           <div className="px-4 py-2 bg-primary text-brand-secondary rounded-full font-industrial font-black text-[10px] tracking-widest shadow-neon">
                              {item.category.toUpperCase()}
                           </div>
                           {item.type === 'video' && (
                              <div className="w-10 h-10 bg-[var(--background)]/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary border border-[var(--border-color)]">
                                 <Play size={16} className="fill-current" />
                              </div>
                           )}
                        </div>
                     </div>

                     <div className="p-10 space-y-6">
                        <div className="flex items-center gap-4 text-[var(--foreground)]/30">
                           <Calendar size={14} className="text-primary" />
                           <span className="text-[10px] font-black tracking-widest uppercase">{item.date}</span>
                        </div>
                        <h3 className="text-2xl font-industrial font-black text-[var(--foreground)] italic leading-tight group-hover:text-primary transition-colors">
                           {item.title}
                        </h3>
                        <div className="flex items-center justify-between pt-6 border-t border-[var(--border-color)] opacity-40 group-hover:opacity-100 transition-opacity">
                           <div className="flex items-center gap-4">
                              <Tag size={12} className="text-primary" />
                              <span className="text-[9px] font-black uppercase tracking-widest">VISUAL_ASSET_{item.id.slice(0,3)}</span>
                           </div>
                           <Maximize2 size={18} className="text-primary group-hover:rotate-90 transition-transform" />
                        </div>
                     </div>
                  </motion.div>
                ))}
             </AnimatePresence>
          </div>
       </div>

       {/* Fullscreen Lightbox */}
       <AnimatePresence>
          {selectedItem && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[150] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 md:p-20 overflow-hidden"
             >
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-12 right-12 p-6 glass-ultra rounded-full text-white hover:bg-primary transition-all z-[160] shadow-neon"
                >
                   <X size={32} />
                </button>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center"
                >
                   <div className="relative w-full h-[70vh] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                      {selectedItem.type === 'image' ? (
                         <Image src={selectedItem.url} alt={selectedItem.title} fill className="object-contain" p-10 />
                      ) : (
                         <video 
                           src={selectedItem.url} 
                           controls 
                           autoPlay 
                           className="w-full h-full object-contain"
                         />
                      )}
                   </div>
                   
                   <div className="mt-12 text-center max-w-2xl">
                      <div className="flex items-center justify-center gap-4 mb-4">
                         <div className="px-6 py-2 bg-primary/20 text-primary border border-primary/40 rounded-full font-industrial font-black text-xs">
                            {selectedItem.category.toUpperCase()}
                         </div>
                         <span className="text-white/40 font-industrial text-sm font-black">{selectedItem.date}</span>
                      </div>
                      <h2 className="text-5xl font-industrial font-black text-white italic uppercase tracking-tighter">
                         {selectedItem.title}
                      </h2>
                      
                      <div className="mt-12 flex justify-center gap-8">
                         <button className="px-10 py-4 glass text-white font-industrial text-xs font-black tracking-[0.4em] rounded-full hover:bg-white/5 transition-all flex items-center gap-4 uppercase">
                            <Share2 size={16} /> SHARE_ASSET
                         </button>
                         <button className="px-10 py-4 bg-primary text-brand-secondary font-industrial text-xs font-black tracking-[0.4em] rounded-full shadow-neon flex items-center gap-4 uppercase">
                            VIEW_FULL_STORY <ChevronRight size={16} />
                         </button>
                      </div>
                   </div>
                </motion.div>
             </motion.div>
          )}
       </AnimatePresence>
    </div>
  )
}
