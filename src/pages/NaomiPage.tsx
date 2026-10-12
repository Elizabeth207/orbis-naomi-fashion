import { useState } from 'react'
import type { Style } from '../data/styles'
import { STYLES_NAOMI } from '../data/styles'
import BrandHero from '../components/sections/BrandHero'
import BrandStory from '../components/sections/BrandStory'
import NaomiOfferings from '../components/sections/NaomiOfferings'
import StyleGrid from '../components/sections/StyleGrid'
import NaomiGallerySection from '../components/sections/NaomiGallerySection'
import NaomiVideoShowcase from '../components/sections/NaomiVideoShowcase'
import NaomiKidsSection from '../components/sections/NaomiKidsSection'
import StyleDetailModal from '../components/ui/StyleDetailModal'

const NAOMI_VIDEOS = [
  '/video/nahomi1.mp4',
  '/video/nahomi2.mp4',
  '/video/naomi3.mp4'
]

const NAOMI_KIDS_IMAGES = [
  '/images/naomi/niños/img 1.jpg',
  '/images/naomi/niños/niña9.jpg',
  '/images/naomi/niños/niña10.jpg',
  '/images/naomi/niños/niña11.jpg',
  '/images/naomi/niños/niña12.jpg',
  '/images/naomi/niños/niña13.jpg',
  '/images/naomi/niños/niña14.jpg'
]

export default function NaomiPage() {
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null)

  return (
    <>
      <BrandHero
        brand="naomi"
        eyebrow="Moda de gala"
        title="Novias Naomi"
        description="Venta y alquiler de vestidos y prendas de gala para niñas, jóvenes y adultas, desde los 8 años. Cada ocasión merece un vestido a su altura."
        imageSrc="/images/naomi/hero.jpg"
      />
      <NaomiOfferings />
      <NaomiVideoShowcase videos={NAOMI_VIDEOS} />
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
      <NaomiKidsSection images={NAOMI_KIDS_IMAGES} />
      <NaomiGallerySection />
      <StyleDetailModal
        style={selectedStyle}
        onClose={() => setSelectedStyle(null)}
      />
    </>
  )
}
