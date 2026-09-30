import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Share2, Copy, Check, MessageCircle, Send, Mail, UserPlus, Link2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [customGuest, setCustomGuest] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const getShareUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    if (customGuest.trim()) {
      return `${baseUrl}?guest=${encodeURIComponent(customGuest.trim())}`;
    }
    return baseUrl;
  };

  const getShareMessage = () => {
    const guestGreeting = customGuest.trim() ? `Olá ${customGuest.trim()}!` : 'Prezado(a) Convidado(a),';
    return `${guestGreeting}\n\nÉ com imensa honra e alegria que convidamos você para o Casamento de Dionísio & Benedita, no dia 12 de Dezembro de 2026 em Maputo, Moçambique.\n\n"Que falte tudo menos Deus..."\n\nAcesse o convite digital oficial e confirme sua presença pelo link:\n${getShareUrl()}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(getShareMessage());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleTelegramShare = () => {
    const text = encodeURIComponent(getShareMessage());
    window.open(`https://t.me/share/url?url=${encodeURIComponent(getShareUrl())}&text=${text}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Convite Oficial: Casamento de Dionísio & Benedita 2026`);
    const body = encodeURIComponent(getShareMessage());
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 border-2 border-[#c69c4e]/50 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#dfe6ec] hover:bg-[#dfe6ec]/80 text-[#162842] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#dfe6ec] border border-[#c69c4e]/50 flex items-center justify-center mx-auto mb-3">
            <Share2 className="w-6 h-6 text-[#c69c4e]" />
          </div>
          
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#162842]">
            Compartilhar Convite
          </h3>
          
          <p className="font-montserrat text-xs text-[#162842]/80 mt-1 font-medium">
            Envie este convite personalizado para seus amigos e familiares pelo WhatsApp ou E-mail.
          </p>
        </div>

        {/* Personalized Link Generator */}
        <div className="space-y-4 mb-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-montserrat uppercase tracking-wider text-[#162842] font-bold flex items-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5 text-[#c69c4e]" />
              <span>Personalizar com o Nome do Convidado:</span>
            </label>
            <input
              type="text"
              value={customGuest}
              onChange={(e) => setCustomGuest(e.target.value)}
              placeholder="Ex: Tio Manuel & Família"
              className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-[#162842] font-semibold focus:outline-none transition-colors"
            />
          </div>

          {/* Generated URL Box */}
          <div className="p-3 rounded-xl bg-[#dfe6ec]/60 border border-[#c69c4e]/40 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden text-xs font-mono text-[#162842] font-semibold">
              <Link2 className="w-4 h-4 text-[#c69c4e] shrink-0" />
              <span className="truncate">{getShareUrl()}</span>
            </div>
            
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-lg gold-button text-xs font-montserrat font-bold shrink-0 shadow-sm flex items-center gap-1 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Share Channel Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={handleWhatsAppShare}
            className="py-3 px-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/60 text-[#162842] font-montserrat text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleTelegramShare}
            className="py-3 px-2 rounded-xl bg-sky-100 hover:bg-sky-200 border border-sky-400 text-[#162842] font-montserrat text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Send className="w-5 h-5 text-sky-600" />
            <span>Telegram</span>
          </button>

          <button
            onClick={handleEmailShare}
            className="py-3 px-2 rounded-xl bg-[#dfe6ec] hover:bg-[#dfe6ec]/80 border border-[#c69c4e]/50 text-[#162842] font-montserrat text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Mail className="w-5 h-5 text-[#c69c4e]" />
            <span>E-mail</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
