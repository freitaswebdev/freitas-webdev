import { Button, Eyebrow } from "@/components/ui";
import { whatsappUrl } from "@/lib/site";
export function CTA({ whatsapp }: { whatsapp: string }) {
  return (
    <section className="cta-section">
      <div className="container">
        <Eyebrow>O PRÓXIMO PROJETO PODE SER O SEU</Eyebrow>
        <h2>
          Qual problema
          <br />
          vamos <span>resolver?</span>
        </h2>
        <div className="cta-bottom">
          <p>
            Conte o que seu negócio precisa.
            <br />
            Vamos definir o próximo passo juntos.
          </p>
          <div>
            <Button href="/solicitar-projeto">Iniciar um projeto</Button>
            <Button href={whatsappUrl(whatsapp)} secondary>
              Conversar no WhatsApp
            </Button>
          </div>
        </div>
        <span className="cta-star" aria-hidden="true">
          ✳
        </span>
      </div>
    </section>
  );
}
