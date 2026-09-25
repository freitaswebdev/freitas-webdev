import { createClient } from "https://esm.sh/@supabase/supabase-js@2.117.1";
const publicKey = "sb_publishable_TNWZwoblgmNXEQ_1QU1I_A_-Selj6hV";
const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (
    req.headers.get("apikey") !== publicKey ||
    req.headers.get("authorization") !== `Bearer ${publicKey}`
  )
    return json({ error: "Unauthorized" }, 401);
  try {
    const raw = await req.text();
    if (raw.length > 16000) return json({ error: "Payload too large" }, 413);
    const p = JSON.parse(raw);
    if (p.website) return json({ ok: true });
    const fields: { [key: string]: [number, number] } = {
      name: [2, 100],
      company: [0, 140],
      email: [3, 254],
      phone: [8, 30],
      type: [2, 80],
      budget: [0, 80],
      deadline: [0, 80],
      message: [20, 5000],
    };
    for (const [key, [min, max]] of Object.entries(fields)) {
      if (
        typeof p[key] !== "string" ||
        p[key].trim().length < min ||
        p[key].length > max
      )
        return json({ error: "Invalid fields" }, 400);
    }
    if (
      p.consent !== true ||
      !/^\S+@\S+\.\S+$/.test(p.email) ||
      !/^\+?[\d\s().-]+$/.test(p.phone)
    )
      return json({ error: "Invalid fields" }, 400);
    const hash = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(p.email.toLowerCase().trim()),
    );
    const rateKey = Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const client = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { error } = await client.rpc("accept_lead", {
      payload: p,
      rate_key: rateKey,
    });
    if (error)
      return json(
        {
          error: error.message.includes("RATE_LIMIT")
            ? "Rate limit"
            : "Unable to save",
        },
        error.message.includes("RATE_LIMIT") ? 429 : 500,
      );
    return json({ ok: true }, 201);
  } catch {
    return json({ error: "Invalid request" }, 400);
  }
});
