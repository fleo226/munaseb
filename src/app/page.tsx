/* eslint-disable react-hooks/refs */
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Heart, 
  Pill, 
  Building2, 
  Shield, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin,
  User,
  GraduationCap,
  CreditCard,
  ClipboardCheck,
  Menu,
  X,
  ChevronRight,
  Star,
  Send,
  Stethoscope,
  Eye,
  Smile,
  Hospital,
  Baby,
  Bug,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  ArrowDown,
  Play,
  Quote,
  Award,
  Zap,
  Timer,
  PartyPopper,
  Activity,
  Calculator,
  ArrowRight
} from 'lucide-react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const floatAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(249, 115, 22, 0.3)",
      "0 0 40px rgba(249, 115, 22, 0.6)",
      "0 0 20px rgba(249, 115, 22, 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const rotateAnimation = {
  animate: {
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Counter Animation Hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) return
    hasAnimatedRef.current = true
    
    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, end, duration])

  return { count, ref }
}

// Floating Particles Component - ENHANCED with health symbols
function FloatingParticles() {
  const healthSymbols = ['●', '◆', '✦', '○', '◇']
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            color: i % 3 === 0 ? 'rgba(249, 115, 22, 0.15)' : i % 3 === 1 ? 'rgba(59, 130, 246, 0.12)' : 'rgba(34, 197, 94, 0.1)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [0.5, 1, 0.5],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        >
          {healthSymbols[i % healthSymbols.length]}
        </motion.div>
      ))}
    </div>
  )
}

