'use client'

import { ArrowUp } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const links = ['about', 'skills', 'projects', 'tryhackme', 'writeups', 'resume'] as const

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#050806] border-t border-dark-700">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-8 mb-10">
            <div>
              <p className="font-mono text-lg mb-3">
                <span className="text-primary-400 font-bold">ayoub@kali</span>
                <span className="text-gray-500">:~$ exit</span>
              </p>
              <p className="text-gray-400 leading-relaxed max-w-md">{t('footer.desc')}</p>
            </div>

            <nav aria-label={t('footer.quickLinks')}>
              <h3 className="font-mono text-sm text-dark-400 mb-3"># {t('footer.quickLinks')}</h3>
              <ul className="grid grid-cols-2 gap-y-1.5 font-mono text-sm">
                {links.map(id => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-gray-400 hover:text-primary-400 transition-colors">
                      <span className="text-dark-500">./</span>
                      {t(`nav.${id}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="font-mono text-sm text-dark-400 mb-3"># {t('footer.getInTouch')}</h3>
              <div className="space-y-1.5 text-sm text-gray-400">
                <a href="mailto:ayoub.goubraim@ecole.ensicaen.fr" className="block font-mono text-sky-400 hover:text-sky-300 break-all">
                  ayoub.goubraim@ecole.ensicaen.fr
                </a>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-400" /> {t('footer.available')}
                </p>
                <p className="font-mono">{t('footer.availableDate')}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-dark-700 pt-6 flex flex-col md:flex-row gap-4 justify-between items-center font-mono text-xs text-dark-500">
            <p>
              {t('ui.madeWith')} <span className="text-primary-400">&lt;3</span> {t('ui.by')} · {t('footer.copyright')}
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
            >
              <ArrowUp className="w-4 h-4" /> cd ~ · {t('footer.backToTop')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
