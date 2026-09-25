import { PageHero } from "@/components/ui";
import { ProjectGallery } from "@/components/project-gallery";
import { CTA } from "@/sections/cta";
import { getContacts } from "@/lib/contacts";
import { metadata as pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Projetos e portfólio",
  "Conheça websites e produtos digitais da Freitas WebDev: Mercado Marsola, NexoStock, Sistema Celulares e explorações de sistemas.",
  "/projetos",
);
export default async function Page() {
  return (
    <>
      <PageHero
        label="PORTFÓLIO / PROJETOS & EXPLORAÇÕES"
        title={
          <>
            Pensados para usar.
            <br />
            <span className="muted">Construídos para durar.</span>
          </>
        }
        description="Interfaces, sistemas e experiências digitais em diferentes contextos. Projetos publicados e conceitos demonstrativos, identificados em cada case."
      />
      <section className="container inner-content" aria-label="Portfólio">
        <ProjectGallery />
      </section>
      <CTA whatsapp={(await getContacts()).whatsapp} />
    </>
  );
}
