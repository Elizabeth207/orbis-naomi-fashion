import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import {
  Baby,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Heart,
  Image as ImageIcon,
  Maximize2,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BRAND, WHATSAPP_NUMBER } from "../../lib/constants";
import { NAOMI_GALLERY_LABELS, type NaomiGalleryCategory } from "../../data/naomiGallery";
import type { LightboxPhoto } from "../../types/lightbox";
import BlurFillImage from "./BlurFillImage";

interface GalleryLightboxProps {
  items?: LightboxPhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

const CATEGORY_ICONS: Record<NaomiGalleryCategory, LucideIcon> = {
  novias: Heart,
  quinceaneras: Sparkles,
  caballeros: Briefcase,
  ninos: Baby,
};

function isGalleryCategory(value: unknown): value is NaomiGalleryCategory {
  return (
    value === "novias" ||
    value === "quinceaneras" ||
    value === "caballeros" ||
    value === "ninos"
  );
}

function resolveBrand(brand: LightboxPhoto["brand"] | undefined): "orbis" | "naomi" {
  return brand === "orbis" ? "orbis" : "naomi";
}

const swipeThreshold = 80;

export default function GalleryLightbox({
  items: itemsProp,
  activeIndex,
  onClose,
  onSelectIndex,
}: GalleryLightboxProps) {
  const reduceMotion = useReducedMotion();
  const [direction, setDirection] = useState(0);
  const [zoomState, setZoomState] = useState<{ index: number | null; on: boolean }>({
    index: null,
    on: false,
  });
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  const photos = useMemo(() => itemsProp ?? [], [itemsProp]);
  const itemsLength = photos.length;

  const resolvedIndex = useMemo(() => {
    if (activeIndex === null || itemsLength === 0) return null;
    const maxIndex = Math.max(itemsLength - 1, 0);
    return Math.min(Math.max(activeIndex, 0), maxIndex);
  }, [activeIndex, itemsLength]);

  const photo = resolvedIndex !== null ? photos[resolvedIndex] ?? null : null;
  const isOpen = resolvedIndex !== null && photo !== null && itemsLength > 0;

  const zoomed =
    resolvedIndex !== null && zoomState.index === resolvedIndex && zoomState.on;

  const setZoomed = useCallback(
    (on: boolean) => {
      if (resolvedIndex === null) return;
      setZoomState({ index: resolvedIndex, on });
    },
    [resolvedIndex]
  );

  const goPrev = useCallback(() => {
    if (resolvedIndex === null || itemsLength === 0) return;
    setDirection(-1);
    onSelectIndex(resolvedIndex === 0 ? itemsLength - 1 : resolvedIndex - 1);
  }, [resolvedIndex, itemsLength, onSelectIndex]);

  const goNext = useCallback(() => {
    if (resolvedIndex === null || itemsLength === 0) return;
    setDirection(1);
    onSelectIndex(resolvedIndex === itemsLength - 1 ? 0 : resolvedIndex + 1);
  }, [resolvedIndex, itemsLength, onSelectIndex]);

  useEffect(() => {
    if (!isOpen || resolvedIndex === null || itemsLength === 0) return;
    const nextIndex = (resolvedIndex + 1) % itemsLength;
    const nextSrc = photos[nextIndex]?.src;
    if (!nextSrc) return;
    const img = new Image();
    img.src = nextSrc;
  }, [isOpen, resolvedIndex, itemsLength, photos]);

  useEffect(() => {
    if (!isOpen) return;

    openerRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const closeBtn = dialogRef.current?.querySelector<HTMLElement>("[data-lightbox-close]");
    closeBtn?.focus();

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      openerRef.current?.focus?.();
    };
  }, [isOpen, onClose, goPrev, goNext]);

  useEffect(() => {
    if (resolvedIndex === null || !thumbStripRef.current) return;
    const thumb = thumbStripRef.current.children[resolvedIndex] as HTMLElement | undefined;
    thumb?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [resolvedIndex, reduceMotion]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > swipeThreshold || info.velocity.x > 400) goPrev();
    else if (info.offset.x < -swipeThreshold || info.velocity.x < -400) goNext();
  };

