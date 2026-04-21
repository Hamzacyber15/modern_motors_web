'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, Radio, Activity } from 'lucide-react'

export default function ContactSection() {
  return (
    <section className="bg-transparent py-32 relative overflow-hidden text-[var(--foreground)]">
      {/* Background neon glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[200px] rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-primary font-industrial text-sm font-black tracking-[0.5em] uppercase px-4 py-1 bg-primary/10 border border-primary/20 rounded-full">
              STATUS: SIGNAL_OPEN
            </span>
            <h2 className="mt-8 text-7xl md:text-8xl font-industrial font-black italic leading-none uppercase tracking-tighter">
              DEPLOY THE <br /> <span className="text-outline">TITANS</span>
            </h2>
            <p className="mt-8 text-[var(--foreground)]/60 text-xl font-light leading-relaxed max-w-lg italic border-l-2 border-primary/30 pl-8">
              Secure your industrial legacy. Our technical elite is on standby for nationwide force deployment and fleet strategic planning.
            </p>

            <div className="mt-16 space-y-8">
              {[
                { icon: Phone, title: 'COMMAND_LINE', value: '+968 1234 5678', detail: 'SECURED_VOICE_LINK' },
                { icon: Mail, title: 'ENCRYPTED_MAIL', value: 'sales@modernmotors.om', detail: 'DATA_TRANSMISSION' },
                { icon: MapPin, title: 'LOGISTICS_HQ', value: 'Muscat Industrial Area, Oman', detail: 'CENTRAL_NODE_01' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group relative">
                  <div className="w-16 h-16 bg-[var(--background)]/80 border border-[var(--primary)]/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-brand-secondary transition-all shadow-[0_0_15px_rgba(0,184,204,0.1)]">
                    <item.icon size={26} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-[var(--foreground)] font-industrial text-lg font-black tracking-widest uppercase">{item.title}</h4>
                      <Activity size={12} className="text-primary animate-pulse" />
                    </div>
                    <p className="text-[var(--foreground)]/40 font-industrial text-sm mt-1">{item.value}</p>
                    <span className="text-[10px] text-primary/30 font-black tracking-[0.2em] mt-1 block group-hover:text-primary/60 transition-colors">{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Holographic Form Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative group"
          >
            {/* Corner Brackets */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-3xl pointer-events-none" />
            <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-primary/40 rounded-tr-3xl pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-primary/40 rounded-bl-3xl pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-3xl pointer-events-none" />

            <div className="bg-[var(--background)]/40 backdrop-blur-3xl border border-white/10 p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
               {/* Scanner Line Animation */}
               <motion.div 
                 animate={{ y: ['-100%', '300%'], opacity: [0, 0.5, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_var(--primary)] pointer-events-none z-20"
               />

               <div className="flex items-center gap-4 mb-12">
                  <Radio className="text-primary animate-ping" size={24} />
                  <span className="font-industrial text-sm font-black tracking-[0.4em] text-primary uppercase">COMMENCE_TRANSMISSION</span>
               </div>

              <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary/60 uppercase tracking-widest pl-2">IDENTIFIER_FULL_NAME</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-[var(--foreground)] focus:border-primary focus:bg-primary/5 outline-none transition-all placeholder:text-[var(--foreground)]/20" placeholder="ENTER NAME..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary/60 uppercase tracking-widest pl-2">CORPORATE_ENTITY</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-[var(--foreground)] focus:border-primary focus:bg-primary/5 outline-none transition-all placeholder:text-[var(--foreground)]/20" placeholder="ENTER COMPANY..." />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary/60 uppercase tracking-widest pl-2">FLEET_REQUIREMENT_CODE</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-[var(--foreground)] focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                    <option className="bg-[var(--background)]">HEAVY_FORCE_01 (DUMP/HEAVY)</option>
                    <option className="bg-[var(--background)]">LIGHT_AGILITY_01 (CARGO)</option>
                    <option className="bg-[var(--background)]">LOGISTICS_MASTERY_STRATEGY</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary/60 uppercase tracking-widest pl-2">MISSION_DETAILS</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-[var(--foreground)] focus:border-primary focus:bg-primary/5 outline-none transition-all placeholder:text-[var(--foreground)]/20" placeholder="DESCRIBE THE OPERATION..."></textarea>
                </div>

                <button className="w-full py-6 bg-primary text-brand-secondary rounded-2xl font-industrial text-xl font-black italic tracking-widest hover:scale-[1.02] transition-all shadow-[0_0_30px_var(--primary-glow)] flex items-center justify-center gap-4 group/btn">
                  TRANSMIT_COMMAND_SIGNAL
                  <Send size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>

              {/* Data Overlay Decals */}
              <div className="absolute top-12 right-12 opacity-5 pointer-events-none select-none">
                 <div className="font-mono text-[8px] space-y-1">
                    <p>LAT: 23.5859° N</p>
                    <p>LON: 58.4059° E</p>
                    <p>FREQ: 440.00 MHz</p>
                    <p>STATUS: ACTIVE</p>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
