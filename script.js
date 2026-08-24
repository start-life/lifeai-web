/**
 * LifeAi - Interactive Engine & Scroll Experience
 * High-performance, lightweight Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initLocalFileLinks();
  initScrollProgress();
  initHeader();
  initHeroCanvas();
  initScrollReveal();
  initBentoCardGlow();
  initNumberCounters();
  initScrollSpy();
  initFaqAccordion();
  initCopyEmail();
  initMobileMenu();
  initDropdownMenus();
  initScrollTop();
  initCookieConsent();
});

/* ---------------------------------------------------------
   0. Progressive Enhancement for Local File Testing
   --------------------------------------------------------- */
function initLocalFileLinks() {
  const isStaticHost = window.location.protocol === 'file:' || window.location.hostname.includes('github.io');
  if (isStaticHost) {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.endsWith('.html')) {
        if (href === './' || href === '/') {
          link.setAttribute('href', 'index.html');
        } else if (href.startsWith('./#') || href.startsWith('/#')) {
          link.setAttribute('href', 'index.html' + href.substring(href.indexOf('#')));
        } else {
          link.setAttribute('href', href.replace(/\/$/, '') + '.html');
        }
      }
    });
  }
}

/* ---------------------------------------------------------
   1. Scroll Progress Bar
   --------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = window.scrollY / totalHeight;
      progressBar.style.transform = `scaleX(${progress})`;
    }
  }, { passive: true });
}

/* ---------------------------------------------------------
   2. Sticky Header & Navigation
   --------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ---------------------------------------------------------
   3. Interactive Hero Canvas (Living Neural Engine & Synapses)
   --------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let dpr = 1;
  let particles = [];
  let signals = [];
  let shockwaves = [];
  let mouse = { x: null, y: null, radius: 150, active: false };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x to balance Retina sharpness and GPU/battery efficiency
    const parent = canvas.parentElement;
    width = parent ? parent.offsetWidth : window.innerWidth;
    height = parent ? parent.offsetHeight : window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    if (ctx.setTransform) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    } else {
      ctx.scale(dpr, dpr);
    }

    createParticles();
  };

  const createParticles = () => {
    particles = [];
    // Dynamic density based on logical resolution
    const baseCount = Math.floor((width * height) / 11000);
    const count = Math.min(Math.max(baseCount, 30), 80);

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      // Color palette: Sunset Orange, Amber Gold, Electric Cyan, Neon White
      const color = rand > 0.45 
        ? '#ff6b35' 
        : (rand > 0.22 ? '#ffa502' : (rand > 0.08 ? '#00f2fe' : '#ffffff'));

      const isHub = rand > 0.85; // Major hub node
      const baseRadius = isHub ? (Math.random() * 1.8 + 2.8) : (Math.random() * 1.4 + 1.2);

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isHub ? 0.5 : 0.8),
        vy: (Math.random() - 0.5) * (isHub ? 0.5 : 0.8),
        baseRadius: baseRadius,
        radius: baseRadius,
        color: color,
        isHub: isHub,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.04,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.015 + Math.random() * 0.02
      });
    }
  };

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('orientationchange', () => setTimeout(resize, 100), { passive: true });
  resize();

  // Mouse & Touch Tracking
  const updateMouse = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = clientX - rect.left;
    mouse.y = clientY - rect.top;
    mouse.active = true;
  };

  window.addEventListener('mousemove', (e) => updateMouse(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      updateMouse(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  const clearMouse = () => {
    mouse.x = null;
    mouse.y = null;
    mouse.active = false;
  };

  window.addEventListener('mouseleave', clearMouse, { passive: true });
  window.addEventListener('touchend', clearMouse, { passive: true });

  // Click / Tap Interactive Shockwave Burst
  const triggerShockwave = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    shockwaves.push({
      x: x,
      y: y,
      radius: 5,
      maxRadius: 180,
      alpha: 1,
      color: Math.random() > 0.5 ? '#ff6b35' : '#00f2fe'
    });

    // Push particles away with an explosive impulse
    particles.forEach(p => {
      const dx = p.x - x;
      const dy = p.y - y;
      const dist = Math.hypot(dx, dy);
      if (dist < 180 && dist > 1) {
        const force = (180 - dist) / 180;
        p.vx += (dx / dist) * force * 5;
        p.vy += (dy / dist) * force * 5;
      }
    });
  };

  canvas.parentElement?.addEventListener('click', (e) => triggerShockwave(e.clientX, e.clientY));

  let isVisible = true;
  let animFrameId = null;
  let signalCooldown = 0;

  // Animation Loop
  const animate = () => {
    if (!isVisible) {
      animFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Shockwaves
    for (let s = shockwaves.length - 1; s >= 0; s--) {
      const sw = shockwaves[s];
      sw.radius += 5.5;
      sw.alpha *= 0.94;

      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = sw.color === '#00f2fe' 
        ? `rgba(0, 242, 254, ${sw.alpha * 0.7})` 
        : `rgba(255, 107, 53, ${sw.alpha * 0.7})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      if (sw.alpha < 0.02 || sw.radius >= sw.maxRadius) {
        shockwaves.splice(s, 1);
      }
    }

    // 2. Spawn Random Synaptic Neural Pulses (Signals)
    signalCooldown++;
    if (signalCooldown > 18 && particles.length > 2) {
      signalCooldown = 0;
      const srcIdx = Math.floor(Math.random() * particles.length);
      const p1 = particles[srcIdx];
      // Find a near connected partner
      for (let j = 0; j < particles.length; j++) {
        if (srcIdx === j) continue;
        const p2 = particles[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < 130) {
          signals.push({
            p1: p1,
            p2: p2,
            progress: 0,
            speed: 0.045 + Math.random() * 0.03,
            color: p1.color === '#00f2fe' ? '#00f2fe' : '#ffa502'
          });
          break;
        }
      }
    }

    // 3. Update & Draw Particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Organic fluid motion with subtle wobble
      p.wobble += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobble) * 0.25;
      p.y += p.vy + Math.cos(p.wobble) * 0.25;

      // Friction to return to normal speed after shockwave
      p.vx *= 0.985;
      p.vy *= 0.985;

      // Ensure minimum baseline drift
      if (Math.abs(p.vx) < 0.18) p.vx += (Math.random() - 0.5) * 0.15;
      if (Math.abs(p.vy) < 0.18) p.vy += (Math.random() - 0.5) * 0.15;

      // Bounce smoothly on borders
      if (p.x < 10) { p.x = 10; p.vx = Math.abs(p.vx); }
      if (p.x > width - 10) { p.x = width - 10; p.vx = -Math.abs(p.vx); }
      if (p.y < 10) { p.y = 10; p.vy = Math.abs(p.vy); }
      if (p.y > height - 10) { p.y = height - 10; p.vy = -Math.abs(p.vy); }

      // Dynamic Interactive Mouse Magnetism
      if (mouse.active && mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 1.4;
          p.y += (dy / dist) * force * 1.4;

          // Draw connection to mouse
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          const mouseOpacity = (1 - dist / mouse.radius) * 0.35;
          ctx.strokeStyle = `rgba(255, 107, 53, ${mouseOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Breathing / Pulsing Glow
      p.pulse += p.pulseSpeed;
      const currentRadius = p.baseRadius + Math.sin(p.pulse) * (p.isHub ? 1.0 : 0.5);

      // Render Particle with Neon Glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(currentRadius, 0.8), 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = p.isHub ? 14 : 8;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Synaptic Connection Lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.hypot(dx, dy);

        const maxDist = 125;
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);

          const opacity = (1 - dist / maxDist) * 0.36;
          ctx.strokeStyle = p.color === '#00f2fe' || p2.color === '#00f2fe'
            ? `rgba(0, 242, 254, ${opacity})`
            : `rgba(255, 107, 53, ${opacity})`;
          ctx.lineWidth = p.isHub && p2.isHub ? 1.2 : 0.8;
          ctx.stroke();
        }
      }
    }

    // 4. Render Traveling Synaptic Signals (Sparks on lines)
    for (let k = signals.length - 1; k >= 0; k--) {
      const sig = signals[k];
      sig.progress += sig.speed;

      const sx = sig.p1.x + (sig.p2.x - sig.p1.x) * sig.progress;
      const sy = sig.p1.y + (sig.p2.y - sig.p1.y) * sig.progress;

      ctx.beginPath();
      ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = sig.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ffffff';
      ctx.fill();
      ctx.shadowBlur = 0;

      if (sig.progress >= 1) {
        signals.splice(k, 1);
      }
    }

    animFrameId = requestAnimationFrame(animate);
  };

  // Pause canvas rendering when hero is scrolled out of viewport (saves CPU/Battery)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animFrameId) {
          animate();
        }
      });
    }, { threshold: 0.05 });
    observer.observe(canvas.parentElement || canvas);
  } else {
    animate();
  }
}

/* ---------------------------------------------------------
   4. Scroll-Driven Reveal Animations (IntersectionObserver)
   --------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ---------------------------------------------------------
   5. Dynamic Mouse-Tracking Glow on Bento & Project Cards
   --------------------------------------------------------- */
