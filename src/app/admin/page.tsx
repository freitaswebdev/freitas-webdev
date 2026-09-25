import { AdminLogin, AdminPanel, type Lead } from "@/components/admin-panel";
import { getAdmin } from "@/lib/supabase";
import { defaultContacts } from "@/data/content";
export const metadata = {
  title: "Administração",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string }>;
}) {
  const admin = await getAdmin();
  if (!admin)
    return (
      <section className="container admin-page">
        <AdminLogin />
      </section>
    );
  const { pagina } = await searchParams;
  const page = Math.max(
    1,
    Math.min(10000, Number.parseInt(pagina || "1") || 1),
  );
  const [settings, leads] = await Promise.all([
    admin.client
      .from("site_settings")
      .select("whatsapp,email,instagram")
      .eq("id", 1)
      .single(),
    admin.client
      .from("leads")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range((page - 1) * 20, page * 20 - 1),
  ]);
  if (settings.error || leads.error)
    throw new Error("Falha ao carregar dados administrativos");
  return (
    <section className="container admin-page">
      <AdminPanel
        settings={settings.data || defaultContacts}
        leads={(leads.data || []) as Lead[]}
        email={admin.user.email || ""}
        total={leads.count || 0}
        page={page}
      />
    </section>
  );
}
