export type Style = {
  id: string;
  brand: "orbis" | "naomi";
  name: string;
  description: string;
  /** Foto principal (la imagen general renombrada, ubicada en la raíz de la carpeta del estilo) */
  coverImage: string;
  /** Fotos de la carpeta "coleccion" del estilo — puede tener 3 o 4 fotos según lo que se haya guardado */
  images: string[];
};

function encodePath(...segments: string[]): string {
  return segments.map((segment) => encodeURIComponent(segment)).join("/");
}

function buildStyle(
  brand: "orbis" | "naomi",
  folder: string,
  name: string,
  description: string,
  collectionFiles: string[]
): Style {
  const base = `/images/${brand}/estilos`;
  return {
    id: folder.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    brand,
    name,
    description,
    coverImage: `${base}/${encodePath(folder, `${folder}.jpg`)}`,
    images: collectionFiles.map((file) => `${base}/${encodePath(folder, "coleccion", file)}`)
  };
}

export const STYLES_ORBIS: Style[] = [
  buildStyle(
    "orbis",
    "Blusa Brisa de Verano",
    "Blusa Brisa de Verano",
    "Blusa ligera de tejido fresco, ideal para los días calurosos sin perder un aire prolijo y femenino.",
    ["coleccion1.jpg", "coleccion2.jpg", "coleccion3.jpg", "coleccion4.jpg"]
  ),
  buildStyle(
    "orbis",
    "Jean Paperbag",
    "Jean Paperbag",
    "Jean de cintura alta con acabado paperbag, un básico versátil que estiliza la silueta en cualquier look casual.",
    ["coleccion1.jpg", "coleccion2.jpg", "coleccion3.jpg"]
  ),
  buildStyle(
    "orbis",
    "Jean Paperbag Gris",
    "Jean Paperbag Gris",
    "La misma silueta paperbag en un gris versátil, fácil de combinar con blusas y polos de cualquier tono.",
    ["coleccion1.jpg", "coleccion2.jpg", "colecion3.jpg", "coleccion4.jpg"]
  ),
  buildStyle(
    "orbis",
    "Jean Wide Leg Chocolate",
    "Jean Wide Leg Chocolate",
    "Corte wide leg en tono chocolate, para un look relajado con caída moderna y mucho estilo.",
    ["coleccion1.jpg", "coleccion2.jpg", "coleccion3.jpg", "coleccion4.jpg"]
  ),
  buildStyle(
    "orbis",
    "Jean-Azul-Bordado",
    "Jean Azul Bordado",
    "Denim azul con bordado artesanal, un detalle que eleva un básico de todos los días.",
    ["coleccion1.jpg", "coleccion2.jpg", "coleccion3.jpg", "coleccion4.jpg"]
  ),
  buildStyle(
    "orbis",
    "Jean-Gris-Grafito",
    "Jean Gris Grafito",
    "Jean gris grafito de corte recto, un comodín perfecto para looks urbanos de diario.",
    ["coleccion1.jpg", "collecion2.jpg", "coleccion3.jpg", "coleccion4.jpg"]
  )
];

export const STYLES_NAOMI: Style[] = [
  buildStyle(
    "naomi",
    "Emerald Royalty",
    "Emerald Royalty",
    "Vestido en verde esmeralda con brillo sutil, pensado para brillar en las noches de gala más importantes.",
    ["coleccion1.jpg", "coleccion2.jpg", "coleccion3.jpg"]
  ),
  buildStyle(
    "naomi",
    "Vestido Bianca",
    "Vestido Bianca",
    "Silueta romántica en tono marfil, ideal para novias que buscan una elegancia atemporal.",
    ["coleccion1.jpg", "coleccion2.jpg", "coleccion3.jpg"]
  ),
  buildStyle(
    "naomi",
    "Vestido Sirena",
    "Vestido Sirena",
    "Corte sirena que realza la figura, para quienes buscan un efecto dramático y sofisticado.",
    ["coleccion1.jpg", "coleccion2.jpg", "coleccion3.jpg"]
  ),
  buildStyle(
    "naomi",
    "Vestido Sirena Azul",
    "Vestido Sirena Azul",
    "El corte sirena reinventado en un azul profundo, perfecto para eventos de gala nocturnos.",
    ["coleccion1.jpg", "coleccion2.jpg", "coleccion3.jpg", "coleccion4.jpg"]
  ),
  buildStyle(
    "naomi",
    "vestido xiomara",
    "Vestido Xiomara",
    "Diseño exclusivo con detalles únicos, pensado para una ocasión que merece un vestido irrepetible.",
    ["coleccion1.jpg"]
  ),
  buildStyle(
    "naomi",
    "Victoria Ivory",
    "Victoria Ivory",
    "Vestido en marfil clásico, con líneas limpias que capturan una elegancia serena y atemporal.",
    ["coleccion1.jpg", "coleccion2.jpg", "coleccion3.jpg"]
  )
];
