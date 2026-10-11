import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Open_Sans } from "next/font/google";
import { preconnect } from "react-dom";
import type { ReactNode } from "react";
import { SITE } from "@/data/site";
import "@/styles/globals.css";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  keywords: [
    "soluções digitais",
    "comércio local",
    "tráfego pago",
    "identidade visual",
    "gestão financeira",
    "presença digital",
    "treinamento de vendas",
    "HAZE",
  ],
  authors: [{ name: SITE.legalName }],
  applicationName: SITE.name,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    locale: "pt_BR",
    title: "HAZE Soluções Digitais — Tudo que o seu negócio precisa",
    description:
      "Cinco soluções integradas para organizar, atrair, apresentar, treinar e fortalecer o comércio local.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "HAZE Soluções Digitais" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HAZE Soluções Digitais — Tudo que o seu negócio precisa",
    description:
      "Cinco soluções integradas para organizar, atrair, apresentar, treinar e fortalecer o comércio local.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.legalName,
  description:
    "Empresa de soluções digitais para o comércio local. Cinco ferramentas integradas para organizar, atrair, apresentar, treinar e fortalecer negócios locais.",
  url: SITE.url,
  logo: `${SITE.url}/og-image.jpg`,
  address: { "@type": "PostalAddress", addressCountry: "BR" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-16-98858-9448",
    contactType: "customer service",
    availableLanguage: "Portuguese",
  },
  sameAs: [SITE.instagram],
  serviceType: ["HazeFlow", "HazeLink", "HazeMind", "HazeAds", "HazeLook"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Antecipa a conexão com os hosts do robô 3D (Spline).
  preconnect("https://prod.spline.design");
  preconnect("https://unpkg.com");

  return (
    <html lang="pt-BR" className={`${barlow.variable} ${openSans.variable}`}>
      <body>
        <noscript>
          {/* Sem JavaScript, nada fica escondido esperando animação de entrada. */}
          <style>{`.reveal,.value-item,.svc-card{opacity:1!important;transform:none!important}#page-loader{display:none}`}</style>
        </noscript>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
