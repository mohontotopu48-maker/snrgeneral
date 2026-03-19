'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Phone, Mail, MapPin, Calendar, MessageCircle, ChevronDown, 
  Shield, Award, Clock, Users, Home, Building, Wrench, 
  Star, CheckCircle, ArrowRight, Globe, Menu, X, Quote,
  ChevronUp, Zap, Heart, ThumbsUp, PhoneCall, Sparkles,
  Droplets, Wind, Sun, Snowflake, Leaf, Hammer, FileCheck,
  BadgeCheck, Timer, DollarSign, ThumbsUp as ThumbsUpIcon,
  Send, Bot, MessageSquare, Loader2, XCircle, Minimize2,
  Layers, Factory, Settings, Lightbulb, Thermometer, CloudRain
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

// New Logo URL
const LOGO_URL = "https://i.ibb.co.com/0RZwPVxK/Untitled-design-5.png"

// Booking URL
const BOOKING_URL = "https://api.leadconnectorhq.com/widget/bookings/free-roof-inspection-snewroof/"

// Company Info
const companyInfo = {
  phone: '714-770-4756',
  whatsapp: '17147704756',
  email: 'info@snewroof.com',
  website: 'snewroof.com',
  address: '1415 E 17th St Suite 220A, Santa Ana, CA 92705',
  hours: 'Mon-Sat: 7AM - 7PM',
  license: 'Lic# 1122623'
}

// Translations
const translations = {
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', contact: 'Contact', booking: 'Book Now' },
    hero: {
      badge: 'Trusted Roofing Experts',
      title: 'Protect Your Home',
      titleHighlight: 'With Quality Roofing',
      subtitle: 'Orange County & Los Angeles County\'s most trusted roofing contractor. Over 20 years of excellence in roof installation, repair, and maintenance. Licensed, insured, and committed to excellence.',
      cta: 'Get Free Estimate',
      ctaSecondary: 'WhatsApp Us'
    },
    speech: {
      title: 'Our Commitment to You',
      subtitle: 'Why Homeowners Trust S NEW ROOF',
      quote: 'Every home tells a story, and every roof is the first chapter. At S NEW ROOF, we believe that protecting your family\'s sanctuary shouldn\'t be complicated or stressful. That\'s why we\'ve dedicated ourselves to making roofing simple, transparent, and affordable for every homeowner in our community.',
      highlight: 'Over 1,200+ families protected across Orange County & Los Angeles County'
    },
    stats: {
      experience: 'Years Experience',
      projects: 'Projects Completed',
      satisfaction: 'Client Satisfaction',
      warranty: 'Year Warranty'
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive Roofing Solutions for Your Home & Business',
      learnMore: 'Learn More',
      getQuote: 'Get Free Quote',
      bookNow: 'Book Free Inspection'
    },
    whyUs: {
      title: 'Why Choose S NEW ROOF?',
      subtitle: 'Built on Trust, Delivered with Excellence',
      items: [
        { title: 'Licensed & Insured', desc: 'Full protection and peace of mind for every project (Lic# 1122623)' },
        { title: 'Free Estimates', desc: 'No-obligation quotes within 24 hours' },
        { title: 'Financing Available', desc: 'Flexible payment options for every budget' },
        { title: '25-Year Warranty', desc: 'Industry-leading guarantee on all work' }
      ]
    },
    areas: {
      title: 'Service Areas',
      subtitle: 'Proudly Serving Orange County & Los Angeles County',
      locations: ['Santa Ana', 'Irvine', 'Anaheim', 'Costa Mesa', 'Tustin', 'Orange', 'Newport Beach', 'Huntington Beach', 'Fullerton', 'Garden Grove', 'Long Beach', 'Los Angeles']
    },
    reviews: { title: 'What Our Clients Say', subtitle: 'Real Reviews from Happy Homeowners', googleRating: 'Google Rating', readMore: 'Read More Reviews' },
    cta: { title: 'Ready to Protect Your Home?', subtitle: 'Get a free inspection and estimate today', button: 'Schedule Your Free Consultation' },
    contact: { title: 'Get In Touch', subtitle: 'We\'re here to help with all your roofing needs', phone: 'Call Us', whatsapp: 'WhatsApp', email: 'Email Us', book: 'Book Online', scanQr: 'Scan for Quick Contact' },
    footer: { rights: 'All rights reserved', tagline: 'Protecting Homes, Building Trust' },
    chatbot: { title: 'Roofing Assistant', subtitle: 'Ask me anything about roofing!', placeholder: 'Type your message...', welcome: 'Hi! 👋 I\'m your roofing assistant. How can I help you today? You can ask me about our services, get a quote, or schedule an inspection!', thinking: 'Thinking...', error: 'Sorry, something went wrong. Please try again.' }
  },
  es: {
    nav: { home: 'Inicio', about: 'Nosotros', services: 'Servicios', contact: 'Contacto', booking: 'Reservar' },
    hero: {
      badge: 'Expertos en Techos de Confianza',
      title: 'Proteja Su Hogar',
      titleHighlight: 'Con Techos de Calidad',
      subtitle: 'El contratista de techos más confiable del Condado de Orange y Los Ángeles. Más de 20 años de excelencia en instalación, reparación y mantenimiento de techos.',
      cta: 'Presupuesto Gratis',
      ctaSecondary: 'WhatsApp'
    },
    speech: {
      title: 'Nuestro Compromiso con Usted',
      subtitle: 'Por Qué Los Propietarios Confían en S NEW ROOF',
      quote: 'Cada hogar cuenta una historia, y cada techo es el primer capítulo. En S NEW ROOF, creemos que proteger el santuario de su familia no debería ser complicado ni estresante.',
      highlight: 'Más de 1,200+ familias protegidas en el Condado de Orange y Los Ángeles'
    },
    stats: { experience: 'Años de Experiencia', projects: 'Proyectos Completados', satisfaction: 'Satisfacción del Cliente', warranty: 'Años de Garantía' },
    services: { title: 'Nuestros Servicios', subtitle: 'Soluciones Integrales de Techado para Su Hogar y Negocio', learnMore: 'Más Información', getQuote: 'Cotización Gratis', bookNow: 'Reservar Inspección Gratis' },
    whyUs: {
      title: '¿Por Qué Elegir S NEW ROOF?',
      subtitle: 'Construido con Confianza, Entregado con Excelencia',
      items: [
        { title: 'Licenciado y Asegurado', desc: 'Protección total y tranquilidad en cada proyecto' },
        { title: 'Presupuestos Gratis', desc: 'Cotizaciones sin compromiso en 24 horas' },
        { title: 'Financiamiento Disponible', desc: 'Opciones de pago flexibles para cada presupuesto' },
        { title: 'Garantía de 25 Años', desc: 'Garantía líder en la industria en todo trabajo' }
      ]
    },
    areas: { title: 'Áreas de Servicio', subtitle: 'Orgullosamente Sirviendo al Condado de Orange y Los Ángeles', locations: ['Santa Ana', 'Irvine', 'Anaheim', 'Costa Mesa', 'Tustin', 'Orange', 'Newport Beach', 'Huntington Beach', 'Fullerton', 'Garden Grove', 'Long Beach', 'Los Angeles'] },
    reviews: { title: 'Lo Que Dicen Nuestros Clientes', subtitle: 'Reseñas Reales de Clientes Satisfechos', googleRating: 'Calificación Google', readMore: 'Ver Más Reseñas' },
    cta: { title: '¿Listo para Proteger Su Hogar?', subtitle: 'Obtenga una inspección y presupuesto gratis hoy', button: 'Programe Su Consulta Gratuita' },
    contact: { title: 'Póngase en Contacto', subtitle: 'Estamos aquí para ayudar con todas sus necesidades de techado', phone: 'Llámanos', whatsapp: 'WhatsApp', email: 'Envíanos un Correo', book: 'Reservar en Línea', scanQr: 'Escanee para Contacto Rápido' },
    footer: { rights: 'Todos los derechos reservados', tagline: 'Protegiendo Hogares, Construyendo Confianza' },
    chatbot: { title: 'Asistente de Techos', subtitle: '¡Pregúntame sobre techos!', placeholder: 'Escribe tu mensaje...', welcome: '¡Hola! 👋 Soy tu asistente de techos. ¿Cómo puedo ayudarte hoy?', thinking: 'Pensando...', error: 'Lo siento, algo salió mal. Por favor intenta de nuevo.' }
  }
}

