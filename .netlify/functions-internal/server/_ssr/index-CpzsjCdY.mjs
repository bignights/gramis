import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn, T as TIER_CAPS, g as getWaitlistStats, j as joinWaitlist } from "./waitlist.functions-DxtaUrRI.mjs";
import { g as gramisLogo } from "./gramis-logo.png.asset-9_8C5CcV.mjs";
import "../_libs/seroval.mjs";
import { C as Check, A as ArrowRight, Z as Zap, S as Share2, a as Sparkles, b as Clock, M as Music2, E as Eraser, c as ChartBar, d as ChevronDown } from "../_libs/lucide-react.mjs";
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
const BASELINE_OFFSET = 31;
function Index() {
  const [submitted, setSubmitted] = reactExports.useState(null);
  const [stats, setStats] = reactExports.useState({
    founder: 0,
    priority: 0,
    earlyAdopter: 0,
    total: 0
  });
  const fetchStats = useServerFn(getWaitlistStats);
  reactExports.useEffect(() => {
    fetchStats().then((s) => setStats(s)).catch(() => {
    });
  }, [fetchStats]);
  const refreshStats = () => fetchStats().then((s) => setStats(s)).catch(() => {
  });
  const tierFull = {
    founder: stats.founder >= TIER_CAPS.founder,
    priority: stats.priority >= TIER_CAPS.priority,
    early_adopter: stats.earlyAdopter >= TIER_CAPS.early_adopter
  };
  const allClosed = tierFull.founder && tierFull.priority && tierFull.early_adopter;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen overflow-hidden", style: {
    backgroundColor: "#080808"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-noise opacity-[0.6]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-[600px] purple-glow" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { onSuccess: (tier, already) => {
          setSubmitted({
            tier,
            already
          });
          refreshStats();
        }, allClosed }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { total: stats.total }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scarcity, { founderCount: stats.founder }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Features, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tiers, { tierFull, onSuccess: (tier, already) => {
          setSubmitted({
            tier,
            already
          });
          refreshStats();
        }, allClosed }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] }),
    submitted && /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessOverlay, { tier: submitted.tier, already: submitted.already, onClose: () => setSubmitted(null) })
  ] });
}
function Reveal({
  children
}) {
  const ref = reactExports.useRef(null);
  const [show, setShow] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShow(true);
        io.disconnect();
      }
    }, {
      threshold: 0.12
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, style: {
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(14px)",
    transition: "opacity 700ms ease, transform 700ms ease"
  }, children });
}
function Logo({
  className = "",
  iconSize = "h-14 w-14",
  showText = true
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-3 font-semibold tracking-tight ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: gramisLogo.url, alt: "Gramis logo", className: `${iconSize} object-contain` }),
    showText && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      "Gram",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-purple", children: "is" })
    ] })
  ] });
}
function Navbar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b border-white/[0.06] backdrop-blur-md bg-[#080808]/70", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-20 max-w-6xl items-center justify-between px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { className: "text-3xl", iconSize: "h-14 w-14" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-[#c4b5fd]/20 bg-[#c4b5fd]/[0.06] px-3 py-1.5 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#c4b5fd] shadow-[0_0_8px_#c4b5fd]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: "Private Waitlist" })
    ] })
  ] }) });
}
function Hero({
  onSuccess,
  allClosed
}) {
  const [email, setEmail] = reactExports.useState("");
  const [touched, setTouched] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const join = useServerFn(joinWaitlist);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const showError = touched && email.length > 0 && !valid;
  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!valid || allClosed) return;
    setLoading(true);
    setError(null);
    try {
      const result = await join({
        data: {
          email: email.trim(),
          sourceButton: "hero"
        }
      });
      if (result.status === "closed") {
        setError("The waitlist is full. Thank you!");
      } else {
        onSuccess(result.tier, result.status === "already_joined");
        setEmail("");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "join", className: "mx-auto max-w-6xl px-6 pt-24 pb-20 text-center md:pt-32 md:pb-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/60", children: "The future of social media" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mx-auto mt-8 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-7xl lg:text-8xl", children: [
      "One platform.",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-purple", children: "Every audience." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg", children: "Schedule, distribute, and grow across every platform — powered by AI that learns your content, discovers trending sounds before they peak, and posts at the exact moment your audience is watching." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "mx-auto mt-10 flex w-full max-w-lg flex-col gap-2 sm:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", "aria-label": "Email address", required: true, placeholder: "you@domain.com", value: email, onChange: (e) => setEmail(e.target.value), onBlur: () => setTouched(true), "aria-invalid": showError, disabled: allClosed, className: `h-12 w-full rounded-xl border bg-white/[0.04] px-4 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition focus:bg-white/[0.06] focus:ring-2 disabled:opacity-50 ${showError ? "border-red-400/40 focus:border-red-400/60 focus:ring-red-400/20" : "border-white/10 focus:border-[#c4b5fd]/40 focus:ring-[#c4b5fd]/20"}` }),
        valid && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c4b5fd]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: loading || allClosed, className: "group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#c4b5fd] px-6 text-sm font-semibold text-[#080808] shadow-[0_8px_30px_-8px_rgba(196,181,253,0.6)] transition hover:bg-white hover:shadow-[0_8px_30px_-4px_rgba(196,181,253,0.8)] disabled:opacity-60", children: [
        loading ? "Joining…" : allClosed ? "Waitlist closed" : "Get Early Access",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition group-hover:translate-x-0.5" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-4 text-xs", children: showError ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400/80", children: "Enter a valid email address." }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400/80", children: error }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "No spam. First 100 get Founder Access — forever." }) })
  ] });
}
function SuccessOverlay({
  tier,
  already,
  onClose
}) {
  reactExports.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  const tierLabel = tier === "founder" ? "Founder Access" : tier === "priority" ? "Priority Access" : "Early Adopter";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center px-6", style: {
    backgroundColor: "#080808",
    animation: "fade-in 400ms ease-out both"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-noise opacity-[0.6]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full", style: {
      background: "radial-gradient(closest-side, rgba(196,181,253,0.28), rgba(196,181,253,0) 70%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-2xl text-center", style: {
      animation: "scale-in 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#c4b5fd]/30 bg-[#c4b5fd]/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-6 w-6 text-[#c4b5fd]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-6xl font-semibold tracking-[-0.04em] text-white md:text-8xl", children: [
        already ? "Already" : "You're",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-purple", children: "in." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/70 md:text-lg", children: already ? `You're already on the list — ${tierLabel} secured.` : tier === "founder" ? "Welcome to Gramis. You're a Founder — locked-in pricing forever, direct line to the team." : `Welcome to Gramis. You're on the ${tierLabel} list.` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-xs uppercase tracking-[0.22em] text-[#c4b5fd]/80", children: "Check your email — something is coming." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "mt-12 text-xs uppercase tracking-[0.2em] text-white/40 transition hover:text-white/80", children: "Close" })
    ] })
  ] });
}
function Counter({
  total
}) {
  const stats = [{
    v: String(BASELINE_OFFSET + total),
    l: "On Waitlist"
  }, {
    v: "6",
    l: "Platforms"
  }, {
    v: "∞",
    l: "Reach"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-4xl px-6 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/[0.07] bg-white/[0.02] py-8", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-semibold tracking-tight md:text-4xl", children: s.v }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] uppercase tracking-[0.18em] text-white/50 md:text-xs", children: s.l })
  ] }, s.l)) }) });
}
function Scarcity({
  founderCount
}) {
  const PUBLIC_FOUNDER_TOTAL = 100;
  const remaining = Math.max(0, PUBLIC_FOUNDER_TOTAL - BASELINE_OFFSET - founderCount);
  const closed = founderCount >= TIER_CAPS.founder;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-5xl px-6 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `card-hairline relative flex flex-col items-start justify-between gap-6 rounded-2xl p-6 md:flex-row md:items-center md:p-8 ${closed ? "opacity-70" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c4b5fd]/30 bg-[#c4b5fd]/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-5 w-5 text-[#c4b5fd]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold tracking-tight", children: closed ? "Founder Access — closed forever ✓" : "First 100 get Founder Access — forever." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-xl text-sm text-white/55", children: closed ? "All 100 Founder spots are taken. Join Priority Access below for the next-best perks." : "Locked-in pricing, direct line to the team, and your name on our early believers page. Closes permanently at 100." })
      ] })
    ] }),
    !closed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 rounded-full border border-[#c4b5fd]/30 bg-[#c4b5fd]/10 px-4 py-2 text-sm font-medium text-[#c4b5fd]", children: [
      remaining,
      " Founder spots remaining"
    ] })
  ] }) });
}
function Features() {
  const features = [{
    n: "01",
    t: "Cross-platform distribution",
    d: "Publish once. Land natively on every platform with the right format, ratio, and caption.",
    icon: Share2
  }, {
    n: "02",
    t: "AI caption engine",
    d: "Captions trained on your voice, your audience, and what's converting right now.",
    icon: Sparkles
  }, {
    n: "03",
    t: "Smart scheduling",
    d: "Posts go live the exact moment your audience is most active — no guesswork.",
    icon: Clock
  }, {
    n: "04",
    t: "Trending sound discovery",
    d: "Surface sounds before they peak. Get on the wave, not behind it.",
    icon: Music2
  }, {
    n: "05",
    t: "Watermark removal",
    d: "Repurpose any clip cleanly across platforms without leaving traces.",
    icon: Eraser
  }, {
    n: "06",
    t: "Analytics dashboard",
    d: "Every metric that matters in one place. Track growth, not vanity.",
    icon: ChartBar
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-6 pb-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-semibold tracking-[-0.03em] md:text-5xl", children: [
        "Built for ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-purple", children: "serious creators." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-white/55", children: "Six tools. One workflow. Zero friction." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", children: features.map((f) => {
      const Icon = f.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-hairline group rounded-2xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition group-hover:border-[#c4b5fd]/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-[#c4b5fd]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-white/30", children: f.n })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-semibold tracking-tight", children: f.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-white/55", children: f.d })
      ] }, f.n);
    }) })
  ] });
}
function Tiers({
  tierFull,
  onSuccess,
  allClosed
}) {
  const tiers = [{
    name: "Early Adopter",
    tag: "Tier 3",
    spots: "Spots 301–1000",
    tier: "early_adopter",
    perks: ["Beta access before public launch", "30% off first 3 months", "Founding member badge"]
  }, {
    name: "Priority Access",
    tag: "Tier 2",
    spots: "Spots 101–300",
    tier: "priority",
    perks: ["First wave of beta invites", "50% off for first 6 months", "Priority support forever", "Early feature access"],
    featured: true
  }, {
    name: "Founder Access",
    tag: "Tier 1",
    spots: "First 100 only",
    tier: "founder",
    perks: ["Locked-in founder pricing forever", "Name on early believers page", "Direct line to the founding team", "Shape the product roadmap", "Lifetime deal eligible"],
    highlight: true
  }];
  const [open, setOpen] = reactExports.useState(false);
  const [pendingTier, setPendingTier] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState(null);
  const join = useServerFn(joinWaitlist);
  function handleTierClick(t) {
    const heroInput = document.getElementById("email");
    const email = (heroInput?.value ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("join")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      setTimeout(() => heroInput?.focus({
        preventScroll: true
      }), 600);
      setErr("Enter your email above first, then click your tier.");
      return;
    }
    setPendingTier(t);
    void submitTierFromButton(t, email);
  }
  async function submitTierFromButton(t, email) {
    setSubmitting(true);
    setErr(null);
    try {
      const result = await join({
        data: {
          email,
          sourceButton: t
        }
      });
      if (result.status === "closed") {
        setErr("Waitlist is full.");
      } else {
        onSuccess(result.tier, result.status === "already_joined");
      }
    } catch {
      setErr("Something went wrong.");
    } finally {
      setSubmitting(false);
      setPendingTier(null);
    }
  }
  if (allClosed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl px-6 pb-32 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-semibold tracking-[-0.03em] md:text-5xl", children: [
        "Waitlist ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-purple", children: "closed" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-white/55", children: "Every tier is full. Thank you to everyone who believed early — see you at launch." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-6 pb-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-semibold tracking-[-0.03em] md:text-5xl", children: [
        "Waitlist ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-purple", children: "tiers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-white/55", children: "The earlier you join, the more you keep." }),
      err && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-red-400/80", children: err })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-3", children: tiers.map((t) => {
      const isFull = tierFull[t.tier];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative flex flex-col rounded-2xl p-7 transition ${isFull ? "opacity-60" : ""} ${t.highlight ? "border border-[#c4b5fd]/40 bg-gradient-to-b from-[#c4b5fd]/[0.08] to-transparent shadow-[0_20px_80px_-30px_rgba(196,181,253,0.4)]" : t.featured ? "card-hairline border-white/15" : "card-hairline"}`, children: [
        t.featured && !t.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-[#080808] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70", children: "Most Picked" }),
        t.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#c4b5fd] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#080808]", children: "Founder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-white/40", children: t.tag }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-semibold tracking-tight", children: t.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-[#c4b5fd]", children: t.spots }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 flex-1 space-y-3", children: t.perks.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm text-white/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c4b5fd]" }),
          p
        ] }, p)) }),
        t.highlight && !isFull && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl border border-[#c4b5fd]/15 bg-[#c4b5fd]/[0.04]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setOpen((v) => !v), "aria-expanded": open, className: "flex w-full items-center justify-between px-4 py-3 text-left text-xs uppercase tracking-[0.18em] text-[#c4b5fd]/90", children: [
            "What is Founder Access?",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            maxHeight: open ? 220 : 0,
            transition: "max-height 400ms ease",
            overflow: "hidden"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 pb-4 text-sm leading-relaxed text-white/65", children: "Founder Access means you believed in Gramis before anyone else. You get locked-in pricing forever, your name on our early believers page, and a direct line to the team to shape what we build." }) })
        ] }),
        isFull ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-[#c4b5fd]/30 bg-[#c4b5fd]/10 text-sm font-semibold text-[#c4b5fd]", children: "Filled — thank you ✓" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: submitting && pendingTier === t.tier, onClick: () => handleTierClick(t.tier), className: `mt-6 h-11 rounded-xl text-sm font-semibold transition disabled:opacity-60 ${t.highlight ? "bg-[#c4b5fd] text-[#080808] hover:bg-white" : "border border-white/15 bg-white/[0.03] text-white hover:border-[#c4b5fd]/40 hover:bg-white/[0.06]"}`, children: submitting && pendingTier === t.tier ? "Joining…" : t.highlight ? "Claim Founder Access" : "Join this tier" })
      ] }, t.name);
    }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-white/[0.06]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-white/50 sm:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { iconSize: "h-14 w-14", showText: false }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "© 2026 Gramis. Built for serious creators." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/guides/best-times-to-post", className: "text-white/70 transition hover:text-[#c4b5fd]", children: "Guides" })
  ] }) });
}
export {
  Index as component
};
