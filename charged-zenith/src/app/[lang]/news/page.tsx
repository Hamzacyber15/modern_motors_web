import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/lib/i18n-config'
import Navigation from '@/components/Navigation'
import { Calendar, ArrowRight, User } from 'lucide-react'
import styles from './page.module.css'
import Footer from '@/components/Footer'

export default async function NewsroomPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  const newsItems = [
    {
      id: 1,
      title: "Modern Motors Expands Network with New Salalah Mega-Center",
      excerpt: "The new facility will serve as a hub for light and heavy trucks in the southern region of Oman...",
      date: "March 28, 2026",
      author: "Corporate Relations",
      category: "Expansion"
    },
    {
      id: 2,
      title: "Forland Introduces Euro 5 Compliant Fleet in Oman",
      excerpt: "Setting new standards for environmental sustainability in the Omani logistics sector with cleaner engines...",
      date: "March 15, 2026",
      author: "Technical Team",
      category: "Innovation"
    },
    {
      id: 3,
      title: "Logistics Excellence: Modern Motors Partners with Local SME",
      excerpt: "Providing efficient transportation solutions to support the growth of local businesses in Muscat...",
      date: "March 05, 2026",
      author: "Marketing Dept",
      category: "Partnership"
    }
  ]

  return (
    <main className={`bg-brand-secondary min-h-screen pb-32 ${lang === 'ar' ? 'font-arabic' : 'font-premium'}`}>
      <Navigation lang={lang} dict={dict} />
      
      <section className="pt-48 pb-20 px-6 bg-black">
        <div className="container mx-auto">
          <span className="text-primary font-industrial text-sm font-black tracking-[0.5em] uppercase">
            INDUSTRIAL MEDIA
          </span>
          <h1 className="mt-6 text-7xl md:text-9xl font-industrial font-black text-white italic leading-none">
            {dict.nav.news?.split(' ')[0] || 'SHOWROOM'} <span className="text-outline">{dict.nav.news?.split(' ').slice(1).join(' ') || 'NEWS'}</span>
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {newsItems.map((article) => (
            <article key={article.id} className="group glass rounded-[3rem] overflow-hidden border-white/5 hover:border-primary/40 transition-all duration-500">
               <div className="p-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black text-primary tracking-widest uppercase px-4 py-2 glass rounded-full">
                      {article.category}
                    </span>
                    <span className="text-white/20 text-[10px] font-black tracking-widest uppercase">{article.date}</span>
                  </div>
                  <h3 className="text-3xl font-industrial font-black text-white italic group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="mt-6 text-white/50 text-sm leading-relaxed">{article.excerpt}</p>
                  <div className="mt-10 flex items-center justify-between text-white/20 group-hover:text-primary transition-colors">
                    <span className="font-industrial text-xs font-black tracking-widest uppercase">READ FULL REPORT</span>
                    <ArrowRight size={18} className="translate-x-[-10px] group-hover:translate-x-0 transition-transform" />
                  </div>
               </div>
            </article>
          ))}
        </div>
      </section>

      <Footer lang={lang} dict={dict} />
    </main>
  )
}
