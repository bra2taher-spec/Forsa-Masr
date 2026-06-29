'use client'

import { useLocale } from '@/lib/locale-context'

interface SubscriptionToggleProps {
  selected: 'seekers' | 'employers'
  onChange: (type: 'seekers' | 'employers') => void
}

export function SubscriptionToggle({ selected, onChange }: SubscriptionToggleProps) {
  const locale = useLocale()
  const isRTL = locale === 'ar'

  const seekersLabel = locale === 'ar' ? 'للباحثين عن عمل' : 'For Job Seekers'
  const employersLabel = locale === 'ar' ? 'لأصحاب العمل' : 'For Employers'

  return (
    <div
      className={`inline-flex bg-gray-100 rounded-full p-1 ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <button
        onClick={() => onChange('seekers')}
        className={`px-6 py-2 rounded-full font-semibold transition-all ${
          selected === 'seekers'
            ? 'bg-[#185FA5] text-white'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {seekersLabel}
      </button>
      <button
        onClick={() => onChange('employers')}
        className={`px-6 py-2 rounded-full font-semibold transition-all ${
          selected === 'employers'
            ? 'bg-[#185FA5] text-white'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {employersLabel}
      </button>
    </div>
  )
}
