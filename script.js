const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const signupForm = document.querySelector(".signup-panel form");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-shopify-url]").forEach((button) => {
  button.addEventListener("click", (event) => {
    const url = button.getAttribute("href");
    if (!url || url === "#") {
      event.preventDefault();
      button.textContent = "Checkout opening soon";
      window.setTimeout(() => {
        button.textContent = "Shop now";
      }, 1600);
    }
  });
});

if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = signupForm.querySelector("button");
    if (button) {
      button.textContent = "Joined";
    }
  });
}
