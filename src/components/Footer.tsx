import { Crown, ChevronUp } from 'lucide-react';
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
    <footer className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#c69c4e]/30 bg-[#dfe6ec] overflow-hidden text-center">
      
      {/* Background Ornament */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[radial-gradient(circle,rgba(198,156,78,0.15)_0%,transparent_70%)] pointer-events-none blur-xl" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        
        {/* Monogram Badge */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#946d05] via-[#c69c4e] to-[#e0be7a] p-0.5 shadow-[0_0_25px_rgba(198,156,78,0.3)] mb-3">
            <div className="w-full h-full rounded-full bg-[#162842] flex items-center justify-center">
              <Crown className="w-7 h-7 text-[#c69c4e]" />
            </div>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-[#162842] tracking-widest">
            {WEDDING_DETAILS.groom} & {WEDDING_DETAILS.bride}
          </h3>
          
          <p className="font-alex text-2xl sm:text-3xl text-[#c69c4e] font-bold mt-1">
            Que falte tudo menos Deus... Para todo o sempre.
          </p>
        </div>

        {/* Date and Hashtag */}
        <div className="space-y-1 text-xs font-montserrat text-[#162842] uppercase tracking-widest font-bold">
          <p className="text-[#162842] font-extrabold">{WEDDING_DETAILS.dateText} • Maputo, Moçambique</p>
          <p className="text-[#c69c4e] font-mono tracking-wider font-extrabold">{WEDDING_DETAILS.hashtag}</p>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-[#c69c4e]/30 text-xs font-montserrat">
          <button
            onClick={onOpenRsvp}
            className="px-5 py-2.5 rounded-full gold-button font-bold uppercase tracking-wider text-white shadow-md cursor-pointer"
          >
            Confirmar Presença (RSVP)
          </button>
          <button
            onClick={onReopenEnvelope}
            className="px-5 py-2.5 rounded-full bg-white border border-[#c69c4e]/50 hover:border-[#c69c4e] text-[#162842] font-bold transition-colors shadow-sm cursor-pointer"
          >
            Reabrir Envelope
          </button>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-white border border-[#c69c4e]/50 hover:border-[#c69c4e] text-[#162842] hover:text-[#c69c4e] transition-colors shadow-sm cursor-pointer"
            title="Voltar ao Topo"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 text-xs font-montserrat text-[#162842]/80 font-semibold">
          Convite Digital Oficial • O Grande Casamento de 2026 • Maputo, Moçambique
        </div>

      </div>
    </footer>
  );
}
