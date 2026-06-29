(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Lenis Smooth Scroll */
  if (!reduce && typeof Lenis !== 'undefined') {
    var lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      smoothTouch: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Parallax scroll listener for Lenis smooth-scroll
    lenis.on('scroll', function () {
      var y = scrollY;
      var shapes = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
      shapes.forEach(function (s) {
        var k = parseFloat(s.getAttribute('data-parallax')) || 0.12;
        s.style.transform = 'translateY(' + (y * k) + 'px)';
      });
    });
  }

  /* reveal + arrow draw-in */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        e.target.querySelectorAll && e.target.querySelectorAll('.arrow').forEach(function (a) {
          a.classList.add('in');
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) {
    io.observe(el);
  });
  document.querySelectorAll('.arrow').forEach(function (a) {
    io.observe(a);
  });

  /* active nav link + progress bar + scroll cue */
  var ids = ['about', 'tiktok', 'resume', 'projects', 'rhythm', 'why'];
  var links = document.querySelectorAll('.nav__links a');
  var progress = document.getElementById('scroll-progress');
  var cue = document.getElementById('scroll-cue');
  function onScroll() {
    var st = scrollY, mid = st + innerHeight * .35, act = 0;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (progress && docHeight > 0) {
      progress.style.width = Math.min(100, Math.max(0, (st / docHeight) * 100)) + '%';
    }
    if (cue && st > 50) {
      cue.style.opacity = '0';
      setTimeout(function() {
        cue.style.display = 'none';
      }, 400);
      cue = null; // only run once
    }
    ids.forEach(function (id, i) {
      var s = document.getElementById(id);
      if (s && s.offsetTop <= mid) act = i;
    });
    links.forEach(function (a, i) {
      a.classList.toggle('active', i === act);
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* count-up (per group) */
  document.querySelectorAll('[data-countgroup]').forEach(function (group) {
    var done = false;
    var o = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !done) {
          done = true;
          group.querySelectorAll('b[data-num]').forEach(run);
        }
      });
    }, { threshold: .35 });
    o.observe(group);
  });

  function run(b) {
    var target = parseFloat(b.getAttribute('data-num'));
    var dec = b.getAttribute('data-num').indexOf('.') > -1 ? 1 : 0;
    var suf = '<small style="font-size:.5em">' + (b.getAttribute('data-suf') || '') + '</small>';
    if (reduce) {
      b.innerHTML = target.toFixed(dec) + suf;
      return;
    }
    var t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / 1400);
      var e = 1 - Math.pow(1 - p, 3);
      b.innerHTML = (target * e).toFixed(dec) + suf;
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        b.classList.add('pop', 'flash');
        setTimeout(function () {
          b.classList.remove('pop', 'flash');
        }, 300);
      }
    }
    requestAnimationFrame(step);
  }

  /* intro video play placeholder */
  var play = document.querySelector('.video .play');
  if (play) play.addEventListener('click', function () {
    play.style.transform = 'translate(-50%,-50%) scale(.9)';
    setTimeout(function () {
      play.style.transform = '';
    }, 150);
  });

  /* soundboard */
  var ctx = null;
  document.querySelectorAll('.pad').forEach(function (pad) {
    pad.addEventListener('click', function () {
      pad.classList.add('hit');
      setTimeout(function () {
        pad.classList.remove('hit');
      }, 150);
      if (reduce) return;
      try {
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.value = parseFloat(pad.getAttribute('data-f'));
        g.gain.setValueAtTime(.0001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(.25, ctx.currentTime + .01);
        g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .45);
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + .46);
      } catch (e) { }
    });
  });

  /* hero staggered entrance */
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.querySelectorAll('.hello .reveal').forEach(function (el, i) {
        setTimeout(function () {
          el.classList.add('in');
        }, i * 150);
      });
    }, 100);
  });

  /* parallax on doodles fallback for non-Lenis scroll */
  if (!reduce && typeof Lenis === 'undefined') {
    var shapes = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    addEventListener('scroll', function () {
      var y = scrollY;
      shapes.forEach(function (s) {
        var k = parseFloat(s.getAttribute('data-parallax')) || 0.12;
        s.style.transform = 'translateY(' + (y * k) + 'px)';
      });
    }, { passive: true });
  }

  /* hover-tilt on frames */
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.frame').forEach(function (f) {
      f.addEventListener('mousemove', function (e) {
        var r = f.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        f.style.transform = 'perspective(700px) rotateX(' + (py * -6) + 'deg) rotateY(' + (px * 6) + 'deg) translateY(-4px)';
      });
      f.addEventListener('mouseleave', function () {
        f.style.transform = '';
      });
    });
  }

  /* magnetic hover on pills/links */
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.pill, .socials a, .nav__links a, .nav__logo').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2);
        var y = e.clientY - (r.top + r.height / 2);
        b.style.transform = 'translate(' + (x * 0.35) + 'px, ' + (y * 0.35) + 'px)';
      });
      b.addEventListener('mouseleave', function () {
        b.style.transform = '';
      });
    });
  }

  /* Modal Overlay (Image Lightbox & Story Cards) */
  var ov = document.getElementById('overlay');
  if (ov) {
    var ovImg = ov.querySelector('.ov-img');
    var ovCap = ov.querySelector('.ov-cap');
    var ovMedia = ov.querySelector('.ov-media');
    var lastFocusedEl = null;

    var openOverlay = function (mode) {
      lastFocusedEl = document.activeElement;
      ov.classList.remove('show-image', 'show-story');
      ov.classList.add('open', mode);
      var closeBtn = ov.querySelector('.ov-close');
      if (closeBtn) closeBtn.focus();
      document.body.style.overflow = 'hidden';
      if (typeof lenis !== 'undefined') {
        lenis.stop(); // Stop scroll inertia if Lenis is active
      }
    };

    var closeOverlay = function () {
      ov.classList.remove('open', 'show-image', 'show-story');
      if (ovImg) ovImg.removeAttribute('src'); // wipe the old image so it can't linger
      document.body.style.overflow = '';
      if (typeof lenis !== 'undefined') {
        lenis.start();
      }
      if (lastFocusedEl) {
        lastFocusedEl.focus();
      }
    };

    var closeBtn = ov.querySelector('.ov-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeOverlay);
    }
    ov.addEventListener('click', function (e) {
      if (e.target === ov || e.target.closest('.ov-close')) {
        closeOverlay();
      }
    });
    addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && ov.classList.contains('open')) {
        closeOverlay();
      }
    });

    // Image Lightbox - delegation to all .frame img tags
    document.addEventListener('click', function (e) {
      var img = e.target.closest('.frame img');
      if (!img || img.closest('.video') || img.closest('[data-href]')) return; // skip the intro video AND any media that links out (§5.4c)
      e.stopPropagation();
      var src = img.currentSrc || img.src;
      src = src.replace('sz=w1600', 'sz=w2000'); // bigger size for Drive thumbnails; harmless otherwise
      ovImg.src = src;
      var capSpan = img.closest('.ph') && img.closest('.ph').querySelector('span');
      ovCap.textContent = capSpan ? capSpan.textContent : '';
      openOverlay('show-image');
    });

    /* give every framed image that is NOT a link a zoom-in cursor */
    document.querySelectorAll('.frame img').forEach(function (i) {
      if (!i.closest('[data-href]')) i.style.cursor = 'zoom-in';
    });

    // External media links click handler
    document.querySelectorAll('.frame[data-href]').forEach(function (f) {
      f.style.cursor = 'pointer';
      f.addEventListener('click', function (e) {
        e.stopPropagation();
        window.open(f.dataset.href, '_blank', 'noopener');
      });
    });
  }
})();
