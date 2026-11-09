import { useEffect, useRef, useState } from "react";
import ImageBackground from "../ui/ImageBackground";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface BrandHeroProps {
  brand: "orbis" | "naomi";
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  /** Parallax sutil en scroll (solo recomendado en Orbis II, desktop) */
  enableParallax?: boolean;
}

export default function BrandHero({
  brand,
  eyebrow,
  title,
  description,
  imageSrc,
  enableParallax = false,
}: BrandHeroProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const parallaxOn = enableParallax && !reduceMotion && !isMobile;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const xDirection = brand === "orbis" ? -20 : 20;
  const textEase = reduceMotion ? { duration: 0 } : { duration: 0.55, ease: "easeOut" as const };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center px-4 py-10 sm:p-10 md:p-14 text-white min-h-[50vh] w-full"
    >
      <motion.div
        className="absolute inset-0 -z-20"
        style={parallaxOn ? { y: imageY } : undefined}
      >
        <ImageBackground brand={brand} imageSrc={imageSrc} className="scale-110" />
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />

      <div className="relative z-10 max-w-md">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, x: xDirection }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...textEase, delay: reduceMotion ? 0 : 0 }}
          className="text-xs uppercase tracking-widest opacity-90 mb-3 font-medium"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, x: xDirection }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...textEase, delay: reduceMotion ? 0 : 0.08 }}
          className="font-serif text-4xl leading-none mb-4 drop-shadow-md"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, x: xDirection }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...textEase, delay: reduceMotion ? 0 : 0.16 }}
          className="text-sm opacity-90 leading-relaxed drop-shadow"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
