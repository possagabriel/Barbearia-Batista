// config.js — Configuração de variáveis de ambiente.
// A chave da Google Maps NUNCA fica no código deste site.
// Ela pode chegar por dois caminhos:
//   1. Variável de ambiente VITE_GOOGLE_MAPS_API_KEY, disponibilizada no
//      navegador como uma global com o mesmo nome (builds Vite/deploy);
//   2. variável global injetada externamente: window.VITE_GOOGLE_MAPS_API_KEY.
// Exemplo prático com Vite: `VITE_GOOGLE_MAPS_API_KEY=xxx` no arquivo .env
// passa a ser exposta em import.meta.env — para este projeto estático, basta
// expô-la como global antes deste script ou via window abaixo.

window.BARBEARIA_GMAPS_KEY =
  window.BARBEARIA_GMAPS_KEY ||
  (typeof window.VITE_GOOGLE_MAPS_API_KEY !== "undefined"
    ? window.VITE_GOOGLE_MAPS_API_KEY
    : "") ||
  "";