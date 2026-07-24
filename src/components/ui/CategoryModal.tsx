import { useEffect } from 'react'
import type { Category } from '../../data/categories'
import CategoryIcon from './CategoryIcon'
import { AnimatePresence, motion } from 'framer-motion'

interface CategoryModalProps {
  category: Category | null
  brand: 'orbis' | 'naomi' | null
  onClose: () => void
}

export default function CategoryModal({ category, brand, onClose }: CategoryModalProps) {
  useEffect(() => {
    if (!category) return

    // Block body scroll
    document.body.style.overflow = 'hidden'

    // Handle ESL key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [category, onClose])

  const isOrbis = brand === 'orbis'
  const headerGradient = isOrbis ? 'bg-gradient-radial-orbis' : 'bg-gradient-radial-naomi'
  const eyebrowText = isOrbis ? 'Orbis II · Moda casual' : 'Novias Naomi · Moda de gala'
  const buttonColor = isOrbis ? 'bg-orbis-dark' : 'bg-naomi-dark'

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {category && brand && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-10"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="bg-paper rounded-lg max-w-3xl w-full max-h-[88vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className={`${headerGradient} p-8 md:p-12 text-white relative`}>
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-colors flex items-center justify-center"
                aria-label="Cerrar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Icon circle */}
              <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center mb-6">
                <CategoryIcon name={category.icon} className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <p className="font-sans text-xs uppercase tracking-widest text-white/75 mb-3">{eyebrowText}</p>
              <h2 className="font-serif text-3xl mb-4">{category.name}</h2>
              <p className="font-sans text-white/90 max-w-md leading-relaxed">{category.description}</p>
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-px bg-line">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className={`aspect-[4/3] ${isOrbis ? 'bg-gradient-to-br from-orbis-tint to-orbis-dark' : 'bg-gradient-to-br from-naomi-tint to-naomi-dark'} relative`}
                  style={{
                    backgroundPosition: `${(num - 1) * 25}% ${(num - 1) * 25}%`
                  }}
                >
                  <span className="absolute bottom-3 left-3 font-sans text-[10px] uppercase tracking-wide text-white">
                    Foto {num} — {category.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-line flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="font-sans text-xs text-ink-soft">
                Fotos referenciales — se reemplazan por las imágenes reales de tienda.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`${buttonColor} text-paper px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity`}
                onClick={() => {/* TODO: Navigate to full catalog */}}
              >
                Ver catálogo completo →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
