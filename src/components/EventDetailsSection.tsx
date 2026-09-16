import { motion } from 'motion/react';
import { Church, GlassWater, Clock, MapPin, Navigation, Car, ExternalLink, Sparkles, Compass } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';

export default function EventDetailsSection() {
  return (
    <section id="detalhes" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Decorative Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f121d]/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#f5d77f] font-semibold">
              O Grande Dia
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide gold-gradient-text mb-4">
            Cerimónia & Banquete Imperial
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light">
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
            className="rounded-3xl crystal-card p-8 sm:p-10 border border-white/10 hover:border-[#d4af37]/50 transition-all relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37]/30 to-[#946d05]/10 border border-[#d4af37]/40 flex items-center justify-center">
                  <Church className="w-7 h-7 text-[#f5d77f]" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 font-montserrat text-xs font-semibold text-[#f5d77f] tracking-widest uppercase">
                  16:00 HRS
                </span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-2">
                A Cerimónia Solene
              </h3>
              
              <p className="font-montserrat text-xs uppercase tracking-widest text-[#d4af37] mb-4 font-medium">
                Catedral de Cristal dos Jardins Reais
              </p>

              <p className="font-cormorant text-lg text-gray-200 leading-relaxed italic mb-6">
                A união sagrada com orquestra sinfónica, coro lírico e a presença solene de nossos familiares e amigos mais estimados.
              </p>

              <div className="space-y-3 font-montserrat text-xs sm:text-sm text-gray-300 border-t border-white/10 pt-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Pontualidade Imperial:</strong> Recepção dos convidados a partir das 15:30. Início impreterível às 16:00.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Local:</strong> {WEDDING_DETAILS.venueName}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-3">
              <a
                href={WEDDING_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl crystal-card border border-[#d4af37]/40 hover:bg-[#d4af37]/20 font-montserrat text-xs font-semibold text-center text-[#f5d77f] flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>
              <a
                href={WEDDING_DETAILS.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl crystal-card border border-white/10 hover:border-white/30 font-montserrat text-xs font-medium text-center text-gray-200 flex items-center justify-center gap-2 transition-all"
              >
                <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
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
            className="rounded-3xl crystal-card p-8 sm:p-10 border border-white/10 hover:border-[#d4af37]/50 transition-all relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#f5d77f]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37]/30 to-[#946d05]/10 border border-[#d4af37]/40 flex items-center justify-center">
                  <GlassWater className="w-7 h-7 text-[#f5d77f]" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 font-montserrat text-xs font-semibold text-[#f5d77f] tracking-widest uppercase">
                  18:30 HRS
                </span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-2">
                O Banquete & Baile de Gala
              </h3>
              
              <p className="font-montserrat text-xs uppercase tracking-widest text-[#d4af37] mb-4 font-medium">
                Salão Nobre das Esmeraldas & Pátio dos Cristais
              </p>

              <p className="font-cormorant text-lg text-gray-200 leading-relaxed italic mb-6">
                Uma noite de alta gastronomia, coquetelaria fina de autor, brinde de cristal com Champagne francês e performances artísticas ao vivo.
              </p>

              <div className="space-y-3 font-montserrat text-xs sm:text-sm text-gray-300 border-t border-white/10 pt-4">
                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Valet Parking & Segurança:</strong> Serviço exclusivo de valet cortesia no local e recepcionistas VIP.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Check-in Tecnológico:</strong> Apresente seu Pass Digital NFC ou QR Code do convite na recepção.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-3">
              <a
                href={WEDDING_DETAILS.uberRideUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-black via-[#1c1f2e] to-black border border-[#d4af37]/50 font-montserrat text-xs font-semibold text-center text-[#f5d77f] flex items-center justify-center gap-2 hover:border-[#d4af37] transition-all"
              >
                <Car className="w-3.5 h-3.5" />
                <span>Pedir Uber ao Local</span>
              </a>
              <a
                href={WEDDING_DETAILS.appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl crystal-card border border-white/10 hover:border-white/30 font-montserrat text-xs font-medium text-center text-gray-200 flex items-center justify-center gap-2 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Apple Maps</span>
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
