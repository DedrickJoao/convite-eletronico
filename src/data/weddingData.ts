import { WeddingEvent, PlaylistItem, GiftOption, DressCodePalette } from '../types';

export const WEDDING_DETAILS = {
  groom: "Dionísio",
  bride: "Benedita",
  monogram: "D & B",
  hashtag: "#DionisioEBenedita2026",
  tagline: "O Grande Casamento de 2026",
  subTagline: "Que falte tudo menos Deus...",
  impactPhrase: "Dois corações unidos pelo amor e pelo propósito divino. É com imensa honra e alegria que convidamos você para celebrar o nosso matrimónio na majestosa cidade de Maputo, Moçambique.",
  dateText: "Sábado, 12 de Dezembro de 2026",
  targetDate: "2026-12-12T09:30:00+02:00",
  ceremonyTime: "09:30",
  civilCeremonyTime: "11:00",
  receptionTime: "18:30",
  venueName: "Sé Catedral de Maputo",
  venueAddress: "Praça da Independência, Centro",
  cityCountry: "Maputo, Moçambique",
  googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=S%C3%A9+Catedral+de+Maputo%2C+Pra%C3%A7a+da+Independ%C3%AAncia%2C+Maputo&dir_action=navigate",
  appleMapsUrl: "https://maps.apple.com/?daddr=Se+Catedral+de+Maputo,+Praca+da+Independencia,+Maputo&dirflg=d",
  wazeUrl: "https://waze.com/ul?q=Se+Catedral+de+Maputo&navigate=yes",
  receptionVenueName: "Orquídea Eventos",
  receptionVenueAddress: "Matola Rio, Moçambique",
  receptionGoogleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Orqu%C3%ADdea+Eventos%2C+Matola+Rio%2C+Mo%C3%A7ambique&dir_action=navigate",
  receptionAppleMapsUrl: "https://maps.apple.com/?daddr=Orquidea+Eventos,+Matola+Rio,+Mocambique&dirflg=d",
  receptionWazeUrl: "https://waze.com/ul?q=Orquidea+Eventos+Matola+Rio&navigate=yes",
  uberRideUrl: "https://m.uber.com/ul/?action=setPickup&pickup=my_location",
  spotifyPlaylistUrl: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",
  organizerContact: "+258 87 700 2267 / +258 86 756 1010",
  organizerPhone1: "+258 87 700 2267",
  organizerPhone2: "+258 86 756 1010",
  organizerEmail: "bhelena.nhantumbo76@gmail.com",
  rsvpsNotificationEmail: "bhelena.nhantumbo76@gmail.com",
  rsvpDeadline: "18 de Novembro de 2026",
  bankingDetails: {
    iban: "",
    swift: "",
    holder: "Dionísio & Benedita",
    pixKey: "877002266",
    multicaixaExpress: "877002266"
  },
  giftStoreDetails: {
    storeName: "Casa das Loiças",
    address: "Avenida Karl Marx, próxima às bombas Petromoc",
    city: "Maputo, Moçambique",
    googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Casa+das+Loi%C3%A7as%2C+Avenida+Karl+Marx%2C+Maputo&dir_action=navigate",
    appleMapsUrl: "https://maps.apple.com/?daddr=Casa+das+Loicas,+Avenida+Karl+Marx,+Maputo&dirflg=d",
    wazeUrl: "https://waze.com/ul?q=Casa+das+Loicas+Avenida+Karl+Marx+Maputo&navigate=yes",
    emolaNumber: "877002266"
  }
};

export const TIMELINE_EVENTS: WeddingEvent[] = [
  {
    title: "Chegada dos Convidados de Honra",
    time: "15:30",
    location: "Jardim das Palmeiras Imperiais",
    address: "Pátio Principal com Valet Parking e Tapete Azul & Dourado",
    description: "Recepção com harpa ao vivo, flute de boas-vindas com Champagne Dom Pérignon e acolhimento caloroso dos convidados.",
    iconName: "Sparkles"
  },
  {
    title: "Cerimónia Solene & Votos Eternos",
    time: "16:00",
    location: "Catedral de Cristal & Vista para o Índico",
    address: "Altar Principal adornado em Flores Brancas e Folhas de Ouro",
    description: "A entrada triunfal dos noivos, troca de alianças e bênção matrimonial com vista panorâmica para a Baía de Maputo.",
    iconName: "HeartHandshake"
  },
  {
    title: "Cocktail D'Ouro & Brinde ao Pôr do Sol",
    time: "17:30",
    location: "Terraço Panorâmico sobre a Baía",
    address: "Miradouro dos Jardins",
    description: "Performance exclusiva de saxofone ao vivo, mesa de mariscos da Costa do Índico, mixologia molecular e fotos com os noivos.",
    iconName: "GlassWater"
  },
  {
    title: "O Grande Banquete Gastronómico",
    time: "19:30",
    location: "Salão Nobre Imperial",
    address: "Mesas Reais iluminadas por 1.000 velas aromáticas",
    description: "Menu de 5 tempos assinado por Chef Internacional com harmonização de vinhos de reserva exclusiva de 2026.",
    iconName: "UtensilsCrossed"
  },
  {
    title: "Corte do Bolo & Espetáculo Pirotécnico",
    time: "22:30",
    location: "Jardim da Fonte Iluminada",
    address: "Esplanada Principal",
    description: "Bolo de 7 andares folheado a ouro comestível 24k com espetáculo de fogos de artifício na baía e show de luzes sincronizado.",
    iconName: "Cake"
  },
  {
    title: "Gala After-Party & Pista de Dança",
    time: "23:00 - Até ao Amanhecer",
    location: "Grand Ballroom & Lounge VIP",
    address: "Pista de Dança com Efeito Infinito e LED Glass",
    description: "DJs de renome, banda de Afro-Jazz/Soul ao vivo, bar de coquetéis premium all night e surpresas inesquecíveis.",
    iconName: "Music"
  }
];

