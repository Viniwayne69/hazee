import type { IconId } from "@/data/site";

/** Ícone do WhatsApp (contorno) — botão flutuante. */
export function WhatsAppOutlineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.528 5.85L.057 23.943l6.255-1.641A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.52-5.2-1.43l-.373-.22-3.866 1.015 1.032-3.76-.244-.387A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

/** Ícone do WhatsApp (sólido) — botão dentro do chat. */
export function WhatsAppSolidIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

type StrokeIconProps = {
  size?: number;
  path: string;
  strokeWidth?: number;
};

function StrokeIcon({ size = 18, path, strokeWidth = 2.5 }: StrokeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export const ChevronLeftIcon = () => <StrokeIcon path="M15 18l-6-6 6-6" />;
export const ChevronRightIcon = () => <StrokeIcon path="M9 18l6-6-6-6" />;
export const ArrowRightIcon = () => <StrokeIcon size={16} path="M5 12h14M12 5l7 7-7 7" />;

export function SendIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

/** Ícones da seção "Sobre" (pilares). */
export function PillarIcon({ id }: { id: IconId }) {
  const common = {
    className: "pillar-icon",
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    case "compass":
      return (
        <svg {...common} strokeLinejoin="round">
          <circle cx="16" cy="16" r="12" />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
          <path d="M16 4v3M16 25v3M4 16h3M25 16h3" />
          <path d="M20 12l-3 3-5 2 3-3 5-2z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "venn":
      return (
        <svg {...common}>
          <circle cx="12" cy="16" r="8" />
          <circle cx="20" cy="16" r="8" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common} strokeLinejoin="round">
          <path d="M8 24L24 8" />
          <path d="M14 8h10v10" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="12" />
          <circle cx="16" cy="16" r="7" />
          <circle cx="16" cy="16" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

/** Ícones da seção "Por que a HAZE" (valores). */
export function ValueIcon({ id }: { id: IconId }) {
  const common = {
    className: "value-icon",
    viewBox: "0 0 28 28",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    case "sun":
      return (
        <svg {...common}>
          <circle cx="14" cy="14" r="5" />
          <path d="M14 2v3M14 23v3M2 14h3M23 14h3M5.5 5.5l2.1 2.1M20.4 20.4l2.1 2.1M5.5 22.5l2.1-2.1M20.4 7.6l2.1-2.1" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common} strokeLinejoin="round">
          <circle cx="14" cy="14" r="11" />
          <path d="M18 10l-3 3-5 2 3-3 5-2z" fill="currentColor" stroke="none" />
          <circle cx="14" cy="14" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common} strokeLinejoin="round">
          <path d="M2 14s4-8 12-8 12 8 12 8-4 8-12 8-12-8-12-8z" />
          <circle cx="14" cy="14" r="3.5" />
        </svg>
      );
    case "infinity":
      return (
        <svg {...common}>
          <path
            d="M7 14c0-3.3 2.7-6 6-6s6 2.7 6 2.7S21.3 8 24 8s4 2.7 4 6-2.7 6-6 6-6-2.7-6-2.7S9.3 20 7 20s-4-2.7-4-6z"
            transform="scale(0.9) translate(1.5 1.5)"
          />
        </svg>
      );
    case "diamond":
      return (
        <svg {...common} strokeLinejoin="round">
          <path d="M14 25L3 12l3-7h16l3 7z" />
          <path d="M3 12h22M9 5l5 20M19 5l-5 20" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="14" cy="14" r="11" />
          <circle cx="14" cy="14" r="6" />
          <circle cx="14" cy="14" r="2" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
