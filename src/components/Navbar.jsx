import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const theme = useTheme()
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Catalog' },
    { path: '/concierge', label: 'Contact-Us' }
  ]

  return (
    <nav 
      style={{ 
        backgroundColor: theme.id === 'midnight' ? '#1A2B4C' : theme.id === 'terracotta' ? '#9C5237' : '#111111',
        color: '#FFFFFF',
        borderColor: theme.border 
      }}
      // Switched to flex-col on mobile (with a gap) and flex-row on desktop
      className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 py-4 md:py-6 px-4 md:px-24 border-b relative z-50 transition-colors duration-700"
    >
      {/* Brand Logo */}
      <NavLink 
        to="/" 
        style={{ color: '#FFFFFF' }}
        className="text-lg sm:text-xl md:text-2xl font-serif tracking-tight text-center"
      >
        AMIRTHA KNETS 
      </NavLink>
      
      {/* Pill / Capsule Navigation Container */}
      <div className="flex items-center justify-center gap-0.5 sm:gap-1 bg-black/20 p-1 sm:p-1.5 rounded-full border border-white/10 backdrop-blur-md w-full sm:w-auto">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path
          return (
            <NavLink
              key={link.path}
              to={link.path}
              // Shrunk text and padding for mobile to fit perfectly side-by-side
              className="relative flex-1 sm:flex-none text-center px-2 sm:px-5 py-2 text-[9px] sm:text-[11px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-300 z-10"
              style={{ color: '#FFFFFF' }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/20 rounded-full shadow-inner border border-white/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 transition-opacity whitespace-nowrap ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                {link.label}
              </span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}