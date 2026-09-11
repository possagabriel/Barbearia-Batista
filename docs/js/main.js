// Scripts clássicos: a homepage funciona também aberta pelo index.html.
(() => {
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const booking = document.getElementById("bookingDialog");
  const serviceSelect = document.getElementById("budgetService");

  document.getElementById("servicesGrid").innerHTML = services.map((service, index) => `
    <article class="service">
      <span class="service__number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
      <div><h3>${escape(service.name)}</h3><p>${escape(service.description)}</p></div>
      <div class="service__action"><span class="service__price">${escape(service.price)}</span><a class="service__reserve" data-reserve data-service="${service.id}" href="${escape(whatsappUrl(`Olá! Gostaria de reservar ${service.name}.`))}" aria-label="Reservar ${escape(service.name)}">Reservar <span aria-hidden="true">↗</span></a></div>
    </article>`).join("");
  services.forEach(service => serviceSelect.add(new Option(service.name, service.name)));
  serviceSelect.add(new Option("Outro atendimento", "Outro atendimento"));

  document.getElementById("galleryGrid").innerHTML = gallery.map((photo, index) => `
    <figure class="gallery__item reveal"><button class="gallery__button" data-photo="${index}" aria-label="Ampliar fotografia: ${escape(photo.caption)}"><img src="${escape(photo.src)}" alt="${escape(photo.alt)}" width="${index === 1 ? 1024 : 1536}" height="${index === 1 ? 1536 : 1024}" loading="lazy"><span class="gallery__zoom" aria-hidden="true">+</span></button><figcaption><span>${String(index + 1).padStart(2, "0")} / ${escape(photo.category)}</span><span>${escape(photo.caption)}</span></figcaption></figure>`).join("");

  document.getElementById("hoursList").innerHTML = site.hours.map(hours => `<li><span>${escape(hours.days)}</span><span class="hours__time">${escape(hours.time)}</span></li>`).join("");
  document.getElementById("footerInstagram").href = site.instagram;
  document.getElementById("footerCopy").textContent = `© ${new Date().getFullYear()} ${site.name}. Todos os direitos reservados.`;
  if (site.phone) {
    const phone = document.getElementById("footerPhone");
    phone.href = `tel:${site.phone.replace(/[^+\d]/g, "")}`;
    phone.textContent = site.phone;
    phone.hidden = false;
  }
  const locationLink = document.getElementById("footerMaps");
  if (site.address) {
    document.getElementById("footerAddress").textContent = site.address;
    locationLink.innerHTML = 'Como chegar <span aria-hidden="true">↗</span>';
    locationLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.name + " " + site.address)}`;
    locationLink.addEventListener("click", event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      document.getElementById("locationDialog").showModal();
    });
  } else {
    locationLink.href = whatsappUrl("Olá! Gostaria de consultar o endereço da Barbearia Batista.");
  }
  initWhatsApp();

  document.querySelectorAll("[data-reserve]").forEach(link => link.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (link.dataset.service) {
      const selected = services.find(service => String(service.id) === link.dataset.service);
      if (selected) {
        serviceSelect.value = selected.name;
        serviceSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
    document.getElementById("budgetSuccess").hidden = true;
    booking.showModal();
  }));

  // Native dialogs keep focus inside, close with Escape, and restore the opener.
  document.querySelectorAll("dialog").forEach(dialog => {
    dialog.querySelectorAll("[data-close-dialog], [data-lb=close]").forEach(button => button.addEventListener("click", () => dialog.close()));
    dialog.addEventListener("click", event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
  });

  const lightbox = document.getElementById("lightbox");
  let photoIndex = 0;
  function showPhoto(index) {
    photoIndex = (index + gallery.length) % gallery.length;
    const photo = gallery[photoIndex];
    const image = document.getElementById("lightboxImage");
    image.src = photo.src;
    image.alt = photo.alt;
    document.getElementById("lightboxCaption").textContent = `${photo.category} — ${photo.caption}`;
    document.getElementById("lightboxCount").textContent = `${photoIndex + 1} / ${gallery.length}`;
  }
  document.querySelectorAll("[data-photo]").forEach(button => button.addEventListener("click", () => {
    showPhoto(Number(button.dataset.photo));
    lightbox.showModal();
  }));
  lightbox.querySelector("[data-lb=prev]").addEventListener("click", () => showPhoto(photoIndex - 1));
  lightbox.querySelector("[data-lb=next]").addEventListener("click", () => showPhoto(photoIndex + 1));
  lightbox.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showPhoto(photoIndex + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });

  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("navMenu");
  toggle.hidden = false;
  document.querySelector(".header").classList.add("menu-ready");
  function closeMenu(restoreFocus = false) {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav.classList.contains("open")) closeMenu(true);
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".header")) closeMenu();
  });
  document.querySelector(".header").addEventListener("focusout", event => {
    if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
  });
  matchMedia("(min-width: 851px)").addEventListener("change", () => closeMenu());

  if ("IntersectionObserver" in window) {
    const links = [...nav.querySelectorAll(".nav__link")];
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-20% 0px -55% 0px" });
    links.forEach(link => { const section = document.querySelector(link.hash); if (section) spy.observe(section); });

    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reveal = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          reveal.unobserve(entry.target);
        });
      }, { threshold: 0.07 });
      document.querySelectorAll(".reveal").forEach(element => {
        if (element.getBoundingClientRect().top > innerHeight) element.classList.add("is-pending");
        reveal.observe(element);
      });
    }
  }
})();
