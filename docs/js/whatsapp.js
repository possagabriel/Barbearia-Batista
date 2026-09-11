function whatsappUrl(message = site.waMessage) {
  const url = new URL(site.whatsapp);
  url.searchParams.set("text", message);
  return url.href;
}

function initWhatsApp() {
  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    link.href = whatsappUrl(link.dataset.waMessage || site.waMessage);
  });
}
