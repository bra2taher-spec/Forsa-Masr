'use client'

import { useState } from 'react'
import { PricingCard } from '@/components/pricing-card'
import { SubscriptionToggle } from '@/components/subscription-toggle'
import { useLocale, useTranslations } from '@/lib/locale-context'

export default function SubscriptionsPage() {
  const locale = useLocale()
  const t = useTranslations('subscriptions')
  const isRTL = locale === 'ar'
  const [selectedType, setSelectedType] = useState<'seekers' | 'employers'>('seekers')

  // Job Seekers Plans
  const seekersPlans = [
    {
      name: t('free'),
      price: 0,
      description: locale === 'ar' ? 'ابدأ بحثك' : 'Start your search',
      features: [
        locale === 'ar' ? 'البحث عن الوظائف' : 'Job search',
        locale === 'ar' ? 'عرض الملفات الشخصية' : 'View profiles',
        locale === 'ar' ? 'التقديم على الوظائف' : 'Apply to jobs',
      ],
      isPopular: false,
      ctaLabel: t('subscribe'),
      ctaVariant: 'secondary' as const,
    },
    {
      name: t('pro'),
      price: 99,
      description: locale === 'ar' ? 'احصل على المزيد' : 'Get more benefits',
      features: [
        locale === 'ar' ? 'كل ميزات الخطة المجانية' : 'All free features',
        locale === 'ar' ? 'تنبيهات الوظائف' : 'Job alerts',
        locale === 'ar' ? 'دعم السيرة الذاتية' : 'CV boost',
      ],
      isPopular: true,
      ctaLabel: t('subscribe'),
      ctaVariant: 'primary' as const,
    },
    {
      name: t('premium'),
      price: 199,
      description: locale === 'ar' ? 'احصل على كل شيء' : 'Get everything',
      features: [
        locale === 'ar' ? 'كل ميزات الخطة الاحترافية' : 'All Pro features',
        locale === 'ar' ? 'ملف شخصي مميز' : 'Featured profile',
        locale === 'ar' ? 'أولوية دعم' : 'Priority support',
      ],
      isPopular: false,
      ctaLabel: t('subscribe'),
      ctaVariant: 'secondary' as const,
    },
  ]

  // Employers Plans
  const employersPlans = [
    {
      name: t('starter'),
      price: 299,
      description: locale === 'ar' ? 'ابدأ التوظيف' : 'Start hiring',
      features: [
        locale === 'ar' ? '5 إعلانات وظائف' : '5 job posts',
        locale === 'ar' ? 'البحث الأساسي' : 'Basic search',
        locale === 'ar' ? 'رؤية المرشحين' : 'View candidates',
      ],
      isPopular: false,
      ctaLabel: t('subscribe'),
      ctaVariant: 'secondary' as const,
    },
    {
      name: t('business'),
      price: 799,
      description: locale === 'ar' ? 'توظيف في الحجم الكبير' : 'Scale your hiring',
      features: [
        locale === 'ar' ? 'عدد غير محدود من الإعلانات' : 'Unlimited job posts',
        locale === 'ar' ? 'بحث متقدم' : 'Advanced search',
        locale === 'ar' ? 'إدارة الفريق' : 'Team management',
      ],
      isPopular: true,
      ctaLabel: t('subscribe'),
      ctaVariant: 'primary' as const,
    },
    {
      name: t('enterprise'),
      price: t('custom'),
      description: locale === 'ar' ? 'تسعير مخصص' : 'Custom solution',
      features: [
        locale === 'ar' ? 'كل الميزات' : 'All features',
        locale === 'ar' ? 'حساب تخصيص' : 'Account manager',
        locale === 'ar' ? 'تكامل API' : 'API integration',
      ],
      isPopular: false,
      ctaLabel: t('contactSales'),
      ctaVariant: 'secondary' as const,
    },
  ]

  const plansToShow = selectedType === 'seekers' ? seekersPlans : employersPlans

  return (
    <main className={`${isRTL ? 'rtl' : 'ltr'}`}>

      {/* Header */}
      <div className="bg-gradient-to-b from-[#E6F1FB] to-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-balance">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl text-balance">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <SubscriptionToggle selected={selectedType} onChange={setSelectedType} />
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plansToShow.map((plan, idx) => (
            <PricingCard
              key={idx}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              ctaLabel={plan.ctaLabel}
              ctaVariant={plan.ctaVariant}
            />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                {locale === 'ar'
                  ? 'هل يمكنني تغيير خطتي؟'
                  : 'Can I change my plan?'}
              </h3>
              <p className="text-gray-600">
                {locale === 'ar'
                  ? 'نعم، يمكنك الترقية أو التنزيل في أي وقت'
                  : 'Yes, you can upgrade or downgrade anytime'}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                {locale === 'ar' ? 'هل هناك فترة تجريبية؟' : 'Is there a free trial?'}
              </h3>
              <p className="text-gray-600">
                {locale === 'ar'
                  ? 'الخطة المجانية متاحة للجميع'
                  : 'Free plan available for everyone'}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                {locale === 'ar' ? 'كيف يعمل الفوترة؟' : 'How does billing work?'}
              </h3>
              <p className="text-gray-600">
                {locale === 'ar'
                  ? 'الفوترة شهرية وسهلة الإلغاء'
                  : 'Monthly billing, easy to cancel'}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                {locale === 'ar'
                  ? 'ماذا لو احتجت إلى مساعدة؟'
                  : 'What if I need help?'}
              </h3>
              <p className="text-gray-600">
                {locale === 'ar'
                  ? 'فريق الدعم متاح 24/7'
                  : 'Support team available 24/7'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
