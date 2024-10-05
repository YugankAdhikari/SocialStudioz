'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Send, Instagram, Twitter, Linkedin, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Component() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true)  // Set dark mode as default
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const portfolioRef = useRef(null)
  const testimonialsRef = useRef(null)
  const contactRef = useRef(null)

  const sectionRefs = {
    home: homeRef,
    about: aboutRef,
    services: servicesRef,
    portfolio: portfolioRef,
    testimonials: testimonialsRef,
    contact: contactRef,
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      const currentPosition = window.scrollY + 100 // Offset for better accuracy

      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current && ref.current.offsetTop <= currentPosition && 
            ref.current.offsetTop + ref.current.offsetHeight > currentPosition) {
          setActiveSection(key)
        }
      })
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const section = sectionRefs[sectionId].current
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-black via-black to-blue-900' : 'bg-gradient-to-br from-blue-100 via-blue-200 to-white'} ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-300 relative overflow-hidden`}>
      {/* Dark overlay */}
      <div className={`fixed inset-0 z-10 pointer-events-none ${isDarkMode ? 'bg-black opacity-40' : 'bg-black opacity-20'}`} />
      
      {/* Cursor light effect */}
      <div
        className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, transparent, ${isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.4)'} 80%)`,
        }}
      />
      
      {/* Cursor illumination effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, ${isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)'}, transparent 80%)`,
        }}
      />

      <header className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'} backdrop-blur-md`}>
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              Social Studios
            </motion.div>
            <motion.ul
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="flex items-center space-x-6"
            >
              {['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'].map((item) => (
                <motion.li key={item} whileHover={{ scale: 1.1 }}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className={`hover:text-blue-500 transition-colors ${activeSection === item ? 'text-blue-500' : ''}`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </motion.li>
              ))}
              <motion.li whileHover={{ scale: 1.1 }}>
                <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </motion.li>
            </motion.ul>
          </div>
        </nav>
      </header>

      <main className="relative z-40">
        <section ref={homeRef} id="home" className={`min-h-screen flex items-center justify-center relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-black via-black to-blue-900' : 'bg-gradient-to-br from-blue-100 via-blue-200 to-white'}`}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10"
          >
            <h1 className="text-6xl font-bold mb-4">Welcome to Social Studios</h1>
            <p className="text-xl mb-8">Crafting Digital Experiences That Inspire</p>
            <Button size="lg" className={`${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              Get Started
            </Button>
          </motion.div>
          <motion.div
            className="absolute inset-0 z-0"
            animate={{
              scale: 1 + scrollY * 0.0005,
              opacity: 1 - scrollY * 0.002,
            }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 1920 1080"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="960" cy="540" r="400" fill={isDarkMode ? "#1E3A8A" : "#3B82F6"} fillOpacity="0.1" />
              <circle cx="960" cy="540" r="300" fill={isDarkMode ? "#1E3A8A" : "#3B82F6"} fillOpacity="0.15" />
              <circle cx="960" cy="540" r="200" fill={isDarkMode ? "#1E3A8A" : "#3B82F6"} fillOpacity="0.2" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={40} />
          </motion.div>
        </section>

        <section ref={aboutRef} id="about" className={`py-20 ${isDarkMode ? 'bg-black bg-opacity-80' : 'bg-blue-100'}`}>
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-8 text-center"
            >
              About Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-center max-w-2xl mx-auto"
            >
              Social Studios is a cutting-edge digital agency specializing in creating immersive social media experiences. Our team of creative minds and tech wizards work together to bring your brand's vision to life in the digital realm.
            </motion.p>
          </div>
        </section>

        <section ref={servicesRef} id="services" className="py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity : 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-12 text-center"
            >
              Our Services
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Social Media Management', icon: '🚀' },
                { title: 'Content Creation', icon: '🎨' },
                { title: 'Influencer Campaigns', icon: '🌟' },
                { title: 'Brand Strategy', icon: '💡' },
                { title: 'Analytics & Reporting', icon: '📊' },
                { title: 'Community Engagement', icon: '🤝' },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${isDarkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-white'} p-6 rounded-lg backdrop-blur-sm hover:shadow-lg transition-all`}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={portfolioRef} id="portfolio" className={`py-20 ${isDarkMode ? 'bg-black bg-opacity-80' : 'bg-blue-100'}`}>
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-12 text-center"
            >
              Our Portfolio
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden rounded-lg aspect-video"
                >
                  <div className={`w-full h-full ${isDarkMode ? 'bg-blue-900' : 'bg-blue-200'} flex items-center justify-center`}>
                    <span className="text-4xl">Project {item}</span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-semibold">Project {item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={testimonialsRef} id="testimonials" className="py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-12 text-center"
            >
              What Our Clients Say
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'John Doe', role: 'CEO, TechCorp' },
                { name: 'Jane Smith', role: 'Marketing Director, FashionBrand' },
                { name: 'Alex Johnson', role: 'Influencer' },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${isDarkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-white'} p-6 rounded-lg backdrop-blur-sm `}
                >
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.role}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={contactRef} id="contact" className={`py-20 ${isDarkMode ? 'bg-black bg-opacity-80' : 'bg-blue-100'}`}>
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-12 text-center"
            >
              Get In Touch
            </motion.h2>
            <div className="max-w-md mx-auto">
              <form className="space-y-4">
                <Input type="text" placeholder="Your Name" className={`${isDarkMode ? 'bg-blue-900 bg-opacity-20 text-white' : 'bg-white text-gray-800'} placeholder-gray-400 border-none`} />
                <Input type="email" placeholder="Your Email" className={`${isDarkMode ? 'bg-blue-900 bg-opacity-20 text-white' : 'bg-white text-gray-800'}  placeholder-gray-400 border-none`} />
                <Textarea placeholder="Your Message" className={`${isDarkMode ? 'bg-blue-900 bg-opacity-20 text-white' : 'bg-white text-gray-800'}  placeholder-gray-400 border-none`} />
                <Button className={`w-full ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={`${isDarkMode ? 'bg-black bg-opacity-80' : 'bg-blue-200'} py-8 relative z-40`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">Social Studios</div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Instagram />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Linkedin />
              </a>
            </div>
          </div>
          <div className={`mt-8 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; {new Date().getFullYear()} Social Studios. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}