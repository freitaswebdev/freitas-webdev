import { Button, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="error-page container">
      <Eyebrow>404 / ROTA NÃO ENCONTRADA</Eyebrow>
      <h1>
        Este caminho
        <br />
        ainda não existe.
      </h1>
      <p>Volte ao início ou explore os projetos do estúdio.</p>
      <Button href="/">Voltar para a Home</Button>
    </section>
  );
}
