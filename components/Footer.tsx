'use client'

import { motion } from 'framer-motion'
import { Shield, Heart, ArrowUp } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-dark-800 border-t border-dark-700">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 mb-4"
              >
                <Shield className="w-8 h-8 text-primary-500" />
                <span className="text-xl font-bold gradient-text">AyGoub</span>
              </motion.div>
              <p className="text-gray-400 leading-relaxed">
                Cybersecurity student passionate about penetration testing, 
                vulnerability assessment, and securing digital infrastructure.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-primary-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#skills" className="text-gray-400 hover:text-primary-400 transition-colors">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#tryhackme" className="text-gray-400 hover:text-primary-400 transition-colors">
                    TryHackMe
                  </a>
                </li>
                <li>
                  <a href="#writeups" className="text-gray-400 hover:text-primary-400 transition-colors">
                    Writeups
                  </a>
                </li>
                <li>
                  <a href="#resume" className="text-gray-400 hover:text-primary-400 transition-colors">
                    Resume
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
              <div className="space-y-2 text-gray-400">
                <p>ayoub.goubraim@ecole.ensicaen.fr</p>
                <p>Available for internships</p>
                <p>March 2026</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-dark-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </motion.div>
                <span>by AyGoub</span>
              </div>

              <div className="flex items-center space-x-6">
                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <ArrowUp className="w-4 h-4" />
                  <span>Back to top</span>
                </motion.button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-dark-700">
              <p className="text-center text-gray-500 text-sm">
                © 2025 AyGoub. All rights reserved. | Built with Next.js, TypeScript, and Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


