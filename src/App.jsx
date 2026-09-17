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
      <header className="relative border-b border-stone-200 sticky top-0 z-50 overflow-hidden shadow-sm shadow-amber-900/5">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: "url('/images/yeni_sezon_banner.jpg')" }}></div>
        <div className="absolute inset-0 bg-white/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-5 flex items-center justify-center md:justify-between min-h-[80px]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none">
            <span className="font-lora text-3xl md:text-4xl font-extrabold text-[#fdfbf7] tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Ekare Sanat Akademi</span>
          </div>
          <div className="hidden md:block flex-1"></div> {/* Spacer to push nav to right */}
          <nav className="hidden md:flex gap-8 text-stone-900 font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] relative z-20 ml-auto">
            <a href="#hero" className="hover:text-amber-900 transition">Ana Sayfa</a>
            <a href="#programs" className="hover:text-amber-900 transition">Eğitimler</a>
            <a href="#register" className="hover:text-amber-900 transition">Ön Kayıt</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-16 md:py-24 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-amber-900 leading-tight">
              Sanatın ve Ritmin <br className="hidden lg:block"/> Zarafetini Keşfedin
            </h1>
            <p className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed">
              Ekare Sanat Akademi'nin samimi ve davetkar atmosferinde, bedeninizin ve ruhunuzun özgürce ifade bulduğu bir yolculuğa çıkın.
            </p>
            <a href="#register" className="inline-block bg-amber-800 text-[#fdfbf7] px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-900 transition shadow-lg shadow-amber-900/20">
              Hemen Başvurun
            </a>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-stone-300 flex items-center justify-center bg-white">
             <video src="/images/doruk demlikçi (1).mp4" autoPlay loop muted playsInline className="w-full h-auto max-h-[600px] object-contain"></video>
          </div>
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
              { title: 'Sportif Latin', desc: 'Dinamik, enerjik ve rekabetçi ruhunuzu sahneye taşıyın.', img: '/images/bale.jpg' },
              { title: 'Bachata', desc: 'Duygusal ritimler eşliğinde partnerinizle uyumu yakalayın.', img: '/images/dans sınıfı.jpg' },
              { title: 'Salsa', desc: 'Küba esintileriyle dolu, coşkulu ve hareketli dansın keyfini çıkarın.', img: '/images/27.jpg' },
              { title: 'Birebir Müzik', desc: 'Enstrüman veya şan eğitiminde tamamen size özel hazırlanmış programlar.', img: '/images/33.jpg' }
            ].map((program, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-stone-200 hover:shadow-md transition overflow-hidden group flex flex-col">
                <div className="w-full relative bg-stone-50 overflow-hidden">
                  <img src={program.img} alt={program.title} className="w-full h-auto object-contain max-h-[350px] group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6 md:p-8 flex-1">
                  <h3 className="text-2xl font-bold text-amber-800 mb-3 group-hover:text-amber-900">{program.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{program.desc}</p>
                </div>
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
