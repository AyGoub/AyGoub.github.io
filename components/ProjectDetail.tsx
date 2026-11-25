'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  Github,
  ExternalLink,
  CheckCircle,
  Target,
  Lightbulb,
  TrendingUp,
  X,
  ZoomIn,
  FileText,
  Star,
} from 'lucide-react'
import { Project } from '@/data/projects'
import ReactMarkdown from 'react-markdown'
import { useLanguage } from '@/contexts/LanguageContext'
import translations from '@/locales/translations'
import { PromptLine, Tag, Window } from '@/components/term'

const FR_MONTHS: Record<string, string> = {
  January: 'janvier', February: 'février', March: 'mars', April: 'avril', May: 'mai', June: 'juin',
  July: 'juillet', August: 'août', September: 'septembre', October: 'octobre', November: 'novembre', December: 'décembre',
}

// Durations are stored in English in data/projects.ts ("Completed (May 2025)", "3 months")
const localizeDuration = (d: string, lang: string) =>
  lang !== 'fr'
    ? d
    : d
        .replace('Completed', 'Terminé')
        .replace(/\bmonths?\b/, 'mois')
        .replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/, m => FR_MONTHS[m])

interface ProjectDetailProps {
  project: Project
}

const ProjectDetailClient = ({ project }: ProjectDetailProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { t, language, setLanguage } = useLanguage()
  const tr = translations[language] as typeof translations['en']
  const challenges = (tr.projectChallenges as Record<string, string[]>)[project.slug] ?? project.challenges ?? []
  const solutions = (tr.projectSolutions as Record<string, string[]>)[project.slug] ?? project.solutions ?? []
  const outcomes = (tr.projectOutcomes as Record<string, string[]>)[project.slug] ?? project.outcomes ?? []

  const placeholder = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="#0f1712" width="400" height="300"/><text fill="#5f7a64" font-family="monospace" font-size="16" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">${t('ui.imageSoon')}</text></svg>`
  )}`

  const panels: { key: string; title: string; icon: typeof Target; color: string; items: string[] }[] = [
    { key: 'challenges', title: t('projectDetail.challenges'), icon: Target, color: 'text-red-400', items: challenges },
    { key: 'solutions', title: t('projectDetail.solutions'), icon: Lightbulb, color: 'text-amber-300', items: solutions },
    { key: 'outcomes', title: t('projectDetail.outcomes'), icon: TrendingUp, color: 'text-primary-400', items: outcomes },
  ].filter(p => p.items.length > 0)

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-dark-900/95 backdrop-blur border-b border-dark-700">
        <div className="container mx-auto px-4 max-w-6xl py-3 flex items-center justify-between gap-4">
          <Link href="/#projects" className="font-mono text-sm flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline text-primary-400 font-bold">ayoub@kali</span>
            <span>cd ../projects</span>
          </Link>
          <div className="flex items-center border border-dark-600 rounded overflow-hidden text-xs font-mono">
            {(['en', 'fr'] as const).map(l => (
              <button
                key={l}
                type="button"
                onClick={() => setLanguage(l)}
                aria-pressed={language === l}
                className={`px-3 py-1 transition-colors ${language === l ? 'bg-primary-500 text-dark-900' : 'text-gray-400 hover:text-primary-400'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-6xl pt-10 pb-20">
        {/* Image Modal */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label={t('ui.close')}
              className="absolute top-4 right-4 text-white hover:text-primary-400 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt={t('ui.imagePreview')}
              className="max-w-full max-h-full object-contain"
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}

        {/* Project Header */}
        <div className="mb-10">
          <PromptLine path={`~/projects/${project.slug}`} cmd="cat README.md" />
          <h1 className="section-title mt-3 mb-4">{project.title}</h1>
          <p className="text-lg text-gray-400 mb-6 max-w-4xl">{t(`projectDescriptions.${project.slug}`)}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm text-dark-400">
            <span className="tag !text-xs">{t(`projectCategories.${project.category.trim()}`)}</span>
            {project.featured && (
              <span className="flex items-center gap-1.5 text-amber-300">
                <Star className="w-4 h-4 fill-amber-300" /> {t('projectDetail.featured')}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary-400" /> {project.date}
            </span>
            {project.duration && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary-400" /> {localizeDuration(project.duration, language)}
              </span>
            )}
            {project.teamSize && (
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary-400" /> {project.teamSize}{' '}
                {project.teamSize > 1 ? t('projectDetail.members') : t('projectDetail.member')}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <ExternalLink className="w-4 h-4" /> {t('projectDetail.viewDemo')}
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Github className="w-4 h-4" /> {t('projectDetail.viewCode')}
              </a>
            )}
            {project.report && (
              <a href={project.report} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <FileText className="w-4 h-4" /> {t('projectDetail.viewReport')}
              </a>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-10">
          <h2 className="section-subtitle !text-xl mb-4">{t('projectDetail.technologies')}</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </div>

        {/* Images */}
        {project.images && project.images.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {project.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className="relative aspect-video bg-dark-800 rounded-lg overflow-hidden border border-dark-700 hover:border-primary-500 transition-colors group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={`${project.title} — ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={e => {
                    e.currentTarget.src = placeholder
                  }}
                />
                <span className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="w-10 h-10 text-white" />
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Long description */}
        <Window title="README.md" className="mb-10" bodyClassName="p-6 md:p-8">
          <div className="max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h2 className="font-mono text-2xl font-bold text-white mb-5"><span className="text-primary-400"># </span>{children}</h2>,
                h2: ({ children }) => <h3 className="font-mono text-xl font-bold text-white mb-4 mt-8"><span className="text-primary-400">## </span>{children}</h3>,
                h3: ({ children }) => <h4 className="font-mono text-lg font-bold text-white mb-3 mt-6"><span className="text-primary-400">### </span>{children}</h4>,
                p: ({ children }) => <p className="text-gray-400 mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-5 marker:text-primary-500 text-gray-400 mb-4 space-y-1.5">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-5 marker:text-primary-500 text-gray-400 mb-4 space-y-1.5">{children}</ol>,
                li: ({ children }) => <li className="text-gray-400">{children}</li>,
                strong: ({ children }) => <strong className="text-gray-200 font-semibold">{children}</strong>,
                code: ({ children }) => <code className="bg-dark-900 px-1.5 py-0.5 rounded text-primary-300 font-mono text-[0.9em]">{children}</code>,
                a: ({ children, href }) => <a href={href} className="text-sky-400 underline underline-offset-4" target="_blank" rel="noopener noreferrer">{children}</a>,
              }}
            >
              {(language === 'fr' && project.longDescriptionFr ? project.longDescriptionFr : project.longDescription).replace(/(?:[\uD83C-\uD83E][\uDC00-\uDFFF]|[\u2600-\u27BF])\uFE0F?\s*/g, '')}
            </ReactMarkdown>
          </div>
        </Window>

        {/* Challenges, solutions, outcomes */}
        {panels.length > 0 && (
          <div className={`grid gap-4 mb-12 ${panels.length === 3 ? 'md:grid-cols-3' : panels.length === 2 ? 'md:grid-cols-2' : ''}`}>
            {panels.map(panel => (
              <Window key={panel.key} title={`${panel.key}.log`} bodyClassName="p-5">
                <h3 className="font-mono font-bold text-white mb-4 flex items-center gap-2">
                  <panel.icon className={`w-5 h-5 ${panel.color}`} /> {panel.title}
                </h3>
                <ul className="space-y-3">
                  {panel.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-400 leading-relaxed">
                      {panel.key === 'outcomes' ? (
                        <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                      ) : (
                        <span className={`font-mono ${panel.color} shrink-0`}>{panel.key === 'challenges' ? '[!]' : '[+]'}</span>
                      )}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Window>
            ))}
          </div>
        )}

        <Link href="/#projects" className="btn-ghost">
          <ArrowLeft className="w-4 h-4" /> {t('projectDetail.backToAll')}
        </Link>
      </div>
    </div>
  )
}

export default ProjectDetailClient
