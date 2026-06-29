'use client'

import { useLocale, useTranslations } from '@/lib/locale-context'
import { FeaturedStoryCard } from '@/components/featured-story-card'
import { StoryCard } from '@/components/story-card'

const mockStories = {
  ar: {
    featured: {
      quote: 'لم أتخيل أن أجد وظيفة احترافية تناسب طموحاتي في مثل هذا الوقت القصير',
      name: 'أحمد محمود',
      jobTitle: 'مهندس برمجيات أول',
      company: 'شركة تكنولوجيا مصرية',
      story: 'بدأت أحمد رحلته كمتدرب في شركة صغيرة، حيث اكتسب خبرة قيمة في تطوير التطبيقات. عندما بدأ البحث عن وظيفة أفضل، استخدم منصة فرصة مصر ووجد الفرصة المثالية. اليوم، هو يقود فريقاً من المهندسين ويساهم في مشاريع تؤثر على حياة الملايين.',
    },
    stories: [
      {
        name: 'فاطمة علي',
        beforeJob: 'موظفة دعم العملاء',
        afterJob: 'مدير المنتج',
        quote: 'تحسين مهاراتي المهنية ساعدني في الانتقال إلى دور قيادي',
        initial: 'ف',
      },
      {
        name: 'محمد سالم',
        beforeJob: 'مصمم جرافيك بدوام جزئي',
        afterJob: 'مدير التصميم',
        quote: 'المثابرة والشبكات المهنية فتحت أبواباً جديدة لي',
        initial: 'م',
      },
      {
        name: 'ليلى حسن',
        beforeJob: 'محررة محتوى',
        afterJob: 'رئيسة قسم المحتوى',
        quote: 'اكتشفت شغفي الحقيقي وأنا أعمل مع فريق موهوب',
        initial: 'ل',
      },
      {
        name: 'عمرو إبراهيم',
        beforeJob: 'محلل بيانات مبتدئ',
        afterJob: 'متخصص بيانات أول',
        quote: 'التطور المستمر والتعلم جعلني أصل إلى أحلامي',
        initial: 'ع',
      },
      {
        name: 'سارة عبدالرحمن',
        beforeJob: 'موظفة إدارية',
        afterJob: 'مسؤولة الموارد البشرية',
        quote: 'الفرصة الصحيحة جعلت كل الفرق في حياتي المهنية',
        initial: 'س',
      },
    ],
  },
  en: {
    featured: {
      quote: 'I never thought I would land a professional role that matched my ambitions in such a short time',
      name: 'Ahmed Mahmoud',
      jobTitle: 'Senior Software Engineer',
      company: 'Egyptian Tech Company',
      story: 'Ahmed started his journey as an intern at a small startup, where he gained valuable experience in app development. When he began looking for a better opportunity, he discovered Fursa Egypt and found the perfect role. Today, he leads a team of engineers and contributes to projects that impact millions of lives.',
    },
    stories: [
      {
        name: 'Fatima Ali',
        beforeJob: 'Customer Support Associate',
        afterJob: 'Product Manager',
        quote: 'Improving my professional skills helped me transition to a leadership role',
        initial: 'F',
      },
      {
        name: 'Mohamed Salem',
        beforeJob: 'Freelance Graphic Designer',
        afterJob: 'Design Manager',
        quote: 'Persistence and networking opened new doors for me in my career',
        initial: 'M',
      },
      {
        name: 'Layla Hassan',
        beforeJob: 'Content Editor',
        afterJob: 'Head of Content',
        quote: 'I discovered my true passion while working with a talented team',
        initial: 'L',
      },
      {
        name: 'Amr Ibrahim',
        beforeJob: 'Junior Data Analyst',
        afterJob: 'Senior Data Specialist',
        quote: 'Continuous growth and learning helped me reach my goals',
        initial: 'A',
      },
      {
        name: 'Sarah Abdulrahman',
        beforeJob: 'Administrative Officer',
        afterJob: 'HR Manager',
        quote: 'The right opportunity made all the difference in my career',
        initial: 'S',
      },
    ],
  },
}

export default function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = useLocale()
  const t = useTranslations('stories')
  const isRTL = locale === 'ar'

  const data = mockStories[locale as keyof typeof mockStories]

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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Story */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#185FA5] rounded"></span>
            {t('featured')}
          </h2>
          <FeaturedStoryCard
            quote={data.featured.quote}
            name={data.featured.name}
            jobTitle={data.featured.jobTitle}
            company={data.featured.company}
            story={data.featured.story}
          />
        </div>

        {/* Stories Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#185FA5] rounded"></span>
            {locale === 'ar' ? 'المزيد من القصص' : 'More Stories'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.stories.map((story, idx) => (
              <StoryCard
                key={idx}
                name={story.name}
                beforeJob={story.beforeJob}
                afterJob={story.afterJob}
                quote={story.quote}
                initial={story.initial}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
