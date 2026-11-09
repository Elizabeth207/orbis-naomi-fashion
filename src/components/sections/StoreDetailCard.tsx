import { Clock, MapPin, Navigation } from "lucide-react";
import type { Store } from "../../data/stores";
import { WHATSAPP_NUMBER } from "../../lib/constants";
import WhatsAppButton from "../ui/WhatsAppButton";

interface StoreDetailCardProps {
  store: Store;
}

export default function StoreDetailCard({ store }: StoreDetailCardProps) {
  const isOrbis = store.brand === "orbis";
  const accentBorder = isOrbis ? "border-orbis" : "border-naomi";
  const badgeBg = isOrbis ? "bg-orbis-tint" : "bg-naomi-tint";
  const badgeText = isOrbis ? "text-orbis-dark" : "text-naomi-dark";
  const tintBg = isOrbis ? "bg-orbis-tint/35" : "bg-naomi-tint/40";

  const whatsappPhone =
    store.whatsapp === "Por confirmar con el cliente" ? WHATSAPP_NUMBER : store.whatsapp;

  const mapsHref = store.coordinates
    ? `https://www.google.com/maps?q=${store.coordinates.lat},${store.coordinates.lng}`
    : `https://www.google.com/maps/search/${encodeURIComponent(store.mapsQuery)}`;

  return (
    <div
      className={`rounded-xl border border-line border-t-4 ${accentBorder} bg-paper overflow-hidden shadow-[0_12px_40px_rgba(34,31,28,0.08)] ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(34,31,28,0.12)]`}
    >
      <div className={`h-1 w-full ${isOrbis ? "bg-orbis/80" : "bg-naomi/80"}`} aria-hidden="true" />

      <div className="p-8 md:p-9">
        <div
          className={`${badgeBg} ${badgeText} text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 font-semibold`}
        >
          {store.name}
        </div>

        <h3 className="font-serif text-3xl text-ink mb-2 tracking-tight">{store.name}</h3>
        <p className="font-serif-italic text-sm text-ink-soft mb-5 leading-relaxed">{store.slogan}</p>

        <div className="w-12 h-px bg-line mb-6" />

        <div className="flex items-start gap-3 mb-6 p-4 rounded-lg border border-line/80 bg-ink/[0.02]">
          <span
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${tintBg} ${
              isOrbis ? "text-orbis-dark" : "text-naomi-dark"
            }`}
          >
            <MapPin className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="font-sans text-sm text-ink-soft leading-relaxed pt-1">{store.address}</span>
        </div>

        <div className="mb-7">
          <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-ink-soft font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
            Horario de atención
          </p>
          <div className={`rounded-lg border border-line/80 overflow-hidden ${tintBg}`}>
            {store.hoursDetail.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between gap-4 px-4 py-2.5 text-sm bg-paper/60 ${
                  index < store.hoursDetail.length - 1 ? "border-b border-line/70" : ""
                }`}
              >
                <span className="text-ink font-medium">{item.day}</span>
                <span className="text-ink-soft text-right">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 flex-col sm:flex-row">
          <WhatsAppButton
            phone={whatsappPhone}
            className="flex-1 justify-center bg-ink text-paper py-3.5 text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
          />
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 justify-center border border-ink text-ink py-3.5 text-sm font-medium flex items-center gap-2 hover:bg-ink hover:text-paper transition-colors duration-300"
          >
            <Navigation className="w-4 h-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            Ver en el mapa
          </a>
        </div>
      </div>

      <div className="h-52 md:h-56 border-t border-line relative">
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
          />
        ) : (
          <div className="h-full bg-ink/5 flex flex-col items-center justify-center px-6 text-center">
            <MapPin className="w-6 h-6 text-ink-soft mb-2" aria-hidden="true" />
            <span className="font-sans text-xs text-ink-soft uppercase tracking-wide mb-1">
              Mapa — Google Maps
            </span>
            <span className="font-sans text-[10px] text-ink-soft opacity-80">{store.mapsQuery}</span>
          </div>
        )}
      </div>
    </div>
  );
}
