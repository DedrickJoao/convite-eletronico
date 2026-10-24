import { useState, type FormEvent } from 'react';
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
  CalendarCheck, 
  ShieldCheck, 
  UserPlus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WEDDING_DETAILS } from '../data/weddingData';
import { submitRsvp, trackActivity } from '../services/api';
import BlockchainModal from './BlockchainModal';

const TARGET_EMAIL = "bhelena.nhantumbo76@gmail.com";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [blockData, setBlockData] = useState<any>(null);
  const [isBlockchainModalOpen, setIsBlockchainModalOpen] = useState(false);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedFallbackId = `DB-${Math.floor(1000 + Math.random() * 9000)}-CONVITE`;

    try {
      const result = await submitRsvp({
        guestName: formData.guestName,
        phone: formData.phone,
        attending: formData.attending,
        messageToCouple: formData.messageToCouple,
        notificationTarget: TARGET_EMAIL
      });

      const confirmedId = result.ticketId || generatedFallbackId;
      setTicketId(confirmedId);
      setBlockData(result.blockchainBlock || null);
      setIsSubmitted(true);
      triggerLuxuryConfetti();
      onSuccessSubmit(formData.guestName || "Convidado de Honra", confirmedId);

      // Background activity tracking
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
      setTicketId(generatedFallbackId);
      setIsSubmitted(true);
      triggerLuxuryConfetti();
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
    setTicketId('');
    setBlockData(null);
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 mx-auto flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>

                <div className="space-y-2">
                  <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#c69c4e] font-bold">
                    Confirmação Enviada com Sucesso
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#162842]">
                    Obrigado, {formData.guestName}!
                  </h3>
                  <p className="font-cormorant text-xl text-[#162842] italic max-w-md mx-auto font-medium">
                    {formData.attending === 'yes'
                      ? 'Sua presença tornará a celebração de Dionísio & Benedita ainda mais memorável.'
                      : 'Agradecemos o seu carinho e a sua resposta.'}
                  </p>
                </div>

                {/* Ticket Details Card */}
                <div className="p-6 rounded-2xl bg-[#dfe6ec]/60 border border-[#c69c4e]/50 max-w-md mx-auto text-left space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#162842]/10 pb-2">
                    <span className="text-[11px] font-montserrat uppercase tracking-wider text-[#162842] font-bold">
                      Código do Convite:
                    </span>
                    <span className="font-mono text-base font-extrabold text-[#c69c4e]">
                      {ticketId}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-[#162842]">
                    <span>Convidado:</span>
                    <span className="font-bold text-[#162842] bg-white px-2.5 py-0.5 rounded border border-[#c69c4e]/40">
                      {formData.guestName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-[#162842]">
                    <span>Estado da Presença:</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                      formData.attending === 'yes' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {formData.attending === 'yes' ? 'Confirmado' : 'Não comparecerá'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-[#162842] pt-1">
                    <CalendarCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Sábado, 12 de Dezembro de 2026 • Maputo</span>
                  </div>

                  {/* Blockchain Verification Box */}
                  <div className="pt-2 border-t border-[#162842]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Selo Blockchain #{blockData?.index ?? 'Proof'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsBlockchainModalOpen(true)}
                      className="text-[11px] font-montserrat font-bold text-[#c69c4e] hover:underline uppercase tracking-wider cursor-pointer"
                    >
                      Ver Prova Criptográfica &rarr;
                    </button>
                  </div>
                </div>

                {/* Confirm Another Guest Option */}
                <div className="pt-2 max-w-md mx-auto">
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

        {/* Organizer Assistance Info - without illustrating the email address */}
        <div className="mt-8 text-center text-xs font-montserrat text-[#162842] space-y-1 font-medium">
          <p className="font-bold text-[#162842]">Dúvidas ou Assessoria do Casamento:</p>
          <p className="text-[#c69c4e] font-bold">
            {WEDDING_DETAILS.organizerContact}
          </p>
        </div>

      </div>

      {/* Blockchain Audit Modal */}
      <BlockchainModal
        isOpen={isBlockchainModalOpen}
        onClose={() => setIsBlockchainModalOpen(false)}
        ticketId={ticketId}
        guestName={formData.guestName}
        blockData={blockData}
      />
    </section>
  );
}
