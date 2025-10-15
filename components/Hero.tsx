'use client'

import { motion } from 'framer-motion'
import { Shield, Terminal, Code, ArrowDown, Github, Linkedin, Mail, User } from 'lucide-react'
import { useI18n } from '@/contexts/I18nContext'
import Image from 'next/image'

const Hero = () => {
  const { t } = useI18n()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]" />
      
      {/* Floating Elements - Simplified */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary-500/20 rounded-full opacity-50" />
      <div className="absolute bottom-20 right-10 w-16 h-16 border border-primary-400/10 rounded-full opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Profile Picture */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                {/* Profile Picture Container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  {/* Placeholder for profile picture */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center border-4 border-primary-400/30 shadow-2xl">
                    {/* You can replace this with your actual image */}
                    
                    {/* Alternative: Use your actual image */}
                    {
                    <Image
                      src="/profile-picture.jpg"
                      alt="AyGoub - Cybersecurity Professional"
                      fill
                      className="rounded-full object-cover"
                      priority
                    />
                    }
                  </div>
                  
                  {/* Floating Elements - Static for Performance */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center border-4 border-dark-900">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center border-4 border-dark-900">
                    <Terminal className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Text Content */}
            <motion.div variants={itemVariants} className="text-center lg:text-left">
              {/* Main Title */}
              <motion.div className="mb-6">
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-4"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                >
                  <span className="gradient-text">Ayoub Goubraim</span>
                </motion.h1>
                <motion.div
                  className="flex items-center justify-center lg:justify-start space-x-4 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Terminal className="w-8 h-8 text-primary-500" />
                  <Shield className="w-8 h-8 text-primary-500" />
                  <Code className="w-8 h-8 text-primary-500" />
                </motion.div>
              </motion.div>

              {/* Subtitle */}
              <motion.h2 
                variants={itemVariants}
                className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6"
              >
                {t('hero_subtitle')}
              </motion.h2>

              {/* Description */}
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed"
              >
                {t('hero_description')}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
              >
                <motion.a
                  href="#about"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 cyber-border"
                >
                  {t('hero_cta_learn_more')}
                </motion.a>
                <motion.a
                  href="#resume"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-semibold rounded-lg transition-all duration-200"
                >
                  {t('hero_cta_view_resume')}
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-center lg:justify-start space-x-6"
              >
                <motion.a
                  href="https://github.com/AyGoub"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 bg-dark-800 hover:bg-primary-600 rounded-full transition-colors duration-200"
                >
                  <Github size={24} className="text-gray-300" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/ayoubgoubraim"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 bg-dark-800 hover:bg-primary-600 rounded-full transition-colors duration-200"
                >
                  <Linkedin size={24} className="text-gray-300" />
                </motion.a>
                <motion.a
                  href="mailto:ayoub.goubraim@ecole.ensicaen.fr"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 bg-dark-800 hover:bg-primary-600 rounded-full transition-colors duration-200"
                >
                  <Mail size={24} className="text-gray-300" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator - Simplified */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <a
            href="#about"
            className="text-primary-400 hover:text-primary-300 transition-colors"
          >
            <ArrowDown size={32} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero


