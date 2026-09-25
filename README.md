# Freitas WebDev

Website institucional multipágina em Next.js, React e TypeScript. Design autoral escuro com vermelho, fontes locais Manrope/Space Grotesk, geometria em CSS, portfólio com capturas reais, formulários persistentes e painel protegido no Supabase.

## Rodar

Node.js 24 e pnpm. Instale com `pnpm install --frozen-lockfile`, rode `pnpm dev`. Produção: `pnpm build` e `pnpm start`. O lockfile fixa as dependências. `pnpm typecheck` verifica o TypeScript e `pnpm test:e2e` executa a suíte de navegador contra o servidor em execução. Defina `CHROME_PATH` se usar um Chrome já instalado ou instale o navegador do Playwright. `TEST_BASE_URL` permite testar outra origem.

## Estrutura

- `src/app`: páginas, metadados, sitemap, robots, imagens sociais e APIs.
- `src/components`: elementos reutilizáveis, navegação, formulários e administração.
- `src/sections`: composição modular da Home e das páginas internas.
- `src/data/content.ts`: serviços, processo e cases tipados.
- `src/lib`: autenticação, validação, contatos e configuração pública.
- `src/types`: contratos de conteúdo.
- `public/projects`: capturas otimizadas dos três projetos publicados.
- `supabase/schema.sql`: estrutura aplicada em duas migrações ao projeto exclusivo.
- `supabase/submit-lead.ts`: Edge Function de captação. É executada no runtime Deno do Supabase, por isso está fora da compilação TypeScript do Next.js.
- `tests`: testes de rotas, metadados, navegação, acessibilidade, responsividade e proteção de endpoints.

## Decisões de interface

CSS com tokens de cor, tipografia, espaçamento, bordas e animação foi suficiente para as interações; não foram mantidas dependências de animação sem uso. Scroll nativo suave, empilhamento sticky, processo com introdução fixa, reveals via IntersectionObserver, progressão de scroll e parallax CSS. A geometria da abertura reage ao ponteiro em dispositivos compatíveis. `prefers-reduced-motion` remove movimentos não essenciais e o empilhamento. O mobile tem composição própria. Fontes são hospedadas pelo próprio site.

## Painel

Rota `/admin`. A conta administradora foi provisionada sem cadastro público de administradores. A senha inicial está no arquivo de acesso entregue separadamente, fora deste projeto e dos arquivos de publicação. Troque-a no painel.

O painel edita WhatsApp, e-mail e Instagram, lista solicitações com paginação, altera status e exclui dados mediante confirmação. Instagram vazio não gera link público. Todas as operações são validadas no servidor e protegidas por RLS. `site_admins` concede acesso por UUID autenticado; dados editáveis pelo usuário não conferem privilégios.

A tabela protegida `content_documents` prepara futuras edições de projetos, serviços, depoimentos, textos, imagens e SEO. Essas interfaces de edição não fazem parte do painel atual, conforme escopo solicitado. O conteúdo público hoje vem de módulos tipados.

## Infraestrutura e proteção

Supabase exclusivo: `beguiuayerrzofuiigcs`, região São Paulo. Os identificadores e a chave _publishable_ em `backend-config.ts` são públicos e não concedem acesso administrativo; podem ser sobrescritos por variáveis de ambiente. Nenhuma chave `service_role`, senha ou credencial de administrador é enviada ao frontend. A Edge Function usa a chave privilegiada apenas no ambiente protegido do Supabase.

Formulários: validação cliente/servidor, consentimento, limite de tamanho, honeypot e limite de cinco solicitações por e-mail por hora. O identificador de controle é um hash do e-mail e é limpo após 24 horas na próxima chamada. O limite não substitui um WAF contra ataques distribuídos. Erros não exibem detalhes do banco. Contatos não são enviados automaticamente por e-mail; ficam na caixa do painel. Os testes removeram suas próprias solicitações.

Cookies de autenticação: HttpOnly, Secure em produção e SameSite=Lax. Alterações administrativas exigem a mesma origem e autorização no servidor e banco. Páginas administrativas usam no-store e noindex. A função temporária de provisionamento foi encerrada após criar a conta e não permite criar novos administradores.

O recurso nativo Supabase de bloquear senhas vazadas não está habilitado no plano/configuração atual. A senha inicial é aleatória, e a troca pelo painel exige 12 caracteres e confirmação da senha atual. Ativação do recurso nativo, se disponível: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection

## Publicação e domínio

Projeto preparado para Vercel/Next.js. A publicação inclui fontes e capturas locais. `.env.example` lista as opções. Ao conectar domínio próprio, altere `NEXT_PUBLIC_SITE_URL`, publique novamente e confirme canonical, sitemap, robots e Open Graph. Não use o domínio temporário como propriedade definitiva se já houver domínio da marca.

## Google e SEO local

- Adicione a propriedade do domínio no Google Search Console. Use DNS ou `GOOGLE_SITE_VERIFICATION` para verificação.
- Envie `/sitemap.xml`. Sitemap inclui páginas públicas e oito cases; não inclui admin e APIs.
- Google Analytics fica desativado sem `NEXT_PUBLIC_GA_ID`. Ao configurar `G-...`, o site solicita consentimento antes de carregar o script. A preferência pode ser revista no rodapé. Não são enviados valores dos formulários ao Analytics. Atualize a política de privacidade antes de ativá-lo.
- Cadastre ou vincule o Google Business Profile com dados comerciais verificados, área de serviço e a URL definitiva. Não foram inventados endereço físico, CNPJ, avaliações ou horários.
- A copy contempla Jundiaí, Campo Limpo Paulista e Várzea Paulista. Páginas locais adicionais só devem ser criadas com conteúdo próprio e útil.
- Metadados individuais, canonical, Open Graph, Twitter Cards, Organization/ProfessionalService, WebSite, Service e BreadcrumbList foram implementados. Nenhuma posição em buscadores é garantida.

## Conteúdo do portfólio

Mercado Marsola, NexoStock e Sistema Celulares têm capturas e links de versões públicas verificadas. ConectaRobótica, Clínica Odontológica, Sistema de Restaurante, Sistema de Oficina e ERP/CRM estão explicitamente classificados como conceitos demonstrativos até haver materiais confirmados. Não há depoimentos, números de clientes, anos de entrega ou resultados comerciais inventados.

## Manutenção

Após alterações, execute build, TypeScript e a suíte de navegador. Para rotacionar um administrador, use o gerenciamento de usuários do Supabase e a tabela `site_admins`, nunca credenciais no código. Mudanças no formulário precisam ser refletidas na validação Next.js, Edge Function e restrições do banco. O schema entregue documenta a implantação inicial: use uma nova migração para alterações futuras.
