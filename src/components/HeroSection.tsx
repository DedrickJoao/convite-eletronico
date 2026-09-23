import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Sparkles, Heart, Crown, CheckCircle2, QrCode, ArrowDown } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';
import { getGoogleCalendarUrl } from '../utils/calendar';

interface HeroSectionProps {
  onOpenRsvp: () => void;
  onOpenNfcPass: () => void;
  guestName?: string;
}

export default function HeroSection({ onOpenRsvp, onOpenNfcPass, guestName }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(WEDDING_DETAILS.targetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 1)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
    >
      {/* Ambient Watercolor & Marble Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(198,156,78,0.12)_0%,rgba(223,230,236,0)_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(198,156,78,0.1)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
        
        {/* Personalized Guest Welcome Banner */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 px-5 py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 backdrop-blur-md inline-flex items-center gap-2 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c69c4e]" />
            <span className="font-montserrat text-xs tracking-wider text-[#162842]">
              Convidado(a) Especial de Honra: <span className="font-bold text-[#c69c4e]">{guestName}</span>
            </span>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* THE OFFICIAL SAVE THE DATE CARD (MATCHING USER'S IMAGE) */}
        {/* ========================================================= */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl mx-auto rounded-3xl save-the-date-card p-8 sm:p-12 overflow-hidden text-center select-none"
        >
          {/* Subtle Watercolor & Marble Vein Overlays */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-[radial-gradient(circle,rgba(198,156,78,0.2)_0%,transparent_70%)] blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[radial-gradient(circle,rgba(22,40,66,0.06)_0%,transparent_70%)] blur-2xl pointer-events-none" />
          <div className="absolute top-1/2 left-0 w-32 h-64 bg-[radial-gradient(ellipse_at_left,rgba(198,156,78,0.18)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-1/2 right-0 w-32 h-64 bg-[radial-gradient(ellipse_at_right,rgba(198,156,78,0.18)_0%,transparent_70%)] pointer-events-none" />

          {/* Golden Botanical Leaves Vector Silhouette - Left Side */}
          <svg
            className="absolute left-2 top-8 w-16 sm:w-24 h-64 sm:h-80 text-[#c69c4e]/40 pointer-events-none"
            viewBox="0 0 100 300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M20 280 Q 40 180 30 20" />
            <path d="M28 220 Q 55 200 48 185 Q 35 195 27 210" />
            <path d="M25 170 Q 60 150 50 135 Q 33 145 24 160" />
            <path d="M25 120 Q 58 100 50 85 Q 35 95 26 110" />
            <path d="M28 70 Q 55 50 48 35 Q 33 45 28 65" />
            <path d="M30 20 Q 38 10 32 0" />
          </svg>

          {/* Golden Botanical Leaves Vector Silhouette - Right Side */}
          <svg
            className="absolute right-2 top-8 w-16 sm:w-24 h-64 sm:h-80 text-[#c69c4e]/40 pointer-events-none scale-x-[-1]"
            viewBox="0 0 100 300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M20 280 Q 40 180 30 20" />
            <path d="M28 220 Q 55 200 48 185 Q 35 195 27 210" />
            <path d="M25 170 Q 60 150 50 135 Q 33 145 24 160" />
            <path d="M25 120 Q 58 100 50 85 Q 35 95 26 110" />
            <path d="M28 70 Q 55 50 48 35 Q 33 45 28 65" />
            <path d="M30 20 Q 38 10 32 0" />
          </svg>

          <div className="relative z-10 flex flex-col items-center">
            
            {/* Top Gold Heart */}
            <div className="mb-4">
              <span className="text-[#c69c4e] text-lg sm:text-xl">♥</span>
            </div>

            {/* SAVE THE DATE Heading Block */}
            <div className="mb-6 flex flex-col items-center">
              <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-[0.22em] text-[#162842] leading-none">
                SAVE
              </h1>
              <span className="font-alex text-3xl sm:text-5xl text-[#c69c4e] -my-2.5 sm:-my-4 z-10 drop-shadow-sm">
                the
              </span>
              <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-[0.22em] text-[#162842] leading-none">
                DATE
              </h1>
            </div>

            {/* Gold Ornate Divider with Diamond Rosette */}
            <div className="flex items-center justify-center gap-3 w-48 sm:w-64 my-3 text-[#c69c4e]">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c69c4e] to-[#c69c4e]" />
              <span className="text-xs">❖</span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#c69c4e] to-[#c69c4e]" />
            </div>

            {/* Couple Names (DIONÍSIO & BENEDITA) */}
            <div className="my-3 flex flex-col items-center">
              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold tracking-[0.2em] text-[#162842]">
                DIONISIO
              </h2>
              
              <div className="flex items-center justify-center gap-3 my-1 text-[#c69c4e]">
                <div className="h-[0.5px] w-8 sm:w-12 bg-[#c69c4e]/60" />
                <span className="font-alex text-2xl sm:text-4xl text-[#c69c4e]">&</span>
                <div className="h-[0.5px] w-8 sm:w-12 bg-[#c69c4e]/60" />
              </div>

              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold tracking-[0.2em] text-[#162842]">
                BENEDITA
              </h2>
            </div>

            {/* Gold Ornate Divider */}
            <div className="flex items-center justify-center gap-3 w-48 sm:w-64 my-3 text-[#c69c4e]">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c69c4e] to-[#c69c4e]" />
              <span className="text-xs">❖</span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#c69c4e] to-[#c69c4e]" />
            </div>

            {/* Date Block: DEZEMBRO / SÁBADO | 12 | 2026 */}
            <div className="my-2 flex flex-col items-center">
              <span className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.25em] text-[#162842] font-bold mb-1">
                DEZEMBRO
              </span>

              <div className="flex items-center justify-center gap-3 sm:gap-5 py-1 border-y border-[#c69c4e]/50 my-1 w-56 sm:w-72">
                <span className="font-montserrat text-xs sm:text-sm uppercase tracking-widest text-[#162842] font-semibold">
                  SÁBADO
                </span>
                <div className="h-6 w-[1px] bg-[#c69c4e]/60" />
                <span className="font-cinzel text-3xl sm:text-4xl font-black text-[#c69c4e]">
                  12
                </span>
                <div className="h-6 w-[1px] bg-[#c69c4e]/60" />
                <span className="font-montserrat text-xs sm:text-sm uppercase tracking-widest text-[#162842] font-semibold">
                  2026
                </span>
              </div>
            </div>

            {/* Gold Heart Indicator */}
            <div className="my-2">
              <span className="text-[#c69c4e] text-sm">♥</span>
            </div>

            {/* Spiritual Motto / Verse */}
            <p className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.22em] text-[#162842] font-bold my-1">
              QUE FALTE TUDO MENOS DEUS...
            </p>

            {/* Bottom Heart & Ornaments */}
            <div className="my-1">
              <span className="text-[#c69c4e] text-xs">♥</span>
            </div>

            <div className="flex items-center justify-center gap-3 w-40 sm:w-52 my-1 text-[#c69c4e]">
              <div className="h-[0.5px] flex-1 bg-[#c69c4e]/40" />
              <span className="text-[10px]">❖</span>
              <div className="h-[0.5px] flex-1 bg-[#c69c4e]/40" />
            </div>

            {/* Location & Teaser */}
            <div className="mt-2 space-y-0.5">
              <p className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.2em] text-[#162842] font-bold">
                MAPUTO • MOÇAMBIQUE
              </p>
              <p className="font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#162842]/70 font-semibold">
                MAIS INFORMAÇÕES BREVEMENTE
              </p>
            </div>

          </div>
        </motion.div>

        {/* Live Countdown Clock */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 w-full max-w-xl"
        >
          <div className="p-5 sm:p-6 rounded-3xl crystal-card relative overflow-hidden bg-white/80 border border-[#c69c4e]/40 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c69c4e]/10 rounded-full blur-2xl pointer-events-none" />
            
            <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#c69c4e] mb-4 font-bold">
              Contagem Regressiva para o Grande Dia
            </p>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              {[
                { value: timeLeft.days, label: 'Dias' },
                { value: timeLeft.hours, label: 'Horas' },
                { value: timeLeft.minutes, label: 'Minutos' },
                { value: timeLeft.seconds, label: 'Segundos' },
              ].map((unit, idx) => (
                <div
                  key={idx}
                  className="p-2 sm:p-3 rounded-2xl bg-white border border-[#c69c4e]/30 flex flex-col items-center justify-center shadow-sm"
                >
                  <span className="font-cinzel text-2xl sm:text-4xl font-bold text-[#c69c4e] tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-montserrat uppercase tracking-wider text-[#162842] font-semibold mt-1">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 w-full"
        >
          <button
            id="hero-rsvp-cta"
            onClick={onOpenRsvp}
            className="px-8 py-3.5 rounded-full gold-button font-montserrat text-sm font-bold tracking-widest uppercase flex items-center gap-2.5 shadow-[0_10px_30px_rgba(198,156,78,0.4)] cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5 fill-white text-white" />
            <span>Confirmar Presença (RSVP)</span>
          </button>

          <button
            id="hero-nfc-pass-cta"
            onClick={onOpenNfcPass}
            className="px-6 py-3.5 rounded-full crystal-card bg-white/90 border border-[#c69c4e]/50 hover:border-[#c69c4e] font-montserrat text-sm font-semibold tracking-wider text-[#162842] hover:text-[#c69c4e] flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <QrCode className="w-4 h-4 text-[#c69c4e]" />
            <span>Pass VIP & NFC</span>
          </button>

          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full crystal-card bg-white/90 border border-[#c69c4e]/40 hover:border-[#c69c4e] font-montserrat text-sm font-semibold text-[#162842] hover:text-[#c69c4e] flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Calendar className="w-4 h-4 text-[#c69c4e]" />
            <span>Salvar na Agenda</span>
          </a>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 flex flex-col items-center gap-2 text-[#162842]"
        >
          <span className="font-montserrat text-[11px] uppercase tracking-[0.25em] text-[#c69c4e] font-bold">
            Descubra todos os Detalhes do Casamento
          </span>
          <a
            href="#historia"
            aria-label="Rolar para baixo"
            className="p-2 rounded-full border border-[#c69c4e]/40 bg-white/60 hover:bg-white text-[#162842] hover:text-[#c69c4e] transition-all animate-bounce shadow-sm"
          >
            <ArrowDown className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

