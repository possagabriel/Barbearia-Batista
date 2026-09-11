// Conteúdo editável. Endereço, telefone e coordenadas antigos eram exemplos.
// Preencha os dados reais; sem endereço, a localização é consultada no WhatsApp.
const site = {
  name: "Barbearia Batista",
  tagline: "O tempo, bem cuidado.",
  whatsapp: "https://wa.me/message/7KEUTQIAZZIFM1",
  waMessage: "Olá! Gostaria de reservar uma experiência na Barbearia Batista.",
  instagram: "https://instagram.com/barbearia_batista_ofc",
  instagramHandle: "@barbearia_batista_ofc",
  owner: "Gusttavo Carvalho",
  phone: "",
  address: "",
  coords: null,
  // Horários preservados do projeto anterior. Confirme antes de publicar.
  hours: [
    { days: "Segunda a sexta", time: "09h às 20h" },
    { days: "Sábado", time: "08h às 19h" },
    { days: "Domingo", time: "Fechado" }
  ]
};

// Preços preservados do projeto anterior.
const services = [
  { id: 1, name: "Corte adulto", price: "R$ 45", description: "Tesoura, máquina e acabamento. Um corte que respeita o seu estilo." },
  { id: 3, name: "Barba", price: "R$ 30", description: "Toalha quente, desenho preciso e o cuidado da navalha." },
  { id: 2, name: "Corte infantil", price: "R$ 35", description: "O mesmo cuidado, desde cedo. Atenção e tranquilidade para os pequenos." },
  { id: 4, name: "Combo completo", price: "R$ 70", description: "Corte, barba e sobrancelha. O ritual completo, em cada detalhe." }
];

// Fotografias conceituais geradas para esta direção visual.
// Substitua pelos registros reais da barbearia quando disponíveis.
const gallery = [
  { src: "assets/images/batista-interior.webp", alt: "Ambiente conceitual de barbearia com cadeira de couro, espelhos e madeira escura", category: "A ATMOSFERA", caption: "Um convite à pausa" },
  { src: "assets/images/batista-ritual.webp", alt: "Still-life conceitual de navalha, pincel e toalha sobre madeira", category: "O RITUAL", caption: "A precisão do ofício" },
  { src: "assets/images/batista-detalhe.webp", alt: "Detalhe conceitual de couro e metais de uma cadeira de barbeiro", category: "A ESSÊNCIA", caption: "Feito para permanecer" }
];
