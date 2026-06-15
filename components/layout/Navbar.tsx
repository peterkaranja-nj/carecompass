'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/check', label: 'Check Symptoms' },
  { href: '/clinics', label: 'Find Care' },
  { href: '/learn', label: 'Health Library' },
  { href: '/about', label: 'About Us' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = pathname === '/'

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled || !isHome
            ? 'bg-white/95 backdrop-blur-glass border-b border-outline-variant/30 shadow-airy'
            : 'bg-transparent'
        )}
      >
        <div className="section-container h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L9 16M2 9H16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="9" cy="9" r="3" fill="white" fillOpacity="0.3"/>
              </svg>
            </div>
            <span
              className={cn(
                'text-headline-sm font-bold transition-colors',
                scrolled || !isHome ? 'text-primary' : 'text-white'
              )}
            >
              CareCompass
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-body-md font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-primary font-semibold bg-primary/8'
                    : scrolled || !isHome
                    ? 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth"
              className={cn(
                'hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-label-md font-semibold transition-all',
                scrolled || !isHome
                  ? 'text-primary hover:bg-primary/5'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              )}
            >
              Sign In
            </Link>

            <a
              href="tel:999"
              className="flex items-center gap-2 bg-error text-white px-5 py-2.5 rounded-full text-label-md font-bold hover:bg-red-700 active:scale-95 transition-all shadow-sm"
              aria-label="Call emergency services"
            >
              <Phone size={14} strokeWidth={2.5} />
              <span className="hidden sm:inline">Call 999</span>
              <span className="sm:hidden">999</span>
            </a>

            {/* Mobile hamburger */}
            <button
              className={cn(
                'md:hidden p-2 rounded-lg transition-colors',
                scrolled || !isHome ? 'text-on-surface' : 'text-white'
              )}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 pt-20 bg-white md:hidden"
          >
            <nav className="flex flex-col p-6 gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'block px-4 py-4 rounded-xl text-body-lg font-medium border border-outline-variant/20 transition-all',
                      pathname === link.href
                        ? 'text-primary bg-primary/5 border-primary/20 font-semibold'
                        : 'text-on-surface hover:text-primary hover:bg-primary/5'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 pt-4 border-t border-outline-variant/20 flex flex-col gap-3">
                <Link href="/auth" onClick={() => setMenuOpen(false)} className="btn-secondary text-center">
                  Sign In
                </Link>
                <a href="tel:999" className="btn-primary text-center bg-error border-error hover:bg-red-700 gap-2">
                  <Phone size={16} /> Call Emergency (999)
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
