import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Crown, Music } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';
import { weddingAudio } from '../utils/audioSynth';

interface EnvelopeIntroProps {
  onOpen: () => void;
  guestName?: string;
}

export default function EnvelopeIntro({ onOpen, guestName }: EnvelopeIntroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    // Start the gentle romantic wedding music upon the user's explicit gesture
    weddingAudio.play();
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          id="envelope-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#dfe6ec] p-4 overflow-hidden"
        >
          {/* Subtle Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,156,78,0.2)_0%,rgba(223,230,236,0.95)_70%)] pointer-events-none" />

          {/* Background Ambient Stars */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#c69c4e_1.5px,transparent_1.5px)] [background-size:28px_28px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center">
            {/* Top Royal Monogram Accent */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-2 mb-6"
            >
              <Crown className="w-6 h-6 text-[#c69c4e] animate-pulse-gold" />
              <span className="font-cinzel text-xs md:text-sm tracking-[0.35em] uppercase text-[#162842] font-semibold">
                Convite Exclusivo • 2026
              </span>
              <Crown className="w-6 h-6 text-[#c69c4e] animate-pulse-gold" />
            </motion.div>

            {/* Personalized Guest Badge if available */}
            {guestName && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-4 px-5 py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 shadow-md backdrop-blur-md"
              >
                <p className="font-montserrat text-xs tracking-wider text-[#162842]">
                  Reservado para: <strong className="font-bold text-[#c69c4e]">{guestName}</strong>
                </p>
              </motion.div>
            )}

            {/* Royal Envelope Box */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              onClick={handleOpenEnvelope}
              className="relative w-full aspect-[4/3] max-w-[420px] rounded-2xl p-1 bg-gradient-to-br from-[#c69c4e] via-[#e8eff5] to-[#c69c4e] shadow-[0_25px_50px_rgba(22,40,66,0.18),0_0_35px_rgba(198,156,78,0.25)] cursor-pointer group transition-transform"
            >
              {/* Envelope Body */}
              <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-[#ffffff] via-[#f3f7fa] to-[#dfe6ec] border border-[#c69c4e]/50 relative overflow-hidden flex flex-col items-center justify-between p-6">
                
                {/* Gold Foil Corner Ornaments */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#c69c4e]/70 pointer-events-none" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#c69c4e]/70 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#c69c4e]/70 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#c69c4e]/70 pointer-events-none" />

                {/* Envelope Flap Fold Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <polygon points="0,0 100,0 50,55" fill="none" stroke="#c69c4e" strokeWidth="0.8" />
                    <line x1="0" y1="100" x2="42" y2="50" stroke="#c69c4e" strokeWidth="0.8" />
                    <line x1="100" y1="100" x2="58" y2="50" stroke="#c69c4e" strokeWidth="0.8" />
                  </svg>
                </div>

                {/* Top Heading */}
                <div className="space-y-1 mt-2">
                  <p className="font-montserrat text-[11px] tracking-[0.25em] text-[#c69c4e] uppercase font-semibold">
                    Save the Date
                  </p>
                  <h1 className="font-cinzel text-xl md:text-2xl font-bold tracking-wider text-[#162842]">
                    {WEDDING_DETAILS.groom} & {WEDDING_DETAILS.bride}
                  </h1>
                </div>

                {/* Wax Seal Centerpiece */}
                <motion.div
                  animate={{
                    scale: isHovered ? 1.08 : 1,
                    rotate: isHovered ? 5 : 0
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="relative my-auto flex items-center justify-center"
                >
                  {/* Glowing Aura */}
                  <div className="absolute w-28 h-28 rounded-full bg-[#c69c4e]/25 blur-xl animate-pulse-gold pointer-events-none" />
                  
                  {/* Wax Stamp Seal */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#c69c4e] via-[#ab8237] to-[#7a5717] p-1 shadow-[0_8px_25px_rgba(198,156,78,0.45),inset_0_2px_4px_rgba(255,255,255,0.6)] flex items-center justify-center border-2 border-[#fff3cc]">
                    <div className="w-full h-full rounded-full border border-dashed border-[#573d02] flex flex-col items-center justify-center bg-gradient-to-tr from-[#946d05] to-[#c69c4e] text-white">
                      <span className="font-cinzel text-lg md:text-xl font-black tracking-widest text-[#162842] drop-shadow-sm">
                        {WEDDING_DETAILS.monogram}
                      </span>
                      <span className="text-[9px] font-montserrat font-bold tracking-widest text-[#162842]">
                        2026
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom Date & Action Hint */}
                <div className="space-y-2 mb-1">
                  <p className="font-cormorant text-sm md:text-base italic text-[#162842] font-medium">
                    12 de Dezembro de 2026 • Maputo, Moçambique
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-xs font-montserrat tracking-widest text-[#c69c4e] font-semibold uppercase group-hover:text-[#162842] transition-colors">
                    <Sparkles className="w-3.5 h-3.5 text-[#c69c4e]" />
                    <span>Toque para Deslacrar</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#c69c4e]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Subtitle / Promise */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 font-cormorant text-base md:text-lg text-[#162842] italic max-w-sm font-medium"
            >
              &ldquo;Que falte tudo menos Deus... O casamento de 2026 começa aqui.&rdquo;
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-4 flex items-center gap-2 text-[11px] font-montserrat text-[#162842]/80"
            >
              <Music className="w-3.5 h-3.5 text-[#c69c4e]" />
              <span>Experiência interativa com melodia nupcial ao vivo</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
