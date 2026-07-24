import { useState } from "react";
import { motion } from "framer-motion";
import type { Style } from "../../data/styles";
import PhotoOrFallback from "./PhotoOrFallback";

interface StyleCardProps {
  style: Style;
  onClick: () => void;
}

export default function StyleCard({ style, onClick }: StyleCardProps) {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // TODO: conectar a favoritos reales si el cliente lo pide en el futuro.
    setLiked((prev) => !prev);
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="w-full aspect-[3/4] overflow-hidden relative group cursor-pointer text-left"
    >
      <PhotoOrFallback
        src={style.coverImage}
        brand={style.brand}
        alt={style.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Decorative like button */}
      <button
        onClick={handleLikeClick}
        aria-label={liked ? "Quitar de favoritos" : "Agregar a favoritos"}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21s-7.5-4.686-10-9.14C.36 8.66 1.9 5 5.4 5c2.1 0 3.4 1.2 4.1 2.4C10.2 6.2 11.5 5 13.6 5c3.5 0 5.04 3.66 3.4 6.86C19.5 16.314 12 21 12 21z"
          />
        </svg>
      </button>

      {/* Bottom overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full p-4">
        <p className="font-serif text-white text-lg">{style.name}</p>
      </div>
    </motion.button>
  );
}
