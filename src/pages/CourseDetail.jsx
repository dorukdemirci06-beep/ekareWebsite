import React, { useState, useRef, useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { courses } from '../data/courses'
import CustomDatePicker from '../components/CustomDatePicker'

function CourseDetail() {
  const { slug } = useParams()
  const course = courses.find(c => c.slug === slug)

  if (!course) {
    return <Navigate to="/" />
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // Form State
  const [formData, setFormData] = useState({
    studentName: '', studentSurname: '', birthDate: '', parentName: '', parentSurname: '', branch: course.title, kvkk: false, whatsapp: false
  })
  const [status, setStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let message = ''
    const { studentName, studentSurname, parentName, parentSurname, branch, birthDate } = formData
    let formattedDate = birthDate
    if (birthDate) {
      const parts = birthDate.split('-')
      if (parts.length === 3) formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`
    }
    if (parentName || parentSurname) {
      message = `Merhabalar, ben ${parentName || ''} ${parentSurname || ''}, çocuğum ${studentName} ${studentSurname} (Doğum Tarihi: ${formattedDate}) için ${branch} dersleri hakkında bilgi almak istiyorum.`
    } else {
      message = `Merhabalar, ben ${studentName} ${studentSurname} (Doğum Tarihi: ${formattedDate}), ${branch} dersiniz hakkında bilgi alabilir miyim?`
    }
    const academyPhone = '905447111405'
    const whatsappUrl = `https://wa.me/${academyPhone}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    setStatus('success')
    setFormData({ studentName: '', studentSurname: '', birthDate: '', parentName: '', parentSurname: '', branch: course.title, kvkk: false, whatsapp: false })
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      {/* Header */}
      <header className="relative border-b border-stone-200 sticky top-0 z-50 shadow-sm shadow-amber-900/5 bg-white">
        <div className="relative z-10 w-full px-4 md:px-12 py-3 md:py-5 flex items-center justify-between min-h-[60px] md:min-h-[80px]">
          <div ref={menuRef} className="z-30 flex-1 flex justify-start relative">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-xl bg-stone-100 border border-stone-200 text-amber-950 hover:bg-stone-200 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                {isMenuOpen ? (
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                ) : (
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                )}
              </svg>
            </button>
            <div className={`absolute top-full left-0 mt-4 w-48 flex flex-col gap-2 p-3 rounded-2xl border border-stone-200 bg-white shadow-xl transition-all duration-300 origin-top-left ${isMenuOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <Link to="/#hero" className="px-4 py-2.5 rounded-xl hover:bg-stone-100 text-amber-950 font-bold transition-colors">Ana Sayfa</Link>
              <Link to="/#programs" className="px-4 py-2.5 rounded-xl hover:bg-stone-100 text-amber-950 font-bold transition-colors">Eğitimler</Link>
              <Link to="/#register" className="px-4 py-2.5 rounded-xl hover:bg-stone-100 text-amber-950 font-bold transition-colors">Bilgi Al</Link>
            </div>
          </div>
          <div className="z-20 flex-[2] flex justify-center text-center">
            <Link to="/" className="relative inline-block mt-1 mb-2 md:mt-2 md:mb-3 hover:opacity-80 transition-opacity">
              <span className="font-lora text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-950 tracking-wider">Ekare Sanat Akademi</span>
            </Link>
          </div>
          <div className="flex-1 flex justify-end"></div>
        </div>
      </header>

      {/* Course Detail Section */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-amber-900 leading-tight">
              {course.title} <br/> <span className="text-3xl md:text-4xl text-amber-800/80">Eğitimi</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed">
              {course.metaDescription} {course.desc}
            </p>
            <a href="#register" className="inline-block bg-amber-800 text-[#fdfbf7] px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-900 transition shadow-lg shadow-amber-900/20">
              {course.title} Kursuna Başvur
            </a>
          </div>
          <div className="order-1 md:order-2 relative flex items-center justify-center">
            <img src={course.img} alt={course.altText} className="w-full h-auto max-h-[500px] object-cover rounded-3xl shadow-2xl shadow-stone-400/50" />
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register" className="py-16 md:py-24 px-6 bg-stone-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 md:p-12 border border-stone-100">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-amber-900 mb-6 font-lora">{course.title} Kursu İçin Bilgi Alın</h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg">
                Hemen formu doldurun, size WhatsApp üzerinden detaylı bilgi verelim.
              </p>
            </div>
            {status === 'success' && <div className="mb-8 p-4 bg-green-50 text-green-800 rounded-xl border border-green-200 text-center">WhatsApp üzerinden bilgi almak için yönlendiriliyorsunuz...</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-stone-700 mb-2">Öğrenci Adı *</label><input required type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800 outline-none transition" /></div>
                <div><label className="block text-sm font-medium text-stone-700 mb-2">Öğrenci Soyadı *</label><input required type="text" name="studentSurname" value={formData.studentSurname} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800 outline-none transition" /></div>
                <div><label className="block text-sm font-medium text-stone-700 mb-2">Veli Adı (İsteğe Bağlı)</label><input type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800 outline-none transition" /></div>
                <div><label className="block text-sm font-medium text-stone-700 mb-2">Veli Soyadı (İsteğe Bağlı)</label><input type="text" name="parentSurname" value={formData.parentSurname} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800 outline-none transition" /></div>
                <div className="md:col-span-2">
                  <CustomDatePicker name="birthDate" label="Doğum Tarihi *" value={formData.birthDate} onChange={handleInputChange} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-2">İlgilenilen Branş *</label>
                  <input required type="text" name="branch" value={formData.branch} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800 outline-none transition" />
                </div>
              </div>
              <button type="submit" disabled={status === 'loading'} className="w-full bg-[#25D366] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#128C7E] transition shadow-lg mt-4 flex items-center justify-center gap-3">
                WhatsApp'tan Bilgi Al
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-10 justify-center items-center text-lg">
            <a href="mailto:ekaresanat@gmail.com" className="hover:text-[#fdfbf7] transition-colors">ekaresanat@gmail.com</a>
            <a href="tel:+905447111405" className="hover:text-[#fdfbf7] transition-colors">+90 544 711 14 05</a>
          </div>
          <p className="text-sm opacity-60 mt-2">© 2026 Ekare Sanat Akademi. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}

export default CourseDetail
