"use client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, LogOut, Save, LockKeyhole } from "lucide-react";
import type { ContactSettings } from "@/types/content";
export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  type: string;
  budget: string;
  deadline: string;
  message: string;
  created_at: string;
  status: string;
};
async function api(url: string, data: object, method = "POST") {
  const r = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await r.json();
  if (!r.ok) throw new Error(result.error || "Ocorreu um erro.");
  return result;
}
export function AdminLogin() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await api("/api/auth/login", data);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao entrar.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="admin-login form-card">
      <LockKeyhole size={26} color="#f04452" />
      <h2 style={{ marginTop: 20 }}>Acesso administrativo</h2>
      <p className="form-intro">
        Entre com sua conta autorizada para gerenciar contatos e solicitações.
      </p>
      <form onSubmit={submit}>
        {error && (
          <p className="form-message" role="alert">
            {error}
          </p>
        )}
        <div className="field">
          <label htmlFor="admin-email">E-mail</label>
          <input
            id="admin-email"
            type="email"
            name="email"
            autoComplete="username"
            required
            maxLength={254}
          />
        </div>
        <div className="field">
          <label htmlFor="admin-password">Senha</label>
          <input
            id="admin-password"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            maxLength={200}
          />
        </div>
        <button className="button" disabled={busy}>
          {busy ? "Entrando..." : "Entrar no painel"}
          <ArrowUpRight size={18} />
        </button>
      </form>
      <p className="form-help">
        Acesso exclusivo à conta administradora provisionada. Não há cadastro
        público de administradores.
      </p>
    </div>
  );
}
export function AdminPanel({
  settings,
  leads,
  email,
  total,
  page,
}: {
  settings: ContactSettings;
  leads: Lead[];
  email: string;
  total: number;
  page: number;
}) {
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setNotice("");
    setError("");
    try {
      await api(
        "/api/admin",
        {
          action: "settings",
          settings: Object.fromEntries(new FormData(e.currentTarget)),
        },
        "PATCH",
      );
      setNotice("Contatos atualizados no site.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    try {
      await api("/api/auth/logout", {});
      router.refresh();
    } catch {
      setError("Não foi possível sair. Tente novamente.");
    }
  }
  async function leadStatus(id: string, status: string) {
    try {
      await api("/api/admin", { action: "lead-status", id, status }, "PATCH");
      router.refresh();
    } catch {
      setError("Não foi possível atualizar a solicitação.");
    }
  }
  async function remove(id: string) {
    if (
      !window.confirm(
        "Excluir permanentemente esta solicitação e seus dados de contato?",
      )
    )
      return;
    try {
      await api("/api/admin", { id }, "DELETE");
      router.refresh();
    } catch {
      setError("Não foi possível excluir a solicitação.");
    }
  }
  async function password(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setPasswordMessage("");
    setBusy(true);
    const data = Object.fromEntries(new FormData(form));
    if (data.password !== data.confirm) {
      setPasswordMessage("As novas senhas não conferem.");
      setBusy(false);
      return;
    }
    try {
      await api("/api/auth/password", data);
      form.reset();
      router.refresh();
    } catch (err) {
      setPasswordMessage(
        err instanceof Error ? err.message : "Erro ao alterar senha.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="admin-top">
        <div>
          <h1>Visão do estúdio.</h1>
          <p>{email}</p>
        </div>
        <button className="button button-secondary" onClick={logout}>
          Sair
          <LogOut size={16} />
        </button>
      </div>
      {error && (
        <p role="alert" className="form-message">
          {error}
        </p>
      )}
      <div className="admin-grid">
        <div>
          <form className="form-card admin-settings" onSubmit={save}>
            <h2>Contatos públicos</h2>
            <p className="form-intro">
              Alterações refletem no rodapé, no contato e nos botões do site.
            </p>
            {notice && (
              <p role="status" className="form-message success">
                {notice}
              </p>
            )}
            <div className="field">
              <label htmlFor="whatsapp">WhatsApp — país, DDD e número</label>
              <input
                id="whatsapp"
                name="whatsapp"
                defaultValue={settings.whatsapp}
                pattern="[0-9]{10,15}"
                inputMode="tel"
                required
              />
              <small className="form-help">Exemplo: 5511983600255</small>
            </div>
            <div className="field">
              <label htmlFor="contact-email">E-mail público</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                defaultValue={settings.email}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="instagram">
                Instagram — URL completa (opcional)
              </label>
              <input
                id="instagram"
                name="instagram"
                type="url"
                placeholder="https://www.instagram.com/seuperfil"
                defaultValue={settings.instagram}
              />
              <small className="form-help">
                Deixe vazio para ocultar o Instagram no site.
              </small>
            </div>
            <button className="button" disabled={busy}>
              {busy ? "Salvando..." : "Salvar contatos"}
              <Save size={16} />
            </button>
          </form>
          <form className="form-card admin-password" onSubmit={password}>
            <h2>Segurança da conta</h2>
            <p className="form-intro">
              Use uma senha única com pelo menos 12 caracteres. A troca encerra
              as sessões existentes.
            </p>
            {passwordMessage && (
              <p role="alert" className="form-message">
                {passwordMessage}
              </p>
            )}
            <div className="form-grid">
              <div className="field field-full">
                <label htmlFor="current">Senha atual</label>
                <input
                  id="current"
                  name="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </div>
              <div className="field field-full">
                <label htmlFor="new">Nova senha</label>
                <input
                  id="new"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={12}
                  maxLength={128}
                  required
                />
              </div>
              <div className="field field-full">
                <label htmlFor="confirm">Repita a nova senha</label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  autoComplete="new-password"
                  minLength={12}
                  maxLength={128}
                  required
                />
              </div>
              <button
                className="button button-secondary field-full"
                disabled={busy}
              >
                Alterar senha e sair <LockKeyhole size={16} />
              </button>
            </div>
          </form>
          <div className="admin-extensions">
            <h3>Estrutura de conteúdo</h3>
            <p>
              O projeto contém módulos e estrutura protegida para futuras
              edições de projetos, serviços, depoimentos, textos, imagens e SEO.
            </p>
          </div>
        </div>
        <section className="form-card">
          <h2>
            Solicitações <span className="muted">({total})</span>
          </h2>
          <p className="form-intro">
            Contatos enviados pelos formulários do site. Nenhuma solicitação é
            pública.
          </p>
          {!leads.length && (
            <p className="empty-state">Ainda não há solicitações recebidas.</p>
          )}
          {leads.map((lead) => (
            <article className="admin-lead" key={lead.id}>
              <small>
                {new Date(lead.created_at).toLocaleString("pt-BR", {
                  timeZone: "America/Sao_Paulo",
                })}{" "}
                · {lead.type}
              </small>
              <h3>
                {lead.name}
                {lead.company ? ` / ${lead.company}` : ""}
              </h3>
              <p>
                <a href={`mailto:${lead.email}`}>{lead.email}</a>
                <br />
                <a href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`}>
                  {lead.phone}
                </a>
              </p>
              <p>{lead.message}</p>
              <p>
                Investimento: {lead.budget}
                <br />
                Prazo: {lead.deadline}
              </p>
              <label className="sr-only" htmlFor={`status-${lead.id}`}>
                Status de {lead.name}
              </label>
              <select
                id={`status-${lead.id}`}
                value={lead.status}
                onChange={(e) => leadStatus(lead.id, e.target.value)}
              >
                <option value="novo">Novo</option>
                <option value="em_contato">Em contato</option>
                <option value="concluido">Concluído</option>
              </select>
              <button
                type="button"
                className="delete-lead"
                onClick={() => remove(lead.id)}
              >
                Excluir solicitação
              </button>
            </article>
          ))}
          {total > 20 && (
            <nav className="pagination" aria-label="Páginas de solicitações">
              <button
                disabled={page <= 1}
                onClick={() => router.push(`/admin?pagina=${page - 1}`)}
              >
                Anterior
              </button>
              <span>
                Página {page} de {Math.ceil(total / 20)}
              </span>
              <button
                disabled={page * 20 >= total}
                onClick={() => router.push(`/admin?pagina=${page + 1}`)}
              >
                Próxima
              </button>
            </nav>
          )}
        </section>
      </div>
    </>
  );
}
