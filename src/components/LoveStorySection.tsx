import { motion } from 'motion/react';
import { Sparkles, Quote, Crown } from 'lucide-react';
import { LOVE_STORY_MILESTONES, WEDDING_DETAILS } from '../data/weddingData';

export default function LoveStorySection() {
  return (
    <section id="historia" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Subtle Crystal Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,156,78,0.12)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 mb-4 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-[#c69c4e]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#162842] font-bold">
              Nossa História de Amor
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wide text-[#162842] mb-4">
            Duas Almas, Um Só Destino
          </h2>
          
          <p className="font-cormorant text-xl sm:text-2xl text-[#162842] italic font-semibold">
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
              className="group rounded-3xl bg-white/95 backdrop-blur-md overflow-hidden border border-[#c69c4e]/40 hover:border-[#c69c4e] shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Image Frame with Zoom Effect */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={milestone.image}
                  alt={milestone.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#162842]/80 via-transparent to-transparent opacity-80" />
                
                {/* Year / Phase Badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#162842] border border-[#c69c4e] text-xs font-montserrat tracking-widest text-[#c69c4e] uppercase font-bold shadow-md">
                  {milestone.year}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-[#162842] group-hover:text-[#c69c4e] transition-colors">
                    {milestone.title}
                  </h3>
                  <p className="font-montserrat text-xs sm:text-sm text-[#162842]/90 leading-relaxed mt-2.5 font-medium">
                    {milestone.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#dfe6ec] flex items-center gap-2 text-xs font-montserrat text-[#c69c4e] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="tracking-wider uppercase text-[11px]">Eternamente Guardado</span>
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
          className="mt-16 rounded-3xl bg-white/95 backdrop-blur-md p-8 sm:p-12 border-2 border-[#c69c4e]/60 text-center relative overflow-hidden shadow-2xl"
        >
          <Quote className="w-12 h-12 text-[#c69c4e]/30 mx-auto mb-4" />
          
          <h3 className="font-alex text-3xl sm:text-5xl text-[#c69c4e] mb-4 font-bold">
            A Promessa de Dionísio & Benedita
          </h3>
          
          <p className="font-cormorant text-xl sm:text-2xl text-[#162842] max-w-3xl mx-auto leading-relaxed italic font-semibold">
            &ldquo;Que falte tudo menos Deus... Diante do Criador e das pessoas mais preciosas de nossas vidas, selaremos um juramento inabalável em Maputo. O dia 12 de Dezembro de 2026 será a celebração definitiva da honra, lealdade e do amor mais sublime.&rdquo;
          </p>
          
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="font-cinzel text-base sm:text-lg font-bold text-[#162842] tracking-widest uppercase">
              Dionísio & Benedita
            </span>
            <span className="text-[#c69c4e] font-bold">•</span>
            <span className="font-montserrat text-xs tracking-widest text-[#162842]/80 uppercase font-bold">
              Maputo 2026
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
