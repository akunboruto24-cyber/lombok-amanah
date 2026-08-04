'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Tours', href: '/tours' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
              {link.label}
            </Link>
          ))}
          <Link
            href="/#booking"
            className="flex items-center gap-2 px-5 py-2.5 bg-gold-400 text-navy-900 text-[13px] font-bold rounded-full hover:bg-gold-300 transition-all hover:shadow-lg hover:shadow-gold-400/20 active:scale-[0.97]"
          >
            <Phone className="w-3.5 h-3.5" />
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-navy-900' : 'text-white'}`}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
                {link.label}
              </Link>
            ))}
            <Link
              href="/#booking"
              onClick={() => setMenuOpen(false)}
              className="block mt-4 text-center px-6 py-3.5 bg-gold-400 text-navy-900 font-bold rounded-full hover:bg-gold-300 transition-all"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
