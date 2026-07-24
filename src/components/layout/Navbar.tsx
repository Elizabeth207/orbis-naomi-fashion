import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { WHATSAPP_NUMBER } from '../../lib/constants'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/orbis-ii', label: 'Orbis II' },
    { path: '/novias-naomi', label: 'Novias Naomi' },
    { path: '/catalogo', label: 'Catálogo' },
    { path: '/galeria', label: 'Galería' },
    { path: '/nuestras-tiendas', label: 'Nuestras tiendas' },
    { path: '/contacto', label: 'Contacto' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24 gap-6">
          {/* Logo */}
          <Link to="/" className="font-serif leading-none shrink-0 flex items-center gap-2.5">
            <img
              src="/images/orbis/logo-anillos.png"
              alt="Orbis II"
              className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0"
            />
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2.5">
              <span className="text-orbis text-xl md:text-2xl lg:text-[26px] tracking-wide">
                ORBIS II
              </span>
              <span className="hidden md:inline text-ink-soft/70 text-sm font-sans italic">
                &
              </span>
              <span className="text-naomi text-xl md:text-2xl lg:text-[26px] tracking-wide">
                NOVIAS NAOMI
              </span>
            </div>
            <img
              src="/images/naomi/logo-tiara.png"
              alt="Novias Naomi"
              className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative font-sans text-[11px] lg:text-xs uppercase tracking-widest pb-1.5 transition-colors after:absolute after:left-0 after:-bottom-0 after:h-px after:bg-ink after:transition-all after:duration-300 whitespace-nowrap ${
                    isActive
                      ? 'text-ink font-semibold after:w-full'
                      : 'text-ink-soft hover:text-ink after:w-0 hover:after:w-full'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* WhatsApp Button */}
          <div className="hidden md:block shrink-0">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-ink px-5 py-2.5 text-[11px] lg:text-xs uppercase tracking-widest font-medium transition-all hover:bg-ink hover:text-paper"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-ink shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-5 border-t border-line">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-sans text-xs uppercase tracking-widest transition-colors ${
                      isActive ? 'text-ink font-semibold' : 'text-ink-soft hover:text-ink'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-ink px-4 py-2.5 text-xs uppercase tracking-widest text-center font-medium transition-all hover:bg-ink hover:text-paper"
              >
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