  const slideVariants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -120 : 120, opacity: 0 }),
      };

  const brandKey = resolveBrand(photo?.brand);
  const brandInfo = BRAND[brandKey];
  const category = isGalleryCategory(photo?.category) ? photo.category : null;
  const categoryLabel =
    category != null ? NAOMI_GALLERY_LABELS[category] : photo?.caption ?? "Galería";
  const CategoryIcon = category != null ? CATEGORY_ICONS[category] : ImageIcon;

  const whatsappText = category
    ? `Hola, me interesa este look de ${NAOMI_GALLERY_LABELS[category]} en Novias Naomi.`
    : photo
      ? `Hola, me interesa: ${photo.caption}`
      : "";
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

  if (itemsLength === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && photo && resolvedIndex !== null && (
      <motion.div
        key="gallery-lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[200] flex flex-col bg-black/85 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        role="presentation"
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Visor: ${photo.caption}`}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col flex-1 min-h-0 w-full max-w-5xl mx-auto p-4 md:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-3 mb-3 shrink-0">
            <p className="text-white/90 text-sm font-medium">
              {resolvedIndex + 1} / {itemsLength}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomed(!zoomed)}
                aria-label={zoomed ? "Ajustar a pantalla" : "Ampliar imagen"}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Maximize2 className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                data-lightbox-close
                onClick={onClose}
                aria-label="Cerrar"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 min-h-0 flex items-center justify-center">
            {itemsLength > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Foto anterior"
                  className="absolute left-0 md:left-2 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center hover:bg-white/20"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Foto siguiente"
                  className="absolute right-0 md:right-2 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center hover:bg-white/20"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </>
            )}

            <motion.div
              className={`relative w-full h-full max-h-[50vh] md:max-h-[58vh] overflow-hidden ${
                zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setZoomed(!zoomed)}
            >
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={photo.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  drag={reduceMotion ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0"
                >
                  <BlurFillImage
                    src={photo.src}
                    brand={brandKey}
                    alt={photo.caption}
                    priority
                    className={`w-full h-full transition-transform duration-300 ${
                      zoomed ? "scale-125" : "scale-100"
                    }`}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {itemsLength > 1 && (
            <div
              ref={thumbStripRef}
              className="mt-4 flex gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-thin"
            >
              {photos.map((item, index) => {
                const thumbBrand = resolveBrand(item.brand);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setDirection(index > resolvedIndex ? 1 : -1);
                      onSelectIndex(index);
                    }}
                    aria-label={`Ver foto ${index + 1}`}
                    aria-current={index === resolvedIndex ? "true" : undefined}
                    className={`relative shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-opacity ${
                      index === resolvedIndex
                        ? thumbBrand === "orbis"
                          ? "border-orbis opacity-100 ring-2 ring-orbis/40"
                          : "border-naomi opacity-100 ring-2 ring-naomi/40"
                        : "border-white/20 opacity-50 hover:opacity-80"
                    }`}
                  >
                    <BlurFillImage
                      src={item.src}
                      brand={thumbBrand}
                      alt=""
                      className="w-full h-full"
                    />
                  </button>
                );
              })}
            </div>
          )}

          <motion.div
            layout
            className="mt-4 pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0"
          >
            <div>
              <span
                className={`inline-block text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm mb-2 ${
                  brandKey === "orbis" ? "bg-orbis/90 text-white" : "bg-naomi/90 text-white"
                }`}
              >
                {brandInfo.name}
              </span>
              <p className="font-serif text-lg text-white flex items-center gap-2">
                <CategoryIcon
                  className="w-4 h-4 text-white/80 shrink-0"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {categoryLabel}
              </p>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white transition-colors ${
                brandKey === "orbis" ? "bg-orbis-dark hover:bg-orbis" : "bg-naomi-dark hover:bg-naomi"
              }`}
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Consultar este look
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
