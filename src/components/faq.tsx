const questions = [
  [
    "Quanto custa um projeto?",
    "O investimento depende do escopo, das integrações, do conteúdo e das regras de negócio. Após entender o contexto, estruturamos uma proposta com entregas, etapas e condições claras.",
  ],
  [
    "Vocês atendem apenas a região de Jundiaí?",
    "Atendemos Jundiaí, Campo Limpo Paulista e Várzea Paulista, além de projetos remotos em todo o Brasil. As etapas de alinhamento e validação podem acontecer online.",
  ],
  [
    "Posso começar com um escopo menor?",
    "Sim. Podemos priorizar o fluxo mais importante e planejar as próximas entregas. A decisão considera o que precisa funcionar no lançamento e o que pode evoluir depois.",
  ],
  [
    "O site terá painel para atualização?",
    "O painel é definido conforme a necessidade do projeto. Conteúdo, produtos, contatos e permissões podem fazer parte do escopo, com orientações para sua equipe.",
  ],
  [
    "Há suporte depois da publicação?",
    "As condições de suporte, manutenção e evolução são combinadas na proposta. Assim, responsabilidades, prazos e tipos de atendimento ficam claros desde o início.",
  ],
];
export function FAQ() {
  return (
    <section className="section container faq-section">
      <div>
        <span className="eyebrow">ANTES DO PRIMEIRO CONTATO</span>
        <h2>
          Perguntas
          <br />
          <span className="muted">bem-vindas.</span>
        </h2>
      </div>
      <div>
        {questions.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