export const PLAYLIST_ITEMS: PlaylistItem[] = [
  {
    id: "1",
    title: "From This Moment On",
    artist: "Shania Twain & Bryan White",
    duration: "4:41",
    vibe: "Música Oficial do Convite Nupcial",
    coverArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80"
  },
  {
    id: "2",
    title: "Can't Take My Eyes Off You (Acoustic Jazz)",
    artist: "Dionísio & Benedita Golden Trio",
    duration: "3:58",
    vibe: "Primeira Dança dos Recém-Casados",
    coverArt: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&q=80"
  },
  {
    id: "3",
    title: "Perfect Symphony (Italian & Portuguese Duet)",
    artist: "Royal Chamber Players",
    duration: "4:22",
    vibe: "Brinde de Cristal & Champagne",
    coverArt: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80"
  },
  {
    id: "4",
    title: "Love Someone (Lukas Graham Cello Cover)",
    artist: "Starlight Strings Ensemble",
    duration: "3:30",
    vibe: "Momento dos Votos e Alianças",
    coverArt: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80"
  },
  {
    id: "5",
    title: "Stand By Me (Soul & Saxophone Edition)",
    artist: "Midnight Velvet Band",
    duration: "4:10",
    vibe: "Abertura do Coquetel Imperial",
    coverArt: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&q=80"
  }
];

export const DRESS_CODE_PALETTE: DressCodePalette[] = [
  {
    name: "Azul Névoa Imperial (Dusty Blue)",
    colorHex: "#5B7B9D",
    description: "Tom suave e aristocrático em harmonia com as aquarelas do convite."
  },
  {
    name: "Azul Marinho Real (Deep Navy)",
    colorHex: "#13243A",
    description: "Elegância profunda em smokings e vestidos longos de gala."
  },
  {
    name: "Ouro Imperial (Gold Leaf)",
    colorHex: "#D4AF37",
    description: "Acentos brilhantes em joias, bordados finos e acessórios nobres."
  },
  {
    name: "Branco Seda & Marfim",
    colorHex: "#F5F8FA",
    description: "Exclusivo para a noiva e camisaria nobre dos cavalheiros."
  },
  {
    name: "Champagne Suave",
    colorHex: "#EED9B3",
    description: "Harmonia elegante para convidadas e damas de honra."
  }
];

export const GIFT_OPTIONS: GiftOption[] = [
  {
    id: "maldives",
    title: "Noites de Sonho em Bangalô sobre as Águas (Maldivas)",
    category: "Lua de Mel Exclusiva",
    amount: "35.000 MZN / € 500",
    description: "Proporcione aos noivos dias paradisíacos no resort 5 estrelas mais cobiçado do mundo.",
    iconName: "Palmtree",
    popular: true
  },
  {
    id: "paris-dinner",
    title: "Jantar Romântico com Champagne e Vista Panorâmica",
    category: "Experiência Gastronómica",
    amount: "25.000 MZN / € 350",
    description: "Uma noite inesquecível de alta gastronomia celebrando o início da vida a dois.",
    iconName: "Utensils",
    popular: false
  },
  {
    id: "wine-cellar",
    title: "Reserva de Vinho de Colecionador do Ano do Casamento",
    category: "Adega dos Noivos",
    amount: "18.000 MZN / € 250",
    description: "Um tesouro enológico para o casal brindar nas futuras bodas.",
    iconName: "Wine",
    popular: false
  },
  {
    id: "spa-day",
    title: "Dia de Spa e Massagem Real para o Casal",
    category: "Bem-Estar & Relaxamento",
    amount: "14.000 MZN / € 200",
    description: "Tratamento completo com óleos preciosos para relaxar após o grande dia.",
    iconName: "Sparkles",
    popular: false
  },
  {
    id: "free-gift",
    title: "Presente em Dinheiro / Cota Personalizada",
    category: "Aporte Livre dos Noivos",
    amount: "Qualquer Valor",
    description: "Envio instantâneo via M-Pesa, E-Mola, Millennium BIM ou Transferência Internacional.",
    iconName: "Gift",
    popular: true
  }
];

export const LOVE_STORY_MILESTONES = [
  {
    year: "O Primeiro Olhar",
    title: "Um Encontro de Destino",
    description: "Em uma noite iluminada, dois olhares se cruzaram e o mundo pareceu parar. Naquele instante, nasceu uma cumplicidade que desafia o tempo.",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80"
  },
  {
    year: "O Nosso Caminho",
    title: "Construindo um Império de Amor",
    description: "Viagens inesquecíveis, conquistas partilhadas, gargalhadas infinitas e a certeza diária de que a vida só faz sentido lado a lado.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80"
  },
  {
    year: "O Grande 'Sim!'",
    title: "O Pedido Sob as Estrelas",
    description: "Em um cenário cinematográfico e com lágrimas de pura felicidade, Dionísio declarou seu amor eterno e Benedita disse o SIM que mudou seus destinos para sempre.",
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80"
  }
];
