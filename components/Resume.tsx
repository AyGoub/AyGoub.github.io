'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Download, Eye, FileText, User, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'

const Resume = () => {
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

  const personalInfo = {
    name: "Ayoub Goubraim",
    title: "Cybersecurity & Pentester Student",
    email: "ayoub.goubraim@ecole.ensicaen.fr",
    phone: "+33 7 53 44 54 36",
    location: "Caen, France",
    github: "https://github.com/AyGoub",
    linkedin: "https://linkedin.com/in/ayoubgoubraim",
    website: "https://aygoub.github.io"
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/cv/AyGoub_CV.pdf'
    link.download = 'AyGoub_CV.pdf'
    link.click()
  }

  return (
    <section id="resume" className="py-20 bg-dark-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Resume / CV
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              My professional experience, education, and achievements in cybersecurity
            </p>
          </motion.div>

          {/* Contact Info Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-dark-800 rounded-lg p-8 mb-8 border border-dark-700"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-0">
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-primary-500" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{personalInfo.name}</h3>
                    <p className="text-primary-400">{personalInfo.title}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{personalInfo.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-dark-700 hover:bg-primary-600 rounded-full transition-colors duration-200"
                >
                  <Github size={20} className="text-gray-300" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-dark-700 hover:bg-primary-600 rounded-full transition-colors duration-200"
                >
                  <Linkedin size={20} className="text-gray-300" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* PDF Viewer and Download */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* PDF Preview */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
                <div className="bg-dark-700 px-6 py-4 border-b border-dark-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-primary-500" />
                      <h3 className="text-lg font-semibold text-white">AyGoub CV</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400 text-sm">Preview</span>
                    </div>
                  </div>
                </div>
                
                {/* PDF Embed */}
                <div className="h-[800px] w-full">
                  <iframe
                    src="/cv/AyGoub_CV.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
                    className="w-full h-full border-0"
                    title="AyGoub CV Preview"
                  />
                </div>
              </div>
            </motion.div>

            {/* Download Section */}
            <motion.div 
              variants={itemVariants}
              className="space-y-6"
            >
              {/* Download Card */}
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Download CV
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Get the latest version of my resume in PDF format
                  </p>
                  <button
                    onClick={handleDownload}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Quick Info
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Experience Level:</span>
                    <span className="text-primary-400">Student</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Specialization:</span>
                    <span className="text-primary-400">Cybersecurity</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">TryHackMe Rank:</span>
                    <span className="text-primary-400">Top 4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Availability:</span>
                    <span className="text-primary-400">March 2026</span>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Interested in working together?
                </h4>
                <p className="text-white/90 text-sm mb-4">
                  I'm actively seeking internship opportunities in penetration testing and red team operations.
                </p>
                <a
                  href="#contact"
                  className="block w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Resume