import { getTrucks } from '@/services/trucks'
import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/lib/i18n-config'
import FleetClient from '@/components/FleetClient'

export default async function TrucksPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  
  const trucks = await getTrucks()
  const dict = await getDictionary(lang)

  return <FleetClient lang={lang} dict={dict} trucks={trucks} initialCategory="all" />
}
