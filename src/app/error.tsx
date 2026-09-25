"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="error-page container">
      <span className="eyebrow">ALGO SAIU DO ESPERADO</span>
      <h1>
        Vamos tentar
        <br />
        mais uma vez.
      </h1>
      <p>Não foi possível carregar esta página agora.</p>
      <button className="button" onClick={reset}>
        Tentar novamente
      </button>
    </section>
  );
}
