import { useState, useEffect } from 'react';
import BackgroundParticles from './components/BackgroundParticles';
import EnvelopeIntro from './components/EnvelopeIntro';
import WelcomeScreen from './components/WelcomeScreen';
import HeroSection from './components/HeroSection';
import BlessingSection from './components/BlessingSection';
import CountdownSection from './components/CountdownSection';
import LoveStorySection from './components/LoveStorySection';
import EventDetailsSection from './components/EventDetailsSection';
import CopoDeAguaSection from './components/CopoDeAguaSection';
import RsvpSection from './components/RsvpSection';
import GuestbookSection from './components/GuestbookSection';
import GiftRegistrySection from './components/GiftRegistrySection';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import ShareModal from './components/ShareModal';
import WeddingTrailerModal from './components/WeddingTrailerModal';
import AdminPinModal from './components/AdminPinModal';
import Footer from './components/Footer';
import { trackActivity, trackLocation } from './services/api';

function parseGuestFromLocation(): string {
  if (typeof window === 'undefined') return 'Belinha e Lucas';
  try {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let guest = params.get('name') || params.get('guest') || params.get('convidado') || params.get('para') || params.get('nome') || params.get('c') || params.get('to');

    if (!guest && window.location.hash) {
      const hash = window.location.hash.replace(/^#\/?/, '');
      const hashQuery = hash.includes('?') ? hash.split('?')[1] : hash;
      const hashParams = new URLSearchParams(hashQuery);
      guest = hashParams.get('name') || hashParams.get('guest') || hashParams.get('convidado') || hashParams.get('para') || hashParams.get('nome');
    }

    if (guest) {
      return decodeURIComponent(guest).replace(/\+/g, ' ').trim();
    }

    const stored = localStorage.getItem('wedding_active_guest');
    if (stored && stored.trim()) {
      return stored.trim();
    }
  } catch {
    // ignore
  }
  return 'Belinha e Lucas';
}

export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [hasEnteredInvitation, setHasEnteredInvitation] = useState(false);
  const [guestName, setGuestName] = useState<string>(parseGuestFromLocation);
  const [ticketId, setTicketId] = useState<string>('DB-2026-VIP-889');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [isAdminPinModalOpen, setIsAdminPinModalOpen] = useState(false);
  
  // Administrator authorization state - only the admin can see and manage the 47 guests list
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const adminParam = params.get('admin') || params.get('gestor') || params.get('adm');
        if (adminParam && ['true', '1', '2026', '1212', 'noivos', 'sim'].includes(adminParam.toLowerCase())) {
          localStorage.setItem('wedding_admin_auth', 'true');
          return true;
        }
        return localStorage.getItem('wedding_admin_auth') === 'true';
      }
    } catch {
      // ignore
    }
    return false;
  });

  const handleSelectGuest = (name: string) => {
    setGuestName(name);
    try {
      localStorage.setItem('wedding_active_guest', name);
      const url = new URL(window.location.href);
      url.searchParams.set('name', name);
      window.history.replaceState({}, '', url.toString());
      document.title = `Convite de Casamento • ${name} | Dionísio & Benedita 2026`;
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // Parse guest parameter from URL if provided (e.g. ?name=Belinha+e+Lucas)
    try {
      const parsed = parseGuestFromLocation();
      if (parsed) {
        setGuestName(parsed);
        document.title = `Convite de Casamento • ${parsed} | Dionísio & Benedita 2026`;
      }

      // Check admin parameter
      const params = new URLSearchParams(window.location.search);
      const adminParam = params.get('admin') || params.get('gestor') || params.get('adm');
      if (adminParam && ['true', '1', '2026', '1212', 'noivos', 'sim'].includes(adminParam.toLowerCase())) {
        setIsAdmin(true);
        localStorage.setItem('wedding_admin_auth', 'true');
      }
    } catch {
      // ignore
    }

    // Initial background telemetry for visitor activity and geographic ping
    trackActivity({
      type: 'page_view',
      description: 'Convidado acessou ao aplicativo de convite.'
    });

    trackLocation({
      city: 'Maputo',
      country: 'Moçambique',
      source: 'app_initial_session'
    });
  }, []);

  const handleOpenRsvp = () => {
    trackActivity({
      type: 'scroll_to_rsvp',
      description: 'Convidado navegou para o formulário de confirmação de presença.'
    });
    const el = document.getElementById('rsvp');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRsvpSuccess = (name: string, newTicketId: string) => {
    setGuestName(name);
    setTicketId(newTicketId);
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpened(true);
    trackActivity({
      type: 'envelope_opened',
      description: 'Convidado abriu o selo de cera dourado do envelope digital.'
    });
  };

  const handleEnterInvitation = () => {
    setHasEnteredInvitation(true);
    trackActivity({
      type: 'invitation_entered',
      description: 'Convidado iniciou a navegação pelo convite oficial.'
    });
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpened(false);
    setHasEnteredInvitation(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    localStorage.setItem('wedding_admin_auth', 'true');
    setIsAdminPinModalOpen(false);
    setIsShareModalOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('wedding_admin_auth');
    setIsShareModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#dfe6ec] text-[#162842] selection:bg-[#c69c4e]/30 selection:text-[#162842] font-montserrat antialiased bg-watercolor-luxury">
      {/* Floating Admin Quick Bar - ONLY visible to authenticated administrator */}
      {isAdmin && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 bg-[#162842]/95 backdrop-blur-md border border-[#c69c4e] shadow-2xl px-4 py-1.5 rounded-full flex items-center gap-2.5 text-xs font-montserrat text-white animate-in fade-in slide-in-from-top-4">
          <span className="flex items-center gap-1.5 font-bold text-[#f5d78e]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Admin Activo
          </span>
          <div className="h-3.5 w-px bg-white/20" />
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-3 py-1 rounded-full bg-[#c69c4e] hover:bg-[#b58b3d] text-[#162842] font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer text-[11px]"
          >
            <span>Gerir 47 Convites</span>
          </button>
          <button
            onClick={handleAdminLogout}
            className="text-white/60 hover:text-rose-300 transition-colors cursor-pointer text-[11px]"
            title="Sair do modo administrador"
          >
            Sair
          </button>
        </div>
      )}

      {/* 1. Envelope Inicial Fechado */}
      {!isEnvelopeOpened && (
        <EnvelopeIntro
          guestName={guestName}
          onOpen={handleOpenEnvelope}
          onSelectGuest={handleSelectGuest}
        />
      )}

      {/* 2. Página de Transição com Monograma dos Noivos, Citação Bíblica e Botão 'VER CONVITE' */}
      {isEnvelopeOpened && !hasEnteredInvitation && (
        <WelcomeScreen
          onEnterInvitation={handleEnterInvitation}
        />
      )}

      {/* Floating Gold & Crystal Ambient Particle Canvas */}
      <BackgroundParticles />

      {/* 3. Convite Completo Oficial */}
      <div className={`transition-opacity duration-1000 ${hasEnteredInvitation ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        <main className="relative z-10">
          {/* Hero Section with Official Save The Date Card & Trailer CTA */}
          <HeroSection
            guestName={guestName}
            onOpenRsvp={handleOpenRsvp}
            onOpenTrailer={() => setIsTrailerModalOpen(true)}
          />

          {/* Parents' Blessing Section */}
          <BlessingSection />

          {/* Official Wedding Countdown Clock */}
          <CountdownSection />

          {/* Love Story & Romantic Journey */}
          <LoveStorySection />

          {/* Ceremony & Banquet Details */}
          <EventDetailsSection />

          {/* Copo de Água */}
          <CopoDeAguaSection />

          {/* RSVP Section with WhatsApp & In-App Form */}
          <RsvpSection
            initialGuestName={guestName}
            onSuccessSubmit={handleRsvpSuccess}
          />

          {/* Live Guestbook: Mural de Mensagens & Votos (MongoDB) */}
          <GuestbookSection />

          {/* Gift Registry & Instant Mobile / Bank Transfer */}
          <GiftRegistrySection />
        </main>

        {/* Footer */}
        <Footer
          onReopenEnvelope={handleReopenEnvelope}
          onOpenRsvp={handleOpenRsvp}
          onOpenShare={() => setIsShareModalOpen(true)}
          isAdmin={isAdmin}
          onAdminLogout={handleAdminLogout}
          onSecretAdminTrigger={() => setIsAdminPinModalOpen(true)}
        />

        {/* Floating Sound Controller (Mute / Unmute Shania Twain - From This Moment On) */}
        <FloatingMusicPlayer />

        {/* Share & Personalized Link Generator Modal (Admin Only) */}
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          isAdmin={isAdmin}
          onSelectGuest={(name) => {
            handleSelectGuest(name);
            setIsShareModalOpen(false);
            setIsEnvelopeOpened(false);
            setHasEnteredInvitation(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Admin PIN Login Modal */}
        <AdminPinModal
          isOpen={isAdminPinModalOpen}
          onClose={() => setIsAdminPinModalOpen(false)}
          onSuccess={handleAdminLoginSuccess}
        />

        {/* Cinematic Wedding Trailer Experience Modal */}
        <WeddingTrailerModal
          isOpen={isTrailerModalOpen}
          onClose={() => setIsTrailerModalOpen(false)}
          onOpenRsvp={handleOpenRsvp}
        />
      </div>
    </div>
  );
}
