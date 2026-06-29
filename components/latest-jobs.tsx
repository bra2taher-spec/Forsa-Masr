'use client'

import { JobCard, type JobCardProps } from './job-card'
import { useLocale } from '@/lib/locale-context'

interface LatestJobsProps {
  jobs: JobCardProps[]
}

export function LatestJobs({ jobs }: LatestJobsProps) {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`flex items-end justify-between mb-12 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={isArabic ? 'text-right' : ''}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {isArabic ? 'أحدث الوظائف' : 'Latest Jobs'}
            </h2>
            <p className="text-gray-600 text-sm">
              {isArabic ? 'استكشف أفضل الفرص الوظيفية الحديثة' : 'Explore the best opportunities available now'}
            </p>
          </div>
          <a
            href={`/${locale}/jobs`}
            className={`bg-[#185FA5] text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0 ${isArabic ? 'mr-4' : 'ml-4'}`}
          >
            {isArabic ? 'عرض الكل' : 'View All'}
          </a>
        </div>

        {/* Job cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </div>
    </section>
  )
}
