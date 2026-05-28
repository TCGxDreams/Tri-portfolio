// PRELOADER
(function () {
    const num = document.getElementById('preNum');
    const pre = document.getElementById('preloader');
    const canvas = document.getElementById('preloaderInkCanvas');
    const pressRoller = document.getElementById('pressRoller');
    const nameEl = document.querySelector('.preloader .pre-name');

    if (!pre || !num) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !canvas || !pressRoller || !nameEl) {
        let n = 0;
        const tick = setInterval(() => {
            n += Math.floor(Math.random() * 8) + 4;
            if (n >= 100) {
                n = 100;
                num.textContent = "100";
                clearInterval(tick);
                pre.classList.add('done');
                document.querySelectorAll('.hero .reveal').forEach((el, i) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                        if (el.classList.contains('hero-display') || el.classList.contains('row')) {
                            splitTextIntoChars(el);
                        }
                    }, 200 + i * 120);
                });
            } else {
                num.textContent = String(n).padStart(3, '0');
            }
        }, 50);
        return;
    }

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const nameText = "MINH TRI · VO NGUYEN";
    nameEl.innerHTML = '<span class="typewriter-cursor">|</span>';

    let lastCharsCount = 0;
    let plopPlayed = false;
    let rollerPlayed = false;

    const loaderState = { progress: 0 };

    gsap.to(loaderState, {
        progress: 100,
        duration: 3.5,
        ease: "none",
        onUpdate: () => {
            const prog = loaderState.progress;

            // Odometer update
            num.textContent = String(Math.floor(prog)).padStart(3, '0');

            // Act I: Typesetting (0% -> 40% progress)
            if (prog <= 40) {
                const charsToShow = Math.floor((prog / 40) * nameText.length);
                if (charsToShow !== lastCharsCount) {
                    nameEl.innerHTML = nameText.slice(0, charsToShow) + '<span class="typewriter-cursor">|</span>';
                    lastCharsCount = charsToShow;
                }
                ctx.clearRect(0, 0, width, height);
            }

            // Act II: Ink Drop Bloom (40% -> 75% progress)
            else if (prog > 40 && prog <= 75) {
                // Ensure name is fully typed
                if (lastCharsCount < nameText.length) {
                    nameEl.innerHTML = nameText + '<span class="typewriter-cursor">|</span>';
                    lastCharsCount = nameText.length;
                }

                ctx.clearRect(0, 0, width, height);

                const cx = width / 2;
                const cy = height / 2;

                // Falling Drop: 40% -> 53%
                if (prog <= 53) {
                    const dropRatio = (prog - 40) / 13; // 0 to 1
                    const dy = cy * dropRatio;

                    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--blood').trim() || '#d63838';
                    ctx.beginPath();
                    ctx.arc(cx, dy, 6, 0, Math.PI * 2);
                    ctx.fill();
                }
                // Blooming: 53% -> 75%
                else {
                    if (!plopPlayed) {
                        plopPlayed = true;
                    }

                    const bloomRatio = (prog - 53) / 22; // 0 to 1
                    const easedRatio = Math.pow(bloomRatio, 0.4);
                    const maxRadius = Math.max(width, height) * 0.45;
                    const radius = maxRadius * easedRatio;

                    ctx.save();
                    const vertices = 40;
                    const time = Date.now() * 0.003;

                    const grad = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius);
                    grad.addColorStop(0, 'rgba(214, 56, 56, 0.9)');
                    grad.addColorStop(0.4, 'rgba(214, 56, 56, 0.65)');
                    grad.addColorStop(0.7, 'rgba(22, 19, 15, 0.45)');
                    grad.addColorStop(1, 'rgba(22, 19, 15, 0)');

                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    for (let i = 0; i <= vertices; i++) {
                        const angle = (i / vertices) * Math.PI * 2;
                        const noise = Math.sin(angle * 7 + time * 2) * 0.08 + Math.cos(angle * 13 - time) * 0.04;
                        const r = radius * (1 + noise);
                        const vx = cx + Math.cos(angle) * r;
                        const vy = cy + Math.sin(angle) * r;
                        if (i === 0) ctx.moveTo(vx, vy);
                        else ctx.lineTo(vx, vy);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
            }

            // Act III: Press Roller Wipe (75% -> 100% progress)
            else if (prog > 75) {
                ctx.clearRect(0, 0, width, height);

                if (!rollerPlayed) {
                    rollerPlayed = true;
                }

                const rollerRatio = (prog - 75) / 25; // 0 to 1
                const rollerHeight = rollerRatio * 100;
                pressRoller.style.height = rollerHeight + '%';
            }
        },
        onComplete: () => {
            num.textContent = "100";
            gsap.to(pre, {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => {
                    pre.style.display = 'none';
                    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
                        setTimeout(() => {
                            el.classList.add('visible');
                            if (el.classList.contains('hero-display') || el.classList.contains('row')) {
                                splitTextIntoChars(el);
                            }
                        }, 200 + i * 120);
                    });

                    // Reveal aside and foot columns on load
                    const heroAside = document.querySelector('.hero-aside');
                    const heroFoot = document.querySelector('.hero-foot');
                    if (heroAside) {
                        gsap.fromTo(heroAside, 
                            { opacity: 0, x: 40 },
                            { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out', delay: 0.4 }
                        );
                    }
                    if (heroFoot) {
                        gsap.fromTo(heroFoot, 
                            { opacity: 0, y: 30 },
                            { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.6 }
                        );
                    }
                }
            });
        }
    });
})();

// LIVE CLOCK (HCMC, UTC+7)
(function () {
    const el = document.getElementById('navTime');
    function update() {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const hcmc = new Date(utc + 7 * 3600000);
        const hh = String(hcmc.getHours()).padStart(2, '0');
        const mm = String(hcmc.getMinutes()).padStart(2, '0');
        const ss = String(hcmc.getSeconds()).padStart(2, '0');
        if (el) el.textContent = `HCMC · ${hh}:${mm}:${ss}`;
    }
    update();
    setInterval(update, 1000);
})();


