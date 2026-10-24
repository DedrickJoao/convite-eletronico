import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Plane, Hotel, Shield, Church, GlassWater } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';

export default function LocationAndMapSection() {
  const [selectedVenue, setSelectedVenue] = useState<'catedral' | 'copodeagua'>('catedral');

  const venues = {
    catedral: {
      name: "Sé Catedral de Maputo",
      label: "Cerimónia Religiosa (9h30) & Civil (11h00)",
      address: "Praça da Independência, Centro • Maputo, Moçambique",
      googleMapsUrl: WEDDING_DETAILS.googleMapsUrl,
      image: "https://images.unsplash.com/photo-1544971587-b842c27f8e14?w=1000&q=80",
      gpsText: "GPS: Praça da Independência, Maputo"
    },
    copodeagua: {
      name: "Orquídea Eventos",
      label: "Copo de Água (14h00)",
      address: "Matola Rio • Moçambique",
      googleMapsUrl: WEDDING_DETAILS.receptionGoogleMapsUrl,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1000&q=80",
      gpsText: "GPS: Matola Rio, Moçambique"
    }
  };

  const current = venues[selectedVenue];

  return (
    <section 
      id="localizacao" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#f5f8fb] via-[#e8eff5] to-[#dbe4ee] border-b border-[#c69c4e]/30 shadow-inner"
    >
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(198,156,78,0.15)_0%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[radial-gradient(circle,rgba(22,40,66,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#c69c4e]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#162842] font-bold">
              Localização & Roteiro
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wide text-[#162842] mb-4">
            Como Chegar aos Locais
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-[#162842]/90 max-w-xl mx-auto font-medium">
            Clique no local desejado para obter rotas diretas e navegação GPS curva a curva.
          </p>

          {/* Venue Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setSelectedVenue('catedral')}
              className={`px-5 py-2.5 rounded-full font-montserrat text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                selectedVenue === 'catedral'
                  ? 'bg-[#162842] text-[#c69c4e] border-2 border-[#c69c4e] scale-105'
                  : 'bg-white/80 text-[#162842] border border-[#c69c4e]/40 hover:bg-white'
              }`}
            >
              <Church className="w-4 h-4 text-[#c69c4e]" />
              <span>1. Sé Catedral (Cerimónias)</span>
            </button>

            <button
              onClick={() => setSelectedVenue('copodeagua')}
              className={`px-5 py-2.5 rounded-full font-montserrat text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                selectedVenue === 'copodeagua'
                  ? 'bg-[#162842] text-[#c69c4e] border-2 border-[#c69c4e] scale-105'
                  : 'bg-white/80 text-[#162842] border border-[#c69c4e]/40 hover:bg-white'
              }`}
            >
              <GlassWater className="w-4 h-4 text-[#c69c4e]" />
              <span>2. Orquídea Eventos (Copo de Água)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Visual Map Card */}
          <div className="lg:col-span-7 rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-8 border border-[#c69c4e]/40 shadow-xl flex flex-col justify-between space-y-6">
            
            {/* Visual Estate Map Mockup with direct navigation click */}
            <a
              href={current.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Clique para abrir e seguir no Google Maps"
              className="relative w-full h-80 rounded-2xl overflow-hidden border border-[#c69c4e]/40 shadow-inner group block cursor-pointer"
            >
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover filter brightness-85 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#162842]/85 via-[#162842]/20 to-black/30 group-hover:from-[#162842]/70 transition-colors" />

              {/* Central Gold Pin Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#c69c4e] border-2 border-white shadow-[0_0_25px_rgba(198,156,78,0.8)] flex items-center justify-center animate-bounce">
                  <MapPin className="w-6 h-6 text-[#162842] fill-[#162842]" />
                </div>
                <div className="mt-2 px-4 py-1.5 rounded-full bg-[#162842] border border-[#c69c4e] text-xs font-cinzel font-bold text-[#c69c4e] whitespace-nowrap shadow-xl">
                  {current.name}
                </div>
              </div>

              {/* Coordinates Pill */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-[#162842]/90 backdrop-blur-md border border-[#c69c4e]/40 text-[11px] font-mono text-white font-semibold">
                {current.gpsText}
              </div>

              {/* Click to Navigate Pill */}
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#c69c4e] text-[#162842] text-[11px] font-montserrat font-bold flex items-center gap-1 shadow-md">
                <Navigation className="w-3 h-3" />
                <span>Toque para Seguir Rota</span>
              </div>
            </a>

            {/* Address & Quick Directions Buttons */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#162842]">
                  {current.name}
                </h3>
                <span className="text-[11px] font-montserrat font-bold text-[#c69c4e] uppercase tracking-wider bg-[#162842] px-3 py-1 rounded-full shrink-0">
                  {current.label}
                </span>
              </div>

              <p className="font-montserrat text-xs sm:text-sm text-[#162842]/90 mb-5 font-semibold">
                {current.address}
              </p>

              <div className="pt-2">
                <a
                  href={current.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl gold-button text-xs sm:text-sm font-montserrat font-bold flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all text-center"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Localização no mapa</span>
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

              <div className="flex flex-wrap items-center gap-2 text-xs font-montserrat text-[#162842] font-bold">
                <Shield className="w-4 h-4 text-[#c69c4e] shrink-0" />
                <span>Assessoria:</span>
                <a href="tel:+258877002267" className="text-[#c69c4e] hover:underline font-bold">+258 87 700 2267</a>
                <span>/</span>
                <a href="tel:+258867561010" className="text-[#c69c4e] hover:underline font-bold">+258 86 756 1010</a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
