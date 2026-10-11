import { SITE, WHATSAPP_MESSAGES } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Reveal";

export function Contato() {
  return (
    <section id="contato" className="section-light">
      <div className="contact-inner">
        <Reveal as="h2" className="contact-headline">
          Pronto para
          <br />
          fazer o seu negócio
          <br />
          crescer de verdade?
        </Reveal>

        <div className="contact-grid">
          <div>
            <Reveal as="p" className="contact-body">
              Se você tem um comércio local e quer crescer com estrutura e método, a HAZE tem as
              ferramentas certas para isso. Resposta em menos de 24h.
            </Reveal>
            <Reveal as="p" className="contact-body" style={{ marginTop: 20, fontSize: 13 }}>
              Do financeiro à identidade visual, do tráfego pago ao treinamento da sua equipe, temos
              o que você precisa em um único lugar.
            </Reveal>
          </div>

          <Reveal className="contact-actions">
            <div className="contact-cta-strip">
              <a
                href={whatsappLink(WHATSAPP_MESSAGES.contact)}
                className="cta-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chamar no WhatsApp →
              </a>
            </div>
            <div className="contact-cta-strip" style={{ marginTop: 16 }}>
              <a href={SITE.instagram} className="cta-secondary" target="_blank" rel="noopener noreferrer">
                Ver no Instagram →
              </a>
              <a href={`mailto:${SITE.email}`} className="cta-secondary">
                Enviar e-mail →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
