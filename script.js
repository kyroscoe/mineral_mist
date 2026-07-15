const products = [
  {
    name: "Pure Mineral Mist",
    image: "assets/pure-mineral-mist.jpg",
    alt: "Pure Mineral Mist spray bottle and box",
    label: "Everyday magnesium",
    description:
      "Pure Dead Sea magnesium blended with essential oil in a clean daily spray for simple refresh moments.",
    price: "Price coming soon",
    size: "Size details coming soon",
    slug: "pure-mineral-mist",
  },
  {
    name: "Head Ease",
    image: "assets/head-ease.jpg",
    alt: "Head Ease Mineral Mist spray bottle and box",
    label: "Peppermint blend",
    description:
      "Dead Sea magnesium blended with 100% pure peppermint essential oil for a crisp sensory reset.",
    price: "Price coming soon",
    size: "Size details coming soon",
    slug: "head-ease",
  },
  {
    name: "Post Recovery",
    image: "assets/post-recovery.jpg",
    alt: "Post Recovery Mineral Mist spray bottle and box",
    label: "After movement",
    description:
      "A mineral-forward spray with essential oils designed to fit into post-workout and end-of-day care routines.",
    price: "Price coming soon",
    size: "Size details coming soon",
    slug: "post-recovery",
  },
  {
    name: "Calm & Uplift",
    image: "assets/calm-uplift.jpg",
    alt: "Calm and Uplift Mineral Mist spray bottle and box",
    label: "Rose water softness",
    description:
      "Dead Sea magnesium blended with essential oils in a soft floral mist for slower daily pauses.",
    price: "Price coming soon",
    size: "Size details coming soon",
    slug: "calm-uplift",
  },
];

// Client-editable educational copy. Confirm final language before launch.
const magnesiumContent = {
  intro:
    "Mineral Mist keeps the focus on one clear ingredient story: 100% pure magnesium from the Dead Sea blended with essential oils in a convenient topical spray format for daily wellness routines.",
  points: [
    {
      title: "Sourced from the mineral-rich Dead Sea",
      text: "A distinctive mineral source gives Mineral Mist its simple, focused foundation.",
    },
    {
      title: "Made with 100% pure magnesium",
      text: "The core product message stays clear and uncomplicated across the full collection.",
    },
    {
      title: "Simple topical application",
      text: "A spray format makes it easy to add to morning, post-workout, or evening routines.",
    },
  ],
};

const routineCards = [
  {
    title: "Morning Routine",
    icon: "sun",
    text: "Keep Mineral Mist nearby as a simple mineral-forward start to the day.",
  },
  {
    title: "Post-Workout",
    icon: "move",
    text: "Add it to post-movement care when you want a straightforward topical step.",
  },
  {
    title: "Evening Wind-Down",
    icon: "moon",
    text: "Use it as part of a calm, consistent routine before the day closes.",
  },
  {
    title: "Everyday Wellness",
    icon: "drop",
    text: "A convenient spray designed to fit naturally into ordinary daily moments.",
  },
];

// Placeholder-safe steps until product-specific directions are supplied.
const steps = [
  {
    title: "Spray",
    text: "Apply according to the directions on your specific Mineral Mist product.",
  },
  {
    title: "Massage",
    text: "Gently massage the product into skin as directed on the product label.",
  },
  {
    title: "Make It a Routine",
    text: "Use according to the product directions and your personal routine.",
  },
];

const trustItems = [
  "100% Pure Magnesium",
  "Sourced from the Dead Sea",
  "Simple Topical Use",
  "Carefully Made",
];

// Client-editable FAQ copy. Avoids dosage, safety, or medical claims until approved content exists.
const faqs = [
  {
    question: "What is Mineral Mist?",
    answer:
      "Mineral Mist is a small collection of magnesium spray mists designed for simple daily wellness routines.",
  },
  {
    question: "Where does the magnesium come from?",
    answer:
      "The central Mineral Mist ingredient story is 100% pure magnesium from the Dead Sea.",
  },
  {
    question: "How do I use Mineral Mist?",
    answer:
      "Use each product according to the directions on its label. Product-specific instructions should be confirmed before launch.",
  },
  {
    question: "Which product is right for me?",
    answer:
      "The collection includes Pure Mineral Mist, Head Ease, Post Recovery, and Calm & Uplift, each designed around a different everyday routine moment.",
  },
  {
    question: "Where can I find ingredient and safety information?",
    answer:
      "Ingredient and safety details should be reviewed on the product packaging or any client-approved product detail page once available.",
  },
];

const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const navLinks = document.querySelectorAll(".mobile-nav a");
const productGrid = document.querySelector("[data-product-grid]");
const magnesiumIntro = document.querySelector("[data-magnesium-intro]");
const magnesiumPoints = document.querySelector("[data-magnesium-points]");
const routineGrid = document.querySelector("[data-routine-grid]");
const stepsGrid = document.querySelector("[data-steps-grid]");
const trustRow = document.querySelector("[data-trust-row]");
const faqList = document.querySelector("[data-faq-list]");
const newsletterForm = document.querySelector("[data-newsletter-form]");
const formStatus = document.querySelector("[data-form-status]");
const scrollZoomMedia = document.querySelectorAll("[data-scroll-zoom]");
const pageWatermark = document.querySelector(".page-watermark");

