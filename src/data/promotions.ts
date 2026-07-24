export type Promotion = {
  id: string;
  brand: "orbis" | "naomi";
  eyebrow: string;
  title: string;
  description: string;
};

export const PROMOTIONS: Promotion[] = [
  {
    id: "temporada-quince",
    brand: "naomi",
    eyebrow: "Promoción vigente",
    title: "Temporada de quince años",
    description: "Reserva tu prueba de vestido con anticipación y accede a descuentos especiales en accesorios de Novias Naomi durante este mes."
  }
];
