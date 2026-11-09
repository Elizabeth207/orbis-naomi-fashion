import Reveal from "../ui/Reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <Reveal>
      <header className="text-center max-w-2xl mx-auto pt-16 pb-10 px-4">
        <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-ink-soft font-semibold mb-3">
          {eyebrow}
        </p>
        <span className="block w-10 h-px bg-line mx-auto mb-5" aria-hidden="true" />
        <h1 className="font-serif text-4xl md:text-[2.75rem] text-ink mb-4 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="font-sans text-ink-soft text-sm md:text-[15px] leading-relaxed max-w-xl mx-auto">
            {description}
          </p>
        )}
      </header>
    </Reveal>
  )
}
