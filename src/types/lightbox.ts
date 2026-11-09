import type { NaomiGalleryCategory } from "../data/naomiGallery";

export type LightboxPhoto = {
  id: string;
  brand: "orbis" | "naomi";
  src: string;
  caption: string;
  category?: NaomiGalleryCategory;
};
