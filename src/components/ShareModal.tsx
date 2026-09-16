import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Share2, Copy, Check, MessageCircle, Send, Mail, Sparkles, UserPlus, Link2 } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';

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
    return `${guestGreeting}\n\nÉ com imensa honra e alegria que convidamos você para o Casamento Real de Benedita & Dionísio, no dia 12 de Dezembro de 2026.\n\nAcesse o convite digital luxuoso e confirme sua presença pelo link:\n${getShareUrl()}`;
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
    const subject = encodeURIComponent(`Convite Real: Casamento de Benedita & Dionísio 2026`);
    const body = encodeURIComponent(getShareMessage());
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="relative w-full max-w-lg rounded-3xl crystal-card p-6 sm:p-8 border border-[#d4af37]/40 gold-border-glow shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-3">
            <Share2 className="w-6 h-6 text-[#f5d77f]" />
          </div>
          
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
            Compartilhar Convite Real
          </h3>
          
          <p className="font-montserrat text-xs text-gray-300 mt-1 font-light">
            Envie este convite exclusivo para seus amigos e familiares pelo WhatsApp, E-mail ou redes sociais.
          </p>
        </div>

        {/* Personalized Link Generator */}
        <div className="space-y-4 mb-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-montserrat uppercase tracking-wider text-[#d4af37] font-semibold flex items-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Personalizar com o Nome do Convidado:</span>
            </label>
            <input
              type="text"
              value={customGuest}
              onChange={(e) => setCustomGuest(e.target.value)}
              placeholder="Ex: Tio Manuel & Família"
              className="w-full bg-[#090b10] border border-white/15 focus:border-[#d4af37] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
            />
          </div>

          {/* Generated URL Box */}
          <div className="p-3 rounded-xl bg-[#090b10] border border-white/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden text-xs font-mono text-gray-300">
              <Link2 className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span className="truncate">{getShareUrl()}</span>
            </div>
            
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg crystal-card border border-[#d4af37]/40 text-xs font-montserrat font-semibold text-[#f5d77f] shrink-0 hover:bg-[#d4af37]/20 transition-all flex items-center gap-1"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Share Channel Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={handleWhatsAppShare}
            className="py-3 px-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 text-emerald-300 font-montserrat text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleTelegramShare}
            className="py-3 px-2 rounded-xl bg-sky-600/20 border border-sky-500/40 hover:bg-sky-600/30 text-sky-300 font-montserrat text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all"
          >
            <Send className="w-5 h-5 text-sky-400" />
            <span>Telegram</span>
          </button>

          <button
            onClick={handleEmailShare}
            className="py-3 px-2 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 hover:bg-[#d4af37]/25 text-[#f5d77f] font-montserrat text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all"
          >
            <Mail className="w-5 h-5 text-[#d4af37]" />
            <span>E-mail</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
