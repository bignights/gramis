import { createServerFn } from "@tanstack/react-start";
import { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqnverg";

export const TIER_CAPS = {
  founder: 69,
  priority: 300,
  early_adopter: 1000,
} as const;

export type Tier = "founder" | "priority" | "early_adopter";

const emailSchema = z.string().trim().toLowerCase().email().max(254);

export const getWaitlistStats = createServerFn({ method: "GET" }).handler(async () => {
  const client = supabase as SupabaseClient<Database>;
  const { data, error } = await client.rpc("get_waitlist_stats");
  if (error) throw new Error(error.message);
  const row = (data as { founder: number; priority: number; early_adopter: number; total: number }[])?.[0];
  return {
    founder: row?.founder ?? 0,
    priority: row?.priority ?? 0,
    earlyAdopter: row?.early_adopter ?? 0,
    total: row?.total ?? 0,
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
    const client = supabase as SupabaseClient<Database>;
    const { data: result, error } = await client.rpc("join_waitlist", {
      p_email: data.email,
      p_source_button: data.sourceButton,
    });
    if (error) throw new Error(error.message);
    const row = (result as { status: string; tier: Tier | null }[])?.[0];

    // Mirror to Formspree (best effort)
    if (row?.status === "ok") {
      try {
        await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            email: data.email,
            tier: row.tier,
            source_button: data.sourceButton,
          }),
        });
      } catch {
        // Ignore; DB is source of truth
      }
    }

    return {
      status: (row?.status ?? "closed") as "ok" | "already_joined" | "closed",
      tier: (row?.tier ?? null) as Tier | null,
    };
  });

export const getAllSignups = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    // Check admin status using the user's own authenticated client (RLS-protected)
    const { data: roleRow } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Error("Forbidden");

    // Admin has SELECT policy on waitlist_signups, so the user's client works
    const client = context.supabase as SupabaseClient<Database>;
    const { data, error } = await client
      .from("waitlist_signups")
      .select("id, email, tier, source_button, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });
