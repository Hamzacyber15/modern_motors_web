'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const brands = [
  { name: 'FORLAND', logo: '/logo-forland.png' },
  { name: 'FOTON', logo: '/logo-foton.png' },
  { name: 'SINOTRUK', logo: '/logo-sinotruk.png' },
  { name: 'HOWO', logo: '/logo-howo.png' },
]

export default function BrandShowcase() {
  return (
    <section className="bg-transparent py-24 relative overflow-hidden group">
      {/* Sun Ray Atmospheric Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden">
         <motion.div 
           animate={{ 
             opacity: [0.1, 0.3, 0.1],
             scale: [1, 1.2, 1],
             rotate: [0, 90, 180, 270, 360]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute inset-0 bg-[radial-gradient(circle,var(--primary-glow)_0%,transparent_70%)]"
         />
         <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
         <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.span 
          className="text-primary font-industrial text-[10px] font-black tracking-[0.8em] uppercase mb-12 block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          MAJESTIC PARTNERSHIPS
        </motion.span>
        
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.5, scale: 1 }}
              whileHover={{ opacity: 1, scale: 1.1, filter: `drop-shadow(0 0 20px var(--primary-glow))` }}
              transition={{ delay: i * 0.1 }}
              className="relative w-32 md:w-48 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer"
            >
              {/* Logo Placeholder */}
              <span className="font-industrial text-3xl md:text-5xl font-black text-[var(--foreground)] italic tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">
                 {brand.name}
              </span>
              
              {/* Ray of Sun effect on hover */}
              <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
