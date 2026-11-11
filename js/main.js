// ============================================================
// OgaShun - Portfolio
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ----- Footer year -----
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ----- Mobile navigation -----
  const navToggle = document.querySelector(".nav-toggle");
  const headerNav = document.getElementById("header-nav");

  if (navToggle && headerNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = headerNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "メニューを閉じる" : "メニューを開く"
      );
    });

    headerNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        headerNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "メニューを開く");
      });
    });
  }

  // ----- Typing effect -----
  const typingEl = document.getElementById("typing-text");
  const roles = ["ソフトウェアエンジニア", "機械学習エンジニア"];

  if (typingEl) {
    if (prefersReducedMotion) {
      typingEl.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const tick = () => {
        const current = roles[roleIndex];

        if (!deleting) {
          charIndex += 1;
          typingEl.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            window.setTimeout(tick, 2000);
          } else {
            window.setTimeout(tick, 110);
          }
        } else {
          charIndex -= 1;
          typingEl.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            window.setTimeout(tick, 500);
          } else {
            window.setTimeout(tick, 55);
          }
        }
      };

      tick();
    }
  }

  // ----- Scroll reveal -----
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  // ----- Active navigation highlight -----
  const navLinks = Array.from(
    document.querySelectorAll('.header-nav a[href^="#"]')
  );
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length > 0) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                "is-active",
                link.getAttribute("href") === "#" + entry.target.id
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => spyObserver.observe(section));
  }
});
