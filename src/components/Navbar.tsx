import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Clapperboard } from 'lucide-react';
import { weddingAudio } from '../utils/audioSynth';
import { WEDDING_DETAILS } from '../data/weddingData';

interface NavbarProps {
  onOpenTrailer: () => void;
  onReopenEnvelope: () => void;
  onOpenRsvp?: () => void;
  onOpenShare?: () => void;
}

export default function Navbar({
  onOpenTrailer,
  onReopenEnvelope
}: NavbarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: 'Programa', href: '#detalhes' },
    { name: 'Copo de Água', href: '#copo-de-agua' },
    { name: 'Mural de Votos', href: '#mural' },
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
          ? 'bg-[#dfe6ec]/95 backdrop-blur-xl border-b border-[#c69c4e]/40 py-2.5 shadow-[0_4px_20px_rgba(22,40,66,0.08)]'
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
            <span className="font-cinzel text-sm sm:text-base font-extrabold text-[#162842] tracking-widest block">
              {WEDDING_DETAILS.groom} & {WEDDING_DETAILS.bride}
            </span>
            <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-[#c69c4e] font-bold block">
              12 • 12 • 2026 • Maputo
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-montserrat text-xs tracking-wider text-[#162842] hover:text-[#c69c4e] font-bold transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#c69c4e] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Clean, Essential Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Trailer Button */}
          <button
            id="nav-trailer-btn"
            onClick={onOpenTrailer}
            className="px-3.5 py-1.5 rounded-full bg-[#162842] hover:bg-[#162842]/90 border border-[#c69c4e] text-xs font-montserrat font-bold text-[#c69c4e] flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            title="Assistir Trailer do Casamento"
          >
            <Clapperboard className="w-3.5 h-3.5 text-[#c69c4e] animate-pulse" />
            <span className="hidden sm:inline">Trailer Oficial</span>
          </button>

          {/* Music Audio Toggle Button */}
          <button
            id="music-toggle-btn"
            onClick={toggleMusic}
            title={isPlaying ? 'Pausar melodia ambiente' : 'Tocar melodia ambiente'}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-full border transition-all flex items-center gap-1.5 text-xs font-montserrat cursor-pointer ${
              isPlaying
                ? 'border-[#c69c4e] bg-[#c69c4e]/25 text-[#162842] shadow-[0_0_15px_rgba(198,156,78,0.3)] font-bold'
                : 'border-[#c69c4e]/40 bg-white/80 text-[#162842] hover:bg-white hover:border-[#c69c4e] font-semibold'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-[#c69c4e] animate-pulse" />
                <span className="hidden md:inline">Som Ativo</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#162842]" />
                <span className="hidden md:inline">Música</span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#162842] hover:text-[#c69c4e] focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#dfe6ec]/98 backdrop-blur-2xl border-b border-[#c69c4e]/40 px-6 py-6 shadow-2xl animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-montserrat text-sm tracking-wide text-[#162842] hover:text-[#c69c4e] py-2 border-b border-[#c69c4e]/20 flex items-center justify-between font-bold"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#c69c4e] font-bold">→</span>
              </a>
            ))}
            
            <div className="pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrailer();
                }}
                className="w-full py-2.5 rounded-xl bg-[#162842] font-montserrat text-xs font-bold text-[#c69c4e] flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Clapperboard className="w-4 h-4 text-[#c69c4e]" />
                <span>Assistir ao Trailer Oficial</span>
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReopenEnvelope();
                }}
                className="w-full py-2 rounded-xl text-center text-xs font-semibold text-[#162842]/80 hover:text-[#162842] cursor-pointer"
              >
                Rever Abertura do Envelope
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
