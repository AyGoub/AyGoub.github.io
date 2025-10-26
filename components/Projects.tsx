'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { 
  FolderGit2, 
  Calendar, 
  Code, 
  ExternalLink,
  Github,
  Star,
  GitFork,
  ArrowRight
} from 'lucide-react'
import { projects } from '@/data/projects'

const Projects = () => {
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Cybersecurity': return 'text-red-400 bg-red-400/20'
      case 'Web Development': return 'text-blue-400 bg-blue-400/20'
      case 'Network Security': return 'text-purple-400 bg-purple-400/20'
      case 'System Programming': return 'text-green-400 bg-green-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  return (
    <section id="projects" className="py-20 bg-dark-800">
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
              Academic Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Projects developed during my academic journey, showcasing technical skills and problem-solving abilities
            </p>
          </motion.div>

          {/* Featured Projects */}
          {projects.filter(p => p.featured).length > 0 && (
            <motion.div variants={itemVariants} className="mb-16">
              <h3 className="text-2xl font-bold text-primary-400 mb-8">
                ⭐ Featured Projects
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {projects.filter(p => p.featured).map((project, index) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-dark-900 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-all duration-300 relative overflow-hidden cursor-pointer h-full"
                    >
                      <div className="absolute top-4 right-4">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      </div>
                      
                      <div className="flex items-center space-x-3 mb-4">
                        <FolderGit2 className="w-6 h-6 text-primary-500" />
                        <h4 className="text-xl font-semibold text-white">
                          {project.title}
                        </h4>
                      </div>
                      
                      <p className="text-gray-400 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {project.date}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-dark-700 text-gray-300 text-xs rounded flex items-center space-x-1"
                          >
                            <Code className="w-3 h-3" />
                            <span>{tech}</span>
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-dark-700 text-gray-500 text-xs rounded">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {project.github && (
                            <span className="flex items-center space-x-2 text-gray-400 text-sm">
                              <Github className="w-4 h-4" />
                              <span>Code</span>
                            </span>
                          )}
                          {project.demo && (
                            <span className="flex items-center space-x-2 text-gray-400 text-sm">
                              <ExternalLink className="w-4 h-4" />
                              <span>Demo</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-primary-400 text-sm font-medium">
                          <span>Learn more</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* All Projects */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-primary-400 mb-8">
              All Projects ({projects.length})
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="bg-dark-900 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-all duration-300 cursor-pointer h-full"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <FolderGit2 className="w-5 h-5 text-primary-500" />
                      <h4 className="text-lg font-semibold text-white line-clamp-1">
                        {project.title}
                      </h4>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                      <span className="text-gray-500 text-xs">{project.date}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-dark-700 text-gray-400 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-dark-700 text-gray-500 text-xs rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {project.github && (
                          <span className="flex items-center space-x-1 text-gray-400 text-sm">
                            <Github className="w-4 h-4" />
                            <span>Code</span>
                          </span>
                        )}
                        {project.demo && (
                          <span className="flex items-center space-x-1 text-gray-400 text-sm">
                            <ExternalLink className="w-4 h-4" />
                            <span>Demo</span>
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary-400" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Projects Philosophy */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                💡 Project Approach
              </h3>
              <p className="text-lg text-white/90 leading-relaxed">
                Each project represents a learning opportunity where I apply theoretical knowledge 
                to practical problems. Through these projects, I've developed strong problem-solving 
                skills, learned to work with various technologies, and gained experience in delivering 
                complete solutions from concept to implementation.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
