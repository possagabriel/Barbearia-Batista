// form.js — Formulário "Marcar um corte": validação, acessibilidade e estados.
// Campos obrigatórios: Nome, WhatsApp, Cidade e Serviço desejado.
// Data, horário e mensagem são opcionais.
// O envio simulado abre o WhatsApp com a mensagem completa do agendamento (site.whatsapp).

(function () {
  const form = document.getElementById("budgetForm");
  if (!form) return;

  const submitBtn = document.getElementById("budgetSubmit");
  const spinner = submitBtn ? submitBtn.querySelector(".budget__spinner") : null;
  const label = submitBtn ? submitBtn.querySelector(".budget__submit-label") : null;
  const successMsg = document.getElementById("budgetSuccess");
  const errorMsg = document.getElementById("budgetError");

  const fields = ["budgetName", "budgetWhatsapp", "budgetCity", "budgetService"];
  const optional = ["budgetDate", "budgetTime", "budgetMessage"];

  const errorFor = (id) => document.getElementById(id + "-error");

  function setError(id, message) {
    const input = document.getElementById(id);
    const err = errorFor(id);
    if (!input) return;
    err.textContent = "";
    err.hidden = true;
    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
    if (!message) return;
    err.textContent = message;
    err.hidden = false;
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", id + "-error");
  }

  function markValid(id) {
    const input = document.getElementById(id);
    if (!input) return;
    errorFor(id).hidden = true;
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
  }

  function onlyDigits(value) {
    return value.replace(/\D/g, "");
  }

  function isValidWhatsapp(value) {
    let digits = onlyDigits(value);
    if (digits.length === 13 && digits.startsWith("55")) digits = digits.slice(2);
    if (digits.length === 12 && digits.startsWith("55")) digits = digits.slice(2);
    return /^[1-9]{2}9?\d{8}$/.test(digits);
  }

  function validateField(id) {
    const input = document.getElementById(id);
    const value = input ? input.value.trim() : "";
    if (id === "budgetName") {
      if (!value) return "Por favor, informe o seu nome.";
      if (value.length < 2) return "O nome precisa de pelo menos 2 caracteres.";
    }
    if (id === "budgetWhatsapp") {
      if (!value) return "Por favor, informe o seu WhatsApp.";
      if (!isValidWhatsapp(value))
        return "WhatsApp inválido. Use o formato (11) 99999-9999 e inclua o DDD.";
    }
    if (id === "budgetCity") {
      if (!value) return "Por favor, informe a sua cidade.";
    }
    if (id === "budgetService") {
      if (!value) return "Por favor, selecione o serviço desejado.";
    }
    return "";
  }

  function validateAll() {
    let firstInvalid = null;
    let hasError = false;
    fields.forEach((id) => {
      const msg = validateField(id);
      if (msg) {
        setError(id, msg);
        hasError = true;
        if (!firstInvalid) firstInvalid = document.getElementById(id);
      } else {
        markValid(id);
      }
    });
    return { hasError, firstInvalid };
  }

  function buildMessage() {
    const g = (id) => (document.getElementById(id) ? document.getElementById(id).value.trim() : "");
    const lines = [
      "Olá! Vim pelo site da Barbearia Batista e quero marcar um corte. 🪒",
      "Nome: " + g("budgetName"),
      "WhatsApp: " + g("budgetWhatsapp"),
      "Cidade: " + g("budgetCity"),
      "Serviço desejado: " + g("budgetService")
    ];
    if (g("budgetDate")) lines.push("Data do corte: " + formatDate(g("budgetDate")));
    if (g("budgetTime")) lines.push("Horário: " + g("budgetTime"));
    if (g("budgetMessage")) lines.push("Mensagem: " + g("budgetMessage"));
    return lines.join("\n");
  }

  function formatDate(value) {
    const parts = value.split("-");
    if (parts.length !== 3) return value;
    return parts[2] + "/" + parts[1] + "/" + parts[0];
  }

  function cleanOptional() {
    optional.forEach((id) => {
      const input = document.getElementById(id);
      if (input) {
        input.value = "";
        input.classList.remove("is-valid");
      }
    });
  }

  function setLoading(on) {
    if (!submitBtn) return;
    submitBtn.disabled = on;
    form.setAttribute("aria-busy", on ? "true" : "false");
    if (spinner) spinner.hidden = !on;
    if (label) label.textContent = on ? "Enviando..." : "Marcar corte pelo WhatsApp";
  }

  function resetForm() {
    form.reset();
    fields.forEach((id) => {
      markValid(id);
      const input = document.getElementById(id);
      if (input) input.classList.remove("is-valid");
    });
    cleanOptional();
  }

  function show(msg, on) {
    if (msg) msg.hidden = !on;
  }

  submitBtn.addEventListener("click", (e) => {
    if (submitBtn.disabled) {
      e.preventDefault();
      return;
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;

    show(successMsg, false);
    show(errorMsg, false);

    const { hasError, firstInvalid } = validateAll();
    if (hasError) {
      show(errorMsg, true);
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    setLoading(true);

    const message = buildMessage();
    const base = (typeof site !== "undefined" && site.whatsapp) || "";
    const url = base
      ? base + (base.indexOf("?") === -1 ? "?" : "&") + "text=" + encodeURIComponent(message)
      : "";

    window.setTimeout(() => {
      try {
        if (url) window.open(url, "_blank", "noopener,noreferrer");
        show(successMsg, true);
        show(errorMsg, false);
        resetForm();
      } catch (err) {
        show(successMsg, false);
        show(errorMsg, true);
      } finally {
        setLoading(false);
      }
    }, 900);
  });

  fields.forEach((id) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener("input", () => {
      if (!input.getAttribute("aria-invalid")) return;
      const msg = validateField(id);
      if (msg) setError(id, msg);
      else markValid(id);
    });
    input.addEventListener("blur", () => {
      if (!input.value.trim()) return;
      const msg = validateField(id);
      if (msg) setError(id, msg);
      else markValid(id);
    });
  });
})();