'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Github, Linkedin, Twitter, Send, CheckCircle, Calendar } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { SectionHeader, Window } from '@/components/term'

const EMAIL = 'ayoub.goubraim@ecole.ensicaen.fr'

const Contact = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(false)
    
    try {
      
      const serviceID = 'service_k6c6x68' 
      const templateID = 'template_f9chp09' 
      const publicKey = 'eWMLkbKhIU0-t0ybf'
      
      // Envoi de l'email via EmailJS
      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'ayoubporfolio@gmail.com', // Votre email de réception
        },
        publicKey
      )
      
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', email: '', subject: '', message: '' })
      }, 3000)
      
    } catch (error) {
      console.error('Send error:', error)
      setIsSubmitting(false)
      setError(true)
    }
  }

  const contactInfo: [string, string, string][] = [
    ['email', EMAIL, `mailto:${EMAIL}`],
    ['phone', '+33 7 53 44 54 36', 'tel:+33753445436'],
    ['location', 'Caen, France', ''],
  ]

  const socialLinks = [
    { icon: Github, label: 'GitHub', link: 'https://github.com/AyGoub' },
    { icon: Linkedin, label: 'LinkedIn', link: 'https://linkedin.com/in/ayoubgoubraim' },
    { icon: Twitter, label: 'Twitter', link: 'https://twitter.com/aygoub' },
  ]

  const fields: { name: 'name' | 'email' | 'subject'; type: string; label: string; placeholder: string }[] = [
    { name: 'name', type: 'text', label: t('contact.name'), placeholder: t('contact.namePlaceholder') },
    { name: 'email', type: 'email', label: t('contact.email'), placeholder: t('contact.emailPlaceholder') },
    { name: 'subject', type: 'text', label: t('contact.subject'), placeholder: t('contact.subjectPlaceholder') },
  ]

  return (
    <section id="contact" className="py-20 bg-dark-900 border-t border-dark-700">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader cmd="./contact.sh" title={t('contact.title')} lead={t('contact.subtitle')} />

          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-6 items-start">
            <div className="space-y-5">
              <div>
                <h3 className="section-subtitle !text-xl mb-2">{t('contact.connectTitle')}</h3>
                <p className="text-gray-400 leading-relaxed">{t('contact.connectDesc')}</p>
              </div>

              <Window title="cat ~/.contact" bodyClassName="p-4 bg-[#050806] font-mono text-sm space-y-2">
                {contactInfo.map(([key, value, link]) => (
                  <div key={key} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-2">
                    <span className="text-amber-300">{t(`contact.${key === 'email' ? 'email' : key === 'phone' ? 'phoneLabel' : 'locationLabel'}`).toLowerCase()}</span>
                    {link ? (
                      <a href={link} className="text-sky-400 hover:text-sky-300 underline underline-offset-4 break-all">{value}</a>
                    ) : (
                      <span className="text-gray-300">{value}</span>
                    )}
                  </div>
                ))}
              </Window>

              <div>
                <p className="font-mono text-sm text-dark-400 mb-2">{t('contact.followMe')}</p>
                <div className="flex gap-2">
                  {socialLinks.map(social => (
                    <a
                      key={social.label}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="btn-ghost !px-3"
                    >
                      <social.icon className="w-4 h-4" /> <span className="text-sm">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-l-2 border-primary-500/50 pl-4">
                <p className="font-mono text-sm text-primary-400 mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" /> {t('contact.available')}
                </p>
                <p className="text-sm text-gray-400">{t('contact.availableDesc')}</p>
                <p className="text-sm text-gray-300 mt-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary-400" /> {t('contact.availableDate')}
                </p>
              </div>
            </div>

            <Window title={`./send_message.sh — ${t('contact.sendMessage')}`} bodyClassName="p-5 md:p-6">
              {isSubmitted ? (
                <div className="py-10 text-center font-mono">
                  <CheckCircle className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                  <p className="text-primary-300 font-bold mb-1">[+] {t('contact.successTitle')}</p>
                  <p className="text-gray-400 text-sm">{t('contact.successDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {fields.slice(0, 2).map(f => (
                      <div key={f.name}>
                        <label htmlFor={f.name} className="block font-mono text-sm text-gray-300 mb-1.5">
                          <span className="text-primary-500">--</span>{f.label.toLowerCase()}
                        </label>
                        <input id={f.name} name={f.name} type={f.type} value={formData[f.name]} onChange={handleInputChange} required placeholder={f.placeholder} className="term-input" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="subject" className="block font-mono text-sm text-gray-300 mb-1.5">
                      <span className="text-primary-500">--</span>{fields[2].label.toLowerCase()}
                    </label>
                    <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleInputChange} required placeholder={fields[2].placeholder} className="term-input" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block font-mono text-sm text-gray-300 mb-1.5">
                      <span className="text-primary-500">--</span>{t('contact.message').toLowerCase()}
                    </label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} placeholder={t('contact.messagePlaceholder')} className="term-input resize-none" />
                  </div>

                  {error && (
                    <p role="alert" className="font-mono text-sm text-red-400">
                      [!] {t('ui.sendError')} <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a>
                    </p>
                  )}

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full !py-3">
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" />
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> {t('contact.send')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </Window>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
