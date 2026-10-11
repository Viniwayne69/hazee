import { ABOUT_PARAGRAPHS, PILLARS } from "@/data/site";
import { PillarIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";

export function Sobre() {
  return (
    <section id="sobre" className="section-light">
      <div className="sobre-inner">
        <Reveal as="span" className="section-label">
          Sobre a HAZE
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-headline">
            Tecnologia não é só
            <br />
            para grandes empresas,
            <br />
            <strong>
              é para o negócio que você
              <br />
              construiu com dedicação.
            </strong>
          </Reveal>

          <Reveal className="about-body">
            {ABOUT_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <Reveal className="about-pillars">
          {PILLARS.map((pillar) => (
            <div key={pillar.name} className="pillar">
              <PillarIcon id={pillar.icon} />
              <p className="pillar-name">{pillar.name}</p>
              <p className="pillar-desc">{pillar.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
