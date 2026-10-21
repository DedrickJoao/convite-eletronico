import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onEnterInvitation: () => void;
}

export default function WelcomeScreen({ onEnterInvitation }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 py-8 sm:py-12 text-center bg-[#dfe6ec] bg-watercolor-luxury overflow-y-auto selection:bg-[#c69c4e]/30 selection:text-[#162842]"
    >
      {/* Ambient Watercolor & Subtle Luxury Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(198,156,78,0.16)_0%,rgba(223,230,236,0)_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(22,40,66,0.10)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center justify-center my-auto">
        
        {/* ================================================================= */}
        {/* 1. MONOGRAMA COM AS SIGLAS DOS NOIVOS (D & B) E DATA             */}
        {/* ================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center mb-6 sm:mb-8"
        >
          {/* Siglas D & B em Azul Marinho Real com Ampersand Dourado */}
          <div className="relative flex items-center justify-center select-none leading-none">
            <span className="font-cinzel text-6xl sm:text-7xl md:text-8xl font-bold text-[#162842] tracking-tighter drop-shadow-[0_2px_8px_rgba(255,255,255,0.85)]">
              D
            </span>
            <span className="font-alex text-5xl sm:text-6xl md:text-7xl text-[#c69c4e] -mx-3 -mt-2 z-10 font-normal drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)]">
              &amp;
            </span>
            <span className="font-cinzel text-6xl sm:text-7xl md:text-8xl font-bold text-[#162842] tracking-tighter drop-shadow-[0_2px_8px_rgba(255,255,255,0.85)]">
              B
            </span>
          </div>

          {/* Data do Casamento abaixo das siglas */}
          <div className="mt-2 flex items-center justify-center gap-3">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#c69c4e]" />
            <span className="font-montserrat text-xs sm:text-sm font-bold tracking-[0.3em] text-[#162842] uppercase">
              12.12.2026
            </span>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#c69c4e]" />
          </div>

          {/* Traço caligráfico decorativo em ouro suave */}
          <svg
            className="w-40 sm:w-52 h-5 text-[#c69c4e]/75 mt-0.5"
            viewBox="0 0 200 25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M 15,6 Q 100,24 185,6 Q 120,20 60,16 Q 30,14 10,22"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* ================================================================= */}
        {/* 2. CITAÇÃO BÍBLICA PADRONIZADA                                   */}
        {/* ================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 sm:mb-12 px-3 sm:px-6"
        >
          <p className="font-cormorant text-lg sm:text-2xl md:text-3xl text-[#162842] font-semibold italic leading-relaxed sm:leading-relaxed drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)] max-w-lg mx-auto">
            &ldquo;É necessário uma mulher de Provérbios 3:10 e um homem de Efésios 5:25 para alcançar o amor de 1Corintios 13&rdquo;
          </p>
        </motion.div>

        {/* ================================================================= */}
        {/* 3. BOTÃO "VER CONVITE" ALINHADO À PALETA (AZUL MARINHO + OURO)    */}
        {/* ================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full sm:w-auto"
        >
          <button
            onClick={onEnterInvitation}
            className="group w-full sm:w-auto min-h-[48px] px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-[#162842] hover:bg-[#0f1d30] text-[#fbf6ec] font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] uppercase shadow-[0_10px_25px_rgba(22,40,66,0.25)] hover:shadow-[0_14px_30px_rgba(22,40,66,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#c69c4e]"
          >
            <span className="relative z-10 transition-colors group-hover:text-[#c69c4e]">
              VER CONVITE
            </span>
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}
