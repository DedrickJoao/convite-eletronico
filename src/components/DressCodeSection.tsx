import { motion } from 'motion/react';
import { Sparkles, Shirt, Crown, Palette } from 'lucide-react';
import { DRESS_CODE_PALETTE } from '../data/weddingData';

export default function DressCodeSection() {
  return (
    <section id="dress-code" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(198,156,78,0.1)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 mb-4 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-[#c69c4e]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#162842] font-bold">
              Código de Vestuário
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wide text-[#162842] mb-4">
            Traje: Black Tie & Gala
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-[#162842]/90 max-w-xl mx-auto font-medium">
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
            className="rounded-3xl bg-white/95 backdrop-blur-md p-8 border border-[#c69c4e]/40 shadow-xl relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#dfe6ec] border border-[#c69c4e]/50 flex items-center justify-center mb-5 shadow-sm">
              <Sparkles className="w-6 h-6 text-[#c69c4e]" />
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#162842] mb-2">
              Senhoras & Damas
            </h3>
            
            <p className="font-montserrat text-xs uppercase tracking-widest text-[#c69c4e] mb-4 font-bold">
              Vestidos Longos de Gala • Alta Costura
            </p>

            <ul className="space-y-3 text-xs sm:text-sm font-montserrat text-[#162842] font-medium">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#c69c4e] mt-1.5 shrink-0" />
                <span>Vestidos longos sofisticados em tecidos nobres (seda, cetim, crepe, zibeline).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#c69c4e] mt-1.5 shrink-0" />
                <span>Joias e acessórios elegantes dourados ou cristais para harmonizar com a temática.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#c69c4e] mt-1.5 shrink-0" />
                <span className="font-bold text-[#162842]">Nota carinhosa: reservamos o branco puro exclusivamente para a noiva.</span>
              </li>
            </ul>
          </motion.div>

          {/* Gentlemen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="rounded-3xl bg-white/95 backdrop-blur-md p-8 border border-[#c69c4e]/40 shadow-xl relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#dfe6ec] border border-[#c69c4e]/50 flex items-center justify-center mb-5 shadow-sm">
              <Shirt className="w-6 h-6 text-[#c69c4e]" />
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#162842] mb-2">
              Cavalheiros
            </h3>
            
            <p className="font-montserrat text-xs uppercase tracking-widest text-[#c69c4e] mb-4 font-bold">
              Smoking Clássico • Black Tie ou Fato Escuro
            </p>

            <ul className="space-y-3 text-xs sm:text-sm font-montserrat text-[#162842] font-medium">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#c69c4e] mt-1.5 shrink-0" />
                <span>Smoking clássico preto ou azul marinho com lapela refinada.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#c69c4e] mt-1.5 shrink-0" />
                <span>Camisa branca de gala com botões de punho e laço preto (gravata borboleta) ou gravata fina.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#c69c4e] mt-1.5 shrink-0" />
                <span>Sapatos clássicos pretos de verniz ou polidos de alto brilho.</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Color Palette Inspiration */}
        <div className="rounded-3xl bg-white/95 backdrop-blur-md p-8 border border-[#c69c4e]/40 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="w-5 h-5 text-[#c69c4e]" />
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#162842]">
              Paleta de Inspiração e Cores Sugeridas
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {DRESS_CODE_PALETTE.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-[#dfe6ec]/50 border border-[#c69c4e]/30 shadow-sm">
                <div
                  className="w-14 h-14 rounded-full border-2 border-white shadow-md mb-2.5"
                  style={{ backgroundColor: item.colorHex }}
                />
                <span className="font-cinzel text-xs font-bold text-[#162842] mb-0.5">
                  {item.name}
                </span>
                <span className="text-[11px] font-montserrat text-[#162842]/80 font-medium leading-tight">
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
