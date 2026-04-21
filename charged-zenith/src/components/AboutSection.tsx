'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Landmark, Globe2, ShieldCheck, Zap } from 'lucide-react'

const stats = [
  { label: 'DELIVERED IN OMAN', value: '1,500+' },
  { label: 'SERVICE CENTERS', value: '12' },
  { label: 'TEAM EXPERTS', value: '80+' },
  { label: 'BRANDS REPRESENTED', value: '4' },
]

export default function AboutSection() {
  return (
    <section className="bg-transparent py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--foreground)]/5" />
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-primary font-industrial text-sm font-black tracking-[0.5em] uppercase">
              OUR HERITAGE
            </span>
            <h2 className="mt-6 text-6xl font-industrial font-black text-[var(--foreground)] italic leading-tight">
              OMANI SPIRIT, <br /> <span className="text-outline text-glow">GLOBAL PRECISION</span>
            </h2>
            <p className="mt-8 text-[var(--foreground)]/50 text-xl font-light leading-relaxed">
              Modern Motors is Oman’s leading gateway to world-class heavy-duty machinery. We bridge the gap between China’s engineering giants like Forland and the unique, demanding terrains of the Sultanate.
            </p>

            <div className="mt-16 grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <Globe2 className="text-primary" size={32} />
                <h4 className="text-[var(--foreground)] font-industrial text-xl font-black uppercase tracking-widest">CHINESE ROOTS</h4>
                <p className="text-[var(--foreground)]/40 text-sm">Direct partnership with world-leading manufacturers for elite performance.</p>
              </div>
              <div className="space-y-4">
                <ShieldCheck className="text-primary" size={32} />
                <h4 className="text-[var(--foreground)] font-industrial text-xl font-black uppercase tracking-widest">OMANI TRUST</h4>
                <p className="text-[var(--foreground)]/40 text-sm">Decades of reliability in Oman’s most challenging industrial environments.</p>
              </div>
            </div>
          </motion.div>

          <div className="relative">
             <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-[var(--foreground)]/5 border border-[var(--border-color)] relative transition-all duration-700 hover:border-primary/30">
                <Image 
                  src="/truck_showcase.png" 
                  alt="Modern Motors Oman" 
                  fill 
                  className="object-cover opacity-100 group-hover:scale-105 transition-all duration-700 image-pop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-transparent to-transparent" />
             </div>
             
             {/* Floating Stats - Repositioned to avoid image branding blur */}
             <div className="absolute -bottom-16 left-0 md:left-[-10%] grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-[var(--background)]/90 border border-[var(--border-color)] rounded-2xl flex flex-col items-center justify-center min-w-[150px] shadow-2xl"
                  >
                    <span className="text-primary font-industrial text-3xl font-black drop-shadow-[0_0_10px_var(--primary-glow)]">{stat.value}</span>
                    <span className="text-[var(--foreground)]/40 text-[10px] font-black tracking-widest uppercase mt-1">{stat.label}</span>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
