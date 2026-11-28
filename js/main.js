const root = document.documentElement;
const menu = document.querySelector("#nav-menu");
const menuButton = document.querySelector(".nav__toggle");
const themeButton = document.querySelector("#theme-toggle");
const emailLink = document.querySelector("#email-link");
const copyButton = document.querySelector("#copy-email");
const copyStatus = document.querySelector("#copy-status");
const form = document.querySelector("#contact-form");
const email = emailLink.getAttribute("href").replace("mailto:", "");

function setMenu(isOpen) {
  menu.classList.toggle("nav__links--open", isOpen);
  menuButton.setAttribute("aria-expanded", isOpen);
}

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  themeButton.setAttribute("aria-pressed", theme === "dark");
}

menuButton.addEventListener("click", () => setMenu(!menu.classList.contains("nav__links--open")));
menu.addEventListener("click", (event) => event.target.closest("a") && setMenu(false));

themeButton.setAttribute("aria-pressed", root.dataset.theme === "dark");
themeButton.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = `Copied ${email}`;
  } catch {
    copyStatus.textContent = email;
  }
  setTimeout(() => (copyStatus.textContent = ""), 3000);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { name, email: sender, message } = Object.fromEntries(new FormData(form));
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`${message}\n\n${name}\n${sender}`);
  location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  form.reset();
});
