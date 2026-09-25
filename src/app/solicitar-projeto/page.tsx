import { PageHero } from "@/components/ui";
import { LeadForm } from "@/components/lead-form";
import { metadata as pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Solicitar um projeto",
  "Solicite uma proposta para desenvolver seu website, landing page, SaaS ou sistema personalizado com a Freitas WebDev.",
  "/solicitar-projeto",
);
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const { tipo } = await searchParams;
  return (
    <>
      <PageHero
        label="NOVO PROJETO / BRIEFING INICIAL"
        title={
          <>
            O que vamos
            <br />
            <span className="muted">construir juntos?</span>
          </>
        }
        description="Este é o ponto de partida. Compartilhe seus objetivos e vamos avaliar escopo, prioridades e o caminho para colocar seu projeto em movimento."
      />
      <div className="container request-wrap">
        <LeadForm extended initialType={tipo} />
      </div>
    </>
  );
}
