'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from '@/lib/locale-context';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Briefcase, Globe, Menu, X } from 'lucide-react';

export function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isRTL = locale === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'jobs', href: '/jobs' },
    { key: 'tips', href: '/tips' },
    { key: 'stories', href: '/stories' },
    { key: 'subscriptions', href: '/subscriptions' },
    { key: 'postJob', href: '/post-job' },
  ];

  const isActive = (href: string) => {
    const currentPath = pathname.split('/').slice(2).join('/') || '';
    const hrefPath = href === '/' ? '' : href.slice(1);
    return currentPath === hrefPath;
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-md border-b border-gray-100'
            : 'bg-white border-b border-gray-100'
        }`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 font-bold text-lg shrink-0"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#185FA5' }}
              >
                <Briefcase size={20} className="text-white" />
              </div>
              <span
                className={`hidden sm:inline ${isRTL ? 'font-cairo' : 'font-inter'}`}
                style={{ color: '#185FA5' }}
              >
                {t('logo')}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={
                    isActive(item.href)
                      ? { backgroundColor: '#E6F1FB', color: '#185FA5' }
                      : {}
                  }
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle language"
              >
                <Globe size={18} />
                <span className="hidden sm:inline">{t('language')}</span>
              </button>

              {/* Dashboard Button */}
              <Link
                href={`/${locale}/dashboard`}
                className="hidden sm:block px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: '#185FA5' }}
              >
                {t('nav.dashboard')}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4 pt-2 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700'
                  }`}
                  style={
                    isActive(item.href)
                      ? { backgroundColor: '#E6F1FB', color: '#185FA5' }
                      : {}
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              <Link
                href={`/${locale}/dashboard`}
                className="block w-full mt-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 text-center"
                style={{ backgroundColor: '#185FA5' }}
                onClick={() => setIsOpen(false)}
              >
                {t('nav.dashboard')}
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
