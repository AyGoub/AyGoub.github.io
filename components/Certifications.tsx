'use client'

import { CheckCircle, Download, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { SectionHeader, Tag } from '@/components/term'

const Certifications = () => {
  const { t } = useLanguage()

  const certifications = [
    {
      id: 1,
      name: "TryHackMe – Pre Security",
      issuer: "TryHackMe",
      status: "completed",
      date: "2025",
      badge: null,
      credential: "/certifications/THM-2VA9D29GVH.pdf",
      description: "Official TryHackMe certificate",
      skills: ["Hands-on Labs", "Problem Solving", "Security Fundamentals"]
    },
    {
      id: 2,
      name: "TryHackMe – Jr Penetration Tester",
      issuer: "TryHackMe",
      status: "completed",
      date: "2025",
      badge: null,
      credential: "/certifications/THM-D1HNOAGTNF.pdf",
      description: "Official TryHackMe certificate",
      skills: ["Penetration Testing", "Linux", "Networking"]
    },
    {
      id: 3,
      name: "TryHackMe – Web Fundamentals",
      issuer: "TryHackMe",
      status: "completed",
      date: "2025",
      badge: null,
      credential: "/certifications/THM-IO0ENMJOKE.pdf",
      description: "Official TryHackMe certificate",
      skills: ["Web Security", "Enumeration", "Exploitation"]
    },
    {
      id: 4,
      name: "TryHackMe – Cyber Security 101",
      issuer: "TryHackMe",
      status: "completed",
      date: "2025",
      badge: null,
      credential: "/certifications/THM-UIEHN9AGLM.pdf",
      description: "Official TryHackMe certificate",
      skills: ["Recon", "Privilege Escalation", "Reporting"]
    }
  ]

  // Skill tags are stored in English; use the translation when there is one
  const skillLabel = (skill: string) => {
    const key = `certSkills.${skill}`
    const v = t(key)
    return v === key ? skill : v
  }

  const completed = certifications.filter(c => c.status === 'completed').length

  return (
    <section id="certifications" className="py-20 bg-dark-800/40 border-t border-dark-700">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader cmd="ls -l ~/certs" title={t('certifications.title')} lead={t('certifications.subtitle')} />

          <p className="font-mono text-sm text-dark-400 mb-3">
            total {certifications.length} · <span className="text-primary-400">{completed} {t('ui.certsCompleted')}</span> · TryHackMe Top 2%
          </p>

          <ul className="rounded-lg border border-dark-700 divide-y divide-dark-700 bg-dark-900/60">
            {certifications.map(cert => (
              <li key={cert.id} className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] gap-3 md:gap-6 items-center p-4 hover:bg-dark-800/60 transition-colors">
                <div className="flex items-start gap-3 min-w-0">
                  <CheckCircle className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <h3 className="font-mono font-bold text-white">{cert.name}</h3>
                    <p className="text-sm text-dark-400">
                      {cert.issuer} · {cert.date} · {t(`certifications.status.${cert.status}`)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map(skill => (
                    <Tag key={skill}>{skillLabel(skill)}</Tag>
                  ))}
                </div>
                {cert.credential && (
                  <div className="flex gap-2">
                    <a href={cert.credential} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-3 !py-1.5 text-sm">
                      <ExternalLink className="w-4 h-4" /> {t('certifications.viewPdf')}
                    </a>
                    <a href={cert.credential} download className="btn-ghost !px-3 !py-1.5 text-sm" aria-label={t('certifications.download')}>
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Certifications
