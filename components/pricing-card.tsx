'use client'

import { Check } from 'lucide-react'
import { useLocale } from '@/lib/locale-context'

interface PricingCardProps {
  name: string
  price: number | string
  description: string
  features: string[]
  isPopular?: boolean
  ctaLabel: string
  ctaVariant?: 'primary' | 'secondary'
}

export function PricingCard({
  name,
  price,
  description,
  features,
  isPopular = false,
  ctaLabel,
  ctaVariant = 'secondary',
}: PricingCardProps) {
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
    <div
      className={`relative bg-white rounded-xl border-2 transition-all h-full flex flex-col ${
        isPopular
          ? 'border-[#185FA5] shadow-lg scale-105'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Badge */}
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-[#185FA5] text-white px-4 py-1 rounded-full text-sm font-semibold">
            {locale === 'ar' ? 'الأكثر شهرة' : 'Most Popular'}
          </div>
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-6">{description}</p>

        {/* Price */}
        <div className="mb-6">
          {typeof price === 'number' ? (
            <div>
              <span className="text-4xl font-bold text-gray-900">{price}</span>
              <span className="text-gray-600 ml-2">{locale === 'ar' ? 'ج.م / شهر' : 'EGP/mo'}</span>
            </div>
          ) : (
            <div className="text-2xl font-bold text-gray-900">{price}</div>
          )}
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8 flex-1">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#3B6D11] flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            ctaVariant === 'primary'
              ? 'bg-[#185FA5] text-white hover:bg-[#0d3f7a]'
              : 'bg-gray-100 text-[#185FA5] hover:bg-gray-200'
          }`}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  )
}
