import { useEffect } from "react";
import type { GalleryPhoto } from "../../data/gallery";
import PhotoOrFallback from "./PhotoOrFallback";
import { BRAND } from "../../lib/constants";
import { AnimatePresence, motion } from "framer-motion";

interface GalleryLightboxProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function GalleryLightbox({
  photo,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) {
  useEffect(() => {
    if (!photo) return;

    // Block body scroll
    document.body.style.overflow = "hidden";

    // Handle keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photo, onClose, onNext, onPrev]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-6 md:p-16"
          onClick={handleOverlayClick}
        >
          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="fixed top-4 right-4 w-10 h-10 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors flex items-center justify-center z-10"
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Previous button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="fixed left-4 md:left-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors flex items-center justify-center z-10"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Next button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="fixed right-4 md:right-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors flex items-center justify-center z-10"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="max-w-3xl w-full max-h-[85vh] flex flex-col gap-4"
          >
            <PhotoOrFallback
              src={photo.src}
              brand={photo.brand}
              alt={photo.caption}
              className="w-full h-auto max-h-[70vh] object-contain"
            />

            <div className="text-center">
              <div
                className={`inline-block ${photo.brand === "orbis" ? "bg-orbis/90" : "bg-naomi/90"} text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm mb-2`}
              >
                {BRAND[photo.brand].name}
              </div>
              <p className="font-serif text-lg text-white">{photo.caption}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
