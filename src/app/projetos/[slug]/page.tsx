import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/content";
import { Breadcrumbs, Button, Eyebrow, JsonLd } from "@/components/ui";
import { ProjectVisual } from "@/components/project-card";
import { CTA } from "@/sections/cta";
import { metadata as pageMetadata, siteUrl } from "@/lib/site";
import { getContacts } from "@/lib/contacts";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? pageMetadata(p.name, p.summary, `/projetos/${slug}`)
    : { title: "Projeto não encontrado" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <section className="container case-hero">
        <Breadcrumbs
          items={[
            { label: "Projetos", href: "/projetos" },
            { label: project.name },
          ]}
        />
        <div className="case-title">
          <div>
            <Eyebrow>{project.segment}</Eyebrow>
            <h1>{project.name}</h1>
            <p>{project.summary}</p>
          </div>
          {project.url ? (
            <a
              className="button button-secondary"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visitar projeto <ArrowUpRight size={18} />
            </a>
          ) : (
            <Button href="/solicitar-projeto" secondary>
              Criar algo assim
            </Button>
          )}
        </div>
        <dl className="case-facts">
          <div>
            <dt>Projeto</dt>
            <dd>{project.name}</dd>
          </div>
          <div>
            <dt>Segmento</dt>
            <dd>{project.segment}</dd>
          </div>
          <div>
            <dt>Serviço</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              {project.demo ? "Conceito demonstrativo" : "Versão publicada"}
            </dd>
          </div>
        </dl>
        {project.demo && (
          <p className="case-notice">
            Exploração demonstrativa de produto. As telas, funcionalidades e
            tecnologias descritas representam uma proposta de escopo, não um
            projeto de cliente concluído.
          </p>
        )}
        <ProjectVisual project={project} priority />
      </section>
      <div className="container inner-content">
        <section className="case-block">
          <h2>01 / O problema</h2>
          <p>{project.challenge}</p>
        </section>
        <section className="case-block">
          <h2>02 / A solução</h2>
          <p>{project.solution}</p>
        </section>
        <section className="case-block">
          <h2>03 / Funcionalidades</h2>
          <ul className="feature-grid">
            {project.features.map((feature, i) => (
              <li key={feature}>
                <span>0{i + 1}</span>
                {feature}
              </li>
            ))}
          </ul>
        </section>
        <section className="case-block">
          <h2>04 / Interface</h2>
          <p>
            {project.demo
              ? "A direção proposta prioriza tarefas frequentes, navegação clara e separação entre a experiência pública e a gestão interna."
              : "A captura acima mostra a interface da versão publicada. O foco está na organização do conteúdo, em uma leitura direta e em caminhos visíveis para as principais ações."}
          </p>
        </section>
        <section className="case-block">
          <h2>05 / Tecnologia</h2>
          <div>
            <div className="filters">
              {project.technologies.map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
            <p>
              {project.demo
                ? "Stack proposta, sujeita às necessidades do escopo."
                : "Tecnologias identificadas na versão publicada. A arquitetura completa depende do escopo de cada produto."}
            </p>
          </div>
        </section>
        <section className="case-block">
          <h2>06 / Resultado</h2>
          <div>
            <p>
              {project.demo
                ? "Uma proposta de fluxo e organização para discutir requisitos antes do desenvolvimento. Este conceito não possui resultados comerciais medidos."
                : "Uma experiência digital publicada, disponível para navegação no link deste case. Não são apresentados indicadores de conversão ou resultados comerciais que não tenham sido medidos e validados."}
            </p>
          </div>
        </section>
        <Link className="next-project" href={`/projetos/${next.slug}`}>
          <div>
            <Eyebrow>PRÓXIMO PROJETO</Eyebrow>
            <h2>{next.name}</h2>
          </div>
          <ArrowUpRight size={55} strokeWidth={1} />
        </Link>
      </div>
      <CTA whatsapp={(await getContacts()).whatsapp} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            {
              "@type": "ListItem",
              position: 2,
              name: "Projetos",
              item: `${siteUrl}/projetos`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: project.name,
              item: `${siteUrl}/projetos/${slug}`,
            },
          ],
        }}
      />
    </>
  );
}
