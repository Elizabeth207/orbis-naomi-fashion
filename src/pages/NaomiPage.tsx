import { useState } from 'react'
import type { Style } from '../data/styles'
import { STYLES_NAOMI } from '../data/styles'
import BrandHero from '../components/sections/BrandHero'
import BrandStory from '../components/sections/BrandStory'
import StyleGrid from '../components/sections/StyleGrid'
import StyleDetailModal from '../components/ui/StyleDetailModal'

export default function NaomiPage() {
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null)

  return (
    <>
      <BrandHero
        brand="naomi"
        eyebrow="Moda de gala"
        title="Novias Naomi"
        description="Vestidos y prendas de gala para cada ocasión especial, desde los 8 años."
        imageSrc="/images/naomi/hero.jpg"
      />
      <BrandStory
        title="Sobre Novias Naomi"
        paragraphs={[
          "Novias Naomi acompaña los momentos más especiales: bodas, quince años, primeras comuniones y fiestas de gala, para niñas, jóvenes y adultas desde los 8 años.",
          "Cada vestido se elige y prueba en tienda, con atención personalizada para encontrar el diseño ideal para tu ocasión."
        ]}
      />
      <StyleGrid
        brand="naomi"
        label="Novias Naomi — Estilos destacados"
        styles={STYLES_NAOMI}
        onStyleClick={setSelectedStyle}
      />
      <StyleDetailModal
        style={selectedStyle}
        onClose={() => setSelectedStyle(null)}
      />
    </>
  )
}
