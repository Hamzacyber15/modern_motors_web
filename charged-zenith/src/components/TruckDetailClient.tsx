'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  ChevronRight, 
  Download, 
  Zap, 
  Settings as EngineIcon, 
  Activity, 
  Ruler, 
  ShieldCheck, 
  Maximize2, 
  Cpu,
  TrendingUp,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { Truck } from '@/services/trucks'
import Footer from '@/components/Footer'

interface TruckDetailClientProps {
  lang: string
  dict: any
  truck: Truck
}

export default function TruckDetailClient({ lang, dict, truck }: TruckDetailClientProps) {
  const [activeMedia, setActiveMedia] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const isAr = lang === 'ar'
  const filmStripRef = useRef<HTMLDivElement>(null)

  const activeItem = truck.gallery[activeMedia]

  const handleDownloadPDF = () => {
    const content = `TECHNICAL DOSSIER: ${truck.name}\n\nBrand: ${truck.brand}\nCapacity: ${truck.capacity}\nEngine: ${truck.engine}\nPrice: ${truck.price}\n\nSPECIFICATIONS:\n${Object.entries(truck.specs).map(([k, v]) => `- ${k}: ${v}`).join('\n')}\n\nDETAILED PERFORMANCE:\n${Object.entries(truck.detailedSpecs.performance).map(([k, v]) => `- ${k}: ${v}`).join('\n')}`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${truck.id}_technical_dossier.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className={`bg-transparent min-h-screen relative ${isAr ? 'font-arabic' : 'font-premium'}`}>
      <Navigation lang={lang} dict={dict} />

      {/* 1. PROFESSIONAL CONTROL BAR (Sticky Sub-Nav) */}
      <div className="sticky top-0 z-[100] w-full bg-black/80 backdrop-blur-3xl border-b border-white/5 py-6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link 
            href={`/${lang}/trucks`} 
            className="flex items-center gap-4 text-primary font-industrial text-sm font-black tracking-[0.3em] uppercase hover:gap-6 transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
            BACK_TO_DIRECTORY
          </Link>
          
          <div className="flex items-center gap-10">
            <div className="hidden md:flex flex-col text-right border-r border-white/10 pr-8">
               <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">CURRENT_ASSET</span>
               <span className="text-white text-sm font-black uppercase">{truck.name}</span>
            </div>
            <button 
              onClick={handleDownloadPDF}
              className="px-10 py-4 bg-primary text-brand-secondary rounded-full font-industrial text-sm font-black italic tracking-widest hover:scale-105 transition-all shadow-neon flex items-center gap-4"
            >
              DOWNLOAD_DOSSIER
              <Download size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. RESTRUCTURED MEDIA & FEATURES HUB */}
      <section className="relative pt-12 pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* COLUMN LEFT: Main Media Gallery (8 Units) */}
            <div className="lg:col-span-8 space-y-8">
              <motion.div 
                className="relative w-full aspect-[16/9] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMedia}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image src={activeItem.url} alt={activeItem.label} fill className="object-cover" priority />
                  </motion.div>
                </AnimatePresence>
                
                {/* Visual Overlays */}
                <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black via-transparent to-transparent">
                   <div className="flex items-center gap-4 text-primary">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-neon" />
                      <span className="text-[10px] font-black tracking-[0.5em] uppercase italic">OPTICAL_LINK_ACTIVE: 0{activeMedia + 1}</span>
                   </div>
                   <h3 className="text-4xl font-industrial font-black text-white italic uppercase mt-2">{activeItem.label}</h3>
                </div>

                <button 
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute top-8 right-8 p-4 glass-ultra rounded-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Maximize2 size={24} />
                </button>
              </motion.div>

              {/* Enhanced Film-Strip */}
              <div className="relative">
                <div 
                  className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar"
                  ref={filmStripRef}
                >
                  {truck.gallery.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMedia(idx)}
                      className={`relative flex-shrink-0 w-40 aspect-video rounded-2xl overflow-hidden border-2 transition-all snap-center ${
                        activeMedia === idx ? 'border-primary ring-4 ring-primary/20 scale-105' : 'border-white/5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100'
                      }`}
                    >
                      <Image src={item.url} alt={item.label} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* COLUMN RIGHT: Fast Facts & Key Features (4 Units) */}
            <div className="lg:col-span-4 space-y-8">
               <motion.div 
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 shadow-2xl space-y-10"
               >
                  <div>
                    <span className="text-white/30 text-[10px] font-black tracking-widest uppercase mb-2 block">POWERHOUSE CONFIGURATION</span>
                    <h2 className="text-5xl font-industrial font-black text-white italic uppercase">{truck.name}</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="p-8 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-6 group hover:border-primary/40 transition-all">
                       <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:shadow-neon transition-all">
                          <EngineIcon size={24} />
                       </div>
                       <div>
                          <span className="text-white/30 text-[10px] font-black block">ENGINE TECH</span>
                          <span className="text-white font-industrial text-xl font-bold uppercase">{truck.engine}</span>
                       </div>
                    </div>

                    <div className="p-8 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-6 group hover:border-primary/40 transition-all">
                       <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:shadow-neon transition-all">
                          <Cpu size={24} />
                       </div>
                       <div>
                          <span className="text-white/30 text-[10px] font-black block">PAYLOAD_CAPACITY</span>
                          <span className="text-white font-industrial text-xl font-bold uppercase">{truck.capacity}</span>
                       </div>
                    </div>

                    <div className="p-8 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-6 group hover:border-primary/40 transition-all">
                       <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:shadow-neon transition-all">
                          <TrendingUp size={24} />
                       </div>
                       <div>
                          <span className="text-white/30 text-[10px] font-black block">VALUATION</span>
                          <span className="text-white font-industrial text-xl font-bold uppercase">{truck.price}</span>
                       </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                     <span className="text-white/30 text-[10px] font-black tracking-widest uppercase mb-4 block">FACTORY COLOR OPTIONS</span>
                     <div className="flex gap-4">
                        {truck.colors.map((c) => (
                           <div key={c.name} className="w-10 h-10 rounded-xl border border-white/20 shadow-lg" style={{ backgroundColor: c.hex }} title={c.name} />
                        ))}
                     </div>
                  </div>

                  <button className="w-full py-6 bg-primary text-brand-secondary rounded-2xl font-industrial font-black italic tracking-widest text-lg hover:shadow-neon transition-all flex items-center justify-center gap-4">
                     INITIATE INQUIRY
                     <Zap size={20} />
                  </button>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEW: THE DIGITAL BLUEPRINT (Detailed Content Section) */}
      <section className="bg-transparent py-32 border-y border-white/5">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "300px" }}>
                  <span className="text-primary font-industrial text-xl font-black tracking-[0.6em] uppercase flex items-center gap-6 mb-12">
                    <div className="h-[2px] w-16 bg-primary" />
                    TECHNICAL OVERVIEW
                  </span>
                  <h2 className="text-7xl font-industrial font-black text-white italic uppercase leading-none mb-12">
                    THE ARCHITECTURE <br /> <span className="text-gradient">OF PERFORMANCE</span>
                  </h2>
                  <div className="space-y-8">
                     <p className="text-white/70 text-2xl leading-relaxed italic font-light drop-shadow-md">
                        {truck.longDescription}
                     </p>
                     <div className="p-10 bg-white/5 rounded-[3rem] border border-white/5 space-y-6">
                        <div className="flex items-center gap-4">
                           <ShieldCheck className="text-primary" />
                           <span className="text-white font-industrial font-black tracking-widest uppercase">BUILT FOR THE REGION</span>
                        </div>
                        <p className="text-white/50 text-base leading-loose">
                           All components are factory-tested in extreme temperatures of 50°C+. Our chassis engineering prioritizes longevity and thermal regulation, ensuring the ${truck.brand} lineage continues to lead the market.
                        </p>
                     </div>
                  </div>
               </motion.div>

               {/* Engine Visual Block */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }} 
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true, margin: "300px" }}
                 className="relative group"
               >
                  <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-75 animate-pulse" />
                  <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                     <Image src={truck.engineImage} alt="Engine Detailing" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                     <div className="absolute bottom-12 left-12">
                        <span className="bg-primary text-brand-secondary px-6 py-2 rounded-full font-industrial font-black text-xs shadow-neon">
                           PRIMARY_DRIVEWEEK_01
                        </span>
                        <h4 className="text-white font-industrial text-4xl font-black italic uppercase mt-4">ENGINEERING HEART</h4>
                     </div>
                  </div>
                  {/* Floating Tech Tag */}
                  <div className="absolute -top-10 -right-10 p-8 glass-ultra rounded-[2.5rem] border border-white/10 animate-float">
                     <EngineIcon size={40} className="text-primary mb-4" />
                     <span className="text-white font-industrial font-black uppercase text-sm block">{truck.engine}</span>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* 4. TECHNICAL DATA GRID (Legacy) */}
      <section className="py-48 bg-transparent relative">
        <div className="container mx-auto px-6">
           <div className="flex flex-col items-center mb-32 text-center">
             <span className="text-primary font-industrial text-lg font-black tracking-[1em] uppercase mb-8">SENSOR DATA FEED</span>
             <h2 className="text-7xl font-industrial font-black text-white italic uppercase">TECHNICAL SPECIFICATIONS</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              <div className="space-y-12">
                <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-6">
                   <EngineIcon className="text-primary" size={32} />
                   <h3 className="font-industrial text-4xl font-black text-white italic uppercase">PERFORMANCE</h3>
                </div>
                {Object.entries(truck.detailedSpecs.performance).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-8 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                     <span className="text-white/40 text-[10px] font-black uppercase">{key}</span>
                     <span className="text-white font-industrial font-bold uppercase text-xl">{value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-12">
                <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-6">
                   <Ruler className="text-primary" size={32} />
                   <h3 className="font-industrial text-4xl font-black text-white italic uppercase">ARCHITECT</h3>
                </div>
                {Object.entries(truck.detailedSpecs.dimensions).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-8 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                     <span className="text-white/40 text-[10px] font-black uppercase">{key}</span>
                     <span className="text-white font-industrial font-bold uppercase text-xl">{value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-12">
                <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-6">
                   <Activity className="text-primary" size={32} />
                   <h3 className="font-industrial text-4xl font-black text-white italic uppercase">CAPACITIES</h3>
                </div>
                {Object.entries(truck.detailedSpecs.capacities).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-8 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                     <span className="text-white/40 text-[10px] font-black uppercase">{key}</span>
                     <span className="text-white font-industrial font-bold uppercase text-xl">{value}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* Lightbox / Cinema Mode */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-10 backdrop-blur-3xl"
          >
             <button 
               onClick={() => setIsLightboxOpen(false)}
               className="absolute top-12 right-12 z-[1001] p-6 glass-ultra rounded-full text-white hover:bg-primary hover:text-brand-secondary transition-all shadow-neon"
             >
               <Maximize2 size={32} />
             </button>

             <div className="relative w-full h-full flex items-center justify-center">
                <Image src={activeItem.url} alt={activeItem.label} fill className="object-contain" />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer lang={lang} dict={dict} />
    </main>
  )
}
