'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function Footer({ lang, dict }: { lang: string, dict: any }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--background)] pt-32 pb-12 px-6 border-t border-[var(--border-color)]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-1">
             <Link href={`/${lang}`} className="group block mb-8">
                <div className="relative w-40 h-16">
                  <Image 
                    src="/mm_logo.png" 
                    alt="Modern Motors" 
                    fill 
                    className="object-contain" 
                  />
                </div>
             </Link>
             <p className="mt-8 text-[var(--foreground)]/40 text-sm leading-relaxed max-w-xs">
                The Sultanate's premier gateway to world-class heavy machinery and commercial transport solutions. 
             </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-industrial text-xl font-black text-[var(--foreground)] italic tracking-widest uppercase mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Fleet', '3D Experience', 'About Heritage', 'Contact'].map((item) => (
                <li key={item}>
                   <Link href="#" className="text-[var(--foreground)]/40 hover:text-primary transition-colors flex items-center gap-2 group">
                      <span className="text-xs uppercase font-black tracking-widest">{item}</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                   </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fleet Categories */}
          <div>
            <h4 className="font-industrial text-xl font-black text-[var(--foreground)] italic tracking-widest uppercase mb-8">Specializations</h4>
            <ul className="space-y-4">
              {[dict.categories.light, dict.categories.medium, dict.categories.heavy, dict.categories.dump].map((item) => (
                <li key={item} className="text-[var(--foreground)]/40 text-xs font-black tracking-widest uppercase">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Hook */}
          <div>
            <h4 className="font-industrial text-xl font-black text-[var(--foreground)] italic tracking-widest uppercase mb-8">Newsletter</h4>
             <p className="text-[var(--foreground)]/40 text-[10px] font-black tracking-widest uppercase mb-6">Stay updated with the latest in Omani transport.</p>
             <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-[var(--foreground)]/5 border border-[var(--border-color)] rounded-xl px-4 py-3 text-xs text-[var(--foreground)] focus:border-primary outline-none transition-all w-full"
                />
                <button className="p-3 bg-primary text-brand-secondary rounded-xl hover:scale-105 transition-transform">
                   <ArrowUpRight size={20} />
                </button>
             </div>
             <div className="mt-8 flex gap-4">
                {[
                  { name: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                  { name: 'Twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
                  { name: 'Instagram', path: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>' },
                  { name: 'Linkedin', path: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>' }
                ].map((social, i) => (
                  <Link key={i} href="#" className="w-10 h-10 bg-[var(--foreground)]/5 rounded-lg flex items-center justify-center text-[var(--foreground)]/40 hover:text-primary hover:border-primary/40 transition-all border border-transparent">
                     <svg 
                       width="18" 
                       height="18" 
                       viewBox="0 0 24 24" 
                       fill="none" 
                       stroke="currentColor" 
                       strokeWidth="2" 
                       strokeLinecap="round" 
                       strokeLinejoin="round"
                     >
                        {social.name === 'Instagram' || social.name === 'Linkedin' ? (
                           <g dangerouslySetInnerHTML={{ __html: social.path }} />
                        ) : (
                           <path d={social.path} />
                        )}
                     </svg>
                  </Link>
                ))}
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-[var(--border-color)] gap-6">
           <span className="text-[var(--foreground)]/20 text-[10px] font-black tracking-widest uppercase">
              © {currentYear} Modern Motors LLC. All Power Reserved.
           </span>
           <div className="flex gap-8">
              <Link href="#" className="text-[var(--foreground)]/20 hover:text-[var(--foreground)] transition-colors text-[10px] font-black tracking-widest uppercase">Privacy Policy</Link>
              <Link href="#" className="text-[var(--foreground)]/20 hover:text-[var(--foreground)] transition-colors text-[10px] font-black tracking-widest uppercase">Terms of Sale</Link>
           </div>
        </div>
      </div>
    </footer>
  )
}
