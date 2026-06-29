'use client'

import Link from 'next/link'
import { MapPin, Briefcase, Clock, BadgeCheck } from 'lucide-react'
import { useLocale } from '@/lib/locale-context'

export interface JobCardProps {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  skills: string[]
  isVerified: boolean
  postedDaysAgo: number
}

export function JobCard({
  id,
  title,
  company,
  location,
  type,
  salary,
  skills,
  isVerified,
  postedDaysAgo,
}: JobCardProps) {
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
    <Link href={`/${locale}/jobs/${id}`}>
      <div
        className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#185FA5] hover:shadow-lg transition-all duration-200 cursor-pointer h-full flex flex-col"
      >
        {/* Header with company name and verify badge */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600">{company}</p>
          </div>
          {isVerified && (
            <BadgeCheck className="w-5 h-5 text-[#3B6D11] flex-shrink-0 ltr:ml-2 rtl:mr-2" />
          )}
        </div>

        {/* Location, Type, and posted time */}
        <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{type}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{postedDaysAgo}d ago</span>
          </div>
        </div>

        {/* Salary */}
        <div className="mb-4 text-sm font-semibold text-[#185FA5]">
          {salary}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="inline-block bg-[#E6F1FB] text-[#185FA5] text-xs px-2 py-1 rounded-md"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="inline-block text-xs text-gray-600 px-2 py-1">
              +{skills.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
