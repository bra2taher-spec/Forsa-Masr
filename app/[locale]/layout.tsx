import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LocaleWrapper } from '@/components/locale-wrapper'
import { LocaleProvider } from '@/lib/locale-context'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Load messages from external JSON files (en.json / ar.json)
  const messages = (await import(`../../messages/${locale}.json`)).default

  return (
    <LocaleWrapper locale={locale}>
      <LocaleProvider locale={locale as 'ar' | 'en'} messages={messages}>
        <Navbar />
        {children}
        <Footer />
      </LocaleProvider>
    </LocaleWrapper>
  )
}
