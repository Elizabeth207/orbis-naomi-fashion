import { Baby, User } from "lucide-react";

interface BrandStoryProps {
  title: string;
  paragraphs: string[];
  showAudienceTags?: boolean;
}

export default function BrandStory({ title, paragraphs, showAudienceTags = false }: BrandStoryProps) {
  return (
    <section className="max-w-2xl mx-auto text-center py-20 px-4">
      <h2 className="font-serif text-3xl text-ink mb-8">{title}</h2>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="font-sans text-ink-soft leading-relaxed mb-6">
          {paragraph}
        </p>
      ))}
      {showAudienceTags && (
        <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-10 pt-8 border-t border-line">
          {[
            { icon: User, label: "Damas" },
            { icon: User, label: "Caballeros" },
            { icon: Baby, label: "Niños" },
          ].map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-2">
              <span className="w-11 h-11 rounded-full bg-orbis-tint/60 border border-orbis/30 flex items-center justify-center">
                <Icon className="w-5 h-5 text-orbis-dark" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="font-sans text-xs uppercase tracking-widest text-ink-soft">{label}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
