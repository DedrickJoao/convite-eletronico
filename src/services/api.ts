// Frontend API Client for MongoDB Backend, Blockchain & Activity Tracking

export interface RsvpPayload {
  guestName: string;
  phone: string;
  attending: 'yes' | 'no';
  email?: string;
  totalGuests?: number;
  accompanyingNames?: string;
  messageToCouple?: string;
  notificationTarget?: string;
}

export interface BlockchainBlock {
  index: number;
  timestamp: string;
  data: any;
  previousHash: string;
  hash: string;
  nonce: number;
  validator: string;
}

export interface ActivityPayload {
  type: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface LocationPayload {
  ticketId?: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  country?: string;
  accuracy?: number;
  source?: string;
}

export async function submitRsvp(payload: RsvpPayload) {
  const res = await fetch('/api/rsvps', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Falha ao confirmar presença no servidor');
  }
  return res.json();
}

export async function fetchRsvps() {
  const res = await fetch('/api/rsvps');
  if (!res.ok) throw new Error('Falha ao obter lista de presenças');
  return res.json();
}

export async function trackActivity(payload: ActivityPayload) {
  try {
    await fetch('/api/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    // Non-blocking background telemetry
    console.debug('Activity tracking ping:', err);
  }
}

export async function trackLocation(payload: LocationPayload) {
  try {
    await fetch('/api/location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.debug('Location ping:', err);
  }
}

export async function fetchBlockchainLedger() {
  const res = await fetch('/api/blockchain/ledger');
  if (!res.ok) throw new Error('Falha ao carregar cadeia blockchain');
  return res.json();
}

export async function verifyBlockchainTicket(ticketId: string) {
  const res = await fetch(`/api/blockchain/verify/${encodeURIComponent(ticketId)}`);
  if (!res.ok) throw new Error('Falha ao auditar ticket na blockchain');
  return res.json();
}

export async function fetchMessages() {
  const res = await fetch('/api/messages');
  if (!res.ok) throw new Error('Falha ao obter mensagens');
  return res.json();
}

export async function submitMessage(guestName: string, message: string) {
  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guestName, message })
  });
  if (!res.ok) throw new Error('Falha ao enviar mensagem');
  return res.json();
}

export async function likeMessage(id: string) {
  const res = await fetch(`/api/messages/${encodeURIComponent(id)}/like`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error('Falha ao curtir mensagem');
  return res.json();
}

export async function fetchSystemStatus() {
  const res = await fetch('/api/status');
  if (!res.ok) throw new Error('Falha ao consultar estado do servidor');
  return res.json();
}

export async function fetchActivityLogs() {
  const res = await fetch('/api/activity');
  if (!res.ok) throw new Error('Falha ao obter histórico de atividades');
  return res.json();
}

export async function fetchLocationPings() {
  const res = await fetch('/api/location');
  if (!res.ok) throw new Error('Falha ao obter registo de localizações');
  return res.json();
}