// GENERATIVE PAPER BACKGROUND CANVAS
(function () {
    const canvas = document.getElementById('paperCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const fibers = [];
    const fiberCount = 45;

    for (let i = 0; i < fiberCount; i++) {
        fibers.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: 80 + Math.random() * 140,
            angle: Math.random() * Math.PI * 2,
            speed: 0.15 + Math.random() * 0.35,
            amplitude: 12 + Math.random() * 24,
            offset: Math.random() * 100,
            width: 0.25 + Math.random() * 0.75
        });
    }

    let mouse = { x: -1000, y: -1000 };
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    let lastScrollY = window.scrollY;

    function draw() {
        ctx.clearRect(0, 0, width, height);

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        ctx.strokeStyle = isDark ? 'rgba(237, 228, 211, 0.055)' : 'rgba(22, 19, 15, 0.055)';

        const currentScrollY = window.scrollY;
        const scrollDiff = (currentScrollY - lastScrollY);
        lastScrollY += (currentScrollY - lastScrollY) * 0.08;

        fibers.forEach(f => {
            f.offset += 0.003 * f.speed;
            f.y -= 0.08 * f.speed + scrollDiff * 0.03 * f.speed;

            if (f.y < -f.length) {
                f.y = height + f.length;
                f.x = Math.random() * width;
            } else if (f.y > height + f.length) {
                f.y = -f.length;
                f.x = Math.random() * width;
            }

            let dx = mouse.x - f.x;
            let dy = mouse.y - f.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let warpX = 0;
            let warpY = 0;

            if (dist < 180) {
                const force = (180 - dist) / 180;
                warpX = -dx * force * 0.35;
                warpY = -dy * force * 0.35;
            }

            ctx.lineWidth = f.width;
            ctx.beginPath();

            const points = [];
            const segments = 6;
            for (let j = 0; j <= segments; j++) {
                const t = j / segments;
                const segY = f.y + (t - 0.5) * f.length + warpY;
                const wave = Math.sin(t * Math.PI + f.offset * 8) * f.amplitude;
                const segX = f.x + Math.cos(f.angle) * (t - 0.5) * f.length + wave + warpX;

                if (j === 0) {
                    ctx.moveTo(segX, segY);
                } else {
                    points.push({ x: segX, y: segY });
                }
            }

            for (let j = 0; j < points.length - 1; j++) {
                const xc = (points[j].x + points[j + 1].x) / 2;
                const yc = (points[j].y + points[j + 1].y) / 2;
                ctx.quadraticCurveTo(points[j].x, points[j].y, xc, yc);
            }
            ctx.stroke();
        });

        requestAnimationFrame(draw);
    }
    draw();
})();

// CLICK-TO-STAMP EDITORIAL SEALS
(function () {
    const STAMP_SVGS = [
        // Seal 0: Circle APPROVED
        `<svg viewBox="0 0 100 100" class="stamp-svg">
            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="2 1 3 1"/>
            <circle cx="50" cy="50" r="37" fill="none" stroke="currentColor" stroke-width="1.2"/>
            <text x="50" y="32" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle" font-weight="bold">SAIGON VOL. I</text>
            <text x="50" y="55" font-family="'Fraunces', serif" font-size="14" font-weight="900" font-style="italic" text-anchor="middle">PASSED</text>
            <text x="50" y="72" font-family="'JetBrains Mono', monospace" font-size="6" text-anchor="middle">EST. MMXXIII</text>
         </svg>`,
        // Seal 1: Rectangle COPY EDIT
        `<svg viewBox="0 0 120 70" class="stamp-svg">
            <rect x="5" y="5" width="110" height="60" fill="none" stroke="currentColor" stroke-width="2" rx="2"/>
            <line x1="5" y1="23" x2="115" y2="23" stroke="currentColor" stroke-width="1"/>
            <line x1="5" y1="46" x2="115" y2="46" stroke="currentColor" stroke-width="1"/>
            <text x="60" y="17" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle" font-weight="bold">THE TRI GAZETTE</text>
            <text x="60" y="38" font-family="'JetBrains Mono', monospace" font-size="9" text-anchor="middle" font-weight="bold">COPY EDIT</text>
            <text x="60" y="58" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">27 MAY 2026</text>
         </svg>`,
        // Seal 2: RMIT Shield
        `<svg viewBox="0 0 100 100" class="stamp-svg">
            <polygon points="50,5 92,28 92,78 50,95 8,78 8,28" fill="none" stroke="currentColor" stroke-width="2"/>
            <polygon points="50,11 86,31 86,75 50,89 14,75 14,31" fill="none" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3"/>
            <text x="50" y="38" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">RMIT COHORT</text>
            <text x="50" y="56" font-family="'Fraunces', serif" font-size="14" font-weight="bold" text-anchor="middle">COMM</text>
            <text x="50" y="74" font-family="'JetBrains Mono', monospace" font-size="8" text-anchor="middle">CLASS OF '30</text>
         </svg>`,
        // Seal 3: rectangular banner DRAFT
        `<svg viewBox="0 0 130 50" class="stamp-svg">
            <rect x="4" y="4" width="122" height="42" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="10 2 2 2"/>
            <text x="65" y="34" font-family="'Fraunces', serif" font-weight="900" font-size="24" font-style="italic" text-anchor="middle" letter-spacing="2">DRAFT</text>
         </svg>`,
        // Seal 4: Star insignia
        `<svg viewBox="0 0 100 100" class="stamp-svg">
            <path d="M50,4 L65,33 L97,38 L73,61 L79,93 L50,78 L21,93 L27,61 L3,38 L35,33 Z" fill="none" stroke="currentColor" stroke-width="2"/>
            <circle cx="50" cy="50" r="11" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2"/>
            <text x="50" y="53" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" text-anchor="middle">✦</text>
         </svg>`
    ];

    const maxStamps = 4;
    const activeStamps = [];

    document.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.project') || e.target.closest('.thought-btn')) return;

        const scrollY = window.pageYOffset;
        const x = e.pageX;
        const y = e.pageY;

        const stamp = document.createElement('div');
        stamp.className = 'editorial-stamp';
        stamp.style.left = `${x}px`;
        stamp.style.top = `${y}px`;

        const stampIndex = Math.floor(Math.random() * STAMP_SVGS.length);
        const rotation = (Math.random() * 40) - 20;
        stamp.style.setProperty('--stamp-rot', `${rotation}deg`);

        stamp.innerHTML = STAMP_SVGS[stampIndex];
        document.body.appendChild(stamp);

        void stamp.offsetWidth;

        stamp.classList.add('active');

        activeStamps.push(stamp);

        // Auto-clear stamp after 6 seconds
        setTimeout(() => {
            stamp.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            stamp.style.opacity = '0';
            stamp.style.transform = `translate(-50%, -50%) scale(0.7) rotate(${rotation}deg)`;
            setTimeout(() => {
                stamp.remove();
                const idx = activeStamps.indexOf(stamp);
                if (idx > -1) activeStamps.splice(idx, 1);
            }, 600);
        }, 6000);

        if (activeStamps.length > maxStamps) {
            const old = activeStamps.shift();
            old.style.opacity = 0;
            old.style.transform = `translate(-50%, -50%) scale(0.8) rotate(${rotation}deg)`;
            setTimeout(() => old.remove(), 300);
        }
    });
})();

