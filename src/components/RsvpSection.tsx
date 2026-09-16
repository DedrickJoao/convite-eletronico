import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, QrCode, CheckCircle2, Send, Sparkles, User, Mail, Phone, Users, Utensils, Music2, MessageSquareHeart, Check, CalendarCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import { WEDDING_DETAILS } from '../data/weddingData';
import { RsvpData } from '../types';

interface RsvpSectionProps {
  onSuccessSubmit: (guestName: string, ticketId: string) => void;
  initialGuestName?: string;
}

export default function RsvpSection({ onSuccessSubmit, initialGuestName = '' }: RsvpSectionProps) {
  const [formData, setFormData] = useState<RsvpData>({
    guestName: initialGuestName,
    email: '',
    phone: '',
    attending: 'yes',
    plusOneCount: 0,
    dietaryRestrictions: 'Nenhuma restrição',
    specialSongRequest: '',
    messageToCouple: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [rsvpQrUrl, setRsvpQrUrl] = useState('');

  useEffect(() => {
    // Generate RSVP quick link QR Code
    const rsvpDirectUrl = window.location.href;
    QRCode.toDataURL(rsvpDirectUrl, {
      width: 260,
      margin: 1,
      color: {
        dark: '#0b0c10',
        light: '#f5d77f'
      }
    })
      .then((url) => setRsvpQrUrl(url))
      .catch((err) => console.error(err));
  }, []);

  const triggerLuxuryConfetti = () => {
    // Gold & White Crystal Confetti burst
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#d4af37', '#f5d77f', '#ffffff', '#e2e8f0', '#b8860b'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = `BD-${Math.floor(1000 + Math.random() * 9000)}-VIP`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTicketId(generatedId);
      triggerLuxuryConfetti();
      onSuccessSubmit(formData.guestName || "Convidado de Honra", generatedId);
    }, 1200);
  };

  return (
    <section id="rsvp" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,175,55,0.07)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-4">
            <Heart className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#f5d77f] font-semibold">
              Confirmação de Presença
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide gold-gradient-text mb-4">
            Sua Presença é o Nosso Maior Presente
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light">
            Para que possamos preparar todos os detalhes exclusivos de sua recepção, por gentileza confirme sua presença até <strong className="text-[#f5d77f] font-semibold">{WEDDING_DETAILS.rsvpDeadline}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: QR Code & Quick Scan Info */}
          <div className="lg:col-span-4 rounded-3xl crystal-card p-6 sm:p-8 border border-white/10 flex flex-col items-center text-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center">
              <QrCode className="w-6 h-6 text-[#f5d77f]" />
            </div>

            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                QR Code de Confirmação
              </h3>
              <p className="font-montserrat text-xs text-gray-300 mt-1 font-light">
                Escaneie com a câmera do seu celular para abrir o convite direto e confirmar presenças em família.
              </p>
            </div>

            {/* QR Box with Luxury Gold Frame */}
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#946d05] to-[#f5d77f] shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
              <div className="w-44 h-44 bg-white p-2 rounded-xl flex items-center justify-center">
                {rsvpQrUrl ? (
                  <img src={rsvpQrUrl} alt="RSVP QR Code" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-black">
                    Gerando QR...
                  </div>
                )}
              </div>
            </div>

            <div className="text-xs font-montserrat text-gray-400 space-y-1">
              <p className="font-semibold text-gray-200">Dúvidas ou Assessoria VIP:</p>
              <p className="text-[#f5d77f]">{WEDDING_DETAILS.organizerContact}</p>
              <p className="text-gray-400">{WEDDING_DETAILS.organizerEmail}</p>
            </div>
          </div>

          {/* Right Column: RSVP Interactive Form */}
          <div className="lg:col-span-8 rounded-3xl crystal-card p-6 sm:p-10 border border-[#d4af37]/40 gold-border-glow relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="rsvp-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="border-b border-white/10 pb-4 mb-2">
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#d4af37]" />
                      <span>Formulário de Confirmação VIP</span>
                    </h3>
                    <p className="font-montserrat text-xs text-gray-400 mt-1 font-light">
                      Preencha os campos abaixo para emissão do seu Cartão de Entrada.
                    </p>
                  </div>

                  {/* Attendance Selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-montserrat uppercase tracking-wider text-[#d4af37] font-semibold">
                      Você comparecerá a esta noite inesquecível? *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, attending: 'yes' })}
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm font-montserrat font-semibold transition-all flex items-center justify-center gap-2 ${
                          formData.attending === 'yes'
                            ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b0c10] border-[#d4af37] shadow-[0_4px_15px_rgba(212,175,55,0.4)]'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        <span>Sim, com muita honra!</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, attending: 'no' })}
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm font-montserrat font-semibold transition-all flex items-center justify-center gap-2 ${
                          formData.attending === 'no'
                            ? 'bg-rose-950/60 border-rose-500 text-rose-300 shadow-[0_4px_15px_rgba(244,63,94,0.3)]'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'
                        }`}
                      >
                        <span>Infelizmente não poderei</span>
                      </button>
                    </div>
                  </div>

                  {/* Name & Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-montserrat text-gray-300">
                        Nome Completo *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]" />
                        <input
                          type="text"
                          required
                          value={formData.guestName}
                          onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                          placeholder="Ex: Família Silva ou Seu Nome"
                          className="w-full bg-[#090b10] border border-white/15 focus:border-[#d4af37] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-montserrat text-gray-300">
                        WhatsApp / Telefone *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+351 912 345 678 / +244 923 000 000"
                          className="w-full bg-[#090b10] border border-white/15 focus:border-[#d4af37] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-montserrat text-gray-300">
                        E-mail para Recebimento do Pass VIP
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="seu.email@exemplo.com"
                          className="w-full bg-[#090b10] border border-white/15 focus:border-[#d4af37] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-montserrat text-gray-300">
                        Número de Acompanhantes
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]" />
                        <select
                          value={formData.plusOneCount}
                          onChange={(e) => setFormData({ ...formData, plusOneCount: Number(e.target.value) })}
                          className="w-full bg-[#090b10] border border-white/15 focus:border-[#d4af37] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                        >
                          <option value={0}>Apenas eu (1 pessoa)</option>
                          <option value={1}>+ 1 Acompanhante (2 pessoas)</option>
                          <option value={2}>+ 2 Acompanhantes (3 pessoas)</option>
                          <option value={3}>+ 3 Acompanhantes (4 pessoas)</option>
                          <option value={4}>Família VIP (5+ pessoas)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Dietary & Music Dedication */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-montserrat text-gray-300">
                        Preferência / Restrição Alimentar
                      </label>
                      <div className="relative">
                        <Utensils className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]" />
                        <select
                          value={formData.dietaryRestrictions}
                          onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                          className="w-full bg-[#090b10] border border-white/15 focus:border-[#d4af37] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                        >
                          <option value="Nenhuma restrição">Sem Restrições (Menu Completo)</option>
                          <option value="Vegetariano">Vegetariano</option>
                          <option value="Vegano">Vegano</option>
                          <option value="Sem Glúten">Sem Glúten (Celíaco)</option>
                          <option value="Sem Lactose">Sem Lactose</option>
                          <option value="Halal / Kosher">Halal / Kosher</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-montserrat text-gray-300">
                        Música que não pode faltar na pista
                      </label>
                      <div className="relative">
                        <Music2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]" />
                        <input
                          type="text"
                          value={formData.specialSongRequest}
                          onChange={(e) => setFormData({ ...formData, specialSongRequest: e.target.value })}
                          placeholder="Nome da música / Artista"
                          className="w-full bg-[#090b10] border border-white/15 focus:border-[#d4af37] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message to Couple */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-montserrat text-gray-300">
                      Mensagem de Carinho para Benedita & Dionísio
                    </label>
                    <div className="relative">
                      <MessageSquareHeart className="w-4 h-4 absolute left-3.5 top-3 text-[#d4af37]" />
                      <textarea
                        rows={3}
                        value={formData.messageToCouple}
                        onChange={(e) => setFormData({ ...formData, messageToCouple: e.target.value })}
                        placeholder="Deixe seus votos de amor, bênçãos e carinho para os noivos..."
                        className="w-full bg-[#090b10] border border-white/15 focus:border-[#d4af37] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="rsvp-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl gold-button font-montserrat text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
                  >
                    {isSubmitting ? (
                      <>
                        <Sparkles className="w-5 h-5 animate-spin" />
                        <span>Validando Acesso Real...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Confirmar Presença & Emitir Pass VIP</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="rsvp-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>

                  <div className="space-y-2">
                    <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#f5d77f] font-semibold">
                      Presença Confirmada com Honra
                    </span>
                    <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-white">
                      Obrigado, {formData.guestName}!
                    </h3>
                    <p className="font-cormorant text-xl text-gray-200 italic max-w-md mx-auto">
                      Sua presença tornará a celebração de Benedita & Dionísio ainda mais memorável.
                    </p>
                  </div>

                  {/* Confirmed Pass Badge */}
                  <div className="p-4 rounded-2xl bg-[#090b10] border border-[#d4af37]/40 max-w-md mx-auto text-left space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-montserrat uppercase tracking-wider text-[#d4af37]">
                        Seu Código VIP de Entrada:
                      </span>
                      <span className="font-mono text-sm font-bold text-[#f5d77f]">
                        {ticketId}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <CalendarCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Data: 12 de Dezembro de 2026 • 16:00 HRS</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#nfc-pass"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full crystal-card border border-[#d4af37]/50 font-montserrat text-xs font-semibold text-[#f5d77f] hover:bg-[#d4af37]/20 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Visualizar & Baixar seu Smart Pass NFC</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
