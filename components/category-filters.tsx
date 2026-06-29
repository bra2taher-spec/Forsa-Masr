'use client'

import { useLocale, useTranslations } from '@/lib/locale-context'

type Category = 'all' | 'resume' | 'interview' | 'salary' | 'careerGrowth'

export function CategoryFilters({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: Category
  onCategoryChange: (category: Category) => void
}) {
  const locale = useLocale()
  const t = useTranslations('tips')
  const isRTL = locale === 'ar'

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: t('all') },
    { id: 'resume', label: t('resume') },
    { id: 'interview', label: t('interview') },
    { id: 'salary', label: t('salary') },
    { id: 'careerGrowth', label: t('careerGrowth') },
  ]

  return (
    <div className={`flex gap-2 overflow-x-auto pb-2 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-all font-medium ${
            activeCategory === category.id
              ? 'bg-[#185FA5] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
