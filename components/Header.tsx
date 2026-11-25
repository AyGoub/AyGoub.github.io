'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
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
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.tryhackme'), href: '#tryhackme' },
    { name: t('nav.writeups'), href: '#writeups' },
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
            <a href="#home" className="font-mono text-base">
              <span className="text-primary-400 font-bold">ayoub@kali</span>
              <span className="text-gray-500">:~$</span>
              <span className="inline-block w-2 h-4 ml-1 align-[-2px] bg-primary-400 animate-pulse" />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 font-mono text-sm">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
              >
                <span className="text-dark-500">./</span>{item.name}
              </motion.a>
            ))}
          </div>

          {/* Right side: Language toggle + Mobile menu button */}
          <div className="flex items-center space-x-3">
            <a
              href={t('resume.cvFile')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block font-mono text-sm px-3 py-1 rounded border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-dark-900 transition-colors"
            >
              cv.pdf
            </a>
            {/* Language Toggle */}
            <div className="flex items-center border border-dark-600 rounded overflow-hidden text-xs font-mono">
              <button
                onClick={() => language !== 'en' && toggleLanguage()}
                className={`px-3 py-1 transition-colors duration-200 ${
                  language === 'en'
                    ? 'bg-primary-500 text-dark-900'
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
                    ? 'bg-primary-500 text-dark-900'
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
              className="lg:hidden p-2 text-gray-300 hover:text-primary-400 transition-colors"
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
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 font-mono text-gray-300 hover:text-primary-400 transition-colors"
              >
                <span className="text-dark-500">./</span>{item.name}
              </a>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Header
