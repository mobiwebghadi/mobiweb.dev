/* ============================================================
   MOBIWEB — script.js
   Premium Software Company Website
   ============================================================ */

'use strict';

/* Add has-hover class ONLY on real pointer devices (desktop).
   Touch devices never get it — so .reveal stays visible by default in CSS. */
if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.documentElement.classList.add('has-hover');
  document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('has-hover');
  });
}

/* ============================================================
   1. NAVBAR — Scroll effect + Active link highlighting
   ============================================================ */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu  = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navbar) return;

  /* Scroll — add .scrolled class */
  let lastScroll = 0;
  function onScroll() {
    const y = window.scrollY;
    if (y > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Active section highlight */
  const sections = document.querySelectorAll('section[id]');
  function updateActiveLink() {
    const scrollMid = window.scrollY + window.innerHeight / 3;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const bot = top + sec.offsetHeight;
      const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (link) {
        if (scrollMid >= top && scrollMid < bot) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* Hamburger toggle */
  function openMenu() {
    hamburger.classList.add('open');
    navMenu.classList.add('open');
    navOverlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    navOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });
  navOverlay.addEventListener('click', closeMenu);

  /* Close menu on nav link click */
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* Close menu on Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  /* Trap focus inside mobile menu when open */
  navMenu.addEventListener('keydown', e => {
    if (!navMenu.classList.contains('open')) return;
    const focusable = navMenu.querySelectorAll('a, button');
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });
})();


/* ============================================================
   3. SCROLL REVEAL — iOS Safari safe
   ============================================================ */
var revealEls = Array.from(document.querySelectorAll('.reveal'));

function checkReveal() {
  if (!revealEls.length || !document.body.classList.contains('has-hover')) return;
  var vh = window.innerHeight;
  revealEls = revealEls.filter(function(el) {
    if (el.getBoundingClientRect().top < vh + 60) {
      el.classList.add('visible');
      return false;
    }
    return true;
  });
}

// Desktop / Android: scroll events fire reliably
window.addEventListener('scroll', checkReveal, { passive: true });

// iOS Safari: scroll events are sparse during momentum scrolling.
// After touchend, poll every rAF frame until all elements are revealed.
var rafId = null;
function stopRaf() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }
function startRaf() {
  stopRaf();
  function loop() {
    checkReveal();
    if (revealEls.length > 0) {
      rafId = requestAnimationFrame(loop);
    } else {
      rafId = null;
    }
  }
  rafId = requestAnimationFrame(loop);
}
// touchmove covers slow finger drags on iOS
document.addEventListener('touchmove', checkReveal, { passive: true });
// touchend starts rAF loop to catch momentum scrolling
document.addEventListener('touchend', startRaf, { passive: true });

// Run on load and after everything settles
checkReveal();
window.addEventListener('load', function() { checkReveal(); startRaf(); });


/* ============================================================
   2. SMOOTH SCROLL — override for anchor links
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 76;
      var top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
      // Kick off rAF polling immediately after nav tap
      startRaf();
    });
  });
})();


/* ============================================================
   4. HERO — Parallax orbs on mouse move
   ============================================================ */
(function initHeroParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const orb1 = hero.querySelector('.orb-1');
  const orb2 = hero.querySelector('.orb-2');
  const orb3 = hero.querySelector('.orb-3');

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const cx   = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 to 0.5
    const cy   = (e.clientY - rect.top)  / rect.height - 0.5;

    if (orb1) orb1.style.transform = `translate(${cx * 28}px, ${cy * 28}px)`;
    if (orb2) orb2.style.transform = `translate(${cx * -18}px, ${cy * -18}px)`;
    if (orb3) orb3.style.transform = `translate(${cx * 22}px, ${cy * 22}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    if (orb1) orb1.style.transform = '';
    if (orb2) orb2.style.transform = '';
    if (orb3) orb3.style.transform = '';
  });
})();


/* ============================================================
   5. HERO — Typed text effect on headline
   ============================================================ */
(function initTyped() {
  const el = document.querySelector('.hero-title');
  if (!el) return;

  // Subtle entrance animation — slide up title words
  const words = el.querySelectorAll('.gradient-text');
  words.forEach((w, i) => {
    w.style.opacity = '0';
    w.style.transform = 'translateY(20px)';
    w.style.transition = `opacity 0.7s ease ${0.3 + i * 0.2}s, transform 0.7s ease ${0.3 + i * 0.2}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        w.style.opacity = '1';
        w.style.transform = 'translateY(0)';
      });
    });
  });
})();


