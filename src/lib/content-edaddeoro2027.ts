import type { BuenFinPackage } from "@/lib/content-buenfin";

export const PAGE_PATH = "/edad-de-oro-2027";
export const CONTENT_NAME = "Edad de Oro 2027";

// Same number the rest of the landing uses (see content-buenfin / JSON-LD).
export const WHATSAPP_NUMBER = "523338144369";

export function whatsappMessage(opcion: string) {
  return `Hola Diana, quiero Informes del viaje Edad de Oro 2027 Decameron Riviera Nayarit (opción: ${opcion}).`;
}

// Used by the generic buttons (hero, cierre, flotante, barra móvil) where the
// visitor hasn't picked a package yet.
export const GENERIC_OPTION = "por definir";

export const eyebrow = "Solo para mayores de 50 años";

export const headline = "Edad de Oro 2027 · Decameron Riviera Nayarit";

export const subheadline =
  "5 días y 4 noches todo incluido frente al mar, con noche mexicana, mariachi, tour en barco y cena de gala. Con salida desde Guadalajara.";

export const ctaLabel = "Quiero informes por WhatsApp";

export const trustBar = [
  "Del 30 de mayo al 3 de junio de 2027 (domingo a jueves)",
  "5 días y 4 noches",
  "Todo incluido",
  "Decameron Complex, Riviera Nayarit (Bucerías)",
];

export type EdadDeOroPackage = BuenFinPackage & { option: string };

export const packages: EdadDeOroPackage[] = [
  {
    slug: "salida_gdl",
    option: "Salida desde Guadalajara",
    name: "Salida desde Guadalajara",
    badge: "⭐ La más elegida",
    days: 5,
    salida: "Transporte ida y vuelta desde GDL",
    salidaIcon: "solar:bus-bold-duotone",
    details:
      "Incluye transporte terrestre ida y vuelta desde GDL, 4 noches todo incluido, programa de actividades y tour en destino.",
    price: "Desde $12,229 MXN",
  },
  {
    slug: "solo_hotel",
    option: "Solo hotel",
    name: "Solo hotel",
    days: 5,
    salida: "Llegas por tu cuenta",
    salidaIcon: "solar:map-point-wave-bold-duotone",
    details:
      "Incluye 4 noches todo incluido, actividades y tour en destino. El vuelo se cotiza aparte.",
    price: "Desde $10,769 MXN",
  },
  {
    slug: "salida_bajio",
    option: "Salida desde el Bajío",
    name: "Salida desde el Bajío",
    days: 5,
    salida: "Transporte ida y vuelta",
    salidaIcon: "solar:bus-bold-duotone",
    details: "Incluye transporte ida y vuelta.",
    price: "Desde $12,499 MXN",
  },
  {
    slug: "salida_cdmx",
    option: "Salida desde CDMX",
    name: "Salida desde CDMX",
    days: 5,
    salida: "Transporte ida y vuelta",
    salidaIcon: "solar:bus-bold-duotone",
    details: "Incluye transporte ida y vuelta.",
    price: "Desde $13,539 MXN",
  },
];

export const packagesNote =
  "Precios por persona publicados por el operador como 'desde'. Sujetos a disponibilidad y cambios. Pregunta por la tarifa si viajas solo o sola.";

export const includes = [
  { icon: "solar:cup-hot-bold-duotone", label: "Hotel todo incluido" },
  { icon: "solar:map-point-wave-bold-duotone", label: "Tour en destino" },
  { icon: "solar:bus-bold-duotone", label: "Transporte terrestre (en los paquetes que lo llevan)" },
  { icon: "solar:sun-2-bold-duotone", label: "Zumba en playa o alberca" },
  { icon: "solar:meditation-round-bold-duotone", label: "Yoga" },
  { icon: "solar:music-notes-bold-duotone", label: "Mariachi en vivo" },
  { icon: "solar:palette-bold-duotone", label: "Clase de pintura en cerámica" },
  { icon: "solar:star-shine-bold-duotone", label: "Shows nocturnos" },
];

export const program = [
  {
    day: "Dom 30 mayo",
    title: "Bienvenida",
    items: [
      "Registro e inscripción al concurso de trajes típicos",
      "12:30 · Comida",
      "17:00 · Misa de acción de gracias con mariachi",
      "18:15 · Foto grupal 2027",
      "19:00 · Cena de bienvenida “Regreso al pasado” (con ropa de los años 50, 60 o 70)",
    ],
  },
  {
    day: "Lun 31 mayo",
    title: "Noche mexicana",
    items: [
      "08:00 · Yoga con temática azteca",
      "10:30 · Cerámica",
      "11:30 · Bingo",
      "15:00 · Clase de baile con música mexicana",
      "19:00 · Kermés, concurso de traje típico y coronación de la Reina 2027",
      "21:30 · Show mexicano",
      "22:30 · Noche bohemia",
    ],
  },
  {
    day: "Mar 1 junio",
    title: "Día de mar",
    items: [
      "08:00 · Tour en barco con temática de marinero",
      "14:00 · Regreso al hotel, comida y tarde libre",
      "18:00 · Albercada hawaiana",
      "21:30 · Show del hotel",
      "22:00 · Discoteca",
    ],
  },
  {
    day: "Mié 2 junio",
    title: "Noche de gala",
    items: [
      "08:00 · Yoga en la playa",
      "10:00 · Zumba masiva",
      "12:00 · Juegos de mesa",
      "19:00 · Cena de clausura “Noche de Gala”",
    ],
  },
  {
    day: "Jue 3 junio",
    title: "Regreso",
    items: ["07:00 · Desayuno", "11:00 · Salida hacia todas las ciudades"],
  },
];

export const faq = [
  {
    question: "¿Quién puede viajar?",
    answer:
      "Es un programa para mayores de 50 años. Pregúntanos por tus acompañantes y lo confirmamos con el operador.",
  },
  {
    question: "¿Puedo ir solo o sola?",
    answer:
      "Sí, el viaje es grupal y está pensado para convivir. La tarifa en habitación sencilla es distinta y te la cotizamos aparte.",
  },
  {
    question: "¿Hay salida desde Guadalajara?",
    answer:
      "Sí, con transporte terrestre ida y vuelta desde $12,229 por persona. Te confirmamos el punto y la hora de salida.",
  },
  {
    question: "¿Cómo aparto mi lugar?",
    answer: "Con un anticipo, y el resto lo pagas en abonos antes del viaje.",
  },
  {
    question: "¿Qué no incluye?",
    answer:
      "Al paquete solo hotel no le van incluidos ni el vuelo ni el traslado, pero te los cotizamos. Antes de pagar te damos por escrito el detalle de lo que incluye tu paquete.",
  },
];
