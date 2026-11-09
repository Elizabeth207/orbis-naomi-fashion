import { useCallback, useMemo, useState } from "react";
import Reveal from "../ui/Reveal";
import FilterTabs from "../ui/FilterTabs";
import GalleryPhotoFrame from "../ui/GalleryPhotoFrame";
import GalleryLightbox from "../ui/GalleryLightbox";
import {
  NAOMI_GALLERY_PHOTOS,
  NAOMI_GALLERY_LABELS,
  type NaomiGalleryCategory,
} from "../../data/naomiGallery";

const CATEGORY_ORDER: NaomiGalleryCategory[] = ["novias", "quinceaneras", "caballeros", "ninos"];

const FILTER_OPTIONS = CATEGORY_ORDER.map((value) => ({
  value,
  label: NAOMI_GALLERY_LABELS[value],
}));

export default function NaomiGallerySection() {
  const [activeCategory, setActiveCategory] = useState<NaomiGalleryCategory>("novias");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categoryPhotos = useMemo(
    () => NAOMI_GALLERY_PHOTOS.filter((photo) => photo.category === activeCategory),
    [activeCategory]
  );

  const lightboxIndex = useMemo(() => {
    if (activePhotoIndex === null || categoryPhotos.length === 0) return null;
    if (activePhotoIndex < 0 || activePhotoIndex >= categoryPhotos.length) return null;
    return activePhotoIndex;
  }, [activePhotoIndex, categoryPhotos.length]);

  const handleCategoryChange = useCallback((value: string) => {
    setActiveCategory(value as NaomiGalleryCategory);
    setActivePhotoIndex(null);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  const handleSelectIndex = useCallback((index: number) => {
    setActivePhotoIndex(index);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-20">
      <Reveal>
        <div className="text-center mb-10">
          <p className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-naomi-dark mb-3">
            Nuestros vestidos
          </p>
          <h2 className="font-serif text-3xl text-ink mb-3">Elegancia en cada detalle</h2>
          <p className="font-sans text-sm text-ink-soft max-w-md mx-auto">
            Descubre nuestros vestidos y looks, por categoría.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="w-full max-w-full min-w-0 mb-8 px-0 sm:px-2">
          <FilterTabs
            options={FILTER_OPTIONS}
            activeValue={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>
      </Reveal>

      {categoryPhotos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categoryPhotos.map((photo, index) => (
            <Reveal key={photo.id} delay={Math.min(index * 0.05, 0.3)}>
              <GalleryPhotoFrame
                photo={photo}
                size="tall"
                onClick={() => setActivePhotoIndex(index)}
              />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-ink-soft py-10">
          Pronto subiremos fotos de esta categoría.
        </p>
      )}

      <GalleryLightbox
        items={categoryPhotos}
        activeIndex={lightboxIndex}
        onClose={handleCloseLightbox}
        onSelectIndex={handleSelectIndex}
      />
    </section>
  );
}
