import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  metadataBase: new URL('https://aygoub.github.io'),
  title: 'AyGoub - Cybersecurity Student & Penetration Tester',
  description: 'Cybersecurity student specializing in penetration testing, TryHackMe achievements, CTF writeups, and security research. Seeking internship opportunities in cybersecurity.',
  keywords: ['cybersecurity', 'penetration testing', 'TryHackMe', 'CTF', 'security researcher', 'internship'],
  authors: [{ name: 'AyGoub' }],
  creator: 'AyGoub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aygoub.github.io',
    title: 'AyGoub - Cybersecurity Student & Penetration Tester',
    description: 'Cybersecurity student specializing in penetration testing, TryHackMe achievements, CTF writeups, and security research.',
    siteName: 'AyGoub Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AyGoub - Cybersecurity Student & Penetration Tester',
    description: 'Cybersecurity student specializing in penetration testing, TryHackMe achievements, CTF writeups, and security research.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
      <GoogleAnalytics gaId="G-7EF2EKQ4M0" />
    </html>
  )
}


