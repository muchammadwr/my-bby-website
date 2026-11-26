/* ==========================================================================
   Main UI Interactions — Navigation, Scroll Animations, Back to Top, Clipboard
   ========================================================================== */

(function () {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Drawer
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function setDrawerState(isOpen) {
    if (!mobileMenuBtn || !mobileDrawer) return;
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
    mobileDrawer.classList.toggle('open', isOpen);
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isCurrentlyOpen = mobileDrawer.classList.contains('open');
      setDrawerState(!isCurrentlyOpen);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => setDrawerState(false));
    });
  }

  // 3. Active Navigation Highlight on Scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 160;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  // 4. Back to Top Button Visibility & Smooth Scroll
  const backToTopBtn = document.getElementById('backToTop');

  function handleScroll() {
    updateActiveNav();
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', window.scrollY > 420);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Intersection Observer for Subtle Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // 6. One-Click Email Copy Helper
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyStatus = document.getElementById('copyStatus');

  if (copyEmailBtn && copyStatus) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email');
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = 'Copied!';
        setTimeout(() => {
          copyStatus.textContent = 'Copy';
        }, 2200);
      } catch (err) {
        copyStatus.textContent = 'Select & Copy';
      }
    });
  }
})();
