interface BrandStoryProps {
  title: string
  paragraphs: string[]
}

export default function BrandStory({ title, paragraphs }: BrandStoryProps) {
  return (
    <section className="max-w-2xl mx-auto text-center py-20 px-4">
      <h2 className="font-serif text-3xl text-ink mb-8">{title}</h2>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="font-sans text-ink-soft leading-relaxed mb-6"
        >
          {paragraph}
        </p>
      ))}
    </section>
  )
}
