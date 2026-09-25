"use client";
import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { services } from "@/data/content";
export function LeadForm({
  extended = false,
  initialType = "",
}: {
  extended?: boolean;
  initialType?: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const notice = useRef<HTMLDivElement>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, consent: values.consent === "on" }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(
          data.error || "Não foi possível enviar agora. Tente novamente.",
        );
      setStatus("success");
      setMessage(
        "Seu projeto foi recebido. A Freitas WebDev poderá entrar em contato pelos dados informados.",
      );
      form.reset();
      requestAnimationFrame(() => notice.current?.focus());
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Falha de conexão. Tente novamente.",
      );
      requestAnimationFrame(() => notice.current?.focus());
    }
  }
  return (
    <form className="form-card" onSubmit={submit}>
      <h2>
        {extended
          ? "Conte o que precisa funcionar."
          : "Vamos começar uma conversa."}
      </h2>
      <p className="form-intro">
        {extended
          ? "Quanto mais contexto, melhor podemos orientar o próximo passo."
          : "Preencha os dados e descreva o que você precisa."}{" "}
        Campos com * são obrigatórios.
      </p>
      {message && (
        <div
          ref={notice}
          tabIndex={-1}
          className={`form-message ${status === "success" ? "success" : ""}`}
          role={status === "success" ? "status" : "alert"}
        >
          {status === "success" && (
            <CheckCircle2 size={18} aria-hidden="true" />
          )}{" "}
          {message}
        </div>
      )}
      {extended && (
        <div className="request-progress">
          <span>
            <b>01</b> Seu contexto
          </span>
          <span>
            <b>02</b> O projeto
          </span>
          <span>
            <b>03</b> Próximo passo
          </span>
        </div>
      )}
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Seu nome *</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Como podemos chamar você?"
            required
            minLength={2}
            maxLength={100}
          />
        </div>
        <div className="field">
          <label htmlFor="company">Empresa</label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="Nome do seu negócio"
            maxLength={140}
          />
        </div>
        <div className="field">
          <label htmlFor="email">E-mail *</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@empresa.com"
            required
            maxLength={254}
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Telefone / WhatsApp *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            required
            minLength={8}
            maxLength={30}
            pattern="[+0-9\s().\-]+"
          />
        </div>
        <div className={`field ${extended ? "" : "field-full"}`}>
          <label htmlFor="type">Tipo de projeto *</label>
          <select
            id="type"
            name="type"
            required
            defaultValue={
              services.some((s) => s.name === initialType) ? initialType : ""
            }
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {services.map((s) => (
              <option key={s.name}>{s.name}</option>
            ))}
            <option>Ainda preciso de orientação</option>
          </select>
        </div>
        {extended && (
          <>
            <div className="field">
              <label htmlFor="budget">Investimento aproximado</label>
              <select id="budget" name="budget" defaultValue="A definir">
                <option>A definir</option>
                <option>Até R$ 5 mil</option>
                <option>R$ 5 mil a R$ 15 mil</option>
                <option>R$ 15 mil a R$ 30 mil</option>
                <option>Acima de R$ 30 mil</option>
              </select>
            </div>
            <div className="field field-full">
              <label htmlFor="deadline">Quando você precisa começar?</label>
              <select id="deadline" name="deadline" defaultValue="A definir">
                <option>A definir</option>
                <option>O quanto antes</option>
                <option>No próximo mês</option>
                <option>Nos próximos 3 meses</option>
                <option>Estou planejando para depois</option>
              </select>
            </div>
          </>
        )}
        <div className="field field-full">
          <label htmlFor="message">O que seu negócio precisa resolver? *</label>
          <textarea
            id="message"
            name="message"
            placeholder="Conte sobre seu objetivo, o cenário atual e o que espera do projeto."
            required
            minLength={20}
            maxLength={5000}
          />
        </div>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="form-consent">
        <input name="consent" type="checkbox" required />
        <span>
          Concordo com o uso dos dados informados para responder a esta
          solicitação, conforme a{" "}
          <Link href="/privacidade">Política de Privacidade</Link>.
        </span>
      </label>
      <button
        className="button form-submit"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Enviando..." : "Enviar projeto"}
        <ArrowUpRight size={18} />
      </button>
      <p className="form-help">
        Seus dados são enviados à Freitas WebDev. Nenhum cadastro em newsletter
        é feito.
      </p>
    </form>
  );
}
