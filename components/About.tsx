'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Target, BookOpen, Users, Award, Zap } from 'lucide-react'

const About = () => {
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

  const interests = [
    {
      icon: Shield,
      title: "Penetration Testing",
      description: "Ethical hacking and vulnerability assessment"
    },
    {
      icon: Target,
      title: "Red Team Operations",
      description: "Simulating real-world cyber attacks"
    },
    {
      icon: BookOpen,
      title: "Security Research",
      description: "Staying updated with latest threats and defenses"
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Active in cybersecurity communities and CTFs"
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Pursuing industry-recognized certifications"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Developing creative security solutions"
    }
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
              whoami
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Get to know me better and understand my passion for cybersecurity
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
                  I'm a passionate cybersecurity student with a deep fascination for 
                  understanding how systems can be secured and how attackers think. 
                  My journey began with curiosity about how things work under the hood, 
                  which naturally led me to the world of cybersecurity.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary-400">
                  My Journey
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Starting with basic programming and system administration, I discovered 
                  my passion for security through TryHackMe's interactive learning platform. 
                  The hands-on approach to learning penetration testing, network security, 
                  and ethical hacking captivated me from day one.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Now, I'm actively pursuing knowledge in areas like web application 
                  security, network penetration testing, and red team methodologies. 
                  I believe that understanding both offensive and defensive security 
                  is crucial for building robust security solutions.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary-400">
                  Goals & Aspirations
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm actively seeking internship opportunities where I can apply my 
                  theoretical knowledge to real-world scenarios. My goal is to become 
                  a skilled penetration tester who can help organizations identify and 
                  remediate security vulnerabilities before malicious actors exploit them.
                </p>
              </div>
            </motion.div>

            {/* Interests Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-dark-700 rounded-lg border border-dark-600 hover:border-primary-500 transition-all duration-300 card-hover"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <interest.icon className="w-6 h-6 text-primary-500" />
                    <h4 className="text-lg font-semibold text-white">
                      {interest.title}
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {interest.description}
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
                🎯 Fun Fact
              </h3>
              <p className="text-lg text-white/90">
                I spend my free time participating in CTF competitions and writing 
                detailed writeups to help other cybersecurity enthusiasts learn. 
                My favorite part of cybersecurity is the constant learning - 
                there's always something new to discover!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About


