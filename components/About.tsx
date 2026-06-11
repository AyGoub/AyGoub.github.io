'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Target, BookOpen, Users, Award, Zap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { t } = useLanguage()

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

  const interests = [
    { icon: Shield, titleKey: 'about.interests.pentest.title', descKey: 'about.interests.pentest.description' },
    { icon: Target, titleKey: 'about.interests.redTeam.title', descKey: 'about.interests.redTeam.description' },
    { icon: BookOpen, titleKey: 'about.interests.research.title', descKey: 'about.interests.research.description' },
    { icon: Users, titleKey: 'about.interests.community.title', descKey: 'about.interests.community.description' },
    { icon: Award, titleKey: 'about.interests.certifications.title', descKey: 'about.interests.certifications.description' },
    { icon: Zap, titleKey: 'about.interests.innovation.title', descKey: 'about.interests.innovation.description' },
  ]

  return (
    <section id="about" className="py-20 bg-dark-800">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              {t('about.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* About Text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="code-block">
                <p className="terminal-text text-lg mb-4">
                  $ whoami
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {t('about.intro')}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary-400">
                  {t('about.journeyTitle')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('about.journey1')}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {t('about.journey2')}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary-400">
                  {t('about.goalsTitle')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('about.goals')}
                </p>
              </div>
            </motion.div>

            {/* Interests Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.titleKey}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-dark-700 rounded-lg border border-dark-600 hover:border-primary-500 transition-all duration-300 card-hover"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <interest.icon className="w-6 h-6 text-primary-500" />
                    <h4 className="text-lg font-semibold text-white">
                      {t(interest.titleKey)}
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {t(interest.descKey)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Fun Fact */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('about.funFactTitle')}
              </h3>
              <p className="text-lg text-white/90">
                {t('about.funFact')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About


