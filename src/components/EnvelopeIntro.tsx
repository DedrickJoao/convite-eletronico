import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Users, ChevronDown, Check, Sparkles } from 'lucide-react';
import { weddingAudio } from '../utils/audioSynth';
import { getGuestProfile, RAW_GUESTS } from '../data/guestList';

interface EnvelopeIntroProps {
  onOpen: () => void;
  guestName?: string;
  onSelectGuest?: (name: string) => void;
}

export default function EnvelopeIntro({ onOpen, guestName = '', onSelectGuest }: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // Pull dynamic guest data directly from the preloaded database record
  // If guestName is empty, fallback to the showcase couple "Belinha e Lucas" so the preview is never empty
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
        {/* Quick Guest Selector / Tester Toolbar (Top Bar for easy testing of any guest) */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 max-w-[92vw]">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSelectorOpen(!isSelectorOpen);
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#162842]/90 hover:bg-[#162842] text-white text-[11px] sm:text-xs font-montserrat font-bold flex items-center gap-2 shadow-xl border border-[#c69c4e] cursor-pointer transition-all backdrop-blur-sm"
              title="Testar como outro convidado"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[#f5d78e]">Convidado Actual:</span>
              <span className="font-extrabold underline decoration-[#c69c4e] max-w-[140px] sm:max-w-[180px] truncate">
                {profile?.guestName || activeName}
              </span>
              <span className="text-[10px] opacity-80">({profile?.type})</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#c69c4e] transition-transform ${isSelectorOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown with sample guests to test quickly */}
            {isSelectorOpen && (
              <div 
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-72 sm:w-80 max-h-80 overflow-y-auto bg-white rounded-2xl shadow-2xl border-2 border-[#c69c4e] p-2 z-50 animate-in fade-in slide-in-from-top-2"
              >
                <div className="px-2 py-1 text-[10px] font-montserrat font-bold uppercase tracking-wider text-[#162842]/60 border-b border-[#c69c4e]/30 mb-1 flex items-center justify-between">
                  <span>Selecionar Convidado para Testar:</span>
                  <span className="text-[#c69c4e]">47 Registados</span>
                </div>
                <div className="space-y-1">
                  {RAW_GUESTS.map((g) => {
                    const isSelected = profile?.guestName.toLowerCase() === g.fullName.toLowerCase();
                    return (
                      <button
                        key={g.id}
                        onClick={() => {
                          if (onSelectGuest) {
                            onSelectGuest(g.fullName);
                          }
                          setIsSelectorOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-montserrat flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected 
                            ? 'bg-[#162842] text-white font-bold' 
                            : 'hover:bg-[#dfe6ec]/60 text-[#162842]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                            g.type === 'Casal' 
                              ? (isSelected ? 'bg-[#c69c4e] text-[#162842]' : 'bg-[#c69c4e]/20 text-[#8a6508]')
                              : (isSelected ? 'bg-white/20 text-white' : 'bg-[#162842]/10 text-[#162842]')
                          }`}>
                            {g.type}
                          </span>
                          <span className="truncate">{g.fullName}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#f5d78e] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RESPONSIVE PHYSICAL ENVELOPE CARD                                         */}
        {/* Centered with authentic aspect ratio on desktop, fills mobile gracefully  */}
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
            {/* PRÉ-VISUALIZAÇÃO DINÂMICA DO CONVIDADO (ANTES DA ABERTURA DO CONVITE)   */}
            {/* Exibe: Nome, Tipo (Casal/Individual), Nº de Convidados, Validade,       */}
            {/* Observações especiais e Restrições da base de dados                     */}
            {/* ======================================================================= */}
            {profile && (
              <div className="absolute bottom-[10%] sm:bottom-[12%] md:bottom-[13%] left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center w-[92%] max-w-[340px] px-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="bg-[#faf8f5]/96 backdrop-blur-sm rounded-2xl py-3 px-3.5 sm:px-5 border-2 border-[#c69c4e] shadow-[0_10px_32px_rgba(0,0,0,0.3)] flex flex-col items-center relative overflow-hidden"
                >
                  {/* Decorative corner accents */}
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-[#c69c4e]" />
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-[#c69c4e]" />
                  <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-[#c69c4e]" />
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-[#c69c4e]" />

                  {/* Header Subtitle */}
                  <span className="font-alex text-xl sm:text-2xl text-[#997316] font-normal tracking-wide">
                    Especialmente para
                  </span>

                  {/* 1. NOME DO CONVIDADO */}
                  <h2 className="font-cinzel text-base sm:text-lg md:text-xl font-black text-[#162842] tracking-wide text-center mt-0.5 leading-tight drop-shadow-xs">
                    {profile.guestName}
                  </h2>

                  {/* 2. TIPO DE CONVITE (CASAL OU INDIVIDUAL) & NR DE CONVIDADOS */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 my-1.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-montserrat font-extrabold uppercase tracking-wider ${
                      profile.type === 'Casal'
                        ? 'bg-[#c69c4e]/20 text-[#8a6508] border border-[#c69c4e]/60'
                        : 'bg-[#162842]/10 text-[#162842] border border-[#162842]/20'
                    }`}>
                      {profile.type === 'Casal' ? (
                        <Users className="w-3 h-3 text-[#c69c4e]" />
                      ) : (
                        <User className="w-3 h-3 text-[#162842]" />
                      )}
                      <span>{profile.type === 'Casal' ? 'TIPO: CASAL' : 'TIPO: INDIVIDUAL'}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-montserrat font-black uppercase tracking-wider bg-[#162842] text-[#f5d78e] shadow-xs">
                      <span>{profile.allowedCount} {profile.allowedCount === 2 ? 'PESSOAS' : 'PESSOA'}</span>
                    </span>
                  </div>

                  {/* 3. QUANTIDADE DE PESSOAS AUTORIZADAS / VALIDADE */}
                  <p className="font-montserrat text-[10px] sm:text-[11px] font-black text-[#162842] tracking-wider uppercase">
                    {profile.validityText}
                  </p>

                  {/* 4. OBSERVAÇÕES ESPECIAIS (EX.: NÃO EXTENSIVO A CRIANÇAS) */}
                  {profile.specialNotes && (
                    <p className="font-montserrat text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.18em] text-[#8c2d2d] font-black mt-1">
                      [{profile.specialNotes}]
                    </p>
                  )}

                  {/* 5. RESTRIÇÕES DEFINIDAS NA BASE DE DADOS */}
                  {profile.restrictions && (
                    <p className="font-montserrat text-[7.5px] sm:text-[8px] uppercase tracking-[0.12em] text-[#162842]/75 font-semibold mt-0.5">
                      {profile.restrictions}
                    </p>
                  )}

                  <div className="w-14 h-0.5 bg-gradient-to-r from-transparent via-[#c69c4e] to-transparent my-1.5" />

                  {/* Call to action */}
                  <p className="font-montserrat text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#c69c4e] font-extrabold">
                    Toque para abrir o convite
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