// STICKY MAGAZINE IMAGE CANVAS DISTORTION ENGINE (WORKS)
let activeImg = null;
let nextImg = null;
let transitionProgress = 1.0;
let waveOffset = 0;
let mouseOnFrame = false;
let frameMouseX = 0;
let frameMouseY = 0;
let rippleForce = 0;
let canvasCtx = null;
let projectCanvas = null;

(function () {
    projectCanvas = document.getElementById('projectCanvas');
    if (!projectCanvas) return;
    canvasCtx = projectCanvas.getContext('2d');

    const rect = projectCanvas.parentNode.getBoundingClientRect();
    projectCanvas.width = rect.width;
    projectCanvas.height = rect.height;

    window.addEventListener('resize', () => {
        if (!projectCanvas) return;
        const r = projectCanvas.parentNode.getBoundingClientRect();
        projectCanvas.width = r.width;
        projectCanvas.height = r.height;
        renderFrame();
    });

    projectCanvas.addEventListener('mousemove', (e) => {
        mouseOnFrame = true;
        const r = projectCanvas.getBoundingClientRect();
        frameMouseX = e.clientX - r.left;
        frameMouseY = e.clientY - r.top;
        rippleForce = Math.min(rippleForce + 0.08, 0.9);
    });

    projectCanvas.addEventListener('mouseleave', () => {
        mouseOnFrame = false;
    });

    const firstProject = document.querySelector('.project');
    if (firstProject) {
        loadProjectImage(firstProject.dataset.img);
    }

    animateCanvas();
})();

function loadProjectImage(url) {
    if (!projectCanvas) return;
    const img = new Image();
    img.src = url;
    img.onload = () => {
        if (!activeImg) {
            activeImg = img;
            renderFrame();
        } else {
            nextImg = img;
            transitionProgress = 0.0;
        }
    };
}

function renderFrame() {
    if (!canvasCtx || !activeImg) return;

    const w = projectCanvas.width;
    const h = projectCanvas.height;

    canvasCtx.clearRect(0, 0, w, h);

    waveOffset += 0.06;
    if (transitionProgress < 1.0) {
        transitionProgress += 0.035;
        if (transitionProgress >= 1.0) {
            transitionProgress = 1.0;
            activeImg = nextImg;
            nextImg = null;
        }
    }

    const slices = 50;
    const sliceHeight = h / slices;

    for (let i = 0; i < slices; i++) {
        const sy = (i / slices) * activeImg.height;
        const sh = activeImg.height / slices;
        const dy = i * sliceHeight;

        let offsetScale = 0;
        if (transitionProgress < 1.0) {
            offsetScale = Math.sin(transitionProgress * Math.PI) * 24;
        }

        if (mouseOnFrame) {
            const sliceYCenter = dy + sliceHeight / 2;
            const dist = Math.abs(sliceYCenter - frameMouseY);
            if (dist < 120) {
                const force = (120 - dist) / 120;
                offsetScale += force * rippleForce * 18;
            }
        }

        rippleForce *= 0.96;

        let scrollMultiplier = 1.0;
        if (typeof lenis !== 'undefined' && lenis) {
            const vel = Math.abs(lenis.velocity);
            if (vel > 0.4) {
                scrollMultiplier = 1.0 + vel * 0.3;
            }
        }

        const wave = Math.sin(i * 0.18 + waveOffset) * offsetScale * scrollMultiplier;

        const imgRatio = activeImg.width / activeImg.height;
        const canvasRatio = w / h;
        let sw, sx;

        if (imgRatio > canvasRatio) {
            sw = activeImg.height * canvasRatio;
            sx = (activeImg.width - sw) / 2;
        } else {
            sw = activeImg.width;
            sx = 0;
        }

        if (nextImg && transitionProgress < 1.0) {
            canvasCtx.globalAlpha = 1.0 - transitionProgress;
            canvasCtx.drawImage(
                activeImg,
                sx, sy, sw, sh,
                wave, dy, w, sliceHeight + 0.5
            );

            canvasCtx.globalAlpha = transitionProgress;
            const nextImgRatio = nextImg.width / nextImg.height;
            let nsw, nsx;
            if (nextImgRatio > canvasRatio) {
                nsw = nextImg.height * canvasRatio;
                nsx = (nextImg.width - nsw) / 2;
            } else {
                nsw = nextImg.width;
                nsx = 0;
            }
            const nsy = (i / slices) * nextImg.height;
            const nsh = nextImg.height / slices;

            canvasCtx.drawImage(
                nextImg,
                nsx, nsy, nsw, nsh,
                -wave, dy, w, sliceHeight + 0.5
            );
            canvasCtx.globalAlpha = 1.0;
        } else {
            canvasCtx.drawImage(
                activeImg,
                sx, sy, sw, sh,
                wave, dy, w, sliceHeight + 0.5
            );
        }
    }
}

