'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Phone, Mail, MapPin, Calendar, MessageCircle, ChevronDown, 
  Shield, Award, Clock, Users, Home, Building, Wrench, 
  Star, CheckCircle, ArrowRight, Globe, Menu, X, Quote,
  ChevronUp, Zap, Heart, ThumbsUp, PhoneCall, Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Translations
const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      booking: 'Book Now'
    },
    hero: {
      badge: 'Trusted Roofing Experts',
      title: 'Protect Your Home',
      titleHighlight: 'With Quality Roofing',
      subtitle: 'Orange County & Los Angeles County\'s most trusted roofing contractor. Over 20 years of excellence in roof installation, repair, and maintenance.',
      cta: 'Get Free Estimate',
      ctaSecondary: 'WhatsApp Us'
    },
    speech: {
      title: 'Our Commitment to You',
      subtitle: 'Why Homeowners Trust S New Roof',
      quote: 'Every home tells a story, and every roof is the first chapter. At S New Roof, we believe that protecting your family\'s sanctuary shouldn\'t be complicated or stressful. That\'s why we\'ve dedicated ourselves to making roofing simple, transparent, and affordable for every homeowner in our community.',
      highlight: 'Over 500+ families protected across Orange County & Los Angeles County'
    },
    stats: {
      experience: 'Years Experience',
      projects: 'Projects Completed',
      satisfaction: 'Client Satisfaction',
      warranty: 'Year Warranty'
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive Roofing Solutions for Your Home',
      items: [
        { title: 'Roof Installation', desc: 'Complete new roof installation with premium materials and expert craftsmanship', icon: Home },
        { title: 'Roof Repair', desc: 'Fast, reliable repairs for leaks, storm damage, and wear', icon: Wrench },
        { title: 'Emergency Services', desc: '24/7 emergency response for urgent roof issues', icon: Zap },
        { title: 'Inspection & Maintenance', desc: 'Preventive care to extend your roof\'s lifespan', icon: Shield }
      ]
    },
    whyUs: {
      title: 'Why Choose S New Roof?',
      subtitle: 'Built on Trust, Delivered with Excellence',
      items: [
        { title: 'Licensed & Insured', desc: 'Full protection and peace of mind for every project' },
        { title: 'Free Estimates', desc: 'No-obligation quotes within 24 hours' },
        { title: 'Financing Available', desc: 'Flexible payment options for every budget' },
        { title: 'Lifetime Warranty', desc: 'Industry-leading guarantee on all work' }
      ]
    },
    areas: {
      title: 'Service Areas',
      subtitle: 'Proudly Serving Orange County & Los Angeles County',
      locations: ['Santa Ana', 'Irvine', 'Anaheim', 'Costa Mesa', 'Tustin', 'Orange', 'Newport Beach', 'Huntington Beach', 'Fullerton', 'Garden Grove', 'Long Beach', 'Los Angeles']
    },
    reviews: {
      title: 'What Our Clients Say',
      subtitle: 'Real Reviews from Happy Homeowners',
      googleRating: 'Google Rating',
      readMore: 'Read More Reviews'
    },
    cta: {
      title: 'Ready to Protect Your Home?',
      subtitle: 'Get a free inspection and estimate today',
      button: 'Schedule Your Free Consultation'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'We\'re here to help with all your roofing needs',
      phone: 'Call Us',
      whatsapp: 'WhatsApp',
      email: 'Email Us',
      book: 'Book Online',
      scanQr: 'Scan for Quick Contact'
    },
    footer: {
      rights: 'All rights reserved',
      tagline: 'Protecting Homes, Building Trust'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      services: 'Servicios',
      contact: 'Contacto',
      booking: 'Reservar'
    },
    hero: {
      badge: 'Expertos en Techos de Confianza',
      title: 'Proteja Su Hogar',
      titleHighlight: 'Con Techos de Calidad',
      subtitle: 'El contratista de techos más confiable del Condado de Orange y Los Ángeles. Más de 20 años de excelencia en instalación, reparación y mantenimiento de techos.',
      cta: 'Presupuesto Gratis',
      ctaSecondary: 'WhatsApp'
    },
    speech: {
      title: 'Nuestro Compiso con Usted',
      subtitle: 'Por Qué Los Propietarios Confían en S New Roof',
      quote: 'Cada hogar cuenta una historia, y cada techo es el primer capítulo. En S New Roof, creemos que proteger el santuario de su familia no debería ser complicado ni estresante. Es por eso que nos dedicamos a hacer que los techos sean simples, transparentes y asequibles para cada propietario en nuestra comunidad.',
      highlight: 'Más de 500+ familias protegidas en el Condado de Orange y Los Ángeles'
    },
    stats: {
      experience: 'Años de Experiencia',
      projects: 'Proyectos Completados',
      satisfaction: 'Satisfacción del Cliente',
      warranty: 'Años de Garantía'
    },
    services: {
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones Integrales de Techado para Su Hogar',
      items: [
        { title: 'Instalación de Techos', desc: 'Instalación completa con materiales premium y artesanía experta', icon: Home },
        { title: 'Reparación de Techos', desc: 'Reparaciones rápidas y confiables para fugas y daños', icon: Wrench },
        { title: 'Servicios de Emergencia', desc: 'Respuesta de emergencia 24/7 para problemas urgentes', icon: Zap },
        { title: 'Inspección y Mantenimiento', desc: 'Cuidado preventivo para extender la vida útil de su techo', icon: Shield }
      ]
    },
    whyUs: {
      title: '¿Por Qué Elegir S New Roof?',
      subtitle: 'Construido con Confianza, Entregado con Excelencia',
      items: [
        { title: 'Licenciado y Asegurado', desc: 'Protección total y tranquilidad en cada proyecto' },
        { title: 'Presupuestos Gratis', desc: 'Cotizaciones sin compromiso en 24 horas' },
        { title: 'Financiamiento Disponible', desc: 'Opciones de pago flexibles para cada presupuesto' },
        { title: 'Garantía de Por Vida', desc: 'Garantía líder en la industria en todo trabajo' }
      ]
    },
    areas: {
      title: 'Áreas de Servicio',
      subtitle: 'Orgullosamente Sirviendo al Condado de Orange y Los Ángeles',
      locations: ['Santa Ana', 'Irvine', 'Anaheim', 'Costa Mesa', 'Tustin', 'Orange', 'Newport Beach', 'Huntington Beach', 'Fullerton', 'Garden Grove', 'Long Beach', 'Los Angeles']
    },
    reviews: {
      title: 'Lo Que Dicen Nuestros Clientes',
      subtitle: 'Reseñas Reales de Clientes Satisfechos',
      googleRating: 'Calificación Google',
      readMore: 'Ver Más Reseñas'
    },
    cta: {
      title: '¿Listo para Proteger Su Hogar?',
      subtitle: 'Obtenga una inspección y presupuesto gratis hoy',
      button: 'Programe Su Consulta Gratuita'
    },
    contact: {
      title: 'Póngase en Contacto',
      subtitle: 'Estamos aquí para ayudar con todas sus necesidades de techado',
      phone: 'Llámanos',
      whatsapp: 'WhatsApp',
      email: 'Envíanos un Correo',
      book: 'Reservar en Línea',
      scanQr: 'Escanee para Contacto Rápido'
    },
    footer: {
      rights: 'Todos los derechos reservados',
      tagline: 'Protegiendo Hogares, Construyendo Confianza'
    }
  }
}

