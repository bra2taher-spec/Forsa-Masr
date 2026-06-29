'use client'

import { useState } from 'react'
import { StepIndicator } from '@/components/step-indicator'
import { JobCard } from '@/components/job-card'
import { useLocale, useTranslations } from '@/lib/locale-context'
import { X } from 'lucide-react'

interface FormData {
  // Step 1
  jobTitle: string
  companyName: string
  location: string
  jobType: string
  salaryFrom: string
  salaryTo: string
  jobDescription: string

  // Step 2
  skills: string[]
  experienceLevel: string
  education: string
  applicationDeadline: string
  applicationMethod: string
}

export default function PostJobPage() {
  const locale = useLocale()
  const t = useTranslations('postJob')
  const isRTL = locale === 'ar'

  const [currentStep, setCurrentStep] = useState(0)
  const [skillInput, setSkillInput] = useState('')
  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    companyName: '',
    location: 'Cairo',
    jobType: 'fullTime',
    salaryFrom: '',
    salaryTo: '',
    jobDescription: '',
    skills: [],
    experienceLevel: 'entry',
    education: 'bachelor',
    applicationDeadline: '',
    applicationMethod: 'viaPlatform',
  })

  const steps = [t('step1'), t('step2'), t('step3')]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault()
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStep1Valid =
    formData.jobTitle.trim() &&
    formData.companyName.trim() &&
    formData.salaryFrom &&
    formData.salaryTo &&
    formData.jobDescription.length >= 200

  const isStep2Valid =
    formData.skills.length > 0 &&
    formData.applicationDeadline

  return (
    <main className={`${isRTL ? 'rtl' : 'ltr'}`}>

      {/* Header */}
      <div className="bg-gradient-to-b from-[#E6F1FB] to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('title')}
          </h1>
          <p className="text-gray-600">
            {locale === 'ar' ? 'ملء نموذج بسيط في 3 خطوات' : 'Fill out a simple form in 3 steps'}
          </p>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="bg-white border border-gray-200 rounded-xl p-8">
          {/* Step 1: Job Details */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('jobTitle')}
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior React Developer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#185FA5]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('companyName')}
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g., Tech Company Egypt"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#185FA5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('location')}
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#185FA5]"
                  >
                    <option value="cairo">{t('cairo')}</option>
                    <option value="alexandria">{t('alexandria')}</option>
                    <option value="giza">{t('giza')}</option>
                    <option value="remote">{t('remote')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('jobType')}
                  </label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#185FA5]"
                  >
                    <option value="fullTime">{t('fullTime')}</option>
                    <option value="partTime">{t('partTime')}</option>
                    <option value="remote">{t('remote')}</option>
                    <option value="freelance">{t('freelance')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('salaryRange')}
                </label>
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-600 mb-1">
                      {t('from')} ({t('egp')})
                    </label>
                    <input
                      type="number"
                      name="salaryFrom"
                      value={formData.salaryFrom}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#185FA5]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-600 mb-1">
                      {t('to')} ({t('egp')})
                    </label>
                    <input
                      type="number"
                      name="salaryTo"
                      value={formData.salaryTo}
                      onChange={handleInputChange}
                      placeholder="50000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#185FA5]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('jobDescription')}
                </label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the job role, responsibilities, and what you're looking for..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#185FA5]"
                />
                <p className={`text-xs mt-1 ${formData.jobDescription.length >= 200 ? 'text-[#3B6D11]' : 'text-gray-500'}`}>
                  {formData.jobDescription.length}/200 {t('minChars')}
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Requirements */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('requiredSkills')}
                </label>
                <input
                  type="text"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  placeholder={t('addSkill')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#185FA5]"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 bg-[#E6F1FB] text-[#185FA5] px-3 py-1 rounded-lg text-sm"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(idx)}
                        className="hover:text-[#185FA5] transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  {t('experienceLevel')}
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'entry', label: t('entry') },
                    { value: 'mid', label: t('mid') },
                    { value: 'senior', label: t('senior') },
                  ].map(opt => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="experienceLevel"
                        value={opt.value}
                        checked={formData.experienceLevel === opt.value}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('education')}
                </label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#185FA5]"
                >
                  <option value="diploma">{t('diploma')}</option>
                  <option value="bachelor">{t('bachelor')}</option>
                  <option value="master">{t('master')}</option>
                  <option value="phd">{t('phd')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('applicationDeadline')}
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#185FA5]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  {t('applicationMethod')}
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'viaPlatform', label: t('viaPlatform') },
                    { value: 'externalLink', label: t('externalLink') },
                    { value: 'whatsapp', label: t('whatsapp') },
                  ].map(opt => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="applicationMethod"
                        value={opt.value}
                        checked={formData.applicationMethod === opt.value}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t('preview')}</h2>
                <JobCard
                  id="preview"
                  title={formData.jobTitle}
                  company={formData.companyName}
                  location={formData.location}
                  type={formData.jobType}
                  salary={`${formData.salaryFrom} - ${formData.salaryTo} ${locale === 'ar' ? 'ج.م' : 'EGP'}`}
                  skills={formData.skills}
                  isVerified={false}
                  postedDaysAgo={0}
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {locale === 'ar' ? 'وصف الوظيفة' : 'Job Description'}
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap">{formData.jobDescription}</p>
              </div>

              <button
                onClick={() => {
                  console.log('[v0] Job posted:', formData)
                  alert(locale === 'ar' ? 'تم نشر الوظيفة بنجاح!' : 'Job posted successfully!')
                }}
                className="w-full bg-[#185FA5] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                {t('postJob')}
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                {t('back')}
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 0 && !isStep1Valid) ||
                  (currentStep === 1 && !isStep2Valid)
                }
                className={`flex-1 px-6 py-3 rounded-lg text-white font-semibold transition ${
                  (currentStep === 0 && !isStep1Valid) ||
                  (currentStep === 1 && !isStep2Valid)
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#185FA5] hover:bg-blue-700'
                }`}
              >
                {t('next')}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
