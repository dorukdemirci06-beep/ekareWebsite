import React, { useState, useRef, useEffect } from 'react'
import CustomDatePicker from './components/CustomDatePicker'

function App() {
  const [formData, setFormData] = useState({
    studentName: '',
    studentSurname: '',
    birthDate: '',
    parentName: '',
    parentSurname: '',
    branch: '',
    kvkk: false,
    whatsapp: false
  })
  const [status, setStatus] = useState(null)
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

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
    const { studentName, studentSurname, parentName, parentSurname, branch, birthDate } = formData;

    let formattedDate = birthDate;
    if (birthDate) {
      const parts = birthDate.split('-');
      if (parts.length === 3) {
        formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
      }
    }

    // Veli bilgisi girilmişse
    if (parentName || parentSurname) {
      const pName = parentName || '';
      const pSurname = parentSurname || '';
      message = `Merhabalar, ben ${pName} ${pSurname}, çocuğum ${studentName} ${studentSurname} (Doğum Tarihi: ${formattedDate}) için ${branch} dersleri hakkında bilgi almak istiyorum.`;
    } else {
      // Sadece öğrenci bilgisi girilmişse
      message = `Merhabalar, ben ${studentName} ${studentSurname} (Doğum Tarihi: ${formattedDate}), ${branch} dersiniz hakkında bilgi alabilir miyim?`;
    }

    // Akademinin WhatsApp numarası (Ülke kodu ile, artısız ve boşluksuz)
    const academyPhone = '905447111405';
    const whatsappUrl = `https://wa.me/${academyPhone}?text=${encodeURIComponent(message)}`;

    // WhatsApp'ı yeni sekmede aç
    window.open(whatsappUrl, '_blank');

    setStatus('success')
    setFormData({ studentName: '', studentSurname: '', birthDate: '', parentName: '', parentSurname: '', branch: '', kvkk: false, whatsapp: false })

    // 5 saniye sonra formu normal haline döndür
    setTimeout(() => {
      setStatus('idle')
    }, 5000)
  }

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const headerOffset = 80; // Header yüksekliği
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 3000; // 3 saniye
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // easeInOutCubic (Yavaş başlar, ortada hızlanır, yavaş biter)
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative border-b border-stone-200 sticky top-0 z-50 shadow-sm shadow-amber-900/5">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: "url('/images/yeni_sezon_banner.jpg')" }}></div>
        <div className="absolute inset-0 bg-white/10"></div>

        <div className="relative z-10 w-full px-6 md:px-12 py-5 flex items-center justify-between min-h-[80px]">
          {/* Hamburger Menu (Left) */}
          <div ref={menuRef} className="z-30 flex-1 flex justify-start relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/40 text-amber-950 hover:bg-white/40 hover:shadow-lg transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                {isMenuOpen ? (
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                ) : (
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                )}
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 mt-4 w-48 flex flex-col gap-2 p-3 rounded-2xl border border-white/40 bg-white/20 backdrop-blur-md shadow-xl transition-all duration-300 origin-top-left ${isMenuOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="px-4 py-2.5 rounded-xl hover:bg-white/40 text-amber-950 font-bold transition-colors">Ana Sayfa</a>
              <a href="#programs" onClick={(e) => handleNavClick(e, 'programs')} className="px-4 py-2.5 rounded-xl hover:bg-white/40 text-amber-950 font-bold transition-colors">Eğitimler</a>
              <a href="#register" onClick={(e) => handleNavClick(e, 'register')} className="px-4 py-2.5 rounded-xl hover:bg-white/40 text-amber-950 font-bold transition-colors">Bilgi Al</a>
              <a href="#location" onClick={(e) => handleNavClick(e, 'location')} className="px-4 py-2.5 rounded-xl hover:bg-white/40 text-amber-950 font-bold transition-colors">Konumumuz</a>
            </div>
          </div>

          {/* Title (Center) */}
          <div className="z-20 flex-[2] flex justify-center text-center">
            <div className="relative inline-block mt-2 mb-3">
              <span className="font-lora text-3xl md:text-4xl font-extrabold text-amber-950 tracking-wider drop-shadow-[0_2px_4px_rgba(255,255,255,0.6)] cursor-default select-none">Ekare Sanat Akademi</span>
              <span className="font-signature absolute -bottom-5 -right-4 md:-right-8 text-xl md:text-2xl text-amber-800 rotate-[-8deg] drop-shadow-sm select-none cursor-default whitespace-nowrap opacity-90">By Eylül Kuşoğlu</span>
            </div>
          </div>

          {/* Spacer (Right) to balance flex-1 on the left */}
          <div className="flex-1 flex justify-end"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-16 md:py-24 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-amber-900 leading-tight cursor-default select-none">
              Dans <br className="hidden lg:block" /> Müzik <br className="hidden lg:block" /> Bale
            </h1>
            <p className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed cursor-default">
              Ekare Sanat Akademi'nin samimi ve davetkar atmosferinde, bedeninizin ve ruhunuzun özgürce ifade bulduğu bir yolculuğa çıkın.
            </p>
            <a href="#register" className="inline-block bg-amber-800 text-[#fdfbf7] px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-900 transition shadow-lg shadow-amber-900/20">
              Hemen Başvurun
            </a>
          </div>
          <div className="relative flex items-center justify-center">
            <img src="/images/Yeni sezonda.jpg" alt="Yeni Sezon" className="h-auto max-h-[600px] max-w-full rounded-3xl shadow-2xl shadow-stone-400/50" />
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
              { title: 'Bale', desc: 'Zarafeti, esnekliği ve klasik müziğin ritmini bedeninizde hissedin.', img: '/images/Bale.svg' },
              { title: 'Salsa & Bachata', desc: 'Küba esintileri ve duygusal ritimlerle partnerli dansın keyfini çıkarın.', img: '/images/Salsa Bachata.svg' },
              { title: 'K-Pop', desc: 'En sevdiğiniz K-Pop idollerinin enerjik ve popüler koreografilerini öğrenin.', img: '/images/Kpop.svg' },
              { title: 'Hip Hop', desc: 'Sokağın ritmini hissedin, özgür koreografilerle bedeninizi müziğe bırakın.', img: '/images/Hiphop.svg' },
              { title: 'Piyano', desc: 'Piyano derslerimizle müziğin temelini atın ve tuşların büyüsünü keşfedin.', img: '/images/Piyano.svg' },
              { title: 'Keman', desc: 'Kemanın zarif ve duygusal tınısıyla kendi melodilerinizi yaratın.', img: '/images/Keman.svg' },
              { title: 'Gitar', desc: 'Akustik, klasik veya elektro; gitarın ritmini kendi tarzınızla yakalayın.', img: '/images/Gitar.svg' },
              { title: 'Şan Dersi', desc: 'Sesinizi profesyonelce kullanmayı öğrenin ve şarkı söylemenin keyfine varın.', img: '/images/Şan.svg' }
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
                  <CustomDatePicker
                    name="birthDate"
                    label="Doğum Tarihi *"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-2">İlgilenilen Branş *</label>
                  <input required type="text" name="branch" value={formData.branch} onChange={handleInputChange} placeholder="Örn: Sportif Latin, Şan Dersi..." className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 outline-none transition" />
                </div>
              </div>



              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#25D366] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#128C7E] transition shadow-lg shadow-[#25D366]/20 disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
                {status === 'loading' ? 'Yönlendiriliyor...' : 'WhatsApp\'tan Bilgi Al'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="location" className="py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-amber-900 mb-4 font-lora">Bizi Ziyaret Edin</h2>
            <p className="text-stone-600">Akademimizin atmosferini yakından görmek için sizi her zaman bekleriz.</p>
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
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-10 justify-center items-center text-lg">
            <a href="mailto:ekaresanat@gmail.com" className="hover:text-[#fdfbf7] transition-colors flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
              </svg>
              ekaresanat@gmail.com
            </a>
            <a href="tel:+905447111405" className="hover:text-[#fdfbf7] transition-colors flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
              </svg>
              +90 544 711 14 05
            </a>
          </div>
          <p className="text-sm opacity-60 mt-2">© 2026 Ekare Sanat Akademi. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
