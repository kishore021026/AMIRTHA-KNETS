import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

import FabricCanvas from '../components/FabricCanvas'
import ParticleThreads from '../components/ParticleThreads'

const SHOWCASE_IMAGES = [
  { url: '/images/fabric-1.jpg', title: 'Raw Silk & Fine Linen' },
  { url: '/images/fabric-2.jpg', title: 'Woven Cashmere & Wool' },
  { url: '/images/fabric-3.jpg', title: 'Architectural Jacquard Textures' }
]

// Top 3 Major Enterprise & Global Brands (Large Scale Cards)
const MAJOR_CLIENTS = [
  {
    name: 'TECHNO SPORT',
    category: 'Performance Activewear • Large Enterprise',
    description: 'Engineered moisture-wicking and high-stretch functional knits powering a nationwide retail network.',
    bgImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'HYUNDAI',
    category: 'Automotive & Uniforms • Global MNC',
    description: 'Providing heavy-duty, high-tensile specialized technical fabrics for official corporate dealership standards.',
    bgImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'PRANERA (LAYA)',
    category: 'Ladies Apparel & Fabrics • SME',
    description: 'Tirupur-based manufacturer and wholesaler specializing in premium ladies wear and eco-friendly dry-fit fabrics.',
    bgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop'
  }
]

// Remaining 4 Specialized Industry Partners (4-in-a-row Grid with Background Images)
const SPECIALIZED_PARTNERS = [
  {
    name: 'PARUTHI KNIT WEARS',
    category: 'Activewear & Sportswear',
    description: 'Specialized textile and apparel manufacturing firm based in the Tirupur textile hub.',
    bgImage: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'ADITI CREATION',
    category: 'Textile Manufacturing',
    description: 'Private textile manufacturer and garment supplier operating in regional and export markets.',
    bgImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'YESSOR TECH',
    category: 'Cleanroom Garments',
    description: 'Specialized lean manufacturer focusing on industrial cleanroom garments and specialized wipes.',
    bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'KARUNYA KNIT WEARS',
    category: 'Cotton & Corporate Workwear',
    description: 'Regional manufacturer providing quality cotton, jersey fabrics, and corporate workwear.',
    bgImage: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1000&auto=format&fit=crop'
  }
]

// Manufacturing Process Steps
const MANUFACTURING_STEPS = [
  {
    step: '01',
    title: 'Raw Fiber Sourcing',
    description: 'We partner globally with ethical farms to harvest the finest organic cotton, raw silk, and high-grade modal fibers before they enter the mill.',
    image: '/images/fabric-2.jpg'
  },
  {
    step: '02',
    title: 'Precision Spinning & Blending',
    description: 'Raw fibers are combed, cleaned, and spun into high-tensile yarns with exact micron counts optimized for durability and breathability.',
    image: '/images/fabric-step2.jpg'
  },
  {
    step: '03',
    title: 'Advanced Loom Weaving',
    description: 'Using state-of-the-art Italian and Japanese looms, our master technicians interlace warp and weft threads into custom jacquards and technical knits.',
    image: '/images/fabric-step3.jpg'
  },
  {
    step: '04',
    title: 'Finishing & Quality Assurance',
    description: 'Every batch undergoes rigorous tensile, colorfastness, and eco-finishing tests to meet the strict production demands of global leaders like Technosport and Hyundai.',
    image: '/images/fabric-step4.jpg'
  }
]

