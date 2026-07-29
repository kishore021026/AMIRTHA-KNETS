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
    meshColor: '#1A2B4C'
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