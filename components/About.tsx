'use client'

import { Shield, Target, BookOpen, Users, Award, Zap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { SectionHeader, Window } from '@/components/term'

const interests = [
  { icon: Shield, key: 'pentest' },
  { icon: Target, key: 'redTeam' },
  { icon: BookOpen, key: 'research' },
  { icon: Users, key: 'community' },
  { icon: Award, key: 'certifications' },
  { icon: Zap, key: 'innovation' },
]

const About = () => {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 bg-dark-800/40 border-t border-dark-700">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader cmd="cat about.md" title={t('about.title')} lead={t('about.subtitle')} />

          <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-8 items-start">
            <Window title="about.md" bodyClassName="p-6 space-y-6">
              <p className="text-gray-200 text-lg leading-relaxed">{t('about.intro')}</p>
              <div className="space-y-3">
                <h3 className="section-subtitle !text-xl">{t('about.journeyTitle')}</h3>
                <p className="text-gray-400 leading-relaxed">{t('about.journey1')}</p>
                <p className="text-gray-400 leading-relaxed">{t('about.journey2')}</p>
              </div>
              <div className="space-y-3">
                <h3 className="section-subtitle !text-xl">{t('about.goalsTitle')}</h3>
                <p className="text-gray-400 leading-relaxed">{t('about.goals')}</p>
              </div>
            </Window>

            <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-3">
              {interests.map(({ icon: Icon, key }) => (
                <div key={key} className="rounded-lg border border-dark-700 bg-dark-900/60 p-4 hover:border-primary-500 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-primary-400 shrink-0" />
                    <h4 className="font-mono font-bold text-white text-sm">{t(`about.interests.${key}.title`)}</h4>
                  </div>
                  <p className="text-sm text-gray-400">{t(`about.interests.${key}.description`)}</p>
                </div>
              ))}
            </div>
            <div className="!mt-8 border-l-2 border-primary-500/50 pl-5 py-1">
              <p className="font-mono text-sm text-primary-400 mb-2">{'// '}{t('about.funFactTitle')}</p>
              <p className="text-gray-400 leading-relaxed">{t('about.funFact')}</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
