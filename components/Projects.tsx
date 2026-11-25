'use client'

import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { projects } from '@/data/projects'
import { useLanguage } from '@/contexts/LanguageContext'
import { Comment, SectionHeader, Tag } from '@/components/term'

const Projects = () => {
  const { t } = useLanguage()
  const featured = projects.filter(p => p.featured)
  const category = (c: string) => t(`projectCategories.${c.trim()}`)

  return (
    <section id="projects" className="py-20 bg-dark-900 border-t border-dark-700">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader cmd="ls -la ~/projects" title={t('projects.title')} lead={t('projects.subtitle')} />

          {/* Featured */}
          <h3 className="section-subtitle !text-xl mb-5">{t('projects.featured')}</h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-14">
            {featured.map(project => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col gap-3 rounded-lg border border-dark-700 bg-dark-800/70 p-5 hover:border-primary-500 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 font-mono text-xs text-dark-400">
                  <span className="truncate">~/projects/{project.slug}</span>
                  <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
                </div>
                <h4 className="font-mono font-bold text-white leading-snug group-hover:text-primary-300 transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-400 line-clamp-3">{t(`projectDescriptions.${project.slug}`)}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map(tech => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                  {project.technologies.length > 4 && <span className="font-mono text-[11px] text-dark-500">+{project.technologies.length - 4}</span>}
                </div>
                <div className="mt-auto pt-2 flex items-center justify-between font-mono text-sm">
                  <span className="text-dark-400 truncate mr-3">{category(project.category)} · {project.date}</span>
                  <span className="flex items-center gap-1 text-primary-400 shrink-0">
                    {t('projects.learnMore')} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Everything, as a directory listing */}
          <h3 className="section-subtitle !text-xl mb-5">
            {t('projects.all')} <span className="text-dark-500 font-normal">({projects.length})</span>
          </h3>
          <div className="rounded-lg border border-dark-700 bg-[#050806] font-mono text-sm overflow-x-auto">
            <table className="w-full">
              <tbody>
                {projects.map(project => (
                  <tr key={project.slug} className="border-b border-dark-800 last:border-0 hover:bg-dark-800/70 transition-colors">
                    <td className="pl-4 pr-3 py-2.5 text-dark-500 whitespace-nowrap hidden md:table-cell">drwxr-xr-x</td>
                    <td className="px-3 py-2.5 text-dark-400 whitespace-nowrap">{project.date}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <Link href={`/projects/${project.slug}`} className="text-primary-400 font-bold hover:underline underline-offset-4">
                        {project.slug}/
                      </Link>
                    </td>
                    <td className="px-3 py-2.5 text-gray-400 hidden lg:table-cell">
                      <span className="line-clamp-1">{project.title}</span>
                    </td>
                    <td className="pl-3 pr-4 py-2.5 text-dark-400 whitespace-nowrap hidden sm:table-cell text-right">{category(project.category)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Comment title={t('projects.philosophyTitle')}>{t('projects.philosophy')}</Comment>
        </div>
      </div>
    </section>
  )
}

export default Projects
