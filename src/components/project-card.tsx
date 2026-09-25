import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Layers3 } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "@/types/content";
export function ProjectVisual({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <div
      className={`project-visual ${project.image ? "" : "concept-visual"}`}
      style={{ "--project-color": project.color } as CSSProperties}
    >
      {project.image ? (
        <div className="browser-frame">
          <div className="browser-bar">
            <i />
            <i />
            <i />
            <span>{project.url?.replace("https://", "")}</span>
            <span>↗</span>
          </div>
          <Image
            src={project.image}
            width={1440}
            height={1000}
            alt={`Interface do projeto ${project.name}`}
            sizes="(max-width: 700px) 90vw, 65vw"
            priority={priority}
          />
        </div>
      ) : (
        <div className="concept-art">
          <Layers3 size={70} strokeWidth={0.8} />
          <span>{project.name}</span>
          <small>EXPLORAÇÃO DE PRODUTO / CONCEITO</small>
          <div className="concept-lines">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      )}
      <span className="visual-tag">
        {project.demo ? "CONCEITO DEMONSTRATIVO" : "PROJETO PUBLICADO"}
      </span>
    </div>
  );
}
export function ProjectCard({
  project,
  index = 0,
  stacked = false,
}: {
  project: Project;
  index?: number;
  stacked?: boolean;
}) {
  return (
    <article
      className={`project-card ${stacked ? "stacked-project" : ""}`}
      style={{ "--card-index": index } as CSSProperties}
    >
      <Link href={`/projetos/${project.slug}`} className="project-link">
        <ProjectVisual project={project} />
        <div className="project-info">
          <div>
            <span className="project-overline">
              {String(index + 1).padStart(2, "0")} / {project.segment}
            </span>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
          </div>
          <div className="project-card-right">
            <span className="pill">{project.category}</span>
            <span className="circle-arrow">
              <ArrowUpRight aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
