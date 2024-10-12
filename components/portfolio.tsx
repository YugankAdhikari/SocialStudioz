'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Send, Instagram, Twitter, Linkedin, Sun, Moon, Menu, X, Check, Globe, Share2, Video } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || '';

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [clickedCard, setClickedCard] = useState<string | null>(null)

  const homeRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const portfolioRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const sectionRefs = useMemo(() => ({
    home: homeRef,
    about: aboutRef,
    services: servicesRef,
    portfolio: portfolioRef,
    testimonials: testimonialsRef,
    pricing: pricingRef,
    contact: contactRef,
  }), [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      const currentPosition = window.scrollY + window.innerHeight / 2

      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current && ref.current.offsetTop <= currentPosition && 
            ref.current.offsetTop + ref.current.offsetHeight > currentPosition) {
          setActiveSection(key)
        }
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [sectionRefs])

  useEffect(() => {
    if (EMAILJS_USER_ID) {
      emailjs.init(EMAILJS_USER_ID);
    }
  }, []);

  useEffect(() => {
    console.log('EMAILJS_SERVICE_ID:', EMAILJS_SERVICE_ID);
    console.log('EMAILJS_TEMPLATE_ID:', EMAILJS_TEMPLATE_ID);
    console.log('EMAILJS_USER_ID:', EMAILJS_USER_ID);
  }, []);

  const scrollToSection = (sectionId: keyof typeof sectionRefs) => {
    const section = sectionRefs[sectionId].current
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode)
  }

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_USER_ID) {
      console.error('EmailJS configuration is missing');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        e.currentTarget,
        EMAILJS_USER_ID
      );
      console.log('EmailJS result:', result);
      setSubmitStatus('success');
      if (formRef.current) formRef.current.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCardStyle = (cardId: string) => {
    const isHovered = hoveredCard === cardId
    const isClicked = clickedCard === cardId
    
    if (isDarkMode) {
      if (isHovered || isClicked) {
        return {
          background: 'linear-gradient(135deg, #4B0082, #000000)',
          color: 'white',
          transition: 'all 0.3s ease-in-out',
        }
      }
      return {
        background: 'rgba(30, 58, 138, 0.2)',
        transition: 'all 0.3s ease-in-out',
      }
    } else {
      if (isHovered) {
        return {
          background: 'linear-gradient(135deg, #3B82F6, #93C5FD)',
          color: 'white',
          transition: 'all 0.3s ease-in-out',
        }
      }
      if (isClicked) {
        return {
          background: 'linear-gradient(135deg, #2563EB, #60A5FA)',
          color: 'white',
          transition: 'all 0.3s ease-in-out',
        }
      }
      return {
        background: 'white',
        transition: 'all 0.3s ease-in-out',
      }
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-black via-black to-blue-900' : 'bg-gradient-to-br from-blue-100 via-blue-200 to-white'} ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-300 relative overflow-hidden`}>
      <div className={`fixed inset-0 z-10 pointer-events-none ${isDarkMode ? 'bg-black opacity-40' : 'bg-black opacity-20'}`} />
      
      <div
        className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, transparent, ${isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.4)'} 80%)`,
        }}
      />
      
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
              Social Studioz
            </motion.div>
            <div className="hidden md:flex items-center space-x-6">
              {['home', 'about', 'services', 'portfolio', 'testimonials', 'pricing', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item as keyof typeof sectionRefs)}
                  className={`hover:text-blue-500 transition-colors ${activeSection === item ? 'text-blue-500' : ''}`}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.button>
              ))}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
                whileHover={{ scale: 1.1 }}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>
            <button onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className={`fixed inset-y-0 right-0 z-50 w-64 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 shadow-lg`}
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                <X />
              </button>
            </div>
            <div className="flex flex-col space-y-4 mt-8">
              {['home', 'about', 'services', 'portfolio', 'testimonials', 'pricing', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item as keyof typeof sectionRefs)}
                  className={`text-left hover:text-blue-500 transition-colors ${activeSection === item ? 'text-blue-500' : ''}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="md:hidden fixed bottom-20 right-4 z-50">
        <motion.button
          onClick={toggleTheme}
          className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </motion.button>
      </div>

      <main className="relative z-40 pb-16">
        <section ref={homeRef} id="home" className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-black via-black to-blue-900' : 'bg-gradient-to-br from-blue-100 via-blue-200 to-white'}`}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10 px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Social Studioz</h1>
            <p className="text-lg md:text-xl mb-8">Empowering startups to thrive digitally</p>
            <Button 
              size="lg" 
              className={`${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              onClick={() => window.open("https://www.instagram.com/socialstudioz1/profilecard/?igsh=bDJlOHBpcmZ5bGs2", "_blank", "noopener,noreferrer")}
            >
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
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center h-24">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-center"
            >
              <ChevronDown className="w-10 h-10 mx-auto" />
            </motion.div>
          </div>
        </section>

        <section ref={aboutRef} id="about" className={`py-20 ${isDarkMode ? 'bg-black bg-opacity-80' : 'bg-blue-100'}`}>
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
            >
              About Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-center max-w-2xl mx-auto"
            >
              At Social Studioz, we empower startups to thrive digitally through tailored solutions in website development, social media management, and video editing. Our dedicated team creates visually compelling websites, manages engaging social  media campaigns, and produces high-quality video content to tell your brand&apos;s story. We&apos;re committed to helping you connect with your audience and achieve digital success.
            </motion.p>
          </div>
        </section>

        <section ref={servicesRef} id="services" className="py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Our Services
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Website Development", icon: Globe, description: "We create custom, user-friendly websites tailored to your startup&apos;s needs. Our designs not only reflect your brand identity but also ensure optimal functionality and performance to enhance user experience." },
                { title: "Social Media Management", icon: Share2, description: "Our team crafts engaging social media strategies that connect your brand with the right audience. We focus on content creation, scheduling, and community engagement to build a loyal following." },
                { title: "Video Editing", icon: Video, description: "We produce high-quality videos that tell your brand&apos;s story effectively. From promotional clips to explainer videos, our editing services enhance your visual content, making it more compelling and shareable." }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-lg backdrop-blur-sm transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredCard(service.title)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onMouseDown={() => setClickedCard(service.title)}
                  onMouseUp={() => setClickedCard(null)}
                  style={getCardStyle(service.title)}
                >
                  <service.icon className="w-12 h-12 mb-4 text-blue-500" />
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {service.description}
                  </p>
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
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
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
                  className="relative overflow-hidden rounded-lg aspect-video cursor-pointer"
                  onMouseEnter={() => setHoveredCard(`project-${item}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onMouseDown={() => setClickedCard(`project-${item}`)}
                  onMouseUp={() => setClickedCard(null)}
                  style={getCardStyle(`project-${item}`)}
                >
                  <div className="w-full h-full flex items-center justify-center">
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
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              What Our Clients Say
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Sarah Thompson", content: "Social Studioz transformed our startup&apos;s online presence! Their team delivered a stunning website that truly reflects our brand. The social media management strategies they implemented have significantly boosted our engagement. Highly recommend!" },
                { name: "Michael Johnson", content: "I was impressed with the video editing services from Social Studioz. They took our raw footage and turned it into a professional promotional video that perfectly captures our vision. Their attention to detail is unmatched!" },
                { name: "Emma Carter", content: "The comprehensive package from Social Studioz exceeded our expectations! The custom website, combined with effective social media strategies, helped us reach our target audience more effectively. Their support throughout the process was invaluable." }
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-lg backdrop-blur-sm cursor-pointer"
                  onMouseEnter={() => setHoveredCard(testimonial.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onMouseDown={() => setClickedCard(testimonial.name)}
                  onMouseUp={() => setClickedCard(null)}
                  style={getCardStyle(testimonial.name)}
                >
                  <p className="mb-4">&quot;{testimonial.content}&quot;</p>
                  <div className="font-semibold">{testimonial.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={pricingRef} id="pricing" className={`py-20 ${isDarkMode ? 'bg-black bg-opacity-80' : 'bg-blue-100'}`}>
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Our Packages
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Basic', features: ['One-page responsive website', 'Profile setup and content calendar for one social media platform', 'Basic Editing: 10 reels, 6 posts & 3 carousels'] },
                { name: 'Standard', features: ['Up to five-page responsive website', 'Profile setup, content calendar, creation and engagement for two social media platforms', 'Professional editing: 12 reels, 7 posts, 3-5 carousels'] },
                { name: 'Premium', features: ['Custom multi-page website with e-commerce integration', 'Comprehensive strategy, content creation, and analytics for three social media platforms', 'Advanced editing: 15 reels, 10 posts and 7 carousels'] }
              ].map((plan) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 rounded-lg backdrop-blur-sm transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredCard(plan.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onMouseDown={() => setClickedCard(plan.name)}
                  onMouseUp={() => setClickedCard(null)}
                  style={getCardStyle(plan.name)}
                >
                  <h3 className="text-2xl font-semibold mb-4">{plan.name} Package</h3>
                  <p className="text-sm font-medium mb-6 text-blue-500">Contact us for pricing details</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
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
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              Get In Touch
            </motion.h2>
            <div className="max-w-md mx-auto">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  className={`${isDarkMode ? 'bg-blue-900 bg-opacity-20 text-white' : 'bg-white text-gray-800'} placeholder-gray-400 border-none`}
                  required
                />
                <Input
                  type="email"
                  name="from_email"
                  placeholder="Your Email"
                  className={`${isDarkMode ? 'bg-blue-900 bg-opacity-20 text-white' : 'bg-white text-gray-800'}  placeholder-gray-400 border-none`}
                  required
                />
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  className={`${isDarkMode ? 'bg-blue-900 bg-opacity-20 text-white' : 'bg-white text-gray-800'}  placeholder-gray-400 border-none`}
                  required
                />
                <Button
                  type="submit"
                  className={`w-full ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
              {submitStatus === 'success' && (
                <p className="mt-4 text-green-500">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="mt-4 text-red-500">Failed to send message. Please try again.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className={`${isDarkMode ? 'bg-black bg-opacity-80' : 'bg-blue-200'} py-8 relative z-40`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">Social Studioz</div>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/socialstudioz1/profilecard/?igsh=bDJlOHBpcmZ5bGs2" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <Instagram />
              </a>
              <a href="https://x.com/SocialStudioz?t=Ow7qukgnVw-S8HiYFujhaQ&s=09" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <Twitter />
              </a>
              <a href="https://in.linkedin.com/in/social-studioz-143b43302" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <Linkedin />
              </a>
            </div>
          </div>
          <div className={`mt-8 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} Social Studioz. All rights reserved.
          </div>
        </div>
      </footer>

      <div className={`fixed bottom-0 left-0 right-0 py-2 ${isDarkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-100'} z-40 overflow-hidden`}>
        <div className="marquee-content whitespace-nowrap">
          <span className="mx-4">Follow us on this site to stay updated!</span>
          <span className="mx-4">Exciting new features coming soon!</span>
          <span className="mx-4">Join our community for exclusive content!</span>
          <span className="mx-4">Follow us on Instagram for more updates!</span>
          <span className="mx-4">Connect with us on LinkedIn!</span>
          <span className="mx-4">Subscribe to our newsletter!</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .marquee-content {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  )
}