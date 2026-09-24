import React, { useState, useEffect, Suspense, lazy } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { courses } from '../data/courses'
import Navbar from '../components/Navbar'

const CustomDatePicker = lazy(() => import('../components/CustomDatePicker'))

function CourseDetail() {
  const { slug } = useParams()
  const course = courses.find(c => c.slug === slug)

  if (!course) {
    return <Navigate to="/" />
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

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
      <Navbar />

      <main>
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
            <img src={course.img} alt={course.altText} title={`${course.title} Kursu - Ekare Sanat Akademi`} className="w-full h-auto max-h-[500px] object-cover rounded-3xl shadow-2xl shadow-stone-400/50" loading="eager" />
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
                <div><label htmlFor="course_studentName" className="block text-sm font-medium text-stone-700 mb-2">Öğrenci Adı *</label><input id="course_studentName" required type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800 outline-none transition" /></div>
                <div><label htmlFor="course_studentSurname" className="block text-sm font-medium text-stone-700 mb-2">Öğrenci Soyadı *</label><input id="course_studentSurname" required type="text" name="studentSurname" value={formData.studentSurname} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800 outline-none transition" /></div>
                <div><label htmlFor="course_parentName" className="block text-sm font-medium text-stone-700 mb-2">Veli Adı (İsteğe Bağlı)</label><input id="course_parentName" type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800 outline-none transition" /></div>
                <div><label htmlFor="course_parentSurname" className="block text-sm font-medium text-stone-700 mb-2">Veli Soyadı (İsteğe Bağlı)</label><input id="course_parentSurname" type="text" name="parentSurname" value={formData.parentSurname} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800 outline-none transition" /></div>
                <div className="md:col-span-2">
                  <Suspense fallback={<div className="h-12 bg-stone-100 rounded-xl animate-pulse"></div>}>
                    <CustomDatePicker name="birthDate" label="Doğum Tarihi *" value={formData.birthDate} onChange={handleInputChange} />
                  </Suspense>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="course_branch" className="block text-sm font-medium text-stone-700 mb-2">İlgilenilen Branş *</label>
                  <input id="course_branch" required type="text" name="branch" value={formData.branch} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800 outline-none transition" />
                </div>
              </div>
              <button type="submit" disabled={status === 'loading'} className="w-full bg-[#128C7E] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#075E54] transition shadow-lg mt-4 flex items-center justify-center gap-3">
                WhatsApp'tan Bilgi Al
              </button>
            </form>
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
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
