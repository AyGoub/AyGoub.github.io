'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  FileText, 
  Calendar, 
  Tag, 
  ExternalLink, 
  Code, 
  Eye,
  Download,
  Trophy,
  Clock,
  Target
} from 'lucide-react'

const Writeups = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedCategory, setSelectedCategory] = useState('All')

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

  const categories = ['All', 'Web Exploitation', 'Cryptography', 'Forensics', 'Binary Exploitation', 'Reverse Engineering', 'OSINT']

  const writeups = [
    {
      title: "Vulnversity - TryHackMe Walkthrough",
      description: "Complete walkthrough of the Vulnversity room covering file upload vulnerabilities and privilege escalation techniques.",
      category: "Web Exploitation",
      difficulty: "Easy",
      date: "2024-01-15",
      readTime: "15 min",
      tags: ["File Upload", "Privilege Escalation", "Linux"],
      link: "#",
      featured: true,
      points: 120
    },
    {
      title: "Blue - Windows Privilege Escalation",
      description: "Step-by-step guide to exploiting the Blue machine, covering SMB vulnerabilities and Windows privilege escalation.",
      category: "Binary Exploitation",
      difficulty: "Easy",
      date: "2024-01-14",
      readTime: "20 min",
      tags: ["SMB", "Windows", "EternalBlue"],
      link: "#",
      featured: true,
      points: 100
    },
    {
      title: "Ice - Web Application Security",
      description: "Detailed analysis of the Ice room focusing on web application vulnerabilities and exploitation techniques.",
      category: "Web Exploitation",
      difficulty: "Medium",
      date: "2024-01-13",
      readTime: "25 min",
      tags: ["Web App", "SQL Injection", "XSS"],
      link: "#",
      featured: false,
      points: 150
    },
    {
      title: "LazyAdmin - Linux Privilege Escalation",
      description: "Comprehensive writeup covering the LazyAdmin room with focus on Linux privilege escalation methods.",
      category: "Binary Exploitation",
      difficulty: "Easy",
      date: "2024-01-12",
      readTime: "18 min",
      tags: ["Linux", "Privilege Escalation", "SUID"],
      link: "#",
      featured: false,
      points: 110
    },
    {
      title: "Basic Pentesting - Network Reconnaissance",
      description: "Complete guide to network reconnaissance and basic penetration testing methodologies.",
      category: "Forensics",
      difficulty: "Easy",
      date: "2024-01-10",
      readTime: "30 min",
      tags: ["Network", "Reconnaissance", "Nmap"],
      link: "#",
      featured: false,
      points: 200
    },
    {
      title: "RootMe - Web Application Challenges",
      description: "Solving various web application security challenges including file uploads and directory traversal.",
      category: "Web Exploitation",
      difficulty: "Medium",
      date: "2024-01-08",
      readTime: "35 min",
      tags: ["Web Security", "Directory Traversal", "File Upload"],
      link: "#",
      featured: false,
      points: 180
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20'
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20'
      case 'Hard': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const filteredWriteups = selectedCategory === 'All' 
    ? writeups 
    : writeups.filter(writeup => writeup.category === selectedCategory)

  return (
    <section id="writeups" className="py-20 bg-dark-900">
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
              CTF Writeups & Solutions
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Detailed walkthroughs and solutions for various cybersecurity challenges
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Featured Writeups */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl font-bold text-primary-400 mb-8">
              🔥 Featured Writeups
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {writeups.filter(w => w.featured).map((writeup, index) => (
                <motion.div
                  key={writeup.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-yellow-500 text-sm font-medium">Featured</span>
                  </div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-semibold text-white pr-8">
                      {writeup.title}
                    </h4>
                  </div>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {writeup.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(writeup.difficulty)}`}>
                      {writeup.difficulty}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Clock size={14} />
                      <span className="text-sm">{writeup.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-primary-400">
                      <Target size={14} />
                      <span className="text-sm">{writeup.points} pts</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {writeup.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-dark-700 text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">
                      {writeup.date}
                    </span>
                    <motion.a
                      href={writeup.link}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      <span className="text-sm font-medium">Read Writeup</span>
                      <ExternalLink size={16} />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* All Writeups Grid */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl font-bold text-primary-400 mb-8">
              All Writeups ({filteredWriteups.length})
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWriteups.map((writeup, index) => (
                <motion.div
                  key={writeup.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-primary-400 font-medium">
                      {writeup.category}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(writeup.difficulty)}`}>
                      {writeup.difficulty}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                    {writeup.title}
                  </h4>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {writeup.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{writeup.date}</span>
                    <div className="flex items-center space-x-3">
                      <span>{writeup.readTime}</span>
                      <span>{writeup.points} pts</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {writeup.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-dark-700 text-gray-400 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {writeup.tags.length > 3 && (
                      <span className="px-2 py-1 bg-dark-700 text-gray-500 text-xs rounded">
                        +{writeup.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <motion.a
                    href={writeup.link}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center space-x-2 w-full py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <Eye size={16} />
                    <span>Read More</span>
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Writing Philosophy */}
          <motion.div 
            variants={itemVariants}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                📝 Writing Philosophy
              </h3>
              <p className="text-lg text-white/90 leading-relaxed">
                I believe in sharing knowledge and helping others learn. Each writeup I create 
                is designed to be educational and comprehensive, explaining not just the steps 
                to solve a challenge, but the reasoning behind each technique. My goal is to 
                contribute to the cybersecurity community by making complex concepts accessible 
                to beginners while providing value to more experienced practitioners.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Writeups


