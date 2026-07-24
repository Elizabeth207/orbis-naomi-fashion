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
        <p className="font-sans text-xs uppercase tracking-widest text-ink-soft font-semibold mb-4">
          {eyebrow}
        </p>
        <h1 className="font-serif text-4xl text-ink mb-4">{title}</h1>
        {description && (
          <p className="font-sans text-ink-soft text-sm leading-relaxed">
            {description}
          </p>
        )}
      </header>
    </Reveal>
  )
}
