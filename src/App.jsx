import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import About from './components/About';
import TikTok from './components/TikTok';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Rhythm from './components/Rhythm';
import WhyRMIT from './components/WhyRMIT';
import MarqueeDivider from './components/MarqueeDivider';
import Footer from './components/Footer';
import LightboxOverlay from './components/LightboxOverlay';

export default function App() {
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', cap: '' });

  const handleImageClick = (src, cap) => {
    setLightbox({ isOpen: true, src, cap });
  };

  const handleLightboxClose = () => {
    setLightbox({ isOpen: false, src: '', cap: '' });
  };

  /* Scroll-Reveal logic (fail-safe) */
  useEffect(() => {
    document.documentElement.classList.add('js');
    const reveals = document.querySelectorAll('.reveal, .arrow');
    const show = (el) => {
      el.classList.add('in');
      if (el.querySelectorAll) {
        el.querySelectorAll('.arrow').forEach((a) => a.classList.add('in'));
      }
    };

    try {
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (es, o) => {
            es.forEach((e) => {
              if (e.isIntersecting) {
                show(e.target);
                o.unobserve(e.target);
              }
            });
          },
          { rootMargin: '0px 0px -8% 0px' }
        );
        reveals.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) {
            show(el); // already in view -> show now
          } else {
            io.observe(el);
          }
        });
        return () => io.disconnect();
      } else {
        reveals.forEach(show);
      }
    } catch (err) {
      console.warn('IntersectionObserver fail-safe triggered:', err);
      reveals.forEach(show);
    }
  }, []);

  /* Stagger reveal timeout fallback */
  useEffect(() => {
    const revealAll = () => {
      setTimeout(() => {
        const reveals = document.querySelectorAll('.reveal, .arrow');
        reveals.forEach((el) => {
          el.classList.add('in');
          if (el.querySelectorAll) {
            el.querySelectorAll('.arrow').forEach((a) => a.classList.add('in'));
          }
        });
      }, 800);
    };

    if (document.readyState === 'complete') {
      revealAll();
    } else {
      window.addEventListener('load', revealAll);
      return () => window.removeEventListener('load', revealAll);
    }
  }, []);

  /* Lenis smooth scrolling setup */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let lenis = null;
    let animFrame = null;

    if (typeof window.Lenis !== 'undefined') {
      lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      });

      const raf = (time) => {
        lenis.raf(time);
        animFrame = requestAnimationFrame(raf);
      };
      animFrame = requestAnimationFrame(raf);

      lenis.on('scroll', () => {
        const y = window.scrollY;
        const shapes = document.querySelectorAll('[data-parallax]');
        shapes.forEach((s) => {
          const k = parseFloat(s.getAttribute('data-parallax')) || 0.12;
          s.style.transform = `translateY(${y * k}px)`;
        });
      });
    }

    return () => {
      if (lenis) lenis.destroy();
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, []);

  /* Parallax fallback for non-Lenis scroll */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof window.Lenis !== 'undefined') return;

    const handleScroll = () => {
      const y = window.scrollY;
      const shapes = document.querySelectorAll('[data-parallax]');
      shapes.forEach((s) => {
        const k = parseFloat(s.getAttribute('data-parallax')) || 0.12;
        s.style.transform = `translateY(${y * k}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Active nav links + scroll progress bar + scroll cue */
  useEffect(() => {
    const ids = ['about', 'tiktok', 'resume', 'projects', 'rhythm', 'why'];
    const links = document.querySelectorAll('.nav__links a');
    const progress = document.getElementById('scroll-progress');
    const cue = document.getElementById('scroll-cue');

    const handleScroll = () => {
      const st = window.scrollY;
      const mid = st + window.innerHeight * 0.35;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (progress && docHeight > 0) {
        progress.style.width = `${Math.min(100, Math.max(0, (st / docHeight) * 100))}%`;
      }

      if (cue && st > 50) {
        cue.style.opacity = '0';
        setTimeout(() => {
          cue.style.display = 'none';
        }, 400);
      }

      let act = 0;
      ids.forEach((id, i) => {
        const s = document.getElementById(id);
        if (s && s.offsetTop <= mid) act = i;
      });

      links.forEach((a, i) => {
        a.classList.toggle('active', i === act);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Frame hover-tilt logic */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !window.matchMedia('(hover: hover)').matches) return;

    const frames = document.querySelectorAll('.frame');
    const handlers = [];

    frames.forEach((f) => {
      const onMouseMove = (e) => {
        const r = f.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        f.style.transform = `perspective(700px) rotateX(${py * -6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
      };

      const onMouseLeave = () => {
        f.style.transform = '';
      };

      f.addEventListener('mousemove', onMouseMove);
      f.addEventListener('mouseleave', onMouseLeave);
      handlers.push({ f, onMouseMove, onMouseLeave });
    });

    return () => {
      handlers.forEach(({ f, onMouseMove, onMouseLeave }) => {
        f.removeEventListener('mousemove', onMouseMove);
        f.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  /* Magnetic hover on pills/nav elements */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !window.matchMedia('(hover: hover)').matches) return;

    const elements = document.querySelectorAll('.pill, .socials a, .nav__links a, .nav__logo');
    const handlers = [];

    elements.forEach((b) => {
      const onMouseMove = (e) => {
        const r = b.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        b.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
      };

      const onMouseLeave = () => {
        b.style.transform = '';
      };

      b.addEventListener('mousemove', onMouseMove);
      b.addEventListener('mouseleave', onMouseLeave);
      handlers.push({ b, onMouseMove, onMouseLeave });
    });

    return () => {
      handlers.forEach(({ b, onMouseMove, onMouseLeave }) => {
        b.removeEventListener('mousemove', onMouseMove);
        b.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="grain"></div>
      <div id="scroll-progress"></div>
      <div className="topline"></div>

      <Nav />
      <About onImageClick={handleImageClick} />
      <TikTok />
      <Resume onImageClick={handleImageClick} />
      <Projects onImageClick={handleImageClick} />
      <MarqueeDivider />
      <Rhythm />
      <WhyRMIT />
      <MarqueeDivider />
      <Footer />

      <LightboxOverlay
        isOpen={lightbox.isOpen}
        src={lightbox.src}
        cap={lightbox.cap}
        onClose={handleLightboxClose}
      />
    </>
  );
}
