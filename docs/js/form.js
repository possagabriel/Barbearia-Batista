(() => {
  const form = document.getElementById("budgetForm");
  const fields = ["budgetName", "budgetWhatsapp", "budgetCity", "budgetService", "budgetDate", "budgetTime"];
  const date = document.getElementById("budgetDate");
  const get = id => document.getElementById(id).value.trim();
  function today() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }
  date.min = today();
  function error(id) {
    const value = get(id);
    if (id === "budgetName" && value.length < 2) return "Informe seu nome, com pelo menos duas letras.";
    if (id === "budgetCity" && !value) return "Informe a sua cidade.";
    if (id === "budgetService" && !value) return "Escolha o serviço desejado.";
    if (id === "budgetWhatsapp") {
      let digits = value.replace(/\D/g, "");
      if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) digits = digits.slice(2);
      if (!/^[1-9]{2}9?\d{8}$/.test(digits)) return "Informe um telefone válido com DDD.";
    }
    if (id === "budgetDate" && value && value < today()) return "Escolha hoje ou uma data futura.";
    if (id === "budgetTime" && value && get("budgetDate") === today()) {
      const requested = new Date(`${get("budgetDate")}T${value}`);
      if (requested <= new Date()) return "Escolha um horário futuro.";
    }
    return "";
  }
  function validate(id) {
    const input = document.getElementById(id);
    const message = error(id);
    const output = document.getElementById(`${id}-error`);
    output.textContent = message;
    output.hidden = !message;
    if (message) {
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", output.id);
    } else {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }
    return !message;
  }
  fields.forEach(id => {
    const input = document.getElementById(id);
    for (const event of ["input", "change"]) input.addEventListener(event, () => {
      if (input.hasAttribute("aria-invalid")) validate(id);
      document.getElementById("budgetSuccess").hidden = true;
    });
    input.addEventListener("blur", () => { if (input.value) validate(id); });
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const summary = document.getElementById("budgetError");
    const success = document.getElementById("budgetSuccess");
    summary.hidden = true;
    success.hidden = true;
    const invalid = fields.filter(id => !validate(id));
    if (invalid.length) {
      summary.textContent = "Revise os campos indicados para continuar.";
      summary.hidden = false;
      document.getElementById(invalid[0]).focus();
      return;
    }
    const lines = ["Olá! Gostaria de reservar uma experiência na Barbearia Batista.", `Nome: ${get("budgetName")}`, `WhatsApp: ${get("budgetWhatsapp")}`, `Cidade: ${get("budgetCity")}`, `Serviço: ${get("budgetService")}`];
    if (get("budgetDate")) lines.push(`Data desejada: ${get("budgetDate").split("-").reverse().join("/")}`);
    if (get("budgetTime")) lines.push(`Horário desejado: ${get("budgetTime")}`);
    if (get("budgetMessage")) lines.push(`Preferências: ${get("budgetMessage")}`);
    const url = whatsappUrl(lines.join("\n"));
    document.getElementById("bookingContinue").href = url;
    // Open within the actual click, without a timer that could trigger popup blocking.
    // A prepared conversation is not proof of delivery or a confirmed appointment.
    try {
      window.open(url, "_blank", "noopener,noreferrer");
      success.hidden = false;
    } catch {
      success.hidden = false; // The visible link also works when popups are restricted.
    }
  });
})();
