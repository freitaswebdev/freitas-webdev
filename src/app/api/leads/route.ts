import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";
import { supabaseUrl, supabaseKey } from "@/lib/backend-config";
export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin)
      return NextResponse.json(
        { error: "Origem não permitida." },
        { status: 403 },
      );
    if (Number(request.headers.get("content-length") || 0) > 16000)
      return NextResponse.json(
        { error: "Mensagem muito longa." },
        { status: 413 },
      );
    const raw = await request.text();
    if (raw.length > 16000)
      return NextResponse.json(
        { error: "Mensagem muito longa." },
        { status: 413 },
      );
    const parsed = leadSchema.safeParse(JSON.parse(raw));
    if (!parsed.success)
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Confira os campos." },
        { status: 400 },
      );
    if (parsed.data.website) return NextResponse.json({ ok: true });
    const response = await fetch(`${supabaseUrl}/functions/v1/submit-lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify(parsed.data),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok)
      return NextResponse.json(
        {
          error:
            response.status === 429
              ? "Muitos envios recentes. Aguarde uma hora ou converse pelo WhatsApp."
              : "Não foi possível salvar agora. Tente novamente ou use o WhatsApp.",
        },
        { status: response.status === 429 ? 429 : 503 },
      );
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        error:
          "Não foi possível processar o envio. Confira os campos e tente novamente.",
      },
      { status: 400 },
    );
  }
}
