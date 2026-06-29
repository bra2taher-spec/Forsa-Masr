'use client'

import { useTranslations, useLocale } from '@/lib/locale-context'
import { StatsBar } from '@/components/stats-bar'
import { LatestJobs } from '@/components/latest-jobs'
import { type JobCardProps } from '@/components/job-card'

export default function Home() {
  const t = useTranslations()
  const locale = useLocale()
  const isArabic = locale === 'ar'

  // Stats data
  const stats = [
    { value: '2,547', label: isArabic ? 'وظيفة نشطة' : 'Active Jobs', textColor: 'text-[#185FA5]' },
    { value: '12,450', label: isArabic ? 'متوظف من خلالنا' : 'Employees Hired', textColor: 'text-[#3B6D11]' },
    { value: '380', label: isArabic ? 'شركة موثقة' : 'Verified Companies', textColor: 'text-[#854F0B]' },
    { value: '96%', label: isArabic ? 'رضا المستخدمين' : 'User Satisfaction', textColor: 'text-[#185FA5]' },
  ]

  // Sample jobs data
  const jobsData: JobCardProps[] = [
    {
      id: '1',
      title: isArabic ? 'مطور واجهة أمامية متقدم' : 'Senior Frontend Developer',
      company: isArabic ? 'شركة فالتك' : 'Valtech',
      location: isArabic ? 'القاهرة' : 'Cairo',
      type: 'Full-time',
      salary: '18,000-25,000 EGP',
      skills: ['React', 'TypeScript'],
      isVerified: true,
      postedDaysAgo: 2,
    },
    {
      id: '2',
      title: isArabic ? 'مدير التسويق الرقمي' : 'Digital Marketing Manager',
      company: isArabic ? 'أجنسية كريتيف لاب' : 'Agentsia Creative Lab',
      location: isArabic ? 'الإسكندرية' : 'Alexandria',
      type: 'Full-time',
      salary: '12,000-18,000 EGP',
      skills: ['SEO', 'Google Ads'],
      isVerified: true,
      postedDaysAgo: 3,
    },
    {
      id: '3',
      title: isArabic ? 'محاسب متقدم' : 'Senior Accountant',
      company: isArabic ? 'مجموعة النيل للاستثمار' : 'Nile Investment Group',
      location: isArabic ? 'القاهرة' : 'Cairo',
      type: 'Full-time',
      salary: '10,000-14,000 EGP',
      skills: ['Financial Accounting', 'IFRS'],
      isVerified: true,
      postedDaysAgo: 1,
    },
    {
      id: '4',
      title: isArabic ? 'مصمم واجهات المستخدم' : 'UI/UX Designer',
      company: isArabic ? 'ستارت أب بايوتك' : 'BioTech Startup',
      location: isArabic ? 'ريموت' : 'Remote',
      type: 'Remote',
      salary: '15,000-22,000 EGP',
      skills: ['Figma', 'UI Design'],
      isVerified: false,
      postedDaysAgo: 5,
    },
    {
      id: '5',
      title: isArabic ? 'مطور خادم Node.js' : 'Backend Developer (Node.js)',
      company: isArabic ? 'شركة سوار' : 'Souwar',
      location: isArabic ? 'الجيزة' : 'Giza',
      type: 'Full-time',
      salary: '16,000-22,000 EGP',
      skills: ['Node.js', 'MongoDB'],
      isVerified: true,
      postedDaysAgo: 4,
    },
    {
      id: '6',
      title: isArabic ? 'ممثل المبيعات' : 'Sales Representative',
      company: isArabic ? 'شركة فودافون مصر' : 'Vodafone Egypt',
      location: isArabic ? 'القاهرة' : 'Cairo',
      type: 'Full-time',
      salary: '6,000-10,000+عمولة',
      skills: ['Sales', 'B2B'],
      isVerified: true,
      postedDaysAgo: 6,
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className={`bg-gradient-to-br from-[#E6F1FB] to-white pt-16 sm:pt-20 md:pt-24 pb-32 ${isArabic ? 'text-right' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
            {isArabic ? 'ابحث عن وظيفتك المثالية' : 'Find Your Perfect Job'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-8">
            {isArabic ? 'منصة توظيف موثوقة تربط بين أفضل المواهب والشركات الرائدة في السوق المصري' : 'A trusted platform connecting top talent with leading companies in the Egyptian market'}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 max-w-md ${isArabic ? 'flex-row-reverse' : ''}`}>
            <input
              type="text"
              placeholder={isArabic ? 'البحث عن وظيفة...' : 'Search jobs...'}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#185FA5] focus:ring-2 focus:ring-[#E6F1FB]"
            />
            <button className="bg-[#185FA5] text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              {isArabic ? 'بحث' : 'Search'}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar stats={stats} />

      {/* Latest Jobs Section */}
      <LatestJobs jobs={jobsData} />
    </main>
  )
}
