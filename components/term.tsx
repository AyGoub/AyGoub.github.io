import { ReactNode } from 'react'

/* Shared building blocks for the terminal look used by every section. */

export function PromptLine({ path = '~', cmd }: { path?: string; cmd: string }) {
  return (
    <p className="font-mono text-sm text-dark-400">
      <span className="text-primary-400">visitor@aygoub</span>
      <span className="text-dark-500">:</span>
      <span className="text-sky-400">{path}</span>
      <span className="text-dark-500">$ </span>
      <span className="text-gray-300">{cmd}</span>
    </p>
  )
}

/** Section heading: the shell command that "produced" the section, then the title. */
export function SectionHeader({ cmd, path, title, lead }: { cmd: string; path?: string; title: string; lead?: string }) {
  return (
    <header className="mb-10">
      <PromptLine path={path} cmd={cmd} />
      <h2 className="section-title mt-2">{title}</h2>
      {lead && <p className="section-lead mt-3">{lead}</p>}
    </header>
  )
}

/** A terminal window frame with traffic lights and a title. */
export function Window({
  title,
  children,
  className = '',
  bodyClassName = 'p-5',
  right,
}: {
  title: string
  children: ReactNode
  className?: string
  bodyClassName?: string
  right?: ReactNode
}) {
  return (
    <div className={`min-w-0 rounded-lg border border-dark-700 bg-dark-800/70 overflow-hidden ${className}`}>
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-dark-700 bg-dark-800 font-mono text-xs text-dark-400">
        <span className="w-2.5 h-2.5 rounded-full bg-dark-600" />
        <span className="w-2.5 h-2.5 rounded-full bg-dark-600" />
        <span className="w-2.5 h-2.5 rounded-full bg-dark-600" />
        <span className="ml-2 truncate">{title}</span>
        {right && <span className="ml-auto shrink-0">{right}</span>}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}

/** A code-comment block for the "philosophy" style paragraphs. */
export function Comment({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="mt-12 border-l-2 border-primary-500/50 pl-5 py-1 max-w-4xl">
      <p className="font-mono text-sm text-primary-400 mb-2">{'// '}{title}</p>
      <div className="text-gray-400 leading-relaxed">{children}</div>
    </aside>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>
}

export const difficultyClass = (d: string) =>
  d === 'Hard'
    ? 'bg-red-900/70 text-red-300'
    : d === 'Medium'
    ? 'bg-amber-900/70 text-amber-300'
    : 'bg-green-900/70 text-green-300'
