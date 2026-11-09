import PhotoOrFallback from "../ui/PhotoOrFallback";

interface StoreGalleryStripProps {
  brand: 'orbis' | 'naomi';
  storeName: string;
  image: string;
}

export default function StoreGalleryStrip({ brand, storeName, image }: StoreGalleryStripProps) {
  return (
    <div className="mt-6">
      <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-soft font-semibold mb-3">
        Conoce nuestro local
      </p>
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-line shadow-[0_8px_28px_rgba(34,31,28,0.1)] group ring-1 ring-ink/5">
        <PhotoOrFallback
          src={image}
          brand={brand}
          alt={`Fachada de ${storeName}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <p className="absolute bottom-3 left-4 font-sans text-[10px] uppercase tracking-[0.14em] text-white/95 font-semibold [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">
          {storeName}
        </p>
      </div>
    </div>
  )
}
