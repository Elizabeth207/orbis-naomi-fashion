import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Style } from "../../data/styles";
import { WHATSAPP_NUMBER } from "../../lib/constants";
import PhotoOrFallback from "./PhotoOrFallback";

interface StyleDetailModalProps {
  style: Style | null;
  onClose: () => void;
}

export default function StyleDetailModal({ style, onClose }: StyleDetailModalProps) {
  useEffect(() => {
    if (!style) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [style, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!style) return null;

  const isOrbis = style.brand === "orbis";
  const brandName = isOrbis ? "Orbis II" : "Novias Naomi";
  const eyebrowColor = isOrbis ? "text-orbis-dark" : "text-naomi-dark";
  const buttonColor = isOrbis ? "bg-orbis-dark" : "bg-naomi-dark";
  const whatsappMessage = `Hola, me interesa el estilo '${style.name}' de ${brandName}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <AnimatePresence>
      {style && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4 md:p-10"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="bg-paper max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]"
          >
            {/* Left column: photos (3 o 4 fotos según lo disponible en "coleccion") */}
            <div className="grid grid-cols-2 gap-1">
              {style.images.map((src, index) => {
                const isLoneWide =
                  style.images.length === 1 ||
                  (style.images.length === 3 && index === 2);
                return (
                  <PhotoOrFallback
                    key={index}
                    src={src}
                    brand={style.brand}
                    alt={`${style.name} — foto ${index + 1}`}
                    className={
                      isLoneWide
                        ? "col-span-2 aspect-[16/10] object-cover"
                        : "aspect-[4/5] object-cover"
                    }
                  />
                );
              })}
            </div>

            {/* Right column: description panel */}
            <div className="p-8 md:p-10 flex flex-col relative">
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="absolute top-6 right-6 w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <p className={`font-sans text-xs uppercase tracking-widest font-semibold ${eyebrowColor}`}>
                {brandName}
              </p>
              <h2 className="font-serif text-3xl text-ink mt-3">{style.name}</h2>
              <div className="w-10 h-px bg-line my-5" />
              <p className="text-ink-soft text-[15px] leading-relaxed">{style.description}</p>

              {/* Decorative editorial details */}
              <div className="mt-8 space-y-4">
                <div className="border-t border-line pt-4">
                  <p className="text-xs uppercase tracking-wide text-ink-soft">Disponibilidad</p>
                  <p className="text-sm text-ink mt-1">Consultar en tienda</p>
                </div>
                <div className="border-t border-line pt-4">
                  <p className="text-xs uppercase tracking-wide text-ink-soft">Tallas</p>
                  <p className="text-sm text-ink mt-1">Consultar en tienda</p>
                </div>
              </div>

              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`${buttonColor} text-paper w-full py-3.5 text-sm font-medium flex items-center justify-center gap-2 mt-auto pt-8`}
              >
                Consultar disponibilidad
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