function animateCanvas() {
    renderFrame();
    requestAnimationFrame(animateCanvas);
}

// WORKS LIST INTERSECTION TRACKER
(function () {
    const projects = document.querySelectorAll('.project');
    const frameNum = document.querySelector('.frame-num');
    const frameTitle = document.querySelector('.frame-title-out');
    const frameYear = document.querySelector('.frame-year-out');

    if (!projects.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-25% 0px -25% 0px',
        threshold: 0.5
    };

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projects.forEach(p => p.classList.remove('active'));

                const project = entry.target;
                project.classList.add('active');

                const idx = project.dataset.idx;
                const title = project.dataset.title;
                const year = project.dataset.year;
                const img = project.dataset.img;

                if (frameNum) frameNum.textContent = String(parseInt(idx) + 1).padStart(3, '0');
                if (frameTitle) frameTitle.textContent = title;
                if (frameYear) frameYear.textContent = year;

                loadProjectImage(img);
            }
        });
    }, observerOptions);

    projects.forEach(p => {
        projectObserver.observe(p);
    });
})();

// GENERAL CURSOR & GENERAL LINK HOVER PREVIEW
(function () {
    const cur = document.getElementById('cursor');
    const txt = document.getElementById('cursorText');
    const previewContainer = document.getElementById('floatingPreviews');
    const previewImg = document.getElementById('previewImg');
    const isMobile = window.innerWidth <= 900;

    let mx = 0, my = 0, cx = 0, cy = 0;
    let targetX = 0, targetY = 0;
    let velocityX = 0, velocityY = 0;
    let prevMouseX = 0, prevMouseY = 0;
    let skew = 0;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        if (!isMobile && txt) {
            txt.style.left = mx + 'px';
            txt.style.top = (my + 40) + 'px';
        }
    });

    function animate() {
        if (!isMobile && cur) {
            cx += (mx - cx) * 0.18;
            cy += (my - cy) * 0.18;
            cur.style.left = cx + 'px';
            cur.style.top = cy + 'px';
        }

        if (!isMobile && previewContainer && previewContainer.classList.contains('show')) {
            velocityX = mx - prevMouseX;
            velocityY = my - prevMouseY;

            prevMouseX = mx;
            prevMouseY = my;

            targetX += (mx - targetX) * 0.12;
            targetY += (my - targetY) * 0.12;

            previewContainer.style.left = `${targetX}px`;
            previewContainer.style.top = `${targetY}px`;

            const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
            const skewAngle = Math.min(speed / 80, 1) * 10;
            const direction = velocityX > 0 ? 1 : -1;

            skew += (skewAngle * direction - skew) * 0.15;

            const imgWrapper = previewContainer.querySelector('.floating-preview-wrapper');
            if (imgWrapper) {
                imgWrapper.style.transform = `rotate(${skew}deg) skewX(${skew * 0.6}deg)`;
            }
        } else {
            prevMouseX = mx;
            prevMouseY = my;
        }

        requestAnimationFrame(animate);
    }
    animate();

    document.querySelectorAll('a, button, .nav-menu a, .nav-btn, .thought-btn').forEach(el => {
        if (el.closest('.project')) return;

        el.addEventListener('mouseenter', () => {
            if (!isMobile && cur) cur.classList.add('lg');
        });
        el.addEventListener('mouseleave', () => {
            if (!isMobile && cur) cur.classList.remove('lg');
        });
    });
})();

// REVEAL TEXT RECURSIVE DOM SPLITTER
function splitTextIntoChars(el) {
    if (el.classList.contains('split-done') || el.classList.contains('intro-meta') || el.classList.contains('work-head-l') || el.closest('.sidebar-widgets')) return;

    let charIndex = 0;

    function recurse(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue;
            if (!text.trim()) return;

            const fragment = document.createDocumentFragment();
            const words = text.split(/(\s+)/);

            words.forEach(word => {
                if (/\s+/.test(word)) {
                    fragment.appendChild(document.createTextNode(word));
                } else {
                    const wordSpan = document.createElement('span');
                    wordSpan.style.whiteSpace = 'nowrap';
                    wordSpan.style.display = 'inline-block';
                    wordSpan.className = 'reveal-word-span';

                    for (let i = 0; i < word.length; i++) {
                        const container = document.createElement('span');
                        container.className = 'reveal-char-container';

                        const charSpan = document.createElement('span');
                        charSpan.className = 'reveal-char';
                        charSpan.textContent = word[i];
                        charSpan.style.transitionDelay = `${(charIndex * 0.015)}s`;

                        container.appendChild(charSpan);
                        wordSpan.appendChild(container);
                        charIndex++;
                    }
                    fragment.appendChild(wordSpan);
                }
            });
            node.parentNode.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE' || node.classList.contains('star') || node.classList.contains('super')) return;
            if (node.classList.contains('reveal-line')) {
                node.classList.add('split-inside');
            }
            const children = Array.from(node.childNodes);
            children.forEach(recurse);
        }
    }

    recurse(el);
    el.classList.add('split-done');
}

// LIQUID THEME SWITCHER
(function () {
    const themeToggle = document.getElementById('themeToggle');
    const themeOverlay = document.getElementById('themeOverlay');
    if (!themeToggle || !themeOverlay) return;

    let currentTheme = 'light';

    if (localStorage.getItem('portfolio-theme')) {
        currentTheme = localStorage.getItem('portfolio-theme');
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.classList.add('active');
        }
    }

    themeToggle.addEventListener('click', (e) => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        const rect = themeToggle.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        themeOverlay.style.setProperty('--click-x', `${x}px`);
        themeOverlay.style.setProperty('--click-y', `${y}px`);
        themeOverlay.setAttribute('data-theme', newTheme);
        themeOverlay.classList.remove('animating');

        void themeOverlay.offsetWidth;

        themeOverlay.classList.add('animating');

        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            currentTheme = newTheme;
            localStorage.setItem('portfolio-theme', newTheme);

            if (newTheme === 'dark') {
                themeToggle.classList.add('active');
            } else {
                themeToggle.classList.remove('active');
            }
            themeOverlay.classList.remove('animating');
        }, 1200);
    });
})();


