import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { Orbital } from "@/components/orbital";
import { Eyebrow, Button } from "@/components/ui";

const capabilities = [
  "WEBSITES",
  "SISTEMAS WEB",
  "SAAS",
  "APLICAÇÕES",
  "AUTOMAÇÃO",
  "EXPERIÊNCIAS DIGITAIS",
];

function CapabilityGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="capability-group" aria-hidden={hidden || undefined}>
      {capabilities.map((capability, index) => (
        <Fragment key={capability}>
          {index > 0 && <i>✳</i>}
          <span>{capability}</span>
        </Fragment>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-topline container">
        <span>
          <i className="status-dot" /> Design independente. Engenharia completa.
        </span>
        <span>JUNDIAÍ, SP · ATENDIMENTO EM TODO O BRASIL</span>
      </div>
      <div className="hero-main container">
        <div className="hero-copy">
          <Eyebrow>ESTÚDIO DE DESENVOLVIMENTO DIGITAL</Eyebrow>
          <h1>
            <span className="hero-line">
              <span>Engenharia</span>
            </span>
            <span className="hero-line">
              <span>digital.</span>
            </span>
            <span className="hero-line">
              <span>
                <span className="serif-accent">Impacto</span>{" "}
                <span className="red">real.</span>
              </span>
            </span>
          </h1>
          <p>
            Sites que posicionam. Sistemas que simplificam.
            <br className="desktop-break" /> Produtos digitais construídos para
            o seu negócio.
          </p>
          <div className="hero-actions">
            <Button href="/solicitar-projeto">Vamos construir</Button>
            <Link href="/projetos" className="text-link">
              Explorar projetos <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <Orbital />
      </div>
      <div className="hero-bottom container">
        <a href="#projetos" className="scroll-cue">
          <span className="circle-icon">
            <ArrowDown size={16} />
          </span>{" "}
          Role para explorar
        </a>
        <span>ESTRATÉGIA + DESIGN + DESENVOLVIMENTO</span>
        <span className="hero-index">[ FW — 001 ]</span>
      </div>
      <div
        className="capability-strip"
        aria-label="Websites, sistemas web, SaaS, aplicações, automação e experiências digitais"
      >
        <div className="capability-track">
          <CapabilityGroup />
          {Array.from({ length: 5 }, (_, index) => (
            <CapabilityGroup hidden key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
