import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Gift, 
  Copy, 
  Check, 
  Store, 
  MapPin, 
  Navigation,
  Smartphone, 
  ExternalLink, 
  Heart
} from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';

export default function GiftRegistrySection() {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  const giftStore = WEDDING_DETAILS.giftStoreDetails || {
    storeName: "Casa das Loiças",
    address: "Avenida Karl Marx, próxima às bombas Petromoc",
    city: "Maputo, Moçambique",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Casa+das+Loi%C3%A7as+Avenida+Karl+Marx+Maputo",
    emolaNumber: "877002266"
  };

  return (
    <section 
      id="presentes" 
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#f2f6fa] via-[#e5eef7] to-[#d8e3ed] border-b border-[#c69c4e]/30 shadow-inner"
    >
      {/* Background Radial Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(198,156,78,0.12)_0%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute top-0 right-10 w-80 h-80 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,transparent_60%)] pointer-events-none blur-2xl" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Main Framed Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-[#c69c4e]/60 shadow-[0_15px_40px_rgba(22,40,66,0.12)] p-6 sm:p-10 lg:p-12 overflow-hidden"
        >
          {/* Decorative Corner Filigrees */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#c69c4e]/60 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#c69c4e]/60 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#c69c4e]/60 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#c69c4e]/60 rounded-br-lg pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#997316] via-[#c69c4e] to-[#e0be7a] p-0.5 shadow-md mb-3">
              <div className="w-full h-full rounded-full bg-[#162842] flex items-center justify-center">
                <Gift className="w-5 h-5 text-[#c69c4e]" />
              </div>
            </div>

            <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold tracking-wide text-[#162842]">
              Sugestão de Presente
            </h2>
            
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c69c4e]/60" />
              <span className="text-[#c69c4e] text-xs">◆</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c69c4e]/60" />
            </div>
          </div>

          {/* Letter / Mensagem aos Convidados */}
          <div className="text-center space-y-3 mb-9 px-2 sm:px-6">
            <p className="font-cinzel text-base sm:text-lg font-bold text-[#c69c4e] tracking-wide">
              Querido(a) Convidado(a),
            </p>

            <p className="font-montserrat text-sm sm:text-base font-semibold text-[#162842] leading-relaxed">
              A sua presença será, sem dúvida, o nosso maior presente!
            </p>

            <p className="font-montserrat text-xs sm:text-sm text-[#162842]/85 font-medium leading-relaxed">
              Mas, se desejar presentear-nos e tornar este momento ainda mais especial, queira encontrar 👇🏽:
            </p>
          </div>

          {/* 2 Clear, Balanced Cards: Localização da Loja & Dados Bancários */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            
            {/* Opção 1: Localização da Loja */}
            <div className="rounded-2xl bg-[#f4f7fa] p-5 sm:p-6 border border-[#c69c4e]/40 shadow-sm flex flex-col justify-between hover:border-[#c69c4e] transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#c69c4e]">
                  <Store className="w-5 h-5" />
                  <span className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#162842]">
                    Localização da Loja
                  </span>
                </div>

                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#162842] mb-1.5">
                  {giftStore.storeName}
                </h3>

                <div className="flex items-start gap-2 text-[#162842]/90 text-xs sm:text-sm mb-4">
                  <MapPin className="w-4 h-4 text-[#c69c4e] shrink-0 mt-0.5" />
                  <p className="font-medium">
                    {giftStore.address}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#dfe6ec]">
                <a
                  href={giftStore.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl gold-button text-xs font-montserrat font-bold shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Localização no mapa</span>
                </a>

                <button
                  onClick={() => copyToClipboard(`${giftStore.storeName} - ${giftStore.address}`, 'store')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-[#c69c4e]/40 text-xs font-montserrat font-bold text-[#162842] flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  {copiedType === 'store' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Endereço Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#c69c4e]" />
                      <span>Copiar Endereço</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Opção 2: Dados Bancários - E-Mola */}
            <div className="rounded-2xl bg-[#f4f7fa] p-5 sm:p-6 border border-[#c69c4e]/40 shadow-sm flex flex-col justify-between hover:border-[#c69c4e] transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#c69c4e]">
                  <Smartphone className="w-5 h-5" />
                  <span className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#162842]">
                    Dados Bancários
                  </span>
                </div>

                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#162842] mb-1.5">
                  E-Mola (Moçambique)
                </h3>

                <div className="p-3 rounded-xl bg-white border border-[#c69c4e]/30 text-center mb-4">
                  <span className="text-[10px] font-montserrat uppercase tracking-wider text-[#162842]/70 font-semibold block mb-0.5">
                    Número E-Mola
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-black text-[#162842] tracking-wider block">
                    877002266
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#dfe6ec]">
                <button
                  onClick={() => copyToClipboard('877002266', 'emola')}
                  className="w-full py-2.5 px-3 rounded-xl gold-button text-xs font-montserrat font-bold shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedType === 'emola' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-900" />
                      <span className="text-emerald-950 font-black">877002266 Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Número (877002266)</span>
                    </>
                  )}
                </button>

                <a
                  href="tel:877002266"
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-[#c69c4e]/40 text-xs font-montserrat font-bold text-[#162842] flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#c69c4e]" />
                  <span>Transferir / Ligar</span>
                </a>
              </div>
            </div>

          </div>

          {/* Agradecimento Final Enquadrado */}
          <div className="pt-6 border-t border-[#c69c4e]/30 text-center">
            <div className="inline-flex items-center gap-1.5 text-[#c69c4e] mb-1">
              <Heart className="w-4 h-4 fill-[#c69c4e]/30" />
            </div>
            <p className="font-cinzel text-xs sm:text-sm font-bold text-[#162842] italic">
              &ldquo;Cada presente/ valor será recebido com enorme gratidão e carinho.&rdquo;
            </p>
            <p className="font-montserrat text-[11px] text-[#c69c4e] uppercase tracking-widest font-bold mt-1.5">
              Dionísio & Benedita
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
