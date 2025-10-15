'use client'

import { lazy, Suspense } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'

// Lazy load components for better performance
const About = lazy(() => import('@/components/About'))
const Skills = lazy(() => import('@/components/Skills'))
const Certifications = lazy(() => import('@/components/Certifications'))
const TryHackMe = lazy(() => import('@/components/TryHackMe'))
const Writeups = lazy(() => import('@/components/Writeups'))
const Resume = lazy(() => import('@/components/Resume'))
const Contact = lazy(() => import('@/components/Contact'))
const Footer = lazy(() => import('@/components/Footer'))

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Header />
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Certifications />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <TryHackMe />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Writeups />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Resume />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </main>
  )
}