/* ============================================================
   6. COUNTER ANIMATION — Hero stats
   ============================================================ */
(function initCounters() {
  const stats = document.querySelectorAll('.stat strong');
  if (!stats.length) return;

  function parseTarget(text) {
    const num   = parseInt(text.replace(/\D/g, ''), 10);
    const suffix = text.replace(/[\d]/g, '').trim();
    return { num, suffix };
  }

  function animateCounter(el) {
    const { num, suffix } = parseTarget(el.textContent);
    const duration = 1800;
    const steps    = 60;
    const increment = num / steps;
    let current    = 0;
    let frame      = 0;

    const timer = setInterval(() => {
      frame++;
      current = Math.min(Math.round(increment * frame), num);
      el.textContent = current + suffix;
      if (current >= num) clearInterval(timer);
    }, duration / steps);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  stats.forEach(el => observer.observe(el));
})();


/* ============================================================
   7. NAVBAR — Active link style injection
   ============================================================ */
(function injectActiveLinkStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active {
      color: #38B6FF !important;
    }
    .nav-link.active::after {
      transform: translateX(-50%) scaleX(1) !important;
    }
  `;
  document.head.appendChild(style);
})();


/* ============================================================
   8. CONTACT FORM — Validation & EmailJS Submission
   ============================================================ */
(function initContactForm() {
  /* ── Initialise EmailJS ─────────────────────────────────── */
  emailjs.init('jQj-iSihH7SLZNSbz');

  const form     = document.getElementById('contact-form');
  const success  = document.getElementById('formSuccess');
  const statusEl = document.getElementById('form-status');
  if (!form) return;

  /* Input focus animation */
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('focus', () => {
      field.parentElement.classList.add('focused');
    });
    field.addEventListener('blur', () => {
      field.parentElement.classList.remove('focused');
    });
  });

  /* Validation helpers */
  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  function showError(field, msg) {
    clearError(field);
    field.style.borderColor = '#e53e3e';
    field.style.boxShadow   = '0 0 0 3px rgba(229,62,62,0.12)';
    const err = document.createElement('span');
    err.className   = 'field-error';
    err.textContent = msg;
    err.style.cssText = 'display:block;margin-top:4px;font-size:0.76rem;color:#e53e3e;font-weight:500;';
    field.parentElement.appendChild(err);
  }

  function clearError(field) {
    field.style.borderColor = '';
    field.style.boxShadow   = '';
    const prev = field.parentElement.querySelector('.field-error');
    if (prev) prev.remove();
  }

  function clearAllErrors() {
    form.querySelectorAll('input, select, textarea').forEach(f => clearError(f));
  }

  /* Live validation on blur */
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('blur', () => {
      if (!field.value.trim()) {
        showError(field, 'This field is required.');
      } else if (field.type === 'email' && !isValidEmail(field.value)) {
        showError(field, 'Please enter a valid email address.');
      } else {
        clearError(field);
      }
    });
    field.addEventListener('input', () => clearError(field));
  });

  /* Submit */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearAllErrors();

    let valid = true;

    const name    = form.querySelector('#cf-name');
    const email   = form.querySelector('#cf-email');
    const service = form.querySelector('#cf-service');
    const message = form.querySelector('#cf-message');

    if (!name.value.trim()) {
      showError(name, 'Please enter your full name.'); valid = false;
    }
    if (!email.value.trim()) {
      showError(email, 'Please enter your email address.'); valid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email address.'); valid = false;
    }
    if (!service.value) {
      showError(service, 'Please select a service.'); valid = false;
    }
    if (!valid) return;

    /* Simulate submission */
    const submitBtn = form.querySelector('[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           style="animation:spin 0.8s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="1"/>
      </svg>
      Sending…
    `;

    /* Inject spin keyframes once */
    if (!document.getElementById('spin-kf')) {
      const kf = document.createElement('style');
      kf.id = 'spin-kf';
      kf.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
      document.head.appendChild(kf);
    }

    /* Clear any previous status message */
    statusEl.textContent   = '';
    statusEl.className     = '';
    statusEl.style.display = 'none';

    /* ── Send via EmailJS ───────────────────────────────────── */
    emailjs.sendForm('service_niyg087', 'template_97jhfb3', form)

      .then(function () {
        /* ✅ Success — hide form, show success card */
        form.style.display    = 'none';
        success.style.display = 'flex';
        success.removeAttribute('aria-hidden');
        success.classList.add('visible');
        form.reset();
        clearAllErrors();

        /* Auto-reset after 6 s so user can submit again */
        setTimeout(function () {
          form.style.display    = '';
          success.style.display = '';
          success.setAttribute('aria-hidden', 'true');
          success.classList.remove('visible');
          submitBtn.disabled  = false;
          submitBtn.innerHTML = originalHTML;
        }, 6000);
      })

      .catch(function (error) {
        /* ❌ Error — show message and re-enable the button */
        console.error('EmailJS send failed:', error);
        statusEl.textContent   = 'Something went wrong. Please try again or contact us at info@mobiweb.dev.';
        statusEl.className     = 'form-status--error';
        statusEl.style.display = 'block';
        submitBtn.disabled     = false;
        submitBtn.innerHTML    = originalHTML;
      });
  });
})();


