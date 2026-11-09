import Reveal from '../ui/Reveal'
import {
  NAOMI_MODALITY,
  NAOMI_OCCASIONS,
  NAOMI_AUDIENCES,
  NAOMI_EXTRAS,
} from '../../data/naomiOfferings'

export default function NaomiOfferings() {
  return (
    <section className="max-w-4xl mx-auto px-3 sm:px-4 py-16 md:py-20 w-full min-w-0">
      <Reveal>
        <div className="text-center">
          <span className="inline-block bg-naomi text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm uppercase tracking-widest font-semibold max-w-full text-center">
            {NAOMI_MODALITY}
          </span>
          <h2 className="font-serif text-3xl text-ink mt-6">Nuestra oferta</h2>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-10 w-full min-w-0">
          {NAOMI_OCCASIONS.map((occasion) => (
            <div
              key={occasion}
              className="border border-line bg-paper px-2 py-3 sm:px-5 sm:py-4 rounded-sm text-center font-serif text-xs sm:text-base text-naomi-dark hover:border-naomi transition-colors min-w-0 break-words leading-snug"
            >
              {occasion}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 justify-items-center sm:flex sm:flex-wrap sm:justify-center sm:gap-6 mt-10 w-full max-w-full px-1">
          {NAOMI_AUDIENCES.map((audience) => (
            <span
              key={audience}
              className="text-xs sm:text-sm uppercase tracking-wide font-medium text-center whitespace-normal"
            >
              <span className="text-naomi">→ </span>
              <span className="text-ink-soft">{audience}</span>
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="border-t border-line pt-6 mt-6 text-center text-xs sm:text-sm text-ink-soft px-1 leading-relaxed max-w-full">
          <p className="sm:hidden space-y-1">
            {NAOMI_EXTRAS.map((extra) => (
              <span key={extra} className="block">
                {extra}
              </span>
            ))}
          </p>
          <p className="hidden sm:block break-words">{NAOMI_EXTRAS.join(' · ')}</p>
        </div>
      </Reveal>
    </section>
  )
}
