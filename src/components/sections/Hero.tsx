import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeroSide from './HeroSide'

export default function Hero() {
  return (
    <section className="relative grid grid-cols-1 md:grid-cols-2 md:h-[75vh]">
      {/* ORBIS II Side */}
      <HeroSide
        side="orbis"
        eyebrow="Siempre a la Moda"
        title={['Orbis II']}
        description="Venta de ropa casual para damas y caballeros, con estilo urbano y elegante, de excelente calidad."
        videoSrc="/video/orbis-hero.mp4"
        linkTo="/orbis-ii"
      />

      {/* NOVIAS NAOMI Side */}
      <HeroSide
        side="naomi"
        eyebrow="Glamour, elegancia & más..."
        title={['Novias', 'Naomi']}
        description="VENTA & ALQUILER de vestidos para novias, quinceañeras, bautizos, promociones y graduaciones. También ofrecemos ternos para adultos y niños, calzado de vestir para damas y caballeros, además de accesorios en general."
        videoSrc="/video/naomi-hero.mp4"
        linkTo="/novias-naomi"
      />

      {/* Central Panel - Estilo campaña editorial, inspirado en lookbooks de moda */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="relative mx-auto my-4 w-[180px] bg-paper/95 backdrop-blur-sm px-5 py-6 shadow-2xl text-center md:absolute md:top-[38%] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:z-20 md:my-0"
      >
        <div className="border-t border-line pt-4">
          <p className="font-sans text-[9px] uppercase tracking-[0.22em] text-ink-soft mb-2">
            ORBIS & NAOMI
          </p>
          <h3 className="font-serif text-lg text-ink mb-2 leading-snug">
            Estilo incansable
          </h3>
          <p className="font-sans text-[9px] uppercase tracking-[0.14em] text-ink-soft pb-4 border-b border-line">
            Pichanaki, Junín
          </p>
          
        </div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="mt-4"
        >
          <Link
            to="/nuestras-tiendas"
            className="inline-block border border-ink px-4 py-2 text-[9px] uppercase tracking-widest text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            Ver tiendas
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}