// Wave Transition Component
function WaveTransition({ flip = false, color = 'orange' }: { flip?: boolean, color?: 'orange' | 'blue' | 'green' }) {
  const colors = {
    orange: { from: '#f97316', to: '#ea580c' },
    blue: { from: '#2563eb', to: '#1d4ed8' },
    green: { from: '#22c55e', to: '#16a34a' },
  }
  
  return (
    <div className={`relative h-24 -mt-1 ${flip ? 'rotate-180' : ''}`}>
      <svg className="absolute w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <motion.path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill={colors[color].from}
          initial={{ d: "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" }}
          animate={{
            d: [
              "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
              "M0,80 C240,20 480,100 720,40 C960,100 1200,20 1440,80 L1440,120 L0,120 Z",
              "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  )
}

// Impact Counter Section - NEW
function ImpactCounterSection() {
  const stats = [
    { label: 'Étudiants protégés', value: 45000, suffix: '+', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Soins couverts', value: 125000, suffix: '+', icon: Heart, color: 'from-red-500 to-pink-500' },
    { label: 'Économies générées', value: 850, suffix: 'M FCFA', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Villes couvertes', value: 12, suffix: '+', icon: MapPin, color: 'from-orange-500 to-amber-500' },
  ]
  
  const counter1 = useCounter(stats[0].value, 2500)
  const counter2 = useCounter(stats[1].value, 3000)
  const counter3 = useCounter(stats[2].value, 2500)
  const counter4 = useCounter(stats[3].value, 2000)
  
  const counters = [counter1, counter2, counter3, counter4]
  
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(249, 115, 22, 0.1)' : 'rgba(59, 130, 246, 0.1)'} 0%, transparent 70%)`,
              left: `${i * 25}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          ref={counter1.ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {counters[index].count.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Savings Calculator Section - NEW
function SavingsCalculatorSection() {
  const [consultations, setConsultations] = useState(3)
  const [medications, setMedications] = useState(5000)
  const [hospitalization, setHospitalization] = useState(0)
  
  const annualCost = consultations * 5000 + medications + hospitalization
  const withMunaseb = Math.min(annualCost * 0.2, 100000) // 20% reste à charge, plafond 100k
  const savings = annualCost - withMunaseb
  const monthlySavings = Math.round(savings / 12)
  
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-orange-50 via-white to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <motion.span 
              className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <TrendingUp className="w-4 h-4" />
              Calculez vos économies
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Combien pouvez-vous{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">économiser</span> ?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Découvrez en quelques secondes combien MUNASEB peut vous faire économiser sur vos frais de santé.
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            <div className="space-y-8">
              {/* Consultations */}
              <div>
                <label className="flex justify-between text-sm font-medium text-slate-700 mb-3">
                  <span>Consultations par an</span>
                  <span className="text-orange-500 font-bold">{consultations}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={consultations}
                  onChange={(e) => setConsultations(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0</span>
                  <span>12</span>
                </div>
              </div>
              
              {/* Medications */}
              <div>
                <label className="flex justify-between text-sm font-medium text-slate-700 mb-3">
                  <span>Médicaments (FCFA/an)</span>
                  <span className="text-orange-500 font-bold">{medications.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={medications}
                  onChange={(e) => setMedications(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0 FCFA</span>
                  <span>50 000 FCFA</span>
                </div>
              </div>
              
              {/* Hospitalization */}
              <div>
                <label className="flex justify-between text-sm font-medium text-slate-700 mb-3">
                  <span>Hospitalisation (FCFA/an)</span>
                  <span className="text-orange-500 font-bold">{hospitalization.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  value={hospitalization}
                  onChange={(e) => setHospitalization(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0 FCFA</span>
                  <span>200 000 FCFA</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-6">
              <div className="text-sm text-slate-500 mb-1">Sans MUNASEB, vous payez</div>
              <div className="text-3xl font-bold text-slate-900">{annualCost.toLocaleString()} FCFA/an</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="text-sm text-green-100 mb-1">Avec MUNASEB, vous payez</div>
              <div className="text-3xl font-bold">{withMunaseb.toLocaleString()} FCFA/an</div>
              <div className="text-sm text-green-200 mt-2">Plafonné à 100 000 FCFA/an</div>
            </div>
            
            <motion.div 
              className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white text-center"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-sm text-orange-100 mb-2">Vos économies annuelles</div>
              <div className="text-5xl font-bold mb-2">{savings.toLocaleString()} FCFA</div>
              <div className="text-orange-200">Soit {monthlySavings.toLocaleString()} FCFA/mois</div>
            </motion.div>
            
            <Link href="/preinscription">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-6 text-lg shadow-xl">
                <Sparkles className="w-5 h-5 mr-2" />
                Adhérer maintenant - 5 000 FCFA/an
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Typewriter Effect Component
function TypewriterText({ text, delay = 50 }: { text: string, delay?: number }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay, isInView])

  return <span ref={ref}>{displayText}<span className="animate-pulse">|</span></span>
}

// Section component with animation
function AnimatedSection({ children, className = '', delay = 0, variant = 'fadeInUp' }: { 
  children: React.ReactNode, 
  className?: string, 
  delay?: number,
  variant?: 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const variants = {
    fadeInUp,
    slideInLeft,
    slideInRight,
    scaleIn
  }
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Urgency Banner Component
function UrgencyBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 15, hours: 8, minutes: 42, seconds: 30 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) { seconds = 59; minutes-- }
        if (minutes < 0) { minutes = 59; hours-- }
        if (hours < 0) { hours = 23; days-- }
        if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0 }
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 text-white py-2 px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-sm md:text-base">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Timer className="w-5 h-5" />
        </motion.div>
        <span className="font-semibold">Offre Rentrée Universitaire ! Cotisation à seulement 5 000 FCFA/an</span>
        <div className="hidden md:flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
          <span className="font-bold">{timeLeft.days}j</span>
          <span>:</span>
          <span className="font-bold">{String(timeLeft.hours).padStart(2, '0')}h</span>
          <span>:</span>
          <span className="font-bold">{String(timeLeft.minutes).padStart(2, '0')}m</span>
        </div>
      </div>
    </motion.div>
  )
}

// Header Component
function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Services', href: '#services' },
    { label: 'Avantages', href: '#avantages' },
    { label: 'Témoignages', href: '#temoignages' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`fixed top-10 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/98 backdrop-blur-md shadow-2xl' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Image
                  src="/images/cenou-logo.jpg"
                  alt="CENOU Logo"
                  width={48}
                  height={48}
                  className="rounded-lg shadow-md"
                />
              </motion.div>
              <span className="text-2xl md:text-3xl font-bold text-orange-500">
                MUNASEB
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-slate-700 hover:text-orange-500 font-medium transition-colors relative group overflow-hidden"
              >
                <span className="relative z-10">{item.label}</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/preinscription">
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 shadow-lg hover:shadow-xl transition-all animate-pulse"
                  style={{ animationDuration: '3s' }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Préinscription
                </Button>
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-slate-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white rounded-2xl shadow-xl p-6 mb-4 overflow-hidden"
            >
              <nav className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className="text-slate-700 hover:text-orange-500 font-medium py-2 transition-colors text-left"
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link href="/preinscription" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Préinscription
                    </Button>
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

// Hero Section
function HeroSection() {
  const counter1 = useCounter(80, 2000)
  const counter2 = useCounter(50, 2000)
  const counter3 = useCounter(5000, 2500)

  const scrollToServices = () => {
    const element = document.querySelector('#services')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-32">
      <FloatingParticles />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ filter: 'blur(60px)' }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400 rounded-full"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ filter: 'blur(80px)' }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400 rounded-full"
          animate={{ 
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          style={{ filter: 'blur(60px)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-md"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-4 h-4" />
              </motion.div>
              <span>Organisme sous tutelle du CENOU</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full"
              >
                OFFICIEL
              </motion.span>
            </motion.div>
            
            {/* Title */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Protégez votre{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-600">
                  santé étudiante
                </span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  <motion.path
                    d="M0 6 Q 75 0, 150 6 T 300 6"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>{' '}
              avec MUNASEB
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              className="text-lg md:text-xl text-slate-600 mb-6 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              La mutuelle nationale des étudiants du Burkina Faso — Remboursement à{' '}
              <motion.span 
                className="font-bold text-orange-500 inline-block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                80%
              </motion.span> de vos frais médicaux
            </motion.p>

            {/* PHRASE CHOC - Storytelling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-r-xl p-5 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              <motion.p 
                className="text-slate-700 text-lg md:text-xl font-medium italic leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                &quot;On pense qu&apos;on est invincible à 20 ans... jusqu&apos;au jour où une simple fièvre vide nos économies en 48h.
                <span className="text-orange-600 font-bold not-italic block mt-2">
                  La santé ne prévient pas — mais MUNASEB vous protège quand elle frappe.
                </span>
                &quot;
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 2, duration: 1 }}
                className="h-0.5 bg-gradient-to-r from-orange-500 to-transparent mt-3"
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={pulseGlow.animate}
              >
                <Link href="/preinscription">
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-7 text-lg shadow-2xl transition-all group">
                    <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                    Se préinscrire maintenant
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={scrollToServices}
                  className="px-8 py-7 text-lg border-2 border-slate-300 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all group"
                >
                  En savoir plus
                  <motion.span
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowDown className="ml-2 w-5 h-5" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              ref={counter1.ref}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div 
                className="text-center lg:text-left p-4 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all"
                whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(249, 115, 22, 0.2)" }}
              >
                <div className="text-3xl md:text-4xl font-bold text-orange-500">{counter1.count}%</div>
                <div className="text-sm text-slate-600">Remboursement</div>
              </motion.div>
              <motion.div 
                className="text-center lg:text-left p-4 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all"
                whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(59, 130, 246, 0.2)" }}
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600">{counter2.count}+</div>
                <div className="text-sm text-slate-600">Centres de santé</div>
              </motion.div>
              <motion.div 
                className="text-center lg:text-left p-4 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all"
                whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(16, 185, 129, 0.2)" }}
              >
                <div className="text-3xl md:text-4xl font-bold text-slate-900">{counter3.count}</div>
                <div className="text-sm text-slate-600">FCFA/an</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <motion.div
              className="relative"
              animate={floatAnimation.animate}
            >
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-blue-500 rounded-3xl"
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{ filter: 'blur(40px)', opacity: 0.3 }}
              />
              <div className="relative">
                <Image
                  src="/images/students-hero.png"
                  alt="Étudiants heureux"
                  width={600}
                  height={500}
                  className="relative rounded-3xl shadow-2xl object-cover"
                  priority
                />
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                />
              </div>
            </motion.div>
            
            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <motion.div 
                className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </motion.div>
              <div>
                <div className="font-semibold text-slate-900">Couverture complète</div>
                <div className="text-sm text-slate-600">Jusqu&apos;à 100 000 FCFA/an</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-4 text-white"
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Award className="w-6 h-6" />
                </motion.div>
                <div>
                  <div className="font-semibold">Certifié CENOU</div>
                  <div className="text-xs text-blue-200">Depuis 2002</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToServices}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center text-slate-400 hover:text-orange-500 transition-colors"
        >
          <span className="text-sm mb-2">Défiler</span>
          <div className="w-8 h-14 border-2 border-current rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 20, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-3 bg-current rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Avantages Section
function AvantagesSection() {
  const avantages = [
    {
      icon: Heart,
      title: 'Remboursement 80%',
      description: 'Bénéficiez d\'un remboursement de 80% sur vos frais médicaux, pour une protection optimale de votre santé.',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
      delay: 0,
    },
    {
      icon: Pill,
      title: 'Médicaments abordables',
      description: 'Accédez à des médicaments à tarifs réduits. Ex: traitement paludisme à seulement 80 FCFA.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      delay: 0.1,
    },
    {
      icon: Building2,
      title: 'Réseau national',
      description: 'Plus de 50 centres de santé partenaires dans 12+ villes du Burkina Faso à votre disposition.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      delay: 0.2,
    },
    {
      icon: Shield,
      title: 'Plafond 100 000 FCFA/an',
      description: 'Une couverture complète jusqu\'à 100 000 FCFA par an pour tous vos besoins de santé.',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      delay: 0.3,
    },
  ]

  return (
    <section id="avantages" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-orange-100 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ filter: 'blur(80px)' }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ filter: 'blur(80px)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.span 
              className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Zap className="w-4 h-4" />
              Pourquoi nous choisir
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Les avantages{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">MUNASEB</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Une couverture santé complète et accessible, conçue spécialement pour les étudiants burkinabè.
            </p>
          </div>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {avantages.map((avantage, index) => (
            <motion.div
              key={avantage.title}
              variants={scaleIn}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white overflow-hidden relative">
                {/* Gradient overlay on hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${avantage.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                
                <CardContent className="p-6 text-center relative z-10">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${avantage.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <avantage.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">{avantage.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{avantage.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Comment ça marche Section
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: User,
      title: 'Préinscrivez-vous en ligne',
      description: 'Remplissez le formulaire de préinscription en quelques minutes depuis votre téléphone ou ordinateur.',
    },
    {
      number: '02',
      icon: CreditCard,
      title: 'Payez votre cotisation',
      description: 'Réglez votre cotisation annuelle de 5 000 FCFA auprès de notre bureau ou par mobile money.',
    },
    {
      number: '03',
      icon: ClipboardCheck,
      title: 'Bénéficiez de la couverture',
      description: 'Accédez immédiatement à tous les services de santé du réseau MUNASEB.',
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400 rounded-full"
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.span 
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Play className="w-4 h-4" />
              Processus simple
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Trois étapes simples pour bénéficier de votre couverture santé étudiante.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4">
            <svg className="w-full h-2" viewBox="0 0 200 10">
              <motion.path
                d="M0 5 L200 5"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="white" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {steps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.2}>
              <motion.div 
                className="relative text-center"
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full mb-6 border-2 border-white/30 relative"
                  whileHover={{ scale: 1.1, borderColor: "rgba(249, 115, 22, 0.5)" }}
                >
                  <step.icon className="w-12 h-12 text-white" />
                  <motion.div
                    className="absolute -top-2 -right-2 bg-orange-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {index + 1}
                  </motion.div>
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-blue-100 leading-relaxed">{step.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6}>
          <motion.div 
            className="text-center mt-12"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/preinscription">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-7 text-lg shadow-xl group">
                <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                Commencer ma préinscription
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Services Section
function ServicesSection() {
  const services = [
    {
      icon: Stethoscope,
      title: 'Consultations médicales',
      description: 'Consultations généralistes et spécialisées dans tout notre réseau de partenaires.',
      forfait: 'Prise en charge 80%',
    },
    {
      icon: Smile,
      title: 'Soins dentaires',
      description: 'Soins dentaires préventifs et curatifs à tarifs préférentiels.',
      forfait: 'Forfait 15 000 FCFA',
    },
    {
      icon: Eye,
      title: 'Soins optiques',
      description: 'Examens de vue et équipements optiques avec prise en charge.',
      forfait: 'Forfait 15 000 FCFA',
    },
    {
      icon: Hospital,
      title: 'Hospitalisation',
      description: 'Prise en charge des frais d\'hospitalisation dans nos centres partenaires.',
      forfait: 'Forfait 50 000 FCFA',
    },
    {
      icon: Bug,
      title: 'Traitement paludisme',
      description: 'Traitement complet du paludisme à seulement 80 FCFA pour les adhérents.',
      forfait: '80 FCFA',
    },
    {
      icon: Baby,
      title: 'Accouchement',
      description: 'Forfait accouchement pour les étudiantes enceintes.',
      forfait: 'Forfait 25 000 FCFA',
    },
  ]

  return (
    <section id="services" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.span 
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Heart className="w-4 h-4" />
              Nos prestations
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Nos services de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">santé</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Une gamme complète de services de santé adaptés aux besoins des étudiants.
            </p>
          </div>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div 
              key={service.title} 
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center shrink-0 group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                    >
                      <service.icon className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{service.title}</h3>
                      <p className="text-slate-600 text-sm mb-3">{service.description}</p>
                      <motion.span 
                        className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {service.forfait}
                      </motion.span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Témoignages Section
function TemoignagesSection() {
  const temoignages = [
    {
      name: 'Aminata Ouedraogo',
      role: 'Étudiante en Médecine, UJKZ',
      image: '/images/student-woman1.png',
      content: 'Grâce à MUNASEB, j\'ai pu me faire soigner rapidement quand j\'étais malade. Le remboursement a été rapide et le personnel très accueillant.',
      rating: 5,
    },
    {
      name: 'Ibrahim Diallo',
      role: 'Étudiant en Informatique, UNB',
      image: '/images/student-man1.png',
      content: 'La cotisation de 5 000 FCFA par an, c\'est vraiment abordable pour nous les étudiants. Je recommande à tous mes camarades.',
      rating: 5,
    },
    {
      name: 'Fatima Compaoré',
      role: 'Étudiante en Droit, UJKZ',
      image: '/images/student-woman2.png',
      content: 'J\'ai pu accéder aux médicaments pour mon paludisme à un prix très réduit. MUNASEB est un vrai soutien pour les étudiants.',
      rating: 5,
    },
  ]

  return (
    <section id="temoignages" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-1/2 left-0 w-96 h-96 bg-orange-100 rounded-full"
        animate={{ x: [-100, 0, -100], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity }}
        style={{ filter: 'blur(100px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.span 
              className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Users className="w-4 h-4" />
              Témoignages
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Ce que disent nos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">adhérents</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Des retours d&apos;expérience authentiques de nos membres étudiants.
            </p>
          </div>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {temoignages.map((temoignage, index) => (
            <motion.div 
              key={temoignage.name} 
              variants={scaleIn}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50 overflow-hidden relative">
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 w-10 h-10 text-orange-200 group-hover:text-orange-300 transition-colors" />
                
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: temoignage.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-slate-700 mb-6 leading-relaxed relative z-10">
                    &ldquo;{temoignage.content}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200 ring-2 ring-orange-200 group-hover:ring-orange-400 transition-all"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Image
                        src={temoignage.image}
                        alt={temoignage.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div>
                      <div className="font-semibold text-slate-900">{temoignage.name}</div>
                      <div className="text-sm text-slate-600">{temoignage.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Réseau de santé Section
function ReseauSection() {
  const villes = [
    'Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Ouahigouya',
    'Fada N\'Gourma', 'Banfora', 'Kaya', 'Dédougou',
    'Tenkodogo', 'Koupéla', 'Manga', 'Ziniaré'
  ]

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 bg-orange-500 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ filter: 'blur(60px)' }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full"
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ filter: 'blur(80px)' }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection variant="slideInLeft">
            <div>
              <motion.span 
                className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Building2 className="w-4 h-4" />
                Notre réseau
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Plus de <span className="text-orange-400">50 centres</span> de santé partenaires
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Un réseau étendu couvrant les principales villes du Burkina Faso pour vous garantir un accès aux soins où que vous soyez.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {villes.map((ville, index) => (
                  <motion.div
                    key={ville}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(249, 115, 22, 0.2)" }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 cursor-pointer transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                    <span className="text-sm">{ville}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="slideInRight" delay={0.3}>
            <motion.div 
              className="relative"
              animate={floatAnimation.animate}
            >
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-blue-500 rounded-3xl"
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{ filter: 'blur(40px)', opacity: 0.3 }}
              />
              <Image
                src="/images/munaseb-building.png"
                alt="Bâtiment MUNASEB"
                width={600}
                height={400}
                className="relative rounded-3xl shadow-2xl object-cover"
              />
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.1 }}
                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-4 shadow-xl"
              >
                <div className="text-3xl font-bold">12+</div>
                <div className="text-sm opacity-90">Villes couvertes</div>
              </motion.div>

              {/* Top Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="absolute -top-4 -left-4 bg-white text-slate-900 rounded-2xl p-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Award className="w-6 h-6 text-orange-500" />
                  </motion.div>
                  <span className="font-semibold">Certifié État</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ nom: '', email: '', telephone: '', message: '' })
    
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.span 
              className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Phone className="w-4 h-4" />
              Contactez-nous
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Besoin d&apos;aide ?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection variant="slideInLeft">
            <motion.div
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
            >
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Send className="w-5 h-5 text-orange-500" />
                    Envoyez-nous un message
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <motion.div 
                        className="space-y-2"
                        whileFocus={{ scale: 1.02 }}
                      >
                        <Label htmlFor="nom">Nom complet</Label>
                        <Input
                          id="nom"
                          value={formData.nom}
                          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                          placeholder="Votre nom"
                          required
                          className="border-slate-200 focus:border-orange-500 focus:ring-orange-500 transition-all"
                        />
                      </motion.div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="votre@email.com"
                          required
                          className="border-slate-200 focus:border-orange-500 focus:ring-orange-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        placeholder="+226 XX XX XX XX"
                        className="border-slate-200 focus:border-orange-500 focus:ring-orange-500 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Votre message..."
                        rows={4}
                        required
                        className="border-slate-200 focus:border-orange-500 focus:ring-orange-500 transition-all"
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-6 transition-all"
                      >
                        {isSubmitting ? (
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            ⏳
                          </motion.span>
                        ) : isSubmitted ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            Message envoyé !
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection variant="slideInRight" delay={0.2}>
            <div className="space-y-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="overflow-hidden rounded-2xl shadow-lg"
              >
                <Card className="border-0">
                  <div className="relative h-48">
                    <Image
                      src="/images/munaseb-building-real.jpg"
                      alt="Siège MUNASEB"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="font-bold text-lg">Siège MUNASEB</h4>
                      <p className="text-sm text-slate-300">Ouagadougou, Burkina Faso</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="border-0 shadow-md hover:shadow-xl transition-all h-full">
                    <CardContent className="p-6 flex items-start gap-4">
                      <motion.div 
                        className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-orange-500 transition-colors"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                      >
                        <MapPin className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">Adresse</h4>
                        <p className="text-sm text-slate-600">01 BP 1926 Ouagadougou, Burkina Faso</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="border-0 shadow-md hover:shadow-xl transition-all h-full">
                    <CardContent className="p-6 flex items-start gap-4">
                      <motion.div 
                        className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                      >
                        <Phone className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">Téléphone</h4>
                        <p className="text-sm text-slate-600">(+226) 25 33 73 90 95</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ y: -5 }}
              >
                <Card className="border-0 shadow-md bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Horaires d&apos;ouverture
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-100">Lundi - Vendredi</span>
                        <span className="font-medium">7h30 - 16h30</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-100">Samedi</span>
                        <span className="font-medium">8h00 - 12h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-100">Dimanche</span>
                        <span className="font-medium">Fermé</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <PartyPopper className="w-4 h-4" />
            Offre spéciale rentrée !
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Rejoignez MUNASEB dès maintenant !
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Protégez votre santé pour seulement 5 000 FCFA par an. Préinscrivez-vous en quelques clics.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/preinscription">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-10 py-7 text-lg shadow-2xl group">
                <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                Se préinscrire maintenant
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/images/cenou-logo.jpg"
                alt="CENOU Logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold text-orange-400">MUNASEB</span>
            </motion.div>
            <p className="text-slate-400 mb-6 max-w-md">
              La Mutuelle Nationale de Santé des Étudiants du Burkina Faso, sous tutelle du CENOU, 
              offre une couverture santé complète et accessible à tous les étudiants.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <GraduationCap className="w-5 h-5 text-orange-400" />
              <span>Organisme sous tutelle du CENOU</span>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {['Accueil', 'Services', 'Avantages', 'Témoignages', 'Contact'].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <a href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-orange-400 transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <motion.li className="flex items-start gap-3 text-slate-400" whileHover={{ x: 5 }}>
                <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span>01 BP 1926 Ouagadougou, Burkina Faso</span>
              </motion.li>
              <motion.li className="flex items-center gap-3 text-slate-400" whileHover={{ x: 5 }}>
                <Phone className="w-5 h-5 text-orange-400 shrink-0" />
                <span>(+226) 25 33 73 90 95</span>
              </motion.li>
              <motion.li className="flex items-center gap-3 text-slate-400" whileHover={{ x: 5 }}>
                <Mail className="w-5 h-5 text-orange-400 shrink-0" />
                <span>contact@munaseb.bf</span>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 MUNASEB - CENOU. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <a href="#" className="hover:text-orange-400 transition-colors">Mentions légales</a>
              <span>•</span>
              <a href="#" className="hover:text-orange-400 transition-colors">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen">
      <UrgencyBanner />
      <Header />
      <HeroSection />
      <WaveTransition color="orange" />
      <ImpactCounterSection />
      <WaveTransition color="blue" flip />
      <AvantagesSection />
      <SavingsCalculatorSection />
      <HowItWorksSection />
      <ServicesSection />
      <TemoignagesSection />
      <ReseauSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </main>
  )
}
