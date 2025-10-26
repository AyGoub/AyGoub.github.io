'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { 
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  Github,
  ExternalLink,
  Code,
  CheckCircle,
  Target,
  Lightbulb,
  TrendingUp,
  X,
  ZoomIn,
  FileText
} from 'lucide-react'
import { Project } from '@/data/projects'
import ReactMarkdown from 'react-markdown'

interface ProjectDetailProps {
  project: Project
}

const ProjectDetailClient = ({ project }: ProjectDetailProps) => {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
    <div className="min-h-screen bg-dark-900 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-primary-400 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImage}
              alt="Full size preview"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/#projects')}
          className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Projects</span>
        </motion.button>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
              {project.category}
            </span>
            {project.featured && (
              <span className="px-4 py-2 rounded-full text-sm font-medium text-yellow-400 bg-yellow-400/20">
                ⭐ Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            {project.title}
          </h1>

          <p className="text-xl text-gray-400 mb-8">
            {project.description}
          </p>

          {/* Project Meta Info */}
          <div className="flex flex-wrap gap-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary-500" />
              <span>{project.date}</span>
            </div>
            {project.duration && (
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary-500" />
                <span>{project.duration}</span>
              </div>
            )}
            {project.teamSize && (
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary-500" />
                <span>{project.teamSize} {project.teamSize > 1 ? 'members' : 'member'}</span>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4 mt-6">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 px-6 py-3 bg-dark-800 border border-dark-700 hover:border-primary-500 rounded-lg text-white transition-all"
              >
                <Github className="w-5 h-5" />
                <span>View Code</span>
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg text-white transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View Demo</span>
              </motion.a>
            )}
            {project.report && (
              <motion.a
                href={project.report}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 px-6 py-3 bg-dark-800 border border-dark-700 hover:border-primary-500 rounded-lg text-white transition-all"
              >
                <FileText className="w-5 h-5" />
                <span>View Report</span>
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
            <Code className="w-6 h-6 text-primary-500" />
            <span>Technologies Used</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-dark-800 border border-dark-700 text-gray-300 rounded-lg hover:border-primary-500 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Project Images */}
        {project.images && project.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedImage(image)}
                  className="relative aspect-video bg-dark-800 rounded-lg overflow-hidden border border-dark-700 cursor-pointer group"
                >
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23374151" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage coming soon%3C/text%3E%3C/svg%3E'
                    }}
                  />
                  {/* Zoom overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-12 h-12 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Long Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-white mb-6">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-white mb-4 mt-8">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-white mb-3 mt-6">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-400 mb-4 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-400 mb-4 space-y-2">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-400">{children}</li>
                ),
                code: ({ children }) => (
                  <code className="bg-dark-800 px-2 py-1 rounded text-primary-400">{children}</code>
                ),
              }}
            >
              {project.longDescription}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* Challenges, Solutions, Outcomes */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-dark-800 rounded-lg p-6 border border-dark-700"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-bold text-white">Challenges</h3>
              </div>
              <ul className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="text-gray-400 text-sm leading-relaxed">
                    {challenge}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Solutions */}
          {project.solutions && project.solutions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-dark-800 rounded-lg p-6 border border-dark-700"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Solutions</h3>
              </div>
              <ul className="space-y-3">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="text-gray-400 text-sm leading-relaxed">
                    {solution}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Outcomes */}
          {project.outcomes && project.outcomes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-dark-800 rounded-lg p-6 border border-dark-700"
            >
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">Outcomes</h3>
              </div>
              <ul className="space-y-3">
                {project.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start space-x-2 text-gray-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Back to Projects CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <button
            onClick={() => router.push('/#projects')}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 rounded-lg text-white font-semibold transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to All Projects</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectDetailClient
