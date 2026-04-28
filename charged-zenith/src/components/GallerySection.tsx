'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Maximize2, PlayCircle } from 'lucide-react'

const galleryItems = [
  { id: 1, type: 'image', src: '/hero-sunlight.png', size: 'large' },
  { id: 2, type: 'image', src: '/hero-red.png', size: 'small' },
  { id: 3, type: 'image', src: '/hero-blue.png', size: 'medium' },
  { id: 4, type: 'video', src: '/hero-silver.png', size: 'medium' },
  { id: 5, type: 'image', src: '/truck_showcase.png', size: 'small' },
  { id: 6, type: 'image', src: '/light.png', size: 'large' },
]

export default function GallerySection() {
  return (
    <section className="bg-transparent py-32 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              className="text-primary font-industrial text-sm font-black tracking-[0.5em] uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "300px" }}
            >
              PREMIUM GALLERY
            </motion.span>
            <motion.h2 
              className="mt-6 text-6xl font-industrial font-black text-[var(--foreground)] italic tracking-tight uppercase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "300px" }}
            >
              CAPTURING <br /> <span className="text-outline">EXCELLENCE</span>
            </motion.h2>
          </div>
          <button className="px-10 py-5 bg-[var(--foreground)]/5 border border-[var(--border-color)] rounded-full font-industrial text-sm font-black tracking-widest uppercase hover:text-primary hover:border-primary/40 transition-all">
            VIEW FULL CATALOG
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "300px" }}
              transition={{ delay: i * 0.1 }}
              className={`group relative rounded-[2rem] overflow-hidden bg-[var(--foreground)]/5 border border-[var(--border-color)] transition-all duration-500 hover:border-primary/40 ${
                item.size === 'large' ? 'md:row-span-2 md:col-span-2' : 
                item.size === 'medium' ? 'md:row-span-2' : ''
              }`}
            >
              <Image 
                src={item.src} 
                alt="Truck Gallery" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-100 image-pop"
              />
              <div className="absolute inset-0 bg-[var(--background)]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[var(--background)]/80 backdrop-blur-md border border-[var(--border-color)] flex items-center justify-center text-primary transform scale-50 group-hover:scale-100 transition-transform">
                  {item.type === 'video' ? <PlayCircle size={32} /> : <Maximize2 size={32} />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
