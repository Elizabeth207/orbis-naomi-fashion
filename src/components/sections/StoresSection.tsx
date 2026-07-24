import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { STORES } from '../../data/stores'
import Reveal from "../ui/Reveal";
import WhatsAppButton from "../ui/WhatsAppButton";

export default function StoresSection() {
  return (
    <section className="py-20 px-4">
      {/* Header */}
      <Reveal>
        <div className="text-center mb-14 max-w-xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-ink-soft mb-4">
            Visítanos
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">Nuestras tiendas</h2>
          <p className="font-sans text-sm text-ink-soft leading-relaxed">
            Visítanos en Pichanaki, o escríbenos si prefieres atención por WhatsApp.
          </p>
        </div>
      </Reveal>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {STORES.map((store, index) => {
          const isOrbis = store.brand === 'orbis'
          const badgeBg = isOrbis ? 'bg-orbis-tint' : 'bg-naomi-tint'
          const badgeText = isOrbis ? 'text-orbis-dark' : 'text-naomi-dark'
          const accentBorder = isOrbis ? 'border-orbis' : 'border-naomi'

          return (
            <Reveal key={store.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className={`bg-paper border border-line border-t-4 ${accentBorder} shadow-sm p-8 md:p-9 h-full flex flex-col`}
              >
                {/* Badge */}
                <div className={`${badgeBg} ${badgeText} text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm inline-block mb-4 w-fit`}>
                  {store.name}
                </div>

                {/* Name */}
                <h3 className="font-serif text-2xl text-ink mb-2">{store.name}</h3>

                {/* Slogan */}
                <p className="font-serif-italic text-sm text-ink-soft mb-5">{store.slogan}</p>

                <div className="w-10 h-px bg-line mb-5" />

                {/* Address with icon */}
                <div className="flex items-start gap-2 mb-6">
                  <svg
                    className="w-4 h-4 text-ink mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-sans text-sm text-ink-soft">{store.address}</span>
                </div>

                {/* Hours table */}
                <div className="mb-8">
                  <p className="font-sans text-xs uppercase tracking-wide text-ink-soft font-semibold mb-3">
                    Horario de atención
                  </p>
                  <div className="space-y-0">
                    {store.hoursDetail.map((item, i) => (
                      <div
                        key={i}
                        className={`flex justify-between py-2 text-sm ${
                          i < store.hoursDetail.length - 1 ? 'border-b border-line' : ''
                        }`}
                      >
                        <span className="text-ink">{item.day}</span>
                        <span className="text-ink-soft">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 flex-col sm:flex-row mt-auto">
                  <WhatsAppButton
                    phone={store.whatsapp}
                    className="flex-1 justify-center bg-ink text-paper py-3 text-sm font-medium"
                  />
                  <a
                    href={
                      store.coordinates
                        ? `https://www.google.com/maps?q=${store.coordinates.lat},${store.coordinates.lng}`
                        : `https://www.google.com/maps/search/${encodeURIComponent(store.mapsQuery)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 justify-center border border-ink text-ink py-3 text-sm font-medium flex items-center gap-2 hover:bg-ink/5 transition-colors"
                  >
                    Ver en el mapa →
                  </a>
                </div>
              </motion.div>
            </Reveal>
          )
        })}
      </div>

      {/* Link to full stores page */}
      <Reveal delay={0.15}>
        <div className="text-center mt-10">
          <Link
            to="/nuestras-tiendas"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-ink-soft hover:text-ink transition-colors border-b border-transparent hover:border-ink pb-1"
          >
            Ver mapas y más detalles →
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
