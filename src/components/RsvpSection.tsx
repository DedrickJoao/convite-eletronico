import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, QrCode, CheckCircle2, Send, Sparkles, User, Mail, Phone, Users, Utensils, Music2, MessageSquareHeart, Check, CalendarCheck, MessageCircle } from 'lucide-react';
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
        dark: '#162842',
        light: '#ffffff'
      }
    })
      .then((url) => setRsvpQrUrl(url))
      .catch((err) => console.error(err));
  }, []);

  const triggerLuxuryConfetti = () => {
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#c69c4e', '#162842', '#ffffff', '#e2e8f0', '#b8860b'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
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

    const generatedId = `DB-${Math.floor(1000 + Math.random() * 9000)}-CONVITE`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTicketId(generatedId);
      triggerLuxuryConfetti();
      onSuccessSubmit(formData.guestName || "Convidado de Honra", generatedId);
    }, 900);
  };

  const handleWhatsAppSend = () => {
    const statusText = formData.attending === 'yes' ? 'SIM, confirmo com alegria!' : 'Não poderei comparecer.';
    const text = encodeURIComponent(
      `*Confirmação de Presença - Casamento Dionísio & Benedita 2026*\n\n` +
      `👤 *Convidado:* ${formData.guestName || 'Convidado de Honra'}\n` +
      `📱 *Contacto:* ${formData.phone || 'N/D'}\n` +
      `✨ *Presença:* ${statusText}\n` +
      `👥 *Acompanhantes:* ${formData.plusOneCount}\n` +
      `🍽️ *Restrição Alimentar:* ${formData.dietaryRestrictions}\n` +
      `🎵 *Música Sugerida:* ${formData.specialSongRequest || 'Livre'}\n` +
      `💌 *Mensagem:* ${formData.messageToCouple || 'Felicidades aos Noivos!'}\n\n` +
      `_Que falte tudo menos Deus..._`
    );
    window.open(`https://api.whatsapp.com/send?phone=258841234567&text=${text}`, '_blank');
  };

  return (
    <section id="rsvp" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(198,156,78,0.12)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 mb-4 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-[#c69c4e] fill-[#c69c4e]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#162842] font-bold">
              Confirmação de Presença
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wide text-[#162842] mb-4">
            Sua Presença é o Nosso Maior Presente
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-[#162842]/90 max-w-xl mx-auto font-medium">
            Para que possamos preparar todos os detalhes exclusivos de sua recepção, por gentileza confirme sua presença até <strong className="text-[#c69c4e] font-extrabold">{WEDDING_DETAILS.rsvpDeadline}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: QR Code & Quick Scan Info */}
          <div className="lg:col-span-4 rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-8 border border-[#c69c4e]/40 shadow-xl flex flex-col items-center text-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-[#dfe6ec] border border-[#c69c4e]/50 flex items-center justify-center shadow-sm">
              <QrCode className="w-6 h-6 text-[#c69c4e]" />
            </div>

            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#162842]">
                QR Code do Convite
              </h3>
              <p className="font-montserrat text-xs text-[#162842]/80 mt-1 font-medium">
                Escaneie para abrir o convite no seu telemóvel e compartilhar com a família.
              </p>
            </div>

            {/* QR Box with Luxury Gold Frame */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#c69c4e] via-[#ab8237] to-[#8c6622] shadow-[0_10px_25px_rgba(198,156,78,0.3)]">
              <div className="w-44 h-44 bg-white p-2 rounded-xl flex items-center justify-center shadow-inner">
                {rsvpQrUrl ? (
                  <img src={rsvpQrUrl} alt="RSVP QR Code" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-black">
                    Gerando QR...
                  </div>
                )}
              </div>
            </div>

            <div className="text-xs font-montserrat text-[#162842] space-y-1 font-medium">
              <p className="font-bold text-[#162842]">Dúvidas ou Assessoria:</p>
              <p className="text-[#c69c4e] font-bold">{WEDDING_DETAILS.organizerContact}</p>
              <p className="text-[#162842]/80">{WEDDING_DETAILS.organizerEmail}</p>
            </div>
          </div>

          {/* Right Column: RSVP Interactive Form */}
          <div className="lg:col-span-8 rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-10 border-2 border-[#c69c4e]/50 shadow-2xl relative overflow-hidden">
            
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
                  <div className="border-b border-[#dfe6ec] pb-4 mb-2">
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#162842] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#c69c4e]" />
                      <span>Formulário de Confirmação</span>
                    </h3>
                    <p className="font-montserrat text-xs text-[#162842]/80 mt-1 font-medium">
                      Preencha os campos abaixo para garantir seu lugar no grande dia.
                    </p>
                  </div>

                  {/* Attendance Selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-montserrat uppercase tracking-wider text-[#162842] font-bold">
                      Você comparecerá a esta noite inesquecível? *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, attending: 'yes' })}
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm font-montserrat font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          formData.attending === 'yes'
                            ? 'bg-[#162842] text-[#c69c4e] border-[#c69c4e] shadow-md'
                            : 'bg-[#dfe6ec]/50 border-[#162842]/20 text-[#162842] hover:bg-[#dfe6ec]'
                        }`}
                      >
                        <Check className="w-4 h-4 text-[#c69c4e]" />
                        <span>Sim, com muita alegria!</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, attending: 'no' })}
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm font-montserrat font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          formData.attending === 'no'
                            ? 'bg-rose-100 border-rose-400 text-rose-800 shadow-md'
                            : 'bg-[#dfe6ec]/50 border-[#162842]/20 text-[#162842] hover:bg-[#dfe6ec]'
                        }`}
                      >
                        <span>Não poderei comparecer</span>
                      </button>
                    </div>
                  </div>

                  {/* Name & Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-montserrat font-bold text-[#162842]">
                        Nome Completo *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c69c4e]" />
                        <input
                          type="text"
                          required
                          value={formData.guestName}
                          onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                          placeholder="Ex: Família Silva ou Seu Nome"
                          className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#162842] font-semibold focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-montserrat font-bold text-[#162842]">
                        WhatsApp / Telefone *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c69c4e]" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+258 84 123 4567"
                          className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#162842] font-semibold focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-montserrat font-bold text-[#162842]">
                        E-mail
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c69c4e]" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="seu.email@exemplo.com"
                          className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#162842] font-semibold focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-montserrat font-bold text-[#162842]">
                        Número de Acompanhantes
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c69c4e]" />
                        <select
                          value={formData.plusOneCount}
                          onChange={(e) => setFormData({ ...formData, plusOneCount: Number(e.target.value) })}
                          className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#162842] font-semibold focus:outline-none transition-colors"
                        >
                          <option value={0}>Apenas eu (1 pessoa)</option>
                          <option value={1}>+ 1 Acompanhante (2 pessoas)</option>
                          <option value={2}>+ 2 Acompanhantes (3 pessoas)</option>
                          <option value={3}>+ 3 Acompanhantes (4 pessoas)</option>
                          <option value={4}>Família (5+ pessoas)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Dietary & Music Dedication */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-montserrat font-bold text-[#162842]">
                        Preferência Alimentar
                      </label>
                      <div className="relative">
                        <Utensils className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c69c4e]" />
                        <select
                          value={formData.dietaryRestrictions}
                          onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                          className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#162842] font-semibold focus:outline-none transition-colors"
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
                      <label className="block text-xs font-montserrat font-bold text-[#162842]">
                        Música favorita para a pista
                      </label>
                      <div className="relative">
                        <Music2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c69c4e]" />
                        <input
                          type="text"
                          value={formData.specialSongRequest}
                          onChange={(e) => setFormData({ ...formData, specialSongRequest: e.target.value })}
                          placeholder="Nome da música / Artista"
                          className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#162842] font-semibold focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message to Couple */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-montserrat font-bold text-[#162842]">
                      Mensagem de Carinho para Dionísio & Benedita
                    </label>
                    <div className="relative">
                      <MessageSquareHeart className="w-4 h-4 absolute left-3.5 top-3 text-[#c69c4e]" />
                      <textarea
                        rows={3}
                        value={formData.messageToCouple}
                        onChange={(e) => setFormData({ ...formData, messageToCouple: e.target.value })}
                        placeholder="Deixe seus votos de amor, bênçãos e carinho para os noivos..."
                        className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#162842] font-medium focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <button
                      id="rsvp-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl gold-button font-montserrat text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_rgba(198,156,78,0.35)]"
                    >
                      {isSubmitting ? (
                        <>
                          <Sparkles className="w-5 h-5 animate-spin" />
                          <span>Confirmando Presença...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Confirmar Presença no Convite</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppSend}
                      className="w-full py-3.5 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/60 font-montserrat text-xs sm:text-sm font-bold text-[#162842] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                      <span>Enviar Confirmação Direta pelo WhatsApp</span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="rsvp-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 mx-auto flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>

                  <div className="space-y-2">
                    <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#c69c4e] font-bold">
                      Presença Confirmada
                    </span>
                    <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#162842]">
                      Obrigado, {formData.guestName}!
                    </h3>
                    <p className="font-cormorant text-xl text-[#162842] italic max-w-md mx-auto font-medium">
                      Sua presença tornará a celebração de Dionísio & Benedita ainda mais memorável.
                    </p>
                  </div>

                  {/* Confirmed Ticket Badge */}
                  <div className="p-4 rounded-2xl bg-[#dfe6ec]/60 border border-[#c69c4e]/50 max-w-md mx-auto text-left space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-montserrat uppercase tracking-wider text-[#162842] font-bold">
                        Código de Entrada:
                      </span>
                      <span className="font-mono text-sm font-bold text-[#c69c4e]">
                        {ticketId}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#162842]">
                      <CalendarCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Data: 12 de Dezembro de 2026 • 16:00 HRS • Maputo</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleWhatsAppSend}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-montserrat text-xs font-bold shadow-md hover:bg-[#20bd5a] transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Notificar os Noivos no WhatsApp</span>
                    </button>
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
