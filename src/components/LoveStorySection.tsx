export default function LoveStorySection() {
  return (
    <section 
      id="historia" 
      className="relative w-full min-h-[85vh] sm:min-h-[90vh] md:min-h-[95vh] flex items-center justify-center text-center overflow-hidden bg-[#111827] select-none"
    >
      {/* Imagem ocupando toda a secção como background, alinhada ao topo para não cortar as cabeças */}
      <img
        src="https://i.imgur.com/nXNdCB6.jpg"
        alt="Foto Dionísio & Benedita"
        className="absolute inset-0 w-full h-full object-cover object-[center_top] select-none pointer-events-none"
        referrerPolicy="no-referrer"
      />

      {/* Camada suave para garantir legibilidade do texto por cima da imagem */}
      <div 
        className="absolute inset-0 bg-black/40 z-0 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Mensagem por cima da imagem, centralizada */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 py-24 sm:py-32 flex flex-col items-center justify-center pointer-events-none">
        <p className="font-cormorant text-2xl sm:text-4xl md:text-5xl lg:text-5xl text-white font-medium italic leading-relaxed sm:leading-snug max-w-3xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
          &ldquo;Em uma noite iluminada, dois olhares se cruzaram e o mundo pareceu parar. Naquele instante, nasceu uma cumplicidade que desafia o tempo&rdquo;
        </p>
      </div>
    </section>
  );
}