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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(198,156,78,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 mb-4 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-[#c69c4e]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#162842] font-bold">
              Roteiro da Noite
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wide text-[#162842] mb-4">
            A Cronologia da Celebração
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-[#162842]/90 font-medium">
            Cada minuto foi meticulosamente planejado para criar memórias radiantes que durarão por toda a vida.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative">
          
          {/* Vertical Golden Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#c69c4e] to-transparent" />

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
                    <div className="rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-7 border border-[#c69c4e]/40 hover:border-[#c69c4e] shadow-lg hover:shadow-xl transition-all group">
                      
                      {/* Time Badge */}
                      <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#162842] text-xs font-montserrat font-bold text-[#c69c4e] tracking-wider mb-3 shadow-sm ${
                        isEven ? '' : 'md:ml-auto'
                      }`}>
                        <Clock className="w-3.5 h-3.5 text-[#c69c4e]" />
                        <span>{event.time}</span>
                      </div>

                      <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#162842] group-hover:text-[#c69c4e] transition-colors">
                        {event.title}
                      </h3>

                      <p className="font-montserrat text-xs uppercase tracking-wider text-[#c69c4e] font-bold mt-1 mb-2">
                        {event.location}
                      </p>

                      <p className="font-cormorant text-base sm:text-lg text-[#162842] italic leading-relaxed font-medium">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Central Icon Node */}
                  <div className="relative my-4 md:my-0 flex items-center justify-center shrink-0 z-20">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-[#c69c4e] p-1 shadow-[0_0_20px_rgba(198,156,78,0.4)] flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-[#dfe6ec] flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-[#c69c4e]" />
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
