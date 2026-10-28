import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { weddingAudio } from '../utils/audioSynth';
import { getGuestProfile } from '../data/guestList';

interface EnvelopeIntroProps {
  onOpen: () => void;
  guestName?: string;
}

export default function EnvelopeIntro({ onOpen, guestName = '' }: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Pull dynamic guest data directly from the preloaded database record
  const activeName = guestName.trim() || 'Belinha e Lucas';
  const profile = getGuestProfile(activeName) || getGuestProfile('Belinha e Lucas');

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Play gentle wedding chime burst immediately, then continuous romantic melody "From This Moment On"
    weddingAudio.playChimeBurst();
    setTimeout(() => {
      weddingAudio.play();
    }, 350);

    // Smooth transition into the main celebration portal
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
        exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.8, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#e4dfd7] overflow-hidden select-none p-2 sm:p-4"
      >
        {/* ========================================================================= */}
        {/* ENVELOPE COM PROPORÇÃO FIXA (ASPECT RATIO 768/1376)                       */}
        {/* Garante que em mobile e desktop as coordenadas fiquem 100% idênticas      */}
        {/* e o texto permaneça estritamente SOBRE o papel branco do envelope         */}
        {/* ========================================================================= */}
        <div
          className="relative w-full max-w-[430px] aspect-[768/1376] max-h-[96vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleOpenEnvelope}
        >
          {/* Authentic Physical Envelope filling container */}
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
            {/* The physical envelope image occupying the full card */}
            <img
              src="/olive-envelope-vertical.jpg"
              alt="Envelope Oficial do Casamento Dionísio & Benedita"
              className="w-full h-full object-cover object-center select-none"
            />

            {/* Subtle realistic lighting and paper depth vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/5 via-transparent to-black/15" />

            {/* ======================================================================= */}
            {/* DIZERES DINÂMICOS DO CONVIDADO GRAVADOS SOBRE O PAPEL BRANCO DO ENVELOPE*/}
            {/* - Posicionado acima da borda inferior do envelope (bottom-[23.5%])      */}
            {/* - Todas as letras em PRETO (#111827) para máxima leitura e elegância   */}
            {/* - 100% contido sobre a área do envelope tanto em mobile como desktop    */}
            {/* ======================================================================= */}
            {profile && (
              <div className="absolute bottom-[20%] sm:bottom-[20.5%] md:bottom-[21%] left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center w-[88%] max-w-[340px] px-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="flex flex-col items-center justify-center text-center space-y-1 sm:space-y-1.5"
                >
                  {/* 1. Subtítulo em caligrafia dourada clássica */}
                  <span className="font-alex text-2xl sm:text-3xl text-[#a37a1f] font-normal tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                    Especialmente para
                  </span>

                  {/* 2. NOME DO CONVIDADO em dourado nobre */}
                  <h2 className="font-cinzel text-lg sm:text-xl md:text-2xl font-black text-[#8a6508] tracking-wider text-center leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                    {profile.guestName}
                  </h2>

                  {/* 3. QUANTIDADE DE PESSOAS AUTORIZADAS / VALIDADE em dourado */}
                  <p className="font-montserrat text-[11px] sm:text-xs md:text-[12px] font-black text-[#946d05] tracking-[0.16em] uppercase pt-1">
                    {profile.validityText}
                  </p>

                  {/* 4. OBSERVAÇÕES ESPECIAIS (NÃO EXTENSIVO A CRIANÇAS) em PRETO */}
                  {profile.specialNotes && (
                    <p className="font-montserrat text-[9.5px] sm:text-[10.5px] font-black uppercase tracking-[0.22em] text-[#111827] pt-0.5">
                      [{profile.specialNotes}]
                    </p>
                  )}
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
