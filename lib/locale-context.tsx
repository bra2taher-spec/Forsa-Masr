'use client'

import React, { createContext, useContext } from 'react'

type Locale = 'ar' | 'en'

interface LocaleContextType {
  locale: Locale
  messages: Record<string, any>
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale
  messages: Record<string, any>
  children: React.ReactNode
}) {
  return (
    <LocaleContext.Provider value={{ locale, messages }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): Locale {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return context.locale
}

export function useIsRTL(): boolean {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useIsRTL must be used within LocaleProvider')
  }
  return context.locale === 'ar'
}

/**
 * useTranslations(namespace?)
 *
 * - No namespace: traverses from message root
 *   e.g. t('nav.home') → messages.nav.home
 *        t('logo')      → messages.logo
 *
 * - With namespace: traverses from messages[namespace]
 *   e.g. useTranslations('footer') → t('brand') → messages.footer.brand
 *        useTranslations('dashboard') → t('welcomeBack') → messages.dashboard.welcomeBack
 */
export function useTranslations(namespace?: string) {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useTranslations must be used within LocaleProvider')
  }

  return (key: string, defaultValue?: string): string => {
    const keys = key.split('.')
    let value: any = namespace
      ? context.messages[namespace]
      : context.messages

    for (const k of keys) {
      value = value?.[k]
    }

    return typeof value === 'string' ? value : (defaultValue ?? key)
  }
}