// DOSSIER INTERACTIVE WIDGETS
(function () {
    const tzHCMC = document.getElementById('tzHCMC');
    const tzUser = document.getElementById('tzUser');
    const tzDiff = document.getElementById('tzDiff');

    if (tzHCMC && tzUser && tzDiff) {
        function updateTzSync() {
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const hcmcTime = new Date(utc + 7 * 3600000);

            const fmt = { hour: '2-digit', minute: '2-digit', hour12: false };
            const hcmcStr = new Intl.DateTimeFormat('en-US', fmt).format(hcmcTime);
            const userStr = new Intl.DateTimeFormat('en-US', fmt).format(now);

            tzHCMC.textContent = hcmcStr;
            tzUser.textContent = userStr;

            const offsetMin = -now.getTimezoneOffset() - 420;
            const offsetHr = Math.round(offsetMin / 60);

            if (offsetHr === 0) {
                tzDiff.textContent = "You are in the same timezone as Saigon.";
            } else if (offsetHr > 0) {
                tzDiff.textContent = `You are ${offsetHr} hr${Math.abs(offsetHr) > 1 ? 's' : ''} ahead of Saigon.`;
            } else {
                tzDiff.textContent = `You are ${Math.abs(offsetHr)} hr${Math.abs(offsetHr) > 1 ? 's' : ''} behind Saigon.`;
            }
        }
        updateTzSync();
        setInterval(updateTzSync, 60000);
    }

    const THOUGHTS = [
        "\"A communicator who refuses to be quiet.\"",
        "\"Good design is clear thinking made visible.\"",
        "\"Risograph prints never dry perfectly; that is where the soul is.\"",
        "\"Saigonese coffee is best drunk on a low plastic stool.\"",
        "\"The story is already there. The job is to cut what obscures it.\"",
        "\"Volume I — Saigon Edition. No reprints.\"",
        "\"A layout is a grid, but storytelling is fluid.\"",
        "\"We tell ourselves stories in order to live.\""
    ];

    const thoughtBox = document.getElementById('thoughtBox');
    const thoughtBtn = document.getElementById('thoughtBtn');

    if (thoughtBox && thoughtBtn) {
        thoughtBtn.addEventListener('click', () => {
            const idx = Math.floor(Math.random() * THOUGHTS.length);
            thoughtBox.style.opacity = 0;
            setTimeout(() => {
                thoughtBox.textContent = THOUGHTS[idx];
                thoughtBox.style.opacity = 1;
            }, 200);
        });
    }
})();

// REVEAL ON SCROLL IntersectionObserver (only for non-GSAP elements)
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            if (e.target.classList.contains('reveal') && !e.target.classList.contains('hero')) {
                splitTextIntoChars(e.target);
            }
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach(el => {
    // Avoid double animating GSAP targets
    const gsapTargets = ['.hero-display .row', '.intro-mark', '.intro-body', '.work-head-title', '.work-head-meta', '.philosophy-text', '.philosophy-attr', '.contact-headline'];
    const isGsapTarget = gsapTargets.some(sel => el.matches(sel) || el.closest(sel));

    if (!el.closest('.hero') && !isGsapTarget) {
        io.observe(el);
    }
});

