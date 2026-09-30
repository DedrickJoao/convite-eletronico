import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquareHeart, Send, Heart, Sparkles, User, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WEDDING_DETAILS } from '../data/weddingData';

interface GuestMessage {
  id: string;
  author: string;
  message: string;
  reaction: string;
  likes: number;
  date: string;
  hasLiked?: boolean;
}

const INITIAL_MESSAGES: GuestMessage[] = [
  {
    id: "1",
    author: "Família Machel & Amigos",
    message: "Que o amor e a sabedoria de Deus sejam o alicerce perpétuo do lar de vocês. Estamos contando os dias para esta celebração majestosa em Maputo!",
    reaction: "❤️ Amor Eterno",
    likes: 24,
    date: "Ontem às 20:15"
  },
  {
    id: "2",
    author: "Padrinhos de Honra",
    message: "Dionísio e Benedita, ver esse amor florescer é testemunhar um milagre. Preparem-se para a noite mais linda de vossas vidas!",
    reaction: "👑 Bênçãos Reais",
    likes: 19,
    date: "Hoje às 11:30"
  },
  {
    id: "3",
    author: "Dr. Carlos & Dra. Sofia",
    message: "Parabéns ao casal mais admirável! Que 'nunca falte Deus' em cada conquista que juntos trilharem. Nos vemos no dia 12 de Dezembro!",
    reaction: "🥂 Brinde Especial",
    likes: 15,
    date: "Hoje às 14:40"
  }
];

export default function GuestbookSection() {
  const [messages, setMessages] = useState<GuestMessage[]>(INITIAL_MESSAGES);
  const [authorName, setAuthorName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [selectedReaction, setSelectedReaction] = useState('❤️ Amor');
  const [isSent, setIsSent] = useState(false);

  const reactions = [
    '❤️ Amor',
    '🥂 Brinde',
    '✨ Bênçãos',
    '👑 Honra',
    '🎉 Alegria'
  ];

  const handleLike = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          const alreadyLiked = msg.hasLiked;
          return {
            ...msg,
            likes: alreadyLiked ? msg.likes - 1 : msg.likes + 1,
            hasLiked: !alreadyLiked
          };
        }
        return msg;
      })
    );
  };

  const handleAddMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !messageText.trim()) return;

    const newMessage: GuestMessage = {
      id: Date.now().toString(),
      author: authorName.trim(),
      message: messageText.trim(),
      reaction: selectedReaction,
      likes: 1,
      date: "Agora mesmo",
      hasLiked: true
    };

    setMessages([newMessage, ...messages]);
    setAuthorName('');
    setMessageText('');
    setIsSent(true);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#c69c4e', '#162842', '#ffffff']
    });

    setTimeout(() => {
      setIsSent(false);
    }, 4000);
  };

  return (
    <section id="mural" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(198,156,78,0.12)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 mb-3 shadow-sm">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#c69c4e]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#162842] font-bold">
              Mural de Felicitações
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide text-[#162842] mb-3">
            Deixe Seus Votos de Amor
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-[#162842]/90 max-w-xl mx-auto font-medium">
            Escreva uma mensagem especial para Dionísio & Benedita que será guardada para sempre no livro de ouro do casal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form to Write Message */}
          <div className="lg:col-span-5 rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-8 border border-[#c69c4e]/40 shadow-xl">
            <h3 className="font-cinzel text-xl font-bold text-[#162842] mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c69c4e]" />
              <span>Escrever aos Noivos</span>
            </h3>
            <p className="font-montserrat text-xs text-[#162842]/80 mb-5 font-medium">
              Sua mensagem aparecerá em tempo real para todos os convidados.
            </p>

            <form onSubmit={handleAddMessage} className="space-y-4">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="block text-xs font-montserrat font-bold text-[#162842] uppercase tracking-wider">
                  Seu Nome / Família:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c69c4e]" />
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Ex: Padrinhos João & Maria"
                    className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#162842] font-semibold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Reaction Pill Selector */}
              <div className="space-y-1">
                <label className="block text-xs font-montserrat font-bold text-[#162842] uppercase tracking-wider">
                  Sua Emoção:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {reactions.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSelectedReaction(r)}
                      className={`px-3 py-1 rounded-full text-xs font-montserrat font-semibold transition-all cursor-pointer ${
                        selectedReaction === r
                          ? 'bg-[#c69c4e] text-white shadow-sm'
                          : 'bg-[#dfe6ec]/60 text-[#162842] hover:bg-[#dfe6ec]'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block text-xs font-montserrat font-bold text-[#162842] uppercase tracking-wider">
                  Sua Mensagem:
                </label>
                <textarea
                  required
                  rows={3}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Desejamos que a bênção de Deus preencha este casamento com saúde, paz e amor sem fim..."
                  className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#162842] font-medium focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl gold-button font-montserrat text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Publicar Mensagem no Mural</span>
              </button>

              {isSent && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-montserrat font-semibold text-center animate-in fade-in">
                  ✨ Mensagem publicada com sucesso! Obrigado pelo carinho.
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Live Message Feed */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-cinzel text-sm font-bold text-[#162842] tracking-wider">
                Mensagens Recentes ({messages.length})
              </span>
              <span className="text-xs font-montserrat text-[#c69c4e] font-semibold">
                Atualizado em tempo real
              </span>
            </div>

            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {messages.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-5 rounded-2xl bg-white/95 border border-[#c69c4e]/30 shadow-md hover:border-[#c69c4e] transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#dfe6ec] border border-[#c69c4e]/50 flex items-center justify-center font-cinzel text-xs font-bold text-[#162842]">
                          {item.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-cinzel text-sm font-bold text-[#162842]">
                            {item.author}
                          </h4>
                          <span className="text-[10px] font-montserrat text-[#162842]/70 font-medium">
                            {item.date}
                          </span>
                        </div>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full bg-[#dfe6ec] text-[11px] font-montserrat font-bold text-[#162842]">
                        {item.reaction}
                      </span>
                    </div>

                    <p className="font-cormorant text-base sm:text-lg text-[#162842] italic leading-relaxed">
                      &ldquo;{item.message}&rdquo;
                    </p>

                    <div className="pt-2 border-t border-[#dfe6ec] flex items-center justify-between">
                      <span className="text-[10px] font-montserrat uppercase tracking-wider text-[#c69c4e] font-bold">
                        Votos de Matrimónio
                      </span>

                      <button
                        onClick={() => handleLike(item.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-montserrat font-bold transition-all cursor-pointer ${
                          item.hasLiked
                            ? 'bg-rose-100 text-rose-700 border border-rose-300'
                            : 'bg-[#dfe6ec]/60 text-[#162842] hover:bg-rose-50 hover:text-rose-600'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${item.hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        <span>{item.likes}</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
