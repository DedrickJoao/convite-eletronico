import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Clapperboard, Heart, Sparkles, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';
import { weddingAudio } from '../utils/audioSynth';

interface WeddingTrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRsvp: () => void;
}

interface TrailerScene {
  id: number;
  act: string;
  tagline: string;
  title: string;
  highlightText: string;
  subtext: string;
  locationOrDate?: string;
  image: string;
  durationSec: number;
}

const TRAILER_SCENES: TrailerScene[] = [
  {
    id: 1,
    act: "APRESENTAÇÃO EXCLUSIVA",
    tagline: "Uma Produção do Amor e da Fé",
    title: `${WEDDING_DETAILS.groom} & ${WEDDING_DETAILS.bride}`,
    highlightText: "O Grande Casamento do Ano",
    subtext: "Dois caminhos entrelaçados pelo destino para viverem uma história inesquecível.",
    locationOrDate: "Maputo • Moçambique",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    durationSec: 6
  },
  {
    id: 2,
    act: "ATO I: A PROMESSA ETERNA",
    tagline: "A Força do Nosso Juramento",
    title: "“Que falte tudo menos Deus...”",
    highlightText: "Amor • Honra • Aliança",
    subtext: "Onde há fé verdadeira, o amor constrói castelos inabaláveis que o tempo jamais apagará.",
    locationOrDate: "Catedral de Cristal & Jardins do Índico",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80",
    durationSec: 6
  },
  {
    id: 3,
    act: "ATO II: O CENÁRIO REAL",
    tagline: "Uma Noite de Magia e Esplendor",
    title: "Palácio dos Sonhos",
    highlightText: "Gastronomia Imperial & Alta Gala",
    subtext: "Uma celebração sensorial única: orquestra ao vivo, alta gastronomia e brindes inesquecíveis.",
    locationOrDate: "Avenida Julius Nyerere, Polana Cimento • Maputo",
    image: "https://images.unsplash.com/photo-1544971587-b842c27f8e14?w=1200&q=80",
    durationSec: 6
  },
  {
    id: 4,
    act: "ATO III: A DATA HISTÓRICA",
    tagline: "Reserve Este Momento no Seu Coração",
    title: "Sábado, 12 de Dezembro de 2026",
    highlightText: "Às 16:00 Horas",
    subtext: "O momento exato em que duas vidas se tornarão uma só diante de todos os que amamos.",
    locationOrDate: "Maputo, Moçambique",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80",
    durationSec: 6
  },
  {
    id: 5,
    act: "GRAN FINALE: O SEU PAPEL DE HONRA",
    tagline: "Você é Nossa Estrela Convidada",
    title: "Reserve Seu Lugar na Primeira Fila",
    highlightText: "Sua Presença é Indispensável",
    subtext: "Esta celebração só será completa com o seu sorriso, seu brinde e sua bênção.",
    locationOrDate: "Confirmação Obrigatória até 15 de Outubro",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80",
    durationSec: 7
  }
];