function initBentoCardGlow() {
  const cards = document.querySelectorAll('.bento-card, .project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ---------------------------------------------------------
   6. Animated Number Counters
   --------------------------------------------------------- */
function initNumberCounters() {
  const counters = document.querySelectorAll('.counter-animate');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseFloat(target.getAttribute('data-target'));
        const suffix = target.getAttribute('data-suffix') || '';
        const isDecimal = target.getAttribute('data-decimal') === 'true';
        let current = 0;
        
        // Scale duration smoothly: smaller integers animate snappier
        const duration = targetValue <= 5 ? 800 : (targetValue <= 20 ? 1100 : 1500);
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          
          current = easeProgress * targetValue;
          target.textContent = isDecimal 
            ? current.toFixed(1) + suffix 
            : Math.floor(current) + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            target.textContent = (isDecimal ? targetValue.toFixed(1) : targetValue) + suffix;
          }
        };

        requestAnimationFrame(updateCounter);
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ---------------------------------------------------------
   7. Dynamic ScrollSpy (Active Navigation Highlighting)
   --------------------------------------------------------- */
function initScrollSpy() {
  // Only activate ScrollSpy if there are target in-page sections on this document
  const sections = document.querySelectorAll('section[id]');
  const inPageNavLinks = document.querySelectorAll('.nav-links a[href^="#"], .nav-links a[href^="./#"]');
  if (!sections.length || !inPageNavLinks.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 140; // Offset for fixed navbar

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        inPageNavLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}` || href === `./#${id}` || href === `index.html#${id}` || (id === 'hero' && (href === 'index.html' || href === '#hero' || href === './'))) {
            inPageNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------------------------------------------------------
   8. Interactive FAQ Accordion
   --------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    item.classList.remove('faq-open');
    
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = item.classList.contains('faq-open');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('faq-open');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('faq-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('faq-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---------------------------------------------------------
   9. Mobile Navigation & Dropdown Toggle
   --------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggleBtn || !navLinks) return;

  const closeMenu = () => {
    navLinks.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.querySelectorAll('.nav-item-dropdown.is-open').forEach(d => {
      d.classList.remove('is-open');
      d.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    });
  };

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isExpanded = navLinks.classList.contains('active');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
    if (!isExpanded) {
      document.querySelectorAll('.nav-item-dropdown.is-open').forEach(d => {
        d.classList.remove('is-open');
        d.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  navLinks.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });
}

function initDropdownMenus() {
  const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
  if (!dropdownItems.length) return;

  // Detect touch/pointer capabilities
  const isTouchCapable = () => 
    (window.matchMedia && window.matchMedia('(hover: none)').matches) || 
    (navigator.maxTouchPoints > 0) || 
    ('ontouchstart' in window);

  dropdownItems.forEach(item => {
    const toggle = item.querySelector('.dropdown-toggle');
    if (!toggle) return;

    let closeTimeout = null;

    // Desktop hover behavior (only when hover is supported and viewport is wide)
    item.addEventListener('mouseenter', () => {
      if (!isTouchCapable() && window.innerWidth > 768) {
        if (closeTimeout) clearTimeout(closeTimeout);
        item.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    item.addEventListener('mouseleave', () => {
      if (!isTouchCapable() && window.innerWidth > 768) {
        closeTimeout = setTimeout(() => {
          item.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }, 150);
      }
    });

    // Touch & Click toggle behavior for mobile, tablets, and touchscreens
    toggle.addEventListener('click', (e) => {
      if (isTouchCapable() || window.innerWidth <= 768) {
        e.preventDefault();
        const willOpen = !item.classList.contains('is-open');
        
        // Close siblings
        dropdownItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('is-open');
            other.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.toggle('is-open', willOpen);
        toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      }
    });
  });

  // Close dropdown if clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      dropdownItems.forEach(item => {
        item.classList.remove('is-open');
        const toggle = item.querySelector('.dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* ---------------------------------------------------------
   10. Scroll To Top Floating Button
   --------------------------------------------------------- */
function initScrollTop() {
  const scrollTopBtn = document.querySelector('.float-btn.scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------
   11. Copy Email to Clipboard with Toast Notification
   --------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast-notification');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = 'contact@lifeai.ovh';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // Show toast
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      }
    } catch (err) {
      console.warn('Could not copy text: ', err);
    }
  });
}

/* ---------------------------------------------------------
   12. Cookie Consent Manager (Persisted via Cookies & Storage)
   --------------------------------------------------------- */
function initCookieConsent() {
  const CONSENT_KEY = 'lifeai_cookie_consent';

  // Helper to read cookie
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    try {
      return localStorage.getItem(name);
    } catch (e) {
      return null;
    }
  };

  // Helper to set cookie for 365 days
  const setCookie = (name, value, days = 365) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    try {
      localStorage.setItem(name, value);
    } catch (e) {}
  };

  // Check if consent has already been given
  const existingConsent = getCookie(CONSENT_KEY);
  if (existingConsent) {
    return; // Already consented, do not display banner
  }

  // Create and inject the floating Cookie Banner
  const banner = document.createElement('div');
  banner.id = 'cookie-consent-banner';
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-label', 'הודעת עוגיות ופרטיות');

  banner.innerHTML = `
    <div class="cookie-banner-content">
      <div class="cookie-icon-wrap">
        <span class="material-symbols-outlined">cookie</span>
      </div>
      <div class="cookie-text-box">
        <h4>הגדרות פרטיות ועוגיות</h4>
        <p>אנו משתמשים בעוגיות (Cookies) ובכלי ניתוח לצורך שיפור חוויית הגלישה, ביצועי האתר והבטחת פעילות תקינה. בלחיצה על "אישור הכל" הנך מסכים לשימוש זה בהתאם ל<a href="terms">תנאי השימוש</a> ול<a href="privacy">מדיניות הפרטיות</a> שלנו.</p>
      </div>
    </div>
    <div class="cookie-actions">
      <button id="cookie-accept-all" class="btn btn-primary btn-sm">אישור הכל</button>
      <button id="cookie-accept-essential" class="btn btn-ghost btn-sm">הכרחיות בלבד</button>
    </div>
  `;

  document.body.appendChild(banner);

  // Ensure dynamic links inside the newly injected banner are resolved properly in static/local environments
  initLocalFileLinks();

  // Smooth entry animation after a brief delay
  setTimeout(() => {
    banner.classList.add('visible');
  }, 700);

  const closeBanner = () => {
    banner.classList.remove('visible');
    setTimeout(() => {
      if (banner && banner.parentNode) {
        banner.remove();
      }
    }, 450);
  };

  // Event handlers
  document.getElementById('cookie-accept-all')?.addEventListener('click', () => {
    setCookie(CONSENT_KEY, 'all', 365);
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'cookie_consent_accepted' });
    }
    closeBanner();
  });

  document.getElementById('cookie-accept-essential')?.addEventListener('click', () => {
    setCookie(CONSENT_KEY, 'essential', 365);
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'cookie_consent_essential' });
    }
    closeBanner();
  });
}

