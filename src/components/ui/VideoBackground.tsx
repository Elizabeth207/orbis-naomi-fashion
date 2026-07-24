import { useState } from 'react'

interface VideoBackgroundProps {
  brand: 'orbis' | 'naomi'
  videoSrc: string
  className?: string
}

export default function VideoBackground({ brand, videoSrc, className = '' }: VideoBackgroundProps) {
  const [videoError, setVideoError] = useState(false)

  const isOrbis = brand === 'orbis'
  const gradientClass = isOrbis ? 'bg-gradient-radial-orbis' : 'bg-gradient-radial-naomi'

  return (
    <>
      {/* Video background */}
      {!videoError && (
        <video
          className={`absolute inset-0 w-full h-full object-cover object-top -z-20 animate-kenburns ${className}`}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Fallback gradient background */}
      {videoError && (
        <div className={`absolute inset-0 -z-20 ${gradientClass} animate-kenburns ${className}`} />
      )}
    </>
  )
}
