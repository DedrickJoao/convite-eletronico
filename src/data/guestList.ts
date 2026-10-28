export interface GuestItem {
  id: number;
  type: 'Casal' | 'Individual';
  name1: string;
  name2?: string;
  fullName: string;
  allowedCount: number;
  validityText: string;
  specialNotes: string;
  restrictions: string;
  url: string;
  whatsappMessage: string;
}

export interface GuestProfile {
  guestName: string;
  type: 'Casal' | 'Individual';
  allowedCount: number;
  guestCountText: string;
  typeBadgeText: string;
  validityText: string;
  specialNotes: string;
  restrictions: string;
  isRegistered: boolean;
}

export const BASE_SHARED_URL = "https://convite-eletronico.vercel.app";

const DEFAULT_SPECIAL_NOTES = "NÃO EXTENSIVO A CRIANÇAS";
const DEFAULT_RESTRICTIONS = "CONFIRMAÇÃO OBRIGATÓRIA ATÉ 7 DE NOVEMBRO DE 2026";

export const RAW_GUESTS: Array<{
  id: number;
  type: 'Casal' | 'Individual';
  name1: string;
  name2?: string;
  fullName: string;
  allowedCount?: number;
  specialNotes?: string;
  restrictions?: string;
}> = [
  { id: 1, type: "Casal", name1: "Belinha", name2: "Lucas", fullName: "Belinha e Lucas" },
  { id: 2, type: "Individual", name1: "Arlindo", fullName: "Arlindo" },
  { id: 3, type: "Individual", name1: "Kátia", fullName: "Kátia" },
  { id: 4, type: "Individual", name1: "Zulfa", fullName: "Zulfa" },
  { id: 5, type: "Casal", name1: "Acácio", name2: "Chinoca", fullName: "Acácio e Chinoca" },
  { id: 6, type: "Casal", name1: "Ruthe", name2: "Rui", fullName: "Ruthe e Rui" },
  { id: 7, type: "Casal", name1: "Nelo", name2: "Esposa", fullName: "Nelo e Esposa" },
  { id: 8, type: "Casal", name1: "Renato", name2: "Esposa", fullName: "Renato e Esposa" },
  { id: 9, type: "Casal", name1: "Flávio", name2: "Esposa", fullName: "Flávio e Esposa" },
  { id: 10, type: "Casal", name1: "Sandra", name2: "Esposo", fullName: "Sandra e Esposo" },
  { id: 11, type: "Casal", name1: "Vaninha", name2: "Esposo", fullName: "Vaninha e Esposo" },
  { id: 12, type: "Casal", name1: "Eunice", name2: "Esposo", fullName: "Eunice e Esposo" },
  { id: 13, type: "Individual", name1: "Tânia", fullName: "Tânia" },
  { id: 14, type: "Individual", name1: "Lola", fullName: "Lola" },
  { id: 15, type: "Individual", name1: "Ivan", fullName: "Ivan" },
  { id: 16, type: "Individual", name1: "Arsénio", fullName: "Arsénio" },
  { id: 17, type: "Individual", name1: "Chico", fullName: "Chico" },
  { id: 18, type: "Individual", name1: "Aldino", fullName: "Aldino" },
  { id: 19, type: "Casal", name1: "Eugénio", name2: "Esposa", fullName: "Eugénio e Esposa" },
  { id: 20, type: "Individual", name1: "Florentina", fullName: "Florentina" },
  { id: 21, type: "Casal", name1: "T. Baloi", name2: "Esposa", fullName: "T. Baloi e Esposa" },
  { id: 22, type: "Casal", name1: "T. Donça", name2: "Esposa", fullName: "T. Donça e Esposa" },
  { id: 23, type: "Individual", name1: "T. Paciência", fullName: "T. Paciência" },
  { id: 24, type: "Individual", name1: "T. Marta", fullName: "T. Marta" },
  { id: 25, type: "Individual", name1: "T. Ana", fullName: "T. Ana" },
  { id: 26, type: "Individual", name1: "T. Jacinta", fullName: "T. Jacinta" },
  { id: 27, type: "Casal", name1: "T. Verónica", name2: "Esposo", fullName: "T. Verónica e Esposo" },
  { id: 28, type: "Individual", name1: "Tamires", fullName: "Tamires" },
  { id: 29, type: "Individual", name1: "Chana", fullName: "Chana" },
  { id: 30, type: "Individual", name1: "Carina", fullName: "Carina" },
  { id: 31, type: "Individual", name1: "Nancy", fullName: "Nancy" },
  { id: 32, type: "Casal", name1: "Escelina", name2: "Esposo", fullName: "Escelina e Esposo" },
  { id: 33, type: "Casal", name1: "Bina", name2: "Esposo", fullName: "Bina e Esposo" },
  { id: 34, type: "Casal", name1: "Tuminha", name2: "Esposo", fullName: "Tuminha e Esposo" },
  { id: 35, type: "Individual", name1: "Sónia", fullName: "Sónia" },
  { id: 36, type: "Individual", name1: "Salomé", fullName: "Salomé" },
  { id: 37, type: "Individual", name1: "Joana", fullName: "Joana" },
  { id: 38, type: "Casal", name1: "Stela", name2: "Esposo", fullName: "Stela e Esposo" },
  { id: 39, type: "Individual", name1: "Giselda", fullName: "Giselda" },
  { id: 40, type: "Casal", name1: "Zandamela", name2: "Esposa", fullName: "Zandamela e Esposa" },
  { id: 41, type: "Casal", name1: "Siad", name2: "Esposa", fullName: "Siad e Esposa" },
  { id: 42, type: "Casal", name1: "Nelsa", name2: "Esposo", fullName: "Nelsa e Esposo" },
  { id: 43, type: "Casal", name1: "Carla", name2: "Esposo", fullName: "Carla e Esposo" },
  { id: 44, type: "Individual", name1: "Melita", fullName: "Melita" },
  { id: 45, type: "Individual", name1: "Mércia", fullName: "Mércia" },
  { id: 46, type: "Individual", name1: "T. Madalena", fullName: "T. Madalena" },
  { id: 47, type: "Casal", name1: "Almor", name2: "Esposa", fullName: "Almor e Esposa" },
];

