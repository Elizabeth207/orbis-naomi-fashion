import { useEffect, useId, useState } from "react";
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
  const [menuOpenPath, setMenuOpenPath] = useState<string | null>(null);
  const mobileMenuOpen = menuOpenPath !== null && menuOpenPath === location.pathname;
  const setMobileMenuOpen = (open: boolean) => setMenuOpenPath(open ? location.pathname : null);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpenPath(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  const panelTransition = reduceMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" as const };

  return (
    <nav className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full min-w-0">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-24 gap-2 sm:gap-6 min-w-0">
          <Link
            to="/"
            className="font-serif leading-tight min-w-0 flex items-center gap-1.5 sm:gap-2.5 flex-1 max-w-[calc(100%-2.75rem)]"
          >
            <img
              src="/images/orbis/logo-anillos.png"
              alt="Orbis II"
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain shrink-0"
            />
            <div className="min-w-0 flex flex-col md:flex-row md:items-baseline md:gap-2.5">
              <span className="text-orbis text-[11px] sm:text-xl md:text-2xl lg:text-[26px] tracking-wide leading-none">
                ORBIS II
              </span>
              <span className="hidden md:inline text-ink-soft/70 text-base lg:text-lg font-sans italic">&</span>
              <span className="text-naomi text-[11px] sm:text-xl md:text-2xl lg:text-[26px] tracking-wide leading-none">
                NOVIAS NAOMI
              </span>
            </div>
            <img
              src="/images/naomi/logo-tiara.jpg"
              alt="Novias Naomi"
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain shrink-0 hidden min-[360px]:block"
            />
          </Link>

          <div className="hidden md:flex items-center gap-7 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="relative font-sans text-[11px] lg:text-xs uppercase tracking-widest pb-1.5 transition-colors whitespace-nowrap text-ink-soft hover:text-ink"
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? "text-ink font-semibold" : ""}>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-underline"
                        className="absolute left-0 right-0 -bottom-0 h-px bg-ink"
                        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
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

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={panelTransition}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              id={mobileMenuId}
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={panelTransition}
              className="md:hidden overflow-hidden border-t border-line bg-paper relative z-50"
            >
              <div className="px-4 py-5 space-y-1">
                {NAV_LINKS.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.path}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
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
                          `relative flex items-center gap-3 py-3.5 pl-3 pr-2 rounded-sm font-sans text-sm uppercase tracking-widest transition-colors ${
                            isActive
                              ? "text-naomi-dark font-semibold bg-naomi-tint/50"
                              : "text-ink-soft hover:text-ink hover:bg-ink/5"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <span
                                className="absolute left-0 top-2 bottom-2 w-0.5 bg-naomi rounded-full"
                                aria-hidden="true"
                              />
                            )}
                            <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                            <span className="flex-1">{link.label}</span>
                            <ChevronRight className="w-4 h-4 opacity-40 shrink-0" aria-hidden="true" />
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.22, delay: NAV_LINKS.length * 0.04, ease: "easeOut" }
                  }
                  className="pt-4"
                >
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full border border-ink px-4 py-3.5 text-xs uppercase tracking-widest font-medium transition-all hover:bg-ink hover:text-paper"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
