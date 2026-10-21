import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Music, Disc3, Sparkles } from 'lucide-react';
import { weddingAudio } from '../utils/audioSynth';

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((playing, muted) => {
      setIsPlaying(playing);
      setIsMuted(muted);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleSound = () => {
    // If not playing yet, start playing
    if (!isPlaying) {
      weddingAudio.play();
      if (isMuted) {
        weddingAudio.setMuted(false);
      }
      return;
    }

    // If playing, toggle mute/unmute
    weddingAudio.toggleMute();
  };

  const isSoundActive = isPlaying && !isMuted;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none">
      
      {/* Floating Info Pill / Toast */}
      <AnimatePresence>
        {(showTooltip || isSoundActive) && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#c69c4e]/50 shadow-[0_8px_25px_rgba(22,40,66,0.18)] cursor-pointer"
            onClick={handleToggleSound}
          >
            <Disc3 className={`w-4 h-4 text-[#c69c4e] ${isSoundActive ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            <div className="flex flex-col text-left">
              <span className="font-montserrat text-[10px] uppercase tracking-wider text-[#c69c4e] font-extrabold flex items-center gap-1">
                <span>Trilha Sonora</span>
                <Sparkles className="w-2.5 h-2.5" />
              </span>
              <span className="font-cinzel text-xs font-bold text-[#162842] leading-tight">
                From This Moment On • Shania Twain & Bryan White
              </span>
            </div>
            
            {/* Equalizer Wave Bars */}
            {isSoundActive && (
              <div className="flex items-end gap-0.5 h-3.5 pl-1">
                {[0.4, 1.0, 0.6, 0.9].map((multiplier, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: ['20%', `${100 * multiplier}%`, '25%']
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6 + i * 0.15,
                      ease: 'easeInOut'
                    }}
                    className="w-1 bg-[#c69c4e] rounded-full"
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Luxury Floating Music Button */}
      <motion.button
        id="btn-music-mute-toggle"
        onClick={handleToggleSound}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isSoundActive ? 'Silenciar música do convite' : 'Tocar música do convite'}
        className={`relative group w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(22,40,66,0.25)] border-2 transition-all cursor-pointer ${
          isSoundActive
            ? 'bg-gradient-to-tr from-[#162842] via-[#233f65] to-[#162842] border-[#c69c4e] text-white shadow-[#c69c4e]/30'
            : 'bg-white/95 backdrop-blur-md border-[#c69c4e]/50 text-[#162842] hover:border-[#c69c4e]'
        }`}
      >
        {/* Pulsing Aura Ring when Music is Playing */}
        {isSoundActive && (
          <span className="absolute -inset-1 rounded-full border border-[#c69c4e]/60 animate-ping pointer-events-none" style={{ animationDuration: '2.5s' }} />
        )}

        {/* Music Status Icon */}
        {isSoundActive ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-6 h-6 text-[#c69c4e] animate-pulse" />
            <Music className="w-2.5 h-2.5 text-white absolute -top-1 -right-1" />
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            <VolumeX className="w-6 h-6 text-[#162842]/70 group-hover:text-red-500 transition-colors" />
            <span className="sr-only">Música Silenciada</span>
          </div>
        )}

        {/* Small Mobile Badge */}
        <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
          isSoundActive ? 'bg-emerald-500' : 'bg-red-500'
        }`} />
      </motion.button>

    </div>
  );
}
