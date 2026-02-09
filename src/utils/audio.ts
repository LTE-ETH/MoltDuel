// Web Audio API Synthesizer for MoltDuel

let audioCtx: AudioContext | null = null;

const getContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

const createOscillator = (type: OscillatorType, freq: number, duration: number, vol: number = 0.1) => {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration);
};

export const playSound = (type: 'click' | 'win' | 'lose' | 'start' | 'hover') => {
  const ctx = getContext();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  switch (type) {
    case 'click':
      createOscillator('square', 800, 0.1, 0.05);
      break;
    
    case 'hover':
      createOscillator('sine', 400, 0.05, 0.02);
      break;

    case 'start':
      // Power up sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
      break;

    case 'win':
      // Major arpeggio
      setTimeout(() => createOscillator('sine', 523.25, 0.2, 0.1), 0);   // C5
      setTimeout(() => createOscillator('sine', 659.25, 0.2, 0.1), 100); // E5
      setTimeout(() => createOscillator('sine', 783.99, 0.4, 0.1), 200); // G5
      setTimeout(() => createOscillator('square', 1046.50, 0.6, 0.05), 300); // C6
      break;

    case 'lose':
      // Descending dissonant
      const oscL = ctx.createOscillator();
      const gainL = ctx.createGain();
      oscL.type = 'sawtooth';
      oscL.frequency.setValueAtTime(300, ctx.currentTime);
      oscL.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.5);
      gainL.gain.setValueAtTime(0.1, ctx.currentTime);
      gainL.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      oscL.connect(gainL);
      gainL.connect(ctx.destination);
      oscL.start();
      oscL.stop(ctx.currentTime + 0.5);
      break;
  }
};
