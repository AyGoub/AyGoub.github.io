'use client'

import { useCallback, useEffect, useRef, useState, KeyboardEvent, ReactNode } from 'react'
import { projects } from '@/data/projects'
import { sortedWriteups } from '@/data/writeups'
import { useLanguage, translate } from '@/contexts/LanguageContext'
import type { Language } from '@/locales/translations'

/* ------------------------------------------------------------------ */
/* Static data shown by the terminal                                   */
/* ------------------------------------------------------------------ */

const THM = {
  rank: '64 461',
  rooms: 119,
  streak: 118,
  badges: 21,
  paths: [
    ['Pre Security', 18, 18],
    ['Web Fundamentals', 28, 28],
    ['Cyber Security 101', 54, 54],
    ['Jr Penetration Tester', 39, 39],
    ['Web Application Pentesting', 4, 29],
    ['Red Teaming', 5, 36],
  ] as [string, number, number][],
}

const CERTS = [
  ['TryHackMe – Pre Security', '/certifications/THM-2VA9D29GVH.pdf'],
  ['TryHackMe – Jr Penetration Tester', '/certifications/THM-D1HNOAGTNF.pdf'],
  ['TryHackMe – Web Fundamentals', '/certifications/THM-IO0ENMJOKE.pdf'],
  ['TryHackMe – Cyber Security 101', '/certifications/THM-UIEHN9AGLM.pdf'],
]

const SKILLS: [string, string, string[]][] = [
  ['pentesting', 'Pentesting', ['Nmap', 'Burp Suite', 'Metasploit', 'Hydra', 'John the Ripper', 'SQLmap', 'Gobuster', 'Netcat']],
  ['programming', 'Programming', ['Python', 'C/C++', 'Java', 'JavaScript', 'HTML/CSS', 'Bash']],
  ['systems', 'Systems', ['Linux/Unix', 'Windows', 'PostgreSQL', 'UNIX multi-process']],
  ['network', 'Network', ['TCP/IP', 'SSL/TLS', 'Wireshark']],
  ['frameworks', 'Frameworks', ['Qt', 'JavaFX', 'React', 'SDL2']],
  ['fintech', 'Payment security', ['EMV', 'NFC', 'SEPA', 'ISO 7816']],
  ['devtools', 'Dev tools', ['Git', 'UML', 'Gnuplot', 'pandas']],
]

const CONTACT = {
  email: 'ayoub.goubraim@ecole.ensicaen.fr',
  github: 'https://github.com/AyGoub',
  linkedin: 'https://linkedin.com/in/ayoubgoubraim',
}

// directory name -> section id on the page
const DIRS: Record<string, string> = {
  about: 'about',
  skills: 'skills',
  certifications: 'certifications',
  projects: 'projects',
  tryhackme: 'tryhackme',
  writeups: 'writeups',
  resume: 'resume',
  contact: 'contact',
}

const WRITEUP_FILTERS: Record<string, string> = {
  web: 'Web Exploitation',
  privesc: 'Privilege Escalation',
  ad: 'Active Directory',
}

const COMMANDS = [
  'help', 'whoami', 'about', 'neofetch', 'skills', 'projects', 'open', 'writeups', 'read',
  'thm', 'certs', 'contact', 'cv', 'ls', 'cd', 'cat', 'nmap', 'hack', 'matrix', 'sudo',
  'history', 'lang', 'date', 'echo', 'clear', 'exit',
]

const PROMPT_USER = 'visitor@aygoub'

type Line = { id: number; node: ReactNode }

/* ------------------------------------------------------------------ */
/* Small presentational helpers                                        */
/* ------------------------------------------------------------------ */

const bar = (done: number, total: number, width = 20) => {
  const k = Math.round((done / total) * width)
  return (
    <span className="text-primary-400 whitespace-pre">
      [{'█'.repeat(k)}
      <span className="text-dark-600">{'░'.repeat(width - k)}</span>]
    </span>
  )
}

