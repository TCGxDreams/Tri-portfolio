import { useRef } from 'react';

const PADS = [
  { id: 1, label: 'kick', freq: 261.63, cls: 'p1' },
  { id: 2, label: 'snap', freq: 329.63, cls: 'p2' },
  { id: 3, label: 'bass', freq: 392.00, cls: 'p3' },
  { id: 4, label: 'hat', freq: 523.25, cls: 'p4' },
  { id: 5, label: 'vox', freq: 659.25, cls: 'p5' },
  { id: 6, label: 'fx', freq: 783.99, cls: 'p6' }
];

export default function Soundboard() {
  const ctxRef = useRef(null);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const playSound = (freq, e) => {
    const pad = e.currentTarget;
    pad.classList.add('hit');
    setTimeout(() => {
      pad.classList.remove('hit');
    }, 150);

    if (reduce) return;

    try {
      if (!ctxRef.current) {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = ctxRef.current;
      const o = ctx.createOscillator();
      const g = ctx.createGain();

      o.type = 'triangle';
      o.frequency.value = freq;

      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

      o.connect(g);
      g.connect(ctx.destination);

      o.start();
      o.stop(ctx.currentTime + 0.46);
    } catch (err) {
      console.warn("Web Audio API error:", err);
    }
  };

  return (
    <div className="board reveal">
      <div className="board__hd">
        tap a pad - the sounds behind my edits <span className="tag">(turn up your volume!)</span>
      </div>
      <div className="pads" id="pads">
        {PADS.map((p) => (
          <button
            key={p.id}
            className={`pad ${p.cls}`}
            onClick={(e) => playSound(p.freq, e)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
