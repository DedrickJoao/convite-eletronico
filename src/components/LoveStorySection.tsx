export default function LoveStorySection() {
  return (
    <section 
      id="historia" 
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center items-center overflow-hidden border-b border-[#c69c4e]/30 shadow-sm select-none"
    >
      {/* Foto de Fundo Oficial (ocupando 100% da secção, com mesma altura, cores vivas e luminosidade) */}
      <img
        src="https://i.imgur.com/nXNdCB6.jpg"
        alt="Foto Dionísio & Benedita"
        className="absolute inset-0 w-full h-full object-cover object-[center_top] sm:object-center select-none pointer-events-none brightness-[1.06] contrast-[1.08]"
        referrerPolicy="no-referrer"
      />

      {/* Camada suave e luminosa igual às seções anteriores para perfeita visibilidade da foto e leitura do texto */}
      <div 
        className="absolute inset-0 bg-[#dfe6ec]/40 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Mensagem por cima da imagem, centralizada e perfeitamente legível em mobile e desktop */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-10 flex flex-col items-center justify-center pointer-events-none">
        <p className="font-cormorant text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#162842] font-bold italic leading-relaxed sm:leading-snug max-w-2xl sm:max-w-3xl drop-shadow-[0_2px_10px_rgba(255,255,255,0.95)]">
          &ldquo;Em uma noite iluminada, dois olhares se cruzaram e o mundo pareceu parar. Naquele instante, nasceu uma cumplicidade que desafia o tempo&rdquo;
        </p>
      </div>
    </section>
  );
}