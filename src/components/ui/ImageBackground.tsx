import { useState } from 'react'

interface ImageBackgroundProps {
  brand: 'orbis' | 'naomi'
  imageSrc: string
  className?: string
  priority?: boolean
}

export default function ImageBackground({
  brand,
  imageSrc,
  className = '',
  priority = false,
}: ImageBackgroundProps) {
  const [imgError, setImgError] = useState(false)

  const isOrbis = brand === 'orbis'
  const gradientClass = isOrbis ? 'bg-gradient-radial-orbis' : 'bg-gradient-radial-naomi'

  return (
    <>
      {/* Image background */}
      {!imgError && (
        <img
          src={imageSrc}
          alt=""
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          className={`absolute inset-0 w-full h-full object-cover object-top -z-20 animate-kenburns ${className}`}
          onError={() => setImgError(true)}
        />
      )}

      {/* Fallback gradient background */}
      {imgError && (
        <div className={`absolute inset-0 -z-20 ${gradientClass} animate-kenburns ${className}`} />
      )}
    </>
  )
}
