"use server";

import { requireAdmin } from "@/lib/admin/dal";
import { getActiveUsersCount } from "@/lib/admin/analytics";

export async function getActiveUsersNow() {
  const { supabase } = await requireAdmin();
  return getActiveUsersCount(supabase);
}
