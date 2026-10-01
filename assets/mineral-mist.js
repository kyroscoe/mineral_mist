const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const navLinks = document.querySelectorAll(".mobile-nav a");
const scrollZoomMedia = document.querySelectorAll("[data-scroll-zoom]");
const pageWatermark = document.querySelector(".page-watermark");
const bundleForms = document.querySelectorAll("[data-bundle-form]");
const productDetailsTriggers = document.querySelectorAll("[data-product-details-open]");

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

const initBundleForms = () => {
  if (!bundleForms.length) return;

  bundleForms.forEach((form) => {
    const button = form.querySelector("[data-bundle-submit]");
    const status = form.querySelector("[data-bundle-status]");
    const variantInputs = form.querySelectorAll('input[name="items[][id]"]');

    if (!button || !variantInputs.length) return;
    const buttonLabel = button.textContent.trim();

    button.addEventListener("click", async () => {
      const variantIds = Array.from(variantInputs)
        .map((input) => Number.parseInt(input.value, 10))
        .filter(Number.isFinite);

      if (variantIds.length !== 4) {
        if (status) status.textContent = "This bundle needs all four products selected.";
        return;
      }

      button.disabled = true;
      button.textContent = "Adding...";
      if (status) status.textContent = "Adding the complete collection to your cart.";

      try {
        const response = await fetch("/cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            items: variantIds.map((id) => ({
              id,
              quantity: 1,
              properties: {
                Bundle: "Complete Collection",
              },
            })),
          }),
        });

        if (!response.ok) throw new Error("Bundle could not be added.");

        const discountCode = form.dataset.discountCode;
        const cartPath = "/cart";
        window.location.href = discountCode
          ? `/discount/${encodeURIComponent(discountCode)}?redirect=${encodeURIComponent(cartPath)}`
          : cartPath;
      } catch (error) {
        button.disabled = false;
        button.textContent = buttonLabel;
        if (status) status.textContent = "Something went wrong. Please try again.";
      }
    });
  });
};

const initProductDetailsModals = () => {
  if (!productDetailsTriggers.length) return;

  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");

  productDetailsTriggers.forEach((trigger) => {
    const modalId = trigger.getAttribute("aria-controls");
    const modal = modalId ? document.getElementById(modalId) : null;
    if (!modal) return;

    const dialog = modal.querySelector('[role="dialog"]');
    const closeButtons = modal.querySelectorAll("[data-product-details-close]");
    let lastFocusedElement = null;

    const getFocusableElements = () =>
      Array.from(modal.querySelectorAll(focusableSelector)).filter(
        (element) => !element.hasAttribute("hidden") && element.offsetParent !== null,
      );

    const closeModal = () => {
      modal.hidden = true;
      document.body.classList.remove("product-details-open");
      document.removeEventListener("keydown", handleKeydown);
      lastFocusedElement?.focus();
    };

    const openModal = () => {
      lastFocusedElement = document.activeElement;
      modal.hidden = false;
      document.body.classList.add("product-details-open");
      document.addEventListener("keydown", handleKeydown);

      const focusableElements = getFocusableElements();
      window.requestAnimationFrame(() => {
        (focusableElements[0] || dialog)?.focus();
      });
    };

    function handleKeydown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (!focusableElements.length) {
        event.preventDefault();
        dialog?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    trigger.addEventListener("click", openModal);
    closeButtons.forEach((button) => button.addEventListener("click", closeModal));
  });
};

initScrollZoom();
initScrollingWatermark();
initBundleForms();
initProductDetailsModals();
