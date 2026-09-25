import "server-only";
import { defaultContacts } from "@/data/content";
import { supabaseUrl, supabaseKey } from "./backend-config";
import type { ContactSettings } from "@/types/content";
export async function getContacts(): Promise<ContactSettings> {
  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/site_settings?id=eq.1&select=whatsapp,email,instagram`,
      {
        headers: { apikey: supabaseKey },
        next: { revalidate: 60, tags: ["contacts"] },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!response.ok) return defaultContacts;
    const data = await response.json();
    return data[0] || defaultContacts;
  } catch {
    return defaultContacts;
  }
}
