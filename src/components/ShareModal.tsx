import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Search,
  ExternalLink, 
  Download, 
  Sparkles,
  UserPlus,
  FileSpreadsheet,
  Link2,
  Users
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { GUEST_LIST, GuestItem, getGuestTypeAndValidity, getGuestProfile, BASE_SHARED_URL, createGuestLink } from '../data/guestList';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
  onSelectGuest?: (name: string) => void;
}

export default function ShareModal({ isOpen, onClose, isAdmin = false, onSelectGuest }: ShareModalProps) {
  const [activeTab, setActiveTab] = useState<'table' | 'single' | 'import'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedAdminUrl, setCopiedAdminUrl] = useState(false);
  
  // Custom single guest state
  const [customName, setCustomName] = useState('');
  const [copiedCustom, setCopiedCustom] = useState(false);

  // Bulk import state
  const [bulkList, setBulkList] = useState<GuestItem[]>(GUEST_LIST);
  const [pasteInput, setPasteInput] = useState('');
  const [selectedBaseUrl] = useState<string>(BASE_SHARED_URL);

  if (!isOpen || !isAdmin) return null;

  // Format custom link for any name using the official Vercel domain
  const makeGuestLink = (name: string) => {
    return createGuestLink(name, selectedBaseUrl);
  };

  const makeWhatsappMsg = (name: string, url: string) => {
    const { validityText } = getGuestTypeAndValidity(name);
    return `Olá, ${name}!\n\nÉ com imensa honra e alegria que convidamos você para o nosso casamento:\n\n💍 Dionísio & Benedita 2026\n📅 Sábado, 12 de Dezembro de 2026\n⛪ Sé Catedral de Maputo (09h30)\n🥂 Orquídea Eventos, Matola Rio (14h00)\n\nPreparamos o seu convite digital oficial com o seu nome na pré-visualização e no envelope (${validityText}, não extensivo a crianças). Toque no link abaixo para abrir:\n${url}\n\nPor gentileza, confirme a sua presença até 7 de Novembro de 2026.`;
  };

  // Filtered guests from the 47 preloaded items
  const filteredGuests = bulkList.filter((g) => {
    const q = searchQuery.toLowerCase();
    return (
      g.fullName.toLowerCase().includes(q) ||
      g.type.toLowerCase().includes(q)
    );
  });

  const handleCopyLink = (url: string, idx: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleOpenWhatsapp = (msg: string) => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleExportExcel = () => {
    const data = bulkList.map((g) => {
      const profile = getGuestProfile(g.fullName);
      const guestLink = makeGuestLink(g.fullName);
      return {
        'Tipo de Convite': g.type,
        'Nome do Convidado': g.fullName,
        'Nome 1': g.name1 || g.fullName,
        'Nome 2': g.name2 || '',
        'Pessoas Autorizadas': profile ? profile.allowedCount : (g.type === 'Casal' ? 2 : 1),
        'Validade': profile ? profile.validityText : (g.validityText || 'CONVITE VÁLIDO PARA 1 PESSOA.'),
        'Observações': profile ? profile.specialNotes : 'NÃO EXTENSIVO A CRIANÇAS',
        'Restrições': profile ? profile.restrictions : 'CONFIRMAÇÃO OBRIGATÓRIA ATÉ 7 DE NOVEMBRO DE 2026',
        'Link': guestLink,
        'Mensagem Pronta para WhatsApp': makeWhatsappMsg(g.fullName, guestLink)
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Convidados');
    XLSX.writeFile(wb, 'Convites_Casamento_Dionisio_Benedita_2026.xlsx');
  };

  const handleCopyAllLinks = () => {
    const all = bulkList
      .map((g) => `${g.fullName} (${g.type}):\n${makeGuestLink(g.fullName)}`)
      .join('\n\n');
    navigator.clipboard.writeText(all);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleProcessPasted = () => {
    const lines = pasteInput.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;

    const newItems: GuestItem[] = lines.map((line, i) => {
      const isCouple = line.toLowerCase().includes(' e ') || line.toLowerCase().includes('&') || line.toLowerCase().includes('esposa') || line.toLowerCase().includes('esposo');
      const url = makeGuestLink(line);
      return {
        id: bulkList.length + i + 1,
        type: isCouple ? 'Casal' : 'Individual',
        name1: line,
        fullName: line,
        url,
        whatsappMessage: makeWhatsappMsg(line, url)
      };
    });

    setBulkList((prev) => [...prev, ...newItems]);
    setPasteInput('');
    setActiveTab('table');
  };

  const customSingleUrl = customName.trim() ? makeGuestLink(customName.trim()) : selectedBaseUrl;
  const customSingleMsg = makeWhatsappMsg(customName.trim() || 'Convidado de Honra', customSingleUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl rounded-3xl bg-white p-5 sm:p-8 border-2 border-[#c69c4e]/50 shadow-2xl my-auto max-h-[92vh] flex flex-col overflow-hidden text-[#162842]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#dfe6ec] hover:bg-[#dfe6ec]/80 text-[#162842] transition-colors cursor-pointer z-10"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4 shrink-0 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162842] text-[#f5d78e] border border-[#c69c4e] text-[11px] font-montserrat font-bold mb-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Área Restrita do Administrador • Oculto para Convidados</span>
          </div>
          
          <h3 className="font-cinzel text-xl sm:text-2xl font-black text-[#162842]">
            Central de Convites Personalizados
          </h3>
          
          <p className="font-montserrat text-xs text-[#162842]/85 mt-1 max-w-xl mx-auto font-medium">
            Gerenciamento exclusivo dos links de convite para os 47 convidados e casais com o domínio oficial <span className="font-mono font-bold text-[#162842]">https://convite-eletronico.vercel.app</span>.
          </p>

          {/* Quick Domain Badge & Admin Access Link Copy */}
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-300">
              <Link2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Base: {selectedBaseUrl}</span>
            </span>

            <button
              onClick={() => {
                const adminUrl = `${selectedBaseUrl}/?admin=2026`;
                navigator.clipboard.writeText(adminUrl);
                setCopiedAdminUrl(true);
                setTimeout(() => setCopiedAdminUrl(false), 2500);
              }}
              className="inline-flex items-center gap-1.5 text-[11px] font-montserrat font-semibold text-[#162842]/80 hover:text-[#c69c4e] bg-[#dfe6ec]/60 hover:bg-[#dfe6ec] px-3 py-1 rounded-lg border border-[#c69c4e]/30 transition-all cursor-pointer"
              title="Copie este link para salvar nos seus favoritos e aceder diretamente como administrador sem pedir PIN"
            >
              {copiedAdminUrl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Link de Admin Copiado!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5 text-[#c69c4e]" />
                  <span>Copiar Link de Acesso Rápido Admin (?admin=2026)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex rounded-2xl bg-[#dfe6ec]/60 p-1 mb-4 shrink-0 border border-[#c69c4e]/30 text-xs sm:text-sm font-montserrat font-bold">
          <button
            onClick={() => setActiveTab('table')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'table' ? 'bg-[#162842] text-[#f5d78e] shadow-md' : 'text-[#162842] hover:text-[#c69c4e]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-[#c69c4e]" />
            <span>Lista dos Convidados ({bulkList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('single')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'single' ? 'bg-[#162842] text-[#f5d78e] shadow-md' : 'text-[#162842] hover:text-[#c69c4e]'
            }`}
          >
            <UserPlus className="w-4 h-4 text-[#c69c4e]" />
            <span>Gerar Convite Rápido</span>
          </button>

          <button
            onClick={() => setActiveTab('import')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'import' ? 'bg-[#162842] text-[#f5d78e] shadow-md' : 'text-[#162842] hover:text-[#c69c4e]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#c69c4e]" />
            <span>Adicionar Mais Nomes</span>
          </button>
        </div>

        {/* TAB 1: 47 PRELOADED GUESTS TABLE & EXPORT */}
        {activeTab === 'table' && (
          <div className="flex flex-col flex-1 overflow-hidden space-y-3">
            {/* Search Bar & Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-[#162842]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar por nome ou tipo (ex: Lucas, Arlindo, Casal)..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] text-xs font-montserrat font-semibold focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleExportExcel}
                  className="py-2 px-3.5 rounded-xl bg-[#162842] hover:bg-[#0c1626] text-[#f5d78e] border border-[#c69c4e] font-montserrat text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  title="Baixar lista completa em ficheiro Excel"
                >
                  <Download className="w-3.5 h-3.5 text-[#c69c4e]" />
                  <span>Baixar Excel (.xlsx)</span>
                </button>

                <button
                  onClick={handleCopyAllLinks}
                  className="py-2 px-3.5 rounded-xl bg-white hover:bg-white/80 border border-[#c69c4e]/50 text-[#162842] font-montserrat text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  title="Copiar todos os links gerados"
                >
                  {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAll ? 'Copiado!' : 'Copiar Todos'}</span>
                </button>
              </div>
            </div>

            {/* Scrollable Guests List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 rounded-2xl border border-[#c69c4e]/30 p-2 bg-[#dfe6ec]/20">
              {filteredGuests.length === 0 ? (
                <div className="p-8 text-center text-xs font-montserrat text-[#162842]/70 font-medium">
                  Nenhum convidado encontrado para &quot;{searchQuery}&quot;.
                </div>
              ) : (
                filteredGuests.map((g, idx) => {
                  const finalUrl = makeGuestLink(g.fullName);
                  const finalMsg = makeWhatsappMsg(g.fullName, finalUrl);

                  return (
                    <div
                      key={g.id || idx}
                      className="p-3 rounded-xl bg-white border border-[#c69c4e]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs hover:border-[#c69c4e] transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-montserrat font-bold uppercase tracking-wider ${
                            g.type === 'Casal' ? 'bg-[#c69c4e]/20 text-[#946d05]' : 'bg-[#162842]/10 text-[#162842]'
                          }`}>
                            {g.type}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-montserrat font-extrabold bg-[#dfe6ec] text-[#162842]">
                            {g.validityText || (g.type === 'Casal' ? 'CONVITE VÁLIDO PARA 2 PESSOAS.' : 'CONVITE VÁLIDO PARA 1 PESSOA.')}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-montserrat font-bold text-[#8c2d2d] bg-rose-50 border border-rose-200">
                            [{g.specialNotes || 'NÃO EXTENSIVO A CRIANÇAS'}]
                          </span>
                          <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#162842]">
                            {g.fullName}
                          </h4>
                        </div>
                        <p className="font-mono text-[11px] text-[#162842]/70 truncate max-w-xs sm:max-w-md">
                          {finalUrl}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        {/* Direct in-app preview on envelope */}
                        <button
                          onClick={() => {
                            if (onSelectGuest) {
                              onSelectGuest(g.fullName);
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-[#162842] hover:bg-[#0c1626] text-[#f5d78e] font-montserrat text-xs font-bold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                          title="Visualizar este convidado na capa do envelope agora"
                        >
                          <span>👁️ Testar Envelope</span>
                        </button>

                        {/* Copy Link */}
                        <button
                          onClick={() => handleCopyLink(finalUrl, idx)}
                          className="p-2 rounded-lg bg-white border border-[#c69c4e]/50 hover:border-[#c69c4e] text-[#162842] transition-colors cursor-pointer"
                          title="Copiar Link Oficial"
                        >
                          {copiedIdx === idx ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-[#162842]" />
                          )}
                        </button>

                        {/* Send on WhatsApp */}
                        <button
                          onClick={() => handleOpenWhatsapp(finalMsg)}
                          className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-montserrat text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                          title="Enviar no WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SINGLE GUEST GENERATOR */}
        {activeTab === 'single' && (
          <div className="space-y-4 flex-1 overflow-y-auto pr-1">
            <div className="space-y-1.5">
              <label className="block text-xs font-montserrat uppercase tracking-wider text-[#162842] font-bold flex items-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5 text-[#c69c4e]" />
                <span>Nome do Convidado ou Casal:</span>
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Ex: Tio Manuel & Família, ou Dr. Alberto Santos"
                className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl py-3 px-4 text-xs sm:text-sm text-[#162842] font-semibold focus:outline-none transition-colors"
              />
            </div>

            {/* Envelope Preview */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#2e3b2b] to-[#1f281d] text-center border-2 border-[#c69c4e]/50 shadow-inner relative overflow-hidden min-h-[220px] flex flex-col justify-between">
              <p className="font-montserrat text-[10px] uppercase tracking-widest text-[#f5d78e]/70 mb-1 font-bold">
                Pré-visualização do Envelope Fechado
              </p>

              {/* Fita e Selo de Cera no meio */}
              <div className="relative my-3 flex items-center justify-center">
                <div className="w-full h-4 bg-gradient-to-r from-[#946d05] via-[#d4af37] to-[#946d05] shadow-md border-y border-[#f5d78e]/40" />
                <div className="absolute w-9 h-9 rounded-full bg-gradient-to-br from-[#801414] to-[#450a0a] border border-[#d4af37] flex items-center justify-center shadow-lg">
                  <span className="font-alex text-xs text-[#f5d78e]">D&B</span>
                </div>
              </div>

              {/* Informação do Convidado diretamente sobre o envelope */}
              {(() => {
                const profile = getGuestProfile(customName || 'Nome do Convidado / Casal');
                return (
                  <div className="py-2 px-3 max-w-sm mx-auto text-center w-full">
                    <span className="font-alex text-2xl text-[#f5d78e] block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      Especialmente para
                    </span>
                    <h4 className="font-cinzel text-base sm:text-lg font-black text-white mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                      {profile?.guestName || (customName.trim() ? customName.trim() : 'Nome do Convidado / Casal')}
                    </h4>
                    
                    {/* Badges: Tipo de Convite & Nr de Pessoas */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 my-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-montserrat font-extrabold uppercase bg-black/40 border border-[#c69c4e]/70 text-[#f5d78e]">
                        {profile?.type === 'Casal' ? 'TIPO: CASAL' : 'TIPO: INDIVIDUAL'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-montserrat font-black uppercase bg-[#c69c4e] text-[#162842]">
                        {profile?.allowedCount || 1} {profile?.allowedCount === 2 ? 'PESSOAS' : 'PESSOA'}
                      </span>
                    </div>

                    <div className="text-[10px] font-montserrat font-black text-[#faf8f5] uppercase tracking-wider my-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      {profile?.validityText || 'CONVITE VÁLIDO PARA 1 PESSOA.'}
                    </div>

                    {profile?.specialNotes && (
                      <span className="font-montserrat text-[8.5px] uppercase tracking-wider text-[#ff7070] font-black block mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        [{profile.specialNotes}]
                      </span>
                    )}
                    {profile?.restrictions && (
                      <span className="font-montserrat text-[7.5px] uppercase tracking-wider text-white/80 font-bold block mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        {profile.restrictions}
                      </span>
                    )}

                    <div className="mt-2.5">
                      <button
                        onClick={() => {
                          if (onSelectGuest) {
                            onSelectGuest(customName.trim() || 'Belinha e Lucas');
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-[#c69c4e] hover:bg-[#b58b3d] text-[#162842] font-montserrat text-[10px] font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                      >
                        👁️ Testar no Envelope Agora
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Generated Link Box */}
            <div className="p-3.5 rounded-xl bg-[#dfe6ec]/60 border border-[#c69c4e]/40 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 overflow-hidden text-xs font-mono text-[#162842] font-semibold">
                <Link2 className="w-4 h-4 text-[#c69c4e] shrink-0" />
                <span className="truncate">{customSingleUrl}</span>
              </div>
              
              <button
                onClick={() => {
                  navigator.clipboard.writeText(customSingleUrl);
                  setCopiedCustom(true);
                  setTimeout(() => setCopiedCustom(false), 2000);
                }}
                className="px-4 py-2 rounded-lg gold-button text-xs font-montserrat font-bold shrink-0 shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                {copiedCustom ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCustom ? 'Copiado!' : 'Copiar Link'}</span>
              </button>
            </div>

            {/* Share WhatsApp */}
            <button
              onClick={() => handleOpenWhatsapp(customSingleMsg)}
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-montserrat text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Enviar no WhatsApp</span>
            </button>
          </div>
        )}

        {/* TAB 3: IMPORT MORE NAMES */}
        {activeTab === 'import' && (
          <div className="space-y-4 flex-1 overflow-y-auto pr-1">
            <div className="space-y-1.5">
              <label className="block text-xs font-montserrat font-bold text-[#162842]">
                Cole novos nomes ou casais (um por linha):
              </label>
              <textarea
                rows={6}
                value={pasteInput}
                onChange={(e) => setPasteInput(e.target.value)}
                placeholder="Ex:&#10;Dr. Gabriel e Esposa&#10;Mariana Santos&#10;Família Nhantumbo"
                className="w-full bg-[#dfe6ec]/40 border border-[#162842]/20 focus:border-[#c69c4e] rounded-xl p-3 text-xs font-montserrat font-semibold focus:outline-none"
              />
            </div>

            <button
              onClick={handleProcessPasted}
              disabled={!pasteInput.trim()}
              className="py-2.5 px-6 rounded-full gold-button font-montserrat text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>Adicionar à Lista de Convites</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
