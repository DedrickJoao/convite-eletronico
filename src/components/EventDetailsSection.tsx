import { motion } from 'motion/react';
import { Church, Scroll, Clock, MapPin, Navigation, Sparkles } from 'lucide-react';

export default function EventDetailsSection() {
  const seCatedralMapUrl = "https://www.google.com/maps/search/?api=1&query=S%C3%A9+Catedral+de+Maputo";

  return (
    <section 
      id="detalhes" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#f2f6fa] via-[#e9eff5] to-[#ebf0f5] border-b border-[#c69c4e]/30"
    >
      {/* Background Decorative Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,156,78,0.14)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,transparent_60%)] pointer-events-none blur-2xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#c69c4e]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#162842] font-bold">
              O Grande Dia
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wide text-[#162842] mb-4">
            Programa do Evento
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-[#162842]/90 max-w-xl mx-auto font-medium">
            Celebração das uniões religiosa e civil do nosso matrimónio na Sé Catedral de Maputo.
          </p>
        </div>

        {/* Dual Cards: Cerimónia Religiosa & Cerimónia Civil */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Cerimónia Religiosa, 9h:30 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl bg-white/95 backdrop-blur-md p-8 sm:p-10 border border-[#c69c4e]/40 hover:border-[#c69c4e] shadow-xl hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#c69c4e]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#dfe6ec] border border-[#c69c4e]/50 flex items-center justify-center shadow-sm">
                  <Church className="w-7 h-7 text-[#c69c4e]" />
                </div>
                <span className="px-4 py-1.5 rounded-full bg-[#162842] font-montserrat text-xs font-bold text-[#c69c4e] tracking-widest uppercase shadow-sm">
                  9h:30
                </span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#162842] mb-2">
                Cerimónia Religiosa, 9h:30
              </h3>
              
              <p className="font-montserrat text-xs uppercase tracking-widest text-[#c69c4e] mb-4 font-bold">
                Sé Catedral de Maputo
              </p>

              <p className="font-cormorant text-lg sm:text-xl text-[#162842] leading-relaxed italic mb-6 font-medium">
                A bênção sagrada e consagração do matrimónio com oração, cânticos e a presença solene de nossos familiares e amigos.
              </p>

              <div className="space-y-3 font-montserrat text-xs sm:text-sm text-[#162842] border-t border-[#dfe6ec] pt-4 font-medium">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#c69c4e] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#162842] font-bold">Horário:</strong> 9h:30
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#c69c4e] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#162842] font-bold">Local:</strong> Sé Catedral de Maputo
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#dfe6ec]">
              <a
                href={seCatedralMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl gold-button font-montserrat text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2.5 shadow-md transition-all hover:scale-[1.01]"
              >
                <Navigation className="w-4 h-4" />
                <span>Google Maps</span>
              </a>
            </div>
          </motion.div>

          {/* Card 2: Cerimónia Civil, 11h00 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl bg-white/95 backdrop-blur-md p-8 sm:p-10 border border-[#c69c4e]/40 hover:border-[#c69c4e] shadow-xl hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#c69c4e]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#dfe6ec] border border-[#c69c4e]/50 flex items-center justify-center shadow-sm">
                  <Scroll className="w-7 h-7 text-[#c69c4e]" />
                </div>
                <span className="px-4 py-1.5 rounded-full bg-[#162842] font-montserrat text-xs font-bold text-[#c69c4e] tracking-widest uppercase shadow-sm">
                  11h00
                </span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#162842] mb-2">
                Cerimónia Civil 11h00
              </h3>
              
              <p className="font-montserrat text-xs uppercase tracking-widest text-[#c69c4e] mb-4 font-bold">
                Sé Catedral de Maputo
              </p>

              <p className="font-cormorant text-lg sm:text-xl text-[#162842] leading-relaxed italic mb-6 font-medium">
                A união legal e o registo oficial perante o oficial do registo civil, padrinhos e testemunhas de honra.
              </p>

              <div className="space-y-3 font-montserrat text-xs sm:text-sm text-[#162842] border-t border-[#dfe6ec] pt-4 font-medium">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#c69c4e] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#162842] font-bold">Horário:</strong> 11h00
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#c69c4e] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#162842] font-bold">Local:</strong> Sé Catedral de Maputo
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#dfe6ec]">
              <a
                href={seCatedralMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl gold-button font-montserrat text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2.5 shadow-md transition-all hover:scale-[1.01]"
              >
                <Navigation className="w-4 h-4" />
                <span>Google Maps</span>
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
