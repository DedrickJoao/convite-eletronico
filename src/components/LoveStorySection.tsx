export default function LoveStorySection() {
  return (
    <section 
      id="historia" 
      className="relative min-h-[580px] sm:min-h-screen py-16 sm:py-28 px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-end items-center overflow-hidden bg-[#0c1626] border-b border-[#c69c4e]/30 shadow-sm select-none"
    >
      {/* Foto de Fundo Oficial - Mais escura e cinematográfica. No mobile usa object-contain para jamais cortar a noiva */}
      <img
        src="https://i.imgur.com/nXNdCB6.jpg"
        alt="Foto Dionísio & Benedita"
        className="absolute inset-0 w-full h-full object-contain sm:object-cover sm:object-[center_top] select-none pointer-events-none brightness-[0.72] contrast-[1.12]"
        referrerPolicy="no-referrer"
      />

      {/* Camada para escurecer a foto com elegância e dar contraste e luz máxima às letras */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[#0c1626] via-[#0c1626]/40 to-[#0c1626]/70 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Mensagem luminosa posicionada na parte inferior para jamais cobrir os olhos do casal */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-10 pb-6 sm:pb-12 flex flex-col items-center justify-end pointer-events-none mt-auto text-center">
        <h2 className="font-cinzel text-lg sm:text-2xl md:text-3xl text-[#f5d78e] font-bold uppercase tracking-[0.2em] mb-3 drop-shadow-[0_0_12px_rgba(245,215,142,0.7)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
          Conheça a Nossa História de Amor
        </h2>
        <div className="font-cormorant text-lg sm:text-2xl md:text-3xl text-white font-medium italic leading-relaxed sm:leading-snug max-w-2xl sm:max-w-3xl drop-shadow-[0_2px_16px_rgba(255,255,255,0.45)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] space-y-1 sm:space-y-1.5">
          <p>&ldquo;Tudo começa em tenra idade;</p>
          <p>Naquele instante nasceu uma cumplicidade que desafiou o tempo;</p>
          <p className="text-[#f5d78e] font-semibold">Hoje vamos ao altar&rdquo;</p>
        </div>
      </div>
    </section>
  );
}