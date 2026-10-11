import { FOOTER_NAV, SITE, WHATSAPP_MESSAGES } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer>
      <div className="footer-cta-row">
        <div className="footer-cta-text">
          <span className="footer-cta-eyebrow">Pronto para crescer?</span>
          <h2 className="footer-cta-headline">
            Seu negócio
            <br />
            <em>merece crescer.</em>
          </h2>
        </div>
        <div className="footer-cta-actions">
          <a href="#servicos" className="footer-btn-ghost">
            Ver soluções
          </a>
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.footer)}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-btn-solid"
          >
            Falar com a HAZE
          </a>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-grid">
        <div className="footer-col">
          <span className="footer-brand">HAZE</span>
          <p className="footer-tagline">
            Soluções digitais para
            <br />o comércio local.
          </p>
        </div>

        <div className="footer-col">
          <span className="footer-col-label">Navegação</span>
          <ul className="footer-nav">
            {FOOTER_NAV.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <span className="footer-col-label">Contato</span>
          <ul className="footer-nav">
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}>E-mail</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2025 HAZE. Todos os direitos reservados</span>
        <span className="footer-made">Soluções Digitais · Brasil</span>
      </div>
    </footer>
  );
}
