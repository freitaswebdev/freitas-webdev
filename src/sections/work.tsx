import { projects } from "@/data/content";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading, Button } from "@/components/ui";
export function Work() {
  return (
    <section className="section container" id="projetos">
      <SectionHeading
        number="01"
        label="TRABALHOS SELECIONADOS"
        title={
          <>
            O código é invisível.
            <br />
            <span className="muted">O resultado, não.</span>
          </>
        }
      >
        <p>
          Uma seleção de experiências que conectam
          <br className="desktop-break" /> marca, pessoas e operação.
        </p>
      </SectionHeading>
      <div className="project-stack">
        {projects.slice(0, 3).map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            stacked
          />
        ))}
      </div>
      <div className="section-bottom">
        <span>Do primeiro contato à operação diária.</span>
        <Button href="/projetos" secondary>
          Ver todos os projetos
        </Button>
      </div>
    </section>
  );
}