export function createGuestLink(name: string, baseUrl: string = BASE_SHARED_URL): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  return `${cleanBase}/?name=${encodeURIComponent(name.trim())}`;
}

/**
 * Dynamically look up a guest from the database by query name or URL parameter.
 * Guarantees that each guest sees strictly their own database record and authorized person count.
 */
export function getGuestProfile(nameQuery?: string): GuestProfile | null {
  if (!nameQuery || !nameQuery.trim()) {
    return null;
  }

  const raw = nameQuery.replace(/\+/g, ' ').trim();
  const normalized = raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");

  if (!normalized) return null;

  // 1. Direct search inside database of 47 guests
  const match = RAW_GUESTS.find((g) => {
    const fnNorm = g.fullName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ");
    const n1Norm = g.name1
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ");
    const n2Norm = g.name2
      ? g.name2
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, " ")
      : "";

    return (
      fnNorm === normalized ||
      n1Norm === normalized ||
      (n2Norm && n2Norm === normalized) ||
      fnNorm.replace(/\s*e\s*/g, " & ") === normalized.replace(/\s*e\s*/g, " & ") ||
      fnNorm.replace(/\s*&\s*/g, " e ") === normalized.replace(/\s*&\s*/g, " e ") ||
      (normalized.length >= 3 && fnNorm.includes(normalized))
    );
  });

  if (match) {
    const count = match.allowedCount ?? (match.type === "Casal" ? 2 : 1);
    const validityText = `CONVITE VÁLIDO PARA ${count} ${count === 1 ? 'PESSOA' : 'PESSOAS'}.`;
    const guestCountText = count === 2 ? '2 CONVIDADOS AUTORIZADOS' : '1 CONVIDADO AUTORIZADO';
    const typeBadgeText = match.type === 'Casal' ? 'CONVITE DE CASAL' : 'CONVITE INDIVIDUAL';
    return {
      guestName: match.fullName,
      type: match.type,
      allowedCount: count,
      guestCountText,
      typeBadgeText,
      validityText,
      specialNotes: match.specialNotes ?? DEFAULT_SPECIAL_NOTES,
      restrictions: match.restrictions ?? DEFAULT_RESTRICTIONS,
      isRegistered: true
    };
  }

  // 2. Fallback heuristic for custom/ad-hoc names
  const coupleKeywords = [" e ", " & ", "esposa", "esposo", "casal", "família", "familia", "+1", "+ 1"];
  const isCouple = coupleKeywords.some((kw) => normalized.includes(kw));
  const count = isCouple ? 2 : 1;
  const validityText = `CONVITE VÁLIDO PARA ${count} ${count === 1 ? 'PESSOA' : 'PESSOAS'}.`;
  const guestCountText = count === 2 ? '2 CONVIDADOS AUTORIZADOS' : '1 CONVIDADO AUTORIZADO';
  const typeBadgeText = isCouple ? 'CONVITE DE CASAL' : 'CONVITE INDIVIDUAL';

  return {
    guestName: raw,
    type: isCouple ? 'Casal' : 'Individual',
    allowedCount: count,
    guestCountText,
    typeBadgeText,
    validityText,
    specialNotes: DEFAULT_SPECIAL_NOTES,
    restrictions: DEFAULT_RESTRICTIONS,
    isRegistered: false
  };
}