const diffClass = (d: string) =>
  d === 'Hard'
    ? 'bg-red-900/70 text-red-300'
    : d === 'Medium'
    ? 'bg-amber-900/70 text-amber-300'
    : 'bg-green-900/70 text-green-300'

const Prompt = ({ path = '~' }: { path?: string }) => (
  <span className="shrink-0">
    <span className="text-primary-400">{PROMPT_USER}</span>
    <span className="text-gray-500">:</span>
    <span className="text-sky-400">{path}</span>
    <span className="text-gray-500 mr-2">$</span>
  </span>
)

/* ------------------------------------------------------------------ */
/* Terminal                                                            */
/* ------------------------------------------------------------------ */

export default function Terminal() {
  const { language, setLanguage, t } = useLanguage()

  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const historyRef = useRef<string[]>([])
  historyRef.current = history
  const [busy, setBusy] = useState(false)
  const [matrix, setMatrix] = useState(false)

  const idRef = useRef(0)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const booted = useRef(false)
  const runRef = useRef<(c: string) => void>(() => {})
  const busyRef = useRef(false)
  busyRef.current = busy

  const push = useCallback((...nodes: ReactNode[]) => {
    setLines(prev => [...prev, ...nodes.map(node => ({ id: idRef.current++, node }))])
  }, [])

  // Print lines one after another (for nmap / hack animations)
  const stream = useCallback((nodes: ReactNode[], delay = 140, done?: () => void) => {
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setBusy(true)
    nodes.forEach((n, i) => {
      timers.current.push(setTimeout(() => push(n), reduce ? 0 : delay * (i + 1)))
    })
    timers.current.push(
      setTimeout(() => {
        setBusy(false)
        done?.()
      }, reduce ? 0 : delay * (nodes.length + 1))
    )
  }, [push])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // keep the newest line in view (scroll the terminal, not the page)
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const openUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  /* clickable command inside output */
  const C = ({ c, children }: { c: string; children?: ReactNode }) => (
    <button
      type="button"
      onClick={() => runRef.current(c)}
      className="text-left text-primary-400 underline decoration-dotted underline-offset-4 hover:text-primary-300 hover:decoration-solid focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-400"
    >
      {children ?? c}
    </button>
  )

  const A = ({ href, children }: { href: string; children: ReactNode }) => (
    <a
      href={href}
      target={href.startsWith('#') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="text-sky-400 underline underline-offset-4 hover:text-sky-300 break-all"
    >
      {children}
    </a>
  )

  /* -------------------------------------------------------------- */
  /* Command implementations                                         */
  /* -------------------------------------------------------------- */

  const findProject = (arg: string) => {
    const n = parseInt(arg, 10)
    if (!isNaN(n) && n >= 1 && n <= projects.length) return projects[n - 1]
    return projects.find(p => p.slug === arg || p.slug.startsWith(arg))
  }

  const findWriteup = (arg: string) => {
    const n = parseInt(arg, 10)
    if (!isNaN(n) && n >= 1 && n <= sortedWriteups.length) return sortedWriteups[n - 1]
    const a = arg.toLowerCase()
    return sortedWriteups.find(w => w.key.toLowerCase() === a || w.title.toLowerCase().startsWith(a))
  }

  const cmd: Record<string, (args: string[]) => void> = {
    help: () =>
      push(
        <div className="grid grid-cols-[minmax(0,11rem)_minmax(0,1fr)] gap-x-4 gap-y-0.5">
          {([
            ['whoami', 'whoami', t('terminal.help.whoami')],
            ['about', 'about', t('terminal.help.about')],
            ['neofetch', 'neofetch', t('terminal.help.neofetch')],
            ['skills', 'skills', t('terminal.help.skills')],
            ['projects', 'projects', t('terminal.help.projects')],
            ['open <n>', 'open 1', t('terminal.help.open')],
            ['writeups [web|privesc|ad]', 'writeups', t('terminal.help.writeups')],
            ['read <n>', 'writeups', t('terminal.help.read')],
            ['thm', 'thm', t('terminal.help.thm')],
            ['certs', 'certs', t('terminal.help.certs')],
            ['contact', 'contact', t('terminal.help.contact')],
            ['cv', 'cv', t('terminal.downloadCv')],
            ['ls / cd <dir>', 'ls', t('terminal.help.nav')],
            ['nmap ayoub', 'nmap ayoub', t('terminal.help.nmap')],
            ['sudo hire-me', 'sudo hire-me', t('terminal.help.sudo')],
            ['lang fr|en', 'lang', t('terminal.help.lang')],
            ['clear', 'clear', t('terminal.help.clear')],
          ] as [string, string, ReactNode][]).map(([label, c, d]) => (
            <div key={label} className="contents">
              <span><C c={c}>{label}</C></span>
              <span className="text-gray-400">{d}</span>
            </div>
          ))}
          <div className="col-span-2 text-gray-500 mt-2">
            {t('terminal.tip')}
          </div>
        </div>
      ),

    whoami: () =>
      push(
        <div>
          <div className="text-3xl md:text-5xl font-extrabold tracking-tight text-white my-1">Ayoub Goubraim</div>
          <div className="text-primary-300">{t('hero.subtitle')} · ENSICAEN</div>
          <div className="text-gray-400 mt-2 max-w-2xl">{t('hero.description')}</div>
        </div>
      ),

    about: () =>
      push(
        <div className="max-w-2xl space-y-2 text-gray-300">
          <p>{t('about.intro')}</p>
          <p><span className="text-amber-300"># {t('about.goalsTitle')}</span><br />{t('about.goals')}</p>
          <p className="text-gray-500">→ <C c="cd about">cd about</C> {t('terminal.fullSection')}</p>
        </div>
      ),

    neofetch: () =>
      push(
        <div className="flex flex-col sm:flex-row gap-6">
          <pre className="text-primary-400 leading-tight text-xs sm:text-sm">{`      ▄▄████▄▄
    ▄██████████▄
   ███▀▀    ▀▀███
   ██   ▄██▄   ██
   ██  ██████  ██
   ██   ▀██▀   ██
    ██▄  ██  ▄██
     ▀██▄██▄██▀
        ▀██▀`}</pre>
          <div className="space-y-0.5">
            <div><span className="text-primary-400 font-bold">ayoub</span>@<span className="text-primary-400 font-bold">aygoub.github.io</span></div>
            <div className="text-gray-600">-------------------------</div>
            {([
              ['OS', t('terminal.neofetch.os')],
              ['Role', t('hero.subtitle')],
              ['Uptime', t('terminal.neofetch.uptime', { n: THM.streak })],
              ['Packages', t('terminal.neofetch.packages', { p: projects.length, w: sortedWriteups.length })],
              ['Rank', t('terminal.neofetch.rank')],
              ['Shell', 'zsh + burpsuite + nmap'],
              ['Seeking', t('terminal.neofetch.seeking')],
            ] as [string, ReactNode][]).map(([k, v]) => (
              <div key={k}><span className="text-primary-400 font-bold">{k}</span>: <span className="text-gray-300">{v}</span></div>
            ))}
            <div className="flex gap-0 pt-2">
              {['bg-dark-900', 'bg-red-500', 'bg-primary-500', 'bg-amber-400', 'bg-sky-500', 'bg-fuchsia-500', 'bg-cyan-400', 'bg-gray-200'].map(c => (
                <span key={c} className={`w-6 h-3 ${c}`} />
              ))}
            </div>
          </div>
        </div>
      ),

    skills: () =>
      push(
        <div>
          <div className="text-sky-400">~/skills</div>
          {SKILLS.map(([id, , items], i) => (
            <div key={id}>
              <span className="text-gray-600">{i === SKILLS.length - 1 ? '└── ' : '├── '}</span>
              <span className="text-amber-300">{t(`skills.categories.${id}`)}</span>
              <span className="text-gray-400"> → {items.join(' · ')}</span>
            </div>
          ))}
        </div>
      ),

    projects: () =>
      push(
        <div>
          <div className="text-gray-500">{t('terminal.projectsTotal', { n: projects.length }) + ' '}<span className="text-primary-400">open &lt;n&gt;</span></div>
          {projects.map((p, i) => (
            <div key={p.slug} className="flex gap-3">
              <span className="text-gray-600 w-6 text-right shrink-0">{i + 1}</span>
              <span className="text-gray-600 hidden sm:inline shrink-0">drwxr-xr-x</span>
              <span className="shrink-0"><C c={`open ${i + 1}`}>{p.slug}/</C></span>
              <span className="text-gray-500 truncate hidden md:inline">{t(`projectCategories.${p.category.trim()}`)} · {p.date}</span>
            </div>
          ))}
        </div>
      ),

    open: ([arg]) => {
      if (!arg) return push(<span className="text-amber-300">usage: open &lt;n|slug&gt; — {t('terminal.see')} <C c="projects" /></span>)
      const p = findProject(arg)
      if (!p) return push(<span className="text-red-400">open: {arg}: {t('terminal.noProject')}</span>)
      push(
        <div className="border-l-2 border-primary-500 pl-4 max-w-2xl space-y-1">
          <div className="text-white font-bold text-lg">{p.title}</div>
          <div className="text-gray-500">{t(`projectCategories.${p.category.trim()}`)} · {p.date}{p.duration ? ` · ${p.duration}` : ''}</div>
          <div className="text-gray-300">{t(`projectDescriptions.${p.slug}`)}</div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {p.technologies.slice(0, 8).map(tech => (
              <span key={tech} className="text-xs bg-primary-900/50 text-primary-300 px-1.5 rounded">{tech}</span>
            ))}
          </div>
          <div className="pt-1 flex flex-wrap gap-4">
            <A href={`/projects/${p.slug}/`}>{t('terminal.fullWriteup')}</A>
            {p.github && <A href={p.github}>→ GitHub</A>}
            {p.demo && <A href={p.demo}>→ demo</A>}
          </div>
        </div>
      )
    },

    writeups: ([filter]) => {
      const cat = filter ? WRITEUP_FILTERS[filter.replace(/^--/, '')] : undefined
      if (filter && !cat) return push(<span className="text-amber-300">writeups: {t('terminal.filters')}: <C c="writeups web">web</C> · <C c="writeups privesc">privesc</C> · <C c="writeups ad">ad</C></span>)
      const list = sortedWriteups.map((w, i) => ({ w, n: i + 1 })).filter(({ w }) => !cat || w.category === cat)
      push(
        <div>
          <div className="text-gray-500">{t('terminal.reportsCount', { n: list.length })} <span className="text-primary-400">read &lt;n&gt;</span> · {t('terminal.filter')}: <C c="writeups web">web</C> <C c="writeups privesc">privesc</C> <C c="writeups ad">ad</C></div>
          {list.map(({ w, n }) => (
            <div key={w.key} className="flex gap-3 items-baseline">
              <span className="text-gray-600 w-6 text-right shrink-0">{n}</span>
              <span className="text-gray-500 shrink-0 hidden sm:inline">{w.date.slice(0, 7)}</span>
              <span className={`text-[11px] font-bold px-1.5 rounded shrink-0 w-16 text-center ${diffClass(w.difficulty)}`}>{w.difficulty.toUpperCase()}</span>
              <C c={`read ${n}`}>{w.title}</C>
            </div>
          ))}
        </div>
      )
    },

    read: ([arg]) => {
      if (!arg) return push(<span className="text-amber-300">usage: read &lt;n&gt; — {t('terminal.see')} <C c="writeups" /></span>)
      const w = findWriteup(arg)
      if (!w) return push(<span className="text-red-400">read: {arg}: {t('terminal.noWriteup')}</span>)
      openUrl(w.link)
      push(
        <div className="max-w-2xl">
          <div className="text-white font-bold">{w.title} <span className={`text-[11px] px-1.5 rounded ${diffClass(w.difficulty)}`}>{w.difficulty.toUpperCase()}</span></div>
          <div className="text-gray-300">{t(`writeupsData.${w.key}`)}</div>
          <div className="text-gray-500">{w.tags.join(' · ')}</div>
          <div>{t('terminal.opening')} <A href={w.link}>{w.link.split('/').pop()}</A> …</div>
        </div>
      )
    },

    thm: () =>
      push(
        <div>
          <div className="text-gray-300">
            TryHackMe · {t('terminal.rank')} <span className="text-white font-bold">#{THM.rank}</span> (top 2%) · <span className="text-white font-bold">{THM.rooms}</span> rooms · <span className="text-white font-bold">{THM.streak}</span> {t('terminal.dayStreak')} · <span className="text-white font-bold">{THM.badges}</span> badges
          </div>
          <div className="mt-1">
            {THM.paths.map(([name, d, total]) => (
              <div key={name} className="flex flex-wrap gap-x-3">
                <span className="w-56 text-gray-300">{name}</span>
                {bar(d, total)}
                <span className={d === total ? 'text-primary-400' : 'text-amber-300'}>{d}/{total}{d === total ? ' ✓' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      ),

    certs: () =>
      push(
        <div>
          {CERTS.map(([name, link]) => (
            <div key={link}><span className="text-primary-400">✓ </span><A href={link}>{name}</A></div>
          ))}
        </div>
      ),

    contact: () =>
      push(
        <div className="space-y-0.5">
          <div><span className="text-amber-300 w-20 inline-block">email</span><A href={`mailto:${CONTACT.email}`}>{CONTACT.email}</A></div>
          <div><span className="text-amber-300 w-20 inline-block">linkedin</span><A href={CONTACT.linkedin}>linkedin.com/in/ayoubgoubraim</A></div>
          <div><span className="text-amber-300 w-20 inline-block">github</span><A href={CONTACT.github}>github.com/AyGoub</A></div>
          <div className="text-gray-500 pt-1">{t('terminal.or')} <C c="cd contact">cd contact</C> {t('terminal.toSend')}</div>
        </div>
      ),

    cv: () => {
      const file = t('resume.cvFile')
      openUrl(file)
      push(<span>{t('terminal.opening')} <A href={file}>{file.split('/').pop()}</A> …</span>)
    },

    ls: ([flag]) =>
      push(
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {flag === '-a' || flag === '-la' ? <span className="text-gray-500">.flag.txt</span> : null}
          {Object.keys(DIRS).map(d => (
            <C key={d} c={`cd ${d}`}><span className="text-sky-400">{d}/</span></C>
          ))}
          <C c="cat README.md"><span className="text-gray-300">README.md</span></C>
          <C c="cv"><span className="text-gray-300">cv.pdf</span></C>
        </div>
      ),

    cd: ([dir]) => {
      const d = (dir || '~').replace(/\/$/, '').replace(/^~\//, '')
      if (d === '~' || d === '..' || d === '/' || d === 'home') {
        scrollTo('home')
        return
      }
      const id = DIRS[d]
      if (!id) return push(<span className="text-red-400">cd: {dir}: {t('terminal.noDir')} — <C c="ls" /></span>)
      push(<span className="text-gray-500">{t('terminal.jumping')} #{id} ↓</span>)
      setTimeout(() => scrollTo(id), 250)
    },

    cat: ([file]) => {
      if (!file) return push(<span className="text-amber-300">usage: cat &lt;file&gt;</span>)
      if (file === 'README.md') return cmd.about([])
      if (file === 'cv.pdf') return push(<span className="text-gray-400">cat: cv.pdf: {t('terminal.binary')} <C c="cv" /></span>)
      if (file === '.flag.txt' || file === 'flag.txt') {
        return push(
          <div>
            <div className="text-primary-300 font-bold">THM{'{'}y0u_r34d_th3_s0urc3_0f_my_curi0s1ty{'}'}</div>
            <div className="text-gray-400">{t('terminal.flag')} <C c="contact" /></div>
          </div>
        )
      }
      push(<span className="text-red-400">cat: {file}: {t('terminal.noFile')}</span>)
    },

    nmap: ([target]) => {
      const tgt = target || 'ayoub'
      const rows: [string, string, string][] = [
        ['22/tcp', 'linux', 'Bash, privesc, cron & PATH hijacking'],
        ['80/tcp', 'web-pentest', 'OWASP Top 10 · Burp Suite · SQLmap · XSS/SQLi/XXE/SSTI'],
        ['88/tcp', 'active-directory', 'Kerberos, NTLM, LDAP enumeration'],
        ['445/tcp', 'windows', 'SMB, services, registry, scheduled tasks'],
        ['514/udp', 'blue-team', 'SIEM (OSSIM), correlation rules'],
        ['8080/tcp', 'devsecops', 'Trivy · Semgrep · ZAP · Docker · K8s'],
      ]
      stream(
        [
          <span key="a" className="text-gray-400">Starting Nmap 7.94 ( https://nmap.org ) {t('terminal.against')} {tgt}</span>,
          <span key="b" className="text-gray-400">Nmap scan report for {tgt} (aygoub.github.io)</span>,
          <span key="c" className="text-gray-500">Host is up (0.0013s latency). {t('terminal.motivation')}</span>,
          <span key="d" className="text-gray-300 whitespace-pre">{'PORT       STATE  SERVICE            VERSION'}</span>,
          ...rows.map(([port, svc, ver]) => (
            <span key={port} className="whitespace-pre-wrap">
              <span className="text-white">{port.padEnd(11)}</span>
              <span className="text-primary-400">{'open   '}</span>
              <span className="text-amber-300">{svc.padEnd(19)}</span>
              <span className="text-gray-400">{ver}</span>
            </span>
          )),
          <span key="e" className="text-gray-400">
            {t('terminal.serviceInfo')} <C c="sudo hire-me" />
          </span>,
        ],
        160
      )
    },

    hack: () => {
      const steps = [
        t('terminal.hack1'),
        t('terminal.hack2'),
        t('terminal.hack3'),
        t('terminal.hack4'),
      ]
      stream(
        [
          ...steps.map((s, i) => <span key={i} className="text-gray-400">{s}</span>),
          <span key="ok" className="text-primary-300 font-bold">{t('terminal.hackDone')} <C c="writeups" /></span>,
        ],
        420
      )
    },

    matrix: () => {
      setMatrix(true)
      push(<span className="text-primary-400">{t('terminal.wakeUp')}</span>)
      setTimeout(() => setMatrix(false), 6000)
    },

    sudo: args => {
      const what = args.join(' ')
      if (what === 'hire-me' || what === 'hire me') {
        return stream(
          [
            <span key="p" className="text-gray-500">[sudo] password for visitor: ********</span>,
            <div key="g" className="inline-block my-1 px-6 py-2 border-2 border-primary-400 text-primary-300 font-bold tracking-widest">{t('terminal.granted')}</div>,
            <span key="t" className="text-gray-300">{t('terminal.decision')}</span>,
            <span key="m">  1. <A href={`mailto:${CONTACT.email}`}>{CONTACT.email}</A></span>,
            <span key="c">  2. <C c="cv">{t('terminal.downloadCv')}</C></span>,
            <span key="l">  3. <A href={CONTACT.linkedin}>LinkedIn</A></span>,
          ],
          200
        )
      }
      push(<span className="text-red-400">{t('terminal.notSudoer')} <span className="text-gray-500">({t('terminal.try')} <C c="sudo hire-me" />)</span></span>)
    },

    rm: () => push(<span className="text-red-400">rm: {t('terminal.rmDenied')}</span>),

    history: () =>
      push(
        <div>
          {historyRef.current.length === 0
            ? <span className="text-gray-500">{t('terminal.empty')}</span>
            : historyRef.current.map((h, i) => <div key={i}><span className="text-gray-600 inline-block w-8 text-right mr-3">{i + 1}</span><C c={h}>{h}</C></div>)}
        </div>
      ),

    lang: ([l]) => {
      const target: Language = l === 'fr' || l === 'en' ? l : language === 'fr' ? 'en' : 'fr'
      setLanguage(target)
      push(<span className="text-gray-400">{translate(target, 'terminal.langSet')}</span>)
    },

    date: () => push(<span className="text-gray-300">{new Date().toString()}</span>),
    echo: args => push(<span className="text-gray-300">{args.join(' ')}</span>),
    clear: () => setLines([]),
    exit: () => push(<span className="text-gray-400">{t('terminal.logout')} <C c="contact" /></span>),
  }

  // aliases
  cmd.ll = cmd.ls
  cmd.resume = cmd.cv
  cmd.hire = () => cmd.sudo(['hire-me'])
  cmd.cert = cmd.certs
  cmd.tryhackme = cmd.thm
  cmd.man = cmd.help
  cmd['?'] = cmd.help

  function run(raw: string) {
    if (busyRef.current) return
    const text = raw.trim()
    push(
      <div className="flex flex-wrap">
        <Prompt />
        <span className="text-white break-all">{text}</span>
      </div>
    )
    setInput('')
    setHistIdx(-1)
    if (!text) return
    setHistory(h => [...h, text])
    const [name, ...args] = text.split(/\s+/)
    const fn = cmd[name.toLowerCase()]
    if (fn) fn(args)
    else
      push(
        <span>
          <span className="text-red-400">zsh: {t('terminal.notFound')}: {name}</span>
          <span className="text-gray-500"> — {t('terminal.try')} </span>
          <C c="help" />
        </span>
      )
  }

  runRef.current = run

  /* -------------------------------------------------------------- */
  /* Boot: type "whoami" automatically                               */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    if (booted.current) return
    booted.current = true
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const word = 'whoami'
    if (reduce) {
      setInput(word)
      return
    }
    setBusy(true)
    word.split('').forEach((_, i) => {
      timers.current.push(setTimeout(() => setInput(word.slice(0, i + 1)), 500 + i * 90))
    })
    timers.current.push(
      setTimeout(() => {
        setBusy(false)
      }, 500 + word.length * 90 + 250)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // fire the boot command once the typing animation released the lock
  const bootFired = useRef(false)
  useEffect(() => {
    if (!busy && !bootFired.current && input === 'whoami' && lines.length === 0) {
      bootFired.current = true
      greet()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busy, input])

  // Switching language restarts the session so every line is in the new language
  const lastLang = useRef(language)
  useEffect(() => {
    if (lastLang.current === language) return
    lastLang.current = language
    if (!bootFired.current) return
    timers.current.forEach(clearTimeout)
    timers.current = []
    setBusy(false)
    busyRef.current = false
    setLines([])
    greet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  function greet() {
    run('whoami')
    push(
      <div className="text-gray-400 mt-1">
        {t('terminal.intro') + ' '}
        <C c="help" />
        {' ' + t('terminal.introTry') + ' '}
        <C c="projects" /> · <C c="writeups" /> · <C c="neofetch" /> · <C c="nmap ayoub" />
      </div>
    )
  }

  /* -------------------------------------------------------------- */
  /* Keyboard                                                        */
  /* -------------------------------------------------------------- */

  const complete = () => {
    const parts = input.split(/\s+/)
    let pool: string[] = []
    if (parts.length <= 1) pool = [...COMMANDS, 'sudo hire-me']
    else {
      const c = parts[0]
      if (c === 'cd') pool = Object.keys(DIRS)
      else if (c === 'open') pool = projects.map(p => p.slug)
      else if (c === 'read') pool = sortedWriteups.map(w => w.key)
      else if (c === 'writeups') pool = Object.keys(WRITEUP_FILTERS)
      else if (c === 'cat') pool = ['README.md', 'cv.pdf']
      else if (c === 'lang') pool = ['fr', 'en']
      else if (c === 'sudo') pool = ['hire-me']
      pool = pool.map(p => `${c} ${p}`)
    }
    const matches = pool.filter(p => p.startsWith(input.trim()) && input.trim().length > 0)
    if (matches.length === 1) setInput(matches[0] + ' ')
    else if (matches.length > 1) {
      push(
        <div className="flex flex-wrap">
          <Prompt />
          <span className="text-white">{input}</span>
        </div>,
        <div className="flex flex-wrap gap-x-4 text-gray-400">{matches.map(m => <span key={m}>{m.split(' ').pop()}</span>)}</div>
      )
      // longest common prefix
      let prefix = matches[0]
      for (const m of matches) while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1)
      if (prefix.length > input.length) setInput(prefix)
    }
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      run(input)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      complete()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const i = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(i)
      setInput(history[i])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx === -1) return
      const i = histIdx + 1
      if (i >= history.length) {
        setHistIdx(-1)
        setInput('')
      } else {
        setHistIdx(i)
        setInput(history[i])
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault()
      push(<div className="flex flex-wrap"><Prompt /><span className="text-white">{input}^C</span></div>)
      setInput('')
    }
  }

  return (
    <div className="relative w-full rounded-xl border border-dark-600 bg-[#050806] shadow-[0_0_0_1px_rgba(34,197,94,0.08),0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-[13px] sm:text-sm">
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-dark-800 border-b border-dark-600 text-xs text-gray-500 select-none">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate">{PROMPT_USER}: ~ — zsh</span>
        <span className="ml-auto hidden sm:inline text-gray-600">{t('terminal.interactive')} · help</span>
      </div>

      {matrix && <MatrixRain />}

      {/* output */}
      <div
        ref={bodyRef}
        onClick={() => {
          if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true })
        }}
        className="relative h-[420px] sm:h-[460px] overflow-y-auto px-4 sm:px-5 py-4 leading-relaxed text-gray-200 cursor-text"
        role="log"
        aria-live="polite"
      >
        {lines.map(l => (
          <div key={l.id} className="mb-1 break-words">{l.node}</div>
        ))}
        <div className="flex items-center">
          <Prompt />
          <input
            ref={inputRef}
            value={input}
            onChange={e => !busy && setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 min-w-0 bg-transparent outline-none text-white caret-primary-400"
            aria-label={t('terminal.inputLabel')}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
      </div>

      {/* quick commands (useful on phones) */}
      <div className="flex gap-2 overflow-x-auto px-4 py-2.5 border-t border-dark-700 bg-dark-900/80">
        {['help', 'whoami', 'projects', 'writeups', 'thm', 'skills', 'contact', 'sudo hire-me'].map(c => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            disabled={busy}
            className="shrink-0 px-2.5 py-1 rounded border border-dark-600 text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors text-xs disabled:opacity-40"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Easter egg: matrix rain over the terminal                           */
/* ------------------------------------------------------------------ */

function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const w = (c.width = c.offsetWidth)
    const h = (c.height = c.offsetHeight)
    const size = 14
    const cols = Math.floor(w / size)
    const drops = Array.from({ length: cols }, () => Math.random() * -50)
    const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF<>/{}$#'
    const id = setInterval(() => {
      ctx.fillStyle = 'rgba(5,8,6,0.12)'
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = '#4ade80'
      ctx.font = `${size}px monospace`
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * size, y * size)
        drops[i] = y * size > h && Math.random() > 0.95 ? 0 : y + 1
      })
    }, 50)
    return () => clearInterval(id)
  }, [])
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 top-10 w-full h-full z-10 opacity-80" />
}
