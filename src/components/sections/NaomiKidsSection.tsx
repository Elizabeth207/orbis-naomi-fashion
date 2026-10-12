import { useState } from 'react'
import Reveal from '../ui/Reveal'
import PhotoOrFallback from '../ui/PhotoOrFallback'

interface NaomiKidsSectionProps {
  images: string[]
}

export default function NaomiKidsSection({ images }: NaomiKidsSectionProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)

  return (
    <section className="py-16 px-4 bg-ink/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="font-sans text-xs uppercase tracking-widest text-ink-soft font-semibold mb-4">
              Para las más pequeñas
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
              Vestidos para niñas
            </h2>
            <p className="font-sans text-sm text-ink-soft max-w-2xl mx-auto">
              Diseños especiales para quinceañeras, primeras comuniones y eventos especiales. 
              Cada vestido está pensado para que se sientan como princesas en su día importante.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative min-h-[350px] rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setActiveImageIndex(index)}
              >
                <PhotoOrFallback
                  src={image}
                  brand="naomi"
                  alt={`Vestido para niña ${index + 1}`}
                  className="w-full h-auto object-scale-down bg-paper/5 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">Ver detalle</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Lightbox para ver imagen en grande */}
        {activeImageIndex !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveImageIndex(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
              onClick={() => setActiveImageIndex(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={images[activeImageIndex]}
              alt={`Vestido para niña ${activeImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  )
}
