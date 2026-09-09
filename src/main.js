import './style.css';
import Lenis from 'lenis';
import { initAICore3D } from './ai-core-3d.js';
import { initSpotlightNavbar } from './spotlight-navbar.js';
import { initAutomationBuilder } from './automation-builder.js';
import { initWhatsAppSimulator } from './whatsapp-simulator.js';
import { initROICalculator } from './roi-calculator.js';
import { initDiscoveryForm } from './discovery-form.js';
import { initTelemetryFeed } from './telemetry-feed.js';
import { initCustomCursor } from './custom-cursor.js';

// ==========================================
// 1. LENIS SMOOTH SCROLL
// ==========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;
if (!prefersReducedMotion) {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 1.5,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// ==========================================
// 2. MOBILE MENU TOGGLE
// ==========================================
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu');
  const navContainer = document.querySelector('.spotlight-nav-items');

  if (toggleBtn && navContainer) {
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('active');
      navContainer.classList.toggle('active');
    });

    // Close on navigation click
    navContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('active');
        navContainer.classList.remove('active');
      });
    });
  }
}

// ==========================================
// 3. REFERENCE SYSTEMS TABS SWITCHER
// ==========================================
function initReferenceSystems() {
  const showcase = document.getElementById('systems-showcase');
  if (!showcase) return;

  const tabBtns = showcase.querySelectorAll('.system-tab-btn');
  const panels = showcase.querySelectorAll('.system-content-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.style.display = 'none');

      btn.classList.add('active');
      const targetSystem = btn.dataset.system;
      const targetPanel = showcase.querySelector(`.system-content-panel[data-system="${targetSystem}"]`);
      if (targetPanel) {
        targetPanel.style.display = 'grid';
      }
    });
  });
}

// ==========================================
// 4. INTERSECTION OBSERVER REVEAL ANIMATIONS
// ==========================================
function initScrollReveals() {
  if (prefersReducedMotion) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.solution-card, .agent-card, .process-step-card, .comparison-card').forEach(el => {
    revealObserver.observe(el);
  });
}

// ==========================================
// 5. BOOTSTRAP ALL MODULES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initSpotlightNavbar();
  initMobileMenu();
  initAICore3D();
  initAutomationBuilder();
  initWhatsAppSimulator();
  initROICalculator();
  initDiscoveryForm();
  initTelemetryFeed();
  initReferenceSystems();
  initCustomCursor();
  initScrollReveals();
});
