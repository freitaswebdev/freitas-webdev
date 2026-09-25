import Link from "next/link";
import {
  ArrowUpRight,
  Globe2,
  Target,
  Layers3,
  ChartNoAxesCombined,
  AppWindow,
  Database,
  PanelsTopLeft,
  Workflow,
} from "lucide-react";
import { services } from "@/data/content";
import { SectionHeading } from "@/components/ui";
const icons = [
  Globe2,
  Target,
  Layers3,
  ChartNoAxesCombined,
  AppWindow,
  Database,
  PanelsTopLeft,
  Workflow,
];
export function Services({ full = false }: { full?: boolean }) {
  return (
    <section
      className={`section container services-section ${full ? "services-full" : ""}`}
    >
      {!full && (
        <SectionHeading
          number="02"
          label="O QUE CONSTRUÍMOS"
          title={
            <>
              Seu próximo passo.
              <br />
              <span className="muted">Nossa especialidade.</span>
            </>
          }
        >
          <p>
            Da presença digital à ferramenta
            <br />
            que move sua operação.
          </p>
        </SectionHeading>
      )}
      <div className="services-list">
        {services.map((service, index) => {
          const Icon = icons[index];
          return (
            <article
              data-reveal
              className="service-row"
              id={service.slug}
              key={service.slug}
            >
              <span className="service-number">0{index + 1}</span>
              <div className="service-name">
                <Icon aria-hidden="true" size={25} strokeWidth={1.2} />
                <h2>{service.name}</h2>
              </div>
              <div className="service-description">
                <h3>{service.label}</h3>
                <p>{service.description}</p>
                {full && (
                  <ul>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
              <Link
                className="circle-arrow"
                href={
                  full
                    ? `/solicitar-projeto?tipo=${encodeURIComponent(service.name)}`
                    : `/servicos#${service.slug}`
                }
                aria-label={`${full ? "Solicitar" : "Conhecer"} ${service.name}`}
              >
                <ArrowUpRight />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
