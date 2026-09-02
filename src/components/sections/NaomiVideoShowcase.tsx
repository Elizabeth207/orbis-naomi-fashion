import { useState } from 'react'
import Reveal from '../ui/Reveal'

interface NaomiVideoShowcaseProps {
  videos: string[]
}

export default function NaomiVideoShowcase({ videos }: NaomiVideoShowcaseProps) {
  const [activeVideo, setActiveVideo] = useState(0)

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
            {/* Video principal */}
            <div className="aspect-video bg-ink/5 rounded-lg overflow-hidden mb-6">
              <video
                key={activeVideo}
                className="w-full h-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                controls
              >
                <source src={videos[activeVideo]} type="video/mp4" />
              </video>
            </div>

            {/* Thumbnails de videos */}
            <div className="grid grid-cols-3 gap-4">
              {videos.map((video, index) => (
                <button
                  key={index}
                  onClick={() => setActiveVideo(index)}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    activeVideo === index
                      ? 'border-naomi ring-2 ring-naomi/30'
                      : 'border-line hover:border-ink/30'
                  }`}
                >
                  <video
                    className="w-full h-full object-contain"
                    muted
                    onMouseEnter={(e) => {
                      const vid = e.target as HTMLVideoElement
                      vid.play().catch(() => {})
                    }}
                    onMouseLeave={(e) => {
                      const vid = e.target as HTMLVideoElement
                      vid.pause()
                      vid.currentTime = 0
                    }}
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-ink ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
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
