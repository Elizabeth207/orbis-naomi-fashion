import { useState } from 'react'
import type { Style } from '../data/styles'
import { STYLES_ORBIS, STYLES_NAOMI } from '../data/styles'
import { PROMOTIONS } from '../data/promotions'
import Hero from '../components/sections/Hero'
import Intro from '../components/sections/Intro'
import CollectionFeature from '../components/sections/CollectionFeature'
import FramedPromo from '../components/sections/FramedPromo'
import StyleDetailModal from '../components/ui/StyleDetailModal'
import StoresSection from '../components/sections/StoresSection'
import WhatsAppCTA from '../components/sections/WhatsAppCTA'

export default function HomePage() {
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null)

  return (
    <>
      <Hero />
      <Intro />

      <div className="px-4 md:px-8 max-w-6xl mx-auto flex flex-col gap-6 mb-16">
        <CollectionFeature
          brand="orbis"
          eyebrow="Ver nuestra"
          title="Colección Orbis II"
          description="Prendas casuales para el día a día, pensadas para damas y caballeros que buscan comodidad sin perder estilo. Venta de ropa para damas, caballeros y niños."
          buttonLabel="Ver lookbook →"
          buttonTo="/orbis-ii"
          photo={STYLES_ORBIS[0]}
          photoSrc="/images/incio/orbis.jpg"
        />
        <CollectionFeature
          brand="naomi"
          eyebrow="Ver nuestra"
          title="Colección Naomi"
          description="Venta y alquiler de vestidos de novia, gala, quinceañera y fiesta, para damas, caballeros y niños — con calzado y accesorios para completar cada look."
          buttonLabel="Ver lookbook →"
          buttonTo="/novias-naomi"
          photo={STYLES_NAOMI[0]}
          photoSrc="/images/incio/naomi.jpg"
          reverse
        />
      </div>

      <FramedPromo
        promotion={PROMOTIONS[0]}
        headerPhoto={STYLES_NAOMI[1]}
        photoLeft={STYLES_NAOMI[0]}
        photoRight={STYLES_NAOMI[5]}
        onPhotoClick={setSelectedStyle}
      />

      <StoresSection />
      <WhatsAppCTA />

      <StyleDetailModal
        style={selectedStyle}
        onClose={() => setSelectedStyle(null)}
      />
    </>
  )
}