// Company Info
const companyInfo = {
  phone: '714-770-4756',
  whatsapp: '17147704756',
  email: 'info@snewroof.com',
  website: 'snewroof.com',
  address: '1415 E 17th St Suite 220A, Santa Ana, CA 92705',
  hours: 'Mon-Sat: 7AM - 7PM'
}

// Google Reviews
const reviews = [
  {
    id: 1,
    name: 'Northland Center',
    rating: 5,
    text: 'I had an emergency leak, late at night during a big storm. S New Roof was there in less than an hour and took care of everything. Since that night Ive had them come back to address other roofing issues. They have done some extensive repairs and maintenance. Always with professional workmanship and timely response. I have worked with dozens of roofing companies over the years on commercial projects. S New Roof is by far the best. 5 Stars all day! Highly Recommend!',
    services: ['Roof repair for storm and wind damage', 'Roof repair', 'Roof installation', 'Roof damage repair'],
    highlight: 'Great price'
  },
  {
    id: 2,
    name: 'Amir Ghobrial',
    rating: 5,
    text: 'Wonderful job with professional staff with good pricing. Helped us replace and repair over 55 broken tiles on our roof. Were able to work same day of quote and stayed until job was done. Would highly recommend.',
    services: ['Roof repair', 'Roof installation', 'Roof damage repair'],
    highlight: 'Great price · $1–2,000'
  },
  {
    id: 3,
    name: 'Alonso Damian',
    rating: 5,
    text: 'Amazing work from Samuel owner at S New Roof!!! Listen to all my needs from the 1st appointment to when he completed my home. Very professional and clean. Will recommend to my friends and family!!',
    services: [],
    highlight: null
  },
  {
    id: 4,
    name: 'Mush Bek',
    rating: 5,
    text: 'I couldn\'t be happier with the work S New Roof did on my home. From start to finish, the entire process was smooth and stress-free. The team was professional, punctual, and detail-oriented. They kept me informed every step of the way, worked efficiently, and the finished roof looks fantastic. They also made sure the job site was cleaned up thoroughly once the project was done. It\'s rare to find a company that combines great craftsmanship, clear communication, and professionalism all in one — but S New Roof delivered on all fronts. I would highly recommend them to anyone looking for reliable and high-quality roofing work.',
    services: [],
    highlight: null
  },
  {
    id: 5,
    name: 'Brian Nguyen',
    rating: 5,
    text: 'Samuel and his team did an amazing job with my roof repair! Fantastic work replacing the damaged wood - everything looks brand new now. Great price and top-quality workmanship. Highly recommend!',
    services: [],
    highlight: null
  }
]

