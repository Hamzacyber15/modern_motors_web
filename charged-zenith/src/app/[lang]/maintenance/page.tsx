import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/lib/i18n-config'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { Shield, Zap, Wrench, Settings, Activity, Globe, CheckCircle } from 'lucide-react'

export default async function MaintenancePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isAr = lang === 'ar'

  // Safety check for dictionary keys
  const maintenance = dict.maintenance || {
    title: "INDUSTRIAL EXCELLENCE",
    subtitle: "PRECISION MAINTENANCE",
    description: "Our Maintenance Garaje is where engineering mastery meets Omani dedication.",
    stats: [],
    services: [],
    location_title: "Nationwide Reach",
    location_desc: "Strategically positioned across the Sultanate."
  }

  return (
    <main className={`bg-brand-secondary min-h-screen text-[var(--foreground)] ${isAr ? 'font-arabic' : 'font-premium'}`}>
      <Navigation lang={lang} dict={dict} />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/maintenance-garage.png" 
            alt="Maintenance Garaje" 
            fill 
            className="object-cover brightness-[0.5] contrast-[1.2]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="container relative z-10 px-6 text-center">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-primary shadow-[0_0_15px_var(--primary)]" />
            <span className="text-primary font-industrial text-sm font-black tracking-[0.5em] uppercase drop-shadow-[0_0_10px_var(--primary-glow)]">
              {maintenance.title}
            </span>
            <div className="h-px w-12 bg-primary shadow-[0_0_15px_var(--primary)]" />
          </div>
          
          <h1 className="text-6xl md:text-[clamp(4rem,10vw,8rem)] font-industrial font-black text-white italic leading-[1.1] uppercase tracking-tighter">
            {maintenance.subtitle.split(' ').map((word: string, i: number) => (
              <span key={i} className={i === 1 ? 'text-outline block md:inline mx-2' : ''}>{word} </span>
            ))}
          </h1>
          
          <p className="mt-8 text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto italic font-medium px-4">
            {maintenance.description}
          </p>
          
          <div className="mt-12 flex justify-center gap-8">
             <div className="w-[1px] h-24 bg-gradient-to-t from-primary to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="relative z-20 -mt-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {maintenance.stats.map((stat: any, i: number) => (
            <div key={i} className="bg-[var(--background)]/40 backdrop-blur-3xl p-10 rounded-[2rem] border border-white/10 flex flex-col items-center text-center shadow-2xl group hover:border-primary/30 transition-all duration-500">
              <span className="text-primary font-industrial text-5xl font-black italic group-hover:scale-110 transition-transform duration-500">{stat.value}</span>
              <span className="mt-3 text-white/40 font-industrial text-xs font-black tracking-[0.3em] uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-40 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {maintenance.services.map((service: any, i: number) => (
            <div key={i} className="group relative p-14 bg-white/5 border border-white/5 rounded-[3rem] hover:border-primary/40 transition-all duration-700 overflow-hidden">
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               
               <div className="flex items-start justify-between">
                  <h3 className="text-4xl font-industrial font-black text-white uppercase italic group-hover:text-primary transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-brand-secondary transition-all">
                    {i === 0 ? <Wrench size={28} /> : i === 1 ? <Activity size={28} /> : i === 2 ? <Zap size={28} /> : <Settings size={28} />}
                  </div>
               </div>
               
               <p className="mt-8 text-white/50 text-xl leading-relaxed max-w-md">{service.desc}</p>
               
               <div className="mt-12 flex items-center gap-4">
                  <div className="h-0.5 w-16 bg-primary group-hover:w-32 transition-all duration-700" />
                  <span className="text-[10px] font-black text-primary/40 tracking-[0.5em] uppercase">PRECISION_CORE_0{i+1}</span>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Showcase */}
      <section className="py-40 bg-white/5 border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative order-2 lg:order-1">
             <div className="absolute inset-0 bg-primary/10 blur-[150px] rounded-full opacity-20" />
             <div className="relative aspect-square bg-[var(--background)]/80 rounded-[4rem] border border-white/10 p-16 flex flex-col justify-center items-center text-center overflow-hidden group shadow-inner">
                <Globe size={160} className="text-primary/10 group-hover:text-primary/20 transition-all duration-1000 group-hover:scale-120 group-hover:rotate-12" />
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                   <h3 className="text-4xl font-industrial font-black uppercase text-white mb-4 italic leading-tight">Elite <br /> Technical Hub</h3>
                   <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                </div>
             </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="text-primary font-industrial text-sm font-black tracking-[0.5em] uppercase">
              {maintenance.location_title}
            </span>
            <h2 className="mt-6 text-6xl md:text-7xl font-industrial font-black text-white italic uppercase leading-[0.9]">
              NATIONWIDE <br /> <span className="text-outline">SUPREMACY</span>
            </h2>
            <p className="mt-10 text-white/60 text-xl leading-relaxed italic max-w-xl">
              {maintenance.location_desc}
            </p>
            
            <div className="mt-16 space-y-8">
               {['Mobile Rapid Response', 'Remote Technical Diagnosis', 'Certified Parts Network'].map((item, i) => (
                  <div key={i} className="flex items-center gap-8 group">
                     <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-brand-secondary transition-all">
                        <CheckCircle size={24} />
                     </div>
                     <span className="font-industrial text-2xl font-black italic text-white/80 group-hover:text-white transition-colors">{item}</span>
                  </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 container mx-auto px-6 text-center">
         <h2 className="text-5xl md:text-6xl font-industrial font-black text-white italic uppercase mb-12">Next-Gen Maintenance <br /> Starts Here</h2>
         <button className="px-16 py-8 bg-primary text-brand-secondary rounded-full font-industrial text-2xl font-black italic tracking-widest hover:scale-110 transition-all shadow-[0_0_50px_var(--primary-glow)] hover:rotate-1">
            REQUEST SERVICE PROTOCOL
         </button>
      </section>

      <Footer lang={lang} dict={dict} />
    </main>
  )
}
