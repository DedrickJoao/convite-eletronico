import { useState, type ElementType } from 'react';
import { motion } from 'motion/react';
import { Gift, Copy, Check, Palmtree, Utensils, Wine, Sparkles, Building2, Smartphone, CreditCard } from 'lucide-react';
import { GIFT_OPTIONS, WEDDING_DETAILS } from '../data/weddingData';
import { GiftOption } from '../types';

const giftIconMap: Record<string, ElementType> = {
  Palmtree,
  Utensils,
  Wine,
  Sparkles,
  Gift
};

export default function GiftRegistrySection() {
  const [selectedGift, setSelectedGift] = useState<GiftOption | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  return (
    <section id="presentes" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Radial Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(198,156,78,0.12)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 mb-4 shadow-sm">
            <Gift className="w-3.5 h-3.5 text-[#c69c4e]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#162842] font-bold">
              Lista de Presentes & Cotas
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wide text-[#162842] mb-4">
            Abençoando a Vida a Dois
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-[#162842]/90 max-w-2xl mx-auto font-medium leading-relaxed">
            A sua presença e o seu carinho são nossos maiores tesouros. Caso deseje nos presentear, disponibilizamos cotas simbólicas para nossa lua-de-mel e transferências diretas.
          </p>
        </div>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {GIFT_OPTIONS.map((gift, idx) => {
            const Icon = giftIconMap[gift.iconName] || Gift;

            return (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                onClick={() => setSelectedGift(gift)}
                className="group rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-7 border border-[#c69c4e]/40 hover:border-[#c69c4e] shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {gift.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#c69c4e] text-[10px] font-montserrat font-bold text-white uppercase tracking-wider shadow-sm">
                    Destaque
                  </div>
                )}

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#dfe6ec] border border-[#c69c4e]/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Icon className="w-6 h-6 text-[#c69c4e]" />
                  </div>

                  <span className="text-[11px] font-montserrat uppercase tracking-widest text-[#c69c4e] font-bold block mb-1">
                    {gift.category}
                  </span>

                  <h3 className="font-cinzel text-lg font-bold text-[#162842] mb-2 group-hover:text-[#c69c4e] transition-colors">
                    {gift.title}
                  </h3>

                  <p className="font-montserrat text-xs text-[#162842]/90 leading-relaxed font-medium mb-4">
                    {gift.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#dfe6ec] flex items-center justify-between">
                  <span className="font-cinzel text-sm sm:text-base font-bold text-[#162842]">
                    {gift.amount}
                  </span>
                  
                  <button className="px-4 py-1.5 rounded-full gold-button text-xs font-montserrat font-bold shadow-sm">
                    Presentear
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bank & Digital Transfer Card */}
        <div className="rounded-3xl bg-white/95 backdrop-blur-md p-8 sm:p-10 border-2 border-[#c69c4e]/50 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#162842] mb-2">
              Dados para Transferência Direta
            </h3>
            <p className="font-montserrat text-xs sm:text-sm text-[#162842]/90 font-medium">
              Transferência bancária e pagamentos móveis seguros com cópia rápida para sua comodidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* IBAN Internacional */}
            <div className="p-5 rounded-2xl bg-[#dfe6ec]/50 border border-[#c69c4e]/40 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-[#162842] font-bold mb-2">
                  <Building2 className="w-4 h-4 text-[#c69c4e]" />
                  <span>IBAN Internacional (Millennium BIM)</span>
                </div>
                <p className="font-mono text-xs sm:text-sm text-[#162842] font-bold tracking-wider break-all mb-1">
                  {WEDDING_DETAILS.bankingDetails.iban}
                </p>
                <p className="text-[11px] font-montserrat text-[#162842]/80 font-semibold">
                  Titular: {WEDDING_DETAILS.bankingDetails.holder}
                </p>
                <p className="text-[11px] font-montserrat text-[#162842]/80 font-semibold">
                  SWIFT/BIC: {WEDDING_DETAILS.bankingDetails.swift}
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(WEDDING_DETAILS.bankingDetails.iban, 'iban')}
                className="mt-4 w-full py-2 px-3 rounded-xl bg-white border border-[#c69c4e]/60 hover:border-[#c69c4e] text-xs font-montserrat font-bold text-[#162842] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                {copiedType === 'iban' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">IBAN Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#c69c4e]" />
                    <span>Copiar IBAN</span>
                  </>
                )}
              </button>
            </div>

            {/* M-Pesa (Moçambique) */}
            <div className="p-5 rounded-2xl bg-[#dfe6ec]/50 border border-[#c69c4e]/40 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-[#162842] font-bold mb-2">
                  <Smartphone className="w-4 h-4 text-[#c69c4e]" />
                  <span>M-Pesa (Moçambique)</span>
                </div>
                <p className="font-mono text-xs sm:text-sm text-[#162842] font-bold tracking-wider break-all mb-1">
                  {WEDDING_DETAILS.bankingDetails.multicaixaExpress}
                </p>
                <p className="text-[11px] font-montserrat text-[#162842]/80 font-semibold">
                  Envio móvel direto (Vodacom M-Pesa MZ)
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(WEDDING_DETAILS.bankingDetails.multicaixaExpress, 'mpesa')}
                className="mt-4 w-full py-2 px-3 rounded-xl bg-white border border-[#c69c4e]/60 hover:border-[#c69c4e] text-xs font-montserrat font-bold text-[#162842] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                {copiedType === 'mpesa' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">M-Pesa Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#c69c4e]" />
                    <span>Copiar M-Pesa</span>
                  </>
                )}
              </button>
            </div>

            {/* E-Mola (Moçambique) */}
            <div className="p-5 rounded-2xl bg-[#dfe6ec]/50 border border-[#c69c4e]/40 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-[#162842] font-bold mb-2">
                  <CreditCard className="w-4 h-4 text-[#c69c4e]" />
                  <span>E-Mola (Moçambique)</span>
                </div>
                <p className="font-mono text-xs sm:text-sm text-[#162842] font-bold tracking-wider break-all mb-1">
                  {WEDDING_DETAILS.bankingDetails.pixKey}
                </p>
                <p className="text-[11px] font-montserrat text-[#162842]/80 font-semibold">
                  Transferência móvel direta (Movitel E-Mola)
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(WEDDING_DETAILS.bankingDetails.pixKey, 'emola')}
                className="mt-4 w-full py-2 px-3 rounded-xl bg-white border border-[#c69c4e]/60 hover:border-[#c69c4e] text-xs font-montserrat font-bold text-[#162842] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                {copiedType === 'emola' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">E-Mola Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#c69c4e]" />
                    <span>Copiar E-Mola</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
