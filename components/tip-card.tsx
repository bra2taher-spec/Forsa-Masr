'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from '@/lib/locale-context'

export interface TipCardProps {
  id: string
  title: string
  excerpt: string
  category: 'resume' | 'interview' | 'salary' | 'careerGrowth'
  readingTime: number
}

const categoryColors: Record<string, { bg: string; text: string; badge: string }> = {
  resume: { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
  interview: { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100 text-green-700' },
  salary: { bg: 'bg-purple-50', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
  careerGrowth: { bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
}

const categoryLabels: Record<string, Record<string, string>> = {
  resume: { en: 'Resume', ar: 'السيرة الذاتية' },
  interview: { en: 'Interview', ar: 'المقابلة' },
  salary: { en: 'Salary & Benefits', ar: 'الراتب والمزايا' },
  careerGrowth: { en: 'Career Growth', ar: 'تطوير المهنة' },
}

export function TipCard({ id, title, excerpt, category, readingTime }: TipCardProps) {
  const locale = useLocale()
  const t = useTranslations('tips')
  const colors = categoryColors[category]
  const categoryLabel = categoryLabels[category][locale]

  return (
    <Link href={`/${locale}/tips/${id}`}>
      <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col">
        {/* Category Badge */}
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
            {categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
          {excerpt}
        </p>

        {/* Reading Time and Read More */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {readingTime} {t('minRead')}
          </span>
          <span className="text-sm font-medium text-[#185FA5] hover:underline">
            {t('readMore')} →
          </span>
        </div>
      </div>
    </Link>
  )
}
