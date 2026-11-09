import { CalendarCheck, MessageCircle, Search, Shirt } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "../ui/Reveal";
import WhatsAppButton from "../ui/WhatsAppButton";
import { WHATSAPP_NUMBER } from "../../lib/constants";

// TODO: confirmar con la clienta los pasos reales (anticipo, días de alquiler, devolución) antes de detallarlos.

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    icon: Search,
    title: "Elige tu estilo",
    description: "Explora la colección y encuentra el vestido que encaja con tu ocasión.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Escríbenos o visítanos",
    description: "Cuéntanos qué buscas por WhatsApp o pásate por nuestra tienda en Pichanaki.",
  },
  {
    number: "03",
    icon: Shirt,
    title: "Pruébatelo",
    description: "Agenda tu prueba para ver caída, talla y acabados con asesoría personalizada.",
  },
  {
    number: "04",
    icon: CalendarCheck,
    title: "Llévalo o resérvalo",
    description: "Define si compras o alquilas y coordina la fecha de tu evento con nosotras.",
  },
];

export default function NaomiHowItWorks() {
  return (
    <section className="max-w-5xl mx-auto px-3 sm:px-4 py-16 md:py-20 w-full min-w-0">
      <Reveal>
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl text-ink mb-3">Cómo conseguir tu vestido</h2>
          <p className="text-sm text-ink-soft max-w-lg mx-auto">
            Un proceso sencillo, de la inspiración al gran día.
          </p>
        </div>
      </Reveal>

      <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-6">
        <div
          className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-px bg-line pointer-events-none"
          aria-hidden="true"
        />

        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.number} delay={index * 0.08}>
              <div className="relative flex flex-col items-center text-center px-2">
                <p className="font-sans text-xs font-semibold tracking-widest text-naomi/60 mb-3">
                  {step.number}
                </p>
                <div className="relative z-10 w-14 h-14 rounded-full border border-line bg-paper flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-naomi" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="font-serif text-lg text-ink mb-2">{step.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{step.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.35}>
        <div className="flex justify-center mt-12">
          <WhatsAppButton
            phone={WHATSAPP_NUMBER}
            label="Consultar por WhatsApp"
            className="inline-flex items-center justify-center gap-2 bg-naomi text-white px-6 py-3 text-sm font-medium hover:bg-naomi-dark transition-colors"
          />
        </div>
      </Reveal>
    </section>
  );
}
