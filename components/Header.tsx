'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.certifications'), href: '#certifications' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.tryhackme'), href: '#tryhackme' },
    { name: t('nav.writeups'), href: '#writeups' },
    { name: t('nav.resume'), href: '#resume' },
    { name: t('nav.contact'), href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-700'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Shield className="w-8 h-8 text-primary-500" />
            <span className="text-xl font-bold gradient-text">AyGoub</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-300 hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Right side: Language toggle + Mobile menu button */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <div className="flex items-center border border-dark-600 rounded-full overflow-hidden text-sm font-medium">
              <button
                onClick={() => language !== 'en' && toggleLanguage()}
                className={`px-3 py-1 transition-colors duration-200 ${
                  language === 'en'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:text-primary-400'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => language !== 'fr' && toggleLanguage()}
                className={`px-3 py-1 transition-colors duration-200 ${
                  language === 'fr'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:text-primary-400'
                }`}
                aria-label="Passer en français"
              >
                FR
              </button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-primary-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0,
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-300 hover:text-primary-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Header
