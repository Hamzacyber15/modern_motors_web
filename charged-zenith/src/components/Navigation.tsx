'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Menu, X, Home, Truck, Box, Image as ImageIcon, Contact, Sun, Moon, ChevronRight, Camera } from 'lucide-react'

interface NavigationProps {
  lang: string
  dict: any
}

export default function Navigation({ lang, dict }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [isHovered, setIsHovered] = useState(false)
  const pathname = usePathname()

  const isRTL = lang === 'ar'

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light'
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('light', savedTheme === 'light')
    }

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('light', newTheme === 'light')
  }

  const switchLangUrl = pathname.replace(`/${lang}`, lang === 'en' ? '/ar' : '/en')

  const navLinks = [
    { name: dict.nav.home, href: `/${lang}`, icon: Home },
    { name: dict.nav.trucks, href: `/${lang}/trucks`, icon: Truck },
    { name: dict.nav.service, href: `/${lang}/maintenance`, icon: Box },
    { name: dict.nav.gallery, href: `/${lang}/gallery`, icon: ImageIcon },
    { name: dict.nav.media, href: `/${lang}/media`, icon: Camera },
    { name: dict.nav.contact, href: `/${lang}/contact`, icon: Contact },
  ]

  return (
    <>
      {/* Persistent Top-Level Logo */}
      <div className={`fixed top-6 z-[120] transition-all duration-500 ${isRTL ? 'right-6' : 'left-6'} h-12 w-48`}>
        <Link href={`/${lang}`} className="group relative block w-full h-full">
          <Image 
            src="/mm_logo.png" 
            alt="Modern Motors" 
            fill 
            className="object-contain transition-transform duration-500 group-hover:scale-105" 
            priority 
          />
        </Link>
      </div>

      {/* Mobile Top Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] h-20 lg:hidden flex items-center justify-end px-6 transition-all duration-500 ${
        scrolled ? 'bg-[var(--background)]/95 border-b border-[var(--primary)]/20 shadow-xl' : 'bg-transparent'
      }`}>
        <button 
          className="p-3 bg-[var(--muted)]/50 rounded-xl text-primary border border-[var(--primary)]/20"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Desktop Vertical Sidebar: Uplifted Holographic Console */}
      <motion.nav 
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={false}
        animate={{ 
          width: isHovered ? 280 : 88,
          x: 0 
        }}
        className={`fixed top-0 bottom-0 z-[110] hidden lg:flex flex-col items-center justify-center transition-all duration-700 ease-[0.16,1,0.3,1] ${
          isRTL ? 'left-0' : 'right-0'
        } bg-[var(--background)]/40 [.light_&]:bg-slate-50/90 backdrop-blur-3xl border-${isRTL ? 'r' : 'l'} border-white/5 shadow-2xl overflow-hidden`}
      >
        {/* Holographic Circuit Border */}
        <div className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent [.light_&]:via-primary/10 shadow-[0_0_15px_var(--primary-glow)] [.light_&]:shadow-none`} />

        {/* Links Console */}
        <div className="flex flex-col gap-6 w-full px-4 text-[var(--foreground)] relative z-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`group relative flex items-center h-16 rounded-2xl transition-all duration-500 ${
                  isActive ? 'bg-primary/10' : 'hover:bg-white/5'
                } overflow-hidden`}
              >
                {/* Active Energy Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="activeEnergy"
                    className={`absolute ${isRTL ? 'right-0' : 'left-0'} w-1 h-10 bg-primary shadow-[0_0_20px_var(--primary)] [.light_&]:shadow-none rounded-full`}
                  />
                )}

                <div className={`w-20 min-w-[80px] flex items-center justify-center relative`}>
                   <link.icon 
                     size={24} 
                     className={`transition-all duration-500 ${isActive ? 'text-primary scale-110 drop-shadow-glow' : 'text-white/40 group-hover:text-primary group-hover:scale-110 [.light_&]:text-[var(--foreground)]/40 [.light_&]:group-hover:text-primary'}`} 
                   />
                   {isActive && <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full [.light_&]:bg-primary/5" />}
                </div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, x: isRTL ? 15 : -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 15 : -15 }}
                      className="flex flex-col ml-2 truncate"
                    >
                      <span className="font-industrial text-sm font-black tracking-[0.2em] uppercase whitespace-nowrap text-[var(--foreground)]">
                        {link.name}
                      </span>
                      <span className="text-[10px] font-black text-primary/40 [.light_&]:text-primary/70 tracking-widest uppercase mt-0.5">
                        MODERN_ASSET_LINK
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Hover Glow Edge */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/5 rounded-2xl pointer-events-none transition-colors" />
              </Link>
            )
          })}
        </div>

        {/* Bottom Actions Pod */}
        <div className={`flex flex-col gap-4 w-full px-4 border-t border-white/5 pt-10 mt-10 relative z-10`}>
          <button 
            onClick={toggleTheme}
            className="flex items-center h-16 rounded-2xl bg-white/5 hover:bg-primary hover:text-brand-secondary transition-all text-primary group"
          >
            <div className="w-20 min-w-[80px] flex items-center justify-center">
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </div>
            {isHovered && (
              <span className="font-industrial text-xs font-black tracking-widest uppercase transition-colors">
                {theme === 'dark' ? 'LIGHT_SPECTRUM' : 'DARK_VOID'}
              </span>
            )}
          </button>

          <Link 
            href={switchLangUrl}
            className="flex items-center h-16 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-[var(--foreground)] group border border-white/5"
          >
            <div className="w-20 min-w-[80px] flex items-center justify-center">
              <Globe size={24} className="text-primary group-hover:rotate-180 transition-transform duration-700" />
            </div>
            {isHovered && (
              <span className="font-industrial text-[10px] font-black tracking-widest uppercase">
                {dict.nav.switch_lang}
              </span>
            )}
          </Link>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-[var(--background)] p-8 flex flex-col gap-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-industrial text-2xl font-black text-primary uppercase tracking-widest border-b border-primary/20 pb-2">MENU</span>
              <button 
                className="p-3 bg-[var(--muted)] rounded-xl text-primary border border-primary/10 shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between font-industrial text-4xl font-black text-[var(--foreground)] hover:text-primary transition-colors uppercase italic"
                >
                  <div className="flex items-center gap-6">
                    <link.icon size={32} className="text-primary/40" />
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight className="text-primary/20" size={32} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
