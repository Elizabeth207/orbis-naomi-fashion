import { Link } from 'react-router-dom'
import type { Promotion } from '../../data/promotions'
import Reveal from "../ui/Reveal";
import { motion } from "framer-motion";

export default function PromoBanner({ brand, eyebrow, title, description }: Promotion) {
  const isOrbis = brand === 'orbis'
  const brandColor = isOrbis ? 'text-orbis' : 'text-naomi'
  const gradientClass = isOrbis ? 'bg-gradient-radial-orbis' : 'bg-gradient-radial-naomi'
  const storeName = isOrbis ? 'Orbis II' : 'Novias Naomi'

  return (
    <Reveal>
      <section className="border border-line">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left column - Text */}
          <div className="p-14 flex flex-col justify-center">
            <p className={`font-sans text-xs uppercase tracking-widest font-semibold ${brandColor} mb-4`}>
              {eyebrow}
            </p>
            <h2 className="font-serif text-3xl text-ink mb-4">{title}</h2>
            <p className="font-sans text-sm text-ink-soft leading-relaxed max-w-sm mb-6">
              {description}
            </p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                to="#"
                className="inline-flex bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-ink/90 transition-colors"
              >
                Ver promociones →
              </Link>
            </motion.div>
          </div>

          {/* Right column - Image placeholder */}
          <div className={`relative min-h-[300px] ${gradientClass} bg-diagonal-texture flex items-center justify-center`}>
            <span className="text-white uppercase text-xs tracking-wide">
              Foto destacada — vitrina {storeName}
            </span>
          </div>
        </div>
      </section>
    </Reveal>
  )
}
