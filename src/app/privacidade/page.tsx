import { PageHero } from "@/components/ui";
import { getContacts } from "@/lib/contacts";
import { metadata as pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Privacidade",
  "Saiba como a Freitas WebDev utiliza os dados enviados pelos formulários e os canais disponíveis para solicitar atendimento sobre privacidade.",
  "/privacidade",
);
export default async function Page() {
  const { email } = await getContacts();
  return (
    <>
      <PageHero
        label="TRANSPARÊNCIA / PRIVACIDADE"
        title="Seus dados. Com clareza."
        description="Informações sobre o tratamento de dados neste website. Atualizado em 25 de setembro de 2026."
      />
      <article className="container privacy inner-content">
        <h2>O que recebemos</h2>
        <p>
          Quando você envia um formulário, recebemos nome, empresa (se
          informada), e-mail, telefone, tipo de projeto, descrição e, quando
          preenchidos, orçamento e prazo aproximados. Também registramos a data
          do envio e a concordância com o contato.
        </p>
        <h2>Para que usamos</h2>
        <p>
          Usamos esses dados para entender sua solicitação, responder ao contato
          e preparar uma eventual proposta. O envio não inscreve você em listas
          de marketing. Não comercializamos seus dados.
        </p>
        <h2>Armazenamento e acesso</h2>
        <p>
          Os formulários são armazenados no Supabase, com banco configurado na
          região de São Paulo. A hospedagem é fornecida pela Vercel. Esses
          provedores participam da operação técnica e podem processar registros
          de conexão e segurança. O acesso ao painel e às solicitações é
          restrito a administradores autorizados.
        </p>
        <h2>Proteção contra abuso</h2>
        <p>
          Para limitar envios automatizados, um identificador derivado do e-mail
          é usado temporariamente na proteção do formulário. Ele não é exibido
          publicamente. Campos ocultos de detecção de robôs ajudam a reduzir
          spam.
        </p>
        <h2>Cookies e métricas</h2>
        <p>
          A navegação pública não ativa ferramentas de publicidade ou Google
          Analytics por padrão. O painel administrativo utiliza cookies
          necessários para manter uma sessão autenticada. Caso ferramentas de
          análise sejam ativadas futuramente, esta página e os controles de
          preferência deverão ser atualizados antes da coleta.
        </p>
        <h2>Retenção e solicitações</h2>
        <p>
          As informações são mantidas para atender à solicitação e acompanhar a
          negociação. Você pode pedir acesso, correção ou exclusão dos dados de
          contato enviando uma mensagem para{" "}
          <a className="text-link" href={`mailto:${email}`}>
            {email}
          </a>
          . Registros necessários ao cumprimento de obrigações aplicáveis podem
          ser preservados.
        </p>
        <h2>Serviços externos</h2>
        <p>
          Links de WhatsApp, Instagram e projetos abrem serviços externos,
          sujeitos às respectivas políticas de privacidade. Ao continuar a
          conversa nesses canais, evite compartilhar informações sensíveis
          desnecessárias.
        </p>
      </article>
    </>
  );
}
