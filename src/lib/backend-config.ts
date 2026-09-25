// Public project identifiers, never privileged credentials. Environment overrides support migration.
export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://beguiuayerrzofuiigcs.supabase.co";
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_TNWZwoblgmNXEQ_1QU1I_A_-Selj6hV";
