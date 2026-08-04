import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

// Animated Intertwining Threads Divider Component (No Needles)
function KnittingThreadsDivider() {
  const theme = useTheme()

  return (
    <div className="w-full max-w-sm mx-auto my-6 flex items-center justify-center overflow-hidden">
      <svg width="280" height="36" viewBox="0 0 280 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible opacity-85">
        {/* Thread Strand 1 */}
        <motion.path
          d="M 10 18 C 50 2, 90 34, 140 18 C 190 2, 230 34, 270 18"
          stroke={theme.text}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        {/* Thread Strand 2 (Intertwining) */}
        <motion.path
          d="M 10 18 C 50 34, 90 2, 140 18 C 190 34, 230 2, 270 18"
          stroke={theme.text}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2.5, delay: 0.3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>
    </div>
  )
}

export default function Catalog() {
  const theme = useTheme()
  const [activeCategory, setActiveCategory] = useState('All')

  // Sample data structured around Cotton, Polyester, Woolen, and Silk with B2B technical specs
  const fabrics = [
    {
      id: 1,
      name: 'Combed Ring-Spun Cotton Jersey',
      category: 'Cotton',
      code: 'AK-COT-180',
      gsm: '180 GSM',
      composition: '100% Combed Cotton',
      use: 'Intimate Apparel & Premium T-Shirts',
      features: ['Ultra-Soft Handfeel', 'High Breathability', 'Pre-Shrunk']
    },
    {
      id: 2,
      name: 'Organic Interlock Cotton',
      category: 'Cotton',
      code: 'AK-COT-220',
      gsm: '220 GSM',
      composition: '100% Organic Cotton',
      use: 'Baby Wear & Luxury Basics',
      features: ['Double-Sided Uniformity', 'Hypoallergenic', 'Durable Weave']
    },
    {
      id: 3,
      name: 'Aero-Wick Performance Polyester',
      category: 'Polyester',
      code: 'AK-POL-140',
      gsm: '140 GSM',
      composition: '100% Microfiber Polyester',
      use: 'Activewear & Athletic Jerseys',
      features: ['Moisture Management', 'Rapid Dry', 'UV Protection Standard']
    },
    {
      id: 4,
      name: 'Industrial High-Tenacity Poly',
      category: 'Polyester',
      code: 'AK-POL-300',
      gsm: '300 GSM',
      composition: 'High-Density Polyester Weave',
      use: 'Automotive & Technical Standards',
      features: ['High Tensile Strength', 'Abrasion Resistant', 'Tear Proof']
    },
    {
      id: 5,
      name: 'Merino Blend Winter Knit',
      category: 'Woolen',
      code: 'AK-WOL-280',
      gsm: '280 GSM',
      composition: '60% Merino Wool, 40% Cotton',
      use: 'Thermal Wear & Premium Sweaters',
      features: ['Thermal Insulation', 'Natural Elasticity', 'Odour Resistant']
    },
    {
      id: 6,
      name: 'Pure Mulberry Silk Knit',
      category: 'Silk',
      code: 'AK-SLK-110',
      gsm: '110 GSM',
      composition: '100% Mulberry Silk',
      use: 'Luxury Intimate Apparel & High Fashion',
      features: ['Natural Luster', 'Exquisite Drape', 'Temperature Regulating']
    }
  ]

  const filteredFabrics = activeCategory === 'All' 
    ? fabrics 
    : fabrics.filter(f => f.category === activeCategory)

  return (
    <main className="relative min-h-screen flex flex-col px-6 sm:px-12 lg:px-24 py-12">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto w-full mb-8 text-center">
        <span 
          style={{ color: theme.text }}
          className="text-xs font-bold tracking-[0.25em] uppercase opacity-60 block mb-3"
        >
          Industrial & Commercial Specifications
        </span>
        <h1 
          style={{ color: theme.text }}
          className="text-4xl sm:text-6xl font-serif tracking-tight mb-3"
        >
          Fabric Catalog
        </h1>

        {/* Animated Intertwining Threads Divider */}
        <KnittingThreadsDivider />

        {/* <p 
          style={{ color: theme.text }}
          className="text-base sm:text-lg font-light opacity-75 max-w-2xl mx-auto leading-relaxed"
        >
          Explore our precision-engineered knits and raw material standards, optimized for global fashion houses, activewear brands, and technical industries.
        </p> */}
      </div>

      {/* Category Filter Pills with Hover Popup Animation */}
      <div className="max-w-7xl mx-auto w-full flex flex-wrap justify-center gap-3 mb-16">
        {['All', 'Cotton', 'Polyester', 'Woolen', 'Silk'].map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            style={{
              borderColor: theme.border,
              backgroundColor: activeCategory === cat 
                ? (theme.id === 'midnight' ? '#1A2B4C' : theme.id === 'terracotta' ? '#9C5237' : '#111111') 
                : 'transparent',
              color: activeCategory === cat ? '#FFFFFF' : theme.text
            }}
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors shadow-sm cursor-pointer"
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Fabric Grid with Hover Popup Effect */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <AnimatePresence>
          {filteredFabrics.map((fabric) => (
            <motion.div
              key={fabric.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{ 
                borderColor: theme.border,
                backgroundColor: theme.id === 'midnight' ? 'rgba(26, 43, 76, 0.4)' : theme.id === 'terracotta' ? 'rgba(156, 82, 55, 0.05)' : 'rgba(255, 255, 255, 0.6)'
              }}
              className="p-8 rounded-2xl border backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span 
                    style={{ color: theme.text }}
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-current opacity-60"
                  >
                    {fabric.code}
                  </span>
                  <span 
                    style={{ color: theme.text }}
                    className="text-xs font-bold tracking-wider opacity-80"
                  >
                    {fabric.gsm}
                  </span>
                </div>

                <h3 
                  style={{ color: theme.text }}
                  className="text-xl font-serif font-bold mb-2 tracking-wide"
                >
                  {fabric.name}
                </h3>

                <p style={{ color: theme.text }} className="text-sm font-light opacity-80 mb-6">
                  {fabric.use}
                </p>

                <div className="space-y-2 mb-8 text-xs font-light opacity-85" style={{ color: theme.text }}>
                  <div className="flex justify-between border-b pb-2" style={{ borderColor: theme.border }}>
                    <span className="opacity-60 uppercase font-bold tracking-wider">Composition</span>
                    <span className="font-medium">{fabric.composition}</span>
                  </div>
                  <div className="pt-1">
                    <span className="opacity-60 block uppercase font-bold tracking-wider mb-2">Key Properties</span>
                    <div className="flex flex-wrap gap-1.5">
                      {fabric.features.map((feat, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 rounded-md text-[10px] font-semibold border opacity-80"
                          style={{ borderColor: theme.border }}
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/concierge"
                state={{ focusName: true }}
                style={{ 
                  backgroundColor: theme.id === 'midnight' ? '#1A2B4C' : theme.id === 'terracotta' ? '#9C5237' : '#111111',
                  color: '#FFFFFF' 
                }}
                className="w-full py-3.5 rounded-xl text-center text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:opacity-90 block"
              >
                Request Sample & Quote
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </main>
  )
}