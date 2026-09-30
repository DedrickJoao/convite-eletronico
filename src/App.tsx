import { useState, useEffect } from 'react';
import BackgroundParticles from './components/BackgroundParticles';
import EnvelopeIntro from './components/EnvelopeIntro';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LoveStorySection from './components/LoveStorySection';
import EventDetailsSection from './components/EventDetailsSection';
import TimelineSection from './components/TimelineSection';
import GuestbookSection from './components/GuestbookSection';
import RsvpSection from './components/RsvpSection';
import PlaylistSection from './components/PlaylistSection';
import DressCodeSection from './components/DressCodeSection';
import LocationAndMapSection from './components/LocationAndMapSection';
import GiftRegistrySection from './components/GiftRegistrySection';
import ShareModal from './components/ShareModal';
import WeddingTrailerModal from './components/WeddingTrailerModal';
import Footer from './components/Footer';

export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#dfe6ec] text-[#162842] selection:bg-[#c69c4e]/30 selection:text-[#162842] font-montserrat antialiased bg-watercolor-luxury">
      {/* Interactive Royal Envelope Intro */}
      {!isEnvelopeOpened && (
        <EnvelopeIntro
          guestName={guestName}
          onOpen={() => setIsEnvelopeOpened(true)}
        />
      )}

      {/* Floating Gold & Crystal Ambient Particle Canvas */}
      <BackgroundParticles />

      {/* Main Luxury Invitation Container */}
      <div className={`transition-opacity duration-1000 ${isEnvelopeOpened ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Navigation Bar */}
        <Navbar
          onOpenRsvp={handleOpenRsvp}
          onOpenShare={() => setIsShareModalOpen(true)}
          onOpenTrailer={() => setIsTrailerModalOpen(true)}
          onReopenEnvelope={handleReopenEnvelope}
        />

        <main className="relative z-10">
          {/* Hero Section with Official Save The Date Card & Trailer CTA */}
          <HeroSection
            guestName={guestName}
            onOpenRsvp={handleOpenRsvp}
            onOpenTrailer={() => setIsTrailerModalOpen(true)}
          />

          {/* Love Story & Romantic Journey */}
          <LoveStorySection />

          {/* Ceremony & Banquet Details */}
          <EventDetailsSection />

          {/* Timeline of the Day */}
          <TimelineSection />

          {/* Interactive Guestbook & Message Wall */}
          <GuestbookSection />

          {/* RSVP Section with Dynamic QR, WhatsApp & In-App Form */}
          <RsvpSection
            initialGuestName={guestName}
            onSuccessSubmit={handleRsvpSuccess}
          />

          {/* Custom Curated Wedding Playlist */}
          <PlaylistSection />

          {/* Dress Code & Style Guide */}
          <DressCodeSection />

          {/* Location, Palace Details & GPS Navigation */}
          <LocationAndMapSection />

          {/* Gift Registry & Instant Mobile / Bank Transfer */}
          <GiftRegistrySection />
        </main>

        {/* Footer */}
        <Footer
          onReopenEnvelope={handleReopenEnvelope}
          onOpenRsvp={handleOpenRsvp}
        />

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
