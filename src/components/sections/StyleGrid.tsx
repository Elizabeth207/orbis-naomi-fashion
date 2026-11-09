import { motion, useReducedMotion } from "framer-motion";
import type { Style } from "../../data/styles";
import StyleCard from "../ui/StyleCard";
import Reveal from "../ui/Reveal";

interface StyleGridProps {
  brand: "orbis" | "naomi";
  label: string;
  styles: Style[];
  onStyleClick: (style: Style) => void;
}

export default function StyleGrid({ brand, label, styles, onStyleClick }: StyleGridProps) {
  const isOrbis = brand === "orbis";
  const dotColor = isOrbis ? "bg-orbis" : "bg-naomi";
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-16 px-4">
      <Reveal>
        <div className="flex items-center gap-4 mb-8 max-w-6xl mx-auto">
          <div className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
          <span className="font-sans text-xs uppercase tracking-widest text-ink-soft">{label}</span>
          {isOrbis ? (
            <motion.div
              className="flex-1 h-px origin-left bg-line"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: "easeOut" }}
            />
          ) : (
            <div className="flex-1 h-px bg-line" />
          )}
        </div>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
        {styles.map((style, index) => (
          <Reveal key={style.id} delay={index * 0.06}>
            <StyleCard style={style} onClick={() => onStyleClick(style)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
