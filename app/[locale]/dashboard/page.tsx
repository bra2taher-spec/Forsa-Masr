'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from '@/lib/locale-context'
import { ChevronUp, X, Upload } from 'lucide-react'

// Mock data
const mockUser = {
  name: 'Ahmed Hassan',
  email: 'ahmed@example.com',
  phone: '+20 100 123 4567',
  profileCompletion: 75,
  avatar: 'AH',
  skills: ['React', 'TypeScript', 'Node.js', 'UI/UX'],
}

const mockApplications = [
  { id: 1, job: 'Senior Frontend Developer', company: 'TechCorp', date: '2024-06-20', status: 'interview' },
  { id: 2, job: 'Full Stack Developer', company: 'StartupXYZ', date: '2024-06-18', status: 'pending' },
  { id: 3, job: 'React Developer', company: 'WebAgency', date: '2024-06-15', status: 'rejected' },
  { id: 4, job: 'UI Designer', company: 'DesignStudio', date: '2024-06-10', status: 'hired' },
  { id: 5, job: 'Backend Developer', company: 'CloudServices', date: '2024-06-05', status: 'pending' },
]

const mockSavedJobs = [
  { id: 1, title: 'Product Manager', company: 'TechGiant', location: 'Cairo' },
  { id: 2, title: 'Data Analyst', company: 'Analytics Pro', location: 'Alexandria' },
  { id: 3, title: 'DevOps Engineer', company: 'CloudOps', location: 'Remote' },
]

const mockStats = [
  { label: 'applicationsSent', value: 12 },
  { label: 'profileViews', value: 245 },
  { label: 'savedJobs', value: 8 },
  { label: 'interviewInvites', value: 3 },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'interview':
      return 'bg-blue-100 text-blue-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    case 'hired':
      return 'bg-[#3B6D11] bg-opacity-10 text-[#3B6D11]'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status: string, t: (key: string) => string) => {
  const statusMap: Record<string, string> = {
    pending: t('pending'),
    interview: t('interview'),
    rejected: t('rejected'),
    hired: t('hired'),
  }
  return statusMap[status] || status
}

export default function DashboardPage() {
  const locale = useLocale()
  const t = useTranslations('dashboard')
  const isRTL = locale === 'ar'
  const [editMode, setEditMode] = useState(false)
  const [userData, setUserData] = useState(mockUser)
  const [savedJobs, setSavedJobs] = useState(mockSavedJobs)

  const handleRemoveSavedJob = (id: number) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== id))
  }

  return (
    <main className={`${isRTL ? 'rtl' : 'ltr'}`}>

      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#E6F1FB] to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t('welcomeBack').replace('{name}', userData.name)}
          </h1>

          {/* Profile Completion Progress */}
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">{t('profileCompletion')}</span>
                <span className="text-sm font-bold text-[#185FA5]">{userData.profileCompletion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#185FA5] h-2 rounded-full transition-all"
                  style={{ width: `${userData.profileCompletion}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockStats.map((stat, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#185FA5] hover:shadow-lg transition-all">
              <p className="text-gray-600 text-sm mb-2">{t(stat.label)}</p>
              <p className="text-3xl font-bold text-[#185FA5]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* My Applications - Left Column (2/3 width) */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#185FA5] rounded"></span>
              {t('myApplications')}
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('jobTitle')}</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('company')}</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('dateApplied')}</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockApplications.map((app) => (
                      <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{app.job}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{app.company}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{app.date}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                            {getStatusLabel(app.status, t)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Saved Jobs - Right Column (1/3 width) */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#185FA5] rounded"></span>
              {t('savedJobs')}
            </h2>
            <div className="space-y-4">
              {savedJobs.map((job) => (
                <div key={job.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#185FA5] hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{job.title}</h3>
                    <button
                      onClick={() => handleRemoveSavedJob(job.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{job.company}</p>
                  <p className="text-xs text-gray-500">{job.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#185FA5] rounded"></span>
              {t('myProfile')}
            </h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="px-4 py-2 bg-[#185FA5] text-white rounded-lg hover:bg-opacity-90 transition-all text-sm font-semibold"
            >
              {editMode ? t('cancel') : t('edit')}
            </button>
          </div>

          {/* Avatar and Name */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
            <div className="w-16 h-16 rounded-full bg-[#185FA5] flex items-center justify-center">
              <span className="text-white font-bold text-xl">{userData.avatar}</span>
            </div>
            {editMode ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="text-2xl font-bold border border-gray-300 rounded-lg px-3 py-2"
              />
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{userData.name}</h3>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('email')}</label>
              {editMode ? (
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                />
              ) : (
                <p className="text-gray-600">{userData.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('phone')}</label>
              {editMode ? (
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                />
              ) : (
                <p className="text-gray-600">{userData.phone}</p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">{t('skills')}</label>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill, idx) => (
                <span key={idx} className="inline-block px-4 py-2 bg-[#E6F1FB] text-[#185FA5] rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* CV Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">{t('uploadCV')}</label>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Upload size={18} className="text-[#185FA5]" />
                <span className="text-sm font-medium text-gray-700">{t('uploadCV')}</span>
              </button>
              <span className="text-sm text-gray-500">CV_Ahmed_Hassan.pdf</span>
            </div>
          </div>

          {/* Save Button */}
          {editMode && (
            <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700"
              >
                {t('cancel')}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-[#3B6D11] text-white rounded-lg hover:bg-opacity-90 transition-all text-sm font-semibold"
              >
                {t('save')}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
