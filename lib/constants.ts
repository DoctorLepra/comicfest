// ── Comicfest Colombia — Event Data ──────────────────────────────────────────

export const EVENT = {
  name: "Comicfest Colombia",
  edition: "Pereira 2026",
  dates: "13, 14 y 15 de Marzo",
  year: 2026,
  startDate: new Date("2026-03-13T10:30:00-05:00"),
  venue: "Centro Comercial La 14",
  address: "Cl. 17 #19-230 Interior Piso 1, Pereira, Risaralda",
  city: "Pereira",
  openingTime: "10:30 am",
  lastEntry: "7:30 pm",
  description:
    "Una de las convenciones más grandes de Colombia. Más de 220 mil personas fanáticas de los superhéroes, cómics, videojuegos, tecnología, cine, televisión y series animadas.",
  tagline: "El lugar donde la magia se hace realidad",
  whatsapp: "3244120444",
  whatsappTickets: "3206969453",
  socialMedia: {
    instagram: "https://www.instagram.com/comicfestco",
    facebook: "https://www.facebook.com/comicfestcolombia",
  },
};

export const TICKETS = [
  {
    id: "general",
    name: "General",
    price: 20000,
    priceLabel: "$20.000",
    description: "Acceso por un día al evento",
    badge: "",
    color: "border-cf-gray",
    features: [
      "Acceso a zona de exposiciones",
      "Actividades y competencias",
      "Shows y presentaciones",
    ],
  },
  {
    id: "parche",
    name: "Parche x5",
    price: 85000,
    priceLabel: "$85.000",
    description: "Paquete para grupos de 5 personas",
    badge: "POPULAR",
    color: "border-cf-yellow",
    features: [
      "5 entradas individuales",
      "Acceso a zona de exposiciones",
      "Ahorra $15.000",
      "Aplica términos y condiciones",
    ],
  },
  {
    id: "fullpass",
    name: "Full Pass",
    price: 125000,
    priceLabel: "$125.000",
    description: "La experiencia Comicfest completa",
    badge: "PREMIUM",
    color: "border-cf-yellow-light",
    features: [
      "Acceso VIP al evento",
      "Beneficios exclusivos",
      "Acceso a zonas especiales",
      "Kit de bienvenida Comicfest",
    ],
  },
];

export const ACTIVITIES = [
  {
    id: "copa-cosplay",
    slug: "copa-cosplay",
    title: "Copa Cosplay",
    subtitle: "Muestra tu mejor personaje",
    description:
      "El lugar perfecto para dar a conocer tu esfuerzo, dedicación y amor por el cosplay. Inscríbete y compite con los mejores cosplayers de Colombia.",
    icon: "🎭",
    color: "#f5c500",
    badge: "COMPETENCIA",
    image: "/images/cosplay.jpg",
    features: [
      "Categorías individual y grupal",
      "Premios en efectivo",
      "Pasarela en escenario principal",
      "Jurado especializado",
    ],
  },
  {
    id: "kpop",
    slug: "kpop",
    title: "Campeonato KPOP",
    subtitle: "Saca tus mejores pasos",
    description:
      "Saca a relucir tus mejores pasos de KPOP y álzate a la victoria en nuestro campeonato grupal. Hasta 8 integrantes por equipo.",
    icon: "🎤",
    color: "#ff6b9d",
    badge: "COMPETENCIA",
    image: "/images/kpop.jpg",
    features: [
      "Equipos de 2 a 8 personas",
      "Premios para los ganadores",
      "Escenario principal",
      "Sonido profesional",
    ],
  },
  {
    id: "esports",
    slug: "esports",
    title: "Torneos Esports",
    subtitle: "Nexus Cup Comicfest",
    description:
      "Demuestra tus habilidades en los mejores videojuegos del momento. Torneos con cupos limitados y premios para los campeones.",
    icon: "🎮",
    color: "#00d4ff",
    badge: "TORNEO",
    image: "/images/esports.jpg",
    features: [
      "Múltiples juegos disponibles",
      "Brackets en vivo",
      "Premios en efectivo",
      "Cupos limitados",
    ],
  },
  {
    id: "bruce-challenge",
    slug: "bruce-challenge",
    title: "Bruce Challenge",
    subtitle: "¿Puedes con el reto?",
    description:
      "Pon a prueba tu fuerza y resistencia en el reto más épico del evento. ¿Tienes lo que se necesita para superar el Bruce Challenge?",
    icon: "💪",
    color: "#ff4444",
    badge: "ENTRETENIMIENTO",
    image: "/images/challenge.jpg",
    features: [
      "Dinámicas en tiempo real",
      "Premios sorpresa",
      "Apto para todas las edades",
      "Clasificatorio por rondas",
    ],
  },
  {
    id: "glotoneria-challenge",
    slug: "glotoneria-challenge",
    title: "Glotonería Challenge",
    subtitle: "Come más rápido que nadie",
    description:
      "El reto gastronómico más divertido del evento. ¿Quién puede comer más rápido? Compite y gana premios en este challenge lleno de sabor.",
    icon: "🌮",
    color: "#ff8c00",
    badge: "ENTRETENIMIENTO",
    image: "/images/challenge.jpg",
    features: [
      "Challenge de velocidad",
      "Premios para el ganador",
      "Múltiples rondas",
      "Espectador bienvenido",
    ],
  },
  {
    id: "cubo-rubik",
    slug: "cubo-rubik",
    title: "Torneo Cubo Rubik",
    subtitle: "World Cube Association",
    description:
      "Competencia oficial avalada por la World Cube Association. Si eres speedcuber, este es tu momento de brillar.",
    icon: "🧩",
    color: "#00ff88",
    badge: "TORNEO WCA",
    image: "/images/rubik.jpg",
    features: [
      "Avalado por World Cube Association",
      "Múltiples categorías",
      "Clasificatorio oficial",
      "Premio al mejor tiempo",
    ],
  },
];

