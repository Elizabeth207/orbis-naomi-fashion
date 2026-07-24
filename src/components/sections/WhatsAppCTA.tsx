import { WHATSAPP_NUMBER } from '../../lib/constants'
import { motion } from 'framer-motion'
import Reveal from '../ui/Reveal'

export default function WhatsAppCTA() {
  return (
    <section className="px-4 py-16">
      <Reveal>
        <div className="relative bg-ink text-paper px-8 md:px-14 py-14 md:py-16 overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="absolute inset-0 bg-gradient-to-br from-orbis-dark/25 via-transparent to-naomi-dark/25 pointer-events-none" />

          <div className="relative">
            <p className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-paper/60 mb-3">
              Escríbenos
            </p>
            <h2 className="font-serif text-2xl md:text-3xl max-w-md leading-snug">
              ¿Buscas algo para una ocasión especial? Conversemos por WhatsApp.
            </h2>
          </div>

          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-paper text-ink px-7 py-3.5 text-sm font-semibold flex items-center gap-2 whitespace-nowrap hover:bg-paper/90 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Escribir por WhatsApp
          </motion.a>
        </div>
      </Reveal>
    </section>
  )
}
