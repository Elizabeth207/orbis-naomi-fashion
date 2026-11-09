import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ChevronRight,
  Crown,
  Home,
  Images,
  LayoutGrid,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Shirt,
  X,
} from "lucide-react";
import { WHATSAPP_NUMBER } from "../../lib/constants";

type NavItem = {
  path: string;
  label: string;
  icon: LucideIcon;
};

const NAV_LINKS: NavItem[] = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/orbis-ii", label: "Orbis II", icon: Shirt },
  { path: "/novias-naomi", label: "Novias Naomi", icon: Crown },
  { path: "/catalogo", label: "Catálogo", icon: LayoutGrid },
  { path: "/galeria", label: "Galería", icon: Images },
  { path: "/nuestras-tiendas", label: "Nuestras tiendas", icon: MapPin },
  { path: "/contacto", label: "Contacto", icon: Phone },
];

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const location = useLocation();
  const mobileMenuId = useId();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  const panelTransition = reduceMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" as const };

  return (
    <nav className="sticky top-0 z-[100] bg-paper/95 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24 gap-6">
          <Link to="/" className="font-serif leading-none shrink-0 flex items-center gap-2.5">
            <img
              src="/images/orbis/logo-anillos.png"
              alt="Orbis II"
              className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0"
            />
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2.5">
              <span className="text-orbis text-xl md:text-2xl lg:text-[26px] tracking-wide whitespace-nowrap">
                ORBIS II
              </span>
              <span className="hidden md:inline text-ink-soft/70 text-base lg:text-lg font-sans italic">
                &
              </span>
              <span className="text-naomi text-xl md:text-2xl lg:text-[26px] tracking-wide whitespace-nowrap">
                NOVIAS NAOMI
              </span>
            </div>
            <img
              src="/images/naomi/logo-tiara.jpg"
              alt="Novias Naomi"
              className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0"
            />
          </Link>

          <div className="hidden md:flex items-center gap-7 lg:gap-8 shrink-0">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative font-sans text-[11px] lg:text-xs uppercase tracking-widest pb-1.5 transition-colors after:absolute after:left-0 after:-bottom-0 after:h-px after:bg-ink after:transition-all after:duration-300 whitespace-nowrap ${
                    isActive
                      ? "text-ink font-semibold after:w-full"
                      : "text-ink-soft hover:text-ink after:w-0 hover:after:w-full"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:block shrink-0">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-ink px-5 py-2.5 text-[11px] lg:text-xs uppercase tracking-widest font-medium transition-all hover:bg-ink hover:text-paper"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-ink shrink-0 w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls={mobileMenuId}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <motion.span
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={panelTransition}
              className="flex items-center justify-center"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </motion.span>
          </button>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.button
                key="mobile-nav-backdrop"
                type="button"
                aria-label="Cerrar menú"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={panelTransition}
                className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-sm md:hidden"
                style={{ top: "5rem" }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                key="mobile-nav-panel"
                id={mobileMenuId}
                role="dialog"
                aria-modal="true"
                aria-label="Menú de navegación"
                initial={reduceMotion ? false : { opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
                transition={panelTransition}
                className="fixed left-0 right-0 top-20 bottom-0 z-[90] md:hidden bg-paper border-t border-line shadow-[0_20px_50px_rgba(34,31,28,0.15)] overflow-y-auto overscroll-contain"
              >
                <div className="max-w-lg mx-auto px-5 py-6 pb-10 flex flex-col min-h-full">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-semibold mb-5 text-center">
                    Navegación
                  </p>
                  <ul className="space-y-1 flex-1">
                    {NAV_LINKS.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <motion.li
                          key={link.path}
                          initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { duration: 0.22, delay: index * 0.04, ease: "easeOut" }
                          }
                        >
                          <NavLink
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={({ isActive }) =>
                              `relative flex items-center gap-3 py-3.5 px-3 rounded-md font-sans text-sm uppercase tracking-widest transition-colors ${
                                isActive
                                  ? "text-naomi-dark font-semibold bg-naomi-tint/55 border border-naomi/20"
                                  : "text-ink-soft hover:text-ink hover:bg-ink/5 border border-transparent"
                              }`
                            }
                          >
                            <span className="w-10 h-10 rounded-full bg-paper border border-line flex items-center justify-center shrink-0 shadow-sm text-ink">
                              <Icon className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
                            </span>
                            <span className="flex-1 text-left">{link.label}</span>
                            <ChevronRight className="w-4 h-4 opacity-35 shrink-0" aria-hidden="true" />
                          </NavLink>
                        </motion.li>
                      );
                    })}
                  </ul>
                  <motion.a
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.25, delay: NAV_LINKS.length * 0.04 }
                    }
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-6 flex items-center justify-center gap-2 w-full border border-ink bg-ink text-paper px-4 py-4 text-xs uppercase tracking-widest font-medium"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    WhatsApp
                  </motion.a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
}
