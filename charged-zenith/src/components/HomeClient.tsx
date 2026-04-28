'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Box, Globe } from 'lucide-react'
import Navigation from '@/components/Navigation'
import AboutSection from '@/components/AboutSection'
import GallerySection from '@/components/GallerySection'
import ContactSection from '@/components/ContactSection'
import NewsSection from '@/components/NewsSection'
import BrandShowcase from '@/components/BrandShowcase'
import Footer from '@/components/Footer'

const heroVehicles = [
  { id: 'sunlight', src: '/hero-sunlight.png', label: 'ELITE GOLD' },
  { id: 'red', src: '/hero-red.png', label: 'BOSS RED' },
  { id: 'blue', src: '/hero-blue.png', label: 'PREMIUM BLUE' },
  { id: 'silver', src: '/hero-silver.png', label: 'CHROME SOUL' }
]

interface HomeClientProps {
  lang: string
  dict: any
}

export default function HomeClient({ lang, dict }: HomeClientProps) {
  const [currentHero, setCurrentHero] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroVehicles.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  const isAr = lang === 'ar'

  return (
    <main className={`relative overflow-x-hidden ${isAr ? 'font-arabic lg:pl-[88px]' : 'font-premium lg:pr-[88px]'}`}>
      <Navigation lang={lang} dict={dict} />

      {/* Hero: Industrial Soul Showroom */}
      <section className="relative h-screen w-full flex items-center bg-transparent">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity, scale }}
        >
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover brightness-[0.8] contrast-[1.1]"
          >
            <source src="/truck1.mp4" type="video/mp4" />
          </video>
          {/* Cleaner Overlay for clarity - Subtle grounding only */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/5" />
        </motion.div>

        <div className="container relative z-10 px-6 mx-auto">
          <div className="relative z-10 max-w-4xl">
            {/* Theme-Aware Regional Text Background for Readability */}
            <div 
              className={`absolute -inset-y-20 ${isAr ? '-right-20' : '-left-20'} w-[150%] max-w-[1200px] blur-[60px] opacity-60 transition-all duration-700 z-0 pointer-events-none`} 
              style={{
                background: `linear-gradient(to ${isAr ? 'left' : 'right'}, var(--background) 0%, var(--background) 50%, transparent 100%)`
              }}
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: isAr ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-6 flex items-center gap-4"
            >
              <div className="h-[1px] w-12 bg-primary shadow-[0_0_15px_var(--primary)]" />
              <span className="font-industrial text-sm font-black tracking-[0.4em] text-primary uppercase drop-shadow-[0_0_10px_var(--primary-glow)]">
                {heroVehicles[currentHero].label}
              </span>
            </motion.div>

            <h1 className="relative font-industrial leading-[0.9] text-[var(--foreground)] pb-2">
              <motion.span 
                className="block text-[clamp(4rem,12vw,8rem)] font-black italic tracking-tighter drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)] bg-clip-text text-transparent bg-gradient-to-r from-primary via-[var(--foreground)] to-primary bg-[length:200%_auto] animate-shimmer pb-2"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {dict.hero.title.split(' ')[0]}
              </motion.span>
              <motion.span 
                className="block text-[clamp(3.5rem,10vw,7rem)] font-black text-outline uppercase tracking-tight drop-shadow-[0_10px_40px_rgba(0,0,0,1)] pb-1"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {dict.hero.title.split(' ').slice(1).join(' ')}
              </motion.span>
            </h1>

            <motion.p 
              className="mt-4 max-w-xl text-lg md:text-xl text-[var(--foreground)]/80 font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {dict.hero.subtitle}
            </motion.p>

            <motion.div 
              className="mt-6 flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Link href={`/${lang}/trucks`} className="group relative flex items-center gap-4 px-12 py-6 bg-primary rounded-full overflow-hidden hover:scale-105 transition-all shadow-[0_0_30px_var(--primary-glow)]">
                <span className="relative z-10 font-industrial text-xl font-black tracking-widest uppercase text-brand-secondary">
                  {dict.hero.cta_explore}
                </span>
                <ArrowRight className="relative z-10 text-brand-secondary" size={24} />
              </Link>
              
              <Link href={`/${lang}/trucks`} className="flex items-center gap-4 px-12 py-6 border-2 border-[var(--border-color)] rounded-full hover:bg-[var(--foreground)]/5 transition-all backdrop-blur-md">
                <Box className="text-primary" size={24} />
                <span className="font-industrial text-xl font-black tracking-widest uppercase text-[var(--foreground)]">
                  {dict.hero.cta_dossier}
                </span>
              </Link>
            </motion.div>
            </div>
          </div>
        </div>

        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="w-[1px] h-16 bg-gradient-to-t from-primary to-transparent" />
          <span className="font-industrial text-xs font-black tracking-[1em] text-primary/70 uppercase rotate-90 text-nowrap translate-y-8">
            SCROLL
          </span>
        </motion.div>
      </section>

      {/* Categories Grid */}
      <section className="bg-transparent py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-20 text-center">
            <motion.span 
              className="text-primary font-industrial text-sm font-black tracking-[0.5em] uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "300px" }}
            >
              {dict.categories.title}
            </motion.span>
            <motion.h2 
              className="mt-4 text-5xl md:text-7xl font-industrial font-black text-[var(--foreground)] italic uppercase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "300px" }}
            >
              DOMINATE THE ROAD
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'light', name: dict.categories.light, img: '/light.png' },
              { id: 'medium', name: dict.categories.medium, img: '/medium.png' },
              { id: 'heavy', name: dict.categories.heavy, img: '/heavy.png' },
              { id: 'dump', name: dict.categories.dump, img: '/truck_showcase.png' }
            ].map((cat, i) => (
              <Link key={cat.id} href={`/${lang}/trucks?cat=${cat.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "300px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative h-[500px] bg-[var(--foreground)]/5 border border-[var(--border-color)] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-primary/40 shadow-2xl"
                >
                  <Image 
                    src={cat.img} 
                    alt={cat.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover opacity-100 group-hover:scale-110 transition-all duration-700 image-pop" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/40 via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="text-[var(--foreground)]/40 font-industrial text-xs font-black tracking-widest uppercase">0{i + 1}</span>
                    <h3 className="mt-2 text-3xl font-industrial font-black text-[var(--foreground)] hover:text-primary transition-colors uppercase italic">{cat.name}</h3>
                    <div className="mt-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-primary text-xs font-black tracking-widest uppercase">DISCOVER</span>
                      <ArrowRight className="text-primary" size={16} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Heritage */}
      <AboutSection />

      {/* Majestic Partner Brands */}
      <BrandShowcase />

      {/* Technical Supremacy: Service Hub Preview */}
      <section className="bg-transparent py-32 relative overflow-hidden text-[var(--foreground)]">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "300px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-industrial text-sm font-black tracking-[0.5em] uppercase">{dict.features.title}</span>
            <h2 className="mt-6 text-6xl font-industrial font-black italic uppercase leading-none">
              NATIONWIDE <br /> <span className="text-outline">SUPPORT NETWORK</span>
            </h2>
            <p className="mt-8 text-[var(--foreground)]/60 text-lg leading-relaxed max-w-lg italic">{dict.features.subtitle}</p>
            <div className="mt-12 space-y-6">
              {['12 Certified Service Centers', '24/7 Roadside Technical Support', 'Genuine Parts Logistics Hub'].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 flex items-center justify-center bg-[var(--foreground)]/5 border border-[var(--border-color)] rounded-full group-hover:bg-primary transition-colors">
                    <CheckCircle2 size={24} className="text-primary group-hover:text-brand-secondary transition-colors" />
                  </div>
                  <span className="font-industrial text-xl font-bold uppercase tracking-widest italic">{item}</span>
                </div>
              ))}
            </div>
            <Link href={`/${lang}/maintenance`} className="mt-16 inline-flex items-center gap-6 px-12 py-6 bg-primary text-brand-secondary rounded-full font-industrial text-xl font-black italic tracking-widest hover:scale-105 shadow-[0_0_30px_var(--primary-glow)] transition-all">
              LOCATE SERVICE CENTER
              <ArrowRight size={24} />
            </Link>
          </motion.div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden group border border-[var(--border-color)] shadow-2xl bg-[var(--foreground)]/5 flex items-center justify-center">
            <div className="text-center p-12">
               <div className="mb-6 inline-block p-6 bg-primary/10 rounded-full text-primary">
                 <Globe size={64} className="animate-pulse" />
               </div>
               <h3 className="text-3xl font-industrial font-black uppercase mb-4 italic">Omani Spirit, Global Precision</h3>
               <p className="text-[var(--foreground)]/40 text-sm tracking-widest leading-relaxed uppercase">
                 Strategically located across the Sultanate to ensure your fleet never stops moving. From Muscat to Salalah, excellence is guaranteed.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <GallerySection />

      {/* Industrial Media News */}
      <NewsSection />

      {/* Contact & Inquiries */}
      <ContactSection />

      <Footer lang={lang} dict={dict} />
    </main>
  )
}

function CheckCircle2({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
    </svg>
  )
}
