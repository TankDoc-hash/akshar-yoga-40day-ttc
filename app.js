/**
 * AKSHAR YOGA — 40-DAY BASIC LEVEL RESIDENTIAL TTC
 * Core Interactive Controller & Ad Conversion Engine
 */

(function () {
  'use strict';

  // --- Configuration ---
  const CONFIG = {
    admissionsPhone: '+918971700394',
    admissionsPhoneAlt: '+919742220607',
    whatsappNumber: '918971700394',
    currency: 'INR',
    defaultTier: 'immersive',
    tiers: {
      'seeker': {
        name: 'Seeker',
        price: '₹1.75 Lakh INR',
        tagline: '40 Days Foundational Training'
      },
      'immersive': {
        name: 'Immersive',
        price: '₹3.5 Lakh INR',
        tagline: 'CSE Residential Experience'
      },
      'ultimate': {
        name: 'Ultimate',
        price: '₹5 Lakh INR',
        tagline: 'Purantha Sanctuary Immersion'
      },
      'basic-ttc': {
        name: 'Seeker',
        price: '₹1.75 Lakh INR',
        tagline: '40 Days Foundational Training'
      },
      'cse-residential': {
        name: 'Immersive',
        price: '₹3.5 Lakh INR',
        tagline: 'CSE Residential Experience'
      },
      'purantha-immersion': {
        name: 'Ultimate',
        price: '₹5 Lakh INR',
        tagline: 'Purantha Sanctuary Immersion'
      },
      'help-choose': {
        name: 'Admissions Guidance',
        price: 'Flexible',
        tagline: 'Help Me Choose'
      }
    }
  };

  // --- Analytics & GTM Layer ---
  window.dataLayer = window.dataLayer || [];

  function trackEvent(eventName, eventParams = {}) {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...getPersistedUTMs(),
      ...eventParams
    };
    window.dataLayer.push(payload);
    // Development console log for inspection
    console.log(`[Analytics Event: ${eventName}]`, payload);
  }

  // --- UTM & Ad Tracking Persistence ---
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];

  function captureAndPersistUTMs() {
    const urlParams = new URLSearchParams(window.location.search);
    const captured = {};

    UTM_KEYS.forEach(key => {
      if (urlParams.has(key)) {
        captured[key] = urlParams.get(key);
      }
    });

    if (Object.keys(captured).length > 0) {
      try {
        sessionStorage.setItem('ay_utm_params', JSON.stringify(captured));
        localStorage.setItem('ay_utm_params', JSON.stringify(captured));
      } catch (e) {
        console.warn('Storage unavailable for UTM tracking', e);
      }
    }
  }

  function getPersistedUTMs() {
    try {
      const stored = sessionStorage.getItem('ay_utm_params') || localStorage.getItem('ay_utm_params');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  }

  // --- Scroll Tracking (50% and 90%) ---
  let trackedScroll50 = false;
  let trackedScroll90 = false;

  function initScrollTracking() {
    window.addEventListener('scroll', () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrollPercent = (window.scrollY / docHeight) * 100;

      if (!trackedScroll50 && scrollPercent >= 50) {
        trackedScroll50 = true;
        trackEvent('scroll_50', { depth: 50 });
      }

      if (!trackedScroll90 && scrollPercent >= 90) {
        trackedScroll90 = true;
        trackEvent('scroll_90', { depth: 90 });
      }

      // Mobile sticky CTA visibility
      const stickyBar = document.getElementById('sticky-mobile-bar');
      if (stickyBar) {
        if (window.scrollY > 380) {
          stickyBar.classList.add('visible');
        } else {
          stickyBar.classList.remove('visible');
        }
      }
    }, { passive: true });
  }

  // --- Modal Management ---
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first input or close button
    const focusable = modal.querySelector('input, select, textarea, button');
    if (focusable) focusable.focus();
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initModals() {
    // Backdrop and close buttons
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('.modal-close-btn')) {
          closeModal(modal.id);
        }
      });
    });

    // Keyboard Escape to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
          closeModal(modal.id);
        });
      }
    });

    // Triggers for Application Modal
    document.querySelectorAll('.trigger-apply-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tier = btn.getAttribute('data-tier') || CONFIG.defaultTier;
        selectPricingTierInForm(tier);
        openModal('modal-application');
        trackEvent('apply_click', { selected_tier: tier, trigger_element: btn.innerText.trim() });
      });
    });

    // Triggers for Talk to Admissions Modal
    document.querySelectorAll('.trigger-admissions-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('modal-admissions');
        trackEvent('cta_click', { cta_name: 'talk_to_admissions', trigger_element: btn.innerText.trim() });
      });
    });

    // Triggers for Curriculum Modal
    document.querySelectorAll('.trigger-curriculum-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('modal-curriculum');
        trackEvent('curriculum_open');
      });
    });
  }

  // --- Two-Step Application Form Controller ---
  function selectPricingTierInForm(tierKey) {
    const radios = document.querySelectorAll('input[name="preferred_option"]');
    radios.forEach(radio => {
      const card = radio.closest('.option-radio-card');
      if (radio.value === tierKey) {
        radio.checked = true;
        if (card) card.classList.add('selected');
      } else {
        if (card) card.classList.remove('selected');
      }
    });
  }

  function initApplicationForm() {
    const form = document.getElementById('application-wizard-form');
    if (!form) return;

    let hasStarted = false;
    form.addEventListener('focusin', () => {
      if (!hasStarted) {
        hasStarted = true;
        trackEvent('form_start', { form_name: 'ttc_application' });
      }
    });

    // Handle Option Card selection visual feedback
    const optionCards = form.querySelectorAll('.option-radio-card');
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        optionCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          trackEvent('pricing_option_selected', { tier: radio.value });
        }
      });
    });

    // Step 1 to Step 2 Transition
    const nextBtn = document.getElementById('btn-step-1-next');
    const backBtn = document.getElementById('btn-step-2-back');
    const step1El = document.getElementById('form-step-1');
    const step2El = document.getElementById('form-step-2');
    const indicator1 = document.getElementById('indicator-step-1');
    const indicator2 = document.getElementById('indicator-step-2');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        // Validate Step 1
        const nameInput = document.getElementById('app-name');
        const emailInput = document.getElementById('app-email');
        const phoneInput = document.getElementById('app-phone');
        const countryInput = document.getElementById('app-country');

        if (!nameInput.value.trim()) {
          nameInput.focus();
          alert('Please enter your full name.');
          return;
        }

        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
          emailInput.focus();
          alert('Please enter a valid email address.');
          return;
        }

        if (!phoneInput.value.trim() || phoneInput.value.trim().length < 6) {
          phoneInput.focus();
          alert('Please enter a valid phone or WhatsApp number.');
          return;
        }

        if (!countryInput.value) {
          countryInput.focus();
          alert('Please select your country of residence.');
          return;
        }

        // Proceed to Step 2
        step1El.style.display = 'none';
        step2El.style.display = 'block';
        indicator1.classList.add('completed');
        indicator2.classList.add('active');
        trackEvent('cta_click', { cta_name: 'application_step_1_complete' });
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        step2El.style.display = 'none';
        step1El.style.display = 'block';
        indicator1.classList.remove('completed');
        indicator2.classList.remove('active');
      });
    }

    // Form Submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting Application...';
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const utms = getPersistedUTMs();

      const finalPayload = {
        ...data,
        ...utms,
        submittedAt: new Date().toISOString(),
        pageUrl: window.location.href
      };

      // Save submission locally for reliability
      try {
        const pastSubmissions = JSON.parse(localStorage.getItem('ay_applications') || '[]');
        pastSubmissions.push(finalPayload);
        localStorage.setItem('ay_applications', JSON.stringify(pastSubmissions));
      } catch (err) {
        console.warn('Could not save application to localStorage', err);
      }

      // Track primary conversion
      trackEvent('form_submit', {
        form_name: 'ttc_application',
        applicant_name: data.fullName,
        tier: data.preferred_option,
        country: data.country
      });

      // Show Success View
      showFormSuccess(data.fullName, data.preferred_option);
    });
  }

  function showFormSuccess(applicantName, selectedTier) {
    const formWizard = document.getElementById('application-wizard-form');
    const successBox = document.getElementById('application-success-view');
    const successNameEl = document.getElementById('success-applicant-name');
    const whatsappBtn = document.getElementById('success-whatsapp-link');

    if (formWizard) formWizard.style.display = 'none';
    if (successBox) successBox.style.display = 'block';
    if (successNameEl) successNameEl.innerText = applicantName || 'Namaste';

    // Build personalized WhatsApp link
    const tierInfo = CONFIG.tiers[selectedTier] || CONFIG.tiers['cse-residential'];
    const message = encodeURIComponent(
      `Namaste Akshar Yoga Admissions, I have just submitted my application for the 40-Day Basic Residential TTC (${tierInfo.name}). My name is ${applicantName}. Could you please guide me on the next steps?`
    );
    if (whatsappBtn) {
      whatsappBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // --- Admissions Callback Form ---
  function initAdmissionsForm() {
    const callbackForm = document.getElementById('admissions-callback-form');
    if (!callbackForm) return;

    callbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = callbackForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Requesting...';
      }

      const formData = new FormData(callbackForm);
      const data = Object.fromEntries(formData.entries());

      trackEvent('form_submit', {
        form_name: 'admissions_callback',
        name: data.callbackName,
        phone: data.callbackPhone
      });

      callbackForm.innerHTML = `
        <div class="modal-success-state">
          <div class="success-icon-wrap">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 class="serif">Request Received</h3>
          <p>Thank you. Our admissions counselor will call you within the scheduled window.</p>
          <a href="https://wa.me/${CONFIG.whatsappNumber}?text=Namaste,%20I%20requested%20a%20callback%20regarding%20the%2040-Day%20TTC" class="btn btn-whatsapp" target="_blank" rel="noopener">
            Need Immediate Assistance? Chat on WhatsApp
          </a>
        </div>
      `;
    });
  }

  // --- Accessible FAQ Accordion ---
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const button = item.querySelector('.faq-question-btn');
      if (!button) return;

      button.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items for compact scanning
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-question-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          button.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          button.setAttribute('aria-expanded', 'true');
          trackEvent('cta_click', { cta_name: 'faq_expanded', question: button.innerText.trim() });
        }
      });
    });
  }

  // --- WhatsApp & Direct Click Tracking ---
  function initDirectClickTracking() {
    // WhatsApp clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('whatsapp_click', { link_url: link.href, link_text: link.innerText.trim() });
      });
    });

    // Phone call clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('phone_click', { phone_number: link.href, link_text: link.innerText.trim() });
      });
    });
  }

  // --- Scroll Reveal Animations ---
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // --- Mobile Off-Canvas Navigation Drawer ---
  function initMobileNav() {
    const toggleBtn = document.getElementById('btn-mobile-nav-toggle');
    const closeBtn = document.getElementById('btn-mobile-nav-close');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    if (!backdrop) return;

    function openNav() {
      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', openNav);
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', closeNav);
    }

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeNav();
    });

    backdrop.querySelectorAll('.mobile-nav-item').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

  // --- Initialization on DOM Ready ---
  document.addEventListener('DOMContentLoaded', () => {
    captureAndPersistUTMs();
    initScrollTracking();
    initScrollReveal();
    initMobileNav();
    initModals();
    initApplicationForm();
    initAdmissionsForm();
    initFAQ();
    initDirectClickTracking();

    trackEvent('page_view', { page_title: document.title });
  });

})();
