'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const newsItems = [
  { id: 1, date: 'APR 20, 2026', title: 'FORLAND PARTNERSHIP REACHES OMAN', category: 'EXPANSION' },
  { id: 2, date: 'MAR 15, 2026', title: 'REVOLUTIONIZING DESERT LOGISTICS', category: 'INNOVATION' },
  { id: 3, date: 'FEB 02, 2026', title: 'MODERN MOTORS OPENS NEW HUB', category: 'AWARDS' },
]

export default function NewsSection() {
  return (
    <section className="bg-transparent py-32 relative overflow-hidden text-[var(--foreground)]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="text-primary font-industrial text-sm font-black tracking-[0.5em] uppercase">
              INDUSTRIAL MEDIA
            </span>
            <h2 className="mt-6 text-6xl font-industrial font-black italic leading-tight uppercase">
              LATEST <br /> <span className="text-outline">DEVELOPMENTS</span>
            </h2>
          </div>
          <button className="flex items-center gap-4 px-8 py-4 border border-[var(--border-color)] rounded-full font-industrial text-xs font-black tracking-widest text-[var(--foreground)]/40 hover:text-[var(--foreground)] hover:border-primary transition-all">
            VIEW ALL NEWS
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {newsItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-[var(--foreground)]/5 border border-[var(--border-color)] transition-all duration-700 hover:border-primary/30 mb-8">
                 <Image 
                   src={`/hero-${['sunlight', 'red', 'blue'][i % 3]}.png`} 
                   alt={item.title} 
                   fill 
                   className="object-cover opacity-100 group-hover:scale-110 transition-all duration-700 image-pop" 
                 />
                 <div className="absolute top-6 left-6 px-4 py-2 bg-[var(--background)]/80 backdrop-blur-md border border-[var(--border-color)] rounded-full">
                    <span className="text-[10px] font-black text-primary tracking-widest uppercase">{item.category}</span>
                 </div>
              </div>
              
              <span className="text-[var(--foreground)]/20 font-industrial text-xs font-black tracking-widest uppercase">{item.date}</span>
              <h3 className="mt-4 text-2xl font-industrial font-black group-hover:text-primary transition-colors leading-tight uppercase">
                {item.title}
              </h3>
              <div className="mt-8 h-[1px] w-0 bg-primary group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
