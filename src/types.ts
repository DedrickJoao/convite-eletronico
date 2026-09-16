export interface WeddingEvent {
  title: string;
  time: string;
  location: string;
  address: string;
  description: string;
  iconName: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioUrl?: string;
  spotifyUri?: string;
  coverArt: string;
  vibe: string;
}

export interface RsvpData {
  guestName: string;
  email: string;
  phone: string;
  attending: 'yes' | 'no';
  plusOneCount: number;
  dietaryRestrictions: string;
  specialSongRequest: string;
  messageToCouple: string;
  confirmedAt?: string;
  ticketId?: string;
}

export interface GiftOption {
  id: string;
  title: string;
  category: string;
  amount: string;
  description: string;
  iconName: string;
  popular?: boolean;
}

export interface DressCodePalette {
  name: string;
  colorHex: string;
  description: string;
}
