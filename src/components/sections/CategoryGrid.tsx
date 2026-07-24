import type { Category } from '../../data/categories'
import CategoryIcon from '../ui/CategoryIcon'
import Reveal from '../ui/Reveal'
import { motion } from "framer-motion";

interface CategoryGridProps {
  brand: 'orbis' | 'naomi'
  label: string
  categories: Category[]
  onCategoryClick: (category: Category) => void
}

export default function CategoryGrid({ brand, label, categories, onCategoryClick }: CategoryGridProps) {
  const isOrbis = brand === 'orbis'
  const brandColor = isOrbis ? 'text-orbis' : 'text-naomi'
  const brandDark = isOrbis ? 'text-orbis-dark' : 'text-naomi-dark'
  const dotColor = isOrbis ? 'bg-orbis' : 'bg-naomi'

  return (
    <section className="py-16 px-4">
      {/* Section label */}
      <Reveal>
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-2 h-2 rounded-full ${dotColor}`} />
          <span className="font-sans text-xs uppercase tracking-widest text-ink-soft">{label}</span>
          <div className="flex-1 h-px bg-line" />
        </div>
      </Reveal>

      {/* Grid */}
      <Reveal delay={0.15}>
        <div className="border border-line bg-line">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => onCategoryClick(category)}
                className="group bg-paper p-8 min-h-[220px] flex flex-col justify-between text-left cursor-pointer hover:shadow-lg"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
              {/* Top row */}
              <div className="flex justify-between items-start">
                <span className="font-sans text-xs text-ink-soft">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <CategoryIcon name={category.icon} className={`w-7 h-7 ${brandColor}`} />
              </div>

              {/* Content */}
              <div>
                <h3 className={`font-serif text-xl ${brandDark} mt-4 mb-2`}>{category.name}</h3>
                <p className="font-sans text-xs text-ink-soft">{category.subtitle}</p>
              </div>

              {/* View gallery link */}
              <span className={`font-sans text-xs font-medium ${brandColor} opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all`}>
                Ver galería →
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  )
}
