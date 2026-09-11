// data.js
// Central de dados do site. Edite aqui para atualizar serviços, depoimentos e contatos.
// As seções são renderizadas automaticamente a partir destes arrays.

/* ==========================================================
   CONFIGURAÇÃO GERAL
   ========================================================== */
const site = {
  name: "Barbearia Batista",
  tagline: "Corte e estilo para toda a família",
  whatsapp: "https://wa.me/message/7KEUTQIAZZIFM1",
  waMessage: "Olá! Vim pelo site da Barbearia Batista e quero agendar um horário. 🪒",
  instagram: "https://instagram.com/barbearia_batista_ofc",
  instagramHandle: "@barbearia_batista_ofc",
  owner: "Gusttavo Carvalho",
  phone: "(11) 99999-9999",
  address: "Rua das Barbearias, 123 - Centro, São Paulo - SP",
  coords: { lat: -23.550520, lng: -46.633309 },
  hours: [
    { days: "Segunda a Sexta", time: "09h às 20h" },
    { days: "Sábado", time: "08h às 19h" },
    { days: "Domingo", time: "Fechado" }
  ]
};

/* ==========================================================
   NÚMEROS — faixa de estatísticas com contador animado.
   ========================================================== */
const stats = [
  { value: 12, suffix: "+", label: "Anos de tradição" },
  { value: 15000, suffix: "+", label: "Cortes realizados" },
  { value: 1000, suffix: "+", label: "Clientes atendidos" },
  { value: 4.9, suffix: "", decimals: 1, label: "Avaliação média" }
];

/* ==========================================================
   SERVIÇOS — cada card é renderizado automaticamente.
   icon: "scissors" | "child" | "beard" | "sparkles" | "clean" | "strokes"
   ========================================================== */
const services = [
  { id: 1, name: "Corte Adulto", price: "R$ 45", icon: "scissors", description: "Modelagem, tesoura e máquina com finalização caprichada." },
  { id: 2, name: "Corte Infantil", price: "R$ 35", icon: "child", description: "Atendimento especial para crianças, com paciência e diversão." },
  { id: 3, name: "Barba", price: "R$ 30", icon: "beard", description: "Desenho, toalha quente e acabamento na navalha." },
  { id: 4, name: "Combo Completo", price: "R$ 70", icon: "sparkles", description: "Corte + Barba + Sobrancelha. O pacote família inteira." }
];

/* ==========================================================
   DIFERENCIAIS — 3 pilares exibidos na seção "Diferenciais".
   ========================================================== */
const diferentials = [
  { id: 1, icon: "user", title: "Atendimento personalizado", text: "Cada corte é pensado para o formato do seu rosto e o seu estilo de vida." },
  { id: 2, icon: "home", title: "Ambiente familiar", text: "Espaço acolhedor onde pais e filhos se sentem em casa. Sempre." },
  { id: 3, icon: "badge", title: "Profissionais experientes", text: "Equipe qualificada e atenta às tendências, com anos de prática na navalha." }
];

/* ==========================================================
   DEPOIMENTOS — nome, cidade, texto e foto (SVG placeholder ou real).
   ========================================================== */
const testimonials = [
  { name: "João Silva", role: "Cliente há 3 anos", text: "Melhor barbearia da região, atendimento impecável e preço justo. Já virei freguês fiel.", photo: "client-1.svg" },
  { name: "Carlos Eduardo", role: "Pai do Pedro (7 anos)", text: "Meu filho adorou o corte infantil, super atenciosos e pacientes. Vira e mexe ele pede pra voltar.", photo: "client-2.svg" },
  { name: "Marcos Vinícius", role: "Cliente amante de barba", text: "A barba ficou perfeita, desenho impecável. Ambiente de verdade, do jeito que barbearia tem que ser.", photo: "client-3.svg" },
  { name: "Ricardo Almeida", role: "Cliente Combo", text: "Combo completo impecável. Saio daqui pronto pra qualquer ocasião. Recomendo de olhos fechados.", photo: "client-4.svg" }
];

/* ==========================================================
   GALERIA — fotos dos trabalhos. Use caminho para sua imagem
   ou mantenha os placeholders SVG (estilo preto e branco).
   ========================================================== */
const gallery = [
  { src: "assets/images/gallery/corte-1.svg", alt: "Corte adulto degradê", category: "Adulto" },
  { src: "assets/images/gallery/corte-2.svg", alt: "Barba desenhada", category: "Barba" },
  { src: "assets/images/gallery/corte-3.svg", alt: "Corte infantil", category: "Infantil" },
  { src: "assets/images/gallery/corte-4.svg", alt: "Corte social com barba", category: "Adulto" },
  { src: "assets/images/gallery/corte-5.svg", alt: "Corte kids", category: "Infantil" },
  { src: "assets/images/gallery/corte-6.svg", alt: "Degradê navalhado", category: "Adulto" }
];