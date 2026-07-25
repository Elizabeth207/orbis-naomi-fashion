import Reveal from '../ui/Reveal'
import {
  NAOMI_MODALITY,
  NAOMI_OCCASIONS,
  NAOMI_AUDIENCES,
  NAOMI_EXTRAS,
} from '../../data/naomiOfferings'

export default function NaomiOfferings() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 md:py-20">
      <Reveal>
        <div className="text-center">
          <span className="inline-block bg-naomi text-white px-6 py-2 rounded-full text-sm uppercase tracking-widest font-semibold">
            {NAOMI_MODALITY}
          </span>
          <h2 className="font-serif text-3xl text-ink mt-6">Nuestra oferta</h2>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mt-10">
          {NAOMI_OCCASIONS.map((occasion) => (
            <div
              key={occasion}
              className="border border-line bg-paper px-5 py-4 rounded-sm text-center font-serif text-base text-naomi-dark hover:border-naomi transition-colors"
            >
              {occasion}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {NAOMI_AUDIENCES.map((audience) => (
            <span
              key={audience}
              className="text-sm uppercase tracking-wide font-medium"
            >
              <span className="text-naomi">→ </span>
              <span className="text-ink-soft">{audience}</span>
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="border-t border-line pt-6 mt-6 text-center text-sm text-ink-soft">
          {NAOMI_EXTRAS.join(' · ')}
        </div>
      </Reveal>
    </section>
  )
}
