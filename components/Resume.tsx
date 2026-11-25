'use client'

import { Download, ExternalLink, Github, Linkedin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { SectionHeader, Window } from '@/components/term'

const personalInfo = {
  name: 'Ayoub Goubraim',
  email: 'ayoub.goubraim@ecole.ensicaen.fr',
  phone: '+33 7 53 44 54 36',
  location: 'Caen, France',
  github: 'https://github.com/AyGoub',
  linkedin: 'https://linkedin.com/in/ayoubgoubraim',
}

const Resume = () => {
  const { t } = useLanguage()
  const cvPath = t('resume.cvFile')
  const cvName = cvPath.split('/').pop()

  const json: [string, string][] = [
    ['name', personalInfo.name],
    ['role', t('hero.subtitle')],
    ['email', personalInfo.email],
    ['phone', personalInfo.phone],
    ['location', personalInfo.location],
  ]

  const quick: [string, string][] = [
    [t('resume.experienceLevel'), t('resume.studentLabel')],
    [t('resume.specialization'), t('resume.cybersecurityLabel')],
    [t('resume.thmRank'), t('resume.top2Label')],
    [t('resume.availability'), t('resume.availabilityDate')],
  ]

  return (
    <section id="resume" className="py-20 bg-dark-800/40 border-t border-dark-700">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader cmd={`open ${cvName}`} title={t('resume.title')} lead={t('resume.subtitle')} />

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6 items-start">
            <Window
              title={`${cvName} — ${t('resume.preview')}`}
              right={
                <a href={cvPath} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary-400 hover:text-primary-300">
                  <ExternalLink className="w-3 h-3" />
                </a>
              }
              bodyClassName="bg-white"
            >
              <iframe
                src={`${cvPath}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                className="w-full h-[70vh] min-h-[520px] max-h-[860px] border-0 block"
                title={t('resume.cvPreviewTitle')}
              />
            </Window>

            <div className="space-y-5 lg:sticky lg:top-24">
              <Window title="whoami.json" bodyClassName="p-4 bg-[#050806] font-mono text-sm leading-6">
                <div className="text-gray-500">{'{'}</div>
                {json.map(([k, v], i) => (
                  <div key={k} className="pl-4 py-0.5 break-words">
                    <span className="text-sky-400">&quot;{k}&quot;</span>
                    <span className="text-gray-500">: </span>
                    <span className="text-amber-300">&quot;{v}&quot;</span>
                    {i < json.length - 1 && <span className="text-gray-500">,</span>}
                  </div>
                ))}
                <div className="text-gray-500">{'}'}</div>
              </Window>

              <div className="rounded-lg border border-dark-700 bg-dark-900/60 p-4">
                <h3 className="section-subtitle !text-lg mb-3">{t('resume.quickInfo')}</h3>
                <dl className="space-y-2 text-sm">
                  {quick.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-dark-400">{k}</dt>
                      <dd className="font-mono text-primary-400 text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="grid grid-cols-[1fr_auto_auto] gap-2">
                <a href={cvPath} download={t('resume.downloadFilename')} className="btn-primary">
                  <Download className="w-4 h-4" /> {t('resume.downloadBtn')}
                </a>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-3" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-3" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

              <div className="border-l-2 border-primary-500/50 pl-4">
                <p className="font-mono text-sm text-primary-400 mb-1">{'// '}{t('resume.ctaTitle')}</p>
                <p className="text-sm text-gray-400 mb-2">{t('resume.ctaDesc')}</p>
                <a href="#contact" className="font-mono text-sm text-primary-400 hover:text-primary-300">→ {t('resume.ctaBtn')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume
