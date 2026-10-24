import { motion } from 'motion/react';
import { Heart, ArrowDown } from 'lucide-react';

export default function BlessingSection() {
  return (
    <section 
      id="bencao" 
      className="relative min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-end items-center overflow-hidden border-b border-[#c69c4e]/30 shadow-sm"
    >
      {/* Foto de Fundo Oficial Dionísio & Benedita - Mais escura e cinematográfica */}
      <img
        src="/assets/aistudio/WhatsApp_Image_2026-10-06_at_3.31.28_PM__1__5273d562.jpeg"
        alt="Foto Dionísio & Benedita - Bênção dos Pais"
        className="absolute inset-0 w-full h-full object-cover object-[center_top] select-none pointer-events-none brightness-[0.72] contrast-[1.12]"
        referrerPolicy="no-referrer"
      />

      {/* Camada para escurecer a foto com elegância e dar contraste e luz máxima às letras */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1626]/20 via-[#0c1626]/40 to-[#0c1626]/85 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 w-full mt-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Header Phrase com Luz Dourada */}
          <div className="space-y-1.5 sm:space-y-2">
            <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl italic text-[#f5d78e] font-bold tracking-wide drop-shadow-[0_0_12px_rgba(245,215,142,0.7)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Com a bênção de Deus e dos nossos pais
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#f5d78e] to-transparent mx-auto" />
          </div>

          {/* Vertical Stack: Groom & Parents (letras com luz branca e sombra profunda) */}
          <div className="space-y-0.5 sm:space-y-1">
            <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wider uppercase drop-shadow-[0_2px_14px_rgba(255,255,255,0.4)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Dionísio Jovo
            </h3>
            <p className="font-montserrat text-xs sm:text-sm text-white/80 font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              filho de
            </p>
            <p className="font-cinzel text-base sm:text-xl font-bold text-white tracking-wide flex items-center justify-center gap-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Belarmino Maguduane Jovo
              <Heart className="w-3.5 h-3.5 text-white fill-white inline-block shrink-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            </p>
            <p className="font-montserrat text-[11px] sm:text-xs text-white/70 uppercase tracking-widest font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              e
            </p>
            <p className="font-cinzel text-base sm:text-xl font-bold text-white tracking-wide flex items-center justify-center gap-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Adelina Rafael Nhancale
              <Heart className="w-3.5 h-3.5 text-white fill-white inline-block shrink-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            </p>
          </div>

          {/* Central Heart Connector with Golden Lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 py-0.5 sm:py-1">
            <div className="h-px bg-gradient-to-r from-transparent via-[#f5d78e]/70 to-transparent flex-1 max-w-[90px] sm:max-w-[120px]" />
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#c69c4e] to-[#8d6928] flex items-center justify-center shadow-lg shadow-[#c69c4e]/30 border border-[#f5d78e]/50">
              <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#f5d78e]/70 to-transparent flex-1 max-w-[90px] sm:max-w-[120px]" />
          </div>

          {/* Vertical Stack: Bride & Parents */}
          <div className="space-y-0.5 sm:space-y-1">
            <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wider uppercase drop-shadow-[0_2px_14px_rgba(255,255,255,0.4)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Benedita Nhantumbo
            </h3>
            <p className="font-montserrat text-xs sm:text-sm text-white/80 font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              filha de
            </p>
            <p className="font-cinzel text-base sm:text-xl font-bold text-white tracking-wide flex items-center justify-center gap-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Benedito Nhantumbo
              <Heart className="w-3.5 h-3.5 text-white fill-white inline-block shrink-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            </p>
            <p className="font-montserrat text-[11px] sm:text-xs text-white/70 uppercase tracking-widest font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              e
            </p>
            <p className="font-cinzel text-base sm:text-xl font-bold text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Alcinda Chilaule
            </p>
          </div>

          {/* Smooth Scroll to Countdown */}
          <div className="pt-2 flex flex-col items-center">
            <a
              href="#contagem"
              aria-label="Ver Contagem Regressiva"
              className="p-2 sm:p-2.5 rounded-full border border-[#f5d78e]/60 bg-[#0c1626]/70 hover:bg-[#0c1626] text-[#f5d78e] transition-all shadow-md"
            >
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f5d78e] animate-bounce" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
