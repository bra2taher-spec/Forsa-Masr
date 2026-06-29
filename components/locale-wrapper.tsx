'use client'

import { ReactNode } from 'react'

export function LocaleWrapper({
  locale,
  children,
}: {
  locale: string
  children: ReactNode
}) {
  const isRTL = locale === 'ar'
  
  // Update html attributes when component mounts
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }

  return <>{children}</>
}