// SMOOTH SCROLL (Lenis) & GSAP SCROLL CHOREOGRAPHY (PHASE 1)
var lenis;
(function () {
    if (window.innerWidth <= 900) return;

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1.0,
        smoothTouch: false,
        touchMultiplier: 1.5
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Anchor link smooth scroll intercept
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl && typeof lenis !== 'undefined' && lenis) {
                lenis.scrollTo(targetEl, {
                    offset: 0,
                    duration: 1.4,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });

    // Choreograph Scroll animations (respect prefers-reduced-motion)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Reduced motion fallback: instantly reveal all GSAP targets
        document.querySelectorAll('.hero-display .row, .intro-mark, .intro-body, .work-head-title, .work-head-meta, .philosophy-text, .philosophy-attr, .contact-headline').forEach(el => {
            el.classList.add('visible');
        });
        const glyphs = document.querySelectorAll('.step-glyph');
        glyphs.forEach(g => g.style.color = 'var(--blood)');
        return;
    }

    // Remove static reveal transition classes from GSAP targets to avoid conflicts
    document.querySelectorAll('.intro-mark, .intro-body, .work-head-title, .work-head-meta, .philosophy-text, .philosophy-attr, .philosophy-quote-mark, .contact-headline').forEach(el => {
        el.classList.remove('reveal');
        el.style.opacity = 1;
        el.style.transform = 'none';
    });



    // 1. Hero Chapter (Soft Pin) — 2 viewport pin, gives time for aside + foot to land
    ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1
    });

    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: '+=200%',
            scrub: 1
        }
    });

    const rows = document.querySelectorAll('.hero-display .row');
    const star = document.querySelector('.hero-display .star');
    const heroAside = document.querySelector('.hero-aside');
    const heroFoot = document.querySelector('.hero-foot');

    // Act 1: hold hero rows, rotate star
    if (star) {
        heroTl.to(star, { scale: 1.4, rotation: 60, ease: 'none', duration: 0.5 }, 0.1);
    }

    // Act 2 (0.7 → 1.0): hold the composition, then gentle exit
    // Rows + everything fade together in the last 15% only
    heroTl.to([rows, star, heroAside, heroFoot].filter(Boolean), {
        opacity: 0,
        y: -30,
        duration: 0.15,
        ease: 'power2.in'
    }, 0.85);

    // 2. Ticker velocity acceleration
    const tickerTrack = document.querySelector('.ticker-track');
    if (tickerTrack) {
        const tickerLoop = gsap.to(tickerTrack, {
            xPercent: -50,
            ease: 'none',
            duration: 35,
            repeat: -1
        });

        lenis.on('scroll', (e) => {
            const speed = Math.abs(e.velocity);
            const targetTimeScale = 1 + speed * 0.15;
            gsap.to(tickerLoop, { timeScale: targetTimeScale, duration: 0.35, overwrite: 'auto' });
            gsap.to(tickerTrack, { skewX: 0, duration: 0.3, overwrite: 'auto' });
        });
    }

    // 3. Intro / "Read" Chapter (Full Pin) — 2.5 viewports, 3 paragraphs breathe
    const introParagraphs = document.querySelectorAll('.intro-body p');
    const introMark = document.querySelector('.intro-mark');
    const introBody = document.querySelector('.intro-body');

    if (introBody && introParagraphs.length > 0) {
        // Wrap each word for stagger reveal
        introParagraphs.forEach(p => {
            const textContent = p.textContent.trim();
            const words = textContent.split(/\s+/);
            p.innerHTML = words.map(w => `<span class="reveal-word">${w}</span>`).join(' ');
        });

        // Explicit initial states
        const allWords = introBody.querySelectorAll('.reveal-word');
        gsap.set(allWords, { opacity: 0.15, y: 12, display: 'inline-block' });
        if (introMark) gsap.set(introMark, { scale: 1, transformOrigin: 'left top' });

        ScrollTrigger.create({
            trigger: '.intro',
            start: 'top top',
            end: '+=250%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1
        });

        const introTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.intro',
                start: 'top top',
                end: '+=250%',
                scrub: 1
            }
        });

        // Pilcrow grows subtly across the whole pin
        if (introMark) {
            introTl.to(introMark, { scale: 1.4, ease: 'none' }, 0);
        }

        // Each paragraph reveals in its own scroll slice, no dimming of previous
        // Slice 1: 0.05 → 0.35
        // Slice 2: 0.40 → 0.65  
        // Slice 3: 0.70 → 0.95
        const slicePoints = [
            { start: 0.05, end: 0.35 },
            { start: 0.40, end: 0.65 },
            { start: 0.70, end: 0.95 }
        ];

        introParagraphs.forEach((p, idx) => {
            const words = p.querySelectorAll('.reveal-word');
            const slice = slicePoints[idx] || slicePoints[slicePoints.length - 1];

            introTl.to(words, {
                opacity: 1,
                y: 0,
                stagger: (slice.end - slice.start) / words.length,
                ease: 'power1.out'
            }, slice.start);
        });
    }

    // 4. Works Header Entrance Animation
    const workHeadTitle = document.querySelector('.work-head-title');
    const workHeadMeta = document.querySelector('.work-head-meta');
    if (workHeadTitle) {
        gsap.set(workHeadTitle, { opacity: 0, y: 50 });
        if (workHeadMeta) gsap.set(workHeadMeta, { opacity: 0, y: 20 });

        const workHeadTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.work-head',
                start: 'top 85%',
                end: 'top 40%',
                scrub: 1
            }
        });

        workHeadTl.to(workHeadTitle, { opacity: 1, y: 0, ease: 'power2.out' });
        if (workHeadMeta) {
            workHeadTl.to(workHeadMeta, { opacity: 1, y: 0, ease: 'power2.out' }, 0);
        }
    }

    // 5. Works extra hold for last project card removed (handled natively by CSS sticky)

    // 6. Process Slideshow (Full Pin) — 4 steps × 1 viewport each = 4 viewports total
    const stepsContainer = document.querySelector('.steps-stage');
    const stepsList = gsap.utils.toArray('.step');
    const stepCounter = document.querySelector('.step-counter .sc-current');
    const stepProgressBar = document.getElementById('stepProgressBar');

    if (stepsContainer && stepsList.length === 4) {
        // Initial state: only first step visible
        gsap.set(stepsList, { opacity: 0, y: 20 });
        gsap.set(stepsList[0], { opacity: 1, y: 0 });
        stepsList[0].classList.add('active');

        let currentActiveIdx = 0;

        ScrollTrigger.create({
            trigger: stepsContainer,
            start: 'top top',
            end: '+=400%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            onUpdate: (self) => {
                const progress = self.progress;

                // Update progress bar
                if (stepProgressBar) {
                    stepProgressBar.style.width = (progress * 100) + '%';
                }

                // Determine active step
                const activeIdx = Math.min(
                    Math.floor(progress * stepsList.length),
                    stepsList.length - 1
                );

                // Only transition when active step changes
                if (activeIdx !== currentActiveIdx) {
                    const oldStep = stepsList[currentActiveIdx];
                    const newStep = stepsList[activeIdx];

                    // Fade out old
                    gsap.to(oldStep, {
                        opacity: 0,
                        y: -20,
                        duration: 0.5,
                        ease: 'power2.in',
                        overwrite: 'auto',
                        onComplete: () => oldStep.classList.remove('active')
                    });

                    // Fade in new
                    gsap.fromTo(newStep,
                        { opacity: 0, y: 20 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: 'power2.out',
                            overwrite: 'auto',
                            onStart: () => newStep.classList.add('active')
                        }
                    );

                    // Update counter
                    if (stepCounter) {
                        stepCounter.textContent = String(activeIdx + 1).padStart(2, '0');
                    }

                    currentActiveIdx = activeIdx;
                }
            }
        });
    }

    // 7. Philosophy (Meditative Pin) — 2 viewports, slow clause reveal
    const quoteMark = document.querySelector('.philosophy-quote-mark');
    const clauses = document.querySelectorAll('.philosophy-text .clause');
    const philosophyAttr = document.querySelector('.philosophy-attr');

    if (clauses.length > 0) {
        // Explicit initial states — clauses hidden, quote mark hidden
        gsap.set(clauses, { opacity: 0, y: 24 });
        if (quoteMark) gsap.set(quoteMark, { opacity: 0, scale: 0.7 });
        if (philosophyAttr) gsap.set(philosophyAttr, { opacity: 0, y: 16 });

        ScrollTrigger.create({
            trigger: '.philosophy',
            start: 'top top',
            end: '+=200%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1
        });

        const philosophyTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.philosophy',
                start: 'top top',
                end: '+=200%',
                scrub: 1.5
            }
        });

        // Phase A (0 → 0.15): quote mark fades in
        if (quoteMark) {
            philosophyTl.to(quoteMark, { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.15 }, 0);
        }

        // Phase B (0.2 → 0.85): clauses reveal one at a time with generous spacing
        const clauseSliceSize = 0.65 / clauses.length;
        clauses.forEach((clause, idx) => {
            const sliceStart = 0.2 + (idx * clauseSliceSize);
            philosophyTl.to(clause, {
                opacity: 1,
                y: 0,
                duration: clauseSliceSize * 0.7,
                ease: 'power2.out'
            }, sliceStart);
        });

        // Phase C (0.88 → 1.0): attribution fades in last
        if (philosophyAttr) {
            philosophyTl.to(philosophyAttr, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.1 }, 0.88);
        }
    }

    // 8. Contact (Pin & Closing) — 1.2 viewports, lines + cta + footer
    const contactLines = document.querySelectorAll('.contact-headline .reveal-line');
    const contactCta = document.querySelector('.contact-cta');
    const contactFooter = document.querySelector('.contact footer');

    if (contactLines.length > 0) {
        // Explicit initial states
        gsap.set(contactLines, { clipPath: 'inset(100% 0% 0% 0%)', y: 40, opacity: 1 });
        if (contactCta) gsap.set(contactCta, { opacity: 0, y: 30 });
        if (contactFooter) gsap.set(contactFooter, { opacity: 0, y: 20 });

        ScrollTrigger.create({
            trigger: '.contact',
            start: 'top top',
            end: '+=120%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1
        });

        const contactTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.contact',
                start: 'top top',
                end: '+=120%',
                scrub: 0.8
            }
        });

        // Lines reveal stagger across 0 → 0.6
        contactLines.forEach((line, idx) => {
            contactTl.to(line, {
                clipPath: 'inset(0% 0% 0% 0%)',
                y: 0,
                duration: 0.18,
                ease: 'expo.out'
            }, idx * 0.13);
        });

        // CTA reveals 0.65 → 0.8
        if (contactCta) {
            contactTl.to(contactCta, { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' }, 0.7);
        }

        // Footer reveals 0.85 → 0.95
        if (contactFooter) {
            contactTl.to(contactFooter, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.88);
        }
    }
})();
// Refresh ScrollTrigger after Lenis init and after any image loads
window.addEventListener('load', () => {
    setTimeout(() => ScrollTrigger.refresh(), 200);
});

