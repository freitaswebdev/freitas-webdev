import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui";
export function About() {
  return (
    <section className="section container about-section">
      <Eyebrow number="04">POR TRÁS DO CÓDIGO</Eyebrow>
      <div className="about-grid">
        <div className="about-mark" aria-hidden="true">
          <span>f↗</span>
          <small>FREITAS / WEBDEV</small>
        </div>
        <div>
          <h2>
            Bom design chama atenção.
            <br />
            <span className="muted">
              Boa engenharia
              <br />
              sustenta o crescimento.
            </span>
          </h2>
          <p>
            A Freitas WebDev conecta estratégia, interface e desenvolvimento
            para resolver problemas reais de negócio. Cada projeto parte do
            contexto de quem vai usar, operar e fazer o produto evoluir.
          </p>
          <p>
            Atendimento em Jundiaí, Campo Limpo Paulista e Várzea Paulista, com
            colaboração remota para projetos em todo o Brasil.
          </p>
          <Link className="text-link" href="/sobre">
            Conheça o estúdio <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function Technologies() {
  const layers = [
    {
      name: "01 / EXPERIÊNCIA",
      text: "Interfaces rápidas. Interações com intenção.",
      tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      name: "02 / ENGENHARIA",
      text: "Regras claras. Sistemas conectados.",
      tech: ["Node.js", "REST", "APIs", "Git & GitHub"],
    },
    {
      name: "03 / INFRAESTRUTURA",
      text: "Dados organizados. Entrega contínua.",
      tech: ["PostgreSQL", "Supabase", "Vercel"],
    },
  ];
  return (
    <section className="section container technology-section">
      <Eyebrow>TECNOLOGIA A SERVIÇO DO PRODUTO</Eyebrow>
      <h2>
        A stack é o meio.
        <br />
        <span className="muted">Seu negócio é o ponto.</span>
      </h2>
      <div className="tech-grid">
        {layers.map((layer) => (
          <article key={layer.name} data-reveal>
            <span className="micro">{layer.name}</span>
            <p>{layer.text}</p>
            <div>
              {layer.tech.map((t) => (
                <span className="tech-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
