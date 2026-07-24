import type { Style } from "../../data/styles";
import MosaicTile from "../ui/MosaicTile";
import MosaicTextBlock from "../ui/MosaicTextBlock";

interface StyleMosaicProps {
  styles: Style[];
  onStyleClick: (style: Style) => void;
}

// Patrón cíclico de tamaños: foto grande, dos pequeñas, mediana vertical, ancha horizontal.
const PATTERNS = [
  { span: "md:col-span-4 md:row-span-2", large: true },
  { span: "md:col-span-2 md:row-span-1", large: false },
  { span: "md:col-span-2 md:row-span-1", large: false },
  { span: "md:col-span-2 md:row-span-2", large: true },
  { span: "md:col-span-4 md:row-span-1", large: true },
];

const PHRASES = [
  "Cada prenda cuenta una historia.",
  "Estilo para cada ocasión.",
  "Pichanaki se viste distinto.",
];

type MosaicItem =
  | { type: "tile"; key: string; style: Style; spanClass: string; large: boolean }
  | { type: "text"; key: string; phrase: string; spanClass: string };

function buildMosaicItems(styles: Style[]): MosaicItem[] {
  const items: MosaicItem[] = [];
  let phraseIndex = 0;

  styles.forEach((style, index) => {
    const pattern = PATTERNS[index % PATTERNS.length];
    items.push({
      type: "tile",
      key: `tile-${style.brand}-${style.id}`,
      style,
      spanClass: pattern.span,
      large: pattern.large,
    });

    if ((index + 1) % 6 === 0) {
      items.push({
        type: "text",
        key: `text-${index}`,
        phrase: PHRASES[phraseIndex % PHRASES.length],
        spanClass: "md:col-span-2 md:row-span-1",
      });
      phraseIndex++;
    }
  });

  return items;
}

export default function StyleMosaic({ styles, onStyleClick }: StyleMosaicProps) {
  const items = buildMosaicItems(styles);

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-3 md:auto-rows-[160px]">
      {items.map((item) => (
        <div key={item.key} className={`${item.spanClass} aspect-[4/3] md:aspect-auto`}>
          {item.type === "tile" ? (
            <MosaicTile
              style={item.style}
              large={item.large}
              onClick={() => onStyleClick(item.style)}
            />
          ) : (
            <MosaicTextBlock phrase={item.phrase} />
          )}
        </div>
      ))}
    </div>
  );
}
