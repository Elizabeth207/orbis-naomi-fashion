import ImageBackground from '../ui/ImageBackground'
import { motion } from 'framer-motion'

interface BrandHeroProps {
  brand: 'orbis' | 'naomi'
  eyebrow: string
  title: string
  description: string
  imageSrc: string
}

export default function BrandHero({ brand, eyebrow, title, description, imageSrc }: BrandHeroProps) {
  const xDirection = brand === 'orbis' ? -20 : 20

  return (
    <section className="relative overflow-hidden flex items-center p-14 text-white min-h-[50vh]">
      {/* Image background */}
      <ImageBackground brand={brand} imageSrc={imageSrc} />

      {/* Vignette overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-md">
        <motion.p
          initial={{ opacity: 0, x: xDirection }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0 }}
          className="text-xs uppercase tracking-widest opacity-90 mb-3 font-medium"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, x: xDirection }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl leading-none mb-4 drop-shadow-md"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: xDirection }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-sm opacity-90 leading-relaxed drop-shadow"
        >
          {description}
        </motion.p>
      </div>
    </section>
  )
}
