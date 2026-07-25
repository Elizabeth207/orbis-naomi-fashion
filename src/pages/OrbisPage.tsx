import { useState } from 'react'
import type { Style } from '../data/styles'
import { STYLES_ORBIS } from '../data/styles'
import BrandHero from '../components/sections/BrandHero'
import BrandStory from '../components/sections/BrandStory'
import StyleGrid from '../components/sections/StyleGrid'
import StyleDetailModal from '../components/ui/StyleDetailModal'

export default function OrbisPage() {
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null)

  return (
    <>
      <BrandHero
        brand="orbis"
        eyebrow="Moda casual"
        title="Orbis II"
        description="Venta de ropa casual para damas, caballeros y niños. Prendas del día a día con estilo urbano y buena calidad, para toda ocasión."
        imageSrc="/images/orbis/hero.jpg"
      />
      <BrandStory
        title="Sobre Orbis II"
        paragraphs={[
          "Orbis II nace para vestir el día a día de Pichanaki con ventas de prendas casuales de calidad, pensadas para damas, caballeros y niños.",
          "Aquí encontrarás desde básicos de uso diario hasta piezas de abrigo para el clima de la sierra, siempre con buena caída y precios justos."
        ]}
      />
      <StyleGrid
        brand="orbis"
        label="Orbis II — Estilos destacados"
        styles={STYLES_ORBIS}
        onStyleClick={setSelectedStyle}
      />
      <StyleDetailModal
        style={selectedStyle}
        onClose={() => setSelectedStyle(null)}
      />
    </>
  )
}
