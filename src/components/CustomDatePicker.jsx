import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, RotateCcw, X } from 'lucide-react';

const AYLAR = [
 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

const GUN_ISIMLERI = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

const CustomDatePicker = ({ 
 value, 
 onChange, 
 label, 
 prefix = '',
 buttonClassName = '',
 icon: IconComponent = CalendarIcon,
 placeholder = 'Tarih Seçin', 
 className = '',
 align = 'left',
 name = 'birthDate'
}) => {
 const [isOpen, setIsOpen] = useState(false);

 const parseDateStr = (dateStr) => {
   if (!dateStr) return new Date();
   const parts = dateStr.split('-');
   if (parts.length === 3) {
     const year = parseInt(parts[0], 10);
     const month = parseInt(parts[1], 10) - 1;
     const day = parseInt(parts[2], 10);
     return new Date(year, month, day);
   }
   return new Date();
 };

 const selectedDate = value ? parseDateStr(value) : null;
 const [viewDate, setViewDate] = useState(() => selectedDate || new Date());
 
 const containerRef = useRef(null);
 const monthDropdownRef = useRef(null);
 const yearDropdownRef = useRef(null);
 const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
 const [openDropdown, setOpenDropdown] = useState(null); 

 useEffect(() => {
   setTimeout(() => {
     if (openDropdown === 'month' && monthDropdownRef.current) {
       const activeBtn = monthDropdownRef.current.querySelector('.active-month');
       if (activeBtn) activeBtn.scrollIntoView({ block: 'center' });
     } else if (openDropdown === 'year' && yearDropdownRef.current) {
       const activeBtn = yearDropdownRef.current.querySelector('.active-year');
       if (activeBtn) activeBtn.scrollIntoView({ block: 'center' });
     }
   }, 10);
 }, [openDropdown]);

 useEffect(() => {
   if (value) {
     setViewDate(parseDateStr(value));
   }
 }, [value]);

 const updatePosition = () => {
   if (containerRef.current) {
     const rect = containerRef.current.getBoundingClientRect();
     const spaceBelow = window.innerHeight - rect.bottom;
     const spaceAbove = rect.top;
     const popupHeight = 440;
     let finalTop = rect.bottom + window.scrollY + 8; 
     
     if (spaceBelow < popupHeight && spaceAbove > spaceBelow) {
       finalTop = rect.top + window.scrollY - popupHeight - 8;
     }

     const maxTop = window.innerHeight + window.scrollY - popupHeight - 16;
     const minTop = window.scrollY + 16;
     
     if (finalTop > maxTop) finalTop = maxTop;
     if (finalTop < minTop) finalTop = minTop;
     setDropdownPosition({
       top: finalTop,
       left: rect.left + window.scrollX,
       width: rect.width
     });
   }
 };

 useEffect(() => {
   if (isOpen) {
     const handleScroll = (e) => {
       if (e.target.closest && e.target.closest('.date-picker-popup')) return;
       updatePosition();
     };
     const handleClickOutside = (event) => {
       if (containerRef.current && !containerRef.current.contains(event.target) && (!event.target.closest || !event.target.closest('.date-picker-popup'))) {
         setIsOpen(false);
         setOpenDropdown(null);
       }
     };
     document.addEventListener('mousedown', handleClickOutside);
     window.addEventListener('scroll', handleScroll, true);
     window.addEventListener('resize', updatePosition);
     return () => {
       document.removeEventListener('mousedown', handleClickOutside);
       window.removeEventListener('scroll', handleScroll, true);
       window.removeEventListener('resize', updatePosition);
     };
   }
 }, [isOpen]);

 const viewYear = viewDate.getFullYear();
 const viewMonth = viewDate.getMonth();

 const handlePrevMonth = (e) => {
   e.stopPropagation();
   setViewDate(new Date(viewYear, viewMonth - 1, 1));
 };

 const handleNextMonth = (e) => {
   e.stopPropagation();
   setViewDate(new Date(viewYear, viewMonth + 1, 1));
 };

 const handleToday = (e) => {
   e.stopPropagation();
   const today = new Date();
   setViewDate(today);
   const todayStr = formatDateToYYYYMMDD(today);
   onChange({ target: { name, value: todayStr } });
   setIsOpen(false);
   setOpenDropdown(null);
 };

 const formatDateToYYYYMMDD = (dateObj) => {
   const y = dateObj.getFullYear();
   const m = String(dateObj.getMonth() + 1).padStart(2, '0');
   const d = String(dateObj.getDate()).padStart(2, '0');
   return `${y}-${m}-${d}`;
 };

 const handleSelectDay = (day) => {
   const newDate = new Date(viewYear, viewMonth, day);
   const dateStr = formatDateToYYYYMMDD(newDate);
   onChange({ target: { name, value: dateStr } });
   setIsOpen(false);
   setOpenDropdown(null);
 };

 const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
 const firstDayIndex = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; 

 const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();
 const prevMonthDays = [];
 for (let i = firstDayIndex - 1; i >= 0; i--) {
   prevMonthDays.push(daysInPrevMonth - i);
 }

 const currentMonthDays = [];
 for (let d = 1; d <= daysInMonth; d++) {
   currentMonthDays.push(d);
 }

 const totalCellsSoFar = prevMonthDays.length + currentMonthDays.length;
 const nextMonthDaysCount = (7 - (totalCellsSoFar % 7)) % 7;
 const nextMonthDays = [];
 for (let d = 1; d <= nextMonthDaysCount; d++) {
   nextMonthDays.push(d);
 }

 const getFormattedDisplay = () => {
   if (!value || !selectedDate) return placeholder;
   try {
     const dayName = selectedDate.toLocaleDateString('tr-TR', { weekday: 'short' });
     const monthName = AYLAR[selectedDate.getMonth()];
     return `${selectedDate.getDate()} ${monthName} ${selectedDate.getFullYear()} (${dayName})`;
   } catch {
     return value;
   }
 };

 const isToday = (day) => {
   const today = new Date();
   return (
     today.getDate() === day &&
     today.getMonth() === viewMonth &&
     today.getFullYear() === viewYear
   );
 };

 const isSelected = (day) => {
   if (!selectedDate) return false;
   return (
     selectedDate.getDate() === day &&
     selectedDate.getMonth() === viewMonth &&
     selectedDate.getFullYear() === viewYear
   );
 };

 return (
   <div className={`relative w-full ${className}`} ref={containerRef}>
     {label && (
       <label className="block text-sm font-medium text-stone-700 mb-2 flex items-center gap-1.5">
         <span>{label}</span>
       </label>
     )}

     {/* Trigger Button */}
     <button
       type="button"
       onClick={(e) => {
         e.stopPropagation();
         if (!isOpen) updatePosition();
         setIsOpen(!isOpen);
         if (isOpen) setOpenDropdown(null);
       }}
       className={`w-full flex flex-nowrap items-center justify-between gap-2 transition cursor-pointer min-w-0 overflow-hidden bg-white px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 outline-none text-stone-900 ${buttonClassName}`}
     >
       <div className="flex items-center gap-2 truncate min-w-0 flex-1 text-left">
         <IconComponent className="w-5 h-5 text-amber-800 shrink-0" />
         <span className="truncate">{prefix}{getFormattedDisplay()}</span>
       </div>
       <ChevronRight className={`w-5 h-5 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-90 text-amber-800' : 'text-stone-400'}`} />
     </button>

     {/* STANDARD SIZE POPUP CALENDAR MODAL */}
     {isOpen && createPortal(
       <div 
         className={`absolute z-[99999] date-picker-popup bg-white/95 backdrop-blur-xl border border-stone-200 shadow-2xl shadow-stone-300/50 rounded-3xl p-5 w-[280px] sm:w-[320px] animate-scale-in text-stone-900`}
         style={{ 
           top: `${dropdownPosition.top}px`, 
           left: align === 'right' ? `${dropdownPosition.left + dropdownPosition.width - 280}px` : `${dropdownPosition.left}px`,
           minWidth: '280px',
           transitionProperty: 'opacity, transform'
         }}
       >
         {/* Header Bar */}
         <div className="flex justify-between items-center border-b border-stone-200 pb-4 mb-4">
           <div className="flex items-center gap-2 relative">
             {/* Month Select */}
             <div className="relative">
               <button
                 type="button"
                 onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'month' ? null : 'month'); }}
                 className="text-stone-900 font-bold rounded-xl px-3 py-1.5 outline-none bg-stone-100 hover:bg-stone-200 transition cursor-pointer text-sm flex items-center gap-1 border border-stone-200"
               >
                 {AYLAR[viewMonth]}
                 <ChevronRight className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'month' ? 'rotate-90' : ''}`} />
               </button>
               
               {openDropdown === 'month' && (
                 <div ref={monthDropdownRef} className="absolute top-full left-0 mt-1 w-32 max-h-48 overflow-y-auto bg-white border border-stone-200 rounded-xl shadow-xl z-50 py-1 custom-scrollbar">
                   {AYLAR.map((ay, idx) => (
                     <button
                       key={ay}
                       type="button"
                       onClick={(e) => {
                         e.stopPropagation();
                         setViewDate(new Date(viewYear, idx, 1));
                         setOpenDropdown(null);
                       }}
                       className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-amber-800/10 ${viewMonth === idx ? 'active-month text-amber-900 font-bold bg-amber-800/10' : 'text-stone-700'}`}
                     >
                       {ay}
                     </button>
                   ))}
                 </div>
               )}
             </div>

             {/* Year Select */}
             <div className="relative">
               <button
                 type="button"
                 onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'year' ? null : 'year'); }}
                 className="text-stone-900 font-bold rounded-xl px-3 py-1.5 outline-none bg-stone-100 hover:bg-stone-200 transition cursor-pointer text-sm flex items-center gap-1 border border-stone-200"
               >
                 {viewYear}
                 <ChevronRight className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'year' ? 'rotate-90' : ''}`} />
               </button>
               
               {openDropdown === 'year' && (
                 <div ref={yearDropdownRef} className="absolute top-full left-0 mt-1 w-24 max-h-48 overflow-y-auto bg-white border border-stone-200 rounded-xl shadow-xl z-50 py-1 custom-scrollbar">
                   {Array.from({length: 120}, (_, i) => new Date().getFullYear() + 20 - i).map(yil => (
                     <button
                       key={yil}
                       type="button"
                       onClick={(e) => {
                         e.stopPropagation();
                         setViewDate(new Date(yil, viewMonth, 1));
                         setOpenDropdown(null);
                       }}
                       className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-amber-800/10 ${viewYear === yil ? 'active-year text-amber-900 font-bold bg-amber-800/10' : 'text-stone-700'}`}
                     >
                       {yil}
                     </button>
                   ))}
                 </div>
               )}
             </div>
           </div>

           <div className="flex items-center gap-1">
             <button
               type="button"
               onClick={handlePrevMonth}
               className="p-2 rounded-full hover:bg-stone-100 text-stone-600 transition cursor-pointer"
               title="Önceki Ay"
             >
               <ChevronLeft className="w-5 h-5" />
             </button>
             <button
               type="button"
               onClick={handleNextMonth}
               className="p-2 rounded-full hover:bg-stone-100 text-stone-600 transition cursor-pointer"
               title="Sonraki Ay"
             >
               <ChevronRight className="w-5 h-5" />
             </button>
           </div>
         </div>

         {/* Days of Week Header */}
         <div className="grid grid-cols-7 gap-1 text-center mb-2">
           {GUN_ISIMLERI.map((g) => (
             <div key={g} className="text-xs font-black uppercase text-amber-900 py-1 tracking-wider">
               {g}
             </div>
           ))}
         </div>

         {/* Days Grid */}
         <div className="grid grid-cols-7 gap-1 text-center">
           {/* Prev month days */}
           {prevMonthDays.map((d, idx) => (
             <div
               key={`prev-${idx}`}
               className="h-8 sm:h-9 flex items-center justify-center text-xs font-semibold text-stone-400 opacity-60 select-none"
             >
               {d}
             </div>
           ))}

           {/* Current month days */}
           {currentMonthDays.map((d) => {
             const selected = isSelected(d);
             const today = isToday(d);

             return (
               <button
                 key={`curr-${d}`}
                 type="button"
                 onClick={() => handleSelectDay(d)}
                 className={`h-8 sm:h-9 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center relative transition transform hover:scale-105 cursor-pointer ${
                   selected
                     ? 'bg-amber-800 text-white font-extrabold shadow-md shadow-amber-800/30'
                     : today
                     ? 'text-amber-800 font-extrabold border-2 border-amber-800/30'
                     : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                 }`}
               >
                 <span>{d}</span>
                 {today && !selected && (
                   <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-amber-800"></span>
                 )}
               </button>
             );
           })}

           {/* Next month days */}
           {nextMonthDays.map((d, idx) => (
             <div
               key={`next-${idx}`}
               className="h-8 sm:h-9 flex items-center justify-center text-xs font-semibold text-stone-400 opacity-60 select-none"
             >
               {d}
             </div>
           ))}
         </div>

         {/* Footer Bar */}
         <div className="flex justify-between items-center border-t border-stone-200 pt-4 mt-4 text-xs font-bold">
           <button
             type="button"
             onClick={handleToday}
             className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-full transition cursor-pointer"
           >
             <RotateCcw className="w-3.5 h-3.5" />
             <span>Bugün</span>
           </button>

           <button
             type="button"
             onClick={() => setIsOpen(false)}
             className="flex items-center gap-1 px-3 py-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-full transition cursor-pointer"
           >
             <X className="w-3.5 h-3.5" />
             <span>Kapat</span>
           </button>
         </div>
       </div>
     , document.body)}
   </div>
 );
};

export default CustomDatePicker;
