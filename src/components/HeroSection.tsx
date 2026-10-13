import { motion } from 'motion/react';
import { Sparkles, Clapperboard, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenRsvp?: () => void;
  onOpenTrailer: () => void;
  guestName?: string;
}

export default function HeroSection({ onOpenTrailer, guestName }: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
    >
      {/* Ambient Watercolor & Subtle Olive/Gold Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(93,107,56,0.12)_0%,rgba(223,230,236,0)_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(198,156,78,0.12)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
        
        {/* Personalized Guest Welcome Banner */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 px-5 py-2 rounded-full border border-[#5d6b38]/50 bg-white/90 backdrop-blur-md inline-flex items-center gap-2 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#5d6b38]" />
            <span className="font-montserrat text-xs sm:text-sm tracking-wider text-[#162842] font-semibold">
              Convidado(a) de Honra: <span className="font-bold text-[#5d6b38]">{guestName}</span>
            </span>
          </motion.div>
        )}

        {/* Cinematic Trailer Action Teaser Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6"
        >
          <button
            onClick={onOpenTrailer}
            className="group px-6 py-2.5 rounded-full bg-[#162842] text-white hover:bg-[#162842]/90 border border-[#5d6b38] flex items-center gap-2.5 shadow-[0_4px_20px_rgba(22,40,66,0.25)] transition-all cursor-pointer transform hover:scale-105"
          >
            <Clapperboard className="w-4 h-4 text-[#c69c4e] animate-pulse" />
            <span className="font-montserrat text-xs sm:text-sm font-bold tracking-widest uppercase text-[#c69c4e] group-hover:text-white transition-colors">
              Assistir ao Trailer Oficial do Casamento
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#5d6b38] text-white text-[10px] font-bold">
              HD 4K
            </span>
          </button>
        </motion.div>

        {/* ========================================================= */}
        {/* THE OFFICIAL WEDDING INVITATION CARD                      */}
        {/* ========================================================= */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl mx-auto rounded-3xl save-the-date-card p-8 sm:p-12 overflow-hidden text-center select-none shadow-[0_25px_60px_rgba(22,40,66,0.18)]"
        >
          {/* Subtle Watercolor & Marble Vein Overlays */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-[radial-gradient(circle,rgba(93,107,56,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[radial-gradient(circle,rgba(198,156,78,0.15)_0%,transparent_70%)] blur-2xl pointer-events-none" />

          {/* Botanical Olive / Wheat Leaves Silhouette - Left Side */}
          <svg
            className="absolute left-2 top-8 w-16 sm:w-24 h-64 sm:h-80 text-[#5d6b38]/30 pointer-events-none"
            viewBox="0 0 100 300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M20 280 Q 40 180 30 20" />
            <path d="M28 220 Q 55 200 48 185 Q 35 195 27 210" />
            <path d="M25 170 Q 60 150 50 135 Q 33 145 24 160" />
            <path d="M25 120 Q 58 100 50 85 Q 35 95 26 110" />
            <path d="M28 70 Q 55 50 48 35 Q 33 45 28 65" />
            <path d="M30 20 Q 38 10 32 0" />
          </svg>

          {/* Botanical Olive Leaves Silhouette - Right Side */}
          <svg
            className="absolute right-2 top-8 w-16 sm:w-24 h-64 sm:h-80 text-[#5d6b38]/30 pointer-events-none scale-x-[-1]"
            viewBox="0 0 100 300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M20 280 Q 40 180 30 20" />
            <path d="M28 220 Q 55 200 48 185 Q 35 195 27 210" />
            <path d="M25 170 Q 60 150 50 135 Q 33 145 24 160" />
            <path d="M25 120 Q 58 100 50 85 Q 35 95 26 110" />
            <path d="M28 70 Q 55 50 48 35 Q 33 45 28 65" />
            <path d="M30 20 Q 38 10 32 0" />
          </svg>

          <div className="relative z-10 flex flex-col items-center">
            
            {/* Top Heart */}
            <div className="mb-3">
              <span className="text-[#5d6b38] text-xl">♥</span>
            </div>

            {/* Official Invitation Heading Block */}
            <div className="mb-4 flex flex-col items-center">
              <span className="font-montserrat text-xs uppercase tracking-[0.3em] text-[#5d6b38] font-extrabold mb-1">
                CONVITE OFICIAL
              </span>
              <h1 className="font-cinzel text-2xl sm:text-4xl font-extrabold tracking-[0.2em] text-[#162842] leading-tight">
                CASAMENTO
              </h1>
            </div>

            {/* Ornate Divider with Diamond Rosette */}
            <div className="flex items-center justify-center gap-3 w-48 sm:w-64 my-3 text-[#5d6b38]">
              <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#5d6b38] to-[#5d6b38]" />
              <span className="text-xs">❖</span>
              <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-[#5d6b38] to-[#5d6b38]" />
            </div>

            {/* Couple Names (DIONÍSIO & BENEDITA) */}
            <div className="my-3 flex flex-col items-center">
              <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold tracking-[0.2em] text-[#162842]">
                DIONÍSIO
              </h2>
              
              <div className="flex items-center justify-center gap-3 my-1 text-[#5d6b38]">
                <div className="h-[1px] w-8 sm:w-12 bg-[#5d6b38]" />
                <span className="font-alex text-2xl sm:text-4xl text-[#5d6b38] font-bold">&amp;</span>
                <div className="h-[1px] w-8 sm:w-12 bg-[#5d6b38]" />
              </div>

              <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold tracking-[0.2em] text-[#162842]">
                BENEDITA
              </h2>
            </div>

            {/* Ornate Divider */}
            <div className="flex items-center justify-center gap-3 w-48 sm:w-64 my-3 text-[#5d6b38]">
              <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#5d6b38] to-[#5d6b38]" />
              <span className="text-xs">❖</span>
              <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-[#5d6b38] to-[#5d6b38]" />
            </div>

            {/* Date Block: DEZEMBRO / SÁBADO | 12 | 2026 */}
            <div className="my-2 flex flex-col items-center">
              <span className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.25em] text-[#162842] font-extrabold mb-1">
                DEZEMBRO
              </span>

              <div className="flex items-center justify-center gap-3 sm:gap-5 py-1.5 border-y-2 border-[#5d6b38]/60 my-1 w-56 sm:w-72">
                <span className="font-montserrat text-xs sm:text-sm uppercase tracking-widest text-[#162842] font-bold">
                  SÁBADO
                </span>
                <div className="h-6 w-[1.5px] bg-[#5d6b38]" />
                <span className="font-cinzel text-3xl sm:text-4xl font-black text-[#5d6b38]">
                  12
                </span>
                <div className="h-6 w-[1.5px] bg-[#5d6b38]" />
                <span className="font-montserrat text-xs sm:text-sm uppercase tracking-widest text-[#162842] font-bold">
                  2026
                </span>
              </div>
            </div>

            {/* Gold Heart Indicator */}
            <div className="my-2">
              <span className="text-[#5d6b38] text-base">♥</span>
            </div>

            {/* Spiritual Motto / Verse */}
            <p className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.22em] text-[#162842] font-extrabold my-1">
              QUE FALTE TUDO MENOS DEUS...
            </p>

            {/* Bottom Heart & Ornaments */}
            <div className="my-1">
              <span className="text-[#5d6b38] text-xs">♥</span>
            </div>

            <div className="flex items-center justify-center gap-3 w-40 sm:w-52 my-1 text-[#5d6b38]">
              <div className="h-[1px] flex-1 bg-[#5d6b38]" />
              <span className="text-[10px]">❖</span>
              <div className="h-[1px] flex-1 bg-[#5d6b38]" />
            </div>

          </div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 flex flex-col items-center gap-2 text-[#162842]"
        >
          <span className="font-montserrat text-[11px] uppercase tracking-[0.25em] text-[#162842] font-bold">
            Com a Bênção de Deus e dos Nossos Pais
          </span>
          <a
            href="#bencao"
            aria-label="Rolar para a Bênção dos Pais"
            className="p-2.5 rounded-full border border-[#5d6b38]/50 bg-white/80 hover:bg-white text-[#162842] hover:text-[#5d6b38] transition-all animate-bounce shadow-sm"
          >
            <ArrowDown className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
