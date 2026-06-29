'use client'

import { useLocale } from '@/lib/locale-context'

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
    <div className={`flex items-center justify-between mb-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-center flex-1">
          {/* Step circle */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
              idx < currentStep
                ? 'bg-[#3B6D11] text-white'
                : idx === currentStep
                  ? 'bg-[#185FA5] text-white'
                  : 'bg-gray-200 text-gray-600'
            }`}
          >
            {idx + 1}
          </div>

          {/* Step label */}
          <div className="ml-3 flex-1">
            <p
              className={`text-sm font-medium ${
                idx <= currentStep ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              {step}
            </p>
          </div>

          {/* Connector line */}
          {idx < steps.length - 1 && (
            <div
              className={`h-1 flex-1 rounded-full transition-all ${
                idx < currentStep ? 'bg-[#3B6D11]' : 'bg-gray-200'
              } ${isRTL ? 'mx-2' : 'mx-2'}`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
