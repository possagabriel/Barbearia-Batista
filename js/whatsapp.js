// whatsapp.js
// Configura todos os links [data-whatsapp] usando o link oficial da barbearia.
// Para abrir com mensagem pré-preenchida, adicione o atributo:
//   data-wa-message="Texto da mensagem"  (senão usa a mensagem padrão de `site.waMessage`)

function initWhatsApp() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    const msg = link.dataset.waMessage || site.waMessage;
    link.setAttribute("href", site.whatsapp + "?text=" + encodeURIComponent(msg));
  });
}