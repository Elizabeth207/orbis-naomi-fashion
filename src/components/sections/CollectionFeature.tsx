import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Style } from "../../data/styles";
import PhotoOrFallback from "../ui/PhotoOrFallback";
import Reveal from "../ui/Reveal";

interface CollectionFeatureProps {
  brand: "orbis" | "naomi";
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonTo: string;
  photo: Style;
  /** Si se define, se usa esta imagen en vez de photo.coverImage (ej. la foto de portada de inicio) */
  photoSrc?: string;
  reverse?: boolean;
  onPhotoClick?: (style: Style) => void;
}

export default function CollectionFeature({
  brand,
  eyebrow,
  title,
  description,
  buttonLabel,
  buttonTo,
  photo,
  photoSrc,
  reverse = false,
  onPhotoClick,
}: CollectionFeatureProps) {
  const isOrbis = brand === "orbis";
  const eyebrowColor = isOrbis ? "text-orbis-dark" : "text-naomi-dark";
  const titleFontClass = isOrbis
    ? "font-script text-4xl md:text-5xl"
    : "font-serif-italic text-3xl md:text-4xl";

  const photoContent = (
    <PhotoOrFallback
      src={photoSrc ?? photo.coverImage}
      brand={brand}
      alt={photo.name}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );

  const photoBlock = onPhotoClick ? (
    <button
      onClick={() => onPhotoClick(photo)}
      className="relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden group cursor-pointer block w-full"
      aria-label={`Ver detalle de ${photo.name}`}
    >
      {photoContent}
    </button>
  ) : (
    <div className="relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden group">
      {photoContent}
    </div>
  );

  const textBlock = (
    <div className="flex flex-col items-start justify-center p-10 md:p-14 bg-paper h-full">
      <p className={`font-sans text-xs uppercase tracking-[0.2em] font-semibold ${eyebrowColor} mb-4`}>
        {eyebrow}
      </p>
      <h2 className={`${titleFontClass} text-ink mb-5 leading-tight`}>{title}</h2>
      <div className="w-10 h-px bg-line mb-5" />
      <p className="font-sans text-sm text-ink-soft leading-relaxed max-w-sm mb-8">
        {description}
      </p>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Link
          to={buttonTo}
          className="inline-block border border-ink px-6 py-3 text-xs uppercase tracking-widest text-ink hover:bg-ink hover:text-paper transition-colors"
        >
          {buttonLabel}
        </Link>
      </motion.div>
    </div>
  );

  return (
    <Reveal>
      <section className="grid grid-cols-1 md:grid-cols-2 border border-line">
        {reverse ? (
          <>
            <div className="order-2 md:order-1">{textBlock}</div>
            <div className="order-1 md:order-2">{photoBlock}</div>
          </>
        ) : (
          <>
            {photoBlock}
            {textBlock}
          </>
        )}
      </section>
    </Reveal>
  );
}
