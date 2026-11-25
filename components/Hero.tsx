'use client'

import Image from 'next/image'
import { ArrowDown, Download, Mail } from 'lucide-react'
import Terminal from '@/components/Terminal'
import { useLanguage } from '@/contexts/LanguageContext'
import { projects } from '@/data/projects'
import { writeups } from '@/data/writeups'

const Hero = () => {
  const { t, language } = useLanguage()
  const fr = language === 'fr'

  const facts = [
    ['Top 2%', 'TryHackMe'],
    [String(writeups.length), 'writeups'],
    [String(projects.length), fr ? 'projets' : 'projects'],
  ]

  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-16 lg:pt-28 lg:min-h-screen lg:flex lg:items-center">
      {/* faint grid + scanlines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,222,128,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 40% 40%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 40% 40%, black 30%, transparent 75%)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <h1 className="sr-only">Ayoub Goubraim — {t('hero.subtitle')}</h1>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
          <Terminal />

          {/* ID card */}
          <aside className="flex flex-col gap-4 font-mono">
            <div className="relative rounded-xl overflow-hidden border border-dark-600 bg-[#050806] aspect-[4/3] lg:aspect-square">
              <Image
                src="/profile-picture.jpg"
                alt="Ayoub Goubraim"
                fill
                priority
                sizes="(min-width: 1024px) 400px, 100vw"
                className="object-cover object-top grayscale contrast-110 opacity-90"
              />
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-multiply"
                style={{ background: 'linear-gradient(rgba(74,222,128,.35), rgba(74,222,128,.25))' }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,.25) 0 1px, transparent 1px 3px)' }}
              />
              <span className="absolute left-3 bottom-3 text-xs bg-black/70 text-primary-400 px-2 py-0.5 rounded">
                target: ayoub.jpg
              </span>
              <span className="absolute right-3 top-3 flex items-center gap-2 text-xs bg-black/70 text-primary-300 px-2 py-1 rounded">
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                {fr ? 'Dispo stage · sept. 2026' : 'Open to internship · Sept 2026'}
              </span>
            </div>

            <div className="grid grid-cols-3 rounded-xl border border-dark-600 divide-x divide-dark-600 bg-dark-800/60">
              {facts.map(([v, l]) => (
                <div key={l} className="p-3">
                  <div className="text-xl font-bold text-white">{v}</div>
                  <div className="text-xs text-gray-500">{l}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={t('resume.cvFile')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary-500 text-dark-900 font-bold hover:bg-primary-400 transition-colors"
              >
                <Download size={16} /> cv.pdf
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-primary-500 text-primary-400 hover:bg-primary-500/10 transition-colors"
              >
                <Mail size={16} /> contact
              </a>
            </div>
          </aside>
        </div>

        <a
          href="#about"
          aria-label={fr ? 'Défiler vers la suite' : 'Scroll down'}
          className="hidden lg:flex mt-10 mx-auto w-fit items-center gap-2 font-mono text-sm text-gray-500 hover:text-primary-400 transition-colors"
        >
          <ArrowDown size={16} /> cd ./about
        </a>
      </div>
    </section>
  )
}

export default Hero
