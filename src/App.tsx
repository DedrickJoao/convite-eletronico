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
import GiftRegistrySection from './components/GiftRegistrySection';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import ShareModal from './components/ShareModal';
import WeddingTrailerModal from './components/WeddingTrailerModal';
import Footer from './components/Footer';

export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [hasEnteredInvitation, setHasEnteredInvitation] = useState(false);
  const [guestName, setGuestName] = useState<string>('');
  const [ticketId, setTicketId] = useState<string>('DB-2026-VIP-889');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  useEffect(() => {
    // Parse guest parameter from URL if provided (e.g. ?guest=Família+Sousa)
    try {
      const params = new URLSearchParams(window.location.search);
      const guest = params.get('guest');
      if (guest) {
        setGuestName(decodeURIComponent(guest));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleOpenRsvp = () => {
    const el = document.getElementById('rsvp');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRsvpSuccess = (name: string, newTicketId: string) => {
    setGuestName(name);
    setTicketId(newTicketId);
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpened(false);
    setHasEnteredInvitation(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#dfe6ec] text-[#162842] selection:bg-[#c69c4e]/30 selection:text-[#162842] font-montserrat antialiased bg-watercolor-luxury">
      {/* 1. Envelope Inicial Fechado */}
      {!isEnvelopeOpened && (
        <EnvelopeIntro
          guestName={guestName}
          onOpen={() => setIsEnvelopeOpened(true)}
        />
      )}

      {/* 2. Página de Transição com Monograma dos Noivos, Citação Bíblica e Botão 'VER CONVITE' */}
      {isEnvelopeOpened && !hasEnteredInvitation && (
        <WelcomeScreen
          onEnterInvitation={() => setHasEnteredInvitation(true)}
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

          {/* Gift Registry & Instant Mobile / Bank Transfer */}
          <GiftRegistrySection />
        </main>

        {/* Footer */}
        <Footer
          onReopenEnvelope={handleReopenEnvelope}
          onOpenRsvp={handleOpenRsvp}
        />

        {/* Floating Sound Controller (Mute / Unmute Shania Twain - From This Moment On) */}
        <FloatingMusicPlayer />

        {/* Share & Personalized Link Generator Modal */}
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
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
