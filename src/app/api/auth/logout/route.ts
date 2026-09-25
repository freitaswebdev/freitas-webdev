import { NextResponse } from "next/server";
import { authClient } from "@/lib/supabase";
import { sameOrigin } from "@/lib/http";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json(
      { error: "Origem não permitida." },
      { status: 403 },
    );
  const client = await authClient();
  await client.auth.signOut();
  return NextResponse.json({ ok: true });
}
