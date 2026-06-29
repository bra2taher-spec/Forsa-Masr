'use client'

import { useLocale } from '@/lib/locale-context'

interface FeaturedStoryCardProps {
  quote: string
  name: string
  jobTitle: string
  company: string
  story: string
}

export function FeaturedStoryCard({
  quote,
  name,
  jobTitle,
  company,
  story,
}: FeaturedStoryCardProps) {
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
    <div className={`bg-[#E6F1FB] rounded-2xl p-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Quote Block */}
      <div className="mb-6 border-l-4 border-[#185FA5] pl-4">
        <blockquote className="text-lg text-gray-800 italic font-medium">
          "{quote}"
        </blockquote>
      </div>

      {/* Person Info */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600">
          {jobTitle} at {company}
        </p>
      </div>

      {/* Story */}
      <p className="text-gray-700 leading-relaxed">
        {story}
      </p>
    </div>
  )
}
