import { getTruckById } from '@/services/trucks'
import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/lib/i18n-config'
import TruckDetailClient from '@/components/TruckDetailClient'
import { notFound } from 'next/navigation'

export default async function TruckPage({
  params,
}: {
  params: Promise<{ lang: Locale; id: string }>
}) {
  const { lang, id } = await params
  const truck = await getTruckById(id)
  if (!truck) notFound()

  const dict = await getDictionary(lang)

  return <TruckDetailClient lang={lang} dict={dict} truck={truck} />
}
