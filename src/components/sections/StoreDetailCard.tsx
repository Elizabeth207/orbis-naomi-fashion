import type { Store } from '../../data/stores'
import { WHATSAPP_NUMBER } from '../../lib/constants'
import WhatsAppButton from '../ui/WhatsAppButton'

interface StoreDetailCardProps {
  store: Store;
}

export default function StoreDetailCard({ store }: StoreDetailCardProps) {
  const isOrbis = store.brand === 'orbis'
  const accentBorder = isOrbis ? 'border-orbis' : 'border-naomi'
  const badgeBg = isOrbis ? 'bg-orbis-tint' : 'bg-naomi-tint'
  const badgeText = isOrbis ? 'text-orbis-dark' : 'text-naomi-dark'

  const whatsappPhone = store.whatsapp === "Por confirmar con el cliente" ? WHATSAPP_NUMBER : store.whatsapp

  return (
    <div className={`border border-line border-t-4 ${accentBorder} bg-paper overflow-hidden shadow-sm`}>
      {/* Body */}
      <div className="p-8 md:p-9">
        {/* Badge */}
        <div className={`${badgeBg} ${badgeText} text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm inline-block mb-4`}>
          {store.name}
        </div>

        {/* Name */}
        <h3 className="font-serif text-3xl text-ink mb-2">{store.name}</h3>

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
        <div className="mb-6">
          <p className="font-sans text-xs uppercase tracking-wide text-ink-soft font-semibold mb-3">
            Horario de atención
          </p>
          <div className="space-y-0">
            {store.hoursDetail.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between py-2 text-sm ${
                  index < store.hoursDetail.length - 1 ? 'border-b border-line' : ''
                }`}
              >
                <span className="text-ink">{item.day}</span>
                <span className="text-ink-soft">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 flex-col sm:flex-row">
          <WhatsAppButton
            phone={whatsappPhone}
            className="flex-1 justify-center bg-ink text-paper py-3 text-sm font-medium"
          />
          <a
            href={store.coordinates ? `https://www.google.com/maps?q=${store.coordinates.lat},${store.coordinates.lng}` : `https://www.google.com/maps/search/${encodeURIComponent(store.mapsQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 justify-center border border-ink text-ink py-3 text-sm font-medium flex items-center gap-2 hover:bg-ink/5 transition-colors"
          >
            Ver en el mapa →
          </a>
        </div>
      </div>

      {/* Map iframe */}
      <div className="h-48 border-t border-line">
        {store.coordinates ? (
          <iframe
            title={`Mapa de ${store.name}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${store.coordinates.lat},${store.coordinates.lng}&output=embed`}
          ></iframe>
        ) : (
          <div className="h-full bg-ink/5 flex flex-col items-center justify-center">
            <span className="font-sans text-xs text-ink-soft uppercase tracking-wide mb-1">
              Mapa — Google Maps
            </span>
            <span className="font-sans text-[10px] text-ink-soft opacity-70">
              {store.mapsQuery}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
