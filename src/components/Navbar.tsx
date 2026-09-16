import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Share2, CalendarPlus, QrCode, Menu, X, Sparkles, Heart } from 'lucide-react';
import { weddingAudio } from '../utils/audioSynth';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { WEDDING_DETAILS } from '../data/weddingData';

interface NavbarProps {
  onOpenRsvp: () => void;
  onOpenShare: () => void;
  onOpenNfcPass: () => void;
  onReopenEnvelope: () => void;
}

export default function Navbar({
  onOpenRsvp,
  onOpenShare,
  onOpenNfcPass,
  onReopenEnvelope
}: NavbarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    const playing = weddingAudio.toggle();
    setIsPlaying(playing);
  };

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Nossa História', href: '#historia' },
    { name: 'Cerimónia & Recepção', href: '#detalhes' },
    { name: 'Roteiro Real', href: '#roteiro' },
    { name: 'Traje', href: '#dress-code' },
    { name: 'Música', href: '#playlist' },
    { name: 'Localização', href: '#localizacao' },
    { name: 'Presentes', href: '#presentes' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0b0c10]/85 backdrop-blur-xl border-b border-[#d4af37]/20 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Monogram Brand */}
        <a
          href="#inicio"
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#997316] via-[#d4af37] to-[#f5d77f] p-0.5 shadow-[0_0_12px_rgba(212,175,55,0.4)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#0d0f17] flex items-center justify-center">
              <span className="font-cinzel text-xs font-bold gold-gradient-text tracking-widest">
                BD
              </span>
            </div>
          </div>
          <div>
            <span className="font-cinzel text-sm sm:text-base font-bold gold-gradient-text tracking-widest block">
              {WEDDING_DETAILS.bride} & {WEDDING_DETAILS.groom}
            </span>
            <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-[#d4af37]/80 block">
              12 • 12 • 2026
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-montserrat text-xs tracking-wider text-gray-300 hover:text-[#f5d77f] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Music Player Button */}
          <button
            id="music-toggle-btn"
            onClick={toggleMusic}
            title={isPlaying ? 'Pausar melodia ambiente' : 'Tocar melodia ambiente'}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-full border transition-all flex items-center gap-1.5 text-xs font-montserrat ${
              isPlaying
                ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#f5d77f] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'border-white/15 bg-white/5 text-gray-400 hover:text-white hover:border-[#d4af37]/40'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-[#d4af37] animate-pulse" />
                <span className="hidden sm:inline">Música On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline">Tocar Som</span>
              </>
            )}
          </button>

          {/* Calendar Add Dropdown */}
          <div className="relative">
            <button
              id="calendar-menu-btn"
              onClick={() => setShowCalendarMenu(!showCalendarMenu)}
              title="Salvar na Agenda"
              className="p-2 sm:px-3 sm:py-1.5 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#f5d77f] hover:bg-[#d4af37]/25 transition-all flex items-center gap-1.5 text-xs font-montserrat"
            >
              <CalendarPlus className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden md:inline">Salvar Data</span>
            </button>

            {showCalendarMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl crystal-card p-2 border border-[#d4af37]/40 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <p className="px-3 py-1.5 text-[11px] font-montserrat uppercase tracking-wider text-[#d4af37] font-semibold">
                  Adicionar ao Calendário
                </p>
                <div className="h-[1px] bg-white/10 my-1" />
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowCalendarMenu(false)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-montserrat text-gray-200 hover:bg-[#d4af37]/20 hover:text-[#f5d77f] flex items-center justify-between transition-colors"
                >
                  <span>Google Calendar</span>
                  <span className="text-[10px] text-[#d4af37]">Abrir ↗</span>
                </a>
                <button
                  onClick={() => {
                    downloadIcsFile();
                    setShowCalendarMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-montserrat text-gray-200 hover:bg-[#d4af37]/20 hover:text-[#f5d77f] flex items-center justify-between transition-colors"
                >
                  <span>Apple / Outlook (iCal)</span>
                  <span className="text-[10px] text-[#d4af37]">Baixar .ics</span>
                </button>
              </div>
            )}
          </div>

          {/* VIP Pass Shortcut */}
          <button
            id="nav-nfc-pass-btn"
            onClick={onOpenNfcPass}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:border-[#d4af37]/50 text-xs font-montserrat text-gray-200 hover:text-white transition-all"
            title="Cartão VIP NFC"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Pass VIP</span>
          </button>

          {/* RSVP Primary CTA */}
          <button
            id="nav-rsvp-btn"
            onClick={onOpenRsvp}
            className="px-3.5 sm:px-4 py-1.5 rounded-full gold-button font-montserrat text-xs font-semibold tracking-wider flex items-center gap-1.5 uppercase"
          >
            <Heart className="w-3.5 h-3.5 fill-black" />
            <span>RSVP</span>
          </button>

          {/* Share Button */}
          <button
            id="nav-share-btn"
            onClick={onOpenShare}
            title="Compartilhar Convite"
            className="p-2 rounded-full border border-white/15 bg-white/5 hover:bg-[#d4af37]/20 hover:border-[#d4af37]/40 text-gray-300 hover:text-[#f5d77f] transition-all"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-gray-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0a0c12]/95 backdrop-blur-2xl border-b border-[#d4af37]/30 px-6 py-6 shadow-2xl animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-montserrat text-sm tracking-wide text-gray-300 hover:text-[#f5d77f] py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#d4af37]">→</span>
              </a>
            ))}
            
            <div className="pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNfcPass();
                }}
                className="w-full py-2.5 rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10 font-montserrat text-xs font-semibold text-[#f5d77f] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Visualizar Pass Digital NFC & Check-in</span>
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReopenEnvelope();
                }}
                className="w-full py-2 rounded-xl text-center text-xs text-gray-400 hover:text-white"
              >
                Rever Abertura do Envelope Real
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
