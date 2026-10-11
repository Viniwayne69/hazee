/**
 * Efeito de texto em partículas: cada palavra é rasterizada num canvas
 * invisível, amostrada em pontos, e as partículas voam até formar o texto.
 */

type Rgb = { r: number; g: number; b: number };
type Vec = { x: number; y: number };

export const PARTICLE_COLORS: readonly Rgb[] = [
  { r: 24, g: 183, b: 196 }, // ciano
  { r: 194, g: 162, b: 74 }, // ouro
  { r: 92, g: 77, b: 255 }, // roxo
  { r: 255, g: 255, b: 255 }, // branco
];

const SAMPLE_STEP = 10;
const FRAMES_PER_WORD = 320; // ~5s a 60fps
const TRAIL_FILL = "rgba(10,10,10,0.18)";
const OFFSCREEN_MARGIN = 80;
const MOBILE_MAX_WIDTH = 769;

function mix(from: Rgb, to: Rgb, weight: number): Rgb {
  return {
    r: Math.round(from.r + (to.r - from.r) * weight),
    g: Math.round(from.g + (to.g - from.g) * weight),
    b: Math.round(from.b + (to.b - from.b) * weight),
  };
}

class Particle {
  pos: Vec = { x: 0, y: 0 };
  vel: Vec = { x: 0, y: 0 };
  target: Vec = { x: 0, y: 0 };
  startColor: Rgb = { r: 0, g: 0, b: 0 };
  targetColor: Rgb = { r: 0, g: 0, b: 0 };
  colorWeight = 0;
  isKilled = false;

  private readonly maxSpeed = Math.random() * 5 + 3;
  private readonly maxForce = this.maxSpeed * 0.05;
  private readonly closeEnough = 80;
  private readonly colorBlendRate = Math.random() * 0.022 + 0.004;

  move() {
    const dx = this.target.x - this.pos.x;
    const dy = this.target.y - this.pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const proximity = dist < this.closeEnough ? dist / this.closeEnough : 1;

    const steerX = (dx / dist) * this.maxSpeed * proximity - this.vel.x;
    const steerY = (dy / dist) * this.maxSpeed * proximity - this.vel.y;
    const magnitude = Math.sqrt(steerX * steerX + steerY * steerY) || 1;

    this.vel.x += (steerX / magnitude) * this.maxForce;
    this.vel.y += (steerY / magnitude) * this.maxForce;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.colorWeight < 1) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1);
    }
    const { r, g, b } = mix(this.startColor, this.targetColor, this.colorWeight);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(this.pos.x, this.pos.y, 3, 3);
  }

  /** Começa a transição de cor a partir da cor atual (evita "saltos"). */
  retarget(color: Rgb) {
    this.startColor = mix(this.startColor, this.targetColor, this.colorWeight);
    this.targetColor = { ...color };
    this.colorWeight = 0;
  }
}

export type ParticleTextOptions = {
  canvas: HTMLCanvasElement;
  words: readonly string[];
  /** Valor de `font-family` já resolvido (inclui a fonte do next/font). */
  fontFamily: string;
};

export class ParticleText {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly words: readonly string[];
  private readonly fontFamily: string;

  private particles: Particle[] = [];
  /** Quantas palavras já foram exibidas (palavras e cores ciclam em tamanhos diferentes). */
  private shown = 0;
  private frame = 0;
  private rafId = 0;
  private visible = false;

  constructor({ canvas, words, fontFamily }: ParticleTextOptions) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D indisponível.");
    this.canvas = canvas;
    this.ctx = ctx;
    this.words = words;
    this.fontFamily = fontFamily;
  }

  /** Ajusta o canvas ao tamanho do elemento e (re)desenha a palavra atual. */
  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    if (this.shown === 0) this.nextWord();
    else this.loadWord(this.shown - 1);
  }

  setVisible(visible: boolean) {
    this.visible = visible;
  }

  start() {
    const tick = () => {
      this.rafId = window.requestAnimationFrame(tick);
      if (this.visible) this.update();
    };
    this.rafId = window.requestAnimationFrame(tick);
  }

  destroy() {
    window.cancelAnimationFrame(this.rafId);
    this.particles = [];
  }

  private nextWord() {
    this.loadWord(this.shown);
    this.shown++;
  }

  private update() {
    const { ctx, canvas } = this;
    ctx.fillStyle = TRAIL_FILL;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.move();
      particle.draw(ctx);

      if (particle.isKilled && this.isOutside(particle.pos)) {
        this.particles.splice(i, 1);
      }
    }

    this.frame++;
    if (this.frame % FRAMES_PER_WORD === 0) this.nextWord();
  }

  private isOutside({ x, y }: Vec) {
    const { width, height } = this.canvas;
    return (
      x < -OFFSCREEN_MARGIN ||
      x > width + OFFSCREEN_MARGIN ||
      y < -OFFSCREEN_MARGIN ||
      y > height + OFFSCREEN_MARGIN
    );
  }

  /** Ponto aleatório bem fora da tela, de onde as partículas "chegam". */
  private randomEdgePoint(): Vec {
    const { width, height } = this.canvas;
    const angle = Math.random() * Math.PI * 2;
    const isMobile = window.innerWidth < MOBILE_MAX_WIDTH;
    const radius = isMobile ? Math.min(width, height) * 0.7 : (width + height) * 0.65;
    return {
      x: width / 2 + Math.cos(angle) * radius,
      y: height / 2 + Math.sin(angle) * radius,
    };
  }

  private kill(particle: Particle) {
    if (particle.isKilled) return;
    particle.target = this.randomEdgePoint();
    particle.startColor = mix(particle.startColor, particle.targetColor, particle.colorWeight);
    particle.targetColor = { r: 0, g: 0, b: 0 };
    particle.colorWeight = 0;
    particle.isKilled = true;
  }

  /** `order` é a posição da palavra na sequência (0 = primeira exibida). */
  private loadWord(order: number) {
    const { canvas } = this;
    const word = this.words[order % this.words.length];
    const color = PARTICLE_COLORS[order % PARTICLE_COLORS.length];

    // Rasteriza o texto num canvas offscreen e amostra os pixels preenchidos.
    const offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;

    let fontSize = canvas.height * 0.44;
    ctx.font = `900 ${fontSize}px ${this.fontFamily}`;
    const textWidth = ctx.measureText(word).width;
    if (textWidth > canvas.width * 0.86) {
      fontSize *= (canvas.width * 0.86) / textWidth;
      ctx.font = `900 ${fontSize}px ${this.fontFamily}`;
    }

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(word, canvas.width / 2, canvas.height / 2);

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const samples: number[] = [];
    for (let i = 0; i < data.length; i += SAMPLE_STEP * 4) {
      if (data[i + 3] > 128) samples.push(i);
    }

    // Embaralha para uma animação mais fluida.
    for (let i = samples.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [samples[i], samples[j]] = [samples[j], samples[i]];
    }

    let used = 0;
    for (const sample of samples) {
      const x = (sample / 4) % canvas.width;
      const y = Math.floor(sample / 4 / canvas.width);

      let particle: Particle;
      if (used < this.particles.length) {
        particle = this.particles[used];
        particle.isKilled = false;
      } else {
        particle = new Particle();
        particle.pos = this.randomEdgePoint();
        this.particles.push(particle);
      }

      particle.retarget(color);
      particle.target = { x, y };
      used++;
    }

    // Partículas excedentes saem de cena.
    for (let i = used; i < this.particles.length; i++) this.kill(this.particles[i]);
  }
}
