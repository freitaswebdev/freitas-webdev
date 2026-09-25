import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const paths = [
  "/",
  "/servicos",
  "/projetos",
  "/processo",
  "/sobre",
  "/contato",
  "/solicitar-projeto",
  "/privacidade",
  "/projetos/mercado-marsola",
  "/projetos/nexostock",
  "/projetos/sistema-celulares",
  "/projetos/conectarobotica",
  "/projetos/clinica-odontologica",
  "/projetos/sistema-restaurante",
  "/projetos/sistema-oficina",
  "/projetos/erp-crm",
];
test("public routes, SEO, links, and console", async ({ page, request }) => {
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const links = new Set<string>();
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    expect(
      new URL(
        (await page.locator('link[rel="canonical"]').getAttribute("href"))!,
      ).pathname,
    ).toBe(path);
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.{30,}/,
    );
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((elements) => elements.map((e) => e.getAttribute("href")!)))
      links.add(href.split("#")[0]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
  for (const link of links) {
    const r = await request.get(link);
    expect(r.status(), link).toBeLessThan(400);
  }
  expect(errors).toEqual([]);
  expect((await request.get("/rota-inexistente")).status()).toBe(404);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/projetos/mercado-marsola");
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /admin",
  );
});
test("mobile navigation, keyboard and project filters", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
  await page.goto("/projetos");
  await page.getByRole("button", { name: "SaaS" }).click();
  await expect(page.locator(".project-gallery article")).toHaveCount(1);
  await page.getByRole("heading", { name: "NexoStock", exact: true }).click();
  await expect(page).toHaveURL(/\/projetos\/nexostock/);
  await expect(
    page.getByRole("link", { name: "Visitar projeto" }),
  ).toHaveAttribute("target", "_blank");
});
test("accessibility and reduced motion", async ({ page }) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of [
    "/",
    "/servicos",
    "/projetos",
    "/contato",
    "/solicitar-projeto",
    "/admin",
  ]) {
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(result.violations, path).toEqual([]);
  }
  await page.goto("/");
  expect(
    await page
      .locator(".hero-copy")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});
test("responsive pages at narrow and tablet widths", async ({ page }) => {
  test.setTimeout(120000);
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/servicos",
      "/projetos",
      "/contato",
      "/solicitar-projeto",
      "/admin",
      "/projetos/mercado-marsola",
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path} at ${width}`,
      ).toBeTruthy();
    }
  }
});
test("form validation, WhatsApp and protected endpoints", async ({
  page,
  request,
  baseURL,
}) => {
  await page.goto("/contato");
  await page.getByRole("button", { name: "Enviar projeto" }).click();
  await expect(page.locator("#name:invalid")).toHaveCount(1);
  const wa = await page
    .locator('a[href^="https://wa.me/"]')
    .first()
    .getAttribute("href");
  expect(wa).toContain("5511983600255");
  expect(new URL(wa!).searchParams.get("text")).toContain("Freitas WebDev");
  const invalid = await request.post("/api/leads", { data: { name: "a" } });
  expect(invalid.status()).toBe(400);
  const csrf = await request.patch("/api/admin", {
    headers: { origin: "https://invalid.example" },
    data: { action: "settings", settings: {} },
  });
  expect(csrf.status()).toBe(403);
  const denied = await request.patch("/api/admin", {
    headers: { origin: baseURL! },
    data: { action: "settings", settings: {} },
  });
  expect(denied.status()).toBe(401);
  const noauth = await request.delete("/api/admin", {
    headers: { origin: baseURL! },
    data: { id: "00000000-0000-0000-0000-000000000000" },
  });
  expect(noauth.status()).toBe(401);
});
