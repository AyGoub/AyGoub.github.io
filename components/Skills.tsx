'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { 
  Shield, 
  Terminal, 
  Network, 
  Database, 
  Code, 
  Lock, 
  Search, 
  Bug,
  Cpu,
  Globe,
  Key,
  Eye,
  Award,
  Zap,
  Monitor,
  Server,
  FileCode,
  GitBranch,
  ShieldCheck,
  Target,
  SearchCheck,
  Hammer,
  LockKeyhole,
  Wifi,
  HardDrive,
  MousePointer,
  Settings,
  Layers,
  Smartphone,
  CreditCard,
  Euro,
  FileText,
  BarChart3,
  Git,
  Ruler,
  TrendingUp,
  Coffee
} from 'lucide-react'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1
    }
  }

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: [
        { name: "Python", logo: "/logos/python.png" },
        { name: "C/C++", logo: "/logos/cpp.png" },
        { name: "Java", logo: "/logos/java.png" },
        { name: "JavaScript", logo: "/logos/javascript.png" },
        { name: "HTML/CSS", logo: "/logos/html-css.png" },
        { name: "Bash", logo: "/logos/bash.png" }
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Frameworks & Libraries",
      icon: Globe,
      skills: [
        { name: "Qt", logo: "/logos/qt.png" },
        { name: "JavaFX", logo: "/logos/javafx.png" },
        { name: "React", logo: "/logos/react.png" },
        { name: "SDL2", logo: "/logos/sdl.png" }
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Systems & Databases",
      icon: Database,
      skills: [
        { name: "Linux/Unix", logo: "/logos/linux.png" },
        { name: "Windows", logo: "/logos/windows.png" },
        { name: "PostgreSQL", logo: "/logos/postgresql.jpg" },
        { name: "UNIX Multi-process", logo: "/logos/unix.jpg" }
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Network & Protocols",
      icon: Network,
      skills: [
        { name: "TCP/IP", logo: "/logos/tcp-ip.png" },
        { name: "SSL/TLS", logo: "/logos/ssl-tls.png" },
        { name: "Wireshark", logo: "/logos/wireshark.png" },
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Pentesting Tools",
      icon: Shield,
      skills: [
        { name: "Nmap", logo: "/logos/nmap.png" },
        { name: "Burp Suite", logo: "/logos/burp-suite.png" },
        { name: "Metasploit", logo: "/logos/metasploit.png" },
        { name: "Hydra", logo: "/logos/hydra.png" },
        { name: "John the Ripper", logo: "/logos/john-ripper.png" },
        { name: "SQLmap", logo: "/logos/sqlmap.png" },
        { name: "Gobuster", logo: "/logos/gobuster.png" },
        { name: "Netcat", logo: "/logos/netcat.png" }
      ],
      color: "from-red-500 to-red-600"
    },
    
    {
      title: "FinTech & e-Payment",
      icon: Key,
      skills: [
        { name: "EMV", logo: "/logos/emv.png" },
        { name: "NFC", logo: "/logos/nfc.png" },
        { name: "SEPA", logo: "/logos/sepa.png" },
        { name: "ISO 7816", logo: "/logos/iso-7816.png" }
      ],
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Development Tools",
      icon: Terminal,
      skills: [
        { name: "Git", logo: "/logos/git.png" },
        { name: "UML", logo: "/logos/uml.png" },
        { name: "Gnuplot", logo: "/logos/gnuplot.png" },
        { name: "pandas", logo: "/logos/pandas.png" }
      ],
      color: "from-indigo-500 to-purple-500"
    }
  ]

  const certifications = [
    {
      name: "TryHackMe Pre Security",
      status: "Completed",
      description: "Fundamental cybersecurity concepts and terminology"
    },
    {
      name: "TryHackMe Cyber Security 101",
      status: "Completed",
      description: "Introduction to cybersecurity principles and practices"
    },
    {
      name: "TryHackMe Jr Penetration Tester",
      status: "Completed",
      description: "Junior-level penetration testing skills and methodologies"
    },
    {
      name: "TryHackMe Web Fundamentals",
      status: "Completed",
      description: "Web application security and OWASP Top 10 vulnerabilities"
    },
    {
      name: "TryHackMe Top 4% Global Ranking",
      status: "Achievement",
      description: "Ranked in top 4% of all TryHackMe users globally"
    }
  ]

  return (
    <section id="skills" className="py-20 bg-dark-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              My technical skills and areas of expertise in cybersecurity
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {category.title}
                  </h3>
                </div>

                  <div className="grid grid-cols-2 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="bg-dark-700 hover:bg-dark-600 rounded-lg p-3 border border-dark-600 hover:border-primary-500/50 transition-all duration-200 group"
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <div className="w-12 h-12 relative group-hover:scale-110 transition-transform duration-200">
                            <Image
                              src={skill.logo}
                              alt={`${skill.name} logo`}
                              fill
                              className="object-contain"
                              sizes="48px"
                            />
                          </div>
                          <span className="text-gray-300 font-medium text-sm">
                            {skill.name}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-3xl font-bold text-center gradient-text mb-8">
              Certifications & Learning Path
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-all duration-300 text-center"
                >
                  <Award className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">
                    {cert.name}
                  </h4>
                  <p className="text-primary-400 font-medium mb-3">
                    {cert.status}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {cert.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning Philosophy */}
          <motion.div 
            variants={itemVariants}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                📚 Continuous Learning Philosophy
              </h3>
              <p className="text-lg text-white/90 leading-relaxed">
                In the rapidly evolving field of cybersecurity, continuous learning is not just important—it's essential. 
                I dedicate time daily to staying updated with the latest threats, tools, and techniques. 
                Whether it's through TryHackMe rooms, CTF competitions, or hands-on lab practice, 
                I believe in learning by doing and sharing knowledge with the community.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills


