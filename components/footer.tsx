'use client'

import Link from 'next/link'
import { Mail, Phone, Send } from 'lucide-react'
import { useLocale, useTranslations } from '@/lib/locale-context'

export function Footer() {
  const locale = useLocale()
  const t = useTranslations('footer')
  const isRTL = locale === 'ar'

  const navItems = [
    { label: locale === 'ar' ? 'الوظائف' : 'Jobs', href: '/jobs' },
    { label: locale === 'ar' ? 'النصائح' : 'Tips', href: '/tips' },
    { label: locale === 'ar' ? 'القصص' : 'Stories', href: '/stories' },
    { label: locale === 'ar' ? 'الخطط' : 'Pricing', href: '/subscriptions' },
  ]

  const employerItems = [
    { label: t('postJob'), href: '/post-job' },
    { label: locale === 'ar' ? 'الخطط' : 'Pricing', href: '/subscriptions' },
    { label: t('contact'), href: '#' },
  ]

  return (
    <footer className={`bg-gray-900 text-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div>
            <Link href={`/${locale}`} className="inline-block mb-3">
              <div className="font-bold text-2xl text-[#185FA5]">
                {t('brand')}
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-gray-400 hover:text-[#185FA5] transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Employers */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">
              {t('forEmployers')}
            </h3>
            <ul className="space-y-2">
              {employerItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-gray-400 hover:text-[#185FA5] transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">
              {t('contactInfo')}
            </h3>
            <div className="space-y-3 mb-4">
              <div className="text-sm">
                <span className="text-gray-400">{t('email')}:</span>
                <a
                  href="mailto:hello@fursaegypt.com"
                  className="text-gray-400 hover:text-[#185FA5] transition-colors ml-2"
                >
                  hello@fursaegypt.com
                </a>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">{t('phone')}:</span>
                <a
                  href="tel:+201001234567"
                  className="text-gray-400 hover:text-[#185FA5] transition-colors ml-2"
                >
                  +20 100 123 4567
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="mailto:hello@fursaegypt.com"
                className="text-gray-400 hover:text-[#185FA5] transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+201001234567"
                className="text-gray-400 hover:text-[#185FA5] transition-colors"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
              <a
                href="https://wa.me/201001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#185FA5] transition-colors"
                aria-label="WhatsApp"
              >
                <Send size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-400">
            <p>{t('copyright')}</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-[#185FA5] transition-colors">
                {t('privacy')}
              </Link>
              <Link href="#" className="hover:text-[#185FA5] transition-colors">
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
