// main.js
// Renderiza as seções dinâmicas a partir de js/data.js e ativa os efeitos da página.
// Para atualizar o conteúdo do site, edite APENAS em js/data.js — nada aqui precisa ser mexido.
// Scripts clássicos (sem ES Modules), então funcionam mesmo abrindo o index.html direto.

/* ==========================================================
   ÍCONES — stroke fino (estilo Feather/Lucide)
   ========================================================== */
const I = {
  scissors: '<circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line>',
  child: '<path d="M12 4a2 2 0 1 0-2-2 2 2 0 0 0 2 2z"></path><path d="M12 6v6"></path><path d="M7 12h6a5 5 0 0 1 5 5v1H9a2 2 0 0 1-2-2v-4z"></path>',
  beard: '<ellipse cx="12" cy="12" rx="6" ry="10"></ellipse><path d="M8 8h8"></path><path d="M8 16h8"></path><path d="M6 12h12"></path>',
  sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"></path><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"></path>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
  badge: '<circle cx="12" cy="9" r="6"></circle><path d="M9 14.5L7 21l5-3 5 3-2-6.5"></path>',
  arrow: '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>'
};

const icon = (name, size = 26) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name] || ""}</svg>`;

/* ==========================================================
   RENDERIZAÇÃO DAS SEÇÕES
   ========================================================== */
function renderServices() {
  const grid = document.getElementById("servicesGrid");
  grid.innerHTML = services.map((s) => `
    <article class="card card--service reveal">
      <span class="card__icon">${icon(s.icon)}</span>
      <h3>${s.name}</h3>
      <p>${s.description}</p>
      <span class="card__price">${s.price}</span>
      <a class="card__link" target="_blank" rel="noopener" data-whatsapp
         data-wa-message="Olá! Quero agendar o serviço *${s.name}* (${s.price}). Qual o melhor horário?"
         href="#">
        Agendar ${icon("arrow", 16)}
      </a>
    </article>`).join("");
}

function renderFeatures() {
  const grid = document.getElementById("featuresGrid");
  grid.innerHTML = diferentials.map((f) => `
    <article class="feature card reveal">
      <span class="card__icon">${icon(f.icon)}</span>
      <h3>${f.title}</h3>
      <p>${f.text}</p>
    </article>`).join("");
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = gallery.map((g) => `
    <figure class="gallery__item reveal">
      <img src="${g.src}" alt="${g.alt}" loading="lazy">
      <figcaption class="gallery__tag">${g.category}</figcaption>
    </figure>`).join("");
}

function renderTestimonials() {
  const grid = document.getElementById("testimonialsGrid");
  grid.innerHTML = testimonials.map((t) => `
    <article class="testimonial reveal">
      <p class="testimonial__quote">"${t.text}"</p>
      <div class="testimonial__author">
        <img class="testimonial__photo" src="assets/images/${t.photo}" alt="Foto de ${t.name}" loading="lazy">
        <div>
          <p class="testimonial__name">${t.name}</p>
          <p class="testimonial__role">${t.role}</p>
        </div>
      </div>
    </article>`).join("");
}

function renderStats() {
  const grid = document.getElementById("statsGrid");
  grid.innerHTML = stats.map((s) => `
    <div class="stat reveal">
      <span class="stat__value" data-count="${s.value}" data-decimals="${s.decimals || 0}">0${s.decimals ? `.${"0".repeat(s.decimals)}` : ""}</span><span class="stat__suffix">${s.suffix}</span>
      <span class="stat__label">${s.label}</span>
    </div>`).join("");
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      observer.unobserve(el);
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals, 10) || 0;
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = decimals
          ? val.toFixed(decimals)
          : Math.round(val).toLocaleString("pt-BR");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".stat__value").forEach((el) => observer.observe(el));
}

function renderFooter() {
  document.getElementById("hoursList").innerHTML = site.hours.map((h) => `
    <li><span>${h.days}</span><span class="hours__time">${h.time}</span></li>`).join("");

  document.getElementById("footerAddress").textContent = site.address;
  document.getElementById("footerMaps").href =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
  document.getElementById("footerMaps").setAttribute("aria-label", `Ver endereço no Google Maps: ${site.address}`);
  document.getElementById("footerPhone").href = `tel:${site.phone.replace(/[^+\d]/g, "")}`;
  document.getElementById("footerPhone").textContent = site.phone;
  document.getElementById("footerInstagram").href = site.instagram;
  document.getElementById("footerInstagramName").textContent = site.instagramHandle;
  document.getElementById("footerCopy").textContent =
    `© ${new Date().getFullYear()} ${site.name} — Todos os direitos reservados.`;
}

/* ==========================================================
   EFEITOS
   ========================================================== */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
  });
}

function initHeader() {
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMenu() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("navMenu");

  const close = () => {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", close)
  );
}

/* Destaque do link ativo conforme a seção visível (scrollspy) */
function initScrollSpy() {
  const links = [...document.querySelectorAll(".nav__link")];
  const map = new Map(links.map((l) => [l.getAttribute("href").slice(1), l]));

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.remove("active"));
        const link = map.get(entry.target.id);
        if (link) link.classList.add("active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  map.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  });
}

/* Lightbox da galeria */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const img = lightbox.querySelector(".lightbox__img");
  const cap = lightbox.querySelector(".lightbox__caption");
  const items = [...document.querySelectorAll(".gallery__item")];
  const prev = lightbox.querySelector("[data-lb='prev']");
  const next = lightbox.querySelector("[data-lb='next']");
  const close = lightbox.querySelector("[data-lb='close']");
  let index = 0;

  const show = (i) => {
    index = (i + items.length) % items.length;
    const item = items[index];
    img.src = item.querySelector("img").src;
    cap.textContent = item.querySelector(".gallery__tag").textContent;
  };

  const open = (i) => {
    show(i);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLb = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  items.forEach((item, i) => item.addEventListener("click", () => open(i)));
  prev.addEventListener("click", () => show(index - 1));
  next.addEventListener("click", () => show(index + 1));
  close.addEventListener("click", closeLb);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLb();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
}

/* Botão voltar ao topo */
function initToTop() {
  const btn = document.getElementById("toTop");
  const onScroll = () => btn.classList.toggle("visible", window.scrollY > 600);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

/* Efeito tilt 3D nos cards (serviços e diferenciais) */
function initTilt() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = window.matchMedia("(hover: none)").matches;
  if (reduced || touch) return;

  const cards = document.querySelectorAll(".card--service, .feature");
  cards.forEach((card) => {
    card.classList.add("tilt");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      card.style.setProperty("--rx", `${(0.5 - py) * 10}deg`);
      card.style.setProperty("--ry", `${(px - 0.5) * 10}deg`);
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

/* ==========================================================
   BOOT
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderFeatures();
  renderStats();
  renderGallery();
  renderTestimonials();
  renderFooter();
  initWhatsApp();
  initReveal();
  initCounters();
  initHeader();
  initMenu();
  initScrollSpy();
  initLightbox();
  initToTop();
  initTilt();
});