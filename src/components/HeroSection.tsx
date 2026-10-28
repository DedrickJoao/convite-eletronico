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
      {/* Foto de Fundo Oficial Dionísio & Benedita - Iluminada, radiante e elegante */}
      <img
        src="/assets/aistudio/WhatsApp_Image_2026-10-06_at_3.32.14_PM__1__87c71be1.jpeg"
        alt="Foto Oficial Dionísio & Benedita"
        className="absolute inset-0 w-full h-full object-cover object-[center_top] select-none pointer-events-none brightness-[0.98] contrast-[1.04]"
        referrerPolicy="no-referrer"
      />

      {/* Camada suave para manter o brilho natural da foto com transição harmoniosa */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#0c1626]/45 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full mt-auto">
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
