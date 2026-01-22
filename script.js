/* ================= MENU MOBILE ================= */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* ================= CONFIG PROMO ================= */
const PROMO_START_HOUR = 12; // début promo
const PROMO_END_HOUR = 24;  // fin promo
const PROMO_DISCOUNT = 10;  // pourcentage de réduction

/* ================= OUTILS ================= */
function isPromoActive() {
  const hour = new Date().getHours();
  return hour >= PROMO_START_HOUR && hour < PROMO_END_HOUR;
}

/* ================= PRIX PROMO ================= */
function applyPrices() {
  document.querySelectorAll(".product-card").forEach(card => {
    const priceEl = card.querySelector(".price");
    if (!priceEl) return;

    const originalPrice = parseInt(
      priceEl.dataset.original || priceEl.textContent.replace(/\D/g, ""),
      10
    );

    if (!originalPrice) return;

    priceEl.dataset.original = originalPrice;

    if (isPromoActive()) {
      const promoPrice = Math.floor(
        originalPrice * (1 - PROMO_DISCOUNT / 100)
      );

      priceEl.innerHTML = `
        <span class="price-old">${originalPrice.toLocaleString()} FCFA</span><br>
        <span class="price-new">${promoPrice.toLocaleString()} FCFA 🔥</span>
      `;
    } else {
      priceEl.textContent = `${originalPrice.toLocaleString()} FCFA / mois`;
    }
  });
}

/* ================= COMPTEUR PROMO ================= */
function startCountdown() {
  const display = document.getElementById("countdown");
  if (!display) return;

  setInterval(() => {
    if (!isPromoActive()) {
      display.textContent = "Promo terminée";
      return;
    }

    const now = new Date();
    const end = new Date();
    end.setHours(PROMO_END_HOUR, 0, 0, 0);

    const diff = end - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    display.textContent =
      `${String(h).padStart(2, "0")}:` +
      `${String(m).padStart(2, "0")}:` +
      `${String(s).padStart(2, "0")}`;
  }, 1000);
}

/* ================= WAVE ================= */
function toggleWaveButtons() {
  document.querySelectorAll(".wave-btn").forEach(btn => {
    btn.disabled = !isPromoActive();
    btn.classList.toggle("disabled", !isPromoActive());
    btn.textContent = isPromoActive()
      ? "Payer avec Wave"
      : "Wave disponible uniquement en promo";
  });
}

/* ================= WHATSAPP ================= */
function orderProduct(product) {
  const phone = "2250708779997";

  const message = `
Bonjour AGENT PREMIUM,

Je souhaite acheter : Produit : ${product}

Moyen de paiement souhaité :
- Wave
- Orange Money
- MTN MoMo

Merci de m’indiquer la procédure
`;

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

/* ================= LANCEMENT ================= */
applyPrices();
startCountdown();
toggleWaveButtons();

setInterval(() => {
  applyPrices();
  toggleWaveButtons();
}, 60000);

document.querySelectorAll(".faq-item h3").forEach(title => {
  title.addEventListener("click", () => {
    title.parentElement.classList.toggle("active");
  });
});

/* ================= ANIMATION AU SCROLL ================= */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".fade-up").forEach(el => {
  observer.observe(el);
});

/* ================= HEADER AU SCROLL ================= */
window.addEventListener("scroll", () => {
  const header = document.querySelector(".navbar");
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* ================= LOADER ================= */
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  loader.style.opacity = "0";
  setTimeout(() => loader.remove(), 400);
});
