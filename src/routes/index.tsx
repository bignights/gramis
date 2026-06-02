import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Zap, ArrowRight, Crown, Share2, Sparkles, Clock, Music2, Eraser, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gramis — One platform. Every audience." },
      { name: "description", content: "Gramis is the AI-powered social media platform for serious creators. Schedule, distribute, and grow across every network. Join the private waitlist." },
      { property: "og:title", content: "Gramis — One platform. Every audience." },
      { property: "og:description", content: "AI-powered social media management for serious creators. Join the private waitlist." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#080808" }}>
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.6]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] purple-glow" />

      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <Counter />
          <Scarcity />
          <Features />
          <Leaderboard />
          <Tiers />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-tight ${className}`}>
      Gram<span className="text-gradient-purple">is</span>
    </span>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] backdrop-blur-md bg-[#080808]/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo className="text-xl" />
        <div className="inline-flex items-center gap-2 rounded-full border border-[#c4b5fd]/20 bg-[#c4b5fd]/[0.06] px-3 py-1.5 text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c4b5fd] shadow-[0_0_8px_#c4b5fd]" />
          <span className="text-white/80">Private Waitlist</span>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="mx-auto max-w-6xl px-6 pt-24 pb-20 text-center md:pt-32 md:pb-28">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/60">
        The future of social media
      </div>
      <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-7xl lg:text-8xl">
        One platform.
        <br />
        <span className="text-gradient-purple">Every audience.</span>
      </h1>
      <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
        Schedule, distribute, and grow across every platform — powered by AI that learns your content,
        discovers trending sounds before they peak, and posts at the exact moment your audience is watching.
      </p>

      <form
        onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
        className="mx-auto mt-10 flex w-full max-w-lg flex-col gap-2 sm:flex-row"
      >
        <div className="relative flex-1">
          <input
            type="email"
            required
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#c4b5fd]/40 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#c4b5fd]/20"
          />
        </div>
        <button
          type="submit"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#c4b5fd] px-6 text-sm font-semibold text-[#080808] shadow-[0_8px_30px_-8px_rgba(196,181,253,0.6)] transition hover:bg-white hover:shadow-[0_8px_30px_-4px_rgba(196,181,253,0.8)]"
        >
          {submitted ? "You're in" : "Get Early Access"}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </button>
      </form>
      <p className="mt-4 text-xs text-white/40">No spam. First 100 get Founder Access — forever.</p>
    </section>
  );
}

function Counter() {
  const stats = [
    { v: "247+", l: "On Waitlist" },
    { v: "6", l: "Platforms" },
    { v: "∞", l: "Reach" },
  ];
  return (
    <section className="mx-auto max-w-4xl px-6 pb-20">
      <div className="grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/[0.07] bg-white/[0.02] py-8">
        {stats.map((s) => (
          <div key={s.l} className="px-4 text-center">
            <div className="text-3xl font-semibold tracking-tight md:text-4xl">{s.v}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/50">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Scarcity() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <div className="card-hairline relative flex flex-col items-start justify-between gap-6 rounded-2xl p-6 md:flex-row md:items-center md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c4b5fd]/30 bg-[#c4b5fd]/10">
            <Zap className="h-5 w-5 text-[#c4b5fd]" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">First 100 get Founder Access — forever.</div>
            <p className="mt-1 max-w-xl text-sm text-white/55">
              Locked-in pricing, direct line to the team, and your name in the product. Closes permanently at 100.
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-full border border-[#c4b5fd]/30 bg-[#c4b5fd]/10 px-4 py-2 text-sm font-medium text-[#c4b5fd]">
          87 spots left
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { n: "01", t: "Cross-platform distribution", d: "Publish once. Land natively on every platform with the right format, ratio, and caption.", icon: Share2 },
    { n: "02", t: "AI caption engine", d: "Captions trained on your voice, your audience, and what's converting right now.", icon: Sparkles },
    { n: "03", t: "Smart scheduling", d: "Posts go live the exact moment your audience is most active — no guesswork.", icon: Clock },
    { n: "04", t: "Trending sound discovery", d: "Surface sounds before they peak. Get on the wave, not behind it.", icon: Music2 },
    { n: "05", t: "Watermark removal", d: "Repurpose any clip cleanly across platforms without leaving traces.", icon: Eraser },
    { n: "06", t: "Analytics dashboard", d: "Every metric that matters in one place. Track growth, not vanity.", icon: BarChart3 },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28">
      <div className="mb-12 max-w-2xl">
        <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
          Built for <span className="text-gradient-purple">serious creators.</span>
        </h2>
        <p className="mt-3 text-white/55">Six tools. One workflow. Zero friction.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.n} className="card-hairline group rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition group-hover:border-[#c4b5fd]/30">
                  <Icon className="h-4.5 w-4.5 text-[#c4b5fd]" />
                </div>
                <span className="text-xs font-mono text-white/30">{f.n}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{f.d}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Leaderboard() {
  const rows = [
    { r: "#1", a: "NM", n: "Nio M.", note: "founder", crown: true },
    { r: "#2", a: "AK", n: "Alex K.", note: "12 referrals" },
    { r: "#3", a: "SR", n: "Sofia R.", note: "9 referrals" },
    { r: "#4", a: "JM", n: "Jordan M.", note: "7 referrals" },
    { r: "#5", a: "TW", n: "Tyler W.", note: "5 referrals" },
  ];
  return (
    <section className="mx-auto max-w-4xl px-6 pb-28">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            Referral <span className="text-gradient-purple">leaderboard</span>
          </h2>
          <p className="mt-2 text-sm text-white/50">Updated weekly</p>
        </div>
      </div>
      <div className="card-hairline overflow-hidden rounded-2xl">
        <div className="divide-y divide-white/[0.06]">
          {rows.map((r) => (
            <div key={r.r} className="flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.02]">
              <div className="w-10 text-sm font-mono text-white/40">{r.r}</div>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#c4b5fd]/20 bg-[#c4b5fd]/[0.08] text-xs font-semibold text-[#c4b5fd]">
                {r.crown && <Crown className="absolute -top-2.5 left-1/2 h-4 w-4 -translate-x-1/2 text-[#c4b5fd]" />}
                {r.a}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{r.n}</div>
              </div>
              <div className="text-sm text-white/50">{r.note}</div>
            </div>
          ))}
          <div className="flex items-center gap-4 border-t border-dashed border-white/15 px-5 py-5">
            <div className="w-10 text-sm font-mono text-white/30">#?</div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-white/20 text-xs text-white/40">
              ?
            </div>
            <div className="flex-1 text-sm text-white/50">Your spot is waiting — join to compete</div>
            <ArrowRight className="h-4 w-4 text-white/30" />
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-white/45">
        Top referrers get Founder Access, lifetime deals and early feature unlocks.
      </p>
    </section>
  );
}

function Tiers() {
  const tiers = [
    {
      name: "Early Adopter",
      tag: "Tier 3",
      spots: "Spots 201–500",
      perks: ["Beta access", "30% off first 3 months", "Founding member badge"],
      highlight: false,
    },
    {
      name: "Priority Access",
      tag: "Tier 2",
      spots: "Spots 101–200",
      perks: ["First beta wave", "50% off 6 months", "Direct feedback channel", "Priority support"],
      featured: true,
    },
    {
      name: "Founder Access",
      tag: "Tier 1",
      spots: "First 100 only",
      perks: [
        "Locked-in founder pricing",
        "Name in the product",
        "Direct line to team",
        "Lifetime deal eligible",
        "Shape the roadmap",
      ],
      highlight: true,
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 pb-32">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
          Waitlist <span className="text-gradient-purple">tiers</span>
        </h2>
        <p className="mt-3 text-white/55">The earlier you join, the more you keep.</p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative flex flex-col rounded-2xl p-7 transition ${
              t.highlight
                ? "border border-[#c4b5fd]/40 bg-gradient-to-b from-[#c4b5fd]/[0.08] to-transparent shadow-[0_20px_80px_-30px_rgba(196,181,253,0.4)]"
                : t.featured
                ? "card-hairline border-white/15"
                : "card-hairline"
            }`}
          >
            {t.featured && !t.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-[#080808] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70">
                Most Picked
              </div>
            )}
            {t.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#c4b5fd] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#080808] font-semibold">
                Founder
              </div>
            )}
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">{t.tag}</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">{t.name}</div>
            <div className="mt-1 text-sm text-[#c4b5fd]">{t.spots}</div>
            <ul className="mt-6 flex-1 space-y-3">
              {t.perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c4b5fd]" />
                  {p}
                </li>
              ))}
            </ul>
            <button
              className={`mt-8 h-11 rounded-xl text-sm font-semibold transition ${
                t.highlight
                  ? "bg-[#c4b5fd] text-[#080808] hover:bg-white"
                  : "border border-white/15 bg-white/[0.03] text-white hover:border-[#c4b5fd]/40 hover:bg-white/[0.06]"
              }`}
            >
              {t.highlight ? "Claim Founder Access" : "Join this tier"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-white/50 sm:flex-row">
        <Logo className="text-base text-white" />
        <div>© 2026 Gramis. Built for serious creators.</div>
      </div>
    </footer>
  );
}
