import { motion } from "framer-motion";
import type { Promotion } from "../../data/promotions";
import type { Style } from "../../data/styles";
import PhotoOrFallback from "../ui/PhotoOrFallback";
import Reveal from "../ui/Reveal";
import { WHATSAPP_NUMBER } from "../../lib/constants";

interface FramedPromoProps {
  promotion: Promotion;
  headerPhoto: Style;
  photoLeft: Style;
  photoRight: Style;
  onPhotoClick?: (style: Style) => void;
}

export default function FramedPromo({ promotion, headerPhoto, photoLeft, photoRight, onPhotoClick }: FramedPromoProps) {
  const isOrbis = promotion.brand === "orbis";
  const eyebrowColor = isOrbis ? "text-orbis-dark" : "text-naomi-dark";
  const whatsappMessage = `Hola, quisiera más información sobre: ${promotion.title}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const renderPhoto = (photo: Style) => {
    const content = (
      <PhotoOrFallback
        src={photo.coverImage}
        brand={photo.brand}
        alt={photo.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    );

    if (onPhotoClick) {
      return (
        <button
          onClick={() => onPhotoClick(photo)}
          className="relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden group cursor-pointer block w-full"
          aria-label={`Ver detalle de ${photo.name}`}
        >
          {content}
        </button>
      );
    }

    return <div className="relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden group">{content}</div>;
  };

  return (
    <Reveal>
      <section className="grid grid-cols-1 md:grid-cols-3">
        {renderPhoto(photoLeft)}

        <div className="flex flex-col items-center justify-center p-10 md:p-8">
          <div className="w-full max-w-xs aspect-[4/3] overflow-hidden mb-6 shadow-md">
            <PhotoOrFallback
              src={headerPhoto.coverImage}
              brand={headerPhoto.brand}
              alt={headerPhoto.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center border-t border-b border-line py-8 px-2 max-w-xs">
            <p className={`font-sans text-xs uppercase tracking-[0.2em] font-semibold ${eyebrowColor} mb-3`}>
              {promotion.eyebrow}
            </p>
            <h2 className="font-serif text-2xl text-ink mb-3 leading-tight">{promotion.title}</h2>
            <div className="w-8 h-px bg-line mx-auto mb-4" />
            <p className="font-sans text-sm text-ink-soft leading-relaxed mb-6">
              {promotion.description}
            </p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-ink px-5 py-2.5 text-xs uppercase tracking-widest text-ink hover:bg-ink hover:text-paper transition-colors"
              >
                Consultar promoción
              </a>
            </motion.div>
          </div>
        </div>

        {renderPhoto(photoRight)}
      </section>
    </Reveal>
  );
}
