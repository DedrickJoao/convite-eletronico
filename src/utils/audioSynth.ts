// Web Audio API ambient harmonic sound generator for the royal wedding invitation
class WeddingAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.4;

  // Romantic harmony chord progression in D Major / A Major / B Minor / G Major (Canon inspired)
  private chords = [
    [293.66, 369.99, 440.0, 587.33], // D Major (D4, F#4, A4, D5)
    [220.0, 329.63, 440.0, 554.37],  // A Major (A3, E4, A4, C#5)
    [246.94, 293.66, 369.99, 493.88], // B Minor (B3, D4, F#4, B4)
    [196.0, 293.66, 392.0, 493.88],  // G Major (G3, D4, G4, B4)
    [220.0, 277.18, 329.63, 440.0],  // A Major 7 (A3, C#4, E4, A4)
    [174.61, 261.63, 349.23, 440.0], // F# Minor / F Major variant
    [196.0, 246.94, 293.66, 392.0],  // G Major add9
    [220.0, 329.63, 440.0, 659.25]   // A Major sus (A3, E4, A4, E5)
  ];

  private currentChordIndex = 0;
  private noteIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  private playHarpNote(freq: number, startTime: number, duration: number = 2.2) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Bell/Harp warm harmonic tone
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, startTime);
    filter.frequency.exponentialRampToValueAtTime(300, startTime + duration);

    // Attack, Decay, Sustain, Release envelope
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.22, startTime + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);

    // Subtle gentle chime harmonic overtone
    const overtone = this.ctx.createOscillator();
    const overtoneGain = this.ctx.createGain();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2, startTime);
    overtoneGain.gain.setValueAtTime(0.0001, startTime);
    overtoneGain.gain.exponentialRampToValueAtTime(0.06, startTime + 0.03);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

    overtone.connect(overtoneGain);
    overtoneGain.connect(this.masterGain);

    overtone.start(startTime);
    overtone.stop(startTime + 1.3);
  }

  private step() {
    if (!this.isPlaying || !this.ctx) return;

    const chord = this.chords[this.currentChordIndex];
    const freq = chord[this.noteIndex];
    const now = this.ctx.currentTime;

    this.playHarpNote(freq, now, 2.5);

    this.noteIndex++;
    if (this.noteIndex >= chord.length) {
      this.noteIndex = 0;
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
    }

    // Interval between gentle arpeggios
    this.timer = window.setTimeout(() => {
      this.step();
    }, 600);
  }

  public play() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;
    this.step();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
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