export default function LandingPage() {
  const [lang, setLang] = useState<'en' | 'es'>('en')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const whatsappLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    lang === 'en' 
      ? 'Hi! I found your website and I\'m interested in roofing services.'
      : '¡Hola! Encontré su sitio web y estoy interesado en servicios de techado.'
  )}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="https://i.ibb.co.com/JjCXRQw9/snr-linkedin-icon-26-sc-original-blue-1.jpg" 
                alt="S New Roof Logo" 
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl object-cover shadow-md"
              />
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-slate-900">S New Roof</span>
                <p className="text-xs text-slate-500">Roofing Experts</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-slate-700 hover:text-orange-500 transition-colors font-medium">{t.nav.home}</a>
              <a href="#about" className="text-slate-700 hover:text-orange-500 transition-colors font-medium">{t.nav.about}</a>
              <a href="#services" className="text-slate-700 hover:text-orange-500 transition-colors font-medium">{t.nav.services}</a>
              <a href="#contact" className="text-slate-700 hover:text-orange-500 transition-colors font-medium">{t.nav.contact}</a>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language Toggle */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'en' ? 'ES' : 'EN'}</span>
              </motion.button>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="hidden sm:flex bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25"
                  onClick={() => window.open('https://api.leadconnectorhq.com/widget/bookings/free-roof-inspection-snewroof/', '_blank')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {t.nav.booking}
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-4 space-y-3">
                <a href="#home" className="block py-2 text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</a>
                <a href="#about" className="block py-2 text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.about}</a>
                <a href="#services" className="block py-2 text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.services}</a>
                <a href="#contact" className="block py-2 text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</a>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                  onClick={() => window.open('https://api.leadconnectorhq.com/widget/bookings/free-roof-inspection-snewroof/', '_blank')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {t.nav.booking}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-200/40 to-amber-100/40 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-cyan-100/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 mb-6"
              >
                <Shield className="w-4 h-4" />
                <span className="text-sm font-semibold">{t.hero.badge} | OC & LA County</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-2 leading-tight"
              >
                {t.hero.title}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                  {t.hero.titleHighlight}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                {t.hero.subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl shadow-orange-500/25 text-lg px-8 py-6"
                    onClick={() => window.open('https://api.leadconnectorhq.com/widget/bookings/free-roof-inspection-snewroof/', '_blank')}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    {t.hero.cta}
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-green-500 text-green-600 hover:bg-green-50 text-lg px-8 py-6"
                    onClick={() => window.open(whatsappLink, '_blank')}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t.hero.ctaSecondary}
                  </Button>
                </motion.div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {[
                  { value: '20+', label: t.stats.experience },
                  { value: '500+', label: t.stats.projects },
                  { value: '99%', label: t.stats.satisfaction },
                  { value: '25', label: t.stats.warranty }
                ].map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-orange-500">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-slate-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* 3D Floating Card */}
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotateY: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative"
                  style={{ perspective: '1000px' }}
                >
                  <Card className="w-72 sm:w-80 overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white via-slate-50 to-orange-50">
                    <CardContent className="p-6">
                      {/* Logo Image */}
                      <div className="relative mb-4">
                        <motion.div
                          animate={{ rotate: [0, 5, 0, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white p-2"
                        >
                          <img 
                            src="https://i.ibb.co.com/JjCXRQw9/snr-linkedin-icon-26-sc-original-blue-1.jpg" 
                            alt="S New Roof Logo"
                            className="w-full h-full object-contain"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1, type: "spring" }}
                          className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                        >
                          <Badge className="bg-green-500 text-white px-3 py-1">
                            <CheckCircle className="w-3 h-3 mr-1" /> Licensed & Insured
                          </Badge>
                        </motion.div>
                      </div>

                      {/* Company Info */}
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-slate-900">S New Roof Inc.</h3>
                        <p className="text-sm text-orange-500 font-medium">Professional Roofing Services</p>
                        <p className="text-xs text-slate-500 mt-1">Santa Ana, CA • OC & LA County</p>
                      </div>

                      {/* Contact Quick Actions */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <Button 
                          size="sm" 
                          className="bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => window.open(whatsappLink, '_blank')}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => window.open(`tel:${companyInfo.phone}`, '_self')}
                        >
                          <Phone className="w-4 h-4 mr-1" /> Call
                        </Button>
                      </div>

                      {/* QR Code */}
                      <div className="mt-4 p-4 bg-white rounded-xl shadow-inner">
                        <p className="text-xs text-slate-500 text-center mb-2">{t.contact.scanQr}</p>
                        <div className="w-32 h-32 mx-auto bg-white rounded-lg overflow-hidden border-2 border-slate-100 p-1">
                          <img 
                            src="https://i.ibb.co.com/hJW5FX2c/General-Page-QR-From.png"
                            alt="QR Code - S New Roof"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Decorative Elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full opacity-20 blur-xl"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-xl"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="cursor-pointer"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ChevronDown className="w-8 h-8 text-slate-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Speech/Message Section */}
      <section id="about" className="py-20 sm:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-orange-500/20 text-orange-400 mb-4">
              <Sparkles className="w-4 h-4 mr-1" /> {t.speech.subtitle}
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t.speech.title}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 overflow-hidden">
                <CardContent className="p-8 sm:p-10">
                  <Quote className="w-12 h-12 text-orange-400 mb-6" />
                  <blockquote className="text-lg sm:text-xl text-white/90 leading-relaxed mb-6">
                    "{t.speech.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white p-1">
                      <img 
                        src="https://i.ibb.co.com/JjCXRQw9/snr-linkedin-icon-26-sc-original-blue-1.jpg" 
                        alt="S New Roof"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-white font-semibold">S New Roof Team</p>
                      <p className="text-white/60 text-sm">Professional Roofing Experts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats & Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-6 h-6" />
                  <span className="font-semibold">{t.speech.highlight}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Award, value: 'A+ BBB', label: 'Rating' },
                  { icon: Star, value: '4.9★', label: 'Google Reviews' },
                  { icon: Users, value: '500+', label: 'Happy Clients' },
                  { icon: Shield, value: '100%', label: 'Satisfaction' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-center"
                  >
                    <item.icon className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{item.value}</div>
                    <div className="text-sm text-white/60">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-orange-100 text-orange-700 mb-4">
              <Building className="w-4 h-4 mr-1" /> Professional Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {t.services.title}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.services.items.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/25"
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600">
                      {service.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-orange-100 text-orange-700 mb-4">
                <ThumbsUp className="w-4 h-4 mr-1" /> Why Us
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                {t.whyUs.title}
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                {t.whyUs.subtitle}
              </p>

              <div className="space-y-4">
                {t.whyUs.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-400 rounded-3xl opacity-20 blur-2xl"
                />
                <Card className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1632759145351-1d592919f522?w=600&h=600&fit=crop"
                    alt="Professional Roofing"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-lg font-semibold">Professional Quality Guaranteed</p>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-slate-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge className="bg-orange-100 text-orange-700 mb-4">
              <Star className="w-4 h-4 mr-1 fill-orange-500" /> Google Reviews
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {t.reviews.title}
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              {t.reviews.subtitle}
            </p>
            
            {/* Google Rating Summary */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-lg">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-2xl font-bold text-slate-900">4.9</span>
              <span className="text-slate-500">{t.reviews.googleRating}</span>
            </div>
          </motion.div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{review.name}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      {review.highlight && (
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          {review.highlight}
                        </Badge>
                      )}
                    </div>

                    {/* Review Text */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-4">
                      "{review.text}"
                    </p>

                    {/* Services Tags */}
                    {review.services && review.services.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-slate-100">
                        {review.services.slice(0, 3).map((service, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full bg-orange-50 text-orange-700">
                            {service}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Read More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Button 
              variant="outline"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8"
              onClick={() => window.open('https://www.google.com/maps/place/S+New+Roof', '_blank')}
            >
              <Star className="w-4 h-4 mr-2 fill-orange-500" />
              {t.reviews.readMore}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge className="bg-orange-100 text-orange-700 mb-4">
              <MapPin className="w-4 h-4 mr-1" /> Service Areas
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {t.areas.title}
            </h2>
            <p className="text-lg text-slate-600">
              {t.areas.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {t.areas.locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium shadow-lg shadow-orange-500/25 cursor-default"
              >
                {location}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t.cta.title}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  className="w-full sm:w-auto bg-white text-orange-600 hover:bg-white/90 text-lg px-10 py-7 shadow-2xl"
                  onClick={() => window.open('https://api.leadconnectorhq.com/widget/bookings/free-roof-inspection-snewroof/', '_blank')}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  {t.cta.button}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-7"
                  onClick={() => window.open(whatsappLink, '_blank')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge className="bg-orange-500/20 text-orange-400 mb-4">
              <PhoneCall className="w-4 h-4 mr-1" /> Contact
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t.contact.title}
            </h2>
            <p className="text-lg text-slate-400">
              {t.contact.subtitle}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone */}
            <motion.a
              href={`tel:${companyInfo.phone}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="block"
            >
              <Card className="h-full bg-white/10 backdrop-blur-sm border-white/10 hover:border-orange-400/50 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{t.contact.phone}</h3>
                  <p className="text-orange-400 font-mono">{companyInfo.phone}</p>
                </CardContent>
              </Card>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href={whatsappLink}
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="block"
            >
              <Card className="h-full bg-white/10 backdrop-blur-sm border-white/10 hover:border-green-400/50 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{t.contact.whatsapp}</h3>
                  <p className="text-green-400 font-mono">{companyInfo.phone}</p>
                </CardContent>
              </Card>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${companyInfo.email}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="block"
            >
              <Card className="h-full bg-white/10 backdrop-blur-sm border-white/10 hover:border-blue-400/50 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{t.contact.email}</h3>
                  <p className="text-blue-400 font-mono text-sm">{companyInfo.email}</p>
                </CardContent>
              </Card>
            </motion.a>

            {/* Book */}
            <motion.a
              href="https://api.leadconnectorhq.com/widget/bookings/free-roof-inspection-snewroof/"
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="block"
            >
              <Card className="h-full bg-white/10 backdrop-blur-sm border-white/10 hover:border-purple-400/50 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{t.contact.book}</h3>
                  <p className="text-purple-400">Free Roof Inspection</p>
                </CardContent>
              </Card>
            </motion.a>
          </div>

          {/* Address & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span>{companyInfo.address}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-5 h-5 text-orange-400" />
                <span>{companyInfo.hours}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.ibb.co.com/JjCXRQw9/snr-linkedin-icon-26-sc-original-blue-1.jpg" 
                alt="S New Roof Logo" 
                className="h-10 w-10 rounded-xl"
              />
              <div>
                <p className="text-white font-bold">S New Roof Inc.</p>
                <p className="text-slate-500 text-sm">{t.footer.tagline}</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} S New Roof. {t.footer.rights}.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
      </motion.a>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-xl shadow-orange-500/30"
          >
            <ChevronUp className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
