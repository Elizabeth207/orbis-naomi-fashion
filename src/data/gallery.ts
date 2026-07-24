export type GalleryPhoto = {
  id: string;
  brand: "orbis" | "naomi";
  caption: string;
  src: string;
};

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: "orbis-01", brand: "orbis", caption: "Vitrina Orbis II", src: "/images/galeria/orbis-01.jpg" },
  { id: "orbis-02", brand: "orbis", caption: "Moda casual Orbis II", src: "/images/galeria/orbis-04.jpeg" },
  { id: "naomi-01", brand: "naomi", caption: "Vestido de novia Naomi", src: "/images/galeria/naomi-01.jpg" },
  { id: "naomi-02", brand: "naomi", caption: "Interior Novias Naomi", src: "/images/galeria/naomi-02.jpg" },
];
