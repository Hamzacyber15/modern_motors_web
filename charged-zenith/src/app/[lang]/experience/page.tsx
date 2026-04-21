import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/lib/i18n-config'
import Navigation from '@/components/Navigation'
import CockpitViewer from '@/components/CockpitViewer'
import Footer from '@/components/Footer'

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <main className="bg-brand-secondary min-h-screen">
      <Navigation lang={lang} dict={dict} />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center mb-16">
          <span className="text-primary font-industrial text-sm font-black tracking-[0.5em] uppercase">
            IMMERSIVE REALITY
          </span>
          <h1 className="mt-6 text-6xl md:text-8xl font-industrial font-black text-white italic leading-none">
            THE <span className="text-outline">COMMAND</span> CENTER
          </h1>
          <p className="mt-8 text-white/50 text-xl leading-relaxed max-w-2xl mx-auto">
            Experience the future of heavy-duty transport from the driver's perspective. Interact with our desert-optimized cockpit technology.
          </p>
        </div>

        <div className="aspect-video max-w-6xl mx-auto rounded-[3rem] overflow-hidden glass shadow-2xl relative group">
           <CockpitViewer lang={lang} dict={dict} />
        </div>
      </section>

      <Footer lang={lang} dict={dict} />
    </main>
  )
}
