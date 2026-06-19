import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn, T as TIER_CAPS, a as getAllSignups } from "./waitlist.functions-DxtaUrRI.mjs";
import { s as supabase } from "./client-rzgq_APd.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./server-CEa0QXI2.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-D6mg4qn-.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
function AdminPage() {
  const navigate = useNavigate();
  const fetchSignups = useServerFn(getAllSignups);
  const [rows, setRows] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetchSignups().then((data) => setRows(data)).catch((e) => setError(e instanceof Error && /forbidden/i.test(e.message) ? "Your account is not an admin. Ask the developer to grant access." : e instanceof Error ? e.message : "Failed to load"));
  }, [fetchSignups]);
  const counts = {
    founder: 0,
    priority: 0,
    early_adopter: 0
  };
  (rows ?? []).forEach((r) => {
    counts[r.tier]++;
  });
  async function signOut() {
    await supabase.auth.signOut();
    navigate({
      to: "/auth"
    });
  }
  function exportCsv() {
    if (!rows) return;
    const header = "email,tier,source_button,joined_at\n";
    const body = rows.map((r) => [r.email, r.tier, r.source_button, r.created_at].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([header + body], {
      type: "text/csv"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gramis-waitlist-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen px-6 py-10 text-white", style: {
    backgroundColor: "#080808"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-semibold tracking-tight", children: [
        "Waitlist ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-purple", children: "admin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: exportCsv, disabled: !rows || rows.length === 0, className: "rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm hover:border-[#c4b5fd]/40 disabled:opacity-50", children: "Export CSV" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: signOut, className: "rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm hover:border-white/30", children: "Sign out" })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3", children: ["founder", "priority", "early_adopter"].map((t) => {
      const real = counts[t];
      const baseline = t === "founder" ? 31 : 0;
      const displayCap = t === "founder" ? 100 : TIER_CAPS[t];
      const displayed = real + baseline;
      const pct = Math.min(100, displayed / displayCap * 100);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-white/[0.03] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-white/50", children: t.replace("_", " ") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-3xl font-semibold", children: [
          displayed,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base text-white/40", children: [
            " / ",
            displayCap
          ] })
        ] }),
        baseline > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-white/40", children: [
          real,
          " real · ",
          baseline,
          " baseline · ",
          Math.max(0, TIER_CAPS[t] - real),
          " real spots left"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-[#c4b5fd]", style: {
          width: `${pct}%`
        } }) })
      ] }, t);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 overflow-x-auto rounded-xl border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-white/[0.04] text-left text-xs uppercase tracking-wider text-white/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Tier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Source" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Joined" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        rows === null && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-4 py-8 text-center text-white/40", children: "Loading…" }) }),
        rows && rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-4 py-8 text-center text-white/40", children: "No signups yet." }) }),
        rows?.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-white/[0.06]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: r.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-[#c4b5fd]/30 bg-[#c4b5fd]/10 px-2 py-0.5 text-xs text-[#c4b5fd]", children: r.tier }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-white/60", children: r.source_button }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-white/60", children: new Date(r.created_at).toLocaleString() })
        ] }, r.id))
      ] })
    ] }) })
  ] }) });
}
export {
  AdminPage as component
};
