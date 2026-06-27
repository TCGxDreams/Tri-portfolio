(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  /* active nav link */
  var ids = ['about', 'resume', 'projects', 'rhythm'];
  var links = document.querySelectorAll('.nav__links a');
  function onScroll() {
    var st = scrollY, mid = st + innerHeight * .35, act = 0;
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
      if (p < 1) requestAnimationFrame(step);
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
})();
