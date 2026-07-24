import Reveal from "../ui/Reveal";

export default function Intro() {
  return (
    <section className="max-w-3xl mx-auto text-center py-16 md:py-24 px-4">
      <Reveal>
        <h2 className="font-serif text-3xl text-ink mb-6">
          Vístete para cada capítulo de tu historia
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="font-sans text-base text-ink-soft leading-relaxed">
          Desde el look casual de todos los días hasta el vestido que llevarás en la noche más especial, ORBIS II y NOVIAS NAOMI te acompañan con prendas pensadas para cada momento, cada edad y cada estilo.
        </p>
      </Reveal>
    </section>
  )
}
