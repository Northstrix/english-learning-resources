'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [titleFontSize, setTitleFontSize] = useState('20px');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      let size = 20; 
      const width = window.innerWidth;
      
      if (width < 768) size -= 2;
      if (width < 420) size -= 1;
      if (width < 400) size -= 1;
      if (width < 360) size -= 2;
      
      setTitleFontSize(`${size}px`);
    };

    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const FINAL_GLASS = { 
    bodyOpacity: 0.36, 
    borderOpacity: 0.14, 
    blurStrength: 7.64 
  };

  const navStyle: React.CSSProperties = {
    background: isScrolled ? `rgba(10, 10, 10, ${FINAL_GLASS.bodyOpacity})` : 'transparent',
    border: `1px solid rgba(255, 255, 255, ${isScrolled ? FINAL_GLASS.borderOpacity : 0})`,
    backdropFilter: isScrolled ? `blur(${FINAL_GLASS.blurStrength}px)` : 'none',
    WebkitBackdropFilter: isScrolled ? `blur(${FINAL_GLASS.blurStrength}px)` : 'none',
    height: isScrolled ? '52px' : '80px',
    top: isScrolled ? '16px' : '0',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
  };

  const navLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Resources', href: '/resources' },
  ];

  return (
    <>
      <nav 
        style={navStyle}
        className={cn(
          "fixed left-0 right-0 mx-[12px] md:mx-[24px] px-6 flex items-center justify-between",
          isScrolled && "rounded-lg"
        )}
      >
        <Link href="/" className="flex items-center gap-2 group no-underline text-white">
          <img src="/logo.webp" alt="English Learning Resources Logo" className="w-6 h-6 object-contain shrink-0" />
          <span 
            className="font-headline font-black tracking-tighter group-hover:text-primary transition-colors whitespace-nowrap"
            style={{ fontSize: titleFontSize }}
          >
            English Learning Resources
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest text-white">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="hover:text-primary transition-colors font-bold no-underline"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[2000] bg-[#0a0a0a] p-8 flex flex-col gap-12 animate-in fade-in zoom-in duration-300 overflow-y-auto text-white">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
              <img src="/logo.webp" alt="English Learning Resources Logo" className="w-8 h-8 object-contain shrink-0" />
              <span className="font-headline text-2xl font-black tracking-tighter text-white" style={{ fontSize: titleFontSize }}>English Learning Resources</span>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-primary transition-all p-2">
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex flex-col gap-6 font-headline font-black uppercase tracking-tighter text-white">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-4xl hover:text-primary transition-all no-underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
