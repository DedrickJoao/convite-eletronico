import { motion } from 'motion/react';
import { MapPin, Navigation, Compass, Car, Plane, Hotel, Sparkles, ExternalLink, Shield } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';

export default function LocationAndMapSection() {
  return (
    <section id="localizacao" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#f5d77f] font-semibold">
              O Castelo dos Sonhos
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide gold-gradient-text mb-4">
            Localização & Acesso Exclusivo
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light">
            Um refúgio aristocrático rodeado por jardins exuberantes, fontes de água e arquitetura de contos de fadas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Visual Map Card */}
          <div className="lg:col-span-7 rounded-3xl crystal-card p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6">
            
            {/* Visual Estate Map Mockup */}
            <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-white/15 group">
              <img
                src="https://images.unsplash.com/photo-1544971587-b842c27f8e14?w=1000&q=80"
                alt="Palácio Imperial das Esmeraldas"
                className="w-full h-full object-cover filter brightness-75 contrast-110 group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-black/40" />

              {/* Central Gold Pin Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#d4af37] border-2 border-white shadow-[0_0_25px_rgba(212,175,55,0.8)] flex items-center justify-center animate-bounce">
                  <MapPin className="w-6 h-6 text-black fill-black" />
                </div>
                <div className="mt-2 px-3 py-1 rounded-full bg-[#0b0c10]/90 backdrop-blur-md border border-[#d4af37]/60 text-[11px] font-cinzel font-bold text-[#f5d77f] whitespace-nowrap shadow-xl">
                  {WEDDING_DETAILS.venueName}
                </div>
              </div>

              {/* Coordinates Pill */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-gray-300">
                GPS: 38°47&apos;50.4&quot;N 9°23&apos;25.8&quot;W
              </div>
            </div>

            {/* Address & Quick Directions Buttons */}
            <div>
              <h3 className="font-cinzel text-xl font-bold text-white mb-1">
                {WEDDING_DETAILS.venueName}
              </h3>
              <p className="font-montserrat text-xs sm:text-sm text-gray-300 mb-4 font-light">
                {WEDDING_DETAILS.venueAddress} • {WEDDING_DETAILS.cityCountry}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <a
                  href={WEDDING_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl crystal-card border border-[#d4af37]/40 hover:bg-[#d4af37]/20 text-xs font-montserrat font-semibold text-[#f5d77f] flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>

                <a
                  href={WEDDING_DETAILS.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl crystal-card border border-white/10 hover:border-white/30 text-xs font-montserrat font-medium text-gray-200 flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Apple Maps</span>
                </a>

                <a
                  href={WEDDING_DETAILS.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl crystal-card border border-white/10 hover:border-white/30 text-xs font-montserrat font-medium text-gray-200 flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Waze</span>
                </a>

                <a
                  href={WEDDING_DETAILS.uberRideUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-black border border-[#d4af37]/60 text-xs font-montserrat font-semibold text-[#f5d77f] flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Pedir Uber</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Guest Concierge & Accommodations */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hotels Recommendation */}
            <div className="rounded-3xl crystal-card p-6 sm:p-7 border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center">
                  <Hotel className="w-5 h-5 text-[#f5d77f]" />
                </div>
                <div>
                  <h4 className="font-cinzel text-base font-bold text-white">
                    Hospedagem Recomendada (5 Estrelas)
                  </h4>
                  <span className="text-[10px] font-montserrat text-[#d4af37] uppercase tracking-wider">
                    Tarifa Especial com o Código dos Noivos
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs font-montserrat text-gray-300">
                <div className="p-3 rounded-xl bg-[#080a10]/80 border border-white/5">
                  <p className="font-bold text-white">Tivoli Palácio de Seteais Hotel</p>
                  <p className="text-gray-400 text-[11px]">A 5 minutos do evento • Código VIP: <strong className="text-[#f5d77f]">ROYAL-BD26</strong></p>
                </div>

                <div className="p-3 rounded-xl bg-[#080a10]/80 border border-white/5">
                  <p className="font-bold text-white">Penha Longa Resort & Spa</p>
                  <p className="text-gray-400 text-[11px]">A 10 minutos com transfer VIP incluído</p>
                </div>
              </div>
            </div>

            {/* Airport & Transfer Concierge */}
            <div className="rounded-3xl crystal-card p-6 sm:p-7 border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-[#f5d77f]" />
                </div>
                <div>
                  <h4 className="font-cinzel text-base font-bold text-white">
                    Convidados Internacionais
                  </h4>
                  <span className="text-[10px] font-montserrat text-[#d4af37] uppercase tracking-wider">
                    Recepção no Aeroporto
                  </span>
                </div>
              </div>

              <p className="text-xs font-montserrat text-gray-300 leading-relaxed font-light">
                Para convidados vindos de Angola, Brasil ou outros países, nossa equipe de cerimonial poderá organizar transfers executivos privativos.
              </p>

              <div className="flex items-center gap-2 text-xs font-montserrat text-[#f5d77f]">
                <Shield className="w-4 h-4" />
                <span>Assessoria VIP: {WEDDING_DETAILS.organizerContact}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
