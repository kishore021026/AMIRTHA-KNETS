import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function ExitPopup() {
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Check if the user has already seen or submitted the popup
    const hasSeen = localStorage.getItem('hasSeenExitPopup')
    if (hasSeen) return

    const handleMouseLeave = (e) => {
      // Trigger when the user moves their mouse toward the top of the browser window to exit
      if (e.clientY <= 10) {
        setIsOpen(true)
        localStorage.setItem('hasSeenExitPopup', 'true')
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const WEB3FORMS_ACCESS_KEY = "1b1583ff-7fbe-4e22-83b9-821f00b3a8c0"

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Exit Intent Lead: ${formData.name}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'Not provided (Optional)'
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
        setTimeout(() => {
          setIsOpen(false)
        }, 2500)
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Exit popup submission error:", error)
      alert("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{ 
              borderColor: theme.border,
              backgroundColor: theme.id === 'midnight' ? '#0F1A2E' : theme.id === 'terracotta' ? '#2A1810' : '#1A1A1A',
              color: '#FFFFFF'
            }}
            className="w-full max-w-lg p-8 rounded-2xl border shadow-2xl relative overflow-hidden"
          >
            {submitted ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl">✓</div>
                <h3 className="text-2xl font-serif font-bold mb-2">Thank You!</h3>
                <p className="text-sm opacity-80">We have received your details and our mill team will get in touch shortly.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase opacity-60 block mb-1">Before You Go</span>
                  <h3 className="text-2xl font-serif font-bold tracking-tight">Stay Connected With Our Mills</h3>
                  <p className="text-xs font-light opacity-75 mt-1">Leave your details for quick textile catalogs and priority B2B callbacks.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2.5 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all text-white"
                      style={{ borderColor: theme.border }}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-2.5 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all text-white"
                      style={{ borderColor: theme.border }}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Email Address (Optional)</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all text-white"
                      style={{ borderColor: theme.border }}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={handleClose}
                      style={{ borderColor: theme.border }}
                      className="flex-1 py-3 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all hover:bg-white/10 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      style={{ 
                        backgroundColor: theme.id === 'midnight' ? '#1A2B4C' : theme.id === 'terracotta' ? '#9C5237' : '#FFFFFF',
                        color: theme.id === 'terracotta' || theme.id === 'midnight' ? '#FFFFFF' : '#000000'
                      }}
                      className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:opacity-90 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? 'Submitting...' : 'OK'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}