import { useState } from 'react';
import { Crown, ChevronUp, Share2, LogOut } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';

interface FooterProps {
  onReopenEnvelope: () => void;
  onOpenRsvp: () => void;
  onOpenShare?: () => void;
  isAdmin?: boolean;
  onAdminLogout?: () => void;
  onSecretAdminTrigger?: () => void;
}

export default function Footer({ 
  onReopenEnvelope, 
  onOpenShare,
  isAdmin = false,
  onAdminLogout,
  onSecretAdminTrigger
}: FooterProps) {
  const [clickCount, setClickCount] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSecretCrownClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) {
      setClickCount(0);
      onSecretAdminTrigger?.();
    }
  };

  return (
    <footer className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#c69c4e]/30 bg-gradient-to-b from-[#e4ecf3] via-[#dce5ed] to-[#d0dbe4] overflow-hidden text-center">
      
      {/* Background Ornament */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[radial-gradient(circle,rgba(198,156,78,0.2)_0%,transparent_70%)] pointer-events-none blur-xl" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        
        {/* Monogram Badge */}
        <div className="flex flex-col items-center">
          <button 
            type="button"
            onClick={handleSecretCrownClick}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#946d05] via-[#c69c4e] to-[#e0be7a] p-0.5 shadow-[0_0_25px_rgba(198,156,78,0.3)] mb-3 cursor-default active:scale-95 transition-transform"
            aria-label="Monograma Real dos Noivos"
          >
            <div className="w-full h-full rounded-full bg-[#162842] flex items-center justify-center">
              <Crown className="w-7 h-7 text-[#c69c4e]" />
            </div>
          </button>

          <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-[#162842] tracking-widest">
            {WEDDING_DETAILS.groom} & {WEDDING_DETAILS.bride}
          </h3>
        </div>

        {/* Date and Hashtag */}
        <div className="space-y-1 text-xs font-montserrat text-[#162842] uppercase tracking-widest font-bold">
          <p className="text-[#162842] font-extrabold">{WEDDING_DETAILS.dateText} • Maputo, Moçambique</p>
          <p className="text-[#c69c4e] font-mono tracking-wider font-extrabold">{WEDDING_DETAILS.hashtag}</p>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-[#c69c4e]/30 text-xs font-montserrat">
          <button
            onClick={onReopenEnvelope}
            className="px-5 py-2.5 rounded-full bg-white border border-[#c69c4e]/50 hover:border-[#c69c4e] text-[#162842] font-bold transition-colors shadow-sm cursor-pointer"
          >
            Reabrir Envelope
          </button>

          {/* ADMIN ONLY CONTROLS - Never rendered for regular guests */}
          {isAdmin && onOpenShare && (
            <button
              onClick={onOpenShare}
              className="px-5 py-2.5 rounded-full bg-[#162842] text-[#f5d78e] border border-[#c69c4e] hover:bg-[#0c1626] font-bold transition-all shadow-sm cursor-pointer flex items-center gap-2 hover:scale-105"
            >
              <Share2 className="w-4 h-4 text-[#c69c4e]" />
              <span>Gerir 47 Convites & WhatsApp (Admin)</span>
            </button>
          )}

          {isAdmin && onAdminLogout && (
            <button
              onClick={onAdminLogout}
              className="px-4 py-2.5 rounded-full bg-white/80 hover:bg-white text-rose-700 border border-rose-300 font-semibold transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
              title="Sair do modo administrador"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair do Admin</span>
            </button>
          )}

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-white border border-[#c69c4e]/50 hover:border-[#c69c4e] text-[#162842] hover:text-[#c69c4e] transition-colors shadow-sm cursor-pointer"
            title="Voltar ao Topo"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 text-xs font-montserrat text-[#162842]/80 font-semibold">
          <p>Convite Digital Oficial • O Grande Casamento de 2026 • Maputo, Moçambique</p>
        </div>

      </div>
    </footer>
  );
}
