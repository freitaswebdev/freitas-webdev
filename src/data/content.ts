import type { Project, ContactSettings } from "@/types/content";
export const defaultContacts: ContactSettings = {
  whatsapp: "5511983600255",
  email: "Freitas.WebDev@gmail.com",
  instagram: "",
};
export const navigation = [
  ["Home", "/"],
  ["Serviços", "/servicos"],
  ["Projetos", "/projetos"],
  ["Processo", "/processo"],
  ["Sobre", "/sobre"],
  ["Contato", "/contato"],
] as const;
export const services = [
  {
    name: "Websites",
    slug: "websites",
    label: "Presença que posiciona.",
    description:
      "Sites institucionais com direção visual própria, conteúdo claro e uma base técnica preparada para busca, velocidade e conversão.",
    items: [
      "Arquitetura de conteúdo",
      "Design responsivo",
      "SEO técnico e local",
    ],
    icon: "globe",
  },
  {
    name: "Landing pages",
    slug: "landing-pages",
    label: "Uma página. Um objetivo.",
    description:
      "Páginas de campanha que conectam a promessa do anúncio à próxima ação. Hierarquia, mensagem e formulário desenhados para reduzir atrito.",
    items: [
      "Copy e hierarquia",
      "Integração com campanhas",
      "Eventos de conversão",
    ],
    icon: "target",
  },
  {
    name: "SaaS",
    slug: "saas",
    label: "Da operação ao produto.",
    description:
      "Plataformas por assinatura com jornadas, permissões e regras de negócio bem definidas. Uma estrutura que pode evoluir com o produto.",
    items: [
      "Autenticação e permissões",
      "Planos e integrações",
      "Arquitetura de produto",
    ],
    icon: "layers",
  },
  {
    name: "Sistemas web",
    slug: "sistemas-web",
    label: "Menos planilhas. Mais controle.",
    description:
      "ERP, CRM e dashboards que organizam informações e tornam processos visíveis. O sistema se adapta à operação do seu negócio.",
    items: [
      "Regras de negócio",
      "Dashboards e relatórios",
      "Gestão operacional",
    ],
    icon: "chart",
  },
  {
    name: "Aplicações",
    slug: "aplicacoes",
    label: "A ferramenta certa para o trabalho.",
    description:
      "Aplicações web e experiências mobile sob medida, com fluxos pensados para quem usa todos os dias.",
    items: [
      "Aplicações responsivas e PWA",
      "Interfaces de operação",
      "Integrações via API",
    ],
    icon: "app",
  },
  {
    name: "Bancos de dados",
    slug: "bancos-de-dados",
    label: "Informação com estrutura.",
    description:
      "Modelagem, migração e integração de dados com atenção à integridade, aos acessos e às consultas que sustentam o produto.",
    items: [
      "Modelagem relacional",
      "Permissões e integridade",
      "Migrações e integrações",
    ],
    icon: "database",
  },
  {
    name: "Painéis administrativos",
    slug: "paineis",
    label: "Autonomia para sua equipe.",
    description:
      "Interfaces para gerenciar conteúdo, usuários, pedidos e indicadores. Acesso adequado para cada responsabilidade.",
    items: [
      "Gestão de conteúdo",
      "Perfis de acesso",
      "Histórico de alterações",
    ],
    icon: "panel",
  },
  {
    name: "Automação",
    slug: "automacao",
    label: "Processos que seguem em frente.",
    description:
      "Conexões entre sistemas para diminuir a repetição de tarefas e manter informações consistentes entre ferramentas.",
    items: [
      "APIs e webhooks",
      "Fluxos automatizados",
      "Monitoramento de falhas",
    ],
    icon: "workflow",
  },
];
export const process = [
  {
    title: "Descoberta",
    text: "Antes da primeira tela, entendemos o negócio, as pessoas e o problema que precisa ser resolvido.",
    deliverable: "Contexto, objetivos e critérios de sucesso",
  },
  {
    title: "Estratégia",
    text: "Transformamos o diagnóstico em escopo, arquitetura e prioridades. Você sabe o que será construído e por quê.",
    deliverable: "Escopo, mapa de jornadas e plano de entregas",
  },
  {
    title: "Design",
    text: "Desenhamos a experiência, a hierarquia e a linguagem visual. Os fluxos são revisados antes de virar código.",
    deliverable: "Protótipo navegável e sistema visual",
  },
  {
    title: "Desenvolvimento",
    text: "Construímos interfaces, dados e integrações em módulos claros, com atenção à manutenção e à segurança.",
    deliverable: "Produto funcional em ambiente de validação",
  },
  {
    title: "Validação",
    text: "Revisamos fluxos reais, dispositivos, acessibilidade e desempenho. Ajustamos o que atrapalha a experiência.",
    deliverable: "Testes, revisão e aceite das entregas",
  },
  {
    title: "Publicação",
    text: "Organizamos deploy, domínio e configuração do ambiente. A entrega inclui as orientações para operar o produto.",
    deliverable: "Produto publicado e documentação de uso",
  },
  {
    title: "Evolução",
    text: "Após a entrega, melhorias e manutenção podem ser planejadas conforme o uso e as prioridades do negócio.",
    deliverable: "Plano de evolução conforme contratação",
  },
];
export const projects: Project[] = [
  {
    slug: "mercado-marsola",
    name: "Mercado Marsola",
    category: "Websites",
    segment: "Varejo & comércio local",
    summary: "O mercado do bairro, em uma experiência digital completa.",
    color: "#cbe195",
    image: "/projects/mercado-marsola.webp",
    url: "https://mercado-marsola-campo-limpo.vercel.app",
    demo: false,
    features: [
      "Apresentação institucional",
      "Catálogo de produtos",
      "Promoções",
      "Canais de contato",
    ],
    challenge:
      "Organizar a presença digital de um mercado local e facilitar o acesso às informações, aos produtos e às promoções.",
    solution:
      "Uma interface de varejo com navegação por conteúdo, destaque para ofertas e caminhos diretos de contato.",
    technologies: ["Next.js", "React", "TypeScript"],
  },
  {
    slug: "nexostock",
    name: "NexoStock",
    category: "SaaS",
    segment: "Gestão & operação",
    summary: "Estoque, vendas e decisões. No mesmo lugar.",
    color: "#c1b7f7",
    image: "/projects/nexostock.webp",
    url: "https://nexostock-gestao.vercel.app",
    demo: false,
    features: [
      "Visão da operação",
      "Controle de estoque",
      "Gestão de vendas",
      "Interface administrativa",
    ],
    challenge:
      "Reunir informações de estoque e vendas em uma interface que facilite a rotina de gestão.",
    solution:
      "Uma plataforma de gestão com hierarquia de indicadores e navegação orientada às tarefas operacionais.",
    technologies: ["Next.js", "React", "TypeScript"],
  },
  {
    slug: "sistema-celulares",
    name: "Sistema Celulares",
    category: "Websites",
    segment: "Tecnologia & serviços",
    summary: "Produtos, assistência e unidades conectados à marca.",
    color: "#a8c6ee",
    image: "/projects/sistema-celulares.webp",
    url: "https://sistema-celulares-gamma.vercel.app",
    demo: false,
    features: [
      "Catálogo de produtos",
      "Apresentação dos serviços",
      "Localização das unidades",
      "Contato comercial",
    ],
    challenge:
      "Apresentar produtos e serviços com clareza e facilitar o contato com as unidades.",
    solution:
      "Um site institucional que organiza a oferta comercial e aproxima o visitante dos canais de atendimento.",
    technologies: ["Web responsiva", "Interfaces web", "SEO semântico"],
  },
  {
    slug: "conectarobotica",
    name: "ConectaRobótica",
    category: "Sistemas",
    segment: "Educação & robótica",
    summary: "Aprendizado, conteúdo e gestão em uma só plataforma.",
    color: "#eeaf78",
    demo: true,
    features: [
      "Trilhas de aprendizagem",
      "Área de alunos",
      "Gestão de conteúdo",
      "Painel administrativo",
    ],
    challenge:
      "Conceito para reunir apresentação institucional, ensino de robótica e gestão em uma experiência coerente.",
    solution:
      "Proposta demonstrativa de plataforma com jornadas separadas para alunos e administradores.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    slug: "clinica-odontologica",
    name: "Clínica Odontológica",
    category: "Websites",
    segment: "Saúde & bem-estar",
    summary: "Uma jornada de informação até o primeiro contato.",
    color: "#a5c7b4",
    demo: true,
    features: [
      "Especialidades",
      "Equipe e estrutura",
      "Contato e localização",
      "Experiência mobile",
    ],
    challenge:
      "Conceito de presença digital para apresentar especialidades e facilitar o contato de pacientes.",
    solution:
      "Proposta demonstrativa com leitura acessível, conteúdo organizado e caminhos claros de agendamento.",
    technologies: ["Next.js", "React", "TypeScript"],
  },
  {
    slug: "sistema-restaurante",
    name: "Sistema de Restaurante",
    category: "Sistemas",
    segment: "Alimentação",
    summary: "Do cardápio à operação. Sem perder o pedido.",
    color: "#e6a582",
    demo: true,
    features: [
      "Cardápio digital",
      "Fluxo de pedidos",
      "Gestão de produtos",
      "Visão operacional",
    ],
    challenge:
      "Conceito para reduzir a dispersão de informações entre cardápio, pedidos e operação.",
    solution:
      "Proposta demonstrativa de sistema com pedidos organizados por etapa e gestão centralizada.",
    technologies: ["React", "Node.js", "PostgreSQL"],
  },
  {
    slug: "sistema-oficina",
    name: "Sistema de Oficina",
    category: "Sistemas",
    segment: "Serviços automotivos",
    summary: "Cada serviço com contexto, histórico e controle.",
    color: "#bbbcc7",
    demo: true,
    features: [
      "Ordens de serviço",
      "Orçamentos",
      "Estoque de peças",
      "Histórico de atendimento",
    ],
    challenge:
      "Conceito para acompanhar serviços, peças e orçamentos em um fluxo consistente.",
    solution:
      "Proposta demonstrativa que conecta o atendimento à execução e ao histórico do veículo.",
    technologies: ["React", "TypeScript", "PostgreSQL"],
  },
  {
    slug: "erp-crm",
    name: "ERP / CRM",
    category: "Sistemas",
    segment: "Gestão comercial",
    summary: "Relacionamento e operação falando a mesma língua.",
    color: "#95b7d9",
    demo: true,
    features: [
      "Pipeline comercial",
      "Cadastro de clientes",
      "Gestão administrativa",
      "Indicadores",
    ],
    challenge:
      "Conceito para aproximar informações comerciais e administrativas sem duplicar tarefas.",
    solution:
      "Proposta demonstrativa com visão do funil, contexto do cliente e dados operacionais conectados.",
    technologies: ["React", "Node.js", "PostgreSQL"],
  },
];
