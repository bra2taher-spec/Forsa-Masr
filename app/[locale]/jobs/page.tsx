'use client'

import { useState } from 'react'
import { ChevronDown, Filter, X, Search } from 'lucide-react'
import { JobCard, type JobCardProps } from '@/components/job-card'
import { useLocale, useTranslations, useIsRTL } from '@/lib/locale-context'

// Mock data
const MOCK_JOBS: JobCardProps[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Company A',
    location: 'Cairo',
    type: 'Full-time',
    salary: '15,000 - 20,000 EGP',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    isVerified: true,
    postedDaysAgo: 2,
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    company: 'Creative Studio',
    location: 'Remote',
    type: 'Part-time',
    salary: '8,000 - 12,000 EGP',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    isVerified: true,
    postedDaysAgo: 5,
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'Fintech Startup',
    location: 'Alexandria',
    type: 'Full-time',
    salary: '18,000 - 25,000 EGP',
    skills: ['Node.js', 'PostgreSQL', 'Docker'],
    isVerified: false,
    postedDaysAgo: 1,
  },
  {
    id: '4',
    title: 'Mobile Developer',
    company: 'App Dev Company',
    location: 'Giza',
    type: 'Full-time',
    salary: '16,000 - 22,000 EGP',
    skills: ['React Native', 'Swift', 'JavaScript'],
    isVerified: true,
    postedDaysAgo: 3,
  },
  {
    id: '5',
    title: 'Data Analyst',
    company: 'Analytics Firm',
    location: 'Cairo',
    type: 'Full-time',
    salary: '12,000 - 18,000 EGP',
    skills: ['Python', 'SQL', 'Tableau'],
    isVerified: true,
    postedDaysAgo: 7,
  },
  {
    id: '6',
    title: 'Project Manager',
    company: 'Consulting Group',
    location: 'Remote',
    type: 'Freelance',
    salary: '10,000 - 15,000 EGP',
    skills: ['Leadership', 'Agile', 'Risk Management'],
    isVerified: false,
    postedDaysAgo: 4,
  },
  {
    id: '7',
    title: 'Marketing Specialist',
    company: 'Digital Agency',
    location: 'Cairo',
    type: 'Part-time',
    salary: '7,000 - 11,000 EGP',
    skills: ['SEO', 'Content Writing', 'Analytics'],
    isVerified: true,
    postedDaysAgo: 6,
  },
  {
    id: '8',
    title: 'QA Engineer',
    company: 'Software House',
    location: 'Alexandria',
    type: 'Full-time',
    salary: '11,000 - 16,000 EGP',
    skills: ['Selenium', 'JIRA', 'Manual Testing'],
    isVerified: true,
    postedDaysAgo: 8,
  },
  {
    id: '9',
    title: 'DevOps Engineer',
    company: 'Cloud Services',
    location: 'Remote',
    type: 'Full-time',
    salary: '20,000 - 28,000 EGP',
    skills: ['Kubernetes', 'AWS', 'CI/CD'],
    isVerified: true,
    postedDaysAgo: 2,
  },
]

const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Freelance']
const LOCATIONS = ['Cairo', 'Alexandria', 'Giza', 'Remote']
const ALL_SKILLS = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'SQL',
  'AWS',
  'Docker',
  'Figma',
  'Agile',
]

