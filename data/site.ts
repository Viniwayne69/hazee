/**
 * Conteúdo e configuração do site HAZE.
 * Todo texto editável da página fica neste arquivo.
 */

export const SITE = {
  name: "HAZE",
  legalName: "HAZE Soluções Digitais",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://haze-pi.vercel.app",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5516988589448",
  instagram: "https://instagram.com/hazeagencia",
  email: "contato@hazeagencia.com",
  title: "HAZE Soluções Digitais — Tecnologia e Presença para o Comércio Local",
  description:
    "A HAZE oferece soluções digitais completas para o comércio local. Gestão financeira, tráfego pago, identidade visual, presença digital e treinamento de vendas em um único ecossistema.",
} as const;

export const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#contato", label: "Contato" },
] as const;

export const FOOTER_NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#contato", label: "Contato" },
] as const;

/* ── Hero ───────────────────────────────────────── */

export const HERO_SLIDES = [
  { id: 1, desktop: "/images/hero/desktop-1.webp", mobile: "/images/hero/mobile-1.webp" },
  { id: 2, desktop: "/images/hero/desktop-2.webp", mobile: "/images/hero/mobile-2.webp" },
  { id: 3, desktop: "/images/hero/desktop-3.webp", mobile: "/images/hero/mobile-3.webp" },
] as const;

export const HERO_TAGLINE = "Soluções Digitais";

/* ── Parceiros ──────────────────────────────────── */

export type PartnerId =
  | "meta"
  | "google-ads"
  | "linkedin"
  | "mlabs"
  | "adobe"
  | "rd-station"
  | "hotmart"
  | "mailchimp"
  | "hubspot"
  | "figma"
  | "notion"
  | "canva";

export const PARTNERS: ReadonlyArray<{ id: PartnerId; name: string; type: string }> = [
  { id: "meta", name: "Meta", type: "Business Partner" },
  { id: "google-ads", name: "Google Ads", type: "Certified Partner" },
  { id: "linkedin", name: "LinkedIn", type: "Marketing Partner" },
  { id: "mlabs", name: "mLabs", type: "Partner" },
  { id: "adobe", name: "Adobe", type: "Creative Cloud Partner" },
  { id: "rd-station", name: "RD Station", type: "Partner" },
  { id: "hotmart", name: "Hotmart", type: "Partner" },
  { id: "mailchimp", name: "Mailchimp", type: "Partner" },
  { id: "hubspot", name: "HubSpot", type: "Partner" },
  { id: "figma", name: "Figma", type: "Partner" },
  { id: "notion", name: "Notion", type: "Partner" },
  { id: "canva", name: "Canva", type: "Partner" },
];

/* ── Robô / Spline ──────────────────────────────── */

export const SPLINE = {
  scene: "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
  viewerScript: "https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js",
  label: "Estratégia + Estética",
  headline: ["Construímos marcas que", "as pessoas reconhecem e desejam"],
} as const;

/* ── Texto em partículas ────────────────────────── */

export const PARTICLE_WORDS_DESKTOP = [
  "HAZE",
  "DESIGN",
  "LEGADO",
  "IDENTIDADE",
  "ESTRATÉGIA",
  "CRIAÇÃO",
] as const;

export const PARTICLE_WORDS_MOBILE = [
  "HAZE",
  "GESTÃO",
  "PRESENÇA",
  "TRÁFEGO",
  "IDENTIDADE",
  "RESULTADO",
] as const;

/* ── Marquees ───────────────────────────────────── */

export const MARQUEE_TOP = [
  "Branding",
  "Identidade Visual",
  "Direção Criativa",
  "Posicionamento",
  "Tom de Voz",
  "Presença Digital",
  "Estratégia de Marca",
  "Percepção",
] as const;

export const MARQUEE_BOTTOM = [
  "Logotipo",
  "Naming",
  "Paleta de Cores",
  "Tipografia",
  "Manual de Marca",
  "Campanha Visual",
  "Social Media",
  "Rebranding",
] as const;

/* ── Serviços ───────────────────────────────────── */

export const SERVICES_HEADLINE = "As soluções HAZE.";
export const SERVICES_DESCRIPTION =
  "Cinco ferramentas integradas para organizar, atrair, apresentar, treinar e fortalecer o seu negócio local.";

/** Cards exibidos na galeria (os 5 primeiros itens de SERVICE_SLIDES). */
export const SERVICE_CARDS = [
  { alt: "HazeFlow", label: "HazeFlow — Gestão Financeira" },
  { alt: "HazeLink", label: "HazeLink — Cartão Digital com Vídeo" },
  { alt: "HazeMind", label: "HazeMind — Mentoria de Vendas" },
  { alt: "HazeAds", label: "HazeAds — Tráfego Pago" },
  { alt: "HazeLook", label: "HazeLook — Identidade Visual" },
] as const;

