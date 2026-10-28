import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  User, 
  Phone, 
  MessageSquareHeart, 
  Check, 
  UserPlus
} from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';
import { submitRsvp, trackActivity } from '../services/api';

const TARGET_EMAILS = [
  "bhelena.nhantumbo76@gmail.com",
  "joaodedrick@gmail.com"
];

interface RsvpSectionProps {
  onSuccessSubmit: (guestName: string, ticketId: string) => void;
  initialGuestName?: string;
}

export default function RsvpSection({ onSuccessSubmit, initialGuestName = '' }: RsvpSectionProps) {
  const [formData, setFormData] = useState({
    guestName: initialGuestName,
    phone: '',
    attending: 'yes' as 'yes' | 'no',
    messageToCouple: ''
  });

  useEffect(() => {
    if (initialGuestName && !formData.guestName) {
      setFormData(prev => ({ ...prev, guestName: initialGuestName }));
    }
  }, [initialGuestName]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedFallbackId = `DB-${Math.floor(1000 + Math.random() * 9000)}-CONVITE`;

    // 1. Direct browser dispatch to FormSubmit for both email recipients
    TARGET_EMAILS.forEach((targetEmail) => {
      try {
        fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `💍 Confirmação de Presença [${formData.attending === 'yes' ? 'CONFIRMADA' : 'NÃO COMPARECERÁ'}]: ${formData.guestName} - Dionísio & Benedita 2026`,
            _template: 'table',
            Convidado: formData.guestName,
            Contacto_Telefone: formData.phone || 'Não informado',
            Presenca: formData.attending === 'yes' ? 'CONFIRMADA' : 'NÃO COMPARECERÁ',
            Mensagem_aos_Noivos: formData.messageToCouple || 'Sem mensagem adicional',
            Data_Evento: 'Sábado, 12 de Dezembro de 2026',
            Cerimonia: '09h30 - Sé Catedral de Maputo',
            Copo_de_Agua: '14h00 - Orquídea Eventos, Matola Rio',
            Prazo_Limite: WEDDING_DETAILS.rsvpDeadline,
            Destinatario: targetEmail
          })
        }).catch((err) => console.warn(`Direct FormSubmit browser dispatch (${targetEmail}):`, err));
      } catch {
        // Non-blocking
      }
    });

    // 2. Submit to backend API (stores in database & executes server-side email dispatcher for both emails)
    try {
      const result = await submitRsvp({
        guestName: formData.guestName,
        phone: formData.phone,
        attending: formData.attending,
        messageToCouple: formData.messageToCouple,
        notificationTarget: TARGET_EMAILS.join(', ')
      });

      const confirmedId = result.ticketId || generatedFallbackId;
      setIsSubmitted(true);
      onSuccessSubmit(formData.guestName || "Convidado de Honra", confirmedId);

      trackActivity({
        type: 'rsvp_confirmed',
        description: `${formData.guestName} confirmou presença com sucesso.`,
        metadata: { 
          ticketId: confirmedId, 
          attending: formData.attending
        }
      });
    } catch (err: any) {
      console.warn('Backend submission fallback:', err);
      setIsSubmitted(true);
      onSuccessSubmit(formData.guestName || "Convidado de Honra", generatedFallbackId);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmAnotherGuest = () => {
    setFormData({
      guestName: '',
      phone: '',
      attending: 'yes',
      messageToCouple: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section 
      id="rsvp" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#ebf1f6] via-[#e5eef7] to-[#f4f7fa] border-b border-[#c69c4e]/35 shadow-inner"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(198,156,78,0.15)_0%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[radial-gradient(circle,rgba(22,40,66,0.08)_0%,transparent_70%)] pointer-events-none blur-2xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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

        {/* RSVP Form Container */}
        <div className="max-w-2xl mx-auto rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-10 border-2 border-[#c69c4e]/50 shadow-2xl relative overflow-hidden">
          
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
                    <span>Formulário de Confirmação Oficial</span>
                  </h3>
                  <p className="font-montserrat text-xs text-[#162842]/80 mt-1 font-medium">
                    Preencha os seus dados para confirmar a sua honrosa presença no nosso grande dia.
                  </p>
                </div>

                {/* Attendance Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-montserrat uppercase tracking-wider text-[#162842] font-bold">
                    Você comparecerá a esta celebração inesquecível? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-montserrat font-bold text-[#162842]">
                    Nome Completo do Convidado *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c69c4e]" />
                    <input
                      type="text"
                      required
                      value={formData.guestName}
                      onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                      placeholder="Ex: Dra. Ana Paula ou Senhor Carlos Silva"
                      className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-[#162842] font-semibold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Phone / Contact */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-montserrat font-bold text-[#162842]">
                    Telefone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c69c4e]" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+258 84 123 4567"
                      className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-[#162842] font-semibold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message to Couple */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-montserrat font-bold text-[#162842]">
                      Mensagem de Felicitações aos Noivos
                    </label>
                    <span className="text-[10px] text-[#c69c4e] font-montserrat font-semibold">
                      Opcional
                    </span>
                  </div>
                  <div className="relative">
                    <MessageSquareHeart className="w-4 h-4 absolute left-3.5 top-3 text-[#c69c4e]" />
                    <textarea
                      rows={3}
                      value={formData.messageToCouple}
                      onChange={(e) => setFormData({ ...formData, messageToCouple: e.target.value })}
                      placeholder="Deixe os seus votos de amor, bênçãos e felicitações para Dionísio & Benedita..."
                      className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#162842] font-medium focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    id="rsvp-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl gold-button font-montserrat text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_rgba(198,156,78,0.35)] hover:shadow-[0_12px_28px_rgba(198,156,78,0.45)] transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Sparkles className="w-5 h-5 animate-spin" />
                        <span>A Enviar Confirmação...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Confirmação de Presença</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 mx-auto flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-9 h-9 text-emerald-600" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#162842]">
                    {formData.attending === 'yes' ? 'Presença Confirmada' : 'Resposta Registada'}
                  </h3>
                  <p className="font-montserrat text-sm text-[#162842]/85 max-w-md mx-auto font-medium">
                    {formData.attending === 'yes'
                      ? `Muito obrigado, ${formData.guestName}. A sua presença foi confirmada com sucesso!`
                      : `Agradecemos a sua resposta, ${formData.guestName}.`}
                  </p>
                </div>

                {/* Confirm Another Guest Option */}
                <div className="pt-6 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={handleConfirmAnotherGuest}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-[#c69c4e]/60 text-[#162842] font-montserrat text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    <UserPlus className="w-4 h-4 text-[#c69c4e]" />
                    <span>Confirmar Presença para Mais um Convidado</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Organizer Assistance Info */}
        <div className="mt-8 text-center text-xs font-montserrat text-[#162842] space-y-2 font-medium">
          <p className="font-bold text-[#162842]">Dúvidas ou Assessoria do Casamento:</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href="tel:+258877002267"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#c69c4e]/40 hover:border-[#c69c4e] text-[#162842] hover:text-[#946d05] font-bold shadow-xs transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5 text-[#c69c4e]" />
              <span>+258 87 700 2267</span>
            </a>
            <span className="text-[#c69c4e] font-bold">/</span>
            <a
              href="tel:+258867561010"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#c69c4e]/40 hover:border-[#c69c4e] text-[#162842] hover:text-[#946d05] font-bold shadow-xs transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5 text-[#c69c4e]" />
              <span>+258 86 756 1010</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