export default function JobsPage() {
  const locale = useLocale()
  const isRTL = useIsRTL()
  const t = useTranslations('jobs')

  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [salaryRange, setSalaryRange] = useState([0, 50000])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Translations
  const translations = {
    en: {
      title: 'Job Listings',
      search: 'Search jobs...',
      filters: 'Filters',
      jobType: 'Job Type',
      location: 'Location',
      salaryRange: 'Salary Range',
      skills: 'Skills',
      sort: 'Sort by',
      newest: 'Newest',
      salary: 'Salary',
      relevance: 'Relevance',
      apply: 'Apply Filters',
      clear: 'Clear Filters',
      egp: 'EGP',
    },
    ar: {
      title: 'قائمة الوظائف',
      search: 'ابحث عن وظائف...',
      filters: 'الفلاتر',
      jobType: 'نوع الوظيفة',
      location: 'الموقع',
      salaryRange: 'نطاق الراتب',
      skills: 'المهارات',
      sort: 'ترتيب حسب',
      newest: 'الأحدث',
      salary: 'الراتب',
      relevance: 'الملاءمة',
      apply: 'تطبيق الفلاتر',
      clear: 'مسح الفلاتر',
      egp: 'جنيه',
    },
  }

  const lang = translations[locale as keyof typeof translations]

  // Filter and sort jobs
  let filteredJobs = MOCK_JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesJobType =
      selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type)

    const matchesLocation =
      selectedLocation === null || job.location === selectedLocation

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => job.skills.includes(skill))

    return matchesSearch && matchesJobType && matchesLocation && matchesSkills
  })

  // Sort jobs
  if (sortBy === 'salary') {
    filteredJobs.sort(
      (a, b) =>
        parseInt(b.salary.split('-')[1]) - parseInt(a.salary.split('-')[1])
    )
  } else if (sortBy === 'newest') {
    filteredJobs.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo)
  }

  // Pagination
  const itemsPerPage = 9
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedJobs = filteredJobs.slice(startIdx, startIdx + itemsPerPage)

  const toggleJobType = (type: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
    setCurrentPage(1)
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedJobTypes([])
    setSelectedLocation(null)
    setSalaryRange([0, 50000])
    setSelectedSkills([])
    setSearchTerm('')
    setCurrentPage(1)
  }

  // Sidebar content
  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Job Type */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">{lang.jobType}</h3>
        <div className="space-y-2">
          {JOB_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedJobTypes.includes(type)}
                onChange={() => toggleJobType(type)}
                className="w-4 h-4 rounded border-gray-300 text-[#185FA5]"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">{lang.location}</h3>
        <div className="relative">
          <select
            value={selectedLocation || ''}
            onChange={(e) => {
              setSelectedLocation(e.target.value || null)
              setCurrentPage(1)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none bg-white cursor-pointer"
          >
            <option value="">All Locations</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <ChevronDown
            className={`absolute top-3 pointer-events-none w-4 h-4 text-gray-600 ${isRTL ? 'ltr:right-3' : 'ltr:right-3'}`}
          />
        </div>
      </div>

      {/* Salary Range */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">{lang.salaryRange}</h3>
        <input
          type="range"
          min="0"
          max="50000"
          step="5000"
          value={salaryRange[1]}
          onChange={(e) => {
            setSalaryRange([0, parseInt(e.target.value)])
            setCurrentPage(1)
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#185FA5]"
        />
        <div className="text-sm text-gray-600 mt-2">
          0 - {salaryRange[1].toLocaleString()} {lang.egp}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">{lang.skills}</h3>
        <div className="flex flex-wrap gap-2">
          {ALL_SKILLS.map((skill) => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                selectedSkills.includes(skill)
                  ? 'bg-[#185FA5] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Clear button */}
      <button
        onClick={clearFilters}
        className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        {lang.clear}
      </button>
    </div>
  )

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lang.title}</h1>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 h-fit">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <FiltersContent />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Top controls */}
            <div className="flex gap-4 mb-6 flex-wrap items-center">
              {/* Search bar */}
              <div className="flex-1 min-w-64 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder={lang.search}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#185FA5]"
                />
              </div>

              {/* Sort dropdown */}
              <div className="relative min-w-40">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg appearance-none bg-white cursor-pointer text-gray-700 pr-10"
                >
                  <option value="newest">{lang.newest}</option>
                  <option value="salary">{lang.salary}</option>
                  <option value="relevance">{lang.relevance}</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-600 pointer-events-none" />
              </div>

              {/* Mobile filter button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                {lang.filters}
              </button>
            </div>

            {/* Mobile filter drawer */}
            {isFilterOpen && (
              <div className="lg:hidden mb-6 bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">{lang.filters}</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FiltersContent />
              </div>
            )}

            {/* Jobs Grid */}
            {paginatedJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {paginatedJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  {locale === 'ar' ? 'لم يتم العثور على وظائف' : 'No jobs found'}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-[#185FA5] text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-[#185FA5]'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
