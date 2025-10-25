'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, ExternalLink, Calendar, CheckCircle, Clock, Download } from 'lucide-react'
import Image from 'next/image'

const Certifications = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  // Mis à jour pour utiliser vos PDF ajoutés dans public/certifications
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'planned':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'in_progress':
        return Clock
      case 'planned':
        return Calendar
      default:
        return Award
    }
  }

  return (
    <section id="certifications" className="py-20 bg-dark-900">
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
              Certifications & Achievements
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Industry-recognized certifications and learning achievements in cybersecurity
            </p>
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {certifications.map((cert, index) => {
              const StatusIcon = getStatusIcon(cert.status)
              
              return (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-all duration-300 group"
                >
                  {/* Badge */}
                  <div className="flex justify-center mb-6">
                    {cert.badge ? (
                      <div className="relative w-24 h-24 group-hover:scale-110 transition-transform duration-300">
                        <Image
                          src={cert.badge}
                          alt={`${cert.name} badge`}
                          fill
                          className="object-contain"
                          sizes="96px"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-dark-700 flex items-center justify-center border border-dark-600">
                        <Award className="w-10 h-10 text-primary-500" />
                      </div>
                    )}
                  </div>

                  {/* Certification Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-primary-400 font-medium mb-2">
                      {cert.issuer}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {cert.description}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex justify-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center space-x-1 ${getStatusColor(cert.status)}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="capitalize">{cert.status.replace('_', ' ')}</span>
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {cert.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-dark-700 text-gray-300 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-center space-x-2">
                    {cert.credential && (
                      <a
                        href={cert.credential}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View PDF</span>
                      </a>
                    )}
                    {cert.credential && (
                      <a
                        href={cert.credential}
                        download
                        className="flex items-center space-x-1 px-3 py-2 bg-dark-700 hover:bg-dark-600 text-gray-300 text-sm rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Stats Summary */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8"
          >
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">
                  {certifications.filter(c => c.status === 'completed').length}
                </div>
                <div className="text-white/80">Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">
                  {certifications.filter(c => c.status === 'in_progress').length}
                </div>
                <div className="text-white/80">In Progress</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">
                  {certifications.filter(c => c.status === 'planned').length}
                </div>
                <div className="text-white/80">Planned</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">Top 4%</div>
                <div className="text-white/80">TryHackMe Rank</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