/** Imagens do lightbox (inclui peças além dos cards). */
export const SERVICE_SLIDES = Array.from({ length: 8 }, (_, i) => ({
  src: `/images/servicos/k${i + 1}.webp`,
  width: 1086,
  height: 1448,
}));

/* ── Portfólio ──────────────────────────────────── */

export const PORTFOLIO_TITLE = { before: "Páginas Feitas", middle: "para ", highlight: "Vender" } as const;
export const PORTFOLIO_SUBTITLE =
  "Do conceito visual à conversão real, cada página construída com estratégia, estética e foco em resultado.";

export const PORTFOLIO_SLIDES = Array.from({ length: 14 }, (_, i) => {
  const isWide = i >= 10; // n11–n14 vêm em outra proporção
  return {
    src: `/images/portfolio/n${i + 1}.webp`,
    alt: `Projeto HAZE ${i + 1}`,
    width: isWide ? 1086 : 941,
    height: isWide ? 1448 : 1672,
  };
});

/* ── Sobre ──────────────────────────────────────── */

export const ABOUT_PARAGRAPHS = [
  "A HAZE é uma empresa de soluções digitais pensada para o comércio local, reunindo em um único ecossistema tudo o que o pequeno e médio negócio precisa para organizar, crescer e aparecer.",
  "São cinco soluções integradas, cada uma com um papel claro, organizar o financeiro, gerar tráfego pago, construir identidade visual, treinar a equipe de vendas e criar uma presença digital que representa de verdade.",
  "Se você tem um negócio local e quer crescer com estrutura e método, você está no lugar certo.",
] as const;

export type IconId = "compass" | "venn" | "arrow" | "target" | "sun" | "eye" | "infinity" | "diamond";

export const PILLARS: ReadonlyArray<{ icon: IconId; name: string; description: string }> = [
  {
    icon: "compass",
    name: "Organização",
    description:
      "Negócio organizado vende mais, e a HAZE começa pelo financeiro e operacional para criar uma base sólida antes de qualquer outra coisa.",
  },
  {
    icon: "venn",
    name: "Visibilidade",
    description:
      "Produto bom merece ser visto, e tráfego pago com presença digital colocam o seu negócio na frente de quem quer comprar.",
  },
  {
    icon: "arrow",
    name: "Identidade",
    description:
      "A imagem que o seu negócio passa vale mais do que qualquer argumento de venda, e a HAZE cuida disso com método.",
  },
  {
    icon: "target",
    name: "Resultado",
    description:
      "Cada solução existe para gerar retorno real, mais vendas, mais clientes e mais autoridade no seu mercado.",
  },
];

/* ── Números ────────────────────────────────────── */

export const STATS = [
  { value: 50, suffix: "+", label: "negócios atendidos" },
  { value: 5, suffix: "", label: "soluções integradas" },
  { value: 3, suffix: "+", label: "anos no mercado" },
  { value: 100, suffix: "%", label: "foco no seu negócio" },
] as const;

/* ── Valores ────────────────────────────────────── */

export const VALUES: ReadonlyArray<{ icon: IconId; title: string; description: string }> = [
  {
    icon: "sun",
    title: "Clareza",
    description:
      "Cada hora do seu negócio conta, e a HAZE entrega soluções diretas, ágeis e com resultado visível desde o primeiro momento.",
  },
  {
    icon: "compass",
    title: "Estratégia",
    description:
      "Antes de atrair cliente, é preciso saber quem você quer atrair, e cada solução da HAZE é pensada para o momento certo do seu negócio.",
  },
  {
    icon: "eye",
    title: "Estética",
    description:
      "A primeira impressão é visual, e um negócio com identidade forte transmite confiança e atrai clientes antes de dizer uma palavra.",
  },
  {
    icon: "target",
    title: "Presença",
    description:
      "Estar onde o seu cliente está, no digital, no WhatsApp, no Google, é o que multiplica oportunidades e acelera o crescimento do seu negócio.",
  },
  {
    icon: "infinity",
    title: "Percepção",
    description:
      "Como o seu negócio é percebido define quanto as pessoas estão dispostas a pagar, e a HAZE trabalha essa percepção com intenção e método.",
  },
  {
    icon: "diamond",
    title: "Resultado",
    description:
      "Com métricas claras, cada solução da HAZE tem um propósito definido, e esse propósito é crescimento real e consistente para o seu negócio.",
  },
];

/* ── Chat do robô ───────────────────────────────── */

export const CHAT_INVITE = {
  name: "HAZE",
  message: ["Olá, eu sou o Haze,", "quem é você?"],
  cta: "Clique aqui e me fale de você →",
} as const;

/* ── Mensagens de WhatsApp ──────────────────────── */

export const WHATSAPP_MESSAGES = {
  float: "Olá, vim pelo site da HAZE e quero saber mais",
  contact: "Olá, vim pelo site da HAZE e quero saber mais sobre os serviços",
  footer: "Olá, vim pelo site da HAZE",
} as const;
