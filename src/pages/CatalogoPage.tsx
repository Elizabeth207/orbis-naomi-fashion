import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Style } from '../data/styles'
import { STYLES_ORBIS, STYLES_NAOMI } from '../data/styles'
import PageHeader from '../components/sections/PageHeader'
import FilterTabs from '../components/ui/FilterTabs'
import StyleMosaic from '../components/sections/StyleMosaic'
import StyleDetailModal from '../components/ui/StyleDetailModal'

function interleaveStyles(a: Style[], b: Style[]): Style[] {
  const result: Style[] = []
  const maxLength = Math.max(a.length, b.length)
  for (let i = 0; i < maxLength; i++) {
    if (a[i]) result.push(a[i])
    if (b[i]) result.push(b[i])
  }
  return result
}

export default function CatalogoPage() {
  const [filter, setFilter] = useState<'todo' | 'orbis' | 'naomi'>('todo')
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null)

  const filterOptions = [
    { value: 'todo', label: 'Todo' },
    { value: 'orbis', label: 'Orbis II' },
    { value: 'naomi', label: 'Novias Naomi' }
  ]

  const displayedStyles =
    filter === 'orbis'
      ? STYLES_ORBIS
      : filter === 'naomi'
      ? STYLES_NAOMI
      : interleaveStyles(STYLES_ORBIS, STYLES_NAOMI)

  return (
    <div className="px-4">
      <PageHeader
        eyebrow="Catálogo"
        title="Todas nuestras categorías"
        description="Explora las categorías de Orbis II y Novias Naomi en un solo lugar."
      />

      <div className="flex justify-center mb-12">
        <FilterTabs
          options={filterOptions}
          activeValue={filter}
          onChange={(value) => setFilter(value as 'todo' | 'orbis' | 'naomi')}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="max-w-6xl mx-auto pb-16"
        >
          <StyleMosaic styles={displayedStyles} onStyleClick={setSelectedStyle} />
        </motion.div>
      </AnimatePresence>

      <StyleDetailModal
        style={selectedStyle}
        onClose={() => setSelectedStyle(null)}
      />
    </div>
  )
}