/* ============================================================
   9. FOOTER — Current Year
   ============================================================ */
(function setYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ============================================================
   10. SERVICE CARDS — Tilt effect on hover (desktop only)
   ============================================================ */
(function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cards = document.querySelectorAll('.service-card, .why-card, .mv-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const cx    = (e.clientX - rect.left) / rect.width  - 0.5;
      const cy    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-cy * 5}deg) rotateY(${cx * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ============================================================
   11. PROCESS STEPS — Connect steps with animated line (desktop)
   ============================================================ */
(function initProcessLine() {
  const list = document.querySelector('.process-list');
  if (!list) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      list.classList.add('line-visible');
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(list);

  const style = document.createElement('style');
  style.textContent = `
    .process-list::before {
      transition: opacity 1s ease 0.4s;
      opacity: 0;
    }
    .process-list.line-visible::before {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
})();


/* ============================================================
   12. SCROLL PROGRESS — Thin top progress bar
   ============================================================ */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.setAttribute('aria-hidden', 'true');
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #38B6FF, #114CBF);
    z-index: 9999;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();


/* ============================================================
   13. LAZY LOAD — Images with data-src (future-proof)
   ============================================================ */
(function initLazyImages() {
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  imgs.forEach(img => observer.observe(img));
})();


/* ============================================================
   14. BACK TO TOP — Floating button
   ============================================================ */
(function initBackToTop() {
  const btn = document.createElement('button');
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2.5" aria-hidden="true">
      <polyline points="18 15 12 9 6 15"/>
    </svg>`;
  btn.style.cssText = `
    position: fixed;
    bottom: 32px; right: 28px;
    width: 46px; height: 46px;
    background: linear-gradient(135deg, #38B6FF 0%, #114CBF 100%);
    color: #fff;
    border: none;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow: 0 6px 24px rgba(56,182,255,.4);
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.3s ease, transform 0.3s ease, filter 0.2s ease;
    z-index: 800;
    pointer-events: none;
  `;
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.opacity       = '1';
      btn.style.transform     = 'translateY(0)';
      btn.style.pointerEvents = 'auto';
    } else {
      btn.style.opacity       = '0';
      btn.style.transform     = 'translateY(16px)';
      btn.style.pointerEvents = 'none';
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  btn.addEventListener('mouseenter', () => { btn.style.filter = 'brightness(1.12)'; });
  btn.addEventListener('mouseleave', () => { btn.style.filter = ''; });
})();
