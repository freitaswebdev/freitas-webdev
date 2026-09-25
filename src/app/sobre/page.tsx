import { PageHero } from "@/components/ui";
import { About, Technologies } from "@/sections/about";
import { CTA } from "@/sections/cta";
import { getContacts } from "@/lib/contacts";
import { metadata as pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Sobre o estúdio",
  "A Freitas WebDev conecta negócio, design e engenharia no desenvolvimento de websites, sistemas e produtos digitais em Jundiaí e região.",
  "/sobre",
);
export default async function Page() {
  return (
    <>
      <PageHero
        label="ESTÚDIO / FREITAS WEBDEV"
        title={
          <>
            Pensamento de produto.
            <br />
            <span className="muted">Cuidado de estúdio.</span>
          </>
        }
        description="A Freitas WebDev desenvolve soluções digitais olhando para o conjunto: como o negócio funciona, como as pessoas usam e como a tecnologia sustenta a operação."
      />
      <section className="container inner-content">
        <p className="manifesto">
          Uma boa interface precisa ser entendida.
          <br />
          Um bom sistema precisa ser confiável.
          <br />
          <span className="muted">
            Um bom projeto precisa fazer sentido
            <br />
            para o negócio.
          </span>
        </p>
        <div className="principles">
          {[
            [
              "Contexto antes de código",
              "O escopo nasce de objetivos, restrições e fluxos reais. A tecnologia é escolhida depois de entender o problema.",
            ],
            [
              "Qualidade além da aparência",
              "Hierarquia, acessibilidade, velocidade e manutenção fazem parte da entrega, desde as primeiras decisões.",
            ],
            [
              "Clareza durante o caminho",
              "Etapas, responsabilidades e critérios de validação ajudam a manter expectativas e entregas alinhadas.",
            ],
          ].map(([title, text]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <About />
      <Technologies />
      <CTA whatsapp={(await getContacts()).whatsapp} />
    </>
  );
}
