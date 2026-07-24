import PhotoOrFallback from "../ui/PhotoOrFallback";

interface StoreGalleryStripProps {
  brand: 'orbis' | 'naomi';
  storeName: string;
  image: string;
}

export default function StoreGalleryStrip({ brand, storeName, image }: StoreGalleryStripProps) {
  return (
    <div className="mt-5">
      <p className="font-sans text-xs uppercase tracking-widest text-ink-soft font-semibold mb-3">
        Conoce nuestro local
      </p>
      <div className="relative aspect-[16/9] overflow-hidden group">
        <PhotoOrFallback
          src={image}
          brand={brand}
          alt={`Interior de ${storeName}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>
    </div>
  )
}
