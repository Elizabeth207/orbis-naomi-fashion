import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  PackageCheck,
  Ruler,
  Crown,
  Heart,
  Images,
  Shirt,
  Sparkles,
  X,
} from "lucide-react";
import type { Style } from "../../data/styles";
import { STYLES_NAOMI, STYLES_ORBIS } from "../../data/styles";
import { STORES } from "../../data/stores";
import { WHATSAPP_NUMBER } from "../../lib/constants";
import BlurFillImage from "./BlurFillImage";

interface StyleDetailModalProps {
  style: Style | null;
  onClose: () => void;
  onSelectStyle?: (style: Style) => void;
}

function galleryForStyle(style: Style): string[] {
  const combined = [style.coverImage, ...style.images];
  return combined.filter((src, i) => combined.indexOf(src) === i);
}

export default function StyleDetailModal({ style, onClose, onSelectStyle }: StyleDetailModalProps) {
  const titleId = useId();
  const reduceMotion = useReducedMotion();
  const [indexByStyle, setIndexByStyle] = useState<Record<string, number>>({});
  const focusReturnRef = useRef<HTMLElement | null>(null);

  const styleId = style?.id ?? null;
  const styleBrand = style?.brand;

  const galleryImages = useMemo(() => (style ? galleryForStyle(style) : []), [style]);

  const activeIndex = styleId ? (indexByStyle[styleId] ?? 0) : 0;
  const galleryLength = galleryImages.length;

  const setActiveIndex = useCallback(
    (update: number | ((prev: number) => number)) => {
      if (!styleId) return;
      setIndexByStyle((prev) => {
        const current = prev[styleId] ?? 0;
        const next = typeof update === "function" ? update(current) : update;
        return { ...prev, [styleId]: next };
      });
    },
    [styleId]
  );

  const relatedStyles = useMemo(() => {
    if (!style || !styleBrand) return [];
    const pool = styleBrand === "orbis" ? STYLES_ORBIS : STYLES_NAOMI;
    return pool.filter((s) => s.id !== style.id).slice(0, 3);
  }, [style, styleBrand]);

  const goPrev = useCallback(() => {
    if (galleryLength <= 1) return;
    setActiveIndex((i) => (i === 0 ? galleryLength - 1 : i - 1));
  }, [galleryLength, setActiveIndex]);

  const goNext = useCallback(() => {
    if (galleryLength <= 1) return;
    setActiveIndex((i) => (i === galleryLength - 1 ? 0 : i + 1));
  }, [galleryLength, setActiveIndex]);

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    if (!styleId) return;

    focusReturnRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (galleryLength <= 1) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      focusReturnRef.current?.focus?.();
    };
  }, [styleId, onClose, galleryLength, goPrev, goNext]);

  useEffect(() => {
    if (!styleId || galleryLength < 2) return;
    const next = galleryImages[(activeIndex + 1) % galleryLength];
    if (!next) return;
    const img = new Image();
    img.src = next;
  }, [activeIndex, styleId, galleryLength, galleryImages]);

  if (!style || !styleBrand) {
    return null;
  }

  const isOrbis = styleBrand === "orbis";
  const brandName = isOrbis ? "Orbis II" : "Novias Naomi";
  const brandBar = isOrbis ? "bg-orbis" : "bg-naomi";
  const buttonColor = isOrbis ? "bg-orbis-dark hover:bg-orbis" : "bg-naomi-dark hover:bg-naomi";
  const activeThumbBorder = isOrbis ? "border-orbis ring-orbis/30" : "border-naomi ring-naomi/30";
  const store = STORES.find((s) => s.brand === styleBrand);

  const whatsappMessage = `Hola, me interesa el estilo '${style.name}' de ${brandName}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const motionOverlay = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  const motionBox = reduceMotion
    ? { initial: false, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.96, y: 12 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: 12 },
      };

  const currentSrc = galleryImages[activeIndex] ?? style.coverImage;

  return (
    <AnimatePresence>
      {style && (
        <motion.div
          {...motionOverlay}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 md:p-8"
          onClick={handleOverlayClick}
          role="presentation"
        >
          <motion.div
            {...motionBox}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="bg-paper w-full sm:max-w-5xl max-h-[100dvh] sm:max-h-[92vh] rounded-none sm:rounded-2xl shadow-[0_24px_80px_rgba(34,31,28,0.18)] overflow-hidden flex flex-col ring-1 ring-ink/5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-1 w-full shrink-0 ${brandBar}`} aria-hidden="true" />

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-0">
                <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-b from-ink/[0.03] to-paper border-b lg:border-b-0 lg:border-r border-line">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-ink-soft font-semibold mb-3">
                    <Images className="w-4 h-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    Galería del estilo
                  </p>
                  <div className="relative aspect-[3/4] w-full rounded-2xl p-2 bg-paper border border-line shadow-[0_16px_48px_rgba(34,31,28,0.14)] ring-1 ring-ink/5">
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-ink/[0.03]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${style.id}-${activeIndex}`}
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduceMotion ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                      >
                        <BlurFillImage
                          src={currentSrc}
                          brand={styleBrand}
                          alt={`${style.name} — foto ${activeIndex + 1}`}
                          priority
                          className="w-full h-full"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {galleryLength > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={goPrev}
                          aria-label="Foto anterior"
                          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-paper/90 border border-line shadow-sm flex items-center justify-center text-ink hover:bg-paper transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={goNext}
                          aria-label="Foto siguiente"
                          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-paper/90 border border-line shadow-sm flex items-center justify-center text-ink hover:bg-paper transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" aria-hidden="true" />
                        </button>
                        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 text-xs font-medium text-white bg-black/55 px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5 tabular-nums">
                          <Images className="w-3.5 h-3.5 opacity-90" aria-hidden="true" />
                          {activeIndex + 1} / {galleryLength}
                        </p>
                      </>
                    )}
                    </div>
                  </div>

                  {galleryLength > 0 && (
                    <div
                      className={`mt-3 grid gap-2 ${
                        galleryLength <= 1
                          ? "grid-cols-1"
                          : galleryLength === 2
                            ? "grid-cols-2"
                            : galleryLength === 3
                              ? "grid-cols-3"
                              : "grid-cols-4"
                      }`}
                    >
                      {galleryImages.map((src, index) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setActiveIndex(index)}
                          aria-label={`Ver foto ${index + 1}`}
                          aria-current={index === activeIndex ? "true" : undefined}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all shadow-sm ${
                            index === activeIndex
                              ? `${activeThumbBorder} ring-2 opacity-100 scale-[1.02]`
                              : "border-line opacity-55 hover:opacity-90 hover:scale-[1.02]"
                          }`}
                        >
                          <BlurFillImage
                            src={src}
                            brand={styleBrand}
                            alt=""
                            className="w-full h-full"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8 lg:p-10 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm ${
                        isOrbis ? "bg-orbis-tint text-orbis-dark" : "bg-naomi-tint text-naomi-dark"
                      }`}
                    >
                      {isOrbis ? (
                        <Shirt className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
                      ) : (
                        <Crown className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
                      )}
                      {brandName}
                    </span>
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Cerrar"
                      className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors shrink-0"
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  <h2 id={titleId} className="font-serif text-3xl md:text-4xl text-ink leading-tight">
                    {style.name}
                  </h2>
                  <div className="w-10 h-px bg-line my-5" />
                  <p className="text-ink-soft text-[15px] leading-relaxed">{style.description}</p>

                  <motion.div className="mt-8 space-y-3" layout>
                    <p className="text-xs uppercase tracking-widest text-ink-soft font-semibold mb-2 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
                      Detalles
                    </p>
                    {!isOrbis && (
                      <DetailRow icon={Sparkles} label="Modalidad" value="Venta y alquiler" />
                    )}
                    <DetailRow icon={Ruler} label="Tallas" value="Consultar en tienda" />
                    <DetailRow icon={PackageCheck} label="Disponibilidad" value="Consultar en tienda" />
                    {store && (
                      <>
                        <DetailRow icon={Clock} label="Horario" value={store.hours} />
                        <DetailRow icon={MapPin} label="Ubicación" value={store.address} />
                      </>
                    )}
                  </motion.div>

                  <div className="hidden lg:flex flex-col gap-3 mt-8">
                    <motion.a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      className={`${buttonColor} text-paper w-full py-3.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors`}
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      Consultar por WhatsApp
                    </motion.a>
                    <Link
                      to="/nuestras-tiendas"
                      className="w-full py-3 text-sm font-medium flex items-center justify-center gap-2 border border-line text-ink hover:bg-ink hover:text-paper transition-colors"
                    >
                      <Navigation className="w-4 h-4" aria-hidden="true" />
                      Ver ubicación
                    </Link>
                  </div>

                  {relatedStyles.length > 0 && onSelectStyle && (
                    <div className="mt-10 pt-8 border-t border-line">
                      <p className="text-xs uppercase tracking-widest text-ink-soft font-semibold mb-4 flex items-center gap-2">
                        <Heart className="w-3.5 h-3.5 text-naomi" strokeWidth={1.5} aria-hidden="true" />
                        También te puede gustar
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {relatedStyles.map((related) => (
                          <button
                            key={related.id}
                            type="button"
                            onClick={() => onSelectStyle(related)}
                            className="relative aspect-[3/4] rounded-md overflow-hidden border border-line hover:border-ink/30 transition-colors text-left"
                          >
                            <BlurFillImage
                              src={related.coverImage}
                              brand={related.brand}
                              alt={related.name}
                              className="w-full h-full"
                            />
                            <motion.p className="absolute bottom-0 left-0 right-0 p-2 text-[10px] font-serif text-white bg-gradient-to-t from-black/70 to-transparent">
                              {related.name}
                            </motion.p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:hidden sticky bottom-0 z-30 p-4 bg-paper/95 backdrop-blur-md border-t border-line flex flex-col gap-2 shrink-0">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonColor} text-paper w-full py-3.5 text-sm font-medium flex items-center justify-center gap-2`}
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                Consultar por WhatsApp
              </a>
              <Link
                to="/nuestras-tiendas"
                className="w-full py-2.5 text-sm font-medium flex items-center justify-center gap-2 border border-line text-ink"
              >
                <Navigation className="w-4 h-4" aria-hidden="true" />
                Ver ubicación
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-line/80 last:border-0">
      <Icon className="w-4 h-4 text-ink-soft mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-ink-soft">{label}</p>
        <p className="text-sm text-ink mt-0.5 leading-snug">{value}</p>
      </div>
    </div>
  );
}
