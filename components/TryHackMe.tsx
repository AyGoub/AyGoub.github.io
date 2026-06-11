'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Trophy,
  Star,
  Target,
  BookOpen,
  Calendar,
  ExternalLink,
  TrendingUp,
  Award,
  Shield,
  Zap
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const TryHackMe = () => {
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

  // Sample data - replace with your actual TryHackMe data
  const [stats, setStats] = useState({
    rank: 64461,
    totalRooms: 750,
    completedRooms: 119,
    totalPoints: 18000,
    streak: 118,
    badges: 21
  })

  const learningPaths = [
    {
      title: "Pre Security",
      progress: 100,
      rooms: 18,
      completed: 18,
      difficulty: "Easy",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Web Fundamentals",
      progress: 100,
      rooms: 28,
      completed: 28,
      difficulty: "Easy",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Cyber Security 101",
      progress: 100,
      rooms: 54,
      completed: 54,
      difficulty: "Medium",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Jr Penetration Tester",
      progress: 100,
      rooms: 39,
      completed: 39,
      difficulty: "Medium",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Web Application Pentesting",
      progress: 18,
      rooms: 29,
      completed: 4,
      difficulty: "Medium",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Red Teaming",
      progress: 18,
      rooms: 36,
      completed: 5,
      difficulty: "Hard",
      color: "from-purple-500 to-pink-500"
    }
  ]

  const achievements = [
    {
      icon: Trophy,
      titleKey: 'tryhackme.achievements.streak.title',
      value: `${stats.streak} days`,
      descKey: 'tryhackme.achievements.streak.description',
    },
    {
      icon: Target,
      titleKey: 'tryhackme.achievements.rooms.title',
      value: `${stats.completedRooms}/${stats.totalRooms}`,
      descKey: 'tryhackme.achievements.rooms.description',
    },
    {
      icon: Star,
      titleKey: 'tryhackme.achievements.points.title',
      value: stats.totalPoints.toLocaleString() + '+',
      descKey: 'tryhackme.achievements.points.description',
    },
    {
      icon: Award,
      titleKey: 'tryhackme.achievements.badges.title',
      value: stats.badges,
      descKey: 'tryhackme.achievements.badges.description',
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20'
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20'
      case 'Hard': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  return (
    <section id="tryhackme" className="py-20 bg-dark-800">
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
              {t('tryhackme.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
              {t('tryhackme.subtitle')}
            </p>
            <motion.a
              href="https://tryhackme.com/p/AyGoub"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <span>{t('tryhackme.viewProfile')}</span>
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.titleKey}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-dark-700 rounded-lg p-6 text-center border border-dark-600 hover:border-primary-500 transition-all duration-300"
              >
                <achievement.icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-1">
                  {achievement.value}
                </h3>
                <p className="text-gray-300 font-medium mb-1">
                  {t(achievement.titleKey)}
                </p>
                <p className="text-gray-400 text-sm">
                  {t(achievement.descKey)}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Learning Paths */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-3xl font-bold text-center gradient-text mb-8">
              {t('tryhackme.pathsTitle')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {learningPaths.map((path, index) => (
                <motion.div
                  key={path.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-dark-700 rounded-lg p-6 border border-dark-600 hover:border-primary-500 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold text-white">
                      {path.title}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(path.difficulty)}`}>
                      {t(`tryhackme.difficulty.${path.difficulty}`)}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>{t('tryhackme.progress')}: {path.completed}/{path.rooms} {t('tryhackme.rooms')}</span>
                      <span>{path.progress}%</span>
                    </div>
                    <div className="w-full bg-dark-600 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${path.progress}%` } : { width: 0 }}
                        transition={{ 
                          delay: 0.7 + index * 0.1,
                          duration: 1.5,
                          ease: "easeOut"
                        }}
                        className={`h-3 rounded-full bg-gradient-to-r ${path.color}`}
                      />
                    </div>
                  </div>
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
                {t('tryhackme.philosophyTitle')}
              </h3>
              <p className="text-lg text-white/90 leading-relaxed">
                {t('tryhackme.philosophy')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TryHackMe


