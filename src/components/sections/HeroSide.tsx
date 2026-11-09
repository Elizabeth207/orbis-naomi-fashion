import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import VideoBackground from '../ui/VideoBackground'
import { motion } from 'framer-motion'

interface HeroSideProps {
  side: 'orbis' | 'naomi'
  eyebrow: string
  title: string[]
  description: string
  videoSrc: string
  linkTo: string
}

export default function HeroSide({ side, eyebrow, title, description, videoSrc, linkTo }: HeroSideProps) {
  const isOrbis = side === 'orbis'
  const xDirection = isOrbis ? -20 : 20

  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-end p-6 md:p-10 text-white h-[65vh] md:h-[75vh] items-start ${
        isOrbis ? '' : 'md:items-end'
      }`}
    >
      {/* Video background */}
      <VideoBackground brand={side} videoSrc={videoSrc} />

      {/* Vignette overlay - Sombra inferior un poco más oscura para leer el texto fácilmente */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-black/15 to-black/75" />

      {/* Content — en el lado Naomi se espeja hacia el borde exterior derecho para no
          quedar pegado al panel central que vive en el límite entre ambas mitades */}
      <div
        className={`relative z-10 max-w-sm md:max-w-md text-left ${isOrbis ? '' : 'md:text-right md:ml-auto'}`}
      >
        <motion.p
          initial={{ opacity: 0, x: xDirection }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0 }}
          className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-white/95 mb-2.5 font-semibold [text-shadow:0_1px_10px_rgba(0,0,0,0.35)]"
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, x: xDirection }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-script text-5xl md:text-6xl leading-tight mb-3.5 text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]"
        >
          {title.map((line, index) => (
            <Fragment key={index}>
              {index > 0 && <br />}
              <span>{line}</span>
            </Fragment>
          ))}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: xDirection }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans text-[13px] md:text-sm text-white/92 leading-[1.65] mb-6 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]"
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: xDirection }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={isOrbis ? '' : 'md:flex md:justify-end'}
        >
          <Link
            to={linkTo}
            className="group inline-flex items-center gap-2.5 px-4 py-2.5 border border-white/55 bg-white/12 backdrop-blur-md text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-white/22 hover:border-white/90 hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
          >
            <span>Ver colección</span>
            <ArrowRight
              className="w-3.5 h-3.5 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
