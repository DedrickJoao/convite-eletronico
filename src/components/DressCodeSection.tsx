import { motion } from 'motion/react';
import { Sparkles, Shirt, Crown, Palette } from 'lucide-react';
import { DRESS_CODE_PALETTE } from '../data/weddingData';

export default function DressCodeSection() {
  return (
    <section id="dress-code" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-4">
            <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#f5d77f] font-semibold">
              Código de Vestuário
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide gold-gradient-text mb-4">
            Traje: Black Tie & Gala Imperial
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light">
            Para uma noite de esplendor inigualável, convidamos todos a vestirem seus trajes mais distintos e elegantes.
          </p>
        </div>

        {/* Dress Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          
          {/* Ladies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl crystal-card p-8 border border-white/10 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6 text-[#f5d77f]" />
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2">
              Senhoras & Damas de Honra
            </h3>
            
            <p className="font-montserrat text-xs uppercase tracking-widest text-[#d4af37] mb-4 font-semibold">
              Vestidos Longos de Gala • Alta Costura
            </p>

            <ul className="space-y-3 text-xs sm:text-sm font-montserrat text-gray-300 font-light">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                <span>Vestidos longos sofisticados, tecidos nobres (seda, cetim, crepe, zibeline).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                <span>Joias e acessórios dourados, cristais ou esmeraldas para harmonizar com a temática.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                <span className="text-[#f5d77f] font-medium">Nota carinhosa: reservamos o branco puro exclusivamente para a noiva.</span>
              </li>
            </ul>
          </motion.div>

          {/* Gentlemen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="rounded-3xl crystal-card p-8 border border-white/10 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center mb-5">
              <Shirt className="w-6 h-6 text-[#f5d77f]" />
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2">
              Cavalheiros
            </h3>
            
            <p className="font-montserrat text-xs uppercase tracking-widest text-[#d4af37] mb-4 font-semibold">
              Smoking Clássico • Black Tie
            </p>

            <ul className="space-y-3 text-xs sm:text-sm font-montserrat text-gray-300 font-light">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                <span>Smoking preto ou azul meia-noite clássico, com lapela em cetim.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                <span>Camisa branca de gala com botões de punho e laço preto (gravata borboleta).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                <span>Sapatos clássicos pretos de verniz ou polidos de alto brilho.</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Color Palette Inspiration */}
        <div className="rounded-3xl crystal-card p-8 border border-[#d4af37]/30 gold-border-glow">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
              Paleta de Inspiração e Cores Nobres
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {DRESS_CODE_PALETTE.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#080a10]/80 border border-white/5">
                <div
                  className="w-14 h-14 rounded-full border-2 border-white/20 shadow-md mb-2.5"
                  style={{ backgroundColor: item.colorHex }}
                />
                <span className="font-cinzel text-xs font-bold text-white mb-0.5">
                  {item.name}
                </span>
                <span className="text-[10px] font-montserrat text-gray-400 font-light leading-tight">
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
