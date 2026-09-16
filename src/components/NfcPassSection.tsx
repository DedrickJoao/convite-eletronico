import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Radio, CheckCircle2, Download, Smartphone, QrCode, ShieldCheck, Crown, Copy, Check } from 'lucide-react';
import { WEDDING_DETAILS } from '../data/weddingData';
import QRCode from 'qrcode';

interface NfcPassSectionProps {
  guestName?: string;
  ticketId?: string;
}

export default function NfcPassSection({ guestName = "Convidado de Honra", ticketId = "BD-2026-VIP-889" }: NfcPassSectionProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isNfcScanning, setIsNfcScanning] = useState<boolean>(false);
  const [nfcCheckedIn, setNfcCheckedIn] = useState<boolean>(false);
  const [nfcMessage, setNfcMessage] = useState<string>('');
  const [hasWebNfc, setHasWebNfc] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    // Generate high resolution Gold-accented QR Code
    const passPayload = JSON.stringify({
      event: "Casamento Benedita & Dionisio 2026",
      guest: guestName,
      ticketId: ticketId,
      date: "2026-12-12",
      access: "VIP All-Access Lounge & Banquet",
      nfcId: `NFC-${ticketId}`
    });

    QRCode.toDataURL(passPayload, {
      width: 320,
      margin: 1,
      color: {
        dark: '#0b0c10',
        light: '#f5d77f'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));

    // Check if Web NFC API is supported in current browser/device
    if ('NDEFReader' in window) {
      setHasWebNfc(true);
    }
  }, [guestName, ticketId]);

  const handleSimulateNfcTap = () => {
    setIsNfcScanning(true);
    setNfcMessage("Aproxime o dispositivo do terminal VIP do casamento...");

    setTimeout(() => {
      setIsNfcScanning(false);
      setNfcCheckedIn(true);
      setNfcMessage("Check-in NFC Validado com Sucesso! Acesso VIP Autorizado.");
    }, 1800);
  };

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="nfc-pass" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-4">
            <Radio className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#f5d77f] font-semibold">
              Tecnologia & Acesso Exclusivo
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide gold-gradient-text mb-4">
            Smart Pass VIP & Check-in NFC
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light">
            Inovação de ponta para a sua comodidade. Apresente seu passe digital interativo ou encoste seu smartphone nos leitores NFC ao chegar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: The Royal Digital Pass Card (Wallet Style) */}
          <div className="lg:col-span-7 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[430px] rounded-3xl p-[2px] bg-gradient-to-br from-[#f5d77f] via-[#d4af37] to-[#785404] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.25)]"
            >
              <div className="w-full rounded-[22px] bg-gradient-to-b from-[#161a29] via-[#0d101a] to-[#08090f] p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between">
                
                {/* Holographic Watermark Monogram */}
                <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full bg-gradient-to-br from-[#d4af37]/10 to-transparent blur-xl pointer-events-none" />
                <div className="absolute top-0 right-0 p-8 opacity-10 font-cinzel text-8xl font-black text-[#d4af37] pointer-events-none select-none">
                  BD
                </div>

                {/* Card Top: Crown & Event Name */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center">
                      <Crown className="w-4 h-4 text-[#f5d77f]" />
                    </div>
                    <div>
                      <span className="font-cinzel text-xs font-bold gold-gradient-text tracking-widest block uppercase">
                        {WEDDING_DETAILS.bride} & {WEDDING_DETAILS.groom}
                      </span>
                      <span className="text-[10px] font-montserrat tracking-widest text-gray-400 uppercase">
                        Edição Imperial 2026
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[10px] font-montserrat font-bold text-[#f5d77f] uppercase tracking-wider">
                    <Radio className="w-3 h-3 animate-pulse" />
                    <span>NFC Enabled</span>
                  </div>
                </div>

                {/* Card Middle: Guest Info */}
                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-[#d4af37] block">
                      Convidado de Honra
                    </span>
                    <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide mt-0.5">
                      {guestName}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                    <div>
                      <span className="text-[10px] font-montserrat uppercase tracking-wider text-gray-400 block">
                        Data & Horário
                      </span>
                      <p className="font-montserrat text-xs font-semibold text-gray-200 mt-0.5">
                        12 DEZ 2026 • 16:00
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-montserrat uppercase tracking-wider text-gray-400 block">
                        Categoria
                      </span>
                      <p className="font-montserrat text-xs font-semibold text-[#f5d77f] mt-0.5">
                        VIP All-Access Pass
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Bottom: QR Code & Ticket ID */}
                <div className="bg-[#050608]/90 rounded-2xl p-4 border border-[#d4af37]/30 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-montserrat uppercase tracking-widest text-[#d4af37]">
                      Código de Entrada Único
                    </span>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-xs sm:text-sm font-bold tracking-wider text-white">
                        {ticketId}
                      </p>
                      <button
                        onClick={handleCopyTicket}
                        title="Copiar Código"
                        className="p-1 rounded text-gray-400 hover:text-[#f5d77f]"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-[9px] text-gray-400">Válido para entrada direta no local</p>
                  </div>

                  {/* QR Image */}
                  <div className="w-20 h-20 bg-white p-1.5 rounded-xl shrink-0 shadow-md">
                    {qrDataUrl ? (
                      <img src={qrDataUrl} alt="QR Code VIP" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-black text-[9px]">
                        QR Code
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Right Column: NFC Interaction & Technological Features */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-3xl crystal-card p-6 sm:p-8 border border-white/10 relative overflow-hidden">
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#d4af37]" />
                <span>Simulador de Check-in NFC</span>
              </h3>
              
              <p className="font-montserrat text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 font-light">
                No dia 12 de Dezembro, nossa equipe de recepção contará com totens de aproximação inteligentes. Teste agora a validação do seu Smart Pass:
              </p>

              {/* Action Button */}
              <button
                id="simulate-nfc-tap-btn"
                onClick={handleSimulateNfcTap}
                disabled={isNfcScanning}
                className={`w-full py-3.5 px-6 rounded-2xl font-montserrat text-xs sm:text-sm font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2.5 shadow-lg ${
                  nfcCheckedIn
                    ? 'bg-emerald-600/30 border border-emerald-500 text-emerald-300'
                    : 'gold-button'
                }`}
              >
                {isNfcScanning ? (
                  <>
                    <Radio className="w-4 h-4 animate-spin text-black" />
                    <span>Lendo Sinal NFC...</span>
                  </>
                ) : nfcCheckedIn ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Check-in Efetuado com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Radio className="w-4 h-4 text-black" />
                    <span>Tocar para Simular Leitura NFC</span>
                  </>
                )}
              </button>

              {/* Status Message */}
              <AnimatePresence>
                {nfcMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-4 p-3.5 rounded-xl text-xs font-montserrat border flex items-center gap-2.5 ${
                      nfcCheckedIn
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                        : 'bg-[#d4af37]/10 border-[#d4af37]/30 text-[#f5d77f]'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{nfcMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Smart Wallet Instructions */}
            <div className="rounded-3xl crystal-card p-6 border border-white/10 space-y-3">
              <h4 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>Compatibilidade Total</span>
              </h4>
              <ul className="space-y-2 text-xs font-montserrat text-gray-300 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                  <span>Compatível com Apple Wallet e Google Wallet</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                  <span>Leitura instantânea em dispositivos iOS e Android com NFC</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                  <span>Backup garantido com QR Code de alta precisão</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
