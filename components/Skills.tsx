'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
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
  Award
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
        { name: "Python", level: 85, icon: "🐍" },
        { name: "C/C++", level: 80, icon: "⚙️" },
        { name: "Java", level: 75, icon: "☕" },
        { name: "JavaScript", level: 80, icon: "🟨" },
        { name: "HTML/CSS", level: 85, icon: "🎨" },
        { name: "Bash", level: 80, icon: "💻" }
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Frameworks & Libraries",
      icon: Globe,
      skills: [
        { name: "Qt", level: 70, icon: "🖥️" },
        { name: "JavaFX", level: 65, icon: "☕" },
        { name: "React", level: 80, icon: "⚛️" },
        { name: "SDL2", level: 75, icon: "🎮" }
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Systems & Databases",
      icon: Database,
      skills: [
        { name: "Linux/Unix", level: 90, icon: "🐧" },
        { name: "Windows", level: 85, icon: "🪟" },
        { name: "PostgreSQL", level: 80, icon: "🐘" },
        { name: "UNIX Multi-process", level: 85, icon: "⚡" }
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Network & Protocols",
      icon: Network,
      skills: [
        { name: "TCP/IP", level: 85, icon: "🌐" },
        { name: "SSL/TLS", level: 80, icon: "🔒" },
        { name: "Wireshark", level: 85, icon: "🦈" },
        { name: "Network Analysis", level: 80, icon: "📊" }
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Pentesting Tools",
      icon: Shield,
      skills: [
        { name: "Nmap", level: 90, icon: "👁️" },
        { name: "Burp Suite", level: 85, icon: "⚡" },
        { name: "Metasploit", level: 80, icon: "🎯" },
        { name: "Hydra", level: 75, icon: "💧" },
        { name: "John the Ripper", level: 75, icon: "🔨" },
        { name: "SQLmap", level: 80, icon: "🗄️" },
        { name: "Gobuster", level: 80, icon: "🔍" },
        { name: "Netcat", level: 85, icon: "🌐" }
      ],
      color: "from-red-500 to-red-600"
    },
    {
      title: "Web Security",
      icon: Lock,
      skills: [
        { name: "OWASP Top 10", level: 90, icon: "🛡️" },
        { name: "WSTG/ASVS", level: 85, icon: "📋" },
        { name: "OWASP ZAP", level: 80, icon: "⚡" },
        { name: "ffuf/gobuster", level: 80, icon: "🔍" },
        { name: "jwt-tool", level: 75, icon: "🔑" }
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "FinTech & e-Payment",
      icon: Key,
      skills: [
        { name: "EMV", level: 70, icon: "💳" },
        { name: "NFC", level: 75, icon: "📱" },
        { name: "SEPA", level: 70, icon: "🇪🇺" },
        { name: "ISO 7816", level: 65, icon: "📄" }
      ],
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Development Tools",
      icon: Terminal,
      skills: [
        { name: "Git", level: 85, icon: "🌿" },
        { name: "UML", level: 75, icon: "📐" },
        { name: "Gnuplot", level: 70, icon: "📈" },
        { name: "pandas", level: 80, icon: "🐼" }
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

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{skill.icon}</span>
                            <span className="text-gray-300 font-medium">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-primary-400 font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-dark-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
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


