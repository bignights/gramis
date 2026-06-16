import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqnverg";

export const TIER_CAPS = {
  founder: 69,
  priority: 300,
  early_adopter: 1000,
} as const;

export type Tier = "founder" | "priority" | "early_adopter";

const emailSchema = z.string().trim().toLowerCase().email().max(254);

export const getWaitlistStats = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin: client } = await import("@/integrations/supabase/client.server");
  const supabaseAdmin = client as any;
  const counts: Record<Tier, number> = { founder: 0, priority: 0, early_adopter: 0 };
  for (const tier of Object.keys(counts) as Tier[]) {
    const { count } = await supabaseAdmin
      .from("waitlist_signups")
      .select("*", { count: "exact", head: true })
      .eq("tier", tier);
    counts[tier] = count ?? 0;
  }
  return {
    founder: counts.founder,
    priority: counts.priority,
    earlyAdopter: counts.early_adopter,
    total: counts.founder + counts.priority + counts.early_adopter,
  };
});

export const joinWaitlist = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: emailSchema,
      sourceButton: z.enum(["hero", "founder", "priority", "early_adopter"]),
    }),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin: client } = await import("@/integrations/supabase/client.server");
    const supabaseAdmin = client as any;

    // Already joined?
    const { data: existing } = await supabaseAdmin
      .from("waitlist_signups")
      .select("tier")
      .eq("email", data.email)
      .maybeSingle();
    if (existing) {
      return { status: "already_joined" as const, tier: existing.tier as Tier };
    }

    // Counts
    const counts: Record<Tier, number> = { founder: 0, priority: 0, early_adopter: 0 };
    for (const tier of Object.keys(counts) as Tier[]) {
      const { count } = await supabaseAdmin
        .from("waitlist_signups")
        .select("*", { count: "exact", head: true })
        .eq("tier", tier);
      counts[tier] = count ?? 0;
    }

    // Decide tier
    const preferred =
      data.sourceButton === "hero" ? null : (data.sourceButton as Tier);
    const order: Tier[] = ["founder", "priority", "early_adopter"];
    let assigned: Tier | null = null;
    if (preferred && counts[preferred] < TIER_CAPS[preferred]) {
      assigned = preferred;
    } else {
      for (const t of order) {
        if (counts[t] < TIER_CAPS[t]) {
          assigned = t;
          break;
        }
      }
    }
    if (!assigned) return { status: "closed" as const };

    const { error } = await supabaseAdmin
      .from("waitlist_signups")
      .insert({ email: data.email, tier: assigned, source_button: data.sourceButton });
    if (error) {
      if (error.code === "23505") {
        return { status: "already_joined" as const, tier: assigned };
      }
      throw new Error(error.message);
    }

    // Mirror to Formspree (best effort)
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: data.email,
          tier: assigned,
          source_button: data.sourceButton,
        }),
      });
    } catch {
      // Ignore; DB is source of truth
    }

    return { status: "ok" as const, tier: assigned };
  });

export const getAllSignups = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin: client } = await import("@/integrations/supabase/client.server");
    const supabaseAdmin = client as any;
    // Verify admin via has_role
    const { data: roleRow } = await (context.supabase as any)
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Error("Forbidden");

    const { data, error } = await supabaseAdmin
      .from("waitlist_signups")
      .select("id, email, tier, source_button, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });
