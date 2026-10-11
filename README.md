# HAZE Soluções Digitais

Site institucional da HAZE em **Next.js (App Router) + React + TypeScript**, reconstruído a partir do
`index.html` original (https://haze-pi.vercel.app/) mantendo o mesmo visual, animações e conteúdo.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

Variáveis opcionais (veja `.env.example`): `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_WHATSAPP_NUMBER`.

## Estrutura

```text
app/               layout (fontes, SEO, JSON-LD), página, ícones, robots e sitemap
components/
  layout/          Navbar, Footer, PageLoader, ScrollProgress, WhatsAppFloat, FilmGrain
  sections/        Hero, Parceiros, RoboSpline, ParticleText, Marquee, Servicos,
                   Portfolio, Sobre, Numeros, Manifesto, Valores, Contato
  chat/            Chat do robô HAZE (provider, modal, robô em CSS)
  ui/              Reveal, MagneticLink, ícones
data/site.ts       TODO o conteúdo editável (textos, links, números, listas)
hooks/             useInViewOnce, useDelayedFlag, useScrollEffect, useHazeConversation...
lib/               utilitários (WhatsApp, particle-text, cx)
styles/            CSS global dividido por seção (importado em ordem por globals.css)
public/images/     hero, robô, serviços e portfólio (WebP otimizado)
legacy/            arquivos do rascunho antigo "consultoria" (fora do build/lint)
```

## Como editar

- **Textos, links, WhatsApp, e-mail, números e listas:** `data/site.ts`.
- **Imagens:** substitua os arquivos em `public/images/*` mantendo os nomes (ou ajuste `data/site.ts`).
- **Visual:** `styles/NN-secao.css` (a ordem dos imports em `styles/globals.css` importa).

## Notas

- O robô 3D usa o viewer da Spline (`unpkg.com` + `prod.spline.design`); sem internet ele não aparece.
- Fontes (Barlow Condensed e Open Sans) são servidas pelo `next/font` (baixadas no build).
- Sem JavaScript o conteúdo continua visível (`<noscript>` no layout).
