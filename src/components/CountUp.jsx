import { useEffect, useRef, useState } from 'react';

export default function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduce) {
      setCount(target);
      return;
    }

    let done = false;
    let animFrame = null;

    const run = () => {
      let t0 = null;
      const step = (t) => {
        if (!t0) t0 = t;
        const p = Math.min(1, (t - t0) / 1400);
        const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setCount(target * e);
        if (p < 1) {
          animFrame = requestAnimationFrame(step);
        } else {
          setCount(target);
          if (ref.current) {
            ref.current.classList.add('pop', 'flash');
            setTimeout(() => {
              if (ref.current) ref.current.classList.remove('pop', 'flash');
            }, 300);
          }
        }
      };
      animFrame = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          done = true;
          run();
        }
      },
      { threshold: 0.35 }
    );

    if (ref.current) io.observe(ref.current);

    return () => {
      io.disconnect();
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [target, reduce]);

  const dec = target % 1 !== 0 ? 1 : 0;

  return (
    <b ref={ref}>
      {count.toFixed(dec)}
      <small style={{ fontSize: '.5em' }}>{suffix}</small>
    </b>
  );
}
