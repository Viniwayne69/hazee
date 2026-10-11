import type { PartnerId } from "@/data/site";

/**
 * Logos estilizadas dos parceiros (SVG inline).
 * `uid` evita ids de gradiente duplicados quando a lista é repetida no marquee.
 */
export function PartnerLogo({ id, uid }: { id: PartnerId; uid: string }) {
  const svgProps = {
    className: "parceiro-svg",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  } as const;

  switch (id) {
    case "meta":
      return (
        <svg {...svgProps} viewBox="0 0 62 38">
          <defs>
            <linearGradient id={`pMeta-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1AABFF" />
              <stop offset="100%" stopColor="#0052D9" />
            </linearGradient>
          </defs>
          <path
            d="M5,19 C5,11.5 9.5,5 17,5 C21.5,5 24.5,8 27,12 C28,13.5 29,16 31,19 C33,22 34,24.5 37,28 C39.5,31 42.5,33 47,33 C54.5,33 57,25.5 57,19 C57,12.5 53.5,5 47,5 C42.5,5 39.5,8 37,12 C34,15.5 33,17 31,19 C29,22 28,24.5 27,26 C24.5,30 21.5,33 17,33 C9.5,33 5,26.5 5,19Z"
            fill={`url(#pMeta-${uid})`}
          />
        </svg>
      );

    case "google-ads":
      return (
        <svg {...svgProps} viewBox="0 0 52 52">
          <rect x="36" y="4" width="12" height="44" rx="6" fill="#4285F4" />
          <rect x="20" y="18" width="12" height="30" rx="6" fill="#FBBC04" />
          <circle cx="8" cy="42" r="8" fill="#34A853" />
        </svg>
      );

    case "linkedin":
      return (
        <svg {...svgProps} viewBox="0 0 52 52">
          <rect x="1" y="1" width="50" height="50" rx="9" fill="#0A66C2" />
          <text
            x="26"
            y="37"
            fontFamily="Georgia, serif"
            fontSize="26"
            fontWeight="700"
            fill="white"
            textAnchor="middle"
          >
            in
          </text>
        </svg>
      );

    case "mlabs":
      return (
        <svg {...svgProps} viewBox="0 0 52 52">
          <defs>
            <linearGradient id={`pMLabs-${uid}`} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFA500" />
              <stop offset="55%" stopColor="#FF5500" />
              <stop offset="100%" stopColor="#DD1A00" />
            </linearGradient>
          </defs>
          <path
            d="M26,3 C27.8,3 29.4,4 30.2,5.6 L49.6,44.2 C51.4,47.6 48.9,51.5 45,51.5 L7,51.5 C3.1,51.5 0.6,47.6 2.4,44.2 L21.8,5.6 C22.6,4 24.2,3 26,3 Z"
            fill={`url(#pMLabs-${uid})`}
          />
          <path d="M26,16 L38,40 L14,40 Z" fill="rgba(255,255,255,0.2)" />
        </svg>
      );

    case "adobe":
      return (
        <svg {...svgProps} viewBox="0 0 52 52">
          <rect width="52" height="52" rx="6" fill="#FF0000" />
          <path
            d="M26 10L40 42H33.5L30.2 34H21.8L18.5 42H12L26 10ZM26 20.5L23.5 30H28.5L26 20.5Z"
            fill="white"
          />
        </svg>
      );

    case "rd-station":
      return (
        <svg {...svgProps} viewBox="0 0 52 52">
          <rect width="52" height="52" rx="26" fill="#00B871" />
          <text
            x="26"
            y="34"
            fontFamily="Arial,sans-serif"
            fontSize="16"
            fontWeight="800"
            fill="white"
            textAnchor="middle"
          >
            RD
          </text>
        </svg>
      );

    case "hotmart":
      return (
        <svg {...svgProps} viewBox="0 0 52 52">
          <defs>
            <linearGradient id={`pHot-${uid}`} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FF8C00" />
              <stop offset="100%" stopColor="#F04E23" />
            </linearGradient>
          </defs>
          <rect width="52" height="52" rx="26" fill={`url(#pHot-${uid})`} />
          <path
            d="M26 9C26 9 36 20 36 29C36 34.5 31.5 39 26 39C20.5 39 16 34.5 16 29C16 23.5 20 18 23 16C22 21 24.5 24 26 25C26 19 27.5 13.5 26 9Z"
            fill="white"
          />
        </svg>
      );

    case "mailchimp":
      return (
        <svg {...svgProps} viewBox="0 0 52 52">
          <rect width="52" height="52" rx="8" fill="#FFE01B" />
          <ellipse cx="26" cy="22" rx="11" ry="10" fill="#241C15" />
          <ellipse cx="26" cy="21" rx="9" ry="8" fill="#FFE01B" />
          <circle cx="22" cy="20" r="2" fill="#241C15" />
          <circle cx="30" cy="20" r="2" fill="#241C15" />
          <path
            d="M22 25 Q26 28 30 25"
            stroke="#241C15"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse cx="26" cy="35" rx="8" ry="5" fill="#241C15" />
          <text
            x="26"
            y="38"
            fontFamily="Arial,sans-serif"
            fontSize="7"
            fontWeight="700"
            fill="#FFE01B"
            textAnchor="middle"
          >
            Mailchimp
          </text>
        </svg>
      );

    case "hubspot":
      return (
        <svg {...svgProps} viewBox="0 0 52 52">
          <rect width="52" height="52" rx="26" fill="#FF7A59" />
          <circle cx="26" cy="20" r="5" fill="white" />
          <rect x="24" y="24" width="4" height="10" rx="2" fill="white" />
          <circle cx="38" cy="28" r="4" fill="white" />
          <rect x="28" y="26" width="10" height="4" rx="2" fill="white" />
          <circle cx="14" cy="28" r="4" fill="white" />
          <rect x="14" y="26" width="10" height="4" rx="2" fill="white" />
        </svg>
      );

    case "figma":
      return (
        <svg {...svgProps} viewBox="0 0 52 52">
          <rect width="52" height="52" rx="8" fill="#1E1E1E" />
          <rect x="16" y="8" width="10" height="10" rx="5" fill="#F24E1E" />
          <rect x="26" y="8" width="10" height="10" rx="5" fill="#FF7262" />
          <rect x="16" y="18" width="10" height="10" rx="5" fill="#A259FF" />
          <rect x="16" y="28" width="10" height="10" rx="5" fill="#0ACF83" />
          <circle cx="31" cy="33" r="5" fill="#1ABCFE" />
        </svg>
      );

    case "notion":
      return (
        <svg {...svgProps} viewBox="0 0 52 52">
          <rect width="52" height="52" rx="8" fill="#191919" />
          <path d="M15 13H24L37 34V13H40V39H31L18 18V39H15V13Z" fill="white" />
        </svg>
      );

    case "canva":
      return (
        <svg {...svgProps} viewBox="0 0 52 52">
          <defs>
            <linearGradient id={`pCanva-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B3DFF" />
              <stop offset="100%" stopColor="#00C4CC" />
            </linearGradient>
          </defs>
          <rect width="52" height="52" rx="26" fill={`url(#pCanva-${uid})`} />
          <path
            d="M32 17C29.5 15 26.5 14 23.5 15C18.5 17 16 22.5 17 28C18 33 22.5 37 28 36.5C31 36.2 33.5 34.5 35 32L32 30C31 31.5 29.5 32.5 27.5 32.8C24 33.2 21 30.5 20.5 27C20 23.5 22 20 25.5 19C27.5 18.5 29.5 19 31 20.5L32 17Z"
            fill="white"
          />
        </svg>
      );
  }
}
