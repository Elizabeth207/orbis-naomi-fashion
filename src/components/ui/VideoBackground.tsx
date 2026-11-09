import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";

interface VideoBackgroundProps {
  brand: "orbis" | "naomi";
  videoSrc: string;
  posterSrc: string;
  className?: string;
  /** Solo el hero de inicio: poster con prioridad alta (LCP). */
  priorityPoster?: boolean;
}

export default function VideoBackground({
  brand,
  videoSrc,
  posterSrc,
  className = "",
  priorityPoster = false,
}: VideoBackgroundProps) {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: containerRef, inView } = useInView<HTMLDivElement>("80px");

  const isOrbis = brand === "orbis";
  const gradientClass = isOrbis ? "bg-gradient-radial-orbis" : "bg-gradient-radial-naomi";

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !inView || videoError) return;

    if (!video.src) {
      video.src = videoSrc;
    }

    const play = () => {
      video.play().catch(() => {
        /* autoplay bloqueado: el poster sigue visible */
      });
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });

    return () => video.removeEventListener("loadeddata", play);
  }, [inView, videoSrc, videoError]);

  return (
    <div ref={containerRef} className={`absolute inset-0 -z-20 overflow-hidden ${className}`}>
      {/* Poster = candidato LCP: carga antes que el MP4 */}
      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority={priorityPoster ? "high" : "auto"}
        loading={priorityPoster ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      {!videoError && inView && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-top animate-kenburns"
          muted
          loop
          playsInline
          preload="none"
          onError={() => setVideoError(true)}
        />
      )}
      {videoError && (
        <div className={`absolute inset-0 ${gradientClass} animate-kenburns`} aria-hidden="true" />
      )}
    </div>
  );
}
