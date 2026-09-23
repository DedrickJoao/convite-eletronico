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
          ? 'bg-[#dfe6ec]/90 backdrop-blur-xl border-b border-[#c69c4e]/30 py-2.5 shadow-[0_4px_20px_rgba(22,40,66,0.08)]'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Monogram Brand */}
        <a
          href="#inicio"
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#997316] via-[#c69c4e] to-[#e0be7a] p-0.5 shadow-[0_0_12px_rgba(198,156,78,0.4)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#162842] flex items-center justify-center">
              <span className="font-cinzel text-xs font-bold text-[#c69c4e] tracking-widest">
                DB
              </span>
            </div>
          </div>
          <div>
            <span className="font-cinzel text-sm sm:text-base font-bold text-[#162842] tracking-widest block">
              {WEDDING_DETAILS.groom} & {WEDDING_DETAILS.bride}
            </span>
            <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-[#c69c4e] font-semibold block">
              12 • 12 • 2026 • Maputo
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-montserrat text-xs tracking-wider text-[#162842]/90 hover:text-[#c69c4e] font-medium transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#c69c4e] hover:after:w-full after:transition-all"
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
                ? 'border-[#c69c4e] bg-[#c69c4e]/20 text-[#162842] shadow-[0_0_15px_rgba(198,156,78,0.3)] font-semibold'
                : 'border-[#c69c4e]/30 bg-white/70 text-[#162842] hover:bg-white hover:border-[#c69c4e]'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-[#c69c4e] animate-pulse" />
                <span className="hidden sm:inline">Música On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#162842]" />
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
              className="p-2 sm:px-3 sm:py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 text-[#162842] hover:bg-white hover:border-[#c69c4e] shadow-sm transition-all flex items-center gap-1.5 text-xs font-montserrat font-medium"
            >
              <CalendarPlus className="w-4 h-4 text-[#c69c4e]" />
              <span className="hidden md:inline">Salvar Data</span>
            </button>

            {showCalendarMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl crystal-card p-2 border border-[#c69c4e]/40 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 bg-white">
                <p className="px-3 py-1.5 text-[11px] font-montserrat uppercase tracking-wider text-[#c69c4e] font-bold">
                  Adicionar ao Calendário
                </p>
                <div className="h-[1px] bg-[#dfe6ec] my-1" />
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowCalendarMenu(false)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-montserrat text-[#162842] hover:bg-[#dfe6ec] hover:text-[#c69c4e] flex items-center justify-between transition-colors font-medium"
                >
                  <span>Google Calendar</span>
                  <span className="text-[10px] text-[#c69c4e] font-bold">Abrir ↗</span>
                </a>
                <button
                  onClick={() => {
                    downloadIcsFile();
                    setShowCalendarMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-montserrat text-[#162842] hover:bg-[#dfe6ec] hover:text-[#c69c4e] flex items-center justify-between transition-colors font-medium"
                >
                  <span>Apple / Outlook (iCal)</span>
                  <span className="text-[10px] text-[#c69c4e] font-bold">Baixar .ics</span>
                </button>
              </div>
            )}
          </div>

          {/* VIP Pass Shortcut */}
          <button
            id="nav-nfc-pass-btn"
            onClick={onOpenNfcPass}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c69c4e]/40 bg-white/80 hover:bg-white text-xs font-montserrat text-[#162842] hover:text-[#c69c4e] transition-all font-medium"
            title="Cartão VIP NFC"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c69c4e]" />
            <span>Pass VIP</span>
          </button>

          {/* RSVP Primary CTA */}
          <button
            id="nav-rsvp-btn"
            onClick={onOpenRsvp}
            className="px-3.5 sm:px-4 py-1.5 rounded-full gold-button font-montserrat text-xs font-bold tracking-wider flex items-center gap-1.5 uppercase"
          >
            <Heart className="w-3.5 h-3.5 fill-white text-white" />
            <span>RSVP</span>
          </button>

          {/* Share Button */}
          <button
            id="nav-share-btn"
            onClick={onOpenShare}
            title="Compartilhar Convite"
            className="p-2 rounded-full border border-[#c69c4e]/40 bg-white/80 hover:bg-white text-[#162842] hover:text-[#c69c4e] transition-all shadow-sm"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#162842] hover:text-[#c69c4e] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#dfe6ec]/98 backdrop-blur-2xl border-b border-[#c69c4e]/30 px-6 py-6 shadow-2xl animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-montserrat text-sm tracking-wide text-[#162842] hover:text-[#c69c4e] py-2 border-b border-[#c69c4e]/20 flex items-center justify-between font-medium"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#c69c4e] font-bold">→</span>
              </a>
            ))}
            
            <div className="pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNfcPass();
                }}
                className="w-full py-2.5 rounded-xl border border-[#c69c4e]/40 bg-white/80 font-montserrat text-xs font-semibold text-[#162842] flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#c69c4e]" />
                <span>Visualizar Pass Digital NFC & Check-in</span>
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReopenEnvelope();
                }}
                className="w-full py-2 rounded-xl text-center text-xs text-[#162842]/70 hover:text-[#162842]"
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
