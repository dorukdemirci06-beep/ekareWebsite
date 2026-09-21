import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { smoothScrollTo } from '../utils/scroll';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleNavClick = (e, targetId) => {
    if (!isHome) return; // Allow default navigation if not on home page

    e.preventDefault();
    setIsMenuOpen(false);
    
    smoothScrollTo(targetId);
  };

  return (
    <header className="relative border-b border-stone-200 sticky top-0 z-50 shadow-sm shadow-amber-900/5 bg-white">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: "url('/images/banner.webp')" }}></div>
      <div className="absolute inset-0 bg-white/10"></div>

      <div className="relative z-10 w-full px-4 md:px-12 py-3 md:py-5 flex items-center justify-between min-h-[60px] md:min-h-[80px]">
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
            <Link to="/#hero" onClick={(e) => handleNavClick(e, 'hero')} className="px-4 py-2.5 rounded-xl hover:bg-white/40 text-amber-950 font-bold transition-colors">Ana Sayfa</Link>
            <Link to="/#programs" onClick={(e) => handleNavClick(e, 'programs')} className="px-4 py-2.5 rounded-xl hover:bg-white/40 text-amber-950 font-bold transition-colors">Eğitimler</Link>
            <Link to="/#register" onClick={(e) => handleNavClick(e, 'register')} className="px-4 py-2.5 rounded-xl hover:bg-white/40 text-amber-950 font-bold transition-colors">Bilgi Al</Link>
            <Link to="/#location" onClick={(e) => handleNavClick(e, 'location')} className="px-4 py-2.5 rounded-xl hover:bg-white/40 text-amber-950 font-bold transition-colors">Konumumuz</Link>
          </div>
        </div>

        {/* Title (Center) */}
        <div className="z-20 flex-[2] flex justify-center text-center">
          <Link to="/" className="relative inline-block mt-1 mb-2 md:mt-2 md:mb-3">
            <span className="font-lora text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-950 tracking-wider drop-shadow-[0_2px_4px_rgba(255,255,255,0.6)] cursor-pointer select-none">Ekare Sanat Akademi</span>
            <span className="font-signature absolute -bottom-4 -right-0 sm:-bottom-5 sm:-right-4 md:-right-8 text-lg sm:text-xl md:text-2xl text-amber-800 rotate-[-8deg] drop-shadow-sm select-none cursor-pointer whitespace-nowrap opacity-90">By Eylül Kuşoğlu</span>
          </Link>
        </div>

        {/* Spacer (Right) to balance flex-1 on the left */}
        <div className="flex-1 flex justify-end"></div>
      </div>
    </header>
  );
}

export default Navbar;
