import { useState } from "react";
import { GALLERY_PHOTOS } from "../data/gallery";
import PageHeader from "../components/sections/PageHeader";
import GalleryPhotoFrame from "../components/ui/GalleryPhotoFrame";
import GalleryLightbox from "../components/ui/GalleryLightbox";

export default function GaleriaPage() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const orbisPhotos = GALLERY_PHOTOS.filter((p) => p.brand === "orbis");
  const naomiPhotos = GALLERY_PHOTOS.filter((p) => p.brand === "naomi");
  const activePhoto = activePhotoIndex !== null ? GALLERY_PHOTOS[activePhotoIndex] : null;

  const handlePrev = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev === 0 ? GALLERY_PHOTOS.length - 1 : (prev as number) - 1
    );
  };

  const handleNext = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev === GALLERY_PHOTOS.length - 1 ? 0 : (prev as number) + 1
    );
  };

  return (
    <div className="px-4">
      <PageHeader
        eyebrow="Galería"
        title="Momentos que vestimos"
        description="Un vistazo a nuestras tiendas, nuestras prendas y las personas que confían en nosotros."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto mb-14">
        {/* Left column: Orbis II */}
        <div className="flex flex-col gap-4">
          <GalleryPhotoFrame
            photo={orbisPhotos[0]}
            size="tall"
            onClick={() => setActivePhotoIndex(GALLERY_PHOTOS.indexOf(orbisPhotos[0]))}
          />
          <GalleryPhotoFrame
            photo={orbisPhotos[1]}
            size="short"
            onClick={() => setActivePhotoIndex(GALLERY_PHOTOS.indexOf(orbisPhotos[1]))}
          />
        </div>

        {/* Right column: Novias Naomi */}
        <div className="flex flex-col gap-4">
          <GalleryPhotoFrame
            photo={naomiPhotos[0]}
            size="short"
            onClick={() => setActivePhotoIndex(GALLERY_PHOTOS.indexOf(naomiPhotos[0]))}
          />
          <GalleryPhotoFrame
            photo={naomiPhotos[1]}
            size="tall"
            onClick={() => setActivePhotoIndex(GALLERY_PHOTOS.indexOf(naomiPhotos[1]))}
          />
        </div>
      </div>

      {/* Closing section */}
      <div className="border-t border-line pt-10 mt-14 text-center max-w-2xl mx-auto">
        <h3 className="font-serif text-lg text-ink mb-2">¿Quieres ver más?</h3>
        <p className="font-sans text-sm text-ink-soft">
          Visítanos en tienda o síguenos en redes sociales para más contenido.
        </p>
      </div>

      <GalleryLightbox
        photo={activePhoto}
        onClose={() => setActivePhotoIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
