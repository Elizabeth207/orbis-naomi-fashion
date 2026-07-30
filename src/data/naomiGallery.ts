export type NaomiGalleryCategory = "novias" | "quinceaneras" | "caballeros" | "ninos";

export type NaomiGalleryPhoto = {
  id: string;
  brand: "naomi";
  category: NaomiGalleryCategory;
  src: string;
  caption: string;
};

export const NAOMI_GALLERY_LABELS: Record<NaomiGalleryCategory, string> = {
  novias: "Novias",
  quinceaneras: "Quinceañeras",
  caballeros: "Caballeros",
  ninos: "Niños",
};

/** Nombre real de la carpeta en disco por categoría (puede diferir del id de categoría por tildes/ñ) */
const CATEGORY_FOLDER: Record<NaomiGalleryCategory, string> = {
  novias: "novias",
  quinceaneras: "quinceaneras",
  caballeros: "caballeros",
  ninos: "niños",
};

function buildPhoto(category: NaomiGalleryCategory, file: string, index: number): NaomiGalleryPhoto {
  const folder = CATEGORY_FOLDER[category];
  return {
    id: `${category}-${index + 1}`,
    brand: "naomi",
    category,
    src: `/images/naomi/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`,
    caption: `Novias Naomi — ${NAOMI_GALLERY_LABELS[category]}`,
  };
}

// Nombres reales de archivo tal como están hoy en cada carpeta de public/images/naomi/.
// TODO: si Elizabeth sube, quita o renombra fotos en estas carpetas, actualizar estas listas
// para que coincidan exactamente con los archivos presentes en disco.
const NOVIAS_FILES = ["novia1.jpg", "novia2.jpg", "novia3.jpg", "novia4.jpg", "novia5.jpg", "novia6.jpg"];

const QUINCEANERAS_FILES = [
  "img1.jpeg",
  "quince1.jpg",
  "quince2.jpg",
  "quince3.jpg",
  "quinc4.jpg",
  "quince5.jpg",
  "quince6.jpg",
  "quince7.jpg",
  "quince8.jpg",
];

const CABALLEROS_FILES = ["naomi1.png", "naomi2.jpg", "naomi3.jpg", "naomi4.jpg", "naomi5.jpg", "naomi6.jpg"];

const NINOS_FILES = [
  "niña1.jpg",
  "niña2.jpg",
  "niña3.jpg",
  "niña3.jpeg",
  "niña4.jpg",
  "niño1.jpg",
  "niño1.jpeg",
  "niño2.jpg",
  "niño2.jpeg",
  "niño3.jpg",
  "niño4.jpg",
  "niño4.jpeg",
  "niño5.jpg",
  "niño6.jpg",
  "niño7.jpg",
  "niño8.jpg",
];

export const NAOMI_GALLERY_PHOTOS: NaomiGalleryPhoto[] = [
  ...NOVIAS_FILES.map((file, i) => buildPhoto("novias", file, i)),
  ...QUINCEANERAS_FILES.map((file, i) => buildPhoto("quinceaneras", file, i)),
  ...CABALLEROS_FILES.map((file, i) => buildPhoto("caballeros", file, i)),
  ...NINOS_FILES.map((file, i) => buildPhoto("ninos", file, i)),
];
