import { motion } from 'motion/react';
import { Sparkles, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenRsvp?: () => void;
  onOpenTrailer?: () => void;
  guestName?: string;
}

export default function HeroSection({ guestName }: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
    >
      {/* Foto de Fundo Oficial Dionísio & Benedita (ocupando 100% da secção com cores vivas e luminosidade) */}
      <img
        src="/assets/aistudio/WhatsApp_Image_2026-10-06_at_3.32.14_PM__1__87c71be1.jpeg"
        alt="Foto Oficial Dionísio & Benedita"
        className="absolute inset-0 w-full h-full object-cover object-[center_top] sm:object-center select-none pointer-events-none brightness-[1.06] contrast-[1.08]"
        referrerPolicy="no-referrer"
      />

      {/* Camada suave e luminosa para manter perfeita visibilidade da foto e leitura do texto */}
      <div className="absolute inset-0 bg-[#dfe6ec]/40 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
        
        {/* Personalized Guest Welcome Banner */}
        {/* Personalized Guest Welcome Banner */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#c69c4e]/50 bg-white/90 backdrop-blur-md inline-flex items-center gap-2 shadow-md max-w-[90vw]"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c69c4e] shrink-0" />
            <span className="font-montserrat text-xs sm:text-sm tracking-wider text-[#162842] font-semibold truncate">
              Convidado(a) de Honra: <span className="font-bold text-[#c69c4e]">{guestName}</span>
            </span>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* THE OFFICIAL WEDDING INVITATION CARD                      */}
        {/* ========================================================= */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl mx-auto p-4 sm:p-8 text-center select-none"
        >
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Top Heart */}
            <div className="mb-2 sm:mb-3">
              <span className="text-[#c69c4e] text-lg sm:text-xl">♥</span>
            </div>

            {/* Official Invitation Heading Block */}
            <div className="mb-3 sm:mb-4 flex flex-col items-center">
              <span className="font-montserrat text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#c69c4e] font-extrabold mb-1">
                CONVITE OFICIAL
              </span>
              <h1 className="font-cinzel text-2xl sm:text-4xl font-extrabold tracking-[0.2em] text-[#162842] leading-tight drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]">
                CASAMENTO
              </h1>
            </div>

            {/* Ornate Divider */}
            <div className="my-1.5 sm:my-2 text-[#c69c4e] text-xs">
              ❖
            </div>

            {/* Couple Names (DIONÍSIO & BENEDITA) */}
            <div className="my-1 sm:my-2 flex flex-col items-center">
              <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold tracking-[0.18em] sm:tracking-[0.2em] text-[#162842] drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]">
                DIONÍSIO
              </h2>
              
              <div className="flex items-center justify-center my-0.5 sm:my-1 text-[#c69c4e]">
                <span className="font-alex text-2xl sm:text-4xl text-[#c69c4e] font-bold">&amp;</span>
              </div>

              <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold tracking-[0.18em] sm:tracking-[0.2em] text-[#162842] drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]">
                BENEDITA
              </h2>
            </div>

            {/* Ornate Divider */}
            <div className="my-1.5 sm:my-2 text-[#c69c4e] text-xs">
              ❖
            </div>

            {/* Date Block: DEZEMBRO / SÁBADO 12 2026 */}
            <div className="my-1 sm:my-2 flex flex-col items-center">
              <span className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.25em] text-[#162842] font-extrabold mb-1 drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
                DEZEMBRO
              </span>

              <div className="flex items-center justify-center gap-3 sm:gap-6 py-1 my-1">
                <span className="font-montserrat text-xs sm:text-sm uppercase tracking-widest text-[#162842] font-bold drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
                  SÁBADO
                </span>
                <span className="font-cinzel text-3xl sm:text-4xl font-black text-[#c69c4e] drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
                  12
                </span>
                <span className="font-montserrat text-xs sm:text-sm uppercase tracking-widest text-[#162842] font-bold drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
                  2026
                </span>
              </div>
            </div>

            {/* Gold Heart Indicator */}
            <div className="my-1.5 sm:my-2">
              <span className="text-[#c69c4e] text-base">♥</span>
            </div>

            {/* Spiritual Motto / Verse */}
            <p className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.20em] sm:tracking-[0.22em] text-[#162842] font-extrabold my-1 drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)] px-2">
              QUE FALTE TUDO MENOS DEUS...
            </p>

            {/* Bottom Heart & Ornaments */}
            <div className="my-1">
              <span className="text-[#c69c4e] text-xs">♥</span>
            </div>

            <div className="my-1 text-[#c69c4e] text-[10px]">
              ❖
            </div>

          </div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 sm:mt-12 flex flex-col items-center gap-2 text-[#162842]"
        >
          <span className="font-montserrat text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#162842] font-bold drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
            Com a Bênção de Deus e dos Nossos Pais
          </span>
          <a
            href="#bencao"
            aria-label="Rolar para a Bênção dos Pais"
            className="p-2 sm:p-2.5 rounded-full border border-[#c69c4e]/50 bg-white/80 hover:bg-white text-[#162842] hover:text-[#c69c4e] transition-all animate-bounce shadow-sm"
          >
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c69c4e]" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
