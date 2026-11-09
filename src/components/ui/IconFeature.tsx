import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface IconFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  brand?: "orbis" | "naomi" | "neutral";
}

const iconColorClass: Record<NonNullable<IconFeatureProps["brand"]>, string> = {
  orbis: "text-orbis",
  naomi: "text-naomi",
  neutral: "text-ink",
};

const hoverBorderClass: Record<NonNullable<IconFeatureProps["brand"]>, string> = {
  orbis: "group-hover:border-orbis",
  naomi: "group-hover:border-naomi",
  neutral: "group-hover:border-ink",
};

export default function IconFeature({
  icon: Icon,
  title,
  description,
  brand = "neutral",
}: IconFeatureProps) {
  return (
    <motion.div
      className="group flex flex-col items-center text-center px-4 py-6 md:px-5 md:py-8"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <div
        className={`w-14 h-14 rounded-full border border-line bg-paper flex items-center justify-center mb-4 transition-colors ${hoverBorderClass[brand]}`}
      >
        <Icon className={`w-6 h-6 ${iconColorClass[brand]}`} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <h3 className="font-serif text-lg text-ink mb-2">{title}</h3>
      <p className="text-sm text-ink-soft leading-relaxed">{description}</p>
    </motion.div>
  );
}
