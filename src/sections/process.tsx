import { process } from "@/data/content";
import { Eyebrow, Button } from "@/components/ui";
export function Process({ full = false }: { full?: boolean }) {
  return (
    <section className="section process-section">
      <div className="container process-grid">
        <div className="process-intro">
          <Eyebrow number="03">DO PROBLEMA AO PRODUTO</Eyebrow>
          <h2>
            Intenção em
            <br />
            cada decisão.
            <br />
            <span className="muted">
              Precisão em
              <br />
              cada entrega.
            </span>
          </h2>
          <p>
            Você participa das decisões.
            <br />O processo tem direção, contexto e clareza.
          </p>
          {!full && (
            <Button href="/processo" secondary>
              Conheça o processo
            </Button>
          )}
          <div className="process-diagram" aria-hidden="true">
            <span>IDEIA</span>
            <i />
            <b>f↗</b>
            <i />
            <span>PRODUTO</span>
          </div>
        </div>
        <div className="process-steps">
          {process.map((step, index) => (
            <article className="process-step" key={step.title} data-reveal>
              <span className="step-number">0{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {full && (
                  <div className="deliverable">
                    <span>ENTREGA</span>
                    {step.deliverable}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
