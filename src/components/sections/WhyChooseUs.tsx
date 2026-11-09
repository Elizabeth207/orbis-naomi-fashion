import { CalendarCheck, MapPin, MessageCircle, Shirt } from "lucide-react";
import Reveal from "../ui/Reveal";
import IconFeature from "../ui/IconFeature";

const FEATURES = [
  {
    icon: MessageCircle,
    title: "Atención por WhatsApp",
    description: "Escríbenos y te ayudamos a elegir lo que buscas.",
  },
  {
    icon: Shirt,
    title: "Moda para toda la familia",
    description: "Damas, caballeros y niños.",
  },
  {
    icon: CalendarCheck,
    title: "Venta y alquiler",
    description: "En Novias Naomi puedes comprar o alquilar tu vestido.",
  },
  {
    icon: MapPin,
    title: "Dos tiendas en Pichanaki",
    description: "Orbis II y Novias Naomi te esperan.",
  },
] as const;

export default function WhyChooseUs() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-20">
      <Reveal>
        <div className="text-center mb-10 md:mb-12">
          <p className="font-sans text-xs uppercase tracking-widest text-ink-soft font-semibold mb-3">
            Por qué elegirnos
          </p>
          <h2 className="font-serif text-3xl text-ink">Todo para tu look, en un solo lugar</h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 border border-line divide-x divide-y lg:divide-y-0 divide-line rounded-sm overflow-hidden bg-paper">
        {FEATURES.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 0.08}>
            <IconFeature
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              brand="neutral"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
