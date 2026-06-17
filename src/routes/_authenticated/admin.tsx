import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getAllSignups, TIER_CAPS, type Tier } from "@/lib/waitlist.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

type Row = {
  id: string;
  email: string;
  tier: Tier;
  source_button: string;
  created_at: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const fetchSignups = useServerFn(getAllSignups);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSignups()
      .then((data) => setRows(data as Row[]))
      .catch((e) =>
        setError(
          e instanceof Error && /forbidden/i.test(e.message)
            ? "Your account is not an admin. Ask the developer to grant access."
            : e instanceof Error
              ? e.message
              : "Failed to load",
        ),
      );
  }, [fetchSignups]);

  const counts = { founder: 0, priority: 0, early_adopter: 0 } as Record<Tier, number>;
  (rows ?? []).forEach((r) => {
    counts[r.tier]++;
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  function exportCsv() {
    if (!rows) return;
    const header = "email,tier,source_button,joined_at\n";
    const body = rows
      .map((r) =>
        [r.email, r.tier, r.source_button, r.created_at]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gramis-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen px-6 py-10 text-white" style={{ backgroundColor: "#080808" }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">
            Waitlist <span className="text-gradient-purple">admin</span>
          </h1>
          <div className="flex gap-2">
            <button
              onClick={exportCsv}
              disabled={!rows || rows.length === 0}
              className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm hover:border-[#c4b5fd]/40 disabled:opacity-50"
            >
              Export CSV
            </button>
            <button
              onClick={signOut}
              className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm hover:border-white/30"
            >
              Sign out
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(["founder", "priority", "early_adopter"] as Tier[]).map((t) => {
            const real = counts[t];
            // Founder tier: 31 fake baseline + up to 69 real = 100 public total
            const baseline = t === "founder" ? 31 : 0;
            const displayCap = t === "founder" ? 100 : TIER_CAPS[t];
            const displayed = real + baseline;
            const pct = Math.min(100, (displayed / displayCap) * 100);
            return (
              <div key={t} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                  {t.replace("_", " ")}
                </div>
                <div className="mt-1 text-3xl font-semibold">
                  {displayed}
                  <span className="text-base text-white/40"> / {displayCap}</span>
                </div>
                {baseline > 0 && (
                  <div className="mt-1 text-xs text-white/40">
                    {real} real · {baseline} baseline · {Math.max(0, TIER_CAPS[t] - real)} real
                    spots left
                  </div>
                )}
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full bg-[#c4b5fd]" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.04] text-left text-xs uppercase tracking-wider text-white/50">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {rows === null && !error && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-white/40">
                    Loading…
                  </td>
                </tr>
              )}
              {rows && rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-white/40">
                    No signups yet.
                  </td>
                </tr>
              )}
              {rows?.map((r) => (
                <tr key={r.id} className="border-t border-white/[0.06]">
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-[#c4b5fd]/30 bg-[#c4b5fd]/10 px-2 py-0.5 text-xs text-[#c4b5fd]">
                      {r.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/60">{r.source_button}</td>
                  <td className="px-4 py-3 text-white/60">
                    {new Date(r.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
