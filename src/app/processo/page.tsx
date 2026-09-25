import { PageHero } from "@/components/ui";
import { Process } from "@/sections/process";
import { CTA } from "@/sections/cta";
import { getContacts } from "@/lib/contacts";
import { metadata as pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Nosso processo",
  "Da descoberta à evolução: conheça as sete etapas de estratégia, design, desenvolvimento, validação e publicação da Freitas WebDev.",
  "/processo",
);
export default async function Page() {
  return (
    <>
      <PageHero
        label="MÉTODO / DA DESCOBERTA À EVOLUÇÃO"
        title={
          <>
            Menos incerteza.
            <br />
            <span className="muted">Mais direção.</span>
          </>
        }
        description="Um produto consistente é consequência de boas decisões. Nosso processo torna cada uma delas visível — do primeiro alinhamento à publicação."
      />
      <Process full />
      <CTA whatsapp={(await getContacts()).whatsapp} />
    </>
  );
}