const icons = {
  sun: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 4V2M12 22v-2M4.9 4.9 3.5 3.5M20.5 20.5l-1.4-1.4M4 12H2M22 12h-2M4.9 19.1l-1.4 1.4M20.5 3.5l-1.4 1.4M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/></svg>',
  move: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 16c2.4 0 2.4-8 4.8-8s2.4 8 4.8 8S16 8 18.4 8H20M5 20h14"/></svg>',
  moon: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 15.2A8.2 8.2 0 0 1 8.8 4 8.7 8.7 0 1 0 20 15.2Z"/></svg>',
  drop: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z"/></svg>',
};

const renderProducts = () => {
  if (!productGrid) return;

  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image">
            <img src="${product.image}" alt="${product.alt}" width="640" height="640" loading="lazy" />
          </div>
          <div class="product-content">
            <p class="product-kicker">${product.label}</p>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-meta">
              ${product.price}
              <span>${product.size}</span>
            </div>
            <div class="product-actions">
              <a class="button button-outline" href="#" data-shopify-url="${product.slug}">View Product</a>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
};

const renderMagnesiumContent = () => {
  if (magnesiumIntro) magnesiumIntro.textContent = magnesiumContent.intro;
  if (!magnesiumPoints) return;

  magnesiumPoints.innerHTML = magnesiumContent.points
    .map(
      (point) => `
        <article class="point-card">
          <h3>${point.title}</h3>
          <p>${point.text}</p>
        </article>
      `,
    )
    .join("");
};

const renderRoutineCards = () => {
  if (!routineGrid) return;

  routineGrid.innerHTML = routineCards
    .map(
      (card) => `
        <article class="routine-card">
          <span class="routine-icon">${icons[card.icon]}</span>
          <h3>${card.title}</h3>
          <p>${card.text}</p>
        </article>
      `,
    )
    .join("");
};

const renderSteps = () => {
  if (!stepsGrid) return;

  stepsGrid.innerHTML = steps
    .map(
      (step, index) => `
        <article class="step-card">
          <span class="step-number">${index + 1}</span>
          <h3>${step.title}</h3>
          <p>${step.text}</p>
        </article>
      `,
    )
    .join("");
};

const renderTrustRow = () => {
  if (!trustRow) return;
  trustRow.innerHTML = trustItems.map((item) => `<div class="trust-item">${item}</div>`).join("");
};

const renderFaqs = () => {
  if (!faqList) return;

  faqList.innerHTML = faqs
    .map(
      (faq) => `
        <details class="faq-item">
          <summary>${faq.question}</summary>
          <p>${faq.answer}</p>
        </details>
      `,
    )
    .join("");
};

const initScrollZoom = () => {
  if (!scrollZoomMedia.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reduceMotion.matches) {
    scrollZoomMedia.forEach((media) => {
      media.style.setProperty("--scroll-zoom-scale", "1");
    });
    return;
  }

  const activeMedia = new Set();
  let rafId = null;

  const getMaxScale = (media) => {
    const isMobile = window.matchMedia("(max-width: 620px)").matches;
    const attribute = isMobile ? media.dataset.mobileZoomMax : media.dataset.zoomMax;
    const fallback = isMobile ? 1.03 : 1.08;
    const parsedScale = Number.parseFloat(attribute || "");
    return Number.isFinite(parsedScale) ? parsedScale : fallback;
  };
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const updateScales = () => {
    rafId = null;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const minScale = 1;

    activeMedia.forEach((media) => {
      const rect = media.getBoundingClientRect();
      const maxScale = getMaxScale(media);
      const isHeroMedia = media.hasAttribute("data-hero-scroll-zoom");
      const progress = isHeroMedia
        ? clamp(window.scrollY / Math.max(media.offsetHeight, 1), 0, 1)
        : clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
      const scale = maxScale - progress * (maxScale - minScale);
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

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-shopify-url]");
  if (!button) return;

  const url = button.getAttribute("href");
  if (!url || url === "#") {
    event.preventDefault();
    const originalText = button.textContent;
    button.textContent = "Product page coming soon";
    window.setTimeout(() => {
      button.textContent = originalText;
    }, 1600);
  }
});

document.querySelector(".cart-button")?.addEventListener("click", (event) => {
  const button = event.currentTarget;
  const originalLabel = button.getAttribute("aria-label");
  button.setAttribute("aria-label", "Cart coming soon");
  window.setTimeout(() => {
    button.setAttribute("aria-label", originalLabel || "Cart with 0 items");
  }, 1600);
});

if (newsletterForm && formStatus) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]');

    if (!email?.value || !email.checkValidity()) {
      formStatus.textContent = "Please enter a valid email address.";
      email?.focus();
      return;
    }

    formStatus.textContent = "Thanks. Email integration is ready to connect.";
    newsletterForm.reset();
  });
}

renderProducts();
renderMagnesiumContent();
renderRoutineCards();
renderSteps();
renderTrustRow();
renderFaqs();
initScrollZoom();
initScrollingWatermark();
