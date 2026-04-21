'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Filter, Search, Zap, ArrowLeft } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { Truck } from '@/services/trucks'
import Footer from '@/components/Footer'

interface FleetClientProps {
  lang: string
  dict: any
  trucks: Truck[]
  initialCategory?: string
}

export default function FleetClient({ lang, dict, trucks, initialCategory }: FleetClientProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', label: 'All Fleet' },
    { id: 'light', label: dict.categories.light },
    { id: 'medium', label: dict.categories.medium },
    { id: 'heavy', label: dict.categories.heavy },
    { id: 'dump', label: dict.categories.dump },
  ]

  const filteredTrucks = useMemo(() => {
    return trucks.filter(truck => {
      const matchesCat = activeCategory === 'all' || truck.category === activeCategory
      const matchesSearch = truck.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            truck.brand.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCat && matchesSearch
    })
  }, [trucks, activeCategory, searchQuery])

  const isAr = lang === 'ar'

  return (
    <main className={`bg-transparent min-h-screen pb-32 ${isAr ? 'font-arabic' : 'font-premium'}`}>
      <Navigation lang={lang} dict={dict} />

      {/* 1. CONTROL BAR (Back to Home) */}
      <div className="sticky top-0 z-[100] w-full bg-[var(--background)]/80 backdrop-blur-3xl border-b border-[var(--primary)]/10 py-6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link 
            href={`/${lang}`} 
            className="flex items-center gap-4 text-primary font-industrial text-sm font-black tracking-[0.3em] uppercase hover:gap-6 transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
            BACK_TO_HOME
          </Link>
          
          <div className="flex items-center gap-6">
             <span className="text-[var(--foreground)]/40 text-[9px] font-black uppercase tracking-[0.5em]">SYSTEM_FLEET_SYNC_ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Hero: Fleet Showcase */}
      <section className="pt-12 pb-20 px-6 bg-transparent">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-primary font-industrial text-sm font-black tracking-[0.5em] uppercase">
              OMAN'S POWERHOUSE
            </span>
            <h1 className="mt-6 text-7xl md:text-9xl font-industrial font-black text-[var(--foreground)] italic leading-none">
              THE <span className="text-outline">FLEET</span>
            </h1>
          </motion.div>

          {/* Controls */}
          <div className="mt-16 flex flex-col lg:flex-row justify-between items-center gap-12 border-b border-[var(--primary)]/10 pb-12">
            <div className="flex flex-wrap items-center gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-8 py-3 rounded-full font-industrial text-sm font-black tracking-widest uppercase transition-all ${
                    activeCategory === cat.id 
                    ? 'bg-primary text-brand-secondary shadow-[0_0_20px_var(--primary-glow)]' 
                    : 'bg-[var(--foreground)]/5 border border-[var(--border-color)] text-[var(--foreground)]/40 hover:text-primary hover:border-primary/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-96">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={20} />
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-8 text-white focus:border-primary outline-none transition-all"
                 placeholder="SEARCH MODEL OR BRAND..."
               />
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="container mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredTrucks.map((truck, i) => (
              <motion.div
                key={truck.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/${lang}/trucks/${truck.id}`} className="group block bg-[var(--foreground)]/5 rounded-[3rem] overflow-hidden border border-[var(--border-color)] hover:border-primary/40 transition-all duration-500 shadow-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src={truck.image} 
                      alt={truck.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 image-pop"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/40 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-8 right-8 px-4 py-2 bg-[var(--background)]/80 backdrop-blur-md rounded-full flex items-center gap-2 border border-[var(--border-color)]">
                       <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                       <span className="text-[10px] font-black text-[var(--foreground)]/60 tracking-widest uppercase">{truck.brand}</span>
                    </div>
                  </div>

                  <div className="p-10">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <h3 className="text-3xl font-industrial font-black text-[var(--foreground)] italic group-hover:text-primary transition-colors leading-none">
                            {truck.name}
                          </h3>
                          <span className="text-[var(--foreground)]/40 text-[10px] font-black tracking-widest uppercase mt-4 block">{truck.capacity} • {truck.engine}</span>
                       </div>
                       <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-brand-secondary transition-all">
                          <Zap size={20} />
                       </div>
                    </div>

                    <div className="mt-10 flex items-center justify-between text-[var(--foreground)]/20 group-hover:text-primary transition-colors">
                       <span className="font-industrial text-xs font-black tracking-widest uppercase">VIEW EXPERIENCE</span>
                       <ArrowRight size={18} className="translate-x-[-10px] group-hover:translate-x-0 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTrucks.length === 0 && (
          <div className="py-40 text-center">
             <span className="font-industrial text-4xl font-black text-[var(--foreground)]/20 italic uppercase tracking-widest">
                No Machines Found
             </span>
          </div>
        )}
      </section>

      <Footer lang={lang} dict={dict} />
    </main>
  )
}
