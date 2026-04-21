import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/lib/i18n-config'
import HomeClient from '@/components/HomeClient'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return <HomeClient lang={lang} dict={dict} />
}
