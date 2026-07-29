import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, THEMES } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

export default function App() {
  
  // 🎨 CHANGE YOUR GLOBAL THEME HERE: 'onyx', 'terracotta', or 'midnight'
  const activeTheme = THEMES['terracotta']

  return (
    <ThemeProvider theme={activeTheme}>
      <Router>
        <div 
          style={{ backgroundColor: activeTheme.bg }}
          className="min-h-screen flex flex-col font-sans antialiased selection:bg-stone-900 selection:text-white transition-colors duration-700 overflow-x-hidden"
        >
          
          <Navbar />
          
          <div className="flex-grow flex flex-col relative">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>

          <Footer />

        </div>
      </Router>
    </ThemeProvider>
  )
}