import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui";
import { LeadForm } from "@/components/lead-form";
import { getContacts } from "@/lib/contacts";
import { metadata as pageMetadata, whatsappUrl } from "@/lib/site";
export const metadata = pageMetadata(
  "Contato",
  "Converse com a Freitas WebDev sobre seu website, sistema ou SaaS. WhatsApp, e-mail e formulário para empresas de Jundiaí e todo o Brasil.",
  "/contato",
);
export default async function Page() {
  const contacts = await getContacts();
  return (
    <>
      <PageHero
        label="CONTATO / O PRIMEIRO PASSO"
        title={
          <>
            Seu próximo projeto
            <br />
            <span className="muted">começa com contexto.</span>
          </>
        }
        description="Uma necessidade clara, uma ideia em construção ou um sistema que precisa evoluir. Conte em que ponto você está."
      />
      <section className="container contact-layout">
        <div className="contact-options">
          <a
            className="contact-option"
            href={whatsappUrl(contacts.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <small>CONVERSA DIRETA</small>
              <strong>WhatsApp</strong>
            </div>
            <ArrowUpRight />
          </a>
          <a className="contact-option" href={`mailto:${contacts.email}`}>
            <div>
              <small>PREFERE E-MAIL?</small>
              <strong>{contacts.email}</strong>
            </div>
            <ArrowUpRight />
          </a>
          {contacts.instagram && (
            <a
              className="contact-option"
              href={contacts.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <small>ACOMPANHE O ESTÚDIO</small>
                <strong>Instagram</strong>
              </div>
              <ArrowUpRight />
            </a>
          )}
          <p>
            Desenvolvimento de sites e sistemas para Jundiaí, Campo Limpo
            Paulista e Várzea Paulista. Atendimento remoto para todo o Brasil.
          </p>
          <span className="micro">CLAREZA ANTES DE QUALQUER PROPOSTA.</span>
        </div>
        <LeadForm />
      </section>
    </>
  );
}
