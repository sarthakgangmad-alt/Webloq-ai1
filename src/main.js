import './style.css';
import { initHeroWorkflow } from './hero-workflow.js';
import { initAutomationBuilder } from './automation-builder.js';
import { initWhatsAppSimulator } from './whatsapp-simulator.js';
import { initIndustries } from './industries.js';
import { initROICalculator } from './roi-calculator.js';
import { initDiscoveryForm } from './discovery-form.js';

// Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('main-nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#FFFFFF';
        navMenu.style.padding = '20px';
        navMenu.style.borderBottom = '1px solid #E2E8F0';
        navMenu.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.05)';
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          navMenu.style.display = 'none';
        }
      });
    });
  }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroWorkflow();
  initAutomationBuilder();
  initWhatsAppSimulator();
  initIndustries();
  initROICalculator();
  initDiscoveryForm();
});
