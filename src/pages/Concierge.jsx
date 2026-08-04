import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function Concierge() {
  const theme = useTheme()

  // Ref to target the B2B form's Name input for auto-focusing
  const nameInputRef = useRef(null)

  // Automatically focus the B2B Name input when landing on the page
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [])

  // B2B Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiryType: 'Wholesale Supply',
    requestSampleKit: false,
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Career Form State (Using LinkedIn URL instead of file upload)
  const [careerData, setCareerData] = useState({
    fullName: '',
    email: '',
    phone: '',
    positionType: 'Full-Time',
    department: 'Textile Engineering',
    linkedin: '',
    coverLetter: ''
  })
  const [careerSubmitted, setCareerSubmitted] = useState(false)
  const [careerLoading, setCareerLoading] = useState(false)

  // ==========================================
  // B2B FORM SUBMISSION (WEB3FORMS)
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const WEB3FORMS_ACCESS_KEY = "1b1583ff-7fbe-4e22-83b9-821f00b3a8c0"

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      inquiry_type: formData.inquiryType,
      request_sample_kit: formData.requestSampleKit ? "Yes - Send Sample Kit" : "No",
      message: formData.message,
      subject: `New B2B Inquiry from ${formData.company} (${formData.name})`
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
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  // ==========================================
  // CAREER FORM SUBMISSION (WEB3FORMS)
  // ==========================================
  const handleCareerSubmit = async (e) => {
    e.preventDefault()
    setCareerLoading(true)

    const WEB3FORMS_ACCESS_KEY = "59c4e113-d6db-4fb1-a99e-8882ff0ddad1"

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Career Application: ${careerData.positionType} - ${careerData.fullName}`,
      name: careerData.fullName,
      email: careerData.email,
      phone: careerData.phone,
      position_type: careerData.positionType,
      department: careerData.department,
      linkedin_profile: careerData.linkedin,
      message: careerData.coverLetter
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
        setCareerSubmitted(true)
      } else {
        alert("Something went wrong with your application. Please try again.")
      }
    } catch (error) {
      console.error("Career submission error:", error)
      alert("Network error. Please check your connection.")
    } finally {
      setCareerLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col px-6 sm:px-12 lg:px-24 py-12">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto w-full mb-16 text-center">
        <span 
          style={{ color: theme.text }}
          className="text-xs font-bold tracking-[0.25em] uppercase opacity-60 block mb-3"
        >
          B2B Concierge & Support
        </span>
        <h1 
          style={{ color: theme.text }}
          className="text-4xl sm:text-6xl font-serif tracking-tight mb-4"
        >
          Connect With Our Mills
        </h1>
        <p 
          style={{ color: theme.text }}
          className="text-base sm:text-lg font-light opacity-75 max-w-2xl mx-auto leading-relaxed"
        >
          Request custom fabric sample kits, bulk B2B quotations, or schedule an executive consultation with our Coimbatore headquarters.
        </p>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        
        {/* LEFT COLUMN: Contact Info, Storefronts & Hours */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Office & Contact Box */}
          <div 
            style={{ 
              borderColor: theme.border,
              backgroundColor: theme.id === 'midnight' ? 'rgba(26, 43, 76, 0.4)' : theme.id === 'terracotta' ? 'rgba(156, 82, 55, 0.05)' : 'rgba(255, 255, 255, 0.6)'
            }}
            className="p-8 rounded-2xl border backdrop-blur-sm shadow-xl"
          >
            <h3 
              style={{ color: theme.text }}
              className="text-xl font-serif font-bold mb-6 tracking-wide"
            >
              Headquarters & Operations
            </h3>
            
            <div className="space-y-4 text-sm font-light opacity-85" style={{ color: theme.text }}>
              <div>
                <span className="font-semibold block uppercase text-xs tracking-wider opacity-60 mb-1">Address</span>
                <p>Amirtha Knets Textile Mills, SIDCO Industrial Estate, Coimbatore, Tamil Nadu 641021, India</p>
              </div>

              <div>
                <span className="font-semibold block uppercase text-xs tracking-wider opacity-60 mb-1">Direct Contact</span>
                <p>Phone: +91 422 298XXXX / +91 98422 XXXXX</p>
                <p>Email: support@amirthaknets.com</p>
              </div>

              <div>
                <span className="font-semibold block uppercase text-xs tracking-wider opacity-60 mb-1">Working Hours</span>
                <p>Monday – Saturday: 9:00 AM – 7:00 PM IST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Retail Storefronts Box */}
          <div 
            style={{ 
              borderColor: theme.border,
              backgroundColor: theme.id === 'midnight' ? 'rgba(26, 43, 76, 0.4)' : theme.id === 'terracotta' ? 'rgba(156, 82, 55, 0.05)' : 'rgba(255, 255, 255, 0.6)'
            }}
            className="p-8 rounded-2xl border backdrop-blur-sm shadow-xl"
          >
            <h3 
              style={{ color: theme.text }}
              className="text-xl font-serif font-bold mb-4 tracking-wide"
            >
              Official Brand Storefronts
            </h3>
            <p style={{ color: theme.text }} className="text-sm font-light opacity-80 mb-6">
              Shop our consumer-ready collections directly on leading online marketplaces.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://amazon.in" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  backgroundColor: theme.id === 'midnight' ? '#1A2B4C' : theme.id === 'terracotta' ? '#9C5237' : '#111111',
                  color: '#FFFFFF' 
                }}
                className="flex-1 py-3 px-4 rounded-xl text-center text-xs font-bold uppercase tracking-widest transition-all hover:opacity-90 shadow-md"
              >
                Amazon Store
              </a>
              <a 
                href="https://flipkart.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  borderColor: theme.border,
                  color: theme.text 
                }}
                className="flex-1 py-3 px-4 rounded-xl border text-center text-xs font-bold uppercase tracking-widest transition-all hover:bg-stone-500/10 shadow-sm"
              >
                Flipkart Store
              </a>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: B2B Wholesale & Sample Kit Inquiry Form */}
        <div 
          style={{ 
            borderColor: theme.border,
            backgroundColor: theme.id === 'midnight' ? 'rgba(26, 43, 76, 0.4)' : theme.id === 'terracotta' ? 'rgba(156, 82, 55, 0.05)' : 'rgba(255, 255, 255, 0.6)'
          }}
          className="lg:col-span-7 p-8 sm:p-12 rounded-2xl border backdrop-blur-sm shadow-2xl relative"
        >
          <h3 
            style={{ color: theme.text }}
            className="text-2xl font-serif font-bold mb-2 tracking-wide"
          >
            B2B Quote & Sample Request
          </h3>
          <p style={{ color: theme.text }} className="text-sm font-light opacity-75 mb-8">
            Fill out the details below and our technical sales team will respond within 24 business hours.
          </p>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center"
            >
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
              <h4 style={{ color: theme.text }} className="text-2xl font-serif font-bold mb-2">Inquiry Received</h4>
              <p style={{ color: theme.text }} className="text-sm opacity-80">Thank you, {formData.name}. Our concierge team has dispatched your request details to our Coimbatore mill supervisors.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label style={{ color: theme.text }} className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Full Name *</label>
                  <input 
                    ref={nameInputRef}
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
                    style={{ borderColor: theme.border, color: theme.text }}
                  />
                </div>
                <div>
                  <label style={{ color: theme.text }} className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Company / Brand *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="e.g. Jockey / Honda Vendor"
                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
                    style={{ borderColor: theme.border, color: theme.text }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label style={{ color: theme.text }} className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Corporate Email *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
                    style={{ borderColor: theme.border, color: theme.text }}
                  />
                </div>
                <div>
                  <label style={{ color: theme.text }} className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
                    style={{ borderColor: theme.border, color: theme.text }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label style={{ color: theme.text }} className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Inquiry Type</label>
                  <select 
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
                    style={{ borderColor: theme.border, color: theme.text }}
                  >
                    <option value="Wholesale Supply" className="bg-stone-900 text-white">Wholesale Supply</option>
                    <option value="Custom Technical Weave" className="bg-stone-900 text-white">Custom Technical Weave</option>
                    <option value="Automotive Textile Standard" className="bg-stone-900 text-white">Automotive Textile Standard</option>
                    <option value="General Query" className="bg-stone-900 text-white">General Query</option>
                  </select>
                </div>
                
                <div className="flex items-center pt-6">
                  <label className="flex items-center cursor-pointer gap-3">
                    <input 
                      type="checkbox" 
                      checked={formData.requestSampleKit}
                      onChange={(e) => setFormData({...formData, requestSampleKit: e.target.checked})}
                      className="w-5 h-5 rounded border accent-stone-800"
                    />
                    <span style={{ color: theme.text }} className="text-xs font-bold uppercase tracking-wider">Request Physical Fabric Sample Kit</span>
                  </label>
                </div>
              </div>

              <div>
                <label style={{ color: theme.text }} className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Project Specifications & Notes</label>
                <textarea 
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Describe your fabric GSM, fiber type, volume estimates, or technical testing standards required..."
                  className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all resize-none"
                  style={{ borderColor: theme.border, color: theme.text }}
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={loading}
                style={{ 
                  backgroundColor: theme.id === 'midnight' ? '#1A2B4C' : theme.id === 'terracotta' ? '#9C5237' : '#111111',
                  color: '#FFFFFF' 
                }}
                className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Submitting Inquiry...' : 'Submit Wholesale Inquiry'}
              </button>
            </form>
          )}
        </div>

      </div>

      {/* ========================================== */}
      {/* SECTION 1.5: INTERACTIVE GOOGLE MAP */}
      {/* ========================================== */}
      <div 
        style={{ borderColor: theme.border }}
        className="max-w-7xl mx-auto w-full rounded-2xl overflow-hidden border shadow-xl mb-20"
      >
        <div className="p-6 bg-stone-900 text-white flex justify-between items-center">
          <h3 className="text-sm font-bold tracking-widest uppercase">Global Mill Location • Coimbatore, Tamil Nadu</h3>
          <span className="text-xs opacity-70">SIDCO Industrial Estate</span>
        </div>
        <div className="w-full h-[400px] relative">
          <iframe 
            title="Amirtha Knets Factory Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125406.49506634796!2d76.90673551643066!3d11.013957800000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x216130401b60d70f!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* ========================================== */}
      {/* SECTION 2: CAREER & INTERNSHIP OPPORTUNITIES */}
      {/* ========================================== */}
      <div className="max-w-7xl mx-auto w-full mb-12">
        
        {/* Visual Section Divider & Badge */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] flex-grow opacity-20" style={{ backgroundColor: theme.text }}></div>
          <span 
            style={{ color: theme.text }}
            className="text-xs font-bold tracking-[0.3em] uppercase opacity-70 px-4 py-1.5 rounded-full border border-current"
          >
            HIRING • Human Resources & Talent
          </span>
          <div className="h-[1px] flex-grow opacity-20" style={{ backgroundColor: theme.text }}></div>
        </div>

        <div 
          style={{ 
            borderColor: theme.border,
            backgroundColor: theme.id === 'midnight' ? 'rgba(26, 43, 76, 0.4)' : theme.id === 'terracotta' ? 'rgba(156, 82, 55, 0.05)' : 'rgba(255, 255, 255, 0.6)'
          }}
          className="p-8 sm:p-12 rounded-2xl border backdrop-blur-sm shadow-2xl relative"
        >
          <div className="max-w-3xl mb-10">
            <span style={{ color: theme.text }} className="text-xs font-bold tracking-[0.25em] uppercase opacity-60 block mb-2">
              Join Our Workforce
            </span>
            <h2 style={{ color: theme.text }} className="text-3xl sm:text-4xl font-serif font-bold mb-3">
              Career & Internship Opportunities
            </h2>
            <p style={{ color: theme.text }} className="text-sm sm:text-base font-light opacity-80 leading-relaxed">
              Are you a college student looking for hands-on industrial training or a graduate ready to build world-class technical textiles? Submit your details below.
            </p>
          </div>

          {careerSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center"
            >
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
              <h4 style={{ color: theme.text }} className="text-2xl font-serif font-bold mb-2">Application Submitted Successfully</h4>
              <p style={{ color: theme.text }} className="text-sm opacity-80">Thank you, {careerData.fullName}. Our HR and plant operations team in Coimbatore will review your profile and get in touch.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleCareerSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label style={{ color: theme.text }} className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={careerData.fullName}
                    onChange={(e) => setCareerData({...careerData, fullName: e.target.value})}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
                    style={{ borderColor: theme.border, color: theme.text }}
                  />
                </div>

                <div>
                  <label style={{ color: theme.text }} className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={careerData.email}
                    onChange={(e) => setCareerData({...careerData, email: e.target.value})}
                    placeholder="name@email.com"
                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
                    style={{ borderColor: theme.border, color: theme.text }}
                  />
                </div>

                <div>
                  <label style={{ color: theme.text }} className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={careerData.phone}
                    onChange={(e) => setCareerData({...careerData, phone: e.target.value})}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
                    style={{ borderColor: theme.border, color: theme.text }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label style={{ color: theme.text }} className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Position Type</label>
                  <select 
                    value={careerData.positionType}
                    onChange={(e) => setCareerData({...careerData, positionType: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
                    style={{ borderColor: theme.border, color: theme.text }}
                  >
                    <option value="Full-Time" className="bg-stone-900 text-white">Full-Time Employment</option>
                    <option value="Internship" className="bg-stone-900 text-white">Student Internship</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: theme.text }} className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Department / Field</label>
                  <select 
                    value={careerData.department}
                    onChange={(e) => setCareerData({...careerData, department: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
                    style={{ borderColor: theme.border, color: theme.text }}
                  >
                    <option value="Textile Engineering" className="bg-stone-900 text-white">Textile Engineering & Weaving</option>
                    <option value="Plant Operations" className="bg-stone-900 text-white">Plant Operations & Quality Control</option>
                    <option value="Business Development" className="bg-stone-900 text-white">B2B Sales & Business Development</option>
                    <option value="Supply Chain & Logistics" className="bg-stone-900 text-white">Supply Chain & Logistics</option>
                    <option value="IT & Web Operations" className="bg-stone-900 text-white">IT & Digital Operations</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: theme.text }} className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">LinkedIn Profile URL </label>
                  <input 
                    type="url" 
                    value={careerData.linkedin}
                    onChange={(e) => setCareerData({...careerData, linkedin: e.target.value})}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
                    style={{ borderColor: theme.border, color: theme.text }}
                  />
                </div>
              </div>

              <div>
                <label style={{ color: theme.text }} className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Cover Note / Introduction</label>
                <textarea 
                  rows="3"
                  value={careerData.coverLetter}
                  onChange={(e) => setCareerData({...careerData, coverLetter: e.target.value})}
                  placeholder="Tell us about your educational background, graduation year, technical skills, or why you want to intern/work at Amirtha Knets..."
                  className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all resize-none"
                  style={{ borderColor: theme.border, color: theme.text }}
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={careerLoading}
                style={{ 
                  backgroundColor: theme.id === 'midnight' ? '#1A2B4C' : theme.id === 'terracotta' ? '#9C5237' : '#111111',
                  color: '#FFFFFF' 
                }}
                className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:opacity-90 disabled:opacity-50"
              >
                {careerLoading ? 'Submitting Application...' : 'Submit Career Application'}
              </button>
            </form>
          )}
        </div>
      </div>

    </main>
  )
}