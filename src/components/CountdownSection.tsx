import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowDown } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';

// Target: 12 de Dezembro de 2026 às 09:30:00 no fuso horário de Maputo (UTC+2 -> 07:30:00 UTC)
const WEDDING_TARGET_UTC = Date.UTC(2026, 11, 12, 7, 30, 0);

function getTimeRemaining() {
  const now = Date.now();
  const difference = WEDDING_TARGET_UTC - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining);

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(getTimeRemaining());
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contagem"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-gradient-to-b from-[#dee6ee] via-[#e8eff5] to-[#dee6ee] border-b border-[#c69c4e]/35 shadow-inner"
    >
      {/* Background Ambient Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(198,156,78,0.14)_0%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[radial-gradient(circle,rgba(93,107,56,0.1)_0%,transparent_60%)] pointer-events-none blur-2xl" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#162842] mb-3 sm:mb-4 tracking-wide">
          O Grande Dia se Aproxima
        </h2>

        {/* Ornate Divider with Heart */}
        <div className="flex items-center justify-center gap-3 w-48 sm:w-72 mb-8 sm:mb-10 text-[#c69c4e]">
          <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#c69c4e] to-[#c69c4e]" />
          <Heart className="w-4 h-4 text-[#c69c4e] fill-[#c69c4e]" />
          <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-[#c69c4e] to-[#c69c4e]" />
        </div>

        {/* 4 Countdown Units in Luxury Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-8 border border-[#c69c4e]/30 shadow-[0_15px_45px_rgba(22,40,66,0.12)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c69c4e]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#c69c4e]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center relative z-10">
            {[
              { value: timeLeft.days, label: 'Dias' },
              { value: timeLeft.hours, label: 'Horas' },
              { value: timeLeft.minutes, label: 'Minutos' },
              { value: timeLeft.seconds, label: 'Segundos' },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="py-3 sm:py-6 px-1 sm:px-4 rounded-xl sm:rounded-2xl bg-[#dfe6ec]/40 border border-[#c69c4e]/30 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="font-cinzel text-xl sm:text-4xl md:text-5xl font-black text-[#c69c4e] tabular-nums tracking-tight">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-xs font-montserrat uppercase tracking-wider text-[#162842] font-bold mt-1 sm:mt-2">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-[#c69c4e]/20 text-center font-montserrat text-xs text-[#162842]/85 font-semibold">
            <span>Sábado, 12 de Dezembro de 2026 às 09h30</span>
            <span className="mx-2 text-[#c69c4e]">•</span>
            <span>Sé Catedral de Maputo</span>
          </div>
        </motion.div>

        {/* Scroll Indicator toward Love Story */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 sm:mt-10 flex flex-col items-center gap-2 text-[#162842]"
        >
          <a
            href="#historia"
            aria-label="Ir para Nossa História"
            className="p-2 sm:p-2.5 rounded-full border border-[#c69c4e]/50 bg-white/90 hover:bg-white text-[#162842] hover:text-[#c69c4e] transition-all animate-bounce shadow-sm"
          >
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c69c4e]" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
