import { type ElementType } from 'react';
import { motion } from 'motion/react';
import { Sparkles, HeartHandshake, GlassWater, UtensilsCrossed, Cake, Music, Clock } from 'lucide-react';
import { TIMELINE_EVENTS } from '../data/weddingData';

const iconMap: Record<string, ElementType> = {
  Sparkles,
  HeartHandshake,
  GlassWater,
  UtensilsCrossed,
  Cake,
  Music
};

export default function TimelineSection() {
  return (
    <section id="roteiro" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-4">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#f5d77f] font-semibold">
              Roteiro Imperial da Noite
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide gold-gradient-text mb-4">
            A Cronologia da Celebração
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-gray-300 font-light">
            Cada minuto foi meticulosamente planejado para criar memórias radiantes que durarão por toda a vida.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative">
          
          {/* Vertical Golden Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#d4af37]/40 to-transparent" />

          <div className="space-y-10 md:space-y-12">
            {TIMELINE_EVENTS.map((event, index) => {
              const IconComponent = iconMap[event.iconName] || Sparkles;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.7 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'}`}>
                    <div className="rounded-2xl crystal-card p-6 sm:p-7 border border-white/10 hover:border-[#d4af37]/40 transition-all group">
                      
                      {/* Time Badge */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-xs font-montserrat font-bold text-[#f5d77f] tracking-wider mb-3 ${
                        isEven ? '' : 'md:ml-auto'
                      }`}>
                        <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{event.time}</span>
                      </div>

                      <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white group-hover:text-[#f5d77f] transition-colors">
                        {event.title}
                      </h3>

                      <p className="font-montserrat text-xs uppercase tracking-wider text-[#d4af37] font-semibold mt-1 mb-2">
                        {event.location}
                      </p>

                      <p className="font-cormorant text-base sm:text-lg text-gray-200 italic leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Central Icon Node */}
                  <div className="relative my-4 md:my-0 flex items-center justify-center shrink-0 z-20">
                    <div className="w-12 h-12 rounded-full bg-[#0b0c10] border-2 border-[#d4af37] p-1 shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#d4af37]/30 to-[#946d05]/20 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-[#f5d77f]" />
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer for Balance on Desktop */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
