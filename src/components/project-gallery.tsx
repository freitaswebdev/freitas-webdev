"use client";
import { useState } from "react";
import { projects } from "@/data/content";
import { ProjectCard } from "./project-card";
const filters = ["Todos", "Websites", "Sistemas", "SaaS"] as const;
export function ProjectGallery() {
  const [filter, setFilter] = useState<string>("Todos");
  const filtered = projects.filter(
    (p) => filter === "Todos" || p.category === filter,
  );
  return (
    <>
      <div className="filters" aria-label="Filtrar projetos">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={f === filter}
          >
            {f}
            <span>
              {f === "Todos"
                ? projects.length
                : projects.filter((p) => p.category === f).length}
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {filtered.length} projetos encontrados
      </p>
      <div className="project-gallery">
        {filtered.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </>
  );
}