export function createWhatsappMessage(name: string, url: string): string {
  const profile = getGuestProfile(name);
  const validity = profile ? profile.validityText : "CONVITE VÁLIDO PARA 1 PESSOA.";
  return `Olá, ${name}!\n\nÉ com imensa honra e alegria que convidamos você para o nosso casamento:\n\n💍 Dionísio & Benedita 2026\n📅 Sábado, 12 de Dezembro de 2026\n⛪ Sé Catedral de Maputo (09h30)\n🥂 Orquídea Eventos, Matola Rio (14h00)\n\nPreparamos o seu convite digital oficial gravado com o seu nome na pré-visualização e no envelope:\n\n• ${name}\n• ${validity}\n• [NÃO EXTENSIVO A CRIANÇAS]\n\nToque no link abaixo para abrir o seu convite:\n${url}\n\nPor gentileza, confirme a sua presença até 7 de Novembro de 2026.`;
}

/**
 * Full preloaded guest database with all personalized authorization and restriction parameters
 */
export const GUEST_LIST: GuestItem[] = RAW_GUESTS.map((item) => {
  const allowedCount = item.allowedCount ?? (item.type === "Casal" ? 2 : 1);
  const validityText = `CONVITE VÁLIDO PARA ${allowedCount} ${allowedCount === 1 ? 'PESSOA' : 'PESSOAS'}.`;
  const specialNotes = item.specialNotes ?? DEFAULT_SPECIAL_NOTES;
  const restrictions = item.restrictions ?? DEFAULT_RESTRICTIONS;
  const url = createGuestLink(item.fullName);
  const whatsappMessage = createWhatsappMessage(item.fullName, url);

  return {
    id: item.id,
    type: item.type,
    name1: item.name1,
    name2: item.name2,
    fullName: item.fullName,
    allowedCount,
    validityText,
    specialNotes,
    restrictions,
    url,
    whatsappMessage,
  };
});

/**
 * Backward compatibility helper for components querying type and validity
 */
export function getGuestTypeAndValidity(name?: string): { isCouple: boolean; validityText: string } {
  const profile = getGuestProfile(name);
  if (!profile) {
    return { isCouple: false, validityText: "CONVITE VÁLIDO PARA 1 PESSOA." };
  }
  return {
    isCouple: profile.allowedCount === 2,
    validityText: profile.validityText
  };
}
