import { useCallback, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import BlurFillImage from "../ui/BlurFillImage";
import GalleryLightbox from "../ui/GalleryLightbox";
import type { LightboxPhoto } from "../../types/lightbox";
import { NAOMI_GALLERY_LABELS } from "../../data/naomiGallery";

interface NaomiKidsSectionProps {
  images: string[];
}

export default function NaomiKidsSection({ images }: NaomiKidsSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const handleCloseLightbox = useCallback(() => setActiveIndex(null), []);
  const handleSelectIndex = useCallback((index: number) => setActiveIndex(index), []);

  const items: LightboxPhoto[] = useMemo(
    () =>
      images.map((src, index) => ({
        id: `naomi-kids-${index}`,
        brand: "naomi",
        src,
        caption: `${NAOMI_GALLERY_LABELS.ninos} — Look ${index + 1}`,
        category: "ninos",
      })),
    [images]
  );

  return (
    <section className="py-16 px-4 bg-ink/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="font-sans text-xs uppercase tracking-widest text-ink-soft font-semibold mb-4">
              Colección infantil
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">
              Vestidos y trajes para niños
            </h2>
            <p className="font-sans text-sm text-ink-soft max-w-2xl mx-auto">
              Vestidos para niñas y trajes para niño, ideales para celebraciones, primeras comuniones y
              eventos en familia. Te ayudamos a encontrar el look perfecto para los más pequeños.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="flex flex-wrap justify-center gap-4 list-none p-0 m-0">
            {images.map((image, index) => (
              <li key={image} className="w-[calc(50%-0.5rem)] sm:w-56 md:w-60">
                <motion.button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group relative w-full aspect-[3/4] rounded-lg overflow-hidden text-left shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-naomi"
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlurFillImage
                    src={image}
                    brand="naomi"
                    alt={`Look infantil ${index + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-white text-sm font-medium opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Ver detalle
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </motion.button>
              </li>
            ))}
          </ul>
        </Reveal>

        <GalleryLightbox
          items={items}
          activeIndex={activeIndex}
          onClose={handleCloseLightbox}
          onSelectIndex={handleSelectIndex}
        />
      </div>
    </section>
  );
}
