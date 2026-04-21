import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/lib/i18n-config'
import Navigation from '@/components/Navigation'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <main className="bg-brand-secondary min-h-screen">
      <Navigation lang={lang} dict={dict} />
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer lang={lang} dict={dict} />
    </main>
  )
}
