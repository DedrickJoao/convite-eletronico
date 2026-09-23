import { motion } from 'motion/react';
import { Heart, Sparkles, Quote, Crown } from 'lucide-react';
import { LOVE_STORY_MILESTONES, WEDDING_DETAILS } from '../data/weddingData';

export default function LoveStorySection() {
  return (
    <section id="historia" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Subtle Crystal Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-4">
            <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#f5d77f] font-semibold">
              Nossa História de Amor
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide gold-gradient-text mb-4">
            Duas Almas, Um Só Destino
          </h2>
          
          <p className="font-cormorant text-lg sm:text-xl text-gray-300 italic">
            &ldquo;O amor não se mede pelo tempo que dura, mas pela intensidade e eternidade com que transforma cada instante.&rdquo;
          </p>
        </div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LOVE_STORY_MILESTONES.map((milestone, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="group rounded-2xl crystal-card overflow-hidden border border-white/10 hover:border-[#d4af37]/50 transition-all duration-500 flex flex-col"
            >
              {/* Image Frame with Zoom Effect */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={milestone.image}
                  alt={milestone.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent opacity-80" />
                
                {/* Year / Phase Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0b0c10]/80 backdrop-blur-md border border-[#d4af37]/40 text-[11px] font-montserrat tracking-widest text-[#f5d77f] uppercase font-semibold">
                  {milestone.year}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#f5d77f] transition-colors">
                    {milestone.title}
                  </h3>
                  <p className="font-montserrat text-xs sm:text-sm text-gray-300 leading-relaxed mt-2.5 font-light">
                    {milestone.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-montserrat text-[#d4af37]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="tracking-wider uppercase text-[10px]">Eternamente Marcado</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Romantic Vows & Trust Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 rounded-3xl crystal-card p-8 sm:p-12 gold-border-glow text-center relative overflow-hidden"
        >
          <Quote className="w-12 h-12 text-[#d4af37]/20 mx-auto mb-4" />
          
          <h3 className="font-alex text-3xl sm:text-5xl text-[#fcedc5] mb-4">
            A Promessa de Dionísio & Benedita
          </h3>
          
          <p className="font-cormorant text-xl sm:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed italic">
            &ldquo;Que falte tudo menos Deus... Diante do Criador e das pessoas mais preciosas de nossas vidas, selaremos um juramento inabalável em Maputo. O dia 12 de Dezembro de 2026 será a celebração definitiva da honra, lealdade e do amor mais sublime.&rdquo;
          </p>
          
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="font-cinzel text-sm sm:text-base font-bold gold-gradient-text tracking-widest uppercase">
              Dionísio & Benedita
            </span>
            <span className="text-[#d4af37]">•</span>
            <span className="font-montserrat text-xs tracking-widest text-gray-400 uppercase">
              Maputo 2026
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
