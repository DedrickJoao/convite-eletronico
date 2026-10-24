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
      className="relative min-h-screen flex flex-col items-center justify-end pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
    >
      {/* Foto de Fundo Oficial Dionísio & Benedita - Mais escura e cinematográfica */}
      <img
        src="/assets/aistudio/WhatsApp_Image_2026-10-06_at_3.32.14_PM__1__87c71be1.jpeg"
        alt="Foto Oficial Dionísio & Benedita"
        className="absolute inset-0 w-full h-full object-cover object-[center_top] select-none pointer-events-none brightness-[0.72] contrast-[1.12]"
        referrerPolicy="no-referrer"
      />

      {/* Camada para escurecer a foto com elegância e dar contraste e luz máxima às letras */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1626]/20 via-[#0c1626]/40 to-[#0c1626]/85 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full mt-auto">
        
        {/* ========================================================= */}
        {/* Dizer Único: Que falte tudo menos Deus                   */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl mx-auto p-4 sm:p-6 text-center select-none"
        >
          <p className="font-montserrat text-sm sm:text-base md:text-lg uppercase tracking-[0.22em] sm:tracking-[0.28em] text-white font-extrabold drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] px-4">
            Que falte tudo menos Deus...
          </p>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-4 sm:mt-8 flex flex-col items-center gap-2 text-white"
        >
          <a
            href="#bencao"
            aria-label="Rolar para a Bênção dos Pais"
            className="p-2 sm:p-2.5 rounded-full border border-[#f5d78e]/60 bg-[#0c1626]/70 hover:bg-[#0c1626] text-[#f5d78e] transition-all animate-bounce shadow-md"
          >
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f5d78e]" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
