import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Sparkles, Heart, Crown, CheckCircle2, QrCode, ArrowDown } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

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
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
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
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
    >
      {/* Ambient Radial Spotlight & Crystal Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,rgba(13,15,23,0)_70%)] pointer-events-none blur-3xl" />
      
      {/* Background Luxury Subtle Ornament Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Crown & Royal Monogram Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#d4af37] via-[#946d05] to-[#fcedc5] p-[1.5px] shadow-[0_0_40px_rgba(212,175,55,0.35)]">
            <div className="w-full h-full rounded-full bg-[#0b0c10] flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37] mb-1 drop-shadow-md" />
              <span className="font-cinzel text-xl sm:text-2xl font-black gold-gradient-text tracking-widest">
                {WEDDING_DETAILS.monogram}
              </span>
              <span className="text-[9px] font-montserrat tracking-[0.25em] text-[#d4af37]/90 font-medium">
                2026
              </span>
            </div>
          </div>
          
          {/* Subtle Outer Orbit Ring */}
          <div className="absolute -inset-2.5 rounded-full border border-dashed border-[#d4af37]/30 animate-spin [animation-duration:45s] pointer-events-none" />
        </motion.div>

        {/* Personalized Guest Welcome */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 px-4 py-1 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 backdrop-blur-md inline-flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f5d77f]" />
            <span className="font-montserrat text-xs tracking-wider text-[#f5d77f]">
              Convidado(a) de Honra: <span className="font-bold text-white">{guestName}</span>
            </span>
          </motion.div>
        )}

        {/* Tagline Pre-Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="space-y-1 mb-3"
        >
          <p className="font-montserrat text-xs sm:text-sm tracking-[0.35em] uppercase text-[#d4af37] font-semibold">
            {WEDDING_DETAILS.tagline}
          </p>
          <p className="font-alex text-2xl sm:text-3xl md:text-4xl text-[#f3f4f6]/90 font-normal">
            Com a bênção de Deus e de nossas famílias
          </p>
        </motion.div>

        {/* Grand Couple Names Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="my-3 sm:my-5"
        >
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider leading-none gold-gradient-text drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            {WEDDING_DETAILS.bride}
          </h1>
          <div className="flex items-center justify-center gap-4 my-2 sm:my-3">
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            <span className="font-alex text-3xl sm:text-5xl text-[#f5d77f]">&</span>
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          </div>
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider leading-none gold-gradient-text drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            {WEDDING_DETAILS.groom}
          </h1>
        </motion.div>

        {/* Impact Phrase / Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-cormorant text-lg sm:text-2xl text-gray-200 italic max-w-2xl mt-4 leading-relaxed font-light"
        >
          &ldquo;{WEDDING_DETAILS.impactPhrase}&rdquo;
        </motion.p>

        {/* Event Key Details Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-montserrat text-gray-300"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full crystal-card border border-[#d4af37]/30">
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span className="font-medium">{WEDDING_DETAILS.dateText}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full crystal-card border border-[#d4af37]/30">
            <MapPin className="w-4 h-4 text-[#d4af37]" />
            <span>{WEDDING_DETAILS.venueName}</span>
          </div>
        </motion.div>

        {/* Live Countdown Clock */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-10 w-full max-w-xl"
        >
          <div className="p-4 sm:p-6 rounded-2xl crystal-card gold-border-glow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />
            
            <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-4 font-semibold">
              Contagem Regressiva para a Glória
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
                  className="p-2 sm:p-3 rounded-xl bg-[#080a10]/80 border border-white/10 flex flex-col items-center justify-center shadow-inner"
                >
                  <span className="font-cinzel text-2xl sm:text-4xl font-bold gold-gradient-text tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-montserrat uppercase tracking-wider text-gray-400 mt-1">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Primary Action Button Cluster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 w-full"
        >
          <button
            id="hero-rsvp-cta"
            onClick={onOpenRsvp}
            className="px-8 py-3.5 rounded-full gold-button font-montserrat text-sm font-bold tracking-widest uppercase flex items-center gap-2.5 shadow-[0_10px_30px_rgba(212,175,55,0.4)] cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5 fill-black" />
            <span>Confirmar Presença (RSVP)</span>
          </button>

          <button
            id="hero-nfc-pass-cta"
            onClick={onOpenNfcPass}
            className="px-6 py-3.5 rounded-full crystal-card border border-[#d4af37]/40 hover:border-[#d4af37] font-montserrat text-sm font-semibold tracking-wider text-white hover:text-[#f5d77f] flex items-center gap-2 transition-all cursor-pointer shadow-lg"
          >
            <QrCode className="w-4 h-4 text-[#d4af37]" />
            <span>Pass Digital & NFC</span>
          </button>

          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full crystal-card border border-white/15 hover:border-white/40 font-montserrat text-sm font-medium text-gray-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>Salvar na Agenda</span>
          </a>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-14 flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="font-montserrat text-[11px] uppercase tracking-[0.25em] text-[#d4af37]/80">
            Descubra os Detalhes da Noite Real
          </span>
          <a
            href="#historia"
            aria-label="Rolar para baixo"
            className="p-2 rounded-full border border-white/10 hover:border-[#d4af37]/50 text-gray-400 hover:text-[#f5d77f] transition-all animate-bounce"
          >
            <ArrowDown className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
