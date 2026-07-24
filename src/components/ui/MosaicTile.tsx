import { motion } from "framer-motion";
import type { Style } from "../../data/styles";
import PhotoOrFallback from "./PhotoOrFallback";
import { BRAND } from "../../lib/constants";

interface MosaicTileProps {
  style: Style;
  onClick: () => void;
  large?: boolean;
}

export default function MosaicTile({ style, onClick, large = false }: MosaicTileProps) {
  const isOrbis = style.brand === "orbis";
  const pillBg = isOrbis ? "bg-orbis/90" : "bg-naomi/90";
  const brandName = BRAND[style.brand].name;

  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden w-full h-full group cursor-pointer text-left block"
    >
      <motion.div
        className="w-full h-full"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <PhotoOrFallback
          src={style.coverImage}
          brand={style.brand}
          alt={style.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Brand pill */}
      <div
        className={`absolute top-3 left-3 ${pillBg} text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm`}
      >
        {brandName}
      </div>

      {/* Bottom overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <p className={`font-serif text-white ${large ? "text-xl" : "text-sm"}`}>{style.name}</p>
      </div>
    </button>
  );
}
