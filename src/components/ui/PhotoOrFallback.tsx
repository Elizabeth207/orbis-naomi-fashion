import { useState } from "react";

interface PhotoOrFallbackProps {
  src: string;
  brand: "orbis" | "naomi";
  className?: string;
  alt: string;
}

export default function PhotoOrFallback({
  src,
  brand,
  className = "",
  alt,
}: PhotoOrFallbackProps) {
  const [imgError, setImgError] = useState(false);
  const isOrbis = brand === "orbis";
  const gradientClass = isOrbis ? "bg-gradient-radial-orbis" : "bg-gradient-radial-naomi";

  return (
    <div className={`w-full h-full relative ${className}`}>
      {!imgError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className={`w-full h-full ${gradientClass} bg-diagonal-texture flex items-center justify-center`}
        >
          <svg
            className="w-8 h-8 text-white opacity-40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
