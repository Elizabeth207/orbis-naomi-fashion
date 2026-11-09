import { Sparkles } from "lucide-react";
import { useReducedMotion } from "framer-motion";

const WORDS = ["Casual", "Urbano", "Elegante", "Calidad"] as const;

export default function OrbisMarquee() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-label="Palabras clave de Orbis II" className="border-y border-line bg-orbis-tint/40 overflow-hidden">
      <div
        className={`orbis-marquee-track flex items-center gap-8 py-3 ${
          reduceMotion ? "" : "orbis-marquee-animate hover:[animation-play-state:paused]"
        }`}
      >
        {[...WORDS, ...WORDS].map((word, index) => (
          <span key={`${word}-${index}`} className="flex items-center gap-8 shrink-0">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-orbis-dark font-semibold">
              {word}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-orbis" strokeWidth={1.5} aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  );
}