export default function WeddingTrailerModal({ isOpen, onClose, onOpenRsvp }: WeddingTrailerModalProps) {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [progress, setProgress] = useState(0);

  const scene = TRAILER_SCENES[currentSceneIdx];

  useEffect(() => {
    if (isOpen) {
      setCurrentSceneIdx(0);
      setProgress(0);
      setIsPlaying(true);
      weddingAudio.play();
      setIsAudioActive(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = 50; // ms
    const totalSteps = (scene.durationSec * 1000) / interval;
    const stepIncrement = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + stepIncrement >= 100) {
          // Go to next scene
          if (currentSceneIdx < TRAILER_SCENES.length - 1) {
            setCurrentSceneIdx((curr) => curr + 1);
            return 0;
          } else {
            // Loop or keep at end
            return 100;
          }
        }
        return prev + stepIncrement;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, currentSceneIdx, scene.durationSec]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentSceneIdx < TRAILER_SCENES.length - 1) {
      setCurrentSceneIdx(currentSceneIdx + 1);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx(currentSceneIdx - 1);
      setProgress(0);
    }
  };

  const toggleAudio = () => {
    const active = weddingAudio.toggle();
    setIsAudioActive(active);
  };

  const handleRsvpClick = () => {
    onClose();
    onOpenRsvp();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in select-none">
      
      {/* Cinema Container */}
      <div className="relative w-full h-full max-w-5xl max-h-[92vh] mx-auto rounded-none sm:rounded-3xl overflow-hidden flex flex-col justify-between bg-[#0b131f] border-0 sm:border border-[#c69c4e]/50 shadow-[0_0_80px_rgba(198,156,78,0.3)]">
        
        {/* Background Scene Image with Cinematic Zoom and Pan */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <img
                src={scene.image}
                alt={scene.title}
                className="w-full h-full object-cover object-center filter brightness-45 contrast-110"
              />
            </motion.div>
          </AnimatePresence>

          {/* Cinematic Vignette and Ambient Color Wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b131f] via-black/40 to-[#0b131f]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,19,31,0.85)_100%)]" />
        </div>

        {/* Top Cinema Bar: Progress Bars + Controls */}
        <div className="relative z-20 pt-4 pb-2 px-4 sm:px-8 bg-gradient-to-b from-black/90 to-transparent">
          {/* Progress Chapters Segments */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-3">
            {TRAILER_SCENES.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  setCurrentSceneIdx(idx);
                  setProgress(0);
                }}
                className="h-1.5 rounded-full bg-white/20 overflow-hidden cursor-pointer hover:bg-white/30 transition-colors"
              >
                <div
                  className="h-full bg-[#c69c4e] transition-all duration-75"
                  style={{
                    width:
                      idx < currentSceneIdx
                        ? '100%'
                        : idx === currentSceneIdx
                        ? `${progress}%`
                        : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c69c4e]/20 border border-[#c69c4e]/60 text-white text-[11px] font-montserrat font-bold tracking-wider uppercase">
                <Clapperboard className="w-3.5 h-3.5 text-[#c69c4e]" />
                <span>Trailer Oficial • Casamento 2026</span>
              </div>
              <span className="hidden sm:inline text-xs font-montserrat text-white/80">
                Capítulo {currentSceneIdx + 1} de {TRAILER_SCENES.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleAudio}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Alternar Som"
              >
                {isAudioActive ? (
                  <Volume2 className="w-4 h-4 text-[#c69c4e]" />
                ) : (
                  <VolumeX className="w-4 h-4 text-white/70" />
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Fechar Trailer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Content: Cinematic Scene Cards */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 sm:px-12 text-center my-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mx-auto space-y-4"
            >
              {/* Scene Act Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#c69c4e]/50 bg-black/60 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#c69c4e]" />
                <span className="font-montserrat text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#c69c4e]">
                  {scene.act}
                </span>
              </div>

              {/* Tagline */}
              <p className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.3em] text-white/90 font-medium">
                {scene.tagline}
              </p>

              {/* Main Title */}
              <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-white tracking-wider leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                {scene.title}
              </h2>

              {/* Highlight Gold Pill */}
              <div className="inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-[#c69c4e]/30 via-[#c69c4e]/50 to-[#c69c4e]/30 border border-[#c69c4e] text-[#ffffff] font-cinzel text-sm sm:text-base font-bold tracking-widest shadow-lg">
                {scene.highlightText}
              </div>

              {/* Subtext */}
              <p className="font-cormorant text-lg sm:text-2xl text-white/95 italic max-w-xl mx-auto leading-relaxed">
                &ldquo;{scene.subtext}&rdquo;
              </p>

              {/* Location or Date */}
              {scene.locationOrDate && (
                <div className="pt-2 flex items-center justify-center gap-2 text-xs sm:text-sm font-montserrat text-[#c69c4e] font-semibold tracking-wider">
                  <MapPin className="w-4 h-4 text-[#c69c4e]" />
                  <span>{scene.locationOrDate}</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Cinema Controls Bar */}
        <div className="relative z-20 pb-6 pt-3 px-6 sm:px-10 bg-gradient-to-t from-black/95 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Playback Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentSceneIdx === 0}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white transition-all cursor-pointer"
              title="Cena Anterior"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3.5 rounded-full bg-[#c69c4e] hover:bg-[#d9b46c] text-[#162842] transition-all shadow-[0_0_20px_rgba(198,156,78,0.5)] cursor-pointer"
              title={isPlaying ? "Pausar" : "Reproduzir"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNext}
              disabled={currentSceneIdx === TRAILER_SCENES.length - 1}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white transition-all cursor-pointer"
              title="Próxima Cena"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Direct RSVP Action Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleRsvpClick}
              className="flex-1 sm:flex-none px-6 py-3 rounded-full gold-button font-montserrat text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(198,156,78,0.4)] cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Garantir Meu Lugar (RSVP)</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-montserrat font-semibold transition-colors cursor-pointer"
            >
              Explorar Convite
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
