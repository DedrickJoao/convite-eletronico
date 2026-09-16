import { useState } from 'react';
import { motion } from 'motion/react';
import { Music, Play, Pause, Disc3, ExternalLink, Sparkles, Volume2, Radio } from 'lucide-react';
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-4">
            <Music className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#f5d77f] font-semibold">
              Trilha Sonora Exclusiva
            </span>
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide gold-gradient-text mb-4">
            A Playlist Real dos Noivos
          </h2>
          
          <p className="font-montserrat text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light">
            Músicas que embalaram a história de amor de Benedita & Dionísio e os grandes hinos que transformarão a noite no evento do ano.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Featured Vinyl Player Display */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[380px] rounded-3xl crystal-card p-6 border border-[#d4af37]/30 gold-border-glow text-center flex flex-col items-center">
              
              {/* Rotating Vinyl Record Simulation */}
              <div className="relative my-4 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: isPlayingPreview ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-[#111] via-[#222] to-[#111] border-4 border-[#333] shadow-[0_15px_40px_rgba(0,0,0,0.9)] p-2 relative flex items-center justify-center"
                >
                  {/* Vinyl Grooves */}
                  <div className="absolute inset-4 rounded-full border border-white/5" />
                  <div className="absolute inset-8 rounded-full border border-white/5" />
                  <div className="absolute inset-12 rounded-full border border-white/5" />
                  
                  {/* Center Label with Couple Monogram */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37] to-[#946d05] border-2 border-white/20 p-1 flex items-center justify-center shadow-inner">
                    <span className="font-cinzel text-sm font-black text-[#0b0c10] tracking-wider">
                      BD 2026
                    </span>
                  </div>
                </motion.div>

                {/* Tonearm Accent */}
                <div className="absolute -top-2 right-4 w-6 h-16 border-r-2 border-t-2 border-[#d4af37]/60 pointer-events-none" />
              </div>

              {/* Active Track Title */}
              <div className="space-y-1 mt-4">
                <span className="text-[10px] font-montserrat uppercase tracking-widest text-[#d4af37] font-semibold">
                  {activeTrack.vibe}
                </span>
                <h3 className="font-cinzel text-lg font-bold text-white">
                  {activeTrack.title}
                </h3>
                <p className="font-montserrat text-xs text-gray-400">
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
                    className="w-1 rounded-full bg-gradient-to-t from-[#d4af37] to-[#fcedc5]"
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
                    <Pause className="w-5 h-5 fill-black" />
                  ) : (
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  )}
                </button>
              </div>

              {/* Spotify Link CTA */}
              <a
                href={WEDDING_DETAILS.spotifyPlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-2.5 px-4 rounded-xl crystal-card border border-[#1DB954]/50 hover:bg-[#1DB954]/20 text-xs font-montserrat font-semibold text-emerald-400 flex items-center justify-center gap-2 transition-all"
              >
                <Disc3 className="w-4 h-4" />
                <span>Ouvir Playlist Completa no Spotify</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Track Listing */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-cinzel text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Radio className="w-5 h-5 text-[#d4af37]" />
              <span>Seleção Real • Capítulos Musicais</span>
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
                      ? 'crystal-card border-[#d4af37] bg-[#d4af37]/10 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                      : 'crystal-card border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0b0c10] border border-white/10 flex items-center justify-center font-cinzel text-xs font-bold text-[#d4af37] shrink-0">
                      0{idx + 1}
                    </div>

                    <div>
                      <h4 className="font-cinzel text-sm sm:text-base font-bold text-white">
                        {track.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-montserrat text-xs text-gray-400">
                          {track.artist}
                        </span>
                        <span className="text-gray-600">•</span>
                        <span className="font-montserrat text-[10px] text-[#f5d77f] font-medium">
                          {track.vibe}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-montserrat text-xs text-gray-400 hidden sm:inline">
                      {track.duration}
                    </span>
                    <button
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isSelected && isPlayingPreview
                          ? 'bg-[#d4af37] text-black'
                          : 'bg-white/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      {isSelected && isPlayingPreview ? (
                        <Pause className="w-3.5 h-3.5 fill-black" />
                      ) : (
                        <Play className="w-3.5 h-3.5 ml-0.5" />
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
