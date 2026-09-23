import { Crown, Heart, Sparkles, ChevronUp } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';

interface FooterProps {
  onReopenEnvelope: () => void;
  onOpenRsvp: () => void;
}

export default function Footer({ onReopenEnvelope, onOpenRsvp }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#d4af37]/20 bg-[#06070a] overflow-hidden text-center">
      
      {/* Background Ornament */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none blur-xl" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        
        {/* Monogram Badge */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#946d05] via-[#d4af37] to-[#f5d77f] p-0.5 shadow-[0_0_25px_rgba(212,175,55,0.3)] mb-3">
            <div className="w-full h-full rounded-full bg-[#0b0c10] flex items-center justify-center">
              <Crown className="w-7 h-7 text-[#f5d77f]" />
            </div>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl font-black gold-gradient-text tracking-widest">
            {WEDDING_DETAILS.groom} & {WEDDING_DETAILS.bride}
          </h3>
          
          <p className="font-alex text-2xl sm:text-3xl text-gray-300 mt-1">
            Que falte tudo menos Deus... Para todo o sempre.
          </p>
        </div>

        {/* Date and Hashtag */}
        <div className="space-y-1 text-xs font-montserrat text-gray-400 uppercase tracking-widest">
          <p className="text-[#d4af37] font-semibold">{WEDDING_DETAILS.dateText} • Maputo, Moçambique</p>
          <p className="text-gray-500 font-mono tracking-wider">{WEDDING_DETAILS.hashtag}</p>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-white/5 text-xs font-montserrat">
          <button
            onClick={onOpenRsvp}
            className="px-4 py-2 rounded-full gold-button font-semibold uppercase tracking-wider text-black"
          >
            Confirmar Presença (RSVP)
          </button>
          <button
            onClick={onReopenEnvelope}
            className="px-4 py-2 rounded-full crystal-card border border-white/10 hover:border-[#d4af37]/40 text-gray-300 hover:text-white transition-colors"
          >
            Reabrir Envelope Real
          </button>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full crystal-card border border-white/10 hover:border-[#d4af37]/40 text-gray-400 hover:text-[#f5d77f] transition-colors"
            title="Voltar ao Topo"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 text-[11px] font-montserrat text-gray-400 font-light">
          Convite Digital Oficial • O Melhor Casamento de 2026 • Todos os direitos reservados
        </div>

      </div>
    </footer>
  );
}
