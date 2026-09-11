# Barbearia Batista

Homepage estática em HTML, CSS e JavaScript, com direção editorial de luxo.
O conceito completo está em `CONCEITO-VISUAL.md`.

## Abrir

Abra `index.html` no navegador ou execute na pasta:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:4173`. Não há dependências a instalar nem etapa de build.

## Arquivos

- `index.html`: conteúdo, metadados, seções e janelas acessíveis.
- `css/style.css`: cores, tipografia, componentes e cabeçalho.
- `css/sections.css`: composição das seções.
- `css/responsive.css`: adaptações para celular e tablet.
- `css/form-localizacao.css`: reserva, galeria ampliada e mapa.
- `css/animations.css`: transições e movimento reduzido.
- `js/data.js`: serviços, preços, galeria, horários e contatos.
- `js/main.js`: menu, reserva, galeria e conteúdo dinâmico.
- `js/form.js`: validação e preparação da conversa no WhatsApp.
- `js/whatsapp.js`: criação dos links do WhatsApp.
- `js/config.js` e `js/maps.js`: mapa opcional.
- `assets/images/batista-*.webp`: três imagens conceituais geradas com ImageGen.
- `assets/images/imagegen-manifest.json`: prompts exatos e metadados das imagens.

As fotografias, o texto estático e os links de reserva principais funcionam sem instalação. As fontes usam Google Fonts com alternativas locais Georgia/Arial. Com JavaScript desativado, o conteúdo principal fica visível, há um resumo dos serviços e os convites levam diretamente ao WhatsApp.

## Atualizar dados

Edite `js/data.js`. Telefone, endereço e coordenadas antigos eram exemplos e foram deixados vazios. O rodapé apresenta um contato de localização pelo WhatsApp até que haja endereço real. Os preços, horários, link oficial de WhatsApp e Instagram foram preservados.

O WhatsApp configurado é um link comercial curto (`wa.me/message/...`). A página acrescenta a mensagem preparada, mas o tratamento desse parâmetro depende do próprio WhatsApp. Para garantir o formato de conversa com número e mensagem, use `site.whatsapp = "https://wa.me/55DDDNÚMERO"` com o número real completo. A mensagem não é enviada automaticamente e não existe confirmação de disponibilidade no site.

As imagens são conceituais e essa indicação fica visível na galeria. Para usar fotos reais, substitua os WebP ou atualize os caminhos em HTML e `js/data.js`. Os arquivos de marca anteriores foram preservados.

## Mapa opcional

Preencha `site.address` e `site.coords`. O botão de localização abrirá uma janela com link de trajeto no Google Maps, mesmo sem chave.

Para o mapa incorporado, disponibilize `window.BARBEARIA_GMAPS_KEY` ou `window.VITE_GOOGLE_MAPS_API_KEY` antes dos scripts. Este é um site estático: arquivos `.env` não são carregados automaticamente. A chave de uma API de navegador fica visível no cliente; configure suas restrições de domínio e de API no Google Cloud.

## Interações

Menu móvel com fechamento por Escape, links internos, formulário de reserva com serviço pré-selecionado, validação de telefone e datas passadas, galeria com setas e Escape, foco visível e preferência por movimento reduzido. Os diálogos usam o elemento nativo `dialog` dos navegadores atuais.

Esta entrega atualiza apenas o projeto local. Não foi feita publicação externa.