// Extended Service Details with all services
const serviceDetails = {
  // RESIDENTIAL ROOF INSTALLATION
  installation: {
    en: {
      title: 'Roof Installation',
      subtitle: 'Professional New Roof Installation Services',
      category: 'Residential',
      heroDesc: 'Transform your home with a brand new roof installed by Orange County\'s most trusted roofing professionals. We use only premium materials and expert craftsmanship backed by 25-year warranties.',
      overview: 'Our comprehensive roof installation service covers everything from initial consultation to final inspection. We specialize in residential roofing projects of all sizes, delivering exceptional results that protect your property for decades.',
      features: [
        { icon: Home, title: 'Complete Roof Replacement', desc: 'Full tear-off and replacement with premium materials' },
        { icon: Building, title: 'New Construction', desc: 'Professional installation for newly built homes' },
        { icon: Sun, title: 'Energy Efficient Options', desc: 'Cool roof systems that reduce energy costs' },
        { icon: Shield, title: '25-Year Warranty', desc: 'Industry-leading warranty on materials and workmanship' }
      ],
      materials: [
        { name: 'Asphalt Shingles', desc: 'Affordable, versatile, available in many styles. GAF & CertainTeed certified.', price: 'Most Affordable' },
        { name: 'Tile Roofing', desc: 'Classic Mediterranean look with exceptional durability. Clay & concrete options.', price: 'Premium' },
        { name: 'Metal Roofing', desc: 'Long-lasting, energy-efficient, modern appearance. 50+ year lifespan.', price: 'Premium' },
        { name: 'Presidential Shingles', desc: 'Luxury architectural shingles with stunning curb appeal.', price: 'Luxury' }
      ],
      process: [
        { step: 1, title: 'Free Inspection & Consultation', desc: 'Thorough assessment and detailed, no-obligation quote' },
        { step: 2, title: 'Material Selection', desc: 'Choose from our wide range of premium GAF & CertainTeed materials' },
        { step: 3, title: 'Professional Installation', desc: 'Our certified team installs with precision and care' },
        { step: 4, title: 'Final Inspection & Cleanup', desc: 'Quality assurance and complete site cleanup' }
      ],
      benefits: ['Increases property value by up to 15%', 'Improves energy efficiency and lowers bills', 'Enhances curb appeal', '25-year warranty protection', 'Licensed & insured (Lic# 1122623)'],
      cta: 'Get Your Free Installation Quote'
    },
    es: {
      title: 'Instalación de Techos',
      subtitle: 'Servicios Profesionales de Instalación',
      category: 'Residencial',
      heroDesc: 'Transforme su hogar con un techo completamente nuevo instalado por los profesionales más confiables del Condado de Orange.',
      overview: 'Nuestro servicio integral de instalación cubre todo, desde la consulta inicial hasta la inspección final.',
      features: [
        { icon: Home, title: 'Reemplazo Completo', desc: 'Retiro y reemplazo completo con materiales premium' },
        { icon: Building, title: 'Nueva Construcción', desc: 'Instalación profesional para hogares nuevos' },
        { icon: Sun, title: 'Opciones Energéticas', desc: 'Sistemas que reducen costos de energía' },
        { icon: Shield, title: 'Garantía de 25 Años', desc: 'Garantía líder en la industria' }
      ],
      materials: [
        { name: 'Tejas de Asfalto', desc: 'Asequibles y versátiles. Certificados GAF & CertainTeed.', price: 'Más Asequible' },
        { name: 'Techos de Teja', desc: 'Aspecto mediterráneo con durabilidad excepcional.', price: 'Premium' },
        { name: 'Techos Metálicos', desc: 'Duraderos y eficientes. Vida útil de 50+ años.', price: 'Premium' },
        { name: 'Tejas Presidenciales', desc: 'Tejas arquitectónicas de lujo.', price: 'Lujo' }
      ],
      process: [
        { step: 1, title: 'Inspección Gratis', desc: 'Evaluación completa y cotización detallada' },
        { step: 2, title: 'Selección de Materiales', desc: 'Elija entre materiales premium GAF & CertainTeed' },
        { step: 3, title: 'Instalación Profesional', desc: 'Equipo certificado instala con precisión' },
        { step: 4, title: 'Inspección Final', desc: 'Aseguramos calidad y limpiamos el sitio' }
      ],
      benefits: ['Aumenta el valor de la propiedad hasta un 15%', 'Mejora eficiencia energética', 'Mejora el atractivo visual', 'Garantía de 25 años', 'Licenciado y asegurado'],
      cta: 'Obtenga Su Cotización Gratis'
    }
  },
  // ROOF REPAIR
  repair: {
    en: {
      title: 'Roof Repair',
      subtitle: 'Fast & Reliable Roof Repair Services',
      category: 'Residential & Commercial',
      heroDesc: 'Don\'t let a small leak become a major problem. Our expert team quickly diagnoses and repairs all types of roof damage, protecting your home from further issues.',
      overview: 'From minor leaks to major storm damage, our experienced technicians provide fast, effective roof repairs. We identify the root cause of problems and deliver lasting solutions.',
      features: [
        { icon: Droplets, title: 'Leak Detection & Repair', desc: 'Advanced techniques to find and fix hidden leaks' },
        { icon: Wind, title: 'Storm Damage Repair', desc: 'Rapid response for wind, rain, and hail damage' },
        { icon: Wrench, title: 'Shingle Replacement', desc: 'Replace damaged or missing shingles' },
        { icon: Shield, title: 'Flashing Repair', desc: 'Fix compromised seals around penetrations' }
      ],
      commonIssues: [
        { name: 'Roof Leaks', desc: 'Water intrusion from damaged materials', urgent: true },
        { name: 'Missing Shingles', desc: 'Shingles blown off or deteriorated', urgent: false },
        { name: 'Damaged Flashing', desc: 'Compromised seals around vents/chimneys', urgent: true },
        { name: 'Pool Water', desc: 'Standing water on flat roofs', urgent: false },
        { name: 'Granule Loss', desc: 'Shingles losing protective coating', urgent: false },
        { name: 'Sagging Areas', desc: 'Structural issues requiring attention', urgent: true }
      ],
      process: [
        { step: 1, title: 'Emergency Response', desc: 'Same-day service for urgent repairs' },
        { step: 2, title: 'Thorough Inspection', desc: 'Complete assessment of all damage' },
        { step: 3, title: 'Detailed Quote', desc: 'Transparent pricing, no hidden fees' },
        { step: 4, title: 'Expert Repair', desc: 'Professional repair with quality materials' }
      ],
      benefits: ['Prevents costly water damage', 'Extends roof lifespan', 'Maintains structural integrity', 'Protects family health from mold', 'Saves money vs replacement'],
      cta: 'Schedule Your Roof Repair Today'
    },
    es: {
      title: 'Reparación de Techos',
      subtitle: 'Servicios de Reparación Rápidos y Confiables',
      category: 'Residencial y Comercial',
      heroDesc: 'No deje que una pequeña fuga se convierta en un problema mayor.',
      overview: 'Desde fugas menores hasta daños mayores por tormentas, proporcionamos reparaciones rápidas y efectivas.',
      features: [
        { icon: Droplets, title: 'Detección de Fugas', desc: 'Técnicas avanzadas para encontrar fugas ocultas' },
        { icon: Wind, title: 'Daños por Tormentas', desc: 'Respuesta rápida para daños por viento y lluvia' },
        { icon: Wrench, title: 'Reemplazo de Tejas', desc: 'Reemplazar tejas dañadas o faltantes' },
        { icon: Shield, title: 'Reparación de Flashing', desc: 'Reparar sellos comprometidos' }
      ],
      commonIssues: [
        { name: 'Fugas en el Techo', desc: 'Intrusión de agua', urgent: true },
        { name: 'Tejas Faltantes', desc: 'Tejas voladas o deterioradas', urgent: false },
        { name: 'Flashing Dañado', desc: 'Sellos comprometidos', urgent: true },
        { name: 'Acumulación de Agua', desc: 'Agua estancada', urgent: false },
        { name: 'Pérdida de Gránulos', desc: 'Tejas perdiendo recubrimiento', urgent: false },
        { name: 'Áreas Hundidas', desc: 'Problemas estructurales', urgent: true }
      ],
      process: [
        { step: 1, title: 'Respuesta de Emergencia', desc: 'Servicio el mismo día' },
        { step: 2, title: 'Inspección Completa', desc: 'Evaluación de todo el daño' },
        { step: 3, title: 'Cotización Detallada', desc: 'Precios transparentes' },
        { step: 4, title: 'Reparación Experta', desc: 'Reparación profesional' }
      ],
      benefits: ['Previene daños por agua', 'Extiende vida del techo', 'Mantiene integridad estructural', 'Protege del moho', 'Ahorra dinero'],
      cta: 'Programe Su Reparación Hoy'
    }
  },
  // EMERGENCY SERVICES
  emergency: {
    en: {
      title: 'Emergency Roof Services',
      subtitle: '24/7 Emergency Roof Response Team',
      category: 'Emergency',
      heroDesc: 'Roof emergencies don\'t wait for business hours. Our emergency response team is available 24/7 to protect your home when disaster strikes.',
      overview: 'When you need immediate roof assistance, S NEW ROOF is just a phone call away. Our emergency team responds quickly to tarp damaged areas, stop active leaks, and prevent further damage.',
      features: [
        { icon: Clock, title: '24/7 Availability', desc: 'Round-the-clock service, 365 days a year' },
        { icon: Zap, title: '60-Min Response', desc: 'On-site within 60 minutes in most cases' },
        { icon: Shield, title: 'Emergency Tarping', desc: 'Immediate protection to prevent damage' },
        { icon: Phone, title: 'Direct Contact', desc: 'Speak directly with a roofing professional' }
      ],
      emergencyTypes: [
        { name: 'Active Roof Leaks', desc: 'Water actively entering your home', urgent: true },
        { name: 'Storm Damage', desc: 'Wind, hail, or fallen tree damage', urgent: true },
        { name: 'Fire Damage', desc: 'Roof damage from fire', urgent: true },
        { name: 'Structural Collapse', desc: 'Partial or complete roof failure', urgent: true }
      ],
      process: [
        { step: 1, title: 'Stay Safe', desc: 'Move family away from affected area' },
        { step: 2, title: 'Call 714-770-4756', desc: 'Our 24/7 emergency line' },
        { step: 3, title: 'Document Damage', desc: 'Take photos for insurance' },
        { step: 4, title: 'We Arrive', desc: 'Quick assessment and securing' }
      ],
      benefits: ['Immediate response prevents secondary damage', 'Professional assessment', 'Temporary repairs to secure home', 'Insurance documentation', 'Peace of mind'],
      cta: 'Call 24/7 Emergency Line: 714-770-4756'
    },
    es: {
      title: 'Servicios de Emergencia',
      subtitle: 'Equipo de Respuesta 24/7',
      category: 'Emergencia',
      heroDesc: 'Las emergencias no esperan. Nuestro equipo está disponible 24/7.',
      overview: 'Cuando necesita asistencia inmediata, S NEW ROOF está a una llamada de distancia.',
      features: [
        { icon: Clock, title: 'Disponibilidad 24/7', desc: 'Servicio las 24 horas, 365 días' },
        { icon: Zap, title: 'Respuesta en 60 Min', desc: 'En el sitio en 60 minutos' },
        { icon: Shield, title: 'Lonas de Emergencia', desc: 'Protección inmediata' },
        { icon: Phone, title: 'Contacto Directo', desc: 'Hable con un profesional' }
      ],
      emergencyTypes: [
        { name: 'Fugas Activas', desc: 'Agua entrando activamente', urgent: true },
        { name: 'Daños por Tormenta', desc: 'Viento, granizo o árboles', urgent: true },
        { name: 'Daños por Incendio', desc: 'Daños por fuego', urgent: true },
        { name: 'Colapso Estructural', desc: 'Falla del techo', urgent: true }
      ],
      process: [
        { step: 1, title: 'Manténgase Seguro', desc: 'Aleje a la familia del área' },
        { step: 2, title: 'Llame 714-770-4756', desc: 'Línea 24/7' },
        { step: 3, title: 'Documente el Daño', desc: 'Tome fotos para seguro' },
        { step: 4, title: 'Llegamos', desc: 'Evaluación y aseguramiento' }
      ],
      benefits: ['Respuesta inmediata', 'Evaluación profesional', 'Reparaciones temporales', 'Documentación para seguro', 'Tranquilidad'],
      cta: 'Línea 24/7: 714-770-4756'
    }
  },
  // COMMERCIAL ROOFING
  commercial: {
    en: {
      title: 'Commercial Roofing',
      subtitle: 'Professional Commercial & Industrial Roofing Solutions',
      category: 'Commercial',
      heroDesc: 'We provide specialized industrial and commercial roofing services that improve durability and performance. From small businesses to large industrial facilities, we have you covered.',
      overview: 'Our commercial roofing division handles projects of all sizes, from retail stores to warehouses and industrial complexes. We specialize in flat roofing systems including TPO, EPDM, and silicone coating systems.',
      features: [
        { icon: Factory, title: 'TPO Roofing Systems', desc: 'Energy-efficient, heat-welded seams for superior protection' },
        { icon: Layers, title: 'EPDM Roofing', desc: 'Durable rubber roofing with 30+ year lifespan' },
        { icon: Droplets, title: 'Silicone Coatings', desc: 'Seamless, waterproof protection for existing roofs' },
        { icon: Building, title: 'Built-Up Roofing', desc: 'Multi-layer systems for maximum durability' }
      ],
      systems: [
        { name: 'TPO Systems', desc: 'Thermoplastic Polyolefin - Energy Star qualified, heat-weldable seams', price: 'Popular' },
        { name: 'EPDM Systems', desc: 'Ethylene Propylene Diene Monomer - Flexible, UV resistant', price: 'Durable' },
        { name: 'Silicone Coatings', desc: 'Fluid-applied, seamless waterproofing', price: 'Cost-Effective' },
        { name: 'Modified Bitumen', desc: 'Torch-applied or cold-applied systems', price: 'Proven' }
      ],
      process: [
        { step: 1, title: 'Free Assessment', desc: 'Comprehensive roof evaluation and analysis' },
        { step: 2, title: 'Custom Solution', desc: 'Tailored system for your building needs' },
        { step: 3, title: 'Professional Install', desc: 'Minimal disruption to your operations' },
        { step: 4, title: 'Maintenance Plan', desc: 'Ongoing care to maximize roof life' }
      ],
      benefits: ['Minimizes business disruption', 'Energy-efficient systems reduce costs', 'Extended roof lifespan', 'Comprehensive warranties', 'Maintenance programs available'],
      cta: 'Get Commercial Roofing Quote'
    },
    es: {
      title: 'Techos Comerciales',
      subtitle: 'Soluciones Profesionales para Techos Comerciales e Industriales',
      category: 'Comercial',
      heroDesc: 'Proporcionamos servicios especializados que mejoran durabilidad y rendimiento.',
      overview: 'Nuestra división comercial maneja proyectos de todos los tamaños, desde tiendas hasta almacenes.',
      features: [
        { icon: Factory, title: 'Sistemas TPO', desc: 'Eficientes, costuras soldadas para protección superior' },
        { icon: Layers, title: 'Techos EPDM', desc: 'Durables con vida útil de 30+ años' },
        { icon: Droplets, title: 'Recubrimientos de Silicona', desc: 'Protección impermeable sin costuras' },
        { icon: Building, title: 'Techos Construidos', desc: 'Sistemas multicapa para máxima durabilidad' }
      ],
      systems: [
        { name: 'Sistemas TPO', desc: 'Calificado Energy Star, costuras soldables', price: 'Popular' },
        { name: 'Sistemas EPDM', desc: 'Flexible, resistente a UV', price: 'Duradero' },
        { name: 'Recubrimientos Silicona', desc: 'Impermeabilización sin costuras', price: 'Económico' },
        { name: 'Betún Modificado', desc: 'Sistemas aplicados con soplete', price: 'Probado' }
      ],
      process: [
        { step: 1, title: 'Evaluación Gratis', desc: 'Evaluación integral del techo' },
        { step: 2, title: 'Solución Personalizada', desc: 'Sistema adaptado a su edificio' },
        { step: 3, title: 'Instalación Profesional', desc: 'Mínima interrupción' },
        { step: 4, title: 'Plan de Mantenimiento', desc: 'Cuidado continuo' }
      ],
      benefits: ['Mínima interrupción comercial', 'Sistemas eficientes reducen costos', 'Vida extendida del techo', 'Garantías integrales', 'Programas de mantenimiento'],
      cta: 'Obtener Cotización Comercial'
    }
  },
  // FLAT ROOFING
  flatroof: {
    en: {
      title: 'Flat Roofing',
      subtitle: 'Expert Flat Roof Installation & Repair',
      category: 'Residential & Commercial',
      heroDesc: 'Flat roofing is ideal for modern architectural homes and commercial properties. Our team specializes in TPO and Silicone flat roofing systems, offering reliable protection.',
      overview: 'Whether you need a new flat roof installation or repairs to an existing system, our experts deliver superior results. We work with the latest materials and techniques for long-lasting flat roof solutions.',
      features: [
        { icon: Layers, title: 'TPO Membrane', desc: 'Energy-efficient single-ply membrane system' },
        { icon: Droplets, title: 'Silicone Coating', desc: 'Seamless, waterproof protection' },
        { icon: Shield, title: 'Modified Bitumen', desc: 'Multi-ply system for durability' },
        { icon: Sun, title: 'Cool Roof Options', desc: 'Reflective coatings reduce energy costs' }
      ],
      benefits: ['Ideal for modern architecture', 'Energy-efficient options', 'Low maintenance', 'Excellent drainage solutions', 'Long warranties available'],
      cta: 'Get Flat Roof Quote'
    },
    es: {
      title: 'Techos Planos',
      subtitle: 'Instalación y Reparación de Techos Planos',
      category: 'Residencial y Comercial',
      heroDesc: 'Los techos planos son ideales para hogares modernos y propiedades comerciales.',
      overview: 'Ya sea que necesite instalación nueva o reparaciones, nuestros expertos entregan resultados superiores.',
      features: [
        { icon: Layers, title: 'Membrana TPO', desc: 'Sistema eficiente de una sola capa' },
        { icon: Droplets, title: 'Recubrimiento Silicona', desc: 'Protección impermeable sin costuras' },
        { icon: Shield, title: 'Betún Modificado', desc: 'Sistema multicapa duradero' },
        { icon: Sun, title: 'Opciones Cool Roof', desc: 'Recubrimientos reflectantes' }
      ],
      benefits: ['Ideal para arquitectura moderna', 'Opciones eficientes', 'Bajo mantenimiento', 'Soluciones de drenaje', 'Largas garantías'],
      cta: 'Obtener Cotización'
    }
  },
  // GUTTER SERVICES
  gutters: {
    en: {
      title: 'Gutter Services',
      subtitle: 'Professional Gutter Installation & Maintenance',
      category: 'Exterior',
      heroDesc: 'Protect your home\'s foundation and landscaping with properly functioning gutters. We offer complete gutter installation, repair, and cleaning services.',
      overview: 'Your gutter system is essential for directing water away from your home. We provide seamless gutter installation, gutter guard systems, and comprehensive maintenance to keep your drainage working perfectly.',
      features: [
        { icon: CloudRain, title: 'Seamless Gutters', desc: 'Custom-fit aluminum gutters, no leaks' },
        { icon: Shield, title: 'Gutter Guards', desc: 'Prevent clogs and reduce maintenance' },
        { icon: Wrench, title: 'Gutter Repair', desc: 'Fix sagging, leaking, or damaged gutters' },
        { icon: Sparkles, title: 'Cleaning Service', desc: 'Remove debris for proper water flow' }
      ],
      benefits: ['Protects foundation from water damage', 'Prevents basement flooding', 'Protects landscaping', 'Reduces maintenance with guards', 'Extends roof life'],
      cta: 'Get Gutter Service Quote'
    },
    es: {
      title: 'Servicios de Canaletas',
      subtitle: 'Instalación y Mantenimiento Profesional',
      category: 'Exterior',
      heroDesc: 'Proteja los cimientos de su hogar con canaletas que funcionen correctamente.',
      overview: 'Su sistema de canaletas es esencial para dirigir el agua lejos de su hogar.',
      features: [
        { icon: CloudRain, title: 'Canaletas Sin Costuras', desc: 'Aluminio personalizado, sin fugas' },
        { icon: Shield, title: 'Protectores de Canaletas', desc: 'Evitan obstrucciones' },
        { icon: Wrench, title: 'Reparación', desc: 'Reparar canaletas dañadas' },
        { icon: Sparkles, title: 'Limpieza', desc: 'Eliminar residuos para flujo adecuado' }
      ],
      benefits: ['Protege cimientos de daños', 'Previene inundaciones', 'Proteja jardinería', 'Reduce mantenimiento', 'Extiende vida del techo'],
      cta: 'Obtener Cotización'
    }
  },
  // SKYLIGHT SERVICES
  skylight: {
    en: {
      title: 'Skylight Services',
      subtitle: 'Skylight Installation, Repair & Replacement',
      category: 'Specialty',
      heroDesc: 'Bring natural light into your home with professionally installed skylights. We handle installation, repair, and replacement of all skylight types.',
      overview: 'Skylights add beauty and natural light to any space. Our experts install, repair, and replace skylights with proper flashing and sealing to prevent leaks while maximizing light.',
      features: [
        { icon: Sun, title: 'New Installation', desc: 'Fixed or venting skylights professionally installed' },
        { icon: Wrench, title: 'Leak Repair', desc: 'Fix leaking skylights with proper flashing' },
        { icon: Lightbulb, title: 'Solar Tubes', desc: 'Affordable daylighting for small spaces' },
        { icon: Settings, title: 'Replacement', desc: 'Upgrade old or damaged skylights' }
      ],
      benefits: ['Natural light reduces energy costs', 'Improves ventilation', 'Enhances home aesthetics', 'Increases property value', 'Professional waterproofing'],
      cta: 'Get Skylight Quote'
    },
    es: {
      title: 'Lucernarios',
      subtitle: 'Instalación, Reparación y Reemplazo',
      category: 'Especialidad',
      heroDesc: 'Aporte luz natural a su hogar con lucernarios instalados profesionalmente.',
      overview: 'Los lucernarios añaden belleza y luz natural a cualquier espacio.',
      features: [
        { icon: Sun, title: 'Nueva Instalación', desc: 'Lucernarios fijos o ventilados' },
        { icon: Wrench, title: 'Reparación de Fugas', desc: 'Reparar con flashing adecuado' },
        { icon: Lightbulb, title: 'Tubos Solares', desc: 'Iluminación económica para espacios pequeños' },
        { icon: Settings, title: 'Reemplazo', desc: 'Actualizar lucernarios viejos' }
      ],
      benefits: ['Luz natural reduce costos', 'Mejora ventilación', 'Mejora estética', 'Aumenta valor', 'Impermeabilización profesional'],
      cta: 'Obtener Cotización'
    }
  },
  // ATTIC VENTILATION
  ventilation: {
    en: {
      title: 'Attic Ventilation',
      subtitle: 'Roof & Attic Ventilation Solutions',
      category: 'Efficiency',
      heroDesc: 'Proper attic ventilation is crucial for roof health and energy efficiency. We install ridge vents, attic fans, and solar-powered ventilation systems.',
      overview: 'Without proper ventilation, heat and moisture build-up can damage your roof and increase energy costs. Our ventilation solutions protect your home and improve comfort.',
      features: [
        { icon: Wind, title: 'Ridge Vents', desc: 'Continuous airflow along roof peak' },
        { icon: Thermometer, title: 'Attic Fans', desc: 'Powered ventilation for heat removal' },
        { icon: Sun, title: 'Solar Attic Fans', desc: 'Energy-efficient solar-powered ventilation' },
        { icon: Settings, title: 'Soffit Vents', desc: 'Intake ventilation for balanced airflow' }
      ],
      benefits: ['Reduces cooling costs by up to 30%', 'Prevents moisture damage', 'Extends roof life', 'Prevents ice dams', 'Improves indoor comfort'],
      cta: 'Get Ventilation Quote'
    },
    es: {
      title: 'Ventilación de Ático',
      subtitle: 'Soluciones de Ventilación',
      category: 'Eficiencia',
      heroDesc: 'La ventilación adecuada es crucial para la salud del techo y eficiencia energética.',
      overview: 'Sin ventilación adecuada, el calor y humedad pueden dañar su techo.',
      features: [
        { icon: Wind, title: 'Ventilación de Cresta', desc: 'Flujo de aire continuo' },
        { icon: Thermometer, title: 'Ventiladores de Ático', desc: 'Ventilación motorizada' },
        { icon: Sun, title: 'Ventiladores Solares', desc: 'Ventilación eficiente con energía solar' },
        { icon: Settings, title: 'Ventilas de Soffit', desc: 'Entrada de aire balanceada' }
      ],
      benefits: ['Reduce costos de enfriamiento hasta 30%', 'Previene daños por humedad', 'Extiende vida del techo', 'Previene presas de hielo', 'Mejora confort'],
      cta: 'Obtener Cotización'
    }
  },
  // ROOF COATING
  coating: {
    en: {
      title: 'Roof Coating',
      subtitle: 'Protective Roof Coating Systems',
      category: 'Restoration',
      heroDesc: 'Extend the life of your existing roof with professional coating systems. A cost-effective alternative to full replacement that adds years of protection.',
      overview: 'Roof coatings provide a seamless, waterproof barrier that protects your roof from UV rays, weather damage, and leaks. Ideal for flat and low-slope commercial and residential roofs.',
      features: [
        { icon: Layers, title: 'Silicone Coating', desc: 'Seamless, UV-resistant protection' },
        { icon: Sun, title: 'Cool Roof Coating', desc: 'Reflective coating reduces energy costs' },
        { icon: Shield, title: 'Elastomeric Coating', desc: 'Flexible, waterproof membrane' },
        { icon: Droplets, title: 'Waterproofing', desc: 'Stop leaks and prevent future damage' }
      ],
      benefits: ['Extends roof life 10-15 years', 'Reduces energy costs', 'Cost-effective vs replacement', 'Seamless waterproofing', 'Minimal disruption'],
      cta: 'Get Coating Quote'
    },
    es: {
      title: 'Recubrimiento de Techos',
      subtitle: 'Sistemas de Recubrimiento Protector',
      category: 'Restauración',
      heroDesc: 'Extienda la vida de su techo con sistemas de recubrimiento profesional.',
      overview: 'Los recubrimientos proporcionan una barrera impermeable sin costuras.',
      features: [
        { icon: Layers, title: 'Recubrimiento Silicona', desc: 'Protección resistente a UV' },
        { icon: Sun, title: 'Cool Roof', desc: 'Recubrimiento reflectante' },
        { icon: Shield, title: 'Recubrimiento Elastomérico', desc: 'Membrana flexible e impermeable' },
        { icon: Droplets, title: 'Impermeabilización', desc: 'Detiene fugas y previene daños' }
      ],
      benefits: ['Extiende vida del techo 10-15 años', 'Reduce costos de energía', 'Económico vs reemplazo', 'Impermeabilización sin costuras', 'Mínima interrupción'],
      cta: 'Obtener Cotización'
    }
  },
  // INSPECTION
  inspection: {
    en: {
      title: 'Roof Inspection',
      subtitle: 'Comprehensive Roof Inspection & Maintenance',
      category: 'Maintenance',
      heroDesc: 'Regular inspections and maintenance are key to maximizing your roof\'s lifespan. Our comprehensive services identify problems before they become costly repairs.',
      overview: 'Our certified inspectors provide thorough roof assessments, identifying current issues and potential problems. Free inspections available for homeowners.',
      features: [
        { icon: FileCheck, title: 'Full Inspection', desc: 'Complete roof system evaluation with report' },
        { icon: Wrench, title: 'Preventive Maintenance', desc: 'Proactive care to prevent problems' },
        { icon: BadgeCheck, title: 'Certified Inspectors', desc: 'Trained professionals using advanced techniques' },
        { icon: Shield, title: 'Warranty Compliance', desc: 'Maintain manufacturer warranty' }
      ],
      benefits: ['Extends roof lifespan 25-50%', 'Identifies problems early', 'Maintains warranty validity', 'Improves energy efficiency', 'Free for homeowners'],
      cta: 'Schedule Free Inspection'
    },
    es: {
      title: 'Inspección de Techos',
      subtitle: 'Inspección y Mantenimiento Integral',
      category: 'Mantenimiento',
      heroDesc: 'Las inspecciones regulares son clave para maximizar la vida útil de su techo.',
      overview: 'Nuestros inspectores certificados proporcionan evaluaciones exhaustivas.',
      features: [
        { icon: FileCheck, title: 'Inspección Completa', desc: 'Evaluación con informe detallado' },
        { icon: Wrench, title: 'Mantenimiento Preventivo', desc: 'Cuidado proactivo' },
        { icon: BadgeCheck, title: 'Inspectores Certificados', desc: 'Profesionales entrenados' },
        { icon: Shield, title: 'Cumplimiento de Garantía', desc: 'Mantiene garantía del fabricante' }
      ],
      benefits: ['Extiende vida 25-50%', 'Identifica problemas temprano', 'Mantiene garantía', 'Mejora eficiencia', 'Gratis para propietarios'],
      cta: 'Programar Inspección Gratis'
    }
  }
}

// Service Cards Data - Extended
const serviceCards = [
  { id: 'installation', icon: Home, color: 'from-blue-500 to-blue-600', featured: true },
  { id: 'repair', icon: Wrench, color: 'from-orange-500 to-orange-600', featured: true },
  { id: 'emergency', icon: Zap, color: 'from-red-500 to-red-600', featured: true },
  { id: 'commercial', icon: Factory, color: 'from-slate-600 to-slate-700', featured: true },
  { id: 'flatroof', icon: Layers, color: 'from-cyan-500 to-cyan-600', featured: false },
  { id: 'gutters', icon: CloudRain, color: 'from-indigo-500 to-indigo-600', featured: false },
  { id: 'skylight', icon: Sun, color: 'from-yellow-500 to-amber-500', featured: false },
  { id: 'ventilation', icon: Wind, color: 'from-teal-500 to-teal-600', featured: false },
  { id: 'coating', icon: Shield, color: 'from-purple-500 to-purple-600', featured: false },
  { id: 'inspection', icon: FileCheck, color: 'from-green-500 to-green-600', featured: false }
]

// Google Reviews
const reviews = [
  { id: 1, name: 'Northland Center', rating: 5, text: 'I had an emergency leak, late at night during a big storm. S NEW ROOF was there in less than an hour and took care of everything. 5 Stars all day! Highly Recommend!', services: ['Emergency Repair', 'Storm Damage'], highlight: 'Great price' },
  { id: 2, name: 'Amir Ghobrial', rating: 5, text: 'Wonderful job with professional staff with good pricing. Helped us replace and repair over 55 broken tiles on our roof. Would highly recommend.', services: ['Tile Repair', 'Roof Repair'], highlight: 'Great price · $1–2,000' },
  { id: 3, name: 'Alonso Damian', rating: 5, text: 'Amazing work from Samuel owner at S NEW ROOF!!! Listen to all my needs from the 1st appointment to when he completed my home. Very professional and clean.', services: [], highlight: null },
  { id: 4, name: 'Mush Bek', rating: 5, text: 'I couldn\'t be happier with the work S NEW ROOF did on my home. From start to finish, the entire process was smooth and stress-free. Highly recommend!', services: [], highlight: null },
  { id: 5, name: 'Brian Nguyen', rating: 5, text: 'Samuel and his team did an amazing job with my roof repair! Fantastic work replacing the damaged wood. Great price and top-quality workmanship.', services: [], highlight: null }
]

// Chatbot Component
function ChatBot({ lang }: { lang: 'en' | 'es' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const t = translations[lang].chatbot

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: t.welcome }])
    }
  }, [isOpen, t.welcome])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return
    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages.slice(-10) })
      })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: t.error }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring", stiffness: 200 }} className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(true)} className="relative group">
              <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 shadow-2xl shadow-orange-500/40 flex items-center justify-center overflow-hidden">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
                <img src={LOGO_URL} alt="Chat" className="w-10 h-10 rounded-full object-cover border-2 border-white/50" />
              </div>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.5 }} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-xs font-bold">1</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3 }} className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap">
                <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-xl">{t.subtitle}<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 border-8 border-transparent border-l-slate-900" /></div>
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 100, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 100, scale: 0.8 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className={`fixed z-50 ${isMinimized ? 'bottom-6 right-6' : 'bottom-6 right-6 sm:bottom-24 sm:right-6 w-[calc(100%-3rem)] sm:w-96'}`}>
            {isMinimized ? (
              <motion.button onClick={() => setIsMinimized(false)} className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3 rounded-2xl shadow-2xl shadow-orange-500/30">
                <img src={LOGO_URL} alt="Bot" className="w-8 h-8 rounded-full object-cover border-2 border-white/50" />
                <span className="font-medium">{t.title}</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </motion.button>
            ) : (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
                <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 p-4 text-white relative overflow-hidden">
                  <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div animate={{ rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}><img src={LOGO_URL} alt="Bot" className="w-12 h-12 rounded-full object-cover border-3 border-white/50 shadow-lg" /></motion.div>
                      <div><h3 className="font-bold text-lg">{t.title}</h3><div className="flex items-center gap-1.5 text-white/90 text-sm"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /><span>Online</span></div></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setIsMinimized(true)} className="p-2 hover:bg-white/20 rounded-full transition-colors"><Minimize2 className="w-5 h-5" /></button>
                      <button onClick={() => { setIsOpen(false); setMessages([]) }} className="p-2 hover:bg-white/20 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white">
                  {messages.map((msg, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        {msg.role === 'assistant' && <img src={LOGO_URL} alt="Bot" className="w-8 h-8 rounded-full object-cover border-2 border-orange-200 flex-shrink-0" />}
                        <div className={`p-3 rounded-2xl ${msg.role === 'user' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-br-md' : 'bg-white text-slate-700 border border-slate-200 rounded-bl-md shadow-sm'}`}><p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p></div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2"><img src={LOGO_URL} alt="Bot" className="w-8 h-8 rounded-full object-cover border-2 border-orange-200" /><div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md p-3 shadow-sm"><div className="flex items-center gap-1"><motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-2 h-2 bg-orange-400 rounded-full" /><motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-orange-400 rounded-full" /><motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-orange-400 rounded-full" /></div></div></motion.div>}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t border-slate-100 bg-white">
                  <div className="flex items-center gap-2">
                    <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder={t.placeholder} className="flex-1 rounded-full border-slate-200 focus:border-orange-400 focus:ring-orange-400/20" disabled={isLoading} />
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={sendMessage} disabled={isLoading || !input.trim()} className="w-11 h-11 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 disabled:opacity-50"><Send className="w-5 h-5" /></motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function LandingPage() {
  const [lang, setLang] = useState<'en' | 'es'>('en')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const whatsappLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(lang === 'en' ? 'Hi! I found your website and I\'m interested in roofing services.' : '¡Hola! Encontré su sitio web y estoy interesado en servicios de techado.')}`

  const currentService = selectedService ? serviceDetails[selectedService as keyof typeof serviceDetails]?.[lang] : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 flex flex-col">
      {/* Navigation */}
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
              <motion.div whileHover={{ rotate: 5 }} className="relative">
                <img src={LOGO_URL} alt="S NEW ROOF Logo" className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-cover shadow-lg border-2 border-white" />
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </motion.div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">S NEW ROOF</span>
                <p className="text-xs text-slate-500 flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> 4.9 Rating • {companyInfo.license}</p>
              </div>
            </motion.div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-slate-700 hover:text-orange-500 transition-colors font-medium">{t.nav.home}</a>
              <a href="#about" className="text-slate-700 hover:text-orange-500 transition-colors font-medium">{t.nav.about}</a>
              <a href="#services" className="text-slate-700 hover:text-orange-500 transition-colors font-medium">{t.nav.services}</a>
              <a href="#contact" className="text-slate-700 hover:text-orange-500 transition-colors font-medium">{t.nav.contact}</a>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setLang(lang === 'en' ? 'es' : 'en')} className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium"><Globe className="w-4 h-4" /><span>{lang === 'en' ? 'ES' : 'EN'}</span></motion.button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="hidden sm:flex bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25" onClick={() => window.open(BOOKING_URL, '_blank')}><Calendar className="w-4 h-4 mr-2" />{t.nav.booking}</Button>
              </motion.div>
              <button className="md:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t">
              <div className="px-4 py-4 space-y-3">
                <a href="#home" className="block py-2 text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</a>
                <a href="#about" className="block py-2 text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.about}</a>
                <a href="#services" className="block py-2 text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.services}</a>
                <a href="#contact" className="block py-2 text-slate-700 font-medium" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</a>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white" onClick={() => window.open(BOOKING_URL, '_blank')}><Calendar className="w-4 h-4 mr-2" />{t.nav.booking}</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 120, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-orange-300/50 to-amber-200/50 rounded-full blur-3xl" />
          <motion.div animate={{ scale: [1.3, 1, 1.3], rotate: [0, -120, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/40 to-cyan-100/40 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 mb-6 shadow-lg shadow-orange-100/50">
                <motion.div animate={{ rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}><Shield className="w-4 h-4" /></motion.div>
                <span className="text-sm font-semibold">{t.hero.badge}</span>
                <span className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full font-bold">OC & LA</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 mb-4 leading-tight">
                {t.hero.title}{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500">{t.hero.titleHighlight}</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">{t.hero.subtitle}</motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                  <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl blur-xl opacity-50" />
                  <Button size="lg" className="relative w-full sm:w-auto bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:via-orange-700 hover:to-amber-600 text-white shadow-2xl shadow-orange-500/30 text-lg px-8 py-7" onClick={() => window.open(BOOKING_URL, '_blank')}><Calendar className="w-5 h-5 mr-2" />{t.hero.cta}<ArrowRight className="w-5 h-5 ml-2" /></Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-green-500 text-green-600 hover:bg-green-50 text-lg px-8 py-7 shadow-lg shadow-green-500/10" onClick={() => window.open(whatsappLink, '_blank')}><MessageCircle className="w-5 h-5 mr-2" />{t.hero.ctaSecondary}</Button>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[{ value: '20+', label: t.stats.experience, icon: Award }, { value: '1,200+', label: t.stats.projects, icon: Home }, { value: '99%', label: t.stats.satisfaction, icon: ThumbsUp }, { value: '25yr', label: t.stats.warranty, icon: Shield }].map((stat, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + index * 0.1 }} whileHover={{ scale: 1.05, y: -5 }} className="text-center p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-200/50 border border-slate-100">
                    <stat.icon className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-slate-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <motion.div animate={{ y: [0, -15, 0], rotateY: [0, 5, 0, -5, 0], rotateX: [0, 2, 0, -2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
                  <Card className="w-72 sm:w-80 overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white via-slate-50 to-orange-50 rounded-3xl">
                    <CardContent className="p-6">
                      <div className="relative mb-6">
                        <motion.div animate={{ rotate: [0, 5, 0, -5, 0], scale: [1, 1.02, 1] }} transition={{ duration: 4, repeat: Infinity }} className="w-36 h-36 mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white p-2">
                          <img src={LOGO_URL} alt="S NEW ROOF Logo" className="w-full h-full object-contain rounded-xl" />
                        </motion.div>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }} className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1 shadow-lg"><CheckCircle className="w-3 h-3 mr-1" /> Licensed & Insured</Badge>
                        </motion.div>
                      </div>
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-slate-900">S NEW ROOF Inc.</h3>
                        <p className="text-orange-500 font-medium">Professional Roofing Services</p>
                        <p className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1"><MapPin className="w-3 h-3" /> Santa Ana, CA • OC & LA County</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/30" onClick={() => window.open(whatsappLink, '_blank')}><MessageCircle className="w-4 h-4 mr-1" /> WhatsApp</Button>
                        <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30" onClick={() => window.open(`tel:${companyInfo.phone}`, '_self')}><Phone className="w-4 h-4 mr-1" /> Call</Button>
                      </div>
                      <div className="mt-4 p-4 bg-gradient-to-br from-slate-50 to-orange-50 rounded-2xl shadow-inner">
                        <p className="text-xs text-slate-500 text-center mb-3 font-medium">{t.contact.scanQr}</p>
                        <div className="w-32 h-32 mx-auto bg-white rounded-xl overflow-hidden border-2 border-orange-100 shadow-lg p-2">
                          <img src="https://i.ibb.co.com/hJW5FX2c/General-Page-QR-From.png" alt="QR Code" className="w-full h-full object-contain" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <motion.div animate={{ rotate: 360, y: [-5, 5, -5] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl opacity-80 blur-sm flex items-center justify-center shadow-xl"><Home className="w-8 h-8 text-white" /></motion.div>
                  <motion.div animate={{ rotate: -360, y: [5, -5, 5] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl opacity-80 blur-sm flex items-center justify-center shadow-xl"><Shield className="w-7 h-7 text-white" /></motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}><ChevronDown className="w-8 h-8 text-slate-400" /></motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 mb-4 border border-orange-500/20"><Sparkles className="w-4 h-4 mr-1" /> {t.speech.subtitle}</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{t.speech.title}</h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 overflow-hidden rounded-3xl">
                <CardContent className="p-8 sm:p-10">
                  <Quote className="w-12 h-12 text-orange-400 mb-6" />
                  <blockquote className="text-lg sm:text-xl text-white/90 leading-relaxed mb-6">"{t.speech.quote}"</blockquote>
                  <div className="flex items-center gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} className="w-16 h-16 rounded-2xl overflow-hidden bg-white p-1.5 shadow-xl"><img src={LOGO_URL} alt="S NEW ROOF" className="w-full h-full object-contain rounded-xl" /></motion.div>
                    <div><p className="text-white font-semibold text-lg">S NEW ROOF Team</p><p className="text-white/60 text-sm">Professional Roofing Experts • {companyInfo.license}</p></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-6">
              <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xl shadow-orange-500/30">
                <div className="flex items-center gap-3"><Heart className="w-6 h-6" /><span className="font-semibold text-lg">{t.speech.highlight}</span></div>
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                {[{ icon: Award, value: 'A+ BBB', label: 'Rating', color: 'from-blue-400 to-blue-500' }, { icon: Star, value: '4.9★', label: 'Google', color: 'from-yellow-400 to-orange-400' }, { icon: Users, value: '1,200+', label: 'Projects', color: 'from-green-400 to-emerald-400' }, { icon: Shield, value: '100%', label: 'Satisfaction', color: 'from-purple-400 to-violet-400' }].map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ scale: 1.05, y: -5 }} className="p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}><item.icon className="w-6 h-6 text-white" /></div>
                    <div className="text-2xl font-bold text-white">{item.value}</div>
                    <div className="text-sm text-white/60">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Extended */}
      <section id="services" className="py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0"><motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-orange-100/50 to-amber-50/50 rounded-full blur-3xl" /></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 mb-4 border border-orange-200"><Building className="w-4 h-4 mr-1" /> Professional Services</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">{t.services.title}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t.services.subtitle}</p>
          </motion.div>
          
          {/* Featured Services */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {serviceCards.filter(s => s.featured).map((service, index) => {
              const serviceData = serviceDetails[service.id as keyof typeof serviceDetails]?.[lang]
              return (
                <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -10 }} className="group cursor-pointer" onClick={() => setSelectedService(service.id)}>
                  <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl"><CardContent className="p-6">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}><service.icon className="w-8 h-8 text-white" /></motion.div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors">{serviceData?.title}</h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">{serviceData?.subtitle}</p>
                    <Button variant="link" className="text-orange-500 p-0 group-hover:text-orange-600">{t.services.learnMore} <ArrowRight className="w-4 h-4 ml-1" /></Button>
                  </CardContent></Card>
                </motion.div>
              )
            })}
          </div>
          
          {/* Additional Services */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceCards.filter(s => !s.featured).map((service, index) => {
              const serviceData = serviceDetails[service.id as keyof typeof serviceDetails]?.[lang]
              return (
                <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }} whileHover={{ y: -5, scale: 1.02 }} className="group cursor-pointer" onClick={() => setSelectedService(service.id)}>
                  <Card className="h-full border border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all bg-white rounded-xl"><CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}><service.icon className="w-6 h-6 text-white" /></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 group-hover:text-orange-500 transition-colors truncate">{serviceData?.title}</h3>
                      <p className="text-sm text-slate-500 truncate">{serviceData?.category}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors flex-shrink-0" />
                  </CardContent></Card>
                </motion.div>
              )
            })}
          </div>
          
          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl shadow-orange-500/25" onClick={() => window.open(BOOKING_URL, '_blank')}><Calendar className="w-5 h-5 mr-2" />{t.services.bookNow}</Button>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-slate-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <Badge className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 mb-4 border border-orange-200"><Star className="w-4 h-4 mr-1 fill-orange-500" /> Google Reviews</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">{t.reviews.title}</h2>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-xl border border-slate-100 mt-6">
              <div className="flex items-center gap-1">{[1, 2, 3, 4, 5].map((star) => (<motion.div key={star} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: star * 0.1 }}><Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /></motion.div>))}</div>
              <span className="text-2xl font-bold text-slate-900">4.9</span>
              <span className="text-slate-500">{t.reviews.googleRating}</span>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -5 }} className="h-full">
                <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl"><CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">{review.name.charAt(0)}</div>
                      <div><h4 className="font-semibold text-slate-900">{review.name}</h4><div className="flex items-center gap-1">{[...Array(review.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />))}</div></div>
                    </div>
                    {review.highlight && <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs border border-green-200">{review.highlight}</Badge>}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-4">"{review.text}"</p>
                  {review.services && review.services.length > 0 && (<div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-slate-100">{review.services.slice(0, 3).map((service, i) => (<span key={i} className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border border-orange-100">{service}</span>))}</div>)}
                </CardContent></Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <Badge className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 mb-4 border border-orange-500/20"><MapPin className="w-4 h-4 mr-1" /> Service Areas</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{t.areas.title}</h2>
            <p className="text-lg text-slate-400">{t.areas.subtitle}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-wrap justify-center gap-3">
            {t.areas.locations.map((location, index) => (<motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} whileHover={{ scale: 1.1 }} className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium shadow-lg shadow-orange-500/30 cursor-default">{location}</motion.div>))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <motion.div animate={{ scale: [1.3, 1, 1.3] }} transition={{ duration: 15, repeat: Infinity }} className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <motion.div animate={{ rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-20 h-20 mx-auto mb-6 rounded-2xl overflow-hidden bg-white p-1 shadow-2xl"><img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain rounded-xl" /></motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{t.cta.title}</h2>
            <p className="text-xl text-white/90 mb-8">{t.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="w-full sm:w-auto bg-white text-orange-600 hover:bg-white/90 text-lg px-10 py-7 shadow-2xl rounded-full" onClick={() => window.open(BOOKING_URL, '_blank')}><Calendar className="w-5 h-5 mr-2" />{t.cta.button}<ArrowRight className="w-5 h-5 ml-2" /></Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-7 rounded-full" onClick={() => window.open(whatsappLink, '_blank')}><MessageCircle className="w-5 h-5 mr-2" />WhatsApp</Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <Badge className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 mb-4 border border-orange-500/20"><PhoneCall className="w-4 h-4 mr-1" /> Contact</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{t.contact.title}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.a href={`tel:${companyInfo.phone}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} whileHover={{ y: -5 }} className="block"><Card className="h-full bg-white/10 backdrop-blur-sm border-white/10 hover:border-orange-400/50 transition-all cursor-pointer rounded-2xl"><CardContent className="p-6 text-center"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30"><Phone className="w-7 h-7 text-white" /></div><h3 className="text-white font-semibold mb-1">{t.contact.phone}</h3><p className="text-orange-400 font-mono">{companyInfo.phone}</p></CardContent></Card></motion.a>
            <motion.a href={whatsappLink} target="_blank" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} whileHover={{ y: -5 }} className="block"><Card className="h-full bg-white/10 backdrop-blur-sm border-white/10 hover:border-green-400/50 transition-all cursor-pointer rounded-2xl"><CardContent className="p-6 text-center"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30"><MessageCircle className="w-7 h-7 text-white" /></div><h3 className="text-white font-semibold mb-1">{t.contact.whatsapp}</h3><p className="text-green-400 font-mono">{companyInfo.phone}</p></CardContent></Card></motion.a>
            <motion.a href={`mailto:${companyInfo.email}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} whileHover={{ y: -5 }} className="block"><Card className="h-full bg-white/10 backdrop-blur-sm border-white/10 hover:border-blue-400/50 transition-all cursor-pointer rounded-2xl"><CardContent className="p-6 text-center"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30"><Mail className="w-7 h-7 text-white" /></div><h3 className="text-white font-semibold mb-1">{t.contact.email}</h3><p className="text-blue-400 font-mono text-sm">{companyInfo.email}</p></CardContent></Card></motion.a>
            <motion.a href={BOOKING_URL} target="_blank" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} whileHover={{ y: -5 }} className="block"><Card className="h-full bg-white/10 backdrop-blur-sm border-white/10 hover:border-purple-400/50 transition-all cursor-pointer rounded-2xl"><CardContent className="p-6 text-center"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30"><Calendar className="w-7 h-7 text-white" /></div><h3 className="text-white font-semibold mb-1">{t.contact.book}</h3><p className="text-purple-400">Free Inspection</p></CardContent></Card></motion.a>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-slate-400"><MapPin className="w-5 h-5 text-orange-400" /><span>{companyInfo.address}</span></div>
              <div className="flex items-center gap-2 text-slate-400"><Clock className="w-5 h-5 text-orange-400" /><span>{companyInfo.hours}</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3"><img src={LOGO_URL} alt="S NEW ROOF" className="w-10 h-10 rounded-xl object-cover" /><div><span className="text-white font-bold">S NEW ROOF</span><p className="text-slate-500 text-xs">{t.footer.tagline} • {companyInfo.license}</p></div></div>
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} S NEW ROOF. {t.footer.rights}.</p>
          </div>
        </div>
      </footer>

      {/* Service Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {currentService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2"><Badge className="bg-orange-100 text-orange-700">{currentService.category}</Badge></div>
                <DialogTitle className="text-2xl">{currentService.title}</DialogTitle>
                <DialogDescription className="text-base">{currentService.subtitle}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <p className="text-slate-600 text-lg">{currentService.heroDesc}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {currentService.features.map((feature, i) => (
                    <Card key={i} className="p-4 border border-slate-100"><div className="flex items-start gap-3"><feature.icon className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" /><div><h4 className="font-semibold">{feature.title}</h4><p className="text-sm text-slate-600">{feature.desc}</p></div></div></Card>
                  ))}
                </div>
                {'materials' in currentService && currentService.materials && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-900">{lang === 'en' ? 'Materials We Use' : 'Materiales que Usamos'}</h3>
                    <div className="grid gap-3">{currentService.materials.map((m, i) => (<div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"><div><span className="font-medium">{m.name}</span><p className="text-sm text-slate-600">{m.desc}</p></div><Badge className="bg-orange-100 text-orange-700">{m.price}</Badge></div>))}</div>
                  </div>
                )}
                {'systems' in currentService && currentService.systems && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-900">{lang === 'en' ? 'Systems We Install' : 'Sistemas que Instalamos'}</h3>
                    <div className="grid gap-3">{currentService.systems.map((s, i) => (<div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"><div><span className="font-medium">{s.name}</span><p className="text-sm text-slate-600">{s.desc}</p></div><Badge className="bg-orange-100 text-orange-700">{s.price}</Badge></div>))}</div>
                  </div>
                )}
                {'benefits' in currentService && currentService.benefits && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-900">{lang === 'en' ? 'Benefits' : 'Beneficios'}</h3>
                    <div className="grid sm:grid-cols-2 gap-2">{currentService.benefits.map((b, i) => (<div key={i} className="flex items-center gap-2 text-slate-600"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /><span className="text-sm">{b}</span></div>))}</div>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white" onClick={() => window.open(BOOKING_URL, '_blank')}><Calendar className="w-4 h-4 mr-2" />{currentService.cta}</Button>
                  <Button variant="outline" className="flex-1 border-green-500 text-green-600 hover:bg-green-50" onClick={() => window.open(whatsappLink, '_blank')}><MessageCircle className="w-4 h-4 mr-2" />WhatsApp</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Scroll to Top */}
      <AnimatePresence>{showScrollTop && (<motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={scrollToTop} className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-slate-900 text-white shadow-2xl flex items-center justify-center"><ChevronUp className="w-5 h-5" /></motion.button>)}</AnimatePresence>

      {/* Chatbot */}
      <ChatBot lang={lang} />
    </div>
  )
}