// ===== PHASE 2: FEATURE 3 — WEBGL PHILOSOPHY INK-WASH =====
(function () {
    const canvas = document.getElementById('philosophyWebGL');
    const section = document.querySelector('.philosophy');
    if (!canvas || !section) return;

    // Check capabilities / prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 8) || window.innerWidth < 900;

    function setupFallback() {
        canvas.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'philosophy-webgl-fallback';
        section.appendChild(fallback);
    }

    if (prefersReducedMotion || isLowEnd || typeof THREE === 'undefined') {
        setupFallback();
        return;
    }

    // Setup Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    let currentScale = 2; // Render at half resolution initially

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance'
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Shaders
    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform float uMouseSpeed;
        uniform float uScrollVel;
        uniform vec3 uColorPaper;
        uniform vec3 uColorInk;
        uniform vec3 uColorAccent;
        varying vec2 vUv;

        // Simple noise function
        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        // 2D Value Noise
        float noise(in vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            
            float a = hash(i + vec2(0.0, 0.0));
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            
            return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
        }

        // Fractional Brownian Motion (fBm) with 4 octaves
        float fbm(in vec2 p) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100.0);
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
            for (int i = 0; i < 4; ++i) {
                v += a * noise(p);
                p = rot * p * 2.0 + shift;
                a *= 0.5;
            }
            return v;
        }

        void main() {
            vec2 uv = vUv;
            
            // Mouse distortion force (push ink away)
            vec2 toMouse = uv - uMouse;
            toMouse.x *= uResolution.x / uResolution.y;
            float distToMouse = length(toMouse);
            
            // Gaussian displacement falloff
            float mouseForce = exp(-distToMouse * distToMouse * 35.0) * uMouseSpeed * 0.12;
            vec2 mouseOffset = normalize(toMouse + 0.0001) * mouseForce;
            
            // Scroll shear
            vec2 scrollOffset = vec2(0.0, uv.y * uScrollVel * 0.06);
            
            // Base coords for noise
            vec2 p = uv * 2.8 + mouseOffset + scrollOffset;
            
            // Domain warp level 1
            vec2 q = vec2(
                fbm(p + vec2(uTime * 0.03, uTime * 0.015)),
                fbm(p + vec2(-uTime * 0.02, uTime * 0.04))
            );
            
            // Domain warp level 2
            vec2 r = vec2(
                fbm(p + 2.5 * q + vec2(1.7, 9.2) + uTime * 0.008),
                fbm(p + 2.5 * q + vec2(8.3, 2.8) + uTime * 0.012)
            );
            
            // Final composite noise
            float f = fbm(p + 2.2 * r);
            
            // Mix paper base and ink
            float density = smoothstep(0.15, 0.85, f);
            
            // Blending accents at high mouse force or density peaks
            float accentBlend = smoothstep(0.1, 0.9, mouseForce * 2.8 + density * 0.25);
            
            vec3 color = mix(uColorPaper, uColorInk, density * 0.28);
            color = mix(color, uColorAccent, accentBlend * 0.12);
            
            // Draw vignette
            float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
            vignette = clamp(pow(vignette * 16.0, 0.4), 0.0, 1.0);
            color = mix(uColorInk * 0.08 + uColorPaper * 0.92, color, vignette);
            
            gl_FragColor = vec4(color, 1.0);
        }
    `;

    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2() },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uMouseSpeed: { value: 0 },
            uScrollVel: { value: 0 },
            uColorPaper: { value: new THREE.Color() },
            uColorInk: { value: new THREE.Color() },
            uColorAccent: { value: new THREE.Color() }
        },
        depthWrite: false,
        depthTest: false
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function resize() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w / currentScale, h / currentScale, false);
        material.uniforms.uResolution.value.set(w / currentScale, h / currentScale);
    }

    window.addEventListener('resize', resize);

    // Mouse tracking within section
    let mouse = { x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5, speed: 0 };
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left) / rect.width;
        mouse.y = 1.0 - (e.clientY - rect.top) / rect.height; // Y-up
    });

    let isVisible = false;
    let lastTime = 0;
    let frameTimes = [];

    function tick(timestamp) {
        if (!isVisible) return;

        requestAnimationFrame(tick);

        const now = timestamp || performance.now();
        const dt = now - lastTime;
        lastTime = now;

        // Track frame time to downscale if low performance
        if (dt > 0 && dt < 200) {
            frameTimes.push(dt);
            if (frameTimes.length > 40) frameTimes.shift();
            const slowFrames = frameTimes.filter(t => t > 33).length; // >33ms means <30fps
            if (slowFrames > 15 && currentScale === 2) {
                currentScale = 4;
                resize();
                frameTimes = [];
            }
        }

        material.uniforms.uTime.value = now * 0.001;

        // Mouse velocity
        const dx = mouse.x - mouse.prevX;
        const dy = mouse.y - mouse.prevY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        mouse.speed = mouse.speed * 0.94 + dist * 0.06;
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        mouse.speed *= 0.98; // decay

        material.uniforms.uMouse.value.set(mouse.x, mouse.y);
        material.uniforms.uMouseSpeed.value = mouse.speed * 10.0;

        // Scroll velocity
        let scrollVel = 0;
        if (typeof lenis !== 'undefined' && lenis) {
            scrollVel = lenis.velocity;
        }
        material.uniforms.uScrollVel.value = material.uniforms.uScrollVel.value * 0.9 + scrollVel * 0.1;

        // Dynamic theme color lookup
        const style = getComputedStyle(document.documentElement);
        const paperHex = style.getPropertyValue('--paper').trim() || '#ede4d3';
        const inkHex = style.getPropertyValue('--ink').trim() || '#16130f';
        const bloodHex = style.getPropertyValue('--blood').trim() || '#d63838';

        material.uniforms.uColorPaper.value.set(paperHex);
        material.uniforms.uColorInk.value.set(inkHex);
        material.uniforms.uColorAccent.value.set(bloodHex);

        renderer.render(scene, camera);
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            isVisible = e.isIntersecting;
            if (isVisible) {
                lastTime = performance.now();
                frameTimes = [];
                resize();
                requestAnimationFrame(tick);
            }
        });
    }, { threshold: 0.05 });

    observer.observe(section);
})();

// ===== PHASE 2: FEATURE 5 — MAGNETIC CONTACT LINKS & INK SPLASH =====
(function () {
    if (window.innerWidth <= 900) return; // Disable on mobile/tablet

    const links = document.querySelectorAll('.contact-channels a, .contact-mail a');
    const cursor = document.getElementById('cursor');
    const cursorText = document.getElementById('cursorText');

    if (!links.length) return;

    const items = Array.from(links).map(el => {
        return {
            el,
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            rect: el.getBoundingClientRect(),
            isMail: el.closest('.contact-mail') !== null
        };
    });

    function updateRects() {
        items.forEach(item => {
            item.rect = item.el.getBoundingClientRect();
        });
    }
    window.addEventListener('resize', updateRects);
    window.addEventListener('scroll', updateRects);

    let mx = 0, my = 0;
    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
    });

    function update() {
        items.forEach(item => {
            const el = item.el;
            const rect = item.rect;

            // Calculate center
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            // Distance
            const dx = mx - cx;
            const dy = my - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const radius = item.isMail ? 120 : 80;

            if (dist < radius) {
                const strength = 1.0 - (dist / radius);
                const pull = strength * 0.42;
                item.targetX = dx * pull;
                item.targetY = dy * pull;
            } else {
                item.targetX = 0;
                item.targetY = 0;
            }

            // Spring damping interpolation
            item.x += (item.targetX - item.x) * 0.14;
            item.y += (item.targetY - item.y) * 0.14;

            el.style.transform = `translate(${item.x}px, ${item.y}px)`;
        });

        requestAnimationFrame(update);
    }
    update();

    // Ink Splash on hover
    links.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const count = 10;
            const container = document.body;

            if (link.closest('.contact-mail')) {
                if (cursorText) {
                    cursorText.textContent = "Write";
                    cursorText.classList.add('show');
                }
                if (cursor) cursor.classList.add('lg');
            }

            for (let i = 0; i < count; i++) {
                const drop = document.createElement('span');
                drop.className = 'ink-drop';

                const dropSize = 3 + Math.random() * 4;
                drop.style.setProperty('--drop-size', `${dropSize}px`);
                drop.style.left = `${e.clientX - dropSize / 2}px`;
                drop.style.top = `${e.clientY - dropSize / 2}px`;

                const angle = Math.random() * Math.PI * 2;
                const distance = 15 + Math.random() * 40;
                const bx = Math.cos(angle) * distance;
                const by = Math.sin(angle) * distance;

                drop.style.setProperty('--burst-x', `${bx}px`);
                drop.style.setProperty('--burst-y', `${by}px`);

                container.appendChild(drop);

                setTimeout(() => {
                    drop.remove();
                }, 400);
            }
        });

        link.addEventListener('mouseleave', () => {
            if (link.closest('.contact-mail')) {
                if (cursorText) {
                    cursorText.textContent = "Open";
                    cursorText.classList.remove('show');
                }
                if (cursor) cursor.classList.remove('lg');
            }
        });
    });
})();