import { useState, useEffect } from 'react';
import BackgroundParticles from './components/BackgroundParticles';
import EnvelopeIntro from './components/EnvelopeIntro';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LoveStorySection from './components/LoveStorySection';
import EventDetailsSection from './components/EventDetailsSection';
import TimelineSection from './components/TimelineSection';
import NfcPassSection from './components/NfcPassSection';
import RsvpSection from './components/RsvpSection';
import PlaylistSection from './components/PlaylistSection';
import DressCodeSection from './components/DressCodeSection';
import LocationAndMapSection from './components/LocationAndMapSection';
import GiftRegistrySection from './components/GiftRegistrySection';
import ShareModal from './components/ShareModal';
import Footer from './components/Footer';

export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [guestName, setGuestName] = useState<string>('');
  const [ticketId, setTicketId] = useState<string>('BD-2026-VIP-889');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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

  const handleOpenNfcPass = () => {
    const el = document.getElementById('nfc-pass');
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
    <div className="relative min-h-screen bg-[#07080b] text-[#f3f4f6] selection:bg-[#d4af37]/30 selection:text-[#fef9e7] font-montserrat antialiased">
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
          onOpenNfcPass={handleOpenNfcPass}
          onReopenEnvelope={handleReopenEnvelope}
        />

        <main className="relative z-10">
          {/* Hero Section */}
          <HeroSection
            guestName={guestName}
            onOpenRsvp={handleOpenRsvp}
            onOpenNfcPass={handleOpenNfcPass}
          />

          {/* Love Story & Romantic Journey */}
          <LoveStorySection />

          {/* Ceremony & Banquet Details */}
          <EventDetailsSection />

          {/* Timeline of the Day */}
          <TimelineSection />

          {/* VIP Smart Pass & NFC Check-in Card */}
          <NfcPassSection
            guestName={guestName || "Convidado(a) de Honra"}
            ticketId={ticketId}
          />

          {/* RSVP Section with Dynamic QR & Form */}
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

          {/* Gift Registry & Instant Bank Transfer */}
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
      </div>
    </div>
  );
}
