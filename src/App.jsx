import React, { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    studentName: '',
    studentSurname: '',
    parentName: '',
    parentSurname: '',
    phone: '',
    branch: '',
    kvkk: false,
    whatsapp: false
  })
  const [status, setStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/on-kayitlar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          studentName: '', studentSurname: '', parentName: '', parentSurname: '', phone: '', branch: '', kvkk: false, whatsapp: false
        })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-amber-900 tracking-tight">
            Ekare Sanat Akademi
          </div>
          <nav className="hidden md:flex gap-6 text-stone-600 font-medium">
            <a href="#hero" className="hover:text-amber-800 transition">Ana Sayfa</a>
            <a href="#programs" className="hover:text-amber-800 transition">Eğitimler</a>
            <a href="#register" className="hover:text-amber-800 transition">Ön Kayıt</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-amber-900 leading-tight">
            Sanatın ve Ritmin <br className="hidden md:block"/> Zarafetini Keşfedin
          </h1>
          <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ekare Sanat Akademi'nin samimi ve davetkar atmosferinde, bedeninizin ve ruhunuzun özgürce ifade bulduğu bir yolculuğa çıkın.
          </p>
          <a href="#register" className="inline-block bg-amber-800 text-[#fdfbf7] px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-900 transition shadow-lg shadow-amber-900/20">
            Hemen Başvurun
          </a>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 px-6 bg-stone-100/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Eğitimlerimiz</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">Tutkunuzu profesyonel eğitmenler eşliğinde hayata geçirin.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Sportif Latin', desc: 'Dinamik, enerjik ve rekabetçi ruhunuzu sahneye taşıyın.' },
              { title: 'Bachata', desc: 'Duygusal ritimler eşliğinde partnerinizle uyumu yakalayın.' },
              { title: 'Salsa', desc: 'Küba esintileriyle dolu, coşkulu ve hareketli dansın keyfini çıkarın.' },
              { title: 'Birebir Müzik', desc: 'Enstrüman veya şan eğitiminde tamamen size özel hazırlanmış programlar.' }
            ].map((program, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 hover:shadow-md transition group">
                <h3 className="text-2xl font-bold text-amber-800 mb-3 group-hover:text-amber-900">{program.title}</h3>
                <p className="text-stone-600 leading-relaxed">{program.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 md:p-12 border border-stone-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-amber-900 mb-3">Ön Kayıt Formu</h2>
              <p className="text-stone-500">Geleceğin sanatçıları ve dansçıları için ilk adımı atın.</p>
            </div>

            {status === 'success' && (
              <div className="mb-8 p-4 bg-green-50 text-green-800 rounded-xl border border-green-200 text-center">
                Tebrikler! Ön kayıt başvurunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.
              </div>
            )}
            
            {status === 'error' && (
              <div className="mb-8 p-4 bg-red-50 text-red-800 rounded-xl border border-red-200 text-center">
                İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Öğrenci Adı *</label>
                  <input required type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Öğrenci Soyadı *</label>
                  <input required type="text" name="studentSurname" value={formData.studentSurname} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Veli Adı *</label>
                  <input required type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Veli Soyadı *</label>
                  <input required type="text" name="parentSurname" value={formData.parentSurname} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 outline-none transition" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Telefon Numarası *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="05XX XXX XX XX" className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">İlgilenilen Branş *</label>
                  <input required type="text" name="branch" value={formData.branch} onChange={handleInputChange} placeholder="Örn: Sportif Latin, Şan Dersi..." className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 outline-none transition" />
                </div>
              </div>

              <div className="pt-4 space-y-4 border-t border-stone-100">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input required type="checkbox" name="kvkk" checked={formData.kvkk} onChange={handleInputChange} className="mt-1 w-5 h-5 rounded border-stone-300 text-amber-800 focus:ring-amber-800" />
                  <span className="text-sm text-stone-600">
                    <span className="text-amber-900 font-medium underline">KVKK Aydınlatma Metni</span>'ni okudum, anladım ve kişisel verilerimin işlenmesini kabul ediyorum. *
                  </span>
                </label>
                
                <label className="flex items-start gap-3 cursor-pointer">
                  <input required type="checkbox" name="whatsapp" checked={formData.whatsapp} onChange={handleInputChange} className="mt-1 w-5 h-5 rounded border-stone-300 text-amber-800 focus:ring-amber-800" />
                  <span className="text-sm text-stone-600">
                    Akademi ile ilgili bilgilendirmeler için tarafıma <span className="font-medium">WhatsApp</span> üzerinden ulaşılmasına izin veriyorum. *
                  </span>
                </label>
              </div>

              <button type="submit" disabled={status === 'loading'} className="w-full bg-amber-800 text-white py-4 rounded-xl font-semibold text-lg hover:bg-amber-900 transition disabled:opacity-70 mt-4">
                {status === 'loading' ? 'Gönderiliyor...' : 'Ön Kayıt Başvurusunu Tamamla'}
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 text-center border-t border-stone-800">
        <p>© 2026 Ekare Sanat Akademi. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  )
}

export default App
