import { motion } from 'motion/react';
import { Heart, ArrowDown } from 'lucide-react';

export default function BlessingSection() {
  return (
    <section 
      id="bencao" 
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center items-center overflow-hidden border-b border-[#c69c4e]/30 shadow-sm"
    >
      {/* Foto de Fundo Oficial Dionísio & Benedita (ocupando 100% da secção com cores vivas e luminosidade) */}
      <img
        src="/assets/aistudio/WhatsApp_Image_2026-10-06_at_3.31.28_PM__1__5273d562.jpeg"
        alt="Foto Dionísio & Benedita - Bênção dos Pais"
        className="absolute inset-0 w-full h-full object-cover object-[center_top] sm:object-center select-none pointer-events-none brightness-[1.06] contrast-[1.08]"
        referrerPolicy="no-referrer"
      />

      {/* Camada suave e luminosa para manter perfeita visibilidade da foto e leitura do texto */}
      <div className="absolute inset-0 bg-[#dfe6ec]/40 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8 sm:space-y-10"
        >
          {/* Header Phrase */}
          <div className="space-y-2 sm:space-y-3">
            <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl italic text-[#c69c4e] font-bold tracking-wide drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]">
              Com a bênção de Deus e dos nossos pais
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c69c4e] to-transparent mx-auto" />
          </div>

          {/* Vertical Stack: Groom & Parents */}
          <div className="space-y-1 sm:space-y-1.5">
            <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#162842] tracking-wider uppercase drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)]">
              Dionísio Jovo
            </h3>
            <p className="font-montserrat text-xs sm:text-base text-[#162842]/90 font-semibold tracking-wide drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
              filho de
            </p>
            <p className="font-cinzel text-base sm:text-xl font-bold text-[#162842] tracking-wide drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]">
              Alpha Jovo
            </p>
            <p className="font-montserrat text-[11px] sm:text-sm text-[#162842]/80 uppercase tracking-widest font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
              e
            </p>
            <p className="font-cinzel text-base sm:text-xl font-bold text-[#162842] tracking-wide drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]">
              Beta Jovo
            </p>
          </div>

          {/* Central Heart Connector with Golden Lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 py-1 sm:py-2">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c69c4e]/70 to-transparent flex-1 max-w-[100px] sm:max-w-[120px]" />
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#c69c4e] to-[#a07830] flex items-center justify-center shadow-lg shadow-[#c69c4e]/20">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white animate-pulse" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#c69c4e]/70 to-transparent flex-1 max-w-[100px] sm:max-w-[120px]" />
          </div>

          {/* Vertical Stack: Bride & Parents */}
          <div className="space-y-1 sm:space-y-1.5">
            <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#162842] tracking-wider uppercase drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)]">
              Benedita Nhantumbo
            </h3>
            <p className="font-montserrat text-xs sm:text-base text-[#162842]/90 font-semibold tracking-wide drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
              filha de
            </p>
            <p className="font-cinzel text-base sm:text-xl font-bold text-[#162842] tracking-wide flex items-center justify-center gap-2 drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]">
              Benedito Nhantumbo
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c69c4e] fill-[#c69c4e] inline-block shrink-0" />
            </p>
            <p className="font-montserrat text-[11px] sm:text-sm text-[#162842]/80 uppercase tracking-widest font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
              e
            </p>
            <p className="font-cinzel text-base sm:text-xl font-bold text-[#162842] tracking-wide drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]">
              Alcinda Chilaule
            </p>
          </div>

          {/* Smooth Scroll to Countdown */}
          <div className="pt-2 flex flex-col items-center">
            <a
              href="#contagem"
              aria-label="Ver Contagem Regressiva"
              className="p-2 sm:p-2.5 rounded-full border border-[#c69c4e]/50 bg-white/80 hover:bg-white text-[#162842] hover:text-[#c69c4e] transition-all shadow-sm"
            >
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c69c4e] animate-bounce" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
