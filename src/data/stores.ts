export type Store = {
  id: string;
  brand: "orbis" | "naomi";
  name: string;
  slogan: string;
  address: string;
  hours: string;
  whatsapp: string;
  hoursDetail: { day: string; time: string }[];
  mapsQuery: string;
  coordinates?: { lat: number; lng: number };
};

export const STORES: Store[] = [
  {
    id: "orbis-ii",
    brand: "orbis",
    name: "Orbis II",
    slogan: "Moda casual para damas y caballeros.",
    address: "671 Av Lima, Pichanaki, Junín, Perú",
    hours: "Lun-Vie 8:00 am - 10:00 pm, Sáb-Dom 9:00 am - 10:00 pm",
    whatsapp: "51916621772",
    hoursDetail: [
      { day: "Lunes a Viernes", time: "8:00 am - 10:00 pm" },
      { day: "Sábados", time: "9:00 am - 10:00 pm" },
      { day: "Domingos", time: "9:00 am - 10:00 pm" }
    ],
    mapsQuery: "Orbis II, 671 Av Lima, Pichanaki, Junín, Perú",
    coordinates: { lat: -10.9255969, lng: -74.875049 }
  },
  {
    id: "novias-naomi",
    brand: "naomi",
    name: "Novias Naomi",
    slogan: "Vestidos y prendas de gala para cada ocasión especial.",
    address: "Bajo Pichanaqui, Chanchamayo, Junín, Perú (coordenadas exactas confirmadas, dirección en texto pendiente)",
    hours: "Lun-Dom 9:00 am - 10:00 pm",
    whatsapp: "51916621772",
    hoursDetail: [
      { day: "Lunes a Viernes", time: "9:00 am - 10:00 pm" },
      { day: "Sábados", time: "9:00 am - 10:00 pm" },
      { day: "Domingos", time: "9:00 am - 10:00 pm" }
    ],
    mapsQuery: "-10.9257816,-74.8742806",
    coordinates: { lat: -10.9257816, lng: -74.8742806 }
  }
];
