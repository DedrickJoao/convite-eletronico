import { useState } from 'react';
import { motion } from 'motion/react';
import { Music, Play, Pause, Disc3, ExternalLink, Radio } from 'lucide-react';
import { PLAYLIST_ITEMS, WEDDING_DETAILS } from '../data/weddingData';
import { PlaylistItem } from '../types';

export default function PlaylistSection() {
  const [activeTrack, setActiveTrack] = useState<PlaylistItem>(PLAYLIST_ITEMS[0]);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const togglePreview = (track: PlaylistItem) => {
    if (activeTrack.id === track.id) {
      setIsPlayingPreview(!isPlayingPreview);
    } else {
      setActiveTrack(track);
      setIsPlayingPreview(true);
    }
  };

  return (
    <section id="playlist" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(198,156,78,0.12)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 mb-4 shadow-sm">
            <Music className="w-3.5 h-3.5 text-[#c69c4e]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#162842] font-bold">
              Trilha Sonora Exclusiva
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wide text-[#162842] mb-4">
            A Playlist dos Noivos
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-[#162842]/90 max-w-xl mx-auto font-medium">
            Músicas que embalaram a história de amor de Dionísio & Benedita e os grandes hinos que transformarão a noite no evento do ano.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Featured Vinyl Player Display */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[380px] rounded-3xl bg-white/95 backdrop-blur-md p-6 border border-[#c69c4e]/40 shadow-2xl text-center flex flex-col items-center">
              
              {/* Rotating Vinyl Record Simulation */}
              <div className="relative my-4 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: isPlayingPreview ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-[#162842] via-[#243b5e] to-[#162842] border-4 border-[#c69c4e]/50 shadow-[0_15px_40px_rgba(22,40,66,0.3)] p-2 relative flex items-center justify-center"
                >
                  {/* Vinyl Grooves */}
                  <div className="absolute inset-4 rounded-full border border-white/10" />
                  <div className="absolute inset-8 rounded-full border border-white/10" />
                  <div className="absolute inset-12 rounded-full border border-white/10" />
                  
                  {/* Center Label with Couple Monogram */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c69c4e] to-[#997316] border-2 border-white/40 p-1 flex items-center justify-center shadow-inner">
                    <span className="font-cinzel text-xs font-extrabold text-[#162842] tracking-wider">
                      D & B 2026
                    </span>
                  </div>
                </motion.div>

                {/* Tonearm Accent */}
                <div className="absolute -top-2 right-4 w-6 h-16 border-r-2 border-t-2 border-[#c69c4e] pointer-events-none" />
              </div>

              {/* Active Track Title */}
              <div className="space-y-1 mt-4">
                <span className="text-[11px] font-montserrat uppercase tracking-widest text-[#c69c4e] font-bold">
                  {activeTrack.vibe}
                </span>
                <h3 className="font-cinzel text-lg font-bold text-[#162842]">
                  {activeTrack.title}
                </h3>
                <p className="font-montserrat text-xs text-[#162842]/80 font-medium">
                  {activeTrack.artist}
                </p>
              </div>

              {/* Simulated Visualizer Bars */}
              <div className="flex items-center justify-center gap-1.5 h-8 my-4">
                {[40, 75, 50, 90, 60, 100, 70, 85, 45, 95, 65, 80].map((height, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isPlayingPreview ? [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`] : '15%'
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8 + (i % 4) * 0.2,
                      ease: "easeInOut"
                    }}
                    className="w-1.5 rounded-full bg-[#c69c4e]"
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 mt-2">
                <button
                  id="playlist-toggle-preview-btn"
                  onClick={() => togglePreview(activeTrack)}
                  className="w-12 h-12 rounded-full gold-button flex items-center justify-center shadow-lg cursor-pointer"
                >
                  {isPlayingPreview ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  )}
                </button>
              </div>

              {/* Spotify Link CTA */}
              <a
                href={WEDDING_DETAILS.spotifyPlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-montserrat font-bold text-white flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Disc3 className="w-4 h-4" />
                <span>Ouvir Playlist no Spotify</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Track Listing */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-cinzel text-xl font-bold text-[#162842] mb-4 flex items-center gap-2">
              <Radio className="w-5 h-5 text-[#c69c4e]" />
              <span>Seleção Nupcial • Capítulos Musicais</span>
            </h3>

            {PLAYLIST_ITEMS.map((track, idx) => {
              const isSelected = activeTrack.id === track.id;

              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  onClick={() => togglePreview(track)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-white border-[#c69c4e] shadow-lg'
                      : 'bg-white/80 border-[#c69c4e]/30 hover:bg-white hover:border-[#c69c4e]/60 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#dfe6ec] border border-[#c69c4e]/40 flex items-center justify-center font-cinzel text-xs font-bold text-[#162842] shrink-0">
                      0{idx + 1}
                    </div>

                    <div>
                      <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#162842]">
                        {track.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-montserrat text-xs text-[#162842]/80 font-medium">
                          {track.artist}
                        </span>
                        <span className="text-[#c69c4e]">•</span>
                        <span className="font-montserrat text-[11px] text-[#c69c4e] font-bold">
                          {track.vibe}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-montserrat text-xs text-[#162842]/70 font-semibold hidden sm:inline">
                      {track.duration}
                    </span>
                    <button
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isSelected && isPlayingPreview
                          ? 'bg-[#c69c4e] text-white'
                          : 'bg-[#dfe6ec] text-[#162842] hover:bg-[#c69c4e] hover:text-white'
                      }`}
                    >
                      {isSelected && isPlayingPreview ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
