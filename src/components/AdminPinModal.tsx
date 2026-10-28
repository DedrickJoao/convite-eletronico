import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ShieldCheck, KeyRound, X, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminPinModal({ isOpen, onClose, onSuccess }: AdminPinModalProps) {
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pin.trim().toLowerCase();

    // Accepted secure admin PINs / passwords
    const validPins = ['2026', '1212', 'noivos', 'dionisio', 'benedita', 'admin2026'];

    if (validPins.includes(cleanPin)) {
      setError(false);
      onSuccess();
      setPin('');
    } else {
      setError(true);
      setErrorMessage('PIN ou senha incorreta. Tente novamente.');
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 border-2 border-[#c69c4e]/50 shadow-2xl text-[#162842] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#dfe6ec] hover:bg-[#dfe6ec]/80 text-[#162842] transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#162842] to-[#25426d] border border-[#c69c4e] flex items-center justify-center mx-auto mb-3 shadow-md">
              <Lock className="w-7 h-7 text-[#f5d78e]" />
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#162842]">
              Acesso do Administrador
            </h3>

            <p className="font-montserrat text-xs text-[#162842]/75 mt-1.5 leading-relaxed font-medium">
              Área exclusiva para os noivos gerenciarem a lista de 47 convidados e links individuais.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-montserrat uppercase tracking-wider text-[#162842] font-bold flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#c69c4e]" />
                <span>PIN / Senha de Acesso:</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (error) setError(false);
                  }}
                  autoFocus
                  placeholder="Digite o PIN (ex: 2026)"
                  className={`w-full bg-[#dfe6ec]/40 border ${
                    error ? 'border-rose-500 bg-rose-50/50' : 'border-[#162842]/20 focus:border-[#c69c4e]'
                  } rounded-xl py-3 pl-4 pr-11 text-sm text-[#162842] font-semibold tracking-wider focus:outline-none transition-colors`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#162842]/60 hover:text-[#162842] p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error ? (
                <div className="flex items-center gap-1.5 text-rose-600 text-xs font-montserrat font-bold pt-1">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              ) : (
                <p className="text-[11px] font-montserrat text-[#162842]/60 font-medium">
                  PIN padrão de segurança: <span className="font-mono font-bold text-[#c69c4e]">2026</span>
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl gold-button text-xs font-montserrat font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer tracking-wider uppercase"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Aceder à Lista de Convidados</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-[#dfe6ec]/50 text-[#162842]/70 hover:text-[#162842] text-xs font-montserrat font-semibold transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
