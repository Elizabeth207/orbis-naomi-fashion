import { STORES } from '../data/stores'
import { WHATSAPP_NUMBER } from '../lib/constants'
import PageHeader from '../components/sections/PageHeader'
import StoreDetailCard from '../components/sections/StoreDetailCard'
import StoreGalleryStrip from '../components/sections/StoreGalleryStrip'
import WhatsAppButton from '../components/ui/WhatsAppButton'
import PhotoOrFallback from '../components/ui/PhotoOrFallback'
import Reveal from '../components/ui/Reveal'

const HEADER_IMAGE = '/images/tienda/imagen1.jpg'
const LOCAL_IMAGE: Record<'orbis' | 'naomi', string> = {
  orbis: '/images/tienda/orbislugar.jpg',
  naomi: '/images/tienda/naomilugar.jpg',
}

export default function TiendasPage() {
  return (
    <div className="px-4">
      <PageHeader
        eyebrow="Nuestras tiendas"
        title="Visítanos en Pichanaki"
        description="Dos tiendas, una atención cercana. Elige la que necesitas o visita ambas — están a un mismo techo de distancia."
      />

      {/* Editorial header image */}
      <Reveal>
        <div className="relative max-w-5xl mx-auto aspect-[16/7] md:aspect-[21/8] overflow-hidden mb-16">
          <PhotoOrFallback
            src={HEADER_IMAGE}
            brand="orbis"
            alt="Nuestras tiendas — Orbis II y Novias Naomi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-16 max-w-5xl mx-auto">
        {STORES.map((store, index) => (
          <Reveal key={store.id} delay={index * 0.1}>
            <div>
              <StoreDetailCard store={store} />
              <StoreGalleryStrip
                brand={store.brand}
                storeName={store.name}
                image={LOCAL_IMAGE[store.brand]}
              />
            </div>
          </Reveal>
        ))}
      </div>

      {/* Final CTA section */}
      <Reveal>
        <div className="border-t border-line pt-12 mt-4 mb-16 text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl text-ink mb-3">
            ¿No sabes cuál visitar primero?
          </h2>
          <p className="font-sans text-sm text-ink-soft mb-6 leading-relaxed">
            Escríbenos por WhatsApp y te ayudamos a elegir según lo que buscas.
          </p>
          <WhatsAppButton
            phone={WHATSAPP_NUMBER}
            className="mx-auto bg-ink text-paper px-7 py-3.5 text-sm font-medium justify-center w-fit"
          />
        </div>
      </Reveal>
    </div>
  )
}
