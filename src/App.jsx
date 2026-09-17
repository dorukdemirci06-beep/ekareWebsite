import React, { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    studentName: '',
    studentSurname: '',
    parentName: '',
    parentSurname: '',
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

  const handleSubmit = (e) => {
    e.preventDefault()
    
    let message = '';
    const { studentName, studentSurname, parentName, parentSurname, branch } = formData;
    
    // Veli bilgisi girilmişse
    if (parentName || parentSurname) {
      const pName = parentName || '';
      const pSurname = parentSurname || '';
      message = `Merhabalar, ben ${pName} ${pSurname}, öğrencim ${studentName} ${studentSurname} için ${branch} dersleri hakkında bilgi almak istiyorum.`;
    } else {
      // Sadece öğrenci bilgisi girilmişse
      message = `Merhabalar, ben ${studentName} ${studentSurname}, ${branch} dersiniz hakkında bilgi alabilir miyim?`;
    }

    // Akademinin WhatsApp numarası (Ülke kodu ile, artısız ve boşluksuz)
    const academyPhone = '905447111405'; 
    const whatsappUrl = `https://wa.me/${academyPhone}?text=${encodeURIComponent(message)}`;
    
    // WhatsApp'ı yeni sekmede aç
    window.open(whatsappUrl, '_blank');
    
    setStatus('success')
    setFormData({ studentName: '', studentSurname: '', parentName: '', parentSurname: '', branch: '', kvkk: false, whatsapp: false })
    
    // 5 saniye sonra formu normal haline döndür
    setTimeout(() => {
      setStatus('idle')
    }, 5000)
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
            <a href="#register" className="hover:text-amber-900 transition flex items-center gap-2">Bilgi Al</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-16 md:py-24 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-amber-900 leading-tight">
              Dans <br className="hidden lg:block" /> Müzik <br className="hidden lg:block" /> Bale
            </h1>
            <p className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed">
              Ekare Sanat Akademi'nin samimi ve davetkar atmosferinde, bedeninizin ve ruhunuzun özgürce ifade bulduğu bir yolculuğa çıkın.
            </p>
            <a href="#register" className="inline-block bg-amber-800 text-[#fdfbf7] px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-900 transition shadow-lg shadow-amber-900/20">
              Hemen Başvurun
            </a>
          </div>
          <div className="relative flex items-center justify-center">
            <img src="/images/Art studio.jpg" alt="Art Studio" className="h-auto max-h-[600px] max-w-full rounded-3xl shadow-2xl shadow-stone-400/50" />
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
      <section id="register" className="py-16 md:py-24 px-6 bg-stone-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 md:p-12 border border-stone-100">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-amber-900 mb-6 font-lora">WhatsApp'tan Bilgi Alın</h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg">
                Eğitimlerimiz hakkında detaylı bilgi almak için aşağıdaki formu doldurmanız yeterli. Sizi hemen WhatsApp hattımıza yönlendireceğiz.
              </p>
            </div>

            {status === 'success' && (
              <div className="mb-8 p-4 bg-green-50 text-green-800 rounded-xl border border-green-200 text-center">
                WhatsApp üzerinden bilgi almak için yönlendiriliyorsunuz...
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
                  <label className="block text-sm font-medium text-stone-700 mb-2">Veli Adı (İsteğe Bağlı)</label>
                  <input type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Veli Soyadı (İsteğe Bağlı)</label>
                  <input type="text" name="parentSurname" value={formData.parentSurname} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 outline-none transition" />
                </div>
                <div className="md:col-span-2">
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

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-[#25D366] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#128C7E] transition shadow-lg shadow-[#25D366]/20 disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                {status === 'loading' ? 'Yönlendiriliyor...' : 'WhatsApp\'tan Bilgi Al'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-amber-900 mb-4 font-lora">Bizi Ziyaret Edin</h2>
            <p className="text-stone-600">Akademimizin sanatsal atmosferini yakından görmek için sizi her zaman bekleriz.</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl shadow-stone-200/50 border border-stone-100">
            <iframe 
              src="https://www.google.com/maps?q=Ekare+Sanat+Akademi&output=embed" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ekare Sanat Akademi Konumu"
            ></iframe>
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
