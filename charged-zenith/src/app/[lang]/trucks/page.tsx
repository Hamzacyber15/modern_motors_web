import { getTrucks } from '@/services/trucks'
import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/lib/i18n-config'
import FleetClient from '@/components/FleetClient'

export default async function TrucksPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>
  searchParams: Promise<{ cat?: string }>
}) {
  const { lang } = await params
  const { cat } = await searchParams
  
  const trucks = await getTrucks(cat)
  const dict = await getDictionary(lang)

  return <FleetClient lang={lang} dict={dict} trucks={trucks} initialCategory={cat} />
}
