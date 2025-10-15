'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink,
  GraduationCap,
  Briefcase,
  Award,
  Code,
  Shield,
  Calendar,
  User,
  Globe
} from 'lucide-react'

const Resume = () => {
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

  const personalInfo = {
    name: "Ayoub Goubraim",
    title: "Cybersecurity & Pentester Student",
    email: "ayoub.goubraim@ecole.ensicaen.fr",
    phone: "+33 7 53 44 54 36",
    location: "Caen, France",
    github: "https://github.com/AyGoub",
    linkedin: "https://linkedin.com/in/ayoubgoubraim",
    website: "https://aygoub.github.io"
  }

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "Your University",
      location: "Your City, Country",
      period: "2022 - 2026",
      gpa: "3.8/4.0",
      relevant: [
        "Cybersecurity Fundamentals",
        "Network Security",
        "Operating Systems",
        "Database Systems",
        "Software Engineering"
      ]
    }
  ]

  const experience = [
    {
      title: "Cybersecurity Research Assistant",
      company: "University Security Lab",
      location: "Your City, Country",
      period: "Jan 2024 - Present",
      type: "Part-time",
      description: [
        "Assisted in vulnerability research and penetration testing projects",
        "Conducted security assessments on university systems",
        "Collaborated with team members on security tool development",
        "Documented findings and created detailed reports"
      ]
    },
    {
      title: "IT Support Intern",
      company: "Local Tech Company",
      location: "Your City, Country",
      period: "Summer 2023",
      type: "Internship",
      description: [
        "Provided technical support for network infrastructure",
        "Assisted in system administration tasks",
        "Learned about enterprise security practices",
        "Contributed to security awareness training materials"
      ]
    }
  ]

  const certifications = [
    {
      name: "CompTIA Security+",
      issuer: "CompTIA",
      status: "In Progress",
      expiry: "2025",
      description: "Foundation-level cybersecurity certification covering network security, compliance, and threat management."
    },
    {
      name: "TryHackMe Certifications",
      issuer: "TryHackMe",
      status: "Completed",
      expiry: "N/A",
      description: "Multiple learning paths including Complete Beginner, Web Fundamentals, and Network Security."
    }
  ]

  const projects = [
    {
      title: "Automated Vulnerability Scanner",
      technologies: ["Python", "Nmap", "SQLite"],
      description: "Developed a Python-based tool for automated network vulnerability scanning with report generation.",
      link: "https://github.com/AyGoub/vuln-scanner"
    },
    {
      title: "CTF Writeup Platform",
      technologies: ["React", "Node.js", "MongoDB"],
      description: "Created a platform for sharing and organizing CTF writeups with search and filtering capabilities.",
      link: "https://github.com/AyGoub/ctf-writeups"
    },
    {
      title: "Network Security Monitoring Dashboard",
      technologies: ["Python", "Flask", "Wireshark"],
      description: "Built a real-time dashboard for monitoring network traffic and detecting suspicious activities.",
      link: "https://github.com/AyGoub/network-monitor"
    }
  ]

  const skills = {
    technical: [
      "Python", "Bash/Shell Scripting", "JavaScript", "PowerShell",
      "Linux", "Windows", "Kali Linux", "Network Security",
      "Web Application Security", "Penetration Testing", "Vulnerability Assessment"
    ],
    tools: [
      "Burp Suite", "Nmap", "Metasploit", "Wireshark", "Nessus",
      "OWASP ZAP", "John the Ripper", "Hashcat", "Aircrack-ng"
    ],
    soft: [
      "Problem Solving", "Critical Thinking", "Communication",
      "Team Collaboration", "Continuous Learning", "Attention to Detail"
    ]
  }

  return (
    <section id="resume" className="py-20 bg-dark-800">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Resume & CV
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              My professional background and qualifications
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Download size={20} />
              <span>Download PDF</span>
            </motion.button>
          </motion.div>

          {/* Resume Content */}
          <motion.div 
            variants={itemVariants}
            className="bg-dark-700 rounded-lg p-8 border border-dark-600"
          >
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b border-dark-600">
              <h1 className="text-3xl font-bold text-white mb-2">
                {personalInfo.name}
              </h1>
              <p className="text-xl text-primary-400 mb-4">
                {personalInfo.title}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>{personalInfo.location}</span>
                </div>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <a href={personalInfo.github} className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Github size={20} />
                </a>
                <a href={personalInfo.linkedin} className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href={personalInfo.website} className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Globe size={20} />
                </a>
              </div>
            </div>

            {/* Education */}
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-semibold text-primary-400 mb-4 flex items-center">
                <GraduationCap className="w-6 h-6 mr-2" />
                Education
              </h3>
              {education.map((edu, index) => (
                <div key={index} className="bg-dark-600 rounded-lg p-6 mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-white">
                      {edu.degree}
                    </h4>
                    <span className="text-primary-400 font-medium">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2">
                    {edu.school} • {edu.location}
                  </p>
                  <p className="text-gray-400 mb-3">
                    GPA: {edu.gpa}
                  </p>
                  <div>
                    <p className="text-gray-300 font-medium mb-2">Relevant Coursework:</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevant.map((course, courseIndex) => (
                        <span
                          key={courseIndex}
                          className="px-3 py-1 bg-dark-500 text-gray-300 text-sm rounded-full"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Experience */}
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-semibold text-primary-400 mb-4 flex items-center">
                <Briefcase className="w-6 h-6 mr-2" />
                Experience
              </h3>
              {experience.map((exp, index) => (
                <div key={index} className="bg-dark-600 rounded-lg p-6 mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-white">
                      {exp.title}
                    </h4>
                    <span className="text-primary-400 font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2">
                    {exp.company} • {exp.location} • {exp.type}
                  </p>
                  <ul className="space-y-1">
                    {exp.description.map((desc, descIndex) => (
                      <li key={descIndex} className="text-gray-400 flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-semibold text-primary-400 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2" />
                Certifications
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-dark-600 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-white">
                        {cert.name}
                      </h4>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        cert.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {cert.status}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">
                      {cert.issuer}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Projects */}
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-semibold text-primary-400 mb-4 flex items-center">
                <Code className="w-6 h-6 mr-2" />
                Projects
              </h3>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="bg-dark-600 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-white">
                        {project.title}
                      </h4>
                      <a 
                        href={project.link}
                        className="text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    <p className="text-gray-400 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-dark-500 text-gray-300 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-primary-400 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Skills
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.technical.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-500/20 text-primary-400 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Tools & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-dark-500 text-gray-300 text-sm rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.soft.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Resume


