import { Baby, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import BlurFillImage from "../ui/BlurFillImage";

type FamilyCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  imageSrc: string;
};

const CARDS: FamilyCard[] = [
  {
    icon: User,
    title: "Damas",
    description: "Prendas casuales con buena caída para el día a día.",
    imageSrc: "/images/orbis/familia/damas.jpg",
  },
  {
    icon: User,
    title: "Caballeros",
    description: "Ropa urbana y cómoda, pensada para moverte con estilo.",
    imageSrc: "/images/orbis/familia/caballeros.jpg",
  },
  {
    icon: Baby,
    title: "Niños",
    description: "Opciones prácticas y versátiles para los más pequeños.",
    imageSrc: "/images/orbis/familia/ninos.jpg",
  },
];

export default function OrbisFamilySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-20">
      <Reveal>
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-serif text-3xl text-ink mb-3">Para toda la familia</h2>
          <p className="text-sm text-ink-soft mb-5">Ropa casual para cada integrante</p>
          <motion.div
            className="mx-auto h-px max-w-xs origin-center bg-orbis"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: "easeOut" }}
          />
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CARDS.map((card, index) => {
          const Icon = card.icon;
          return (
            <Reveal key={card.title} delay={index * 0.08}>
              <motion.article
                className="group relative w-full aspect-[3/4] min-h-[420px] overflow-hidden isolate rounded-sm"
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.35 }}
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <BlurFillImage
                    src={card.imageSrc}
                    brand="orbis"
                    alt={card.title}
                    className="w-full h-full transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  />
                </div>
                <div
                  className="absolute inset-0 z-10 bg-gradient-to-t from-black/65 via-black/20 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <span
                  className="absolute bottom-0 left-0 right-0 z-[15] h-0.5 origin-left scale-x-0 bg-orbis transition-transform duration-500 ease-out group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/15 border border-white/40 flex items-center justify-center mb-4 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:bg-white/25 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]">
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">{card.title}</h3>
                  <p className="text-sm text-white/90 leading-relaxed">{card.description}</p>
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
