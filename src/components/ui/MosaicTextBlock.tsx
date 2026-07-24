interface MosaicTextBlockProps {
  phrase: string;
}

export default function MosaicTextBlock({ phrase }: MosaicTextBlockProps) {
  return (
    <div className="w-full h-full bg-ink flex items-center justify-center text-center p-6">
      <p className="font-serif text-white text-lg md:text-xl leading-snug">{phrase}</p>
    </div>
  );
}
