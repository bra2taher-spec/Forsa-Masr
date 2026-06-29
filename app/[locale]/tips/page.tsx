'use client'

import { useState } from 'react'
import { TipCard, type TipCardProps } from '@/components/tip-card'
import { CategoryFilters } from '@/components/category-filters'
import { useLocale, useTranslations } from '@/lib/locale-context'

type Category = 'all' | 'resume' | 'interview' | 'salary' | 'careerGrowth'

// Mock data for tips
const allTips: TipCardProps[] = [
  {
    id: '1',
    title: 'How to Write a Winning Resume in 2024',
    excerpt: 'Learn the essential elements of a modern resume that will grab recruiters attention in seconds.',
    category: 'resume',
    readingTime: 5,
  },
  {
    id: '2',
    title: 'المقابلة الناجحة: 10 نصائح ذهبية',
    excerpt: 'اكتشف الاستراتيجيات الفعالة للتميز في مقابلتك الوظيفية القادمة.',
    category: 'interview',
    readingTime: 7,
  },
  {
    id: '3',
    title: 'Negotiating Your Salary: A Complete Guide',
    excerpt: 'Master the art of salary negotiation and learn how to advocate for fair compensation.',
    category: 'salary',
    readingTime: 8,
  },
  {
    id: '4',
    title: 'خطة تطوير مهنية: من المبتدئ إلى القيادة',
    excerpt: 'ابني مسيرة وظيفية قوية من خلال التخطيط الاستراتيجي والتطور المستمر.',
    category: 'careerGrowth',
    readingTime: 10,
  },
  {
    id: '5',
    title: 'Top Skills Employers Are Looking For',
    excerpt: 'Discover the most in-demand skills in todays job market and how to develop them.',
    category: 'careerGrowth',
    readingTime: 6,
  },
  {
    id: '6',
    title: 'البحث عن الوظيفة المثالية: استراتيجية فعالة',
    excerpt: 'تعلم كيفية البحث عن الفرص الوظيفية المناسبة لمهاراتك وأحلامك الوظيفية.',
    category: 'resume',
    readingTime: 5,
  },
]

export default function TipsPage() {
  const locale = useLocale()
  const t = useTranslations('tips')
  const isRTL = locale === 'ar'
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  // Filter tips based on active category
  const filteredTips = activeCategory === 'all' 
    ? allTips 
    : allTips.filter(tip => tip.category === activeCategory)

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>

      {/* Hero Banner */}
      <div 
        className="bg-gradient-to-b from-[#E6F1FB] to-white py-12 sm:py-16 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <CategoryFilters 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.length > 0 ? (
            filteredTips.map(tip => (
              <TipCard key={tip.id} {...tip} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                {isRTL ? 'لا توجد نصائح في هذه الفئة' : 'No tips in this category'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
