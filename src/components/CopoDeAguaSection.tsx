import { motion } from 'motion/react';
import { GlassWater, MapPin, Navigation, Clock, Sparkles } from 'lucide-react';

export default function CopoDeAguaSection() {
  const orquideaMapUrl = "https://www.google.com/maps/search/?api=1&query=Orqu%C3%ADdea+Eventos+Matola+Rio";

  return (
    <section 
      id="copo-de-agua" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#ebf0f5] via-[#f7f9fb] to-[#ebf1f6] border-y border-[#c69c4e]/30 shadow-inner"
    >
      {/* Decorative Atmosphere Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(198,156,78,0.14)_0%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(22,40,66,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Main Card: Copo de Água */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl bg-white/95 backdrop-blur-md p-8 sm:p-12 border border-[#c69c4e]/50 hover:border-[#c69c4e] shadow-2xl relative overflow-hidden text-center"
        >
          {/* Top Decorative Corner Accent */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#c69c4e]/15 to-transparent rounded-bl-full pointer-events-none" />

          {/* Icon Badge */}
          <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#dfe6ec] via-[#f2f6fa] to-white border-2 border-[#c69c4e]/50 flex items-center justify-center shadow-md mb-6">
            <GlassWater className="w-10 h-10 text-[#c69c4e]" />
          </div>

          {/* Title */}
          <h3 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#162842] mb-3 tracking-wide">
            Copo de Água
          </h3>

          {/* Status Badge: Por Confirmar */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#162842] text-white border border-[#c69c4e] shadow-md mb-6">
            <Clock className="w-4 h-4 text-[#c69c4e]" />
            <span className="font-montserrat text-xs sm:text-sm font-bold uppercase tracking-widest text-[#c69c4e]">
              Horário: Por Confirmar
            </span>
          </div>

          {/* Location Information */}
          <div className="max-w-md mx-auto my-4 p-5 rounded-2xl bg-[#dfe6ec]/40 border border-[#c69c4e]/30 space-y-2">
            <div className="flex items-center justify-center gap-2 text-[#c69c4e]">
              <MapPin className="w-5 h-5 shrink-0" />
              <span className="font-montserrat text-xs uppercase tracking-widest font-bold text-[#162842]">
                Local do Evento
              </span>
            </div>
            
            <p className="font-cinzel text-xl sm:text-2xl font-bold text-[#162842]">
              Orquídea Eventos
            </p>
            
            <p className="font-montserrat text-sm sm:text-base text-[#162842]/85 font-medium capitalize">
              Matola Rio, Moçambique
            </p>
          </div>

          <p className="font-cormorant text-base sm:text-lg italic text-[#162842]/85 max-w-lg mx-auto mt-4 mb-8">
            Em breve disponibilizaremos os detalhes definitivos de horário e protocolo de entrada para o nosso brinde festivo.
          </p>

          {/* Dedicated Map Button */}
          <div className="flex justify-center">
            <a
              href={orquideaMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full gold-button font-montserrat text-xs sm:text-sm uppercase tracking-widest font-bold text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
            >
              <Navigation className="w-4 h-4 text-white group-hover:rotate-45 transition-transform" />
              <span>Localização no mapa</span>
              <Sparkles className="w-4 h-4 text-white/80" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
