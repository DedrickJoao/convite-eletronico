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
  // Fallback to showcase "Belinha e Lucas" if no query parameter is present
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#eae6df] overflow-hidden select-none"
      >
        {/* ========================================================================= */}
        {/* RESPONSIVE PHYSICAL ENVELOPE CARD                                         */}
        {/* Mantém a proporção do envelope e enquadra tudo dentro dele                */}
        {/* ========================================================================= */}
        <div
          className="relative w-full max-w-[460px] h-full max-h-[94vh] sm:max-h-[820px] flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] cursor-pointer"
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
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/25" />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.2)]" />

            {/* ======================================================================= */}
            {/* DIZERES DINÂMICOS DO CONVIDADO GRAVADOS DIRETAMENTE NO ENVELOPE         */}
            {/* - Cor padrão dourada champanhe (#f5d78e) para todas as palavras        */}
            {/* - Posicionado mais abaixo, ocupando harmoniosamente o espaço restante   */}
            {/* - 100% contido dentro da área do envelope                               */}
            {/* ======================================================================= */}
            {profile && (
              <div className="absolute bottom-[3.5%] sm:bottom-[4.5%] md:bottom-[5%] left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center w-[92%] max-w-[380px] px-2">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="flex flex-col items-center justify-center text-center space-y-1 sm:space-y-1.5"
                >
                  {/* 1. Subtítulo em caligrafia dourada */}
                  <span className="font-alex text-2xl sm:text-3xl md:text-4xl text-[#f5d78e] font-normal tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    Especialmente para
                  </span>

                  {/* 2. NOME DO CONVIDADO */}
                  <h2 className="font-cinzel text-lg sm:text-xl md:text-2xl font-black text-[#f5d78e] tracking-wider text-center leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    {profile.guestName}
                  </h2>

                  {/* 3. TIPO DE CONVITE (CASAL OU INDIVIDUAL) & NR DE PESSOAS */}
                  <div className="flex items-center justify-center gap-2 pt-0.5">
                    <span className="font-montserrat text-[10.5px] sm:text-[11.5px] font-extrabold text-[#f5d78e] uppercase tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      CONVITE {profile.type.toUpperCase()} • {profile.allowedCount} {profile.allowedCount === 2 ? 'PESSOAS' : 'PESSOA'}
                    </span>
                  </div>

                  {/* 4. QUANTIDADE DE PESSOAS AUTORIZADAS / VALIDADE */}
                  <p className="font-montserrat text-[11px] sm:text-xs md:text-[12.5px] font-black text-[#f5d78e] tracking-[0.16em] uppercase drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]">
                    {profile.validityText}
                  </p>

                  {/* 5. OBSERVAÇÕES ESPECIAIS (NÃO EXTENSIVO A CRIANÇAS) */}
                  {profile.specialNotes && (
                    <p className="font-montserrat text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#f5d78e] drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] pt-0.5">
                      [{profile.specialNotes}]
                    </p>
                  )}

                  {/* 6. RESTRIÇÕES DEFINIDAS NA BASE DE DADOS */}
                  {profile.restrictions && (
                    <p className="font-montserrat text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.15em] text-[#f5d78e]/90 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pt-0.5">
                      {profile.restrictions}
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
