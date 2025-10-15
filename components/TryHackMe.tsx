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

const TryHackMe = () => {
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

  // Sample data - replace with your actual TryHackMe data
  const [stats, setStats] = useState({
    rank: 15000,
    totalRooms: 45,
    completedRooms: 32,
    totalPoints: 2840,
    streak: 15,
    badges: 8
  })

  const learningPaths = [
    {
      title: "Complete Beginner",
      progress: 100,
      rooms: 12,
      completed: 12,
      difficulty: "Easy",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Web Fundamentals",
      progress: 85,
      rooms: 20,
      completed: 17,
      difficulty: "Medium",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Network Security",
      progress: 70,
      rooms: 15,
      completed: 11,
      difficulty: "Medium",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Penetration Testing",
      progress: 45,
      rooms: 25,
      completed: 11,
      difficulty: "Hard",
      color: "from-red-500 to-red-600"
    }
  ]

  const achievements = [
    {
      icon: Trophy,
      title: "Learning Streak",
      value: `${stats.streak} days`,
      description: "Consistent daily learning"
    },
    {
      icon: Target,
      title: "Rooms Completed",
      value: `${stats.completedRooms}/${stats.totalRooms}`,
      description: "CTF challenges solved"
    },
    {
      icon: Star,
      title: "Total Points",
      value: stats.totalPoints.toLocaleString(),
      description: "Earned through challenges"
    },
    {
      icon: Award,
      title: "Badges Earned",
      value: stats.badges,
      description: "Achievement badges"
    }
  ]

  const recentRooms = [
    {
      name: "Vulnversity",
      difficulty: "Easy",
      category: "Web Application Security",
      completed: "2024-01-15",
      points: 120
    },
    {
      name: "Blue",
      difficulty: "Easy",
      category: "Windows Privilege Escalation",
      completed: "2024-01-14",
      points: 100
    },
    {
      name: "Ice",
      difficulty: "Medium",
      category: "Web Application Security",
      completed: "2024-01-13",
      points: 150
    },
    {
      name: "LazyAdmin",
      difficulty: "Easy",
      category: "Linux Privilege Escalation",
      completed: "2024-01-12",
      points: 110
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
              TryHackMe Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
              My learning progress and achievements on TryHackMe
            </p>
            <motion.a
              href="https://tryhackme.com/p/AyGoub"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <span>View my TryHackMe profile</span>
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
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
                  {achievement.title}
                </p>
                <p className="text-gray-400 text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Learning Paths */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-3xl font-bold text-center gradient-text mb-8">
              Learning Paths Progress
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
                      {path.difficulty}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>Progress: {path.completed}/{path.rooms} rooms</span>
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

          {/* Recent Rooms */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-3xl font-bold text-center gradient-text mb-8">
              Recent Room Completions
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentRooms.map((room, index) => (
                <motion.div
                  key={room.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-dark-700 rounded-lg p-6 border border-dark-600 hover:border-primary-500 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white">
                      {room.name}
                    </h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(room.difficulty)}`}>
                      {room.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3">
                    {room.category}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>{room.points} points</span>
                    <span>{room.completed}</span>
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
                🎯 Learning Philosophy
              </h3>
              <p className="text-lg text-white/90 leading-relaxed">
                TryHackMe has been instrumental in my cybersecurity journey, providing hands-on 
                experience with real-world scenarios. Each room I complete teaches me something new 
                about security concepts, tools, and techniques. I believe in learning by doing, 
                and TryHackMe's interactive approach perfectly aligns with this philosophy.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TryHackMe


