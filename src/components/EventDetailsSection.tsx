import { motion } from 'motion/react';
import { Church, GlassWater, Clock, MapPin, Navigation, Car, ExternalLink, Sparkles, Compass } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';

export default function EventDetailsSection() {
  return (
    <section id="detalhes" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Decorative Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#dfe6ec]/50 to-transparent pointer-events-none" />

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
            Cerimónia & Banquete Imperial
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-[#162842]/90 max-w-xl mx-auto font-medium">
            Um cenário arquitetónico majestoso, projetado para proporcionar uma experiência sensorial e gastronómica sem precedentes.
          </p>
        </div>

        {/* Dual Cards: Cerimónia & Recepção */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Cerimónia Religiosa */}
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
                <span className="px-4 py-1 rounded-full bg-[#162842] font-montserrat text-xs font-bold text-[#c69c4e] tracking-widest uppercase shadow-sm">
                  16:00 HRS
                </span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#162842] mb-2">
                A Cerimónia Solene
              </h3>
              
              <p className="font-montserrat text-xs uppercase tracking-widest text-[#c69c4e] mb-4 font-bold">
                Catedral de Cristal dos Jardins Reais
              </p>

              <p className="font-cormorant text-lg sm:text-xl text-[#162842] leading-relaxed italic mb-6 font-medium">
                A união sagrada com orquestra sinfónica, coro lírico e a presença solene de nossos familiares e amigos mais estimados.
              </p>

              <div className="space-y-3 font-montserrat text-xs sm:text-sm text-[#162842] border-t border-[#dfe6ec] pt-4 font-medium">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#c69c4e] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#162842] font-bold">Pontualidade:</strong> Recepção dos convidados a partir das 15:30. Início impreterível às 16:00.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#c69c4e] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#162842] font-bold">Local:</strong> {WEDDING_DETAILS.venueName} ({WEDDING_DETAILS.cityCountry})
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#dfe6ec] flex flex-wrap gap-3">
              <a
                href={WEDDING_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl gold-button font-montserrat text-xs font-bold text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>
              <a
                href={WEDDING_DETAILS.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-white border border-[#c69c4e]/50 hover:border-[#c69c4e] font-montserrat text-xs font-bold text-center text-[#162842] flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Compass className="w-3.5 h-3.5 text-[#c69c4e]" />
                <span>Abrir no Waze</span>
              </a>
            </div>
          </motion.div>

          {/* Card 2: Grande Banquete & Gala */}
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
                  <GlassWater className="w-7 h-7 text-[#c69c4e]" />
                </div>
                <span className="px-4 py-1 rounded-full bg-[#162842] font-montserrat text-xs font-bold text-[#c69c4e] tracking-widest uppercase shadow-sm">
                  18:30 HRS
                </span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#162842] mb-2">
                O Banquete & Baile de Gala
              </h3>
              
              <p className="font-montserrat text-xs uppercase tracking-widest text-[#c69c4e] mb-4 font-bold">
                Salão Nobre Imperial & Pátio dos Cristais
              </p>

              <p className="font-cormorant text-lg sm:text-xl text-[#162842] leading-relaxed italic mb-6 font-medium">
                Uma noite de alta gastronomia, coquetelaria fina de autor, brinde de cristal com Champagne francês e performances artísticas ao vivo.
              </p>

              <div className="space-y-3 font-montserrat text-xs sm:text-sm text-[#162842] border-t border-[#dfe6ec] pt-4 font-medium">
                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-[#c69c4e] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#162842] font-bold">Valet Parking & Segurança:</strong> Serviço exclusivo de valet cortesia no local e recepcionistas.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#c69c4e] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#162842] font-bold">Recepção de Gala:</strong> Boas-vindas personalizadas na entrada dos salões.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#dfe6ec] flex flex-wrap gap-3">
              <a
                href={WEDDING_DETAILS.uberRideUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-[#162842] hover:bg-[#162842]/90 border border-[#c69c4e] font-montserrat text-xs font-bold text-center text-[#c69c4e] flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Car className="w-3.5 h-3.5" />
                <span>Pedir Táxi / Uber</span>
              </a>
              <a
                href={WEDDING_DETAILS.appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-white border border-[#c69c4e]/50 hover:border-[#c69c4e] font-montserrat text-xs font-bold text-center text-[#162842] flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#c69c4e]" />
                <span>Apple Maps</span>
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
