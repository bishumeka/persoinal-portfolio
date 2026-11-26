// 1. Mobile Navigation Toggle
const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".nav__link");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("nav__links--open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("nav__links--open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// 2. Dark / Light Theme Toggle with Moon & Sun Icons + localStorage
const themeToggle = document.querySelector("#theme-toggle");
const root = document.documentElement;

const moonIcon = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
`;

const sunIcon = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
`;

function applyTheme(theme) {
  const isDark = theme === "dark";
  root.setAttribute("data-theme", theme);
  if (themeToggle) {
    themeToggle.innerHTML = isDark ? sunIcon : moonIcon;
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }
}

const savedTheme = localStorage.getItem("portfolio-theme") || "light";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio-theme", nextTheme);
    applyTheme(nextTheme);
  });
}

// 3. Copy Email Button
const copyBtn = document.querySelector("#copy-email-btn");
const copyFeedback = document.querySelector("#copy-feedback");

if (copyBtn && copyFeedback) {
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
      copyFeedback.textContent = `Copied ${email} to clipboard!`;
    } catch {
      copyFeedback.textContent = `Email: ${email}`;
    }

    setTimeout(() => {
      copyFeedback.textContent = "";
    }, 3000);
  });
}

// 4. Contact Form Validation
const contactForm = document.querySelector("#contact-form");
const nameInput = document.querySelector("#contact-name");
const emailInput = document.querySelector("#contact-email");
const messageInput = document.querySelector("#contact-message");
const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");
const formStatus = document.querySelector("#form-status");

function setFieldError(input, errorEl, message) {
  errorEl.textContent = message;
  input.classList.toggle("form-input--invalid", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));
}

if (contactForm) {
  // Clear error as soon as the user starts fixing a field
  [
    [nameInput, nameError],
    [emailInput, emailError],
    [messageInput, messageError],
  ].forEach(([input, errorEl]) => {
    input.addEventListener("input", () => {
      setFieldError(input, errorEl, "");
      formStatus.textContent = "";
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Stop page reload so JS validates first

    let isValid = true;
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const messageVal = messageInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nameVal.length < 2) {
      setFieldError(nameInput, nameError, "Please enter at least 2 characters.");
      isValid = false;
    }

    if (!emailPattern.test(emailVal)) {
      setFieldError(emailInput, emailError, "Please enter a valid email address.");
      isValid = false;
    }

    if (messageVal.length < 10) {
      setFieldError(
        messageInput,
        messageError,
        "Please write a message of at least 10 characters."
      );
      isValid = false;
    }

    if (!isValid) return;

    formStatus.textContent = `Thanks, ${nameVal}! Your message has been validated.`;
    contactForm.reset();
  });
}