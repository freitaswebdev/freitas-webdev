import { NextResponse } from "next/server";
import { authClient } from "@/lib/supabase";
import { sameOrigin } from "@/lib/http";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json(
      { error: "Origem não permitida." },
      { status: 403 },
    );
  try {
    const { email, password } = await request.json();
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      email.length > 254 ||
      password.length > 200
    )
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    const client = await authClient();
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.user)
      return NextResponse.json(
        {
          error:
            "E-mail ou senha inválidos. Aguarde alguns instantes se houver muitas tentativas.",
        },
        { status: 401 },
      );
    const { data: admin } = await client
      .from("site_admins")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();
    if (!admin) {
      await client.auth.signOut();
      return NextResponse.json(
        { error: "Este usuário não possui acesso administrativo." },
        { status: 403 },
      );
    }
    return NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Não foi possível entrar. Tente novamente." },
      { status: 400 },
    );
  }
}
