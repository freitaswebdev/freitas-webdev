import { Services } from "@/sections/services";
import { CTA } from "@/sections/cta";
import { Technologies } from "@/sections/about";
import { PageHero, JsonLd } from "@/components/ui";
import { getContacts } from "@/lib/contacts";
import { services } from "@/data/content";
import { metadata as pageMetadata, siteUrl } from "@/lib/site";
export const metadata = pageMetadata(
  "Serviços de desenvolvimento web",
  "Websites, landing pages, SaaS, sistemas web, aplicações, bancos de dados e automação. Soluções digitais em Jundiaí e região.",
  "/servicos",
);
export default async function Page() {
  return (
    <>
      <PageHero
        label="CAPACIDADES / FREITAS WEBDEV"
        title={
          <>
            Cada negócio tem
            <br />
            um <span className="muted">próximo passo.</span>
          </>
        }
        description="Construímos a solução digital que faz sentido para a sua operação — da primeira presença online a um produto completo."
      />
      <Services full />
      <Technologies />
      <CTA whatsapp={(await getContacts()).whatsapp} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": services.map((s) => ({
            "@type": "Service",
            name: s.name,
            description: s.description,
            url: `${siteUrl}/servicos#${s.slug}`,
            provider: { "@id": `${siteUrl}/#organization` },
            areaServed: [
              "Jundiaí",
              "Campo Limpo Paulista",
              "Várzea Paulista",
              "Brasil",
            ],
          })),
        }}
      />
    </>
  );
}
