import { PARTNERS } from "@/data/site";
import { PartnerLogo } from "@/components/sections/PartnerLogos";

/** Faixa de parceiros em marquee infinito (a lista é renderizada duas vezes). */
export function Parceiros() {
  return (
    <div id="parceiros">
      <div className="parceiros-badge">
        <span className="parceiros-dot" aria-hidden="true" />
        <span className="parceiros-label">Parceiros certificados</span>
      </div>
      <div className="parceiros-marquee-wrap">
        <div className="parceiros-logos">
          {[0, 1].map((copy) =>
            PARTNERS.map((partner) => (
              <div
                key={`${copy}-${partner.id}`}
                className="parceiro-item"
                aria-hidden={copy === 1 ? true : undefined}
              >
                <PartnerLogo id={partner.id} uid={`${copy}`} />
                <div className="parceiro-info">
                  <span className="parceiro-name">{partner.name}</span>
                  <span className="parceiro-type">{partner.type}</span>
                </div>
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
}
