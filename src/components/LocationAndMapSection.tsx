import { motion } from 'motion/react';
import { MapPin, Navigation, Compass, Car, Plane, Hotel, ExternalLink, Shield } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';

export default function LocationAndMapSection() {
  return (
    <section id="localizacao" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(198,156,78,0.12)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#c69c4e]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#162842] font-bold">
              O Palácio dos Sonhos
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wide text-[#162842] mb-4">
            Localização & Acesso Exclusivo
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-[#162842]/90 max-w-xl mx-auto font-medium">
            Um refúgio aristocrático rodeado por jardins exuberantes, fontes de água e arquitetura nobre em Maputo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Visual Map Card */}
          <div className="lg:col-span-7 rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-8 border border-[#c69c4e]/40 shadow-xl flex flex-col justify-between space-y-6">
            
            {/* Visual Estate Map Mockup */}
            <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-[#c69c4e]/40 shadow-inner group">
              <img
                src="https://images.unsplash.com/photo-1544971587-b842c27f8e14?w=1000&q=80"
                alt="Palácio Imperial das Esmeraldas"
                className="w-full h-full object-cover filter brightness-85 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#162842]/80 via-transparent to-black/30" />

              {/* Central Gold Pin Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#c69c4e] border-2 border-white shadow-[0_0_25px_rgba(198,156,78,0.8)] flex items-center justify-center animate-bounce">
                  <MapPin className="w-6 h-6 text-[#162842] fill-[#162842]" />
                </div>
                <div className="mt-2 px-3.5 py-1 rounded-full bg-[#162842] border border-[#c69c4e] text-xs font-cinzel font-bold text-[#c69c4e] whitespace-nowrap shadow-xl">
                  {WEDDING_DETAILS.venueName}
                </div>
              </div>

              {/* Coordinates Pill */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-[#162842]/90 backdrop-blur-md border border-[#c69c4e]/40 text-[11px] font-mono text-white font-semibold">
                GPS: Maputo • Moçambique
              </div>
            </div>

            {/* Address & Quick Directions Buttons */}
            <div>
              <h3 className="font-cinzel text-xl font-bold text-[#162842] mb-1">
                {WEDDING_DETAILS.venueName}
              </h3>
              <p className="font-montserrat text-xs sm:text-sm text-[#162842]/90 mb-4 font-semibold">
                {WEDDING_DETAILS.venueAddress} • {WEDDING_DETAILS.cityCountry}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <a
                  href={WEDDING_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl gold-button text-xs font-montserrat font-bold flex items-center justify-center gap-1.5 shadow-sm text-center"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>

                <a
                  href={WEDDING_DETAILS.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#dfe6ec] border border-[#c69c4e]/40 hover:border-[#c69c4e] text-xs font-montserrat font-bold text-[#162842] flex items-center justify-center gap-1.5 transition-all text-center shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#c69c4e]" />
                  <span>Apple Maps</span>
                </a>

                <a
                  href={WEDDING_DETAILS.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#dfe6ec] border border-[#c69c4e]/40 hover:border-[#c69c4e] text-xs font-montserrat font-bold text-[#162842] flex items-center justify-center gap-1.5 transition-all text-center shadow-sm"
                >
                  <Compass className="w-3.5 h-3.5 text-[#c69c4e]" />
                  <span>Waze</span>
                </a>

                <a
                  href={WEDDING_DETAILS.uberRideUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#162842] text-xs font-montserrat font-bold text-[#c69c4e] flex items-center justify-center gap-1.5 shadow-sm text-center"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Pedir Uber</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Accommodations & Concierge */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hotels Recommendation */}
            <div className="rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-7 border border-[#c69c4e]/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#dfe6ec] border border-[#c69c4e]/50 flex items-center justify-center shadow-sm">
                  <Hotel className="w-5 h-5 text-[#c69c4e]" />
                </div>
                <div>
                  <h4 className="font-cinzel text-base font-bold text-[#162842]">
                    Hospedagem Recomendada
                  </h4>
                  <span className="text-[11px] font-montserrat text-[#c69c4e] uppercase tracking-wider font-bold">
                    Tarifa Especial com os Noivos
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs font-montserrat text-[#162842]">
                <div className="p-3.5 rounded-xl bg-[#dfe6ec]/50 border border-[#c69c4e]/30">
                  <p className="font-bold text-[#162842] text-sm">Hotel Polana Serena (Maputo)</p>
                  <p className="text-[#162842]/80 text-[11px] font-medium mt-0.5">A 3 minutos do local • Código Especial: <strong className="text-[#c69c4e] font-bold">ROYAL-DB26</strong></p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#dfe6ec]/50 border border-[#c69c4e]/30">
                  <p className="font-bold text-[#162842] text-sm">Radisson Blu Hotel Maputo</p>
                  <p className="text-[#162842]/80 text-[11px] font-medium mt-0.5">Orla marítima da Marginal com transfer privativo</p>
                </div>
              </div>
            </div>

            {/* Airport & Concierge */}
            <div className="rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-7 border border-[#c69c4e]/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#dfe6ec] border border-[#c69c4e]/50 flex items-center justify-center shadow-sm">
                  <Plane className="w-5 h-5 text-[#c69c4e]" />
                </div>
                <div>
                  <h4 className="font-cinzel text-base font-bold text-[#162842]">
                    Convidados de Outras Cidades & Países
                  </h4>
                  <span className="text-[11px] font-montserrat text-[#c69c4e] uppercase tracking-wider font-bold">
                    Aeroporto Internacional de Maputo (MPM)
                  </span>
                </div>
              </div>

              <p className="text-xs font-montserrat text-[#162842]/90 leading-relaxed font-medium">
                Para convidados vindos de outras províncias ou do exterior, nossa equipe de cerimonial providenciará suporte e transfers privativos a partir do aeroporto.
              </p>

              <div className="flex items-center gap-2 text-xs font-montserrat text-[#162842] font-bold">
                <Shield className="w-4 h-4 text-[#c69c4e]" />
                <span>Assessoria: {WEDDING_DETAILS.organizerContact}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
