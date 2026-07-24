import type { Style } from "../../data/styles";
import StyleCard from "../ui/StyleCard";
import Reveal from "../ui/Reveal";

interface StyleGridProps {
  brand: "orbis" | "naomi";
  label: string;
  styles: Style[];
  onStyleClick: (style: Style) => void;
}

export default function StyleGrid({ brand, label, styles, onStyleClick }: StyleGridProps) {
  const isOrbis = brand === "orbis";
  const dotColor = isOrbis ? "bg-orbis" : "bg-naomi";

  return (
    <section className="py-16 px-4">
      {/* Section label */}
      <Reveal>
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-2 h-2 rounded-full ${dotColor}`} />
          <span className="font-sans text-xs uppercase tracking-widest text-ink-soft">{label}</span>
          <div className="flex-1 h-px bg-line" />
        </div>
      </Reveal>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {styles.map((style, index) => (
          <Reveal key={style.id} delay={index * 0.06}>
            <StyleCard style={style} onClick={() => onStyleClick(style)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
