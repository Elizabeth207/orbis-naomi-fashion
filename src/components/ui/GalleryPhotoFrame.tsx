import type { GalleryPhoto } from "../../data/gallery";
import PhotoOrFallback from "./PhotoOrFallback";
import { BRAND } from "../../lib/constants";

interface GalleryPhotoFrameProps {
  photo: GalleryPhoto;
  size: "tall" | "short";
  onClick: () => void;
}

export default function GalleryPhotoFrame({
  photo,
  size,
  onClick,
}: GalleryPhotoFrameProps) {
  const isOrbis = photo.brand === "orbis";
  const minHeight = size === "tall" ? "min-h-[350px]" : "min-h-[280px]";
  const brandPillBg = isOrbis ? "bg-orbis/90" : "bg-naomi/90";
  const brandName = BRAND[photo.brand].name;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left overflow-hidden group relative ${minHeight} cursor-pointer`}
    >
      {/* Photo or fallback */}
      <PhotoOrFallback
        src={photo.src}
        brand={photo.brand}
        alt={photo.caption}
        className="w-full h-auto object-scale-down bg-paper/5 transition-transform duration-700 group-hover:scale-105"
      />

      {/* Brand pill */}
      <div
        className={`absolute top-4 left-4 ${brandPillBg} text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm`}
      >
        {brandName}
      </div>

      {/* Overlay with caption */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-5">
        <p className="font-serif text-sm text-white">{photo.caption}</p>
      </div>
    </button>
  );
}
