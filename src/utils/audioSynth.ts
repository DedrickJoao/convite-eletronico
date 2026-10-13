// Web Audio API & Media Player for "From This Moment On" by Shania Twain
// Royal wedding soundtrack implementation for Dionísio & Benedita

type AudioListener = (isPlaying: boolean, isMuted: boolean) => void;

class WeddingAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMutedState: boolean = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.45;
  private listeners: Set<AudioListener> = new Set();
  private audioElement: HTMLAudioElement | null = null;

  // "From This Moment On" by Shania Twain - Chord progression and melodic structure
  // Key of G Major / C / D / Em with romantic acoustic guitar, piano & warm strings
  private chords = [
    // Verse 1 ("From this moment, life has begun...")
    { root: 'G', notes: [196.00, 293.66, 392.00, 493.88], melody: [293.66, 392.00, 440.00, 493.88] }, // D4, G4, A4, B4 ("From this moment...")
    { root: 'D/F#', notes: [185.00, 293.66, 440.00, 587.33], melody: [493.88, 440.00, 392.00, 440.00] }, // B4, A4, G4, A4 ("...life has begun")
    { root: 'Em7', notes: [164.81, 293.66, 329.63, 392.00], melody: [293.66, 392.00, 440.00, 493.88] }, // D4, G4, A4, B4 ("From this moment...")
    { root: 'C', notes: [130.81, 261.63, 329.63, 523.25], melody: [493.88, 523.25, 493.88, 440.00] }, // B4, C5, B4, A4 ("...you are the one")
    
    // Verse continuation ("Right beside you is where I belong...")
    { root: 'G/B', notes: [246.94, 293.66, 392.00, 493.88], melody: [293.66, 392.00, 440.00, 493.88] }, // D4, G4, A4, B4 ("Right beside you...")
    { root: 'Am7', notes: [220.00, 261.63, 329.63, 440.00], melody: [493.88, 440.00, 392.00, 329.63] }, // B4, A4, G4, E4 ("...is where I belong")
    { root: 'Dsus4', notes: [146.83, 293.66, 392.00, 440.00], melody: [392.00, 440.00, 493.88, 440.00] }, // G4, A4, B4, A4 ("From this moment...")
    { root: 'D', notes: [146.83, 293.66, 369.99, 440.00], melody: [392.00, 392.00, 369.99, 392.00] }, // G4 ("...on")

    // Chorus ("I give my hand to you with all my heart...")
    { root: 'G', notes: [196.00, 293.66, 392.00, 587.33], melody: [587.33, 523.25, 493.88, 440.00] }, // D5, C5, B4, A4
    { root: 'Em7', notes: [164.81, 293.66, 392.00, 493.88], melody: [392.00, 440.00, 493.88, 587.33] },
    { root: 'C', notes: [130.81, 261.63, 329.63, 392.00], melody: [493.88, 440.00, 392.00, 329.63] },
    { root: 'D', notes: [146.83, 293.66, 369.99, 440.00], melody: [329.63, 369.99, 392.00, 440.00] },
    
    // Climax ("From this moment as long as I live, I will love you, I promise you this...")
    { root: 'Bm7', notes: [246.94, 293.66, 369.99, 493.88], melody: [493.88, 587.33, 493.88, 440.00] },
    { root: 'Em', notes: [164.81, 246.94, 329.63, 392.00], melody: [392.00, 493.88, 440.00, 392.00] },
    { root: 'Am7', notes: [220.00, 261.63, 329.63, 440.00], melody: [392.00, 440.00, 493.88, 523.25] },
    { root: 'D7', notes: [146.83, 293.66, 369.99, 523.25], melody: [493.88, 440.00, 392.00, 392.00] }
  ];

  private currentChordIndex = 0;
  private noteIndex = 0;

  constructor() {
    this.setupAudioElement();
  }

  private setupAudioElement() {
    try {
      this.audioElement = new Audio();
      // Official recording: "From This Moment On" - Shania Twain & Bryan White
      this.audioElement.src = '/from-this-moment-shania-twain-bryan-white.mp3';
      this.audioElement.loop = true;
      this.audioElement.volume = this.volume;
      this.audioElement.preload = 'auto';
    } catch {
      this.audioElement = null;
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      const currentGain = this.isMutedState ? 0 : this.volume;
      this.masterGain.gain.setValueAtTime(currentGain, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying, this.isMutedState);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.isPlaying, this.isMutedState));
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMutedState) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.isMutedState ? 0 : this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMutedState = !this.isMutedState;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMutedState ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
    if (this.audioElement) {
      this.audioElement.muted = this.isMutedState;
    }
    this.notify();
    return this.isMutedState;
  }

  public setMuted(muted: boolean) {
    if (this.isMutedState === muted) return;
    this.isMutedState = muted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMutedState ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
    if (this.audioElement) {
      this.audioElement.muted = this.isMutedState;
    }
    this.notify();
  }

  public isMuted(): boolean {
    return this.isMutedState;
  }

  // Play romantic acoustic harp and piano notes for "From This Moment On"
  private playHarpNote(freq: number, startTime: number, duration: number = 2.4, isLead: boolean = false) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm triangle/sine blend for romantic classical tone
    osc.type = isLead ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Filter creates warm concert hall reverb acoustics
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isLead ? 2400 : 1500, startTime);
    filter.frequency.exponentialRampToValueAtTime(320, startTime + duration);

    // Envelope with soft romantic attack
    const peakGain = isLead ? 0.28 : 0.18;
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);

    // Subtle gentle chime overtone (bell/celesta resonance)
    const overtone = this.ctx.createOscillator();
    const overtoneGain = this.ctx.createGain();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2, startTime);
    overtoneGain.gain.setValueAtTime(0.0001, startTime);
    overtoneGain.gain.exponentialRampToValueAtTime(0.05, startTime + 0.03);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

    overtone.connect(overtoneGain);
    overtoneGain.connect(this.masterGain);

    overtone.start(startTime);
    overtone.stop(startTime + 1.3);
  }

  private step() {
    if (!this.isPlaying || !this.ctx) return;

    const chordObj = this.chords[this.currentChordIndex];
    const harmFreq = chordObj.notes[this.noteIndex % chordObj.notes.length];
    const melodyFreq = chordObj.melody[this.noteIndex % chordObj.melody.length];
    const now = this.ctx.currentTime;

    // Play harmony accompaniment
    this.playHarpNote(harmFreq, now, 2.6, false);
    // Play "From This Moment On" melody line
    this.playHarpNote(melodyFreq, now + 0.08, 1.9, true);

    this.noteIndex++;
    if (this.noteIndex >= 4) {
      this.noteIndex = 0;
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
    }

    // Tempo: ~72 BPM romantic ballad tempo (~520ms per 8th-note pulse)
    this.timer = window.setTimeout(() => {
      this.step();
    }, 540);
  }

  public playChimeBurst() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    // Elegant ascending harp glissando in G Major
    const notes = [392.00, 493.88, 587.33, 783.99, 987.77, 1174.66]; // G4, B4, D5, G5, B5, D6
    notes.forEach((freq, index) => {
      this.playHarpNote(freq, now + index * 0.07, 1.8, true);
    });
  }

  public play() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;
    this.notify();

    // Primary audio playback: Real track of "From This Moment On" by Shania Twain & Bryan White
    if (this.audioElement) {
      this.audioElement.play().then(() => {
        // Successfully playing real mp3 recording
      }).catch(() => {
        // Autoplay policy or media issue - fallback to soft synth
        this.step();
      });
    } else {
      this.step();
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.notify();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioSynthesizer();
