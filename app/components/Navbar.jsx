'use client';
import { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react'; // Added for the explicit close button

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const burgerRef = useRef(null);

  useLayoutEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      
      // Slide in with a slight bounce and skew
      tl.to(menuRef.current, { 
        x: 0, 
        skewX: 0,
        duration: 0.8, 
        ease: "expo.out" 
      })
      .fromTo(linksRef.current, 
        { y: 100, rotateY: -45, opacity: 0 },
        { 
          y: 0, 
          rotateY: 0, 
          opacity: 1, 
          stagger: 0.11, 
          duration: 0.5, 
          ease: "power4.out" 
        }, 
        "-=0.4"
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(menuRef.current, { 
        x: "101%", // Extra 1% to hide border shadow
        duration: 0.4, 
        ease: "expo.in" 
      });
    }
  }, [isOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav ref={navRef} className={`fixed w-full z-[100] transition-all duration-500 px-6 py-4 md:px-12 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
<div className="text-2xl font-bold text-white tracking-tighter">
  <img
    src="/images/logo.jpeg"
    alt="Aivora Digitals Logo"
    className="
      w-12 md:w-14 rounded-xl object-contain
      transition-transform duration-500 ease-out
      hover:scale-110 hover:rotate-6 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
    "
  />
</div>

          {/* Desktop Nav - Only visible on MD+ */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle Button - Only visible on Mobile/Tablet */}
          <button 
            ref={burgerRef}
            className="md:hidden relative z-[110] w-10 h-10 flex flex-col justify-center items-end gap-1.5 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? 'w-8 rotate-45 translate-y-[8px]' : 'w-8'}`} />
            <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-5'}`} />
            <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? 'w-8 -rotate-45 -translate-y-[8px]' : 'w-8'}`} />
          </button>
        </div>
      </nav>

      {/* SIDEBAR MENU - Fixed visibility logic */}
      <aside 
        ref={menuRef}
        className={`fixed top-0 right-0 z-[105] h-screen w-[85%] sm:w-[60%] md:hidden bg-slate-950 border-l border-white/10 shadow-2xl translate-x-full flex flex-col pointer-events-auto`}
      >
        {/* Internal Close Button (Top Right) */}
        <div className="flex justify-between items-center p-8">
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Navigation</span>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-white/5 text-white hover:bg-blue-600 transition-colors">
               <X size={20} />
            </button>
        </div>

        {/* Links with proper padding and no clipping */}
        <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12 space-y-6">
          {navLinks.map((link, i) => (
            <div key={link.name} className="overflow-hidden">
              <a 
                ref={el => linksRef.current[i] = el}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block text-4xl sm:text-5xl font-black text-white hover:text-blue-500 transition-all active:scale-95"
              >
                {link.name}
              </a>
            </div>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 text-[10px] text-slate-500 uppercase tracking-widest flex justify-between">
           <span>Aivora 2025</span>
           <div className="flex gap-4">
              <span className="text-white">IG</span>
              <span className="text-white">LI</span>
           </div>
        </div>
      </aside>

      {/* Background Dimmer */}
      <div 
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 z-[104] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  );
}