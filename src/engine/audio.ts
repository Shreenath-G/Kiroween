// Retro sound effects using Web Audio API

class AudioEngine {
  private context: AudioContext | null = null;
  private enabled = true;

  private getContext(): AudioContext {
    if (!this.context) {
      this.context = new AudioContext();
    }
    return this.context;
  }

  playMove(): void {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.value = 200;
    gain.gain.value = 0.1;
    
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    osc.stop(ctx.currentTime + 0.05);
  }

  playEnterRoom(): void {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.value = 400;
    gain.gain.value = 0.2;
    
    osc.start();
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.stop(ctx.currentTime + 0.15);
  }

  playSuccess(): void {
    if (!this.enabled) return;
    const ctx = this.getContext();
    
    [400, 500, 600, 800].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      gain.gain.value = 0.15;
      
      const startTime = ctx.currentTime + i * 0.1;
      osc.start(startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
      osc.stop(startTime + 0.1);
    });
  }

  playError(): void {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.value = 100;
    gain.gain.value = 0.3;
    
    osc.start();
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.stop(ctx.currentTime + 0.3);
  }

  playMonster(): void {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.value = 150;
    gain.gain.value = 0.2;
    
    osc.start();
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.stop(ctx.currentTime + 0.2);
  }

  playFlashlight(): void {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.value = 800;
    gain.gain.value = 0.1;
    
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    osc.stop(ctx.currentTime + 0.05);
  }

  playVictory(): void {
    if (!this.enabled) return;
    const ctx = this.getContext();
    
    const melody = [523, 587, 659, 698, 784, 880, 988, 1047];
    melody.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      gain.gain.value = 0.15;
      
      const startTime = ctx.currentTime + i * 0.15;
      osc.start(startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
      osc.stop(startTime + 0.15);
    });
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}

export const audioEngine = new AudioEngine();
