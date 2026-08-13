'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { useLanguage, T } from '@/lib/language';

const navLinks = [
  { id: 'Home', en: 'Home', href: '/' },
  { id: 'Tours', en: 'Tours', href: '/tours' },
  { id: 'Destinasi', en: 'Destinations', href: '/destinations' },
  { id: 'Tentang', en: 'About', href: '/about' },
  { id: 'FAQ', en: 'FAQ', href: '/faq' },
  { id: 'Kontak', en: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)] py-3'
          : 'bg-navy-900/80 backdrop-blur-md py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none group">
          <span className={`text-[22px] font-display font-bold tracking-[0.02em] transition-colors ${scrolled ? 'text-navy-900' : 'text-white'}`}>
            LOMBOK <span className="text-gold-400">AMANAH</span>
          </span>
          <span className={`text-[9px] font-medium tracking-[0.25em] uppercase mt-1 transition-colors ${scrolled ? 'text-navy-900/40' : 'text-white/40'}`}>
            Tour And Travel
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] font-medium tracking-[0.04em] transition-colors hover:text-gold-400 ${
                scrolled ? 'text-navy-900/60' : 'text-white/70'
              }`}
            >
              {t(link.id, link.en)}
            </Link>
          ))}

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider border transition-all ${
              scrolled
                ? 'border-navy-900/10 text-navy-900/50 hover:border-gold-400 hover:text-gold-400'
                : 'border-white/20 text-white/60 hover:border-gold-400 hover:text-gold-400'
            }`}
          >
            <span className={lang === 'id' ? 'text-gold-400' : ''}>ID</span>
            <span className="opacity-30">|</span>
            <span className={lang === 'en' ? 'text-gold-400' : ''}>EN</span>
          </button>

          <Link
            href="/booking"
            className="flex items-center gap-2 px-5 py-2.5 bg-gold-400 text-navy-900 text-[13px] font-bold rounded-full hover:bg-gold-300 transition-all hover:shadow-lg hover:shadow-gold-400/20 active:scale-[0.97]"
          >
            <Phone className="w-3.5 h-3.5" />
            <T en="Book Now">Pesan Sekarang</T>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
              scrolled
                ? 'border-navy-900/10 text-navy-900/50'
                : 'border-white/20 text-white/60'
            }`}
          >
            {lang === 'id' ? 'EN' : 'ID'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-navy-900' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-navy-900/5 shadow-xl">
          <div className="px-5 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-[15px] font-medium text-navy-900/70 hover:text-gold-400 hover:bg-gold-50 rounded-xl transition-colors"
              >
                {t(link.id, link.en)}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="block mt-4 text-center px-6 py-3.5 bg-gold-400 text-navy-900 font-bold rounded-full hover:bg-gold-300 transition-all"
            >
              <T en="Book Now">Pesan Sekarang</T>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
