import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { MessageSquareHeart, Heart, Send, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { fetchMessages, submitMessage, likeMessage, trackActivity } from '../services/api';

export default function GuestbookSection() {
  const [messages, setMessages] = useState<any[]>([]);
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await fetchMessages();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.debug('Error loading guestbook messages:', err);
    }
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !message.trim()) return;

    setIsSending(true);
    try {
      const res = await submitMessage(guestName, message);
      if (res.success) {
        setGuestName('');
        setMessage('');
        setSentSuccess(true);
        setTimeout(() => setSentSuccess(false), 3500);
        await loadMessages();
        trackActivity({
          type: 'message_posted',
          description: `${guestName} deixou uma mensagem de amor no Mural dos Noivos.`
        });
      }
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleLike = async (id: string) => {
    if (likedIds[id]) return;
    setLikedIds((prev) => ({ ...prev, [id]: true }));
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likes: (m.likes || 0) + 1 } : m))
    );
    try {
      await likeMessage(id);
    } catch (err) {
      console.error('Error liking message:', err);
    }
  };

  return (
    <section 
      id="mural" 
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#f4f7fa] via-[#e8eff6] to-[#dfe6ec] border-b border-[#c69c4e]/30 shadow-inner"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 mb-3 shadow-sm">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#c69c4e]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#162842] font-bold">
              Mural de Votos & Bênçãos
            </span>
          </div>
          
          <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#162842] mb-3">
            Mensagens de Carinho aos Noivos
          </h2>
          
          <p className="font-cormorant text-lg sm:text-xl text-[#162842]/90 italic max-w-lg mx-auto">
            Deixe uma mensagem gravada para sempre no livro de bênçãos de Dionísio & Benedita.
          </p>
        </div>

        {/* Message Input Card */}
        <div className="mb-12 rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-8 border-2 border-[#c69c4e]/50 shadow-xl">
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1 space-y-1">
                <label className="text-xs font-montserrat font-bold text-[#162842] uppercase tracking-wider block">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ex: Família Santos"
                  className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-2.5 px-3 text-xs sm:text-sm text-[#162842] font-semibold focus:outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-montserrat font-bold text-[#162842] uppercase tracking-wider block">
                  Sua Mensagem de Bênção aos Noivos *
                </label>
                <input
                  type="text"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva votos de amor, paz e prosperidade..."
                  className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-2.5 px-3 text-xs sm:text-sm text-[#162842] font-medium focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                {sentSuccess && (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Mensagem gravada com sucesso no Mural dos Noivos!</span>
                  </>
                )}
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full sm:w-auto px-7 py-3 rounded-xl gold-button font-montserrat text-xs uppercase tracking-widest font-bold text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {isSending ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>A gravar...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Publicar Voto</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Messages Feed */}
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 px-6 rounded-3xl bg-white/70 border-2 border-dashed border-[#c69c4e]/40 shadow-sm max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#162842] flex items-center justify-center mx-auto mb-3 shadow-md">
                <MessageSquareHeart className="w-6 h-6 text-[#f5d78e]" />
              </div>
              <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#162842] mb-1">
                Mural Aberto para Votos e Bênçãos
              </h4>
              <p className="font-cormorant text-base sm:text-lg text-[#162842]/85 italic">
                O mural está pronto para receber as palavras dos convidados. Seja o primeiro a deixar uma mensagem de carinho aos noivos!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {messages.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.5) }}
                  className="rounded-2xl bg-white/90 backdrop-blur-sm p-5 border border-[#c69c4e]/35 shadow-md hover:border-[#c69c4e] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-cinzel text-sm sm:text-base font-bold text-[#162842]">
                        {item.guestName}
                      </span>
                      <span className="text-[10px] font-montserrat text-[#162842]/60 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#c69c4e]" />
                        {new Date(item.createdAt || Date.now()).toLocaleDateString('pt-PT')}
                      </span>
                    </div>

                    <p className="font-cormorant text-base sm:text-lg italic text-[#162842] leading-relaxed">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#dfe6ec] flex items-center justify-between text-xs">
                    <span className="text-[10px] text-[#c69c4e] font-montserrat uppercase tracking-wider font-bold">
                      Bênção Registada
                    </span>

                    <button
                      type="button"
                      onClick={() => handleLike(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-montserrat font-bold transition-all cursor-pointer ${
                        likedIds[item.id]
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : 'bg-[#dfe6ec]/50 text-[#162842] hover:bg-rose-50 hover:text-rose-600'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedIds[item.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{item.likes || 0}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
