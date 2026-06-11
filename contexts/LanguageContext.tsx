'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import translations, { Language } from '@/locales/translations'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const toggleLanguage = () => setLanguage(l => (l === 'en' ? 'fr' : 'en'))

  const t = (key: string): string => {
    const keys = key.split('.')
    let result: unknown = translations[language]
    for (const k of keys) {
      if (typeof result !== 'object' || result === null) return key
      result = (result as Record<string, unknown>)[k]
    }
    return typeof result === 'string' ? result : key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