export const STATS = [
  { value: "250K+", label: "Asistentes en todo el país", icon: "👥" },
  { value: "11", label: "Ciudades recorridas", icon: "📍" },
  { value: "57K+", label: "Seguidores en Instagram", icon: "📱" },
  { value: "120+", label: "Marcas convocadas", icon: "🏷️" },
];

export const AGENDA = [
  {
    day: "Viernes 13",
    date: "2026-03-13",
    events: [
      { time: "10:30", title: "Apertura de puertas", type: "general" },
      {
        time: "11:00",
        title: "Inauguración oficial Comicfest Pereira",
        type: "especial",
      },
      {
        time: "12:00",
        title: "Torneos Esports - Fase clasificatoria",
        type: "torneo",
      },
      {
        time: "14:00",
        title: "Copa Cosplay - Audiciones",
        type: "competencia",
      },
      { time: "16:00", title: "Bruce Challenge", type: "entretenimiento" },
      {
        time: "18:00",
        title: "Show artístico y cierre del día",
        type: "especial",
      },
      { time: "19:30", title: "Último ingreso", type: "general" },
    ],
  },
  {
    day: "Sábado 14",
    date: "2026-03-14",
    events: [
      { time: "10:30", title: "Apertura de puertas", type: "general" },
      {
        time: "11:00",
        title: "Torneos Esports - Cuartos de final",
        type: "torneo",
      },
      {
        time: "13:00",
        title: "Campeonato KPOP - Fase grupal",
        type: "competencia",
      },
      { time: "15:00", title: "Copa Cosplay - Semifinal", type: "competencia" },
      { time: "16:30", title: "Glotonería Challenge", type: "entretenimiento" },
      { time: "17:30", title: "Torneo Cubo Rubik", type: "torneo" },
      { time: "19:00", title: "Gran show musical y cierre", type: "especial" },
    ],
  },
  {
    day: "Domingo 15",
    date: "2026-03-15",
    events: [
      { time: "10:30", title: "Apertura de puertas", type: "general" },
      { time: "11:00", title: "Torneos Esports - Final", type: "torneo" },
      {
        time: "13:00",
        title: "Campeonato KPOP - Gran Final",
        type: "competencia",
      },
      {
        time: "15:00",
        title: "Copa Cosplay - Gran Final",
        type: "competencia",
      },
      { time: "17:00", title: "Premiación general", type: "especial" },
      { time: "18:00", title: "Ceremonia de clausura", type: "especial" },
      { time: "19:30", title: "Último ingreso", type: "general" },
    ],
  },
];

export const FAQ = [
  {
    q: "¿Dónde será Comicfest Pereira?",
    a: "Se realizará en el Centro Comercial La 14, Cl. 17 #19-230 Interior Piso 1, Pereira, Risaralda.",
  },
  {
    q: "¿Desde qué edad se puede ingresar?",
    a: "Es para todas las edades. Pagan entrada a partir de los 3 años. Presentar registro civil para edades inferiores sin pago.",
  },
  {
    q: "¿Cuáles son los horarios del evento?",
    a: "Apertura: 10:30 am. Último ingreso: 7:30 pm.",
  },
  {
    q: "¿Cómo puedo ser expositor del evento?",
    a: "Escríbenos a la línea comercial 3244120444 (WhatsApp) de 9:00 am a 12:30 pm y de 1:30 pm a 5:30 pm. También puedes registrarte directamente en nuestra plataforma de expositores.",
  },
  {
    q: "¿Dónde adquiero las entradas?",
    a: "Próximamente más información. Puedes consultarlo en la línea de WhatsApp 3206969453.",
  },
];

export const STAND_TYPES = [
  {
    id: "standard",
    name: "Estándar",
    size: "3m × 2m",
    price: 500000,
    priceLabel: "$500.000",
    color: "#2a2a2a",
    borderColor: "#444444",
    width: 80,
    height: 60,
  },
  {
    id: "premium",
    name: "Premium",
    size: "4m × 3m",
    price: 900000,
    priceLabel: "$900.000",
    color: "#1a1500",
    borderColor: "#f5c500",
    width: 100,
    height: 80,
  },
  {
    id: "corner",
    name: "Corner",
    size: "4m × 4m",
    price: 1400000,
    priceLabel: "$1.400.000",
    color: "#0a1500",
    borderColor: "#ffd740",
    width: 110,
    height: 110,
  },
  {
    id: "isla",
    name: "Isla",
    size: "6m × 4m",
    price: 2200000,
    priceLabel: "$2.200.000",
    color: "#0a0a20",
    borderColor: "#00d4ff",
    width: 140,
    height: 100,
  },
];
