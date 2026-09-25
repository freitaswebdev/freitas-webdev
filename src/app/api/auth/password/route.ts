import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/supabase";
import { sameOrigin } from "@/lib/http";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json(
      { error: "Origem não permitida." },
      { status: 403 },
    );
  const admin = await getAdmin();
  if (!admin)
    return NextResponse.json(
      { error: "Acesso não autorizado." },
      { status: 401 },
    );
  try {
    const { password, currentPassword } = await request.json();
    if (
      typeof password !== "string" ||
      password.length < 12 ||
      password.length > 128 ||
      typeof currentPassword !== "string"
    )
      return NextResponse.json(
        { error: "Use uma senha de 12 a 128 caracteres." },
        { status: 400 },
      );
    const { error: reauth } = await admin.client.auth.signInWithPassword({
      email: admin.user.email!,
      password: currentPassword,
    });
    if (reauth)
      return NextResponse.json(
        { error: "A senha atual está incorreta." },
        { status: 401 },
      );
    const { error } = await admin.client.auth.updateUser({ password });
    if (error)
      return NextResponse.json(
        {
          error:
            "Não foi possível alterar a senha. Use uma senha diferente da atual.",
        },
        { status: 400 },
      );
    await admin.client.auth.signOut({ scope: "global" });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }
}
