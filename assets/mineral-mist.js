const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const navLinks = document.querySelectorAll(".mobile-nav a");
const scrollZoomMedia = document.querySelectorAll("[data-scroll-zoom]");
const pageWatermark = document.querySelector(".page-watermark");

const closeMenu = () => {
  if (!menuButton || !mobileNav) return;
  mobileNav.classList.remove("is-open");
  mobileNav.hidden = true;
  document.body.classList.remove("nav-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
};

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = !mobileNav.classList.contains("is-open");
    mobileNav.classList.toggle("is-open", isOpen);
    mobileNav.hidden = !isOpen;
    document.body.classList.toggle("nav-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const initScrollZoom = () => {
  if (!scrollZoomMedia.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) {
    scrollZoomMedia.forEach((media) => media.style.setProperty("--scroll-zoom-scale", "1"));
    return;
  }

  const activeMedia = new Set();
  let rafId = null;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const getMaxScale = (media) => {
    const isMobile = window.matchMedia("(max-width: 620px)").matches;
    const attribute = isMobile ? media.dataset.mobileZoomMax : media.dataset.zoomMax;
    const fallback = isMobile ? 1.03 : 1.08;
    const parsedScale = Number.parseFloat(attribute || "");
    return Number.isFinite(parsedScale) ? parsedScale : fallback;
  };

  const updateScales = () => {
    rafId = null;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    activeMedia.forEach((media) => {
      const rect = media.getBoundingClientRect();
      const maxScale = getMaxScale(media);
      const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
      const scale = maxScale - progress * (maxScale - 1);
      media.style.setProperty("--scroll-zoom-scale", scale.toFixed(4));
    });
  };

  const requestUpdate = () => {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(updateScales);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeMedia.add(entry.target);
          entry.target.classList.add("is-scroll-zooming");
        } else {
          activeMedia.delete(entry.target);
          entry.target.classList.remove("is-scroll-zooming");
        }
      });
      requestUpdate();
    },
    { rootMargin: "18% 0px" },
  );

  scrollZoomMedia.forEach((media) => {
    media.style.setProperty("--scroll-zoom-scale", getMaxScale(media).toString());
    observer.observe(media);
  });

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  requestUpdate();
};

const initScrollingWatermark = () => {
  if (!pageWatermark) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) {
    pageWatermark.style.setProperty("--watermark-y", "0px");
    return;
  }

  let rafId = null;
  const updateWatermark = () => {
    rafId = null;
    const offset = Math.min(window.scrollY * 0.32, document.body.scrollHeight * 0.28);
    pageWatermark.style.setProperty("--watermark-y", `${offset.toFixed(1)}px`);
  };

  const requestUpdate = () => {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(updateWatermark);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  updateWatermark();
};

initScrollZoom();
initScrollingWatermark();
