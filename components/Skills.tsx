'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { Comment, SectionHeader, Window } from '@/components/term'

const Skills = () => {
  const { t } = useLanguage()

  const skillCategories = [
    {
      dir: 'programming',
      skills: [
        { name: "Python", logo: "/logos/python.png" },
        { name: "C/C++", logo: "/logos/cpp.png" },
        { name: "Java", logo: "/logos/java.png" },
        { name: "JavaScript", logo: "/logos/javascript.png" },
        { name: "HTML/CSS", logo: "/logos/html-css.png" },
        { name: "Bash", logo: "/logos/bash.png" }
      ],
    },
    {
      dir: 'frameworks',
      skills: [
        { name: "Qt", logo: "/logos/qt.png" },
        { name: "JavaFX", logo: "/logos/javafx.png" },
        { name: "React", logo: "/logos/react.png" },
        { name: "SDL2", logo: "/logos/sdl.png" }
      ],
    },
    {
      dir: 'systems',
      skills: [
        { name: "Linux/Unix", logo: "/logos/linux.png" },
        { name: "Windows", logo: "/logos/windows.png" },
        { name: "PostgreSQL", logo: "/logos/postgresql.jpg" },
        { name: "UNIX Multi-process", logo: "/logos/unix.jpg" }
      ]
    },
    {
      dir: 'network',
      skills: [
        { name: "TCP/IP", logo: "/logos/tcp-ip.png" },
        { name: "SSL/TLS", logo: "/logos/SSL-TLC.png" },
        { name: "Wireshark", logo: "/logos/Wireshark_Icon.png" },
      ]
    },
    {
      dir: 'pentesting',
      skills: [
        { name: "Nmap", logo: "/logos/nmap.png" },
        { name: "Burp Suite", logo: "/logos/burpsuite.jpg" },
        { name: "Metasploit", logo: "/logos/metasploit.png" },
        { name: "Hydra", logo: "/logos/hydra.jpeg" },
        { name: "John the Ripper", logo: "/logos/john.png" },
        { name: "SQLmap", logo: "/logos/sqlmap.png" },
        { name: "Gobuster", logo: "/logos/gobuster.png" },
        { name: "Netcat", logo: "/logos/netcat_v3.png" }
      ]
    },
    
    {
      dir: 'fintech',
      skills: [
        { name: "EMV", logo: "/logos/emv.png" },
        { name: "NFC", logo: "/logos/nfc.jpg" },
        { name: "SEPA", logo: "/logos/sepa.jpg" },
        { name: "ISO 7816", logo: "/logos/iso.png" }
      ]
    },
    {
      dir: 'devtools',
      skills: [
        { name: "Git", logo: "/logos/git.png" },
        { name: "UML", logo: "/logos/uml.png" },
        { name: "Gnuplot", logo: "/logos/gnuplot.png" },
        { name: "pandas", logo: "/logos/pandas.png" }
      ]
    }
  ]

  return (
    <section id="skills" className="py-20 bg-dark-900 border-t border-dark-700">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader cmd="tree ~/skills" title={t('skills.title')} lead={t('skills.subtitle')} />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...skillCategories].sort((a, b) => Number(b.dir === 'pentesting') - Number(a.dir === 'pentesting')).map(category => (
              <Window
                key={category.dir}
                className={category.dir === 'pentesting' ? 'md:col-span-2' : ''}
                title={`~/skills/${category.dir}/`}
                right={<span className="text-dark-500">{category.skills.length}</span>}
                bodyClassName="p-4"
              >
                <h3 className="font-mono font-bold text-white mb-3">{t(`skills.categories.${category.dir}`)}</h3>
                <ul className={`grid grid-cols-2 gap-2 ${category.dir === 'pentesting' ? 'sm:grid-cols-4' : ''}`}>
                  {category.skills.map(skill => (
                    <li
                      key={skill.name}
                      className="flex items-center gap-2 rounded-md border border-dark-700 bg-dark-900/60 px-2 py-1.5 hover:border-primary-500/60 transition-colors"
                    >
                      <span className="relative w-6 h-6 shrink-0 rounded bg-white/90 p-0.5">
                        <Image src={skill.logo} alt="" fill className="object-contain p-0.5" sizes="24px" />
                      </span>
                      <span className="font-mono text-xs text-gray-300 truncate">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </Window>
            ))}
          </div>

          <Comment title={t('skills.learningPhilosophyTitle')}>{t('skills.learningPhilosophy')}</Comment>
        </div>
      </div>
    </section>
  )
}

export default Skills
