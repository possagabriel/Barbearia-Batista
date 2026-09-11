# Barbearia Batista — Landing Page

Site institucional (single page) da **Barbearia Batista** — cortes adulto e infantil,
barba e serviços especializados, com foco em conversão via WhatsApp.

## Estrutura

```
barbearia-batista/
├── index.html            → Estrutura semântica da página
├── css/
│   ├── style.css         → Variáveis, reset, botões, header
│   ├── sections.css      → Estilo de cada seção
│   ├── animations.css    → Fade-in (Intersection Observer) e animações
│   ├── responsive.css    → Mobile-first (768px e 1024px)
│   └── form-localizacao.css → Orçamento + Localização (Google Maps)
├── js/
│   ├── data.js           → TODOS OS DADOS EDITÁVEIS DO SITE
│   ├── whatsapp.js       → Configura os links do WhatsApp
│   ├── main.js           → Renderiza seções e ativa efeitos
│   ├── form.js           → Formulário de orçamento (validação e acessibilidade)
│   ├── config.js         → Chave da Google Maps (variável de ambiente)
│   └── maps.js           → Mapa interativo (Google Maps JavaScript API)
└── assets/
    ├── images/           → SVG placeholders (substitua pelos seus)
    ├── icons/            → Logo
    └── fonts/            → (opcional) fontes locais
```

## Como rodar localmente

O site é **100% estático** (HTML + CSS + JS vanilla). Funciona até abrindo o
`index.html` direto no navegador (duplo clique) — sem build, sem servidor.

Para desenvolvimento, um servidor simples também funciona:

```bash
# Opção 1 — Python
python3 -m http.server 8000
# abra em http://localhost:8000

# Opção 2 — Node
npx serve .
```

## Como atualizar o conteúdo

**Quase tudo fica em `js/data.js`.** Não precisa tocar em HTML, CSS ou JS para
atualizar serviços, preços, depoimentos, fotos, contatos ou horários.

| O que mudar | Onde em `js/data.js` |
|---|---|
| Preço ou nome de um serviço | array `services` |
| Adicionar/remover serviço | array `services` (é só adicionar um objeto) |
| Depoimentos | array `testimonials` |
| Fotos da galeria | array `gallery` (`src`, `alt`, `category`) |
| Link do WhatsApp | `site.whatsapp` |
| Instagram / endereço / telefone / horários | objeto `site` |

Os ícones disponíveis para serviços/diferenciais são:
`scissors`, `child`, `beard`, `sparkles`, `user`, `home`, `badge`.

**Fotos:** troque os SVGs em `assets/images/` pelas suas fotos reais
(WebP recomendado). Mantenha os mesmos nomes de arquivo ou atualize o caminho
em `js/data.js`.

## Deploy (gratuito)

- **Netlify:** arraste a pasta do site em <https://app.netlify.com/drop>.
- **Vercel:** `npx vercel` na raiz do projeto (framework: *Other*).
- **GitHub Pages:** suba a pasta para um repositório e ative Pages.

## Google Maps (Localização)

A seção de localização usa a **Google Maps JavaScript API** (chave própria — não é o
Google Meet). A chave **nunca fica no código**: ela é lida da variável de ambiente
`VITE_GOOGLE_MAPS_API_KEY`.

```bash
# crie o arquivo .env na raiz e preencha com a sua chave
cp .env.example .env
```

- Em builds Vite, a chave é obtida de `import.meta.env.VITE_GOOGLE_MAPS_API_KEY`
  (basta definir no `.env`).
- Em outro host, exponha a chave como global antes de `js/config.js`, por exemplo:

  ```html
  <script>window.VITE_GOOGLE_MAPS_API_KEY = "SUA_CHAVE";</script>
  ```

Se o mapa não carregar (chave ausente, bloqueio de rede, etc.), o site mostra uma
mensagem amigável e um botão "Abrir no Google Maps".

As coordenadas do marcador ficam em `js/data.js` → `site.coords`.

## Requisitos atendidos

- [x] 100% responsivo (mobile-first, breakpoints 768px/1024px)
- [x] Botão WhatsApp funcional em todas as CTAs + botão flutuante
- [x] Links de redes sociais ativos (Instagram e WhatsApp)
- [x] HTML semântico (`header`, `section`, `article`, `footer`)
- [x] Animação suave: fade-in ao rolar, hover, scroll suave
- [x] Lightbox na galeria (navegação por setas e teclado) + faixa de números animada
- [x] Link ativo no menu conforme a seção (scrollspy) + botão "voltar ao topo"
- [x] WhatsApp com mensagem pré-preenchida por serviço (`data-wa-message`)
- [x] Dados centralizados em `js/data.js` para fácil manutenção
- [x] Imagens com `loading="lazy"` e `filter` para identidade visual
- [x] Acessibilidade: foco visível, `aria-label`, conteúdo visível mesmo sem JS
