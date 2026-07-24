export type Category = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: "shirt" | "jeans" | "jacket" | "dress" | "gala" | "suit";
};

export const CATEGORIES_ORBIS: Category[] = [
  {
    id: "polos-camisas",
    name: "Polos & camisas",
    subtitle: "Para damas y caballeros",
    description: "Básicos y estampados en algodón, ideales para el uso diario, con cortes para dama y caballero en toda la temporada.",
    icon: "shirt"
  },
  {
    id: "jeans-pantalones",
    name: "Jeans & pantalones",
    subtitle: "Cortes clásicos y modernos",
    description: "Denim y drill en cortes rectos, skinny y wide leg, pensados para durar y acompañar cualquier look casual.",
    icon: "jeans"
  },
  {
    id: "casacas-chompas",
    name: "Casacas & chompas",
    subtitle: "Abrigo con estilo",
    description: "Prendas de abrigo para el clima de Pichanaki, desde chompas de punto hasta casacas urbanas.",
    icon: "jacket"
  }
];

export const CATEGORIES_NAOMI: Category[] = [
  {
    id: "vestidos-novia",
    name: "Vestidos de novia",
    subtitle: "Para tu gran día",
    description: "Diseños en tul, encaje y pedrería para novias, con opciones a medida y para prueba en tienda.",
    icon: "dress"
  },
  {
    id: "gala-quinceanera",
    name: "Gala & quinceañera",
    subtitle: "Desde los 8 años",
    description: "Vestidos de fiesta y quince años para niñas, jóvenes y adultas, en distintos colores y siluetas.",
    icon: "gala"
  },
  {
    id: "ternos-trajes",
    name: "Ternos & trajes",
    subtitle: "Para niños y adultos",
    description: "Ternos formales para acompañantes de bodas, quince años y eventos especiales, en todas las tallas.",
    icon: "suit"
  }
];
