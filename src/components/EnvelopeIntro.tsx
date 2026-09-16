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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07080b] p-4 overflow-hidden"
        >
          {/* Subtle Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18)_0%,rgba(11,12,16,0.98)_70%)] pointer-events-none" />

          {/* Background Ambient Stars */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center">
            {/* Top Royal Monogram Accent */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-2 mb-6"
            >
              <Crown className="w-6 h-6 text-[#d4af37] animate-pulse-gold" />
              <span className="font-cinzel text-xs md:text-sm tracking-[0.35em] uppercase text-[#e2d09e]">
                Convite Exclusivo • 2026
              </span>
              <Crown className="w-6 h-6 text-[#d4af37] animate-pulse-gold" />
            </motion.div>

            {/* Personalized Guest Badge if available */}
            {guestName && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-4 px-5 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 backdrop-blur-md"
              >
                <p className="font-montserrat text-xs tracking-wider text-[#f5d77f]">
                  Reservado para: <strong className="font-semibold text-white">{guestName}</strong>
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
              className="relative w-full aspect-[4/3] max-w-[420px] rounded-2xl p-1 bg-gradient-to-br from-[#d4af37]/50 via-[#997316]/30 to-[#f5d77f]/40 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.2)] cursor-pointer group transition-transform"
            >
              {/* Envelope Body */}
              <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-[#141722] via-[#0d0f17] to-[#08090d] border border-[#d4af37]/40 relative overflow-hidden flex flex-col items-center justify-between p-6">
                
                {/* Gold Foil Corner Ornaments */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/60 pointer-events-none" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/60 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/60 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/60 pointer-events-none" />

                {/* Envelope Flap Fold Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <polygon points="0,0 100,0 50,55" fill="none" stroke="#d4af37" strokeWidth="0.8" />
                    <line x1="0" y1="100" x2="42" y2="50" stroke="#d4af37" strokeWidth="0.8" />
                    <line x1="100" y1="100" x2="58" y2="50" stroke="#d4af37" strokeWidth="0.8" />
                  </svg>
                </div>

                {/* Top Heading */}
                <div className="space-y-1 mt-2">
                  <p className="font-montserrat text-[11px] tracking-[0.25em] text-[#d4af37] uppercase">
                    Celebrando o Amor
                  </p>
                  <h1 className="font-cinzel text-xl md:text-2xl font-bold tracking-wider gold-gradient-text">
                    {WEDDING_DETAILS.bride} & {WEDDING_DETAILS.groom}
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
                  <div className="absolute w-28 h-28 rounded-full bg-[#d4af37]/20 blur-xl animate-pulse-gold pointer-events-none" />
                  
                  {/* Wax Stamp Seal */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#d4af37] via-[#b8860b] to-[#785404] p-1 shadow-[0_8px_25px_rgba(212,175,55,0.5),inset_0_2px_4px_rgba(255,255,255,0.5)] flex items-center justify-center border-2 border-[#fff3cc]">
                    <div className="w-full h-full rounded-full border border-dashed border-[#573d02] flex flex-col items-center justify-center bg-gradient-to-tr from-[#946d05] to-[#cba32a] text-[#2b1f02]">
                      <span className="font-cinzel text-lg md:text-xl font-black tracking-widest text-[#241701] drop-shadow-sm">
                        {WEDDING_DETAILS.monogram}
                      </span>
                      <span className="text-[9px] font-montserrat font-bold tracking-widest text-[#3d2703]">
                        2026
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom Date & Action Hint */}
                <div className="space-y-2 mb-1">
                  <p className="font-cormorant text-sm md:text-base italic text-[#e5e7eb] font-light">
                    12 de Dezembro de 2026 • Lisboa / Luanda
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-xs font-montserrat tracking-widest text-[#f5d77f] font-medium uppercase group-hover:text-white transition-colors">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Toque para Deslacrar</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Subtitle / Promise */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 font-cormorant text-base md:text-lg text-[#d1d5db] italic max-w-sm"
            >
              &ldquo;O casamento mais esperado e exclusivo de 2026 começa aqui.&rdquo;
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-4 flex items-center gap-2 text-[11px] font-montserrat text-[#9ca3af]"
            >
              <Music className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Experiência interativa com melodia nupcial ao vivo</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
