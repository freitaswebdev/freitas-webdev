import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getAdmin } from "@/lib/supabase";
import { settingsSchema } from "@/lib/validation";
import { sameOrigin } from "@/lib/http";
export async function PATCH(request: Request) {
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
    const body = await request.json();
    if (body.action === "settings") {
      const parsed = settingsSchema.safeParse(body.settings);
      if (!parsed.success)
        return NextResponse.json(
          { error: parsed.error.issues[0].message },
          { status: 400 },
        );
      const { error } = await admin.client
        .from("site_settings")
        .update({ ...parsed.data, updated_at: new Date().toISOString() })
        .eq("id", 1);
      if (error) throw error;
      revalidateTag("contacts", { expire: 0 });
      return NextResponse.json({ ok: true });
    }
    if (body.action === "lead-status") {
      if (
        !["novo", "em_contato", "concluido"].includes(body.status) ||
        typeof body.id !== "string"
      )
        return NextResponse.json(
          { error: "Dados inválidos." },
          { status: 400 },
        );
      const { error } = await admin.client
        .from("leads")
        .update({ status: body.status })
        .eq("id", body.id);
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Ação inválida." }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível salvar. Tente novamente." },
      { status: 400 },
    );
  }
}
export async function DELETE(request: Request) {
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
    const { id } = await request.json();
    if (typeof id !== "string")
      return NextResponse.json(
        { error: "Identificador inválido." },
        { status: 400 },
      );
    const { error } = await admin.client.from("leads").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível excluir." },
      { status: 400 },
    );
  }
}
