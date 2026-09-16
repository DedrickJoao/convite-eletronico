import { useState, type ElementType } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart, Copy, Check, Palmtree, Utensils, Wine, Sparkles, Building2, Smartphone, CreditCard, ShieldCheck } from 'lucide-react';
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-4">
            <Gift className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#f5d77f] font-semibold">
              Lista de Presentes & Cotas de Sonho
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide gold-gradient-text mb-4">
            Abençoando a Nova Vida a Dois
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            A sua presença e o seu carinho são os bens mais valiosos. Caso deseje nos presentear, disponibilizamos cotas simbólicas para nossa lua-de-mel e transferências diretas.
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
                className="group rounded-3xl crystal-card p-6 sm:p-7 border border-white/10 hover:border-[#d4af37]/50 transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {gift.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#d4af37] to-[#946d05] text-[10px] font-montserrat font-bold text-black uppercase tracking-wider">
                    Destaque
                  </div>
                )}

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[#f5d77f]" />
                  </div>

                  <span className="text-[10px] font-montserrat uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
                    {gift.category}
                  </span>

                  <h3 className="font-cinzel text-lg font-bold text-white mb-2 group-hover:text-[#f5d77f] transition-colors">
                    {gift.title}
                  </h3>

                  <p className="font-montserrat text-xs text-gray-300 leading-relaxed font-light mb-4">
                    {gift.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-cinzel text-sm sm:text-base font-bold text-[#f5d77f]">
                    {gift.amount}
                  </span>
                  
                  <button className="px-3.5 py-1.5 rounded-full crystal-card border border-[#d4af37]/40 text-xs font-montserrat font-semibold text-white group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                    Presentear
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bank & Digital Transfer Card */}
        <div className="rounded-3xl crystal-card p-8 sm:p-10 border border-[#d4af37]/40 gold-border-glow">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-2">
              Dados para Transferência Direta
            </h3>
            <p className="font-montserrat text-xs sm:text-sm text-gray-300 font-light">
              Transferência bancária segura com cópia rápida para sua comodidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* IBAN Internacional */}
            <div className="p-5 rounded-2xl bg-[#090b10] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>IBAN Internacional (EUR / USD)</span>
                </div>
                <p className="font-mono text-xs sm:text-sm text-white font-bold tracking-wider break-all mb-1">
                  {WEDDING_DETAILS.bankingDetails.iban}
                </p>
                <p className="text-[10px] font-montserrat text-gray-400">
                  Titular: {WEDDING_DETAILS.bankingDetails.holder}
                </p>
                <p className="text-[10px] font-montserrat text-gray-400">
                  SWIFT/BIC: {WEDDING_DETAILS.bankingDetails.swift}
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(WEDDING_DETAILS.bankingDetails.iban, 'iban')}
                className="mt-4 w-full py-2 px-3 rounded-xl crystal-card border border-[#d4af37]/30 hover:border-[#d4af37] text-xs font-montserrat font-semibold text-[#f5d77f] flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedType === 'iban' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar IBAN</span>
                  </>
                )}
              </button>
            </div>

            {/* Multicaixa Express (Angola / Luanda) */}
            <div className="p-5 rounded-2xl bg-[#090b10] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Multicaixa Express (AO)</span>
                </div>
                <p className="font-mono text-xs sm:text-sm text-white font-bold tracking-wider break-all mb-1">
                  {WEDDING_DETAILS.bankingDetails.multicaixaExpress}
                </p>
                <p className="text-[10px] font-montserrat text-gray-400">
                  Envio instantâneo por número telefónico
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(WEDDING_DETAILS.bankingDetails.multicaixaExpress, 'mcx')}
                className="mt-4 w-full py-2 px-3 rounded-xl crystal-card border border-[#d4af37]/30 hover:border-[#d4af37] text-xs font-montserrat font-semibold text-[#f5d77f] flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedType === 'mcx' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Telefone MCX</span>
                  </>
                )}
              </button>
            </div>

            {/* PIX / Email Transfer */}
            <div className="p-5 rounded-2xl bg-[#090b10] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Chave PIX / E-mail</span>
                </div>
                <p className="font-mono text-xs sm:text-sm text-white font-bold tracking-wider break-all mb-1">
                  {WEDDING_DETAILS.bankingDetails.pixKey}
                </p>
                <p className="text-[10px] font-montserrat text-gray-400">
                  Chave direta de confirmação instantânea
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(WEDDING_DETAILS.bankingDetails.pixKey, 'pix')}
                className="mt-4 w-full py-2 px-3 rounded-xl crystal-card border border-[#d4af37]/30 hover:border-[#d4af37] text-xs font-montserrat font-semibold text-[#f5d77f] flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedType === 'pix' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Chave PIX</span>
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
