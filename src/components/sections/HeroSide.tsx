import { Fragment } from 'react'
import { Link } from 'react-router-dom'
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />

      {/* Content — en el lado Naomi se espeja hacia el borde exterior derecho para no
          quedar pegado al panel central que vive en el límite entre ambas mitades */}
      <div className={`relative z-10 max-w-sm md:max-w-md text-left ${isOrbis ? '' : 'md:text-right'}`}>
        <motion.p
          initial={{ opacity: 0, x: xDirection }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0 }}
          className="text-xs uppercase tracking-widest opacity-90 mb-2 font-medium"
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, x: xDirection }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-script text-5xl md:text-6xl leading-tight mb-3 drop-shadow-md"
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
          className="text-xs md:text-sm opacity-90 leading-relaxed mb-5 drop-shadow"
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: xDirection }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          whileHover={{ x: 4 }}
          className={isOrbis ? '' : 'md:flex md:justify-end'}
        >
          <Link
            to={linkTo}
            className="inline-flex items-center gap-2 border-b border-white/80 hover:border-white hover:pl-2 text-sm font-medium transition-all duration-300"
          >
            Ver colección →
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
