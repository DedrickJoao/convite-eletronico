import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { Heart, Upload, Image as ImageIcon, CheckCircle2, RefreshCw } from 'lucide-react';

interface PhotoSlot {
  id: number;
  title: string;
  subtitle: string;
  defaultUrl: string;
}

const DEFAULT_SLOTS: PhotoSlot[] = [
  {
    id: 0,
    title: 'Dionísio & Benedita',
    subtitle: 'Momentos Especiais',
    defaultUrl: '/uploads/couple_photo_1.jpg',
  },
  {
    id: 1,
    title: 'Elegância & Cumplicidade',
    subtitle: 'Momentos Inesquecíveis',
    defaultUrl: '/uploads/couple_photo_2.jpg',
  },
  {
    id: 2,
    title: 'O Abraço Apaixonado',
    subtitle: 'Promessa de Amor Eterno',
    defaultUrl: '/uploads/couple_photo_3.jpg',
  },
];

export default function LoveStorySection() {
  const [photoUrls, setPhotoUrls] = useState<string[]>(['', '', '']);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const batchInputRef = useRef<HTMLInputElement | null>(null);

  // Load saved photos from localStorage or server defaults on mount
  useEffect(() => {
    const saved = localStorage.getItem('wedding_couple_photos_exact');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 3) {
          setPhotoUrls(parsed);
          return;
        }
      } catch {
        // fallback
      }
    }

    // Check if uploaded photos already exist in /uploads/
    const checkServerPhotos = async () => {
      const initial = ['', '', ''];
      for (let i = 0; i < 3; i++) {
        const testUrl = `/uploads/couple_photo_${i + 1}.jpg`;
        try {
          const res = await fetch(testUrl, { method: 'HEAD' });
          if (res.ok) {
            initial[i] = testUrl;
          }
        } catch {
          // not uploaded yet
        }
      }
      setPhotoUrls(initial);
    };

    checkServerPhotos();
  }, []);

  const handleFileSelect = async (file: File, index: number) => {
    if (!file) return;

    setUploadingIndex(index);
    const reader = new FileReader();

    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        setUploadingIndex(null);
        return;
      }

      // Update state & localStorage immediately so the user sees their photo right away
      setPhotoUrls((prev) => {
        const updated = [...prev];
        updated[index] = dataUrl;
        try {
          localStorage.setItem('wedding_couple_photos_exact', JSON.stringify(updated));
        } catch {
          // localStorage limit exceeded fallback
        }
        return updated;
      });

      // Also persist to server /uploads/
      try {
        const response = await fetch('/api/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slotIndex: index,
            dataUrl,
            filename: file.name,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.url) {
            // Keep local dataUrl or server url
            setSuccessMessage(`Foto ${index + 1} carregada com sucesso!`);
            setTimeout(() => setSuccessMessage(null), 3500);
          }
        }
      } catch {
        // Local render remains active
      } finally {
        setUploadingIndex(null);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleBatchSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const count = Math.min(files.length, 3);
    for (let i = 0; i < count; i++) {
      handleFileSelect(files[i], i);
    }
  };

  return (
    <section 
      id="historia" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#dee6ee] via-[#e5edf3] to-[#dfe7ee] border-b border-[#c69c4e]/30 shadow-inner"
    >
      {/* Background Subtle Crystal Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,156,78,0.15)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[radial-gradient(circle,rgba(22,40,66,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center px-6 py-1.5 rounded-full border border-[#c69c4e]/50 bg-white/80 mb-5 shadow-sm">
            <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#162842] font-bold">
              Nossa História de Amor
            </span>
          </div>

          <p className="font-cormorant text-xl sm:text-2xl text-[#162842] italic font-semibold">
            &ldquo;Em uma noite iluminada, dois olhares se cruzaram e o mundo pareceu parar. Naquele instante, nasceu uma cumplicidade que desafia o tempo.&rdquo;
          </p>
        </div>

        {/* Action Bar to Upload / Select WhatsApp Photos */}
        <div className="mb-10 max-w-xl mx-auto text-center">
          <input
            ref={batchInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleBatchSelect}
          />

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => batchInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#162842] text-white hover:bg-[#1f375a] border border-[#c69c4e]/70 shadow-md transition-all hover:scale-[1.02] text-xs sm:text-sm font-montserrat font-semibold tracking-wider cursor-pointer"
            >
              <Upload className="w-4 h-4 text-[#c69c4e]" />
              <span>Carregar as 3 Fotos Originais (WhatsApp)</span>
            </button>

            {photoUrls.some((url) => Boolean(url)) && (
              <button
                onClick={() => {
                  if (window.confirm('Deseja substituir as fotos carregadas?')) {
                    setPhotoUrls(['', '', '']);
                    localStorage.removeItem('wedding_couple_photos_exact');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/80 hover:bg-white text-gray-700 border border-gray-300 text-xs font-montserrat transition-all cursor-pointer"
                title="Limpar e selecionar novas fotos"
              >
                <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
                <span>Substituir Fotos</span>
              </button>
            )}
          </div>

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 inline-flex items-center gap-2 text-xs font-montserrat text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{successMessage}</span>
            </motion.div>
          )}

          <p className="mt-2 text-[11px] font-montserrat text-gray-500">
            As suas fotos são exibidas com 100% de fidelidade original, sem filtros e sem alterações nos trajes, cores ou rostos.
          </p>
        </div>

        {/* 3 Photos Grid - Preserving Original Aspect, Genuine Natural Colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {DEFAULT_SLOTS.map((slot, idx) => {
            const hasPhoto = Boolean(photoUrls[idx]);
            const isUploading = uploadingIndex === idx;

            return (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.7 }}
                className="group relative flex flex-col rounded-3xl overflow-hidden border-2 border-[#c69c4e]/50 hover:border-[#c69c4e] shadow-xl hover:shadow-2xl transition-all duration-300 bg-white"
              >
                {/* Hidden Single File Input for this slot */}
                <input
                  ref={(el) => {
                    fileInputRefs.current[idx] = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileSelect(e.target.files[0], idx);
                    }
                  }}
                />

                {/* Photo Display Area */}
                <div className="relative w-full h-[380px] sm:h-[430px] bg-slate-50 overflow-hidden flex items-center justify-center">
                  {hasPhoto ? (
                    <>
                      {/* Photo rendered without color-altering filters or artificial overlays */}
                      <img
                        src={photoUrls[idx]}
                        alt={slot.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                      />

                      {/* Discreto botão de trocar foto ao passar o mouse */}
                      <button
                        onClick={() => fileInputRefs.current[idx]?.click()}
                        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#162842]/85 hover:bg-[#162842] text-white text-[11px] font-montserrat px-3 py-1.5 rounded-full border border-[#c69c4e]/70 flex items-center gap-1.5 shadow-lg backdrop-blur-sm cursor-pointer"
                      >
                        <Upload className="w-3 h-3 text-[#c69c4e]" />
                        <span>Trocar foto</span>
                      </button>
                    </>
                  ) : (
                    /* Elegant placeholder welcoming photo upload */
                    <div
                      onClick={() => fileInputRefs.current[idx]?.click()}
                      className="cursor-pointer w-full h-full p-6 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#c69c4e]/40 hover:border-[#c69c4e] bg-amber-50/20 hover:bg-amber-50/50 transition-colors"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-amber-100/60 border border-[#c69c4e]/50 flex items-center justify-center mb-4 text-[#162842] shadow-sm">
                        {isUploading ? (
                          <RefreshCw className="w-7 h-7 animate-spin text-[#c69c4e]" />
                        ) : (
                          <ImageIcon className="w-7 h-7 text-[#c69c4e]" />
                        )}
                      </div>

                      <span className="font-cinzel text-base font-bold text-[#162842] mb-1">
                        Foto {idx + 1}
                      </span>
                      <span className="font-montserrat text-xs text-gray-600 mb-4">
                        {slot.title}
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#162842] text-[#c69c4e] text-xs font-montserrat font-semibold shadow hover:bg-[#1f375a] transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Clique para carregar foto original</span>
                      </span>
                    </div>
                  )}

                  {/* Corner Accent Decor */}
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#162842]/80 backdrop-blur-md text-[10px] font-montserrat tracking-widest text-[#c69c4e] uppercase font-bold border border-[#c69c4e]/40 shadow">
                      {idx + 1} • D & B
                    </span>
                  </div>
                </div>

                {/* Bottom Card Info */}
                <div className="p-4 bg-white border-t border-[#c69c4e]/20 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#162842]">
                      <Heart className="w-3.5 h-3.5 text-[#c69c4e] fill-[#c69c4e]" />
                      <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#162842]">
                        {slot.title}
                      </h4>
                    </div>
                    <p className="font-montserrat text-[11px] text-gray-500 font-light mt-0.5">
                      {slot.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => fileInputRefs.current[idx]?.click()}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-gray-600 hover:text-[#162842] border border-gray-200 transition-colors cursor-pointer"
                    title="Carregar ou alterar esta foto"
                  >
                    <Upload className="w-4 h-4 text-[#c69c4e]" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Narrative Footer Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 text-[#c69c4e]">
            <div className="w-12 h-px bg-[#c69c4e]/60" />
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] font-semibold text-[#162842]">
              Dois Corações • Uma Só Promessa
            </span>
            <div className="w-12 h-px bg-[#c69c4e]/60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
