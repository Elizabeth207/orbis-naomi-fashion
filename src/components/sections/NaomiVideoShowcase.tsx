import { useEffect, useRef, useState } from 'react'
import Reveal from '../ui/Reveal'
import { useInView } from '../../hooks/useInView'

interface NaomiVideoShowcaseProps {
  videos: string[]
}

export default function NaomiVideoShowcase({ videos }: NaomiVideoShowcaseProps) {
  const [activeVideo, setActiveVideo] = useState(0)
  const { ref: mainRef, inView: mainInView } = useInView<HTMLDivElement>('160px')
  const mainVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = mainVideoRef.current
    if (!video || !mainInView) return
    const src = videos[activeVideo]
    if (video.getAttribute('data-src') !== src) {
      video.src = src
      video.setAttribute('data-src', src)
    }
    video.play().catch(() => {})
  }, [activeVideo, mainInView, videos])

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="font-sans text-xs uppercase tracking-widest text-ink-soft font-semibold mb-4">
              Descubre nuestra colección
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-ink">
              Videos destacados
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div
              ref={mainRef}
              className="aspect-video bg-ink/5 rounded-lg overflow-hidden mb-6"
            >
              <video
                ref={mainVideoRef}
                className="w-full h-full object-contain"
                muted
                loop
                playsInline
                controls
                preload="none"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {videos.map((video, index) => (
                <button
                  key={video}
                  type="button"
                  onClick={() => setActiveVideo(index)}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    activeVideo === index
                      ? 'border-naomi ring-2 ring-naomi/30'
                      : 'border-line hover:border-ink/30'
                  }`}
                >
                  <div
                    className="w-full h-full bg-ink/10"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-ink ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
