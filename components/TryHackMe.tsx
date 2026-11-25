'use client'

import { ExternalLink } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Comment, SectionHeader, Window, difficultyClass } from '@/components/term'

const stats = {
  rank: 64461,
  totalRooms: 750,
  completedRooms: 119,
  totalPoints: 18000,
  streak: 118,
  badges: 21,
}

const learningPaths = [
  { title: 'Pre Security', rooms: 18, completed: 18, difficulty: 'Easy' },
  { title: 'Web Fundamentals', rooms: 28, completed: 28, difficulty: 'Easy' },
  { title: 'Cyber Security 101', rooms: 54, completed: 54, difficulty: 'Medium' },
  { title: 'Jr Penetration Tester', rooms: 39, completed: 39, difficulty: 'Medium' },
  { title: 'Web Application Pentesting', rooms: 29, completed: 4, difficulty: 'Medium' },
  { title: 'Red Teaming', rooms: 36, completed: 5, difficulty: 'Hard' },
]

const TryHackMe = () => {
  const { t, language } = useLanguage()
  const num = (n: number) => n.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US')

  const achievements = [
    { key: 'streak', value: `${stats.streak} ${t('ui.days')}` },
    { key: 'rooms', value: `${stats.completedRooms}` },
    { key: 'points', value: `${num(stats.totalPoints)}+` },
    { key: 'badges', value: `${stats.badges}` },
  ]

  return (
    <section id="tryhackme" className="py-20 bg-dark-800/40 border-t border-dark-700">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader cmd="thm --stats" title={t('tryhackme.title')} lead={t('tryhackme.subtitle')} />

          <div className="grid grid-cols-2 lg:grid-cols-4 rounded-lg border border-dark-700 bg-dark-900/60 divide-dark-700 [&>*]:border-dark-700 mb-8">
            {achievements.map((a, i) => (
              <div key={a.key} className={`p-5 ${i % 2 ? 'border-l' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}>
                <div className="font-mono text-2xl md:text-3xl font-bold text-white">{a.value}</div>
                <div className="font-mono text-sm text-primary-400 mt-1">{t(`tryhackme.achievements.${a.key}.title`)}</div>
                <div className="text-xs text-dark-400">{t(`tryhackme.achievements.${a.key}.description`)}</div>
              </div>
            ))}
          </div>

          <Window
            title="thm --paths"
            right={
              <a href="https://tryhackme.com/p/AyGoub" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary-400 hover:text-primary-300">
                {t('tryhackme.viewProfile')} <ExternalLink className="w-3 h-3" />
              </a>
            }
            bodyClassName="p-5 space-y-4 bg-[#050806]"
          >
            <h3 className="section-subtitle !text-lg">{t('tryhackme.pathsTitle')}</h3>
            {learningPaths.map(path => {
              const pct = Math.round((path.completed / path.rooms) * 100)
              const done = path.completed === path.rooms
              return (
                <div key={path.title} className="grid sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] gap-x-4 gap-y-1.5 items-center font-mono text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-gray-200 truncate">{path.title}</span>
                    <span className={`text-[10px] font-bold px-1.5 rounded ${difficultyClass(path.difficulty)}`}>
                      {t(`tryhackme.difficulty.${path.difficulty}`).toUpperCase()}
                    </span>
                  </div>
                  <div className="h-3 rounded-sm bg-dark-700 overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={path.title}>
                    <div
                      className={`h-full ${done ? 'bg-primary-500' : 'bg-amber-400'}`}
                      style={{
                        width: `${pct}%`,
                        backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 9px, rgba(5,8,6,.55) 9px 11px)',
                      }}
                    />
                  </div>
                  <span className={`whitespace-nowrap ${done ? 'text-primary-400' : 'text-amber-300'}`}>
                    {path.completed}/{path.rooms} {t('tryhackme.rooms')} · {pct}%
                  </span>
                </div>
              )
            })}
          </Window>

          <Comment title={t('tryhackme.philosophyTitle')}>{t('tryhackme.philosophy')}</Comment>
        </div>
      </div>
    </section>
  )
}

export default TryHackMe
