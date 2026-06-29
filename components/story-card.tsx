'use client'

import { useLocale, useTranslations } from '@/lib/locale-context'

interface StoryCardProps {
  name: string
  beforeJob: string
  afterJob: string
  quote: string
  initial: string
}

export function StoryCard({
  name,
  beforeJob,
  afterJob,
  quote,
  initial,
}: StoryCardProps) {
  const locale = useLocale()
  const t = useTranslations('stories')
  const isRTL = locale === 'ar'

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-5 hover:border-[#185FA5] hover:shadow-lg transition-all ${isRTL ? 'rtl' : 'ltr'}`}
    >
      {/* Avatar with Initial */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#185FA5] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">{initial}</span>
        </div>
        <h3 className="font-bold text-gray-900">{name}</h3>
      </div>

      {/* Before/After Jobs */}
      <div className="mb-4 space-y-2">
        <div className="flex items-start gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">
            {t('before')}
          </span>
          <p className="text-sm text-gray-600">{beforeJob}</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-xs font-semibold text-[#185FA5] uppercase whitespace-nowrap">
            {t('after')}
          </span>
          <p className="text-sm font-medium text-gray-900">{afterJob}</p>
        </div>
      </div>

      {/* Quote */}
      <p className="text-sm text-gray-700 italic line-clamp-3">
        "{quote}"
      </p>
    </div>
  )
}
