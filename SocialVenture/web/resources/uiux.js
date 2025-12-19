document.addEventListener("DOMContentLoaded", () => {
  const cta = document.querySelector(".cta");
  const placeholder = document.querySelector(".cta-placeholder");
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll('.cta a[href^="#"]');

  if (!cta || !sections.length) return;

  const ctaInitialTop = cta.offsetTop;
  const ctaHeight = cta.offsetHeight;

  if (placeholder) {
    placeholder.style.height = `${ctaHeight}px`;
  }

  function updateFixed() {
    if (window.scrollY >= ctaInitialTop) {
      cta.classList.add("fixed");
    } else {
      cta.classList.remove("fixed");
    }
  }

  function updateActive() {
    const scrollPos = window.scrollY + ctaHeight + 50;
    let currentId = "";

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.id;
      }
    });

    links.forEach((link) => {
      const href = link.getAttribute("href").substring(1); // # 제거
      if (currentId === href) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", () => {
    updateFixed();
    updateActive();
  });

  updateFixed();
  updateActive();
});
