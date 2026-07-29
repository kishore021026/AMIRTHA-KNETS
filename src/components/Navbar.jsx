import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const theme = useTheme()

  return (
    <nav 
      style={{ 
        backgroundColor: theme.id === 'midnight' ? '#1A2B4C' : theme.id === 'terracotta' ? '#9C5237' : '#111111',
        color: '#FFFFFF',
        borderColor: theme.border 
      }}
      className="flex justify-between items-center py-8 px-6 md:px-24 border-b relative z-50 transition-colors duration-700"
    >
      {/* Brand Logo */}
      <Link 
        to="/" 
        style={{ color: '#FFFFFF' }}
        className="text-xl md:text-2xl font-serif tracking-tight"
      >
        AMIRTHA KNETS 
        {/* [ACTIVE THEME: {theme.id?.toUpperCase()}] */}
      </Link>
      
      {/* Navigation Links */}
      <div className="flex gap-6 md:gap-10 text-[11px] md:text-xs font-bold tracking-widest uppercase">
        <Link to="/" style={{ color: '#FFFFFF' }} className="hover:underline">Home</Link>
        <Link to="/products" style={{ color: '#FFFFFF' }} className="hover:underline">Catalog</Link>
        <Link to="/concierge" style={{ color: '#FFFFFF' }} className="hover:underline">Contact-Us</Link>
      </div>
    </nav>
  )
}