export default function Home() {
  const theme = useTheme()
  const activeComponent = 'ParticleThreads' 
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % SHOWCASE_IMAGES.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <main className="relative min-h-full flex flex-col justify-between px-4 sm:px-8 lg:px-20 py-6 sm:py-12 overflow-hidden">
      
      {/* Background Animation Layer */}
      <div className="absolute inset-0 w-full h-full z-0 transition-colors duration-700 pointer-events-none">
        {activeComponent === 'FabricCanvas' && <FabricCanvas theme={theme} />}
        {activeComponent === 'ParticleThreads' && <ParticleThreads theme={theme} />}
      </div>

      {/* TOP SECTION: Hero Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center py-4 sm:py-10">
        
        {/* LEFT COLUMN: Editorial Typography & Call To Action */}
        <motion.div 
          className="lg:col-span-7 text-center lg:text-left pointer-events-none"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            style={{ color: theme.text }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-[1] tracking-tight mb-4 sm:mb-6 transition-colors duration-700"
          >
            Honest materials.<br />
            <span style={{ opacity: 0.8 }} className="italic">Impeccable weaves.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            style={{ color: theme.text }}
            className="text-sm sm:text-lg md:text-xl opacity-75 font-light mb-6 sm:mb-8 leading-relaxed mx-auto lg:mx-0 max-w-[300px] sm:max-w-md md:max-w-xl transition-colors duration-700"
          >
            We source raw, ethically harvested fibers globally for master tailors and architectural designers.
          </motion.p>
          
          <motion.div variants={itemVariants} className="pointer-events-auto">
            <Link 
              to="/products" 
              style={{ 
                backgroundColor: theme.id === 'midnight' ? '#1A2B4C' : theme.id === 'terracotta' ? '#9C5237' : '#111111',
                color: '#FFFFFF' 
              }}
              className="inline-block px-8 py-3.5 sm:px-10 sm:py-5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-all shadow-lg hover:opacity-90"
            >
              Explore The Catalog
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Fabric Image Carousel Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="lg:col-span-5 relative w-full aspect-[4/5] max-w-[280px] sm:max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-stone-200 mt-4 lg:mt-0"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={SHOWCASE_IMAGES[currentImageIndex].url}
              alt={SHOWCASE_IMAGES[currentImageIndex].title}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col gap-2 sm:gap-3 text-white z-20">
            <AnimatePresence mode="wait">
              <motion.p 
                key={currentImageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-[10px] sm:text-xs font-serif tracking-widest uppercase opacity-90"
              >
                {SHOWCASE_IMAGES[currentImageIndex].title}
              </motion.p>
            </AnimatePresence>

            <div className="flex gap-2">
              {SHOWCASE_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    idx === currentImageIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* MIDDLE SECTION: Leading Clients Showcase */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-7xl mx-auto mt-16 sm:mt-24 pt-10 sm:pt-16 border-t"
        style={{ borderColor: theme.border }}
      >
        <div className="text-center mb-8 sm:mb-12 px-2">
          <p 
            style={{ color: theme.text }}
            className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase opacity-60 mb-2"
          >
            Trusted Manufacturing Partners
          </p>
          <h2 
            style={{ color: theme.text }}
            className="text-2xl sm:text-4xl font-serif tracking-tight leading-snug"
          >
            Powering Global Industry Leaders & Specialized Enterprises
          </h2>
        </div>

        {/* Tier 1: Top 3 Major Enterprise Cards (Mobile Swipe Carousel, Desktop Grid) */}
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 sm:gap-8 mb-8 pb-4 md:pb-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {MAJOR_CLIENTS.map((client, index) => (
            <div 
              key={index}
              className="relative group w-[85vw] md:w-auto flex-shrink-0 snap-center h-[340px] sm:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-xl border border-white/10 flex flex-col justify-end p-6 sm:p-8 transition-transform duration-500 hover:-translate-y-2"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${client.bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

              <div className="relative z-10 text-white">
                <span className="text-[10px] sm:text-[11px] tracking-widest uppercase opacity-75 font-semibold block mb-2">
                  {client.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif tracking-wide mb-2 sm:mb-3 font-bold">
                  {client.name}
                </h3>
                <p className="text-xs sm:text-sm font-light leading-relaxed opacity-85">
                  {client.description}
                </p>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/20 flex items-center justify-between text-[10px] sm:text-[11px] font-bold tracking-widest uppercase opacity-80">
                  <span>Verified Supply Partner</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tier 2: Remaining 4 Specialized Partners (2x2 Grid on Mobile, 4-in-a-row on Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {SPECIALIZED_PARTNERS.map((partner, index) => (
            <div 
              key={index}
              className="relative group h-[220px] sm:h-[300px] rounded-2xl overflow-hidden shadow-xl border border-white/10 flex flex-col justify-end p-4 sm:p-6 transition-transform duration-500 hover:-translate-y-2"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${partner.bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

              <div className="relative z-10 text-white flex flex-col h-full justify-end">
                <span className="text-[8px] sm:text-[9px] tracking-widest uppercase opacity-75 font-semibold block mb-1 truncate">
                  {partner.category}
                </span>
                <h3 className="text-sm sm:text-lg font-serif tracking-wide mb-1 sm:mb-2 font-bold leading-tight">
                  {partner.name}
                </h3>
                <p className="text-[10px] sm:text-xs font-light leading-snug opacity-85 line-clamp-3 sm:line-clamp-none">
                  {partner.description}
                </p>

                <div className="mt-auto pt-2 sm:pt-3 border-t border-white/20 flex items-center justify-between text-[8px] sm:text-[10px] font-bold tracking-widest uppercase opacity-80">
                  <span>Verified</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* BOTTOM SECTION: Manufacturing Process */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-7xl mx-auto mt-16 sm:mt-32 pt-10 sm:pt-16 border-t"
        style={{ borderColor: theme.border }}
      >
        <div className="text-center mb-12 sm:mb-24">
          <p 
            style={{ color: theme.text }}
            className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase opacity-60 mb-2"
          >
            Precision Engineering
          </p>
          <h2 
            style={{ color: theme.text }}
            className="text-3xl sm:text-5xl font-serif tracking-tight"
          >
            The Manufacturing Process
          </h2>
        </div>

        {/* Central Vertical Dotted Line for Desktop Timeline */}
        <div 
          className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-48 bottom-12 border-l-2 border-dashed pointer-events-none"
          style={{ borderColor: theme.border, opacity: 0.5 }}
        />

        {/* Alternating Steps */}
        <div className="flex flex-col gap-12 sm:gap-24 relative px-2 sm:px-0">
          {MANUFACTURING_STEPS.map((item, index) => {
            const isEven = index % 2 === 1; // Alternating layout check
            return (
              <div 
                key={index}
                className={`relative flex flex-col lg:flex-row items-center gap-6 lg:gap-16 ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Step Image */}
                <div className="w-full lg:w-1/2 relative aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Horizontal Dotted Connector Line leading to center (Desktop only) */}
                <div 
                  className={`hidden lg:block absolute top-1/2 w-12 border-t-2 border-dashed pointer-events-none z-10 ${
                    isEven ? 'right-1/2 mr-[-24px]' : 'left-1/2 ml-[-24px]'
                  }`}
                  style={{ borderColor: theme.border, opacity: 0.6 }}
                />

                {/* Step Text Information */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left px-2 sm:px-4 relative">
                  <span 
                    style={{ color: theme.text }}
                    className="text-3xl sm:text-6xl font-serif font-light opacity-30 mb-1 sm:mb-2 block"
                  >
                    {item.step}
                  </span>
                  <h3 
                    style={{ color: theme.text }}
                    className="text-xl sm:text-3xl md:text-4xl font-serif tracking-tight mb-2 sm:mb-4 font-bold"
                  >
                    {item.title}
                  </h3>
                  <p 
                    style={{ color: theme.text }}
                    className="text-xs sm:text-base md:text-lg font-light leading-relaxed opacity-75 max-w-lg mx-auto lg:mx-0"
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

    </main>
  )
}