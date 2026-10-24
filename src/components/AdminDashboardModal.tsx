import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Database, 
  ShieldCheck, 
  Users, 
  Activity, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Copy, 
  Check, 
  Smartphone, 
  Clock, 
  Server
} from 'lucide-react';
import { 
  fetchSystemStatus, 
  fetchRsvps, 
  fetchActivityLogs, 
  fetchLocationPings, 
  fetchBlockchainLedger 
} from '../services/api';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboardModal({ isOpen, onClose }: AdminDashboardModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'rsvps' | 'activity' | 'locations' | 'blockchain'>('overview');
  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [rsvpsData, setRsvpsData] = useState<any>({ rsvps: [], stats: { attending: 0, declined: 0 }, total: 0 });
  const [activities, setActivities] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [blockchainLedger, setBlockchainLedger] = useState<any>({ ledger: [], isChainValid: true });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [statusRes, rsvpRes, actRes, locRes, chainRes] = await Promise.allSettled([
        fetchSystemStatus(),
        fetchRsvps(),
        fetchActivityLogs(),
        fetchLocationPings(),
        fetchBlockchainLedger()
      ]);

      if (statusRes.status === 'fulfilled') setSystemStatus(statusRes.value);
      if (rsvpRes.status === 'fulfilled') setRsvpsData(rsvpRes.value);
      if (actRes.status === 'fulfilled') setActivities(actRes.value.activities || []);
      if (locRes.status === 'fulfilled') setLocations(locRes.value.locations || []);
      if (chainRes.status === 'fulfilled') setBlockchainLedger(chainRes.value);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyGuestList = () => {
    const list = (rsvpsData.rsvps || [])
      .map((r: any, idx: number) => {
        const pax = r.totalGuests ? ` (${r.totalGuests} pax)` : '';
        const companions = r.accompanyingNames ? ` [Acompanhantes: ${r.accompanyingNames}]` : '';
        const email = r.email ? ` | Email: ${r.email}` : '';
        return `${idx + 1}. ${r.guestName}${pax} | Tel: ${r.phone || 'N/D'}${email} | Presença: ${r.attending === 'yes' ? 'CONFIRMADO' : 'RECUSADO'} | Ticket: ${r.ticketId}${companions} | Notificação: bhelena.nhantumbo76@gmail.com`;
      })
      .join('\n');
    navigator.clipboard.writeText(list);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0c1626]/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl h-[88vh] bg-white rounded-3xl shadow-2xl border-2 border-[#c69c4e] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0c1626] via-[#162842] to-[#0c1626] text-white p-5 sm:p-6 border-b border-[#c69c4e]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#c69c4e]/20 border border-[#c69c4e] flex items-center justify-center">
                <Database className="w-6 h-6 text-[#c69c4e]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#c69c4e] text-[#0c1626] font-extrabold">
                    MongoDB & Blockchain Console
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-white mt-0.5">
                  Painel de Gestão dos Noivos
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={loadAllData}
                disabled={loading}
                title="Atualizar Dados"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#c69c4e] transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 flex items-center gap-2 overflow-x-auto select-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-4 text-xs font-montserrat font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-[#c69c4e] text-[#162842]'
                  : 'border-transparent text-slate-600 hover:text-[#162842]'
              }`}
            >
              <Server className="w-4 h-4 text-[#c69c4e]" />
              <span>Visão Geral & MongoDB</span>
            </button>

            <button
              onClick={() => setActiveTab('rsvps')}
              className={`py-3 px-4 text-xs font-montserrat font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'rsvps'
                  ? 'border-[#c69c4e] text-[#162842]'
                  : 'border-transparent text-slate-600 hover:text-[#162842]'
              }`}
            >
              <Users className="w-4 h-4 text-[#c69c4e]" />
              <span>Convidados ({rsvpsData.total || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('activity')}
              className={`py-3 px-4 text-xs font-montserrat font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'activity'
                  ? 'border-[#c69c4e] text-[#162842]'
                  : 'border-transparent text-slate-600 hover:text-[#162842]'
              }`}
            >
              <Activity className="w-4 h-4 text-[#c69c4e]" />
              <span>Histórico de Atividades ({activities.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('locations')}
              className={`py-3 px-4 text-xs font-montserrat font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'locations'
                  ? 'border-[#c69c4e] text-[#162842]'
                  : 'border-transparent text-slate-600 hover:text-[#162842]'
              }`}
            >
              <MapPin className="w-4 h-4 text-[#c69c4e]" />
              <span>Localizações ({locations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('blockchain')}
              className={`py-3 px-4 text-xs font-montserrat font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'blockchain'
                  ? 'border-[#c69c4e] text-[#162842]'
                  : 'border-transparent text-slate-600 hover:text-[#162842]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#c69c4e]" />
              <span>Blockchain Ledger ({blockchainLedger.chainLength || 0})</span>
            </button>
          </div>

          {/* Tab Contents */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto bg-slate-50">
            {/* 1. Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-[#c69c4e]/30 shadow-sm space-y-1">
                    <span className="text-[11px] font-montserrat uppercase tracking-wider text-slate-500 font-bold block">
                      Base de Dados MongoDB
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#162842]">
                        {systemStatus?.database?.connected ? 'Atlas Conectado' : 'Pronta / Local'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        systemStatus?.database?.connected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {systemStatus?.database?.connected ? 'MongoDB Atlas' : 'Armazenamento Ativo'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#c69c4e]/30 shadow-sm space-y-1">
                    <span className="text-[11px] font-montserrat uppercase tracking-wider text-slate-500 font-bold block">
                      Presenças Confirmadas (SIM)
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel text-2xl font-black text-emerald-600">
                        {rsvpsData.stats?.attending || 0}
                      </span>
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#c69c4e]/30 shadow-sm space-y-1">
                    <span className="text-[11px] font-montserrat uppercase tracking-wider text-slate-500 font-bold block">
                      Declinações (NÃO)
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel text-2xl font-black text-rose-500">
                        {rsvpsData.stats?.declined || 0}
                      </span>
                      <XCircle className="w-6 h-6 text-rose-400" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#c69c4e]/30 shadow-sm space-y-1">
                    <span className="text-[11px] font-montserrat uppercase tracking-wider text-slate-500 font-bold block">
                      Blocos na Blockchain
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel text-2xl font-black text-[#c69c4e]">
                        {blockchainLedger.chainLength || 1}
                      </span>
                      <ShieldCheck className="w-6 h-6 text-[#c69c4e]" />
                    </div>
                  </div>
                </div>

                {/* MongoDB Details Box */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <h4 className="font-cinzel text-base font-bold text-[#162842] flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#c69c4e]" />
                    <span>Detalhes de Integração da Base de Dados</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-montserrat">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block">Coleções Ativas:</span>
                      <span className="font-bold text-[#162842]">
                        rsvps, messages, activity_logs, location_pings, blockchain_ledger
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block">Status da Conexão:</span>
                      <span className="font-bold text-emerald-700">
                        {systemStatus?.database?.connected ? 'Conectado à String do MongoDB Atlas' : 'Conectado e Persistente (Suporta MONGODB_URI)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. RSVPs List */}
            {activeTab === 'rsvps' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel text-base font-bold text-[#162842]">
                    Lista Oficial de Convidados ({rsvpsData.total || 0})
                  </h4>
                  <button
                    onClick={copyGuestList}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl gold-button text-xs font-montserrat font-bold text-white shadow-sm cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Lista Copiada!' : 'Copiar Lista Completa'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#162842]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">📧 E-mail de Recebimento Oficial:</span>
                    <span className="font-mono font-bold text-[#c69c4e]">bhelena.nhantumbo76@gmail.com</span>
                  </div>
                  <div className="text-slate-600 text-[11px]">
                    Total de Pessoas Estimadas: <strong className="text-[#162842]">{rsvpsData.stats?.totalGuestsCount || rsvpsData.stats?.attending || 0} convidados</strong>
                  </div>
                </div>

                {(!rsvpsData.rsvps || rsvpsData.rsvps.length === 0) ? (
                  <div className="text-center py-12 rounded-2xl bg-white border border-slate-200">
                    <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                    <p className="font-cormorant text-lg text-slate-500 italic">
                      Nenhuma confirmação registada até ao momento.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-montserrat">
                        <thead className="bg-slate-100 border-b border-slate-200 text-[#162842] uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="p-3">Convidado & Família</th>
                            <th className="p-3">Pessoas</th>
                            <th className="p-3">Contacto / Email</th>
                            <th className="p-3">Presença</th>
                            <th className="p-3">Destino Email</th>
                            <th className="p-3">Ticket ID</th>
                            <th className="p-3">Blockchain</th>
                            <th className="p-3">Data</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {rsvpsData.rsvps.map((r: any, idx: number) => (
                            <tr key={r.ticketId || idx} className="hover:bg-slate-50">
                              <td className="p-3 font-bold text-[#162842]">
                                {r.guestName}
                                {r.accompanyingNames && (
                                  <span className="block text-[11px] font-medium text-[#c69c4e]">
                                    + {r.accompanyingNames}
                                  </span>
                                )}
                                {r.messageToCouple && (
                                  <span className="block text-[11px] font-normal italic text-slate-500 truncate max-w-xs mt-0.5">
                                    &ldquo;{r.messageToCouple}&rdquo;
                                  </span>
                                )}
                              </td>
                              <td className="p-3 font-semibold text-[#162842]">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-[10px] font-bold">
                                  {r.totalGuests || 1} {(r.totalGuests || 1) === 1 ? 'pessoa' : 'pessoas'}
                                </span>
                              </td>
                              <td className="p-3 text-slate-600 font-medium">
                                <div>{r.phone || 'N/D'}</div>
                                {r.email && <div className="text-[10px] text-slate-500">{r.email}</div>}
                              </td>
                              <td className="p-3">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                                  r.attending === 'yes' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {r.attending === 'yes' ? 'Confirmado' : 'Não comparecerá'}
                                </span>
                              </td>
                              <td className="p-3 text-[10px] text-slate-600 font-mono">
                                bhelena.nhantumbo76@gmail.com
                              </td>
                              <td className="p-3 font-mono font-bold text-[#c69c4e]">
                                {r.ticketId}
                              </td>
                              <td className="p-3 font-mono text-[10px] text-slate-500">
                                {r.blockchainProof?.blockHash ? `${r.blockchainProof.blockHash.slice(0, 10)}...` : 'Block #1'}
                              </td>
                              <td className="p-3 text-slate-500 text-[10px]">
                                {new Date(r.createdAt || Date.now()).toLocaleDateString('pt-PT')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Activity History */}
            {activeTab === 'activity' && (
              <div className="space-y-4">
                <h4 className="font-cinzel text-base font-bold text-[#162842]">
                  Histórico de Atividades & Interações em Tempo Real
                </h4>
                {activities.length === 0 ? (
                  <p className="text-center py-8 text-slate-400 italic">Nenhum evento registrado ainda.</p>
                ) : (
                  <div className="rounded-2xl bg-white border border-slate-200 divide-y divide-slate-100 shadow-sm max-h-[55vh] overflow-y-auto">
                    {activities.map((act, idx) => (
                      <div key={act.id || idx} className="p-3.5 flex items-start justify-between gap-3 text-xs font-montserrat hover:bg-slate-50">
                        <div className="flex items-start gap-2.5">
                          <Activity className="w-4 h-4 text-[#c69c4e] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-[#162842]">{act.description}</p>
                            <span className="text-[10px] text-slate-400">
                              Tipo: {act.type} • IP: {act.ip || 'Local'}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                          {new Date(act.createdAt).toLocaleTimeString('pt-PT')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. Location Tracking */}
            {activeTab === 'locations' && (
              <div className="space-y-4">
                <h4 className="font-cinzel text-base font-bold text-[#162842]">
                  Registo de Localização dos Convidados
                </h4>
                {locations.length === 0 ? (
                  <div className="text-center py-10 rounded-2xl bg-white border border-slate-200">
                    <MapPin className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-cormorant text-base text-slate-500 italic">
                      Os pings de localização são capturados conforme os convidados acessam os mapas do convite.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {locations.map((loc, idx) => (
                      <div key={loc.id || idx} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between text-xs font-montserrat">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#c69c4e]" />
                          <div>
                            <span className="font-bold text-[#162842] block">
                              {loc.city || 'Maputo'}, {loc.country || 'Moçambique'}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {loc.source} • IP: {loc.ip || 'Convidado'}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {new Date(loc.createdAt).toLocaleDateString('pt-PT')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. Blockchain Ledger Explorer */}
            {activeTab === 'blockchain' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0c1626] text-white border border-[#c69c4e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#f5d78e] font-bold block">
                      Auditoria de Integridade Criptográfica
                    </span>
                    <span className="font-cinzel text-lg font-bold">
                      Cadeia de Blocos do Casamento 2026
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-montserrat">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      {blockchainLedger.isChainValid ? 'Cadeia 100% Válida & Inalterável' : 'Atenção na Validação'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {(blockchainLedger.ledger || []).map((block: any) => (
                    <div key={block.index} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs font-montserrat">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-bold text-[#162842] flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#c69c4e]" />
                          Bloco #{block.index}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(block.timestamp).toLocaleString('pt-PT')}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-slate-500 block">Hash do Bloco (SHA-256):</span>
                          <span className="font-mono text-[10px] text-[#c69c4e] break-all block">
                            {block.hash}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Hash Anterior:</span>
                          <span className="font-mono text-[10px] text-slate-600 break-all block">
                            {block.previousHash}
                          </span>
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-50 font-mono text-[10px] text-slate-700">
                        {JSON.stringify(block.data)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
