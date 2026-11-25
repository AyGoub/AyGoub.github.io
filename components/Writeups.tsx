'use client'

import { useState } from 'react'
import { ExternalLink, Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { sortedWriteups } from '@/data/writeups'
import { Comment, SectionHeader, Tag, difficultyClass } from '@/components/term'

const FILTERS: { flag: string; category: string | null }[] = [
  { flag: '--all', category: null },
  { flag: '--web', category: 'Web Exploitation' },
  { flag: '--privesc', category: 'Privilege Escalation' },
  { flag: '--active-directory', category: 'Active Directory' },
]

const platform = (tags: string[]) =>
  tags.includes('picoCTF') ? 'picoCTF' : tags.includes('TryHackMe') ? 'TryHackMe' : 'CTF'

const Writeups = () => {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<string | null>(null)

  const list = sortedWriteups.filter(w => !filter || w.category === filter)

  return (
    <section id="writeups" className="py-20 bg-dark-900 border-t border-dark-700">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader cmd="ls ~/writeups --sort=date" title={t('writeups.title')} lead={t('writeups.subtitle')} />

          {/* Filters as command flags */}
          <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-sm" role="group" aria-label="Filter">
            <span className="text-dark-500 mr-1">ls ./writeups</span>
            {FILTERS.map(f => {
              const count = sortedWriteups.filter(w => !f.category || w.category === f.category).length
              const on = filter === f.category
              return (
                <button
                  key={f.flag}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.category)}
                  className={`px-3 py-1.5 rounded border transition-colors ${
                    on
                      ? 'bg-primary-500 border-primary-500 text-dark-900 font-bold'
                      : 'border-dark-600 text-gray-400 hover:border-primary-500 hover:text-primary-400'
                  }`}
                >
                  {f.flag} <span className={on ? 'text-dark-800' : 'text-dark-500'}>{count}</span>
                </button>
              )
            })}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {list.map(w => (
              <article
                key={w.key}
                className="group flex flex-col gap-3 rounded-lg border border-dark-700 bg-dark-800/70 p-4 hover:border-primary-500 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 font-mono text-xs text-dark-400">
                  <span className="flex items-center gap-1.5">
                    {w.featured && <Star size={12} className="text-amber-300 fill-amber-300" aria-label={t('writeups.featuredLabel')} />}
                    {platform(w.tags)} · {w.date.slice(0, 7)}
                  </span>
                  <span className={`font-bold px-1.5 py-0.5 rounded ${difficultyClass(w.difficulty)}`}>
                    {t(`writeups.difficulty.${w.difficulty}`).toUpperCase()}
                  </span>
                </div>

                <h3 className="font-mono font-bold text-white leading-snug">
                  {w.title.replace(/ - (TryHackMe|picoCTF)$/, '')}
                </h3>

                <p className="text-sm text-gray-400 line-clamp-3">{t(`writeupsData.${w.key}`)}</p>

                <div className="flex flex-wrap gap-1.5">
                  {w.tags
                    .filter(tag => tag !== 'TryHackMe' && tag !== 'picoCTF')
                    .slice(0, 4)
                    .map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                </div>

                <a
                  href={w.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto pt-1 inline-flex items-center gap-1.5 font-mono text-sm text-primary-400 hover:text-primary-300"
                >
                  → {t('writeups.readWriteup').toLowerCase()}.pdf <ExternalLink size={13} />
                </a>
              </article>
            ))}
          </div>

          <Comment title={t('writeups.philosophyTitle')}>{t('writeups.philosophy')}</Comment>
        </div>
      </div>
    </section>
  )
}

export default Writeups
