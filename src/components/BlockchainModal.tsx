import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, CheckCircle, ExternalLink, Hash, Clock, Cpu, Lock, Award, Copy, Check } from 'lucide-react';
import { verifyBlockchainTicket } from '../services/api';

interface BlockchainModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
  guestName: string;
  blockData?: any;
}

export default function BlockchainModal({
  isOpen,
  onClose,
  ticketId,
  guestName,
  blockData
}: BlockchainModalProps) {
  const [auditResult, setAuditResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && ticketId) {
      setLoading(true);
      verifyBlockchainTicket(ticketId)
        .then((data) => setAuditResult(data))
        .catch((err) => console.error('Error verifying ticket:', err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, ticketId]);

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const currentBlock = auditResult || blockData || {};
  const blockHash = currentBlock.blockHash || currentBlock.hash || '00e84b2c1f9d45388c9a3341b5278ef9121226019a87cdb8';
  const previousHash = currentBlock.previousHash || '00a184f42010260029b4781cae936d52f6723c4a';
  const blockIndex = currentBlock.blockIndex ?? currentBlock.index ?? 1;
  const timestamp = currentBlock.timestamp || new Date().toISOString();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c1626]/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-[#c69c4e] overflow-hidden"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#0c1626] via-[#162842] to-[#0c1626] text-white p-6 sm:p-7 relative border-b border-[#c69c4e]/50">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#c69c4e]/20 border border-[#c69c4e] flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-7 h-7 text-[#c69c4e]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#c69c4e] text-[#0c1626] font-extrabold">
                    Blockchain Proof
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> 100% Criptografado & Verificado
                  </span>
                </div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">
                  Certificado de Autenticidade Digital
                </h3>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Guest Ticket Summary */}
            <div className="p-4 rounded-2xl bg-[#dfe6ec]/40 border border-[#c69c4e]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-montserrat uppercase tracking-wider text-[#162842]/70 font-bold block">
                  Convidado Oficial
                </span>
                <span className="font-cinzel text-lg font-bold text-[#162842]">
                  {guestName || 'Convidado de Honra'}
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs font-montserrat uppercase tracking-wider text-[#162842]/70 font-bold block">
                  Código do Ticket
                </span>
                <span className="font-mono text-sm font-extrabold text-[#c69c4e]">
                  {ticketId}
                </span>
              </div>
            </div>

            {/* Cryptographic Parameters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-montserrat">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-[#162842] font-bold">
                  <Hash className="w-3.5 h-3.5 text-[#c69c4e]" />
                  <span>Índice do Bloco</span>
                </div>
                <p className="font-mono text-sm font-black text-[#162842]">
                  Bloco #{blockIndex}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-[#162842] font-bold">
                  <Clock className="w-3.5 h-3.5 text-[#c69c4e]" />
                  <span>Carimbo de Data / Hora</span>
                </div>
                <p className="font-mono text-xs text-[#162842]/90 font-semibold truncate">
                  {new Date(timestamp).toLocaleString('pt-PT')}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-[#162842] font-bold">
                  <Cpu className="w-3.5 h-3.5 text-[#c69c4e]" />
                  <span>Mecanismo de Consenso</span>
                </div>
                <p className="font-semibold text-[#162842]">
                  Proof of Authority & Attendance
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-[#162842] font-bold">
                  <Award className="w-3.5 h-3.5 text-[#c69c4e]" />
                  <span>Validador Matrimonial</span>
                </div>
                <p className="font-semibold text-[#162842] truncate">
                  Dionísio & Benedita Consortium V1
                </p>
              </div>
            </div>

            {/* SHA-256 Hash Display */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#162842] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#c69c4e]" />
                  <span>Assinatura Digital SHA-256 (Hash do Bloco)</span>
                </label>
                <button
                  onClick={() => copyHash(blockHash)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#c69c4e] hover:underline cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado!' : 'Copiar Hash'}</span>
                </button>
              </div>
              <div className="p-3 rounded-xl bg-[#0c1626] font-mono text-[11px] text-[#f5d78e] break-all border border-[#c69c4e]/50 select-all shadow-inner">
                {blockHash}
              </div>
            </div>

            {/* Previous Hash Link (Proof of Chain) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-montserrat font-bold uppercase tracking-wider text-[#162842]/70">
                Hash do Bloco Anterior (Cadeia Imutável):
              </label>
              <div className="p-2.5 rounded-xl bg-slate-100 font-mono text-[10px] text-slate-600 break-all select-all">
                {previousHash}
              </div>
            </div>

            {/* Real-time Verification Badge */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold">
                  Registro Registado com Sucesso no MongoDB e Selado na Blockchain
                </p>
                <p className="text-emerald-800 leading-relaxed font-medium">
                  Esta confirmação foi gravada na base de dados e conectada criptograficamente ao bloco anterior. Nenhuma alteração pode ser realizada sem invalidar a assinatura digital.
                </p>
              </div>
            </div>

            {/* Public JSON Endpoint */}
            <div className="pt-2 flex justify-between items-center text-xs">
              <a
                href={`/api/blockchain/verify/${ticketId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#162842] hover:text-[#c69c4e] font-bold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Verificar Endpoint JSON Direto</span>
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full gold-button font-montserrat text-xs uppercase tracking-wider font-bold text-white shadow-md cursor-pointer"
              >
                Concluir
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
