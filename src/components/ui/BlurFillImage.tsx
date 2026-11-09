import { useState } from "react";
import { Camera } from "lucide-react";

interface BlurFillImageProps {
  src: string;
  alt: string;
  brand: "orbis" | "naomi";
  className?: string;
  priority?: boolean;
}

export default function BlurFillImage({
  src,
  alt,
  brand,
  className = "",
  priority = false,
}: BlurFillImageProps) {
  const [imgError, setImgError] = useState(false);
  const isOrbis = brand === "orbis";
  const gradientClass = isOrbis ? "bg-gradient-radial-orbis" : "bg-gradient-radial-naomi";
  const loading = priority ? "eager" : "lazy";

  const handleError = () => setImgError(true);

  if (imgError) {
    return (
      <div
        className={`relative w-full h-full ${gradientClass} bg-diagonal-texture flex items-center justify-center ${className}`}
      >
        <Camera className="w-8 h-8 text-white opacity-40" strokeWidth={1.5} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading={loading}
        decoding="async"
        onError={handleError}
        className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl brightness-[0.65] saturate-150"
      />
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onError={handleError}
        className="relative z-10 w-full h-full object-contain"
      />
    </div>
  );
}
