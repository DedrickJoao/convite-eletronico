import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { weddingAudio } from '../utils/audioSynth';

interface EnvelopeIntroProps {
  onOpen: () => void;
  guestName?: string;
}

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Play gentle wedding chime burst immediately, then continuous romantic melody "From This Moment On"
    weddingAudio.playChimeBurst();
    setTimeout(() => {
      weddingAudio.play();
    }, 350);

    // Smooth transition into the main celebration portal without sparkles
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        id="envelope-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.8, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#eae6df] overflow-hidden select-none cursor-pointer"
        onClick={handleOpenEnvelope}
      >
        {/* ========================================================================= */}
        {/* FULLSCREEN PHYSICAL ENVELOPE (FILLS 100% OF THE SCREEN)                   */}
        {/* Clean, authentic envelope with ribbon - click anywhere to open            */}
        {/* ========================================================================= */}
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Authentic Physical Envelope filling entire screen */}
          <motion.div
            animate={
              isOpening
                ? {
                    scale: 1.25,
                    opacity: 0,
                    filter: 'blur(3px)',
                    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
                  }
                : isHovered
                ? { scale: 1.02, transition: { duration: 0.4 } }
                : { scale: 1, transition: { duration: 0.4 } }
            }
            className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center"
          >
            {/* The physical envelope image occupying the full screen (macro close-up) */}
            <img
              src="/olive-envelope-vertical.jpg"
              alt="Envelope Oficial do Casamento Dionísio & Benedita"
              className="w-full h-full object-cover object-center select-none min-w-full min-h-full"
            />

            {/* Subtle realistic lighting and paper depth vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/25" />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]" />

            {/* Aviso no Convite Fechado: NÃO EXTENSIVO A CRIANÇAS */}
            <div className="absolute bottom-10 sm:bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center w-full max-w-md px-4 flex flex-col items-center">
              <p className="font-montserrat text-xs sm:text-sm md:text-base font-extrabold tracking-[0.25em] text-[#162842] uppercase drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)] select-none">
                NÃO EXTENSIVO A CRIANÇAS
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}


