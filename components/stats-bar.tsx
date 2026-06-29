'use client'

interface StatCard {
  value: string
  label: string
  textColor: string
}

interface StatsBarProps {
  stats: StatCard[]
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 -mt-20 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              <div className={`text-3xl sm:text-4xl font-bold ${stat.textColor}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-2 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
