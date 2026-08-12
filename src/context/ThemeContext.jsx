import { createContext, useContext } from 'react'

export const THEMES = {
  onyx: {
    id: 'onyx',
    bg: '#FAFAFA',
    text: '#111111',
    accent: '#6B7280',
    border: '#E5E7EB',
    button: '#111111',
    meshColor: '#111111'
  },
  terracotta: {
    id: 'terracotta',
    bg: '#F5EFE6',
    text: '#3E2723',
    accent: '#9C5237',
    border: '#E8DFD3',
    button: '#9C5237',
    meshColor: '#9C5237'
  },
  midnight: {
    id: 'midnight',
    bg: '#F3F2EE',
    text: '#1A2B4C',
    accent: '#B8860B',
    border: '#E2DFD5',
    button: '#1A2B4C',
    meshColor: '#809fdd'
  },
  olive: {
    id: 'olive',
    bg: '#F4F5F0',
    text: '#2B331F',
    accent: '#5E7144',
    border: '#E1E4D7',
    button: '#2B331F',
    meshColor: '#2B331F'
  },
  // NEW: Bold, energetic, and highly vibrant red/pink
  ruby: {
    id: 'ruby',
    bg: '#FFF5F7',
    text: '#4C0519',
    accent: '#E11D48',
    border: '#FFE4E6',
    button: '#E11D48',
    meshColor: '#E11D48'
  },
  // NEW: Electric, modern, tech-forward blue
  azure: {
    id: 'azure',
    bg: '#F0F5FF',
    text: '#082F49',
    accent: '#0284C7',
    border: '#E0F2FE',
    button: '#0284C7',
    meshColor: '#0284C7'
  }
}

const ThemeContext = createContext()

export const ThemeProvider = ({ children, theme }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)