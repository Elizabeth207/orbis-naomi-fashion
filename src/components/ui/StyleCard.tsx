import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";
import type { Style } from "../../data/styles";
import BlurFillImage from "./BlurFillImage";

interface StyleCardProps {
  style: Style;
  onClick: () => void;
}

export default function StyleCard({ style, onClick }: StyleCardProps) {
  const [liked, setLiked] = useState(false);
  const isOrbis = style.brand === "orbis";
  const brandPillBg = isOrbis ? "bg-orbis/90" : "bg-naomi/90";
  const brandName = isOrbis ? "Orbis II" : "Novias Naomi";

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // TODO: conectar a favoritos reales si el cliente lo pide en el futuro.
    setLiked((prev) => !prev);
  };

  const handleLikeKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleCardKeyDown}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="w-full aspect-[3/4] rounded-md overflow-hidden relative group cursor-pointer text-left shadow-sm hover:shadow-md transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <BlurFillImage
        src={style.coverImage}
        brand={style.brand}
        alt={style.name}
        className="absolute inset-0 w-full h-full"
      />

      <div
        className={`absolute top-3 left-3 ${brandPillBg} text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm z-20`}
      >
        {brandName}
      </div>

      <button
        type="button"
        onClick={handleLikeClick}
        onKeyDown={handleLikeKeyDown}
        aria-label={liked ? "Quitar de favoritos" : "Agregar a favoritos"}
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <Heart
          className="w-4 h-4"
          strokeWidth={2}
          fill={liked ? "currentColor" : "none"}
          aria-hidden="true"
        />
      </button>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full p-4 z-20">
        <p className="font-serif text-white text-lg leading-tight">{style.name}</p>
        <p className="mt-2 flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-white/0 group-hover:text-white/90 transition-colors duration-300 font-medium">
          Ver detalle
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
        </p>
      </div>
    </motion.div>
  );
}
