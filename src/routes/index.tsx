import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Zap,
  ArrowRight,
  Share2,
  Sparkles,
  Clock,
  Music2,
  Eraser,
  BarChart3,
  ChevronDown,
  Check,
} from "lucide-react";

// Replace with your real Formspree form ID (https://formspree.io) — e.g. "xyzabcde"
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqnverg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:url", content: "https://gramis.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://gramis.lovable.app/" },
    ],
  }),
  component: Index,
});

const WAITLIST_COUNT = 31;
const FOUNDER_CAP = 100;
const FOUNDER_REMAINING = FOUNDER_CAP - WAITLIST_COUNT; // 69

function Index() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#080808" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.6]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] purple-glow" />

      <div className="relative">
        <Navbar />
        <main>
          <Hero onSuccess={() => setSubmitted(true)} />
          <Reveal>
            <Counter />
          </Reveal>
          <Reveal>
            <Scarcity />
          </Reveal>
          <Reveal>
            <Features />
          </Reveal>
          <Reveal>
            <Tiers />
          </Reveal>
        </main>
        <Footer />
      </div>

      {submitted && <SuccessOverlay onClose={() => setSubmitted(false)} />}
    </div>
  );
}

/* --------------------------------- Reveal --------------------------------- */
function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 700ms ease, transform 700ms ease",
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- UI ----------------------------------- */
import gramisLogo from "@/assets/gramis-logo.png.asset.json";

function Logo({
  className = "",
  iconSize = "h-14 w-14",
  showText = true,
}: {
  className?: string;
  iconSize?: string;
  showText?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-3 font-semibold tracking-tight ${className}`}>
      <img
        src={gramisLogo.url}
        alt="Gramis logo"
        className={`${iconSize} object-contain`}
      />
      {showText && (
        <span>
          Gram<span className="text-gradient-purple">is</span>
        </span>
      )}
    </span>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] backdrop-blur-md bg-[#080808]/70">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Logo className="text-3xl" iconSize="h-14 w-14" />
        <div className="inline-flex items-center gap-2 rounded-full border border-[#c4b5fd]/20 bg-[#c4b5fd]/[0.06] px-3 py-1.5 text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c4b5fd] shadow-[0_0_8px_#c4b5fd]" />
          <span className="text-white/80">Private Waitlist</span>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------- Hero --------------------------------- */
function Hero({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const showError = touched && email.length > 0 && !valid;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok && !FORMSPREE_ENDPOINT.includes("your-form-id")) {
        throw new Error("Submission failed");
      }
      onSuccess();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

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
        Schedule, distribute, and grow across every platform — powered by AI that learns your
        content, discovers trending sounds before they peak, and posts at the exact moment your
        audience is watching.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mx-auto mt-10 flex w-full max-w-lg flex-col gap-2 sm:flex-row"
      >
        <div className="relative flex-1">
          <input
            type="email"
            aria-label="Email address"
            required
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={showError}
            className={`h-12 w-full rounded-xl border bg-white/[0.04] px-4 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition focus:bg-white/[0.06] focus:ring-2 ${
              showError
                ? "border-red-400/40 focus:border-red-400/60 focus:ring-red-400/20"
                : "border-white/10 focus:border-[#c4b5fd]/40 focus:ring-[#c4b5fd]/20"
            }`}
          />
          {valid && (
            <Check className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c4b5fd]" />
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#c4b5fd] px-6 text-sm font-semibold text-[#080808] shadow-[0_8px_30px_-8px_rgba(196,181,253,0.6)] transition hover:bg-white hover:shadow-[0_8px_30px_-4px_rgba(196,181,253,0.8)] disabled:opacity-70"
        >
          {loading ? "Joining…" : "Get Early Access"}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </button>
      </form>
      <div className="mt-3 h-4 text-xs">
        {showError ? (
          <span className="text-red-400/80">Enter a valid email address.</span>
        ) : error ? (
          <span className="text-red-400/80">{error}</span>
        ) : (
          <span className="text-white/40">
            No spam. First 100 get Founder Access — forever.
          </span>
        )}
      </div>
    </section>
  );
}

/* --------------------------- Success overlay ----------------------------- */
function SuccessOverlay({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      style={{ backgroundColor: "#080808", animation: "fade-in 400ms ease-out both" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.6]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(196,181,253,0.28), rgba(196,181,253,0) 70%)",
        }}
      />
      <div
        className="relative max-w-2xl text-center"
        style={{ animation: "scale-in 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both" }}
      >
        <div className="mx-auto mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#c4b5fd]/30 bg-[#c4b5fd]/10">
          <Check className="h-6 w-6 text-[#c4b5fd]" />
        </div>
        <h2 className="text-6xl font-semibold tracking-[-0.04em] text-white md:text-8xl">
          You're <span className="text-gradient-purple">in.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          Welcome to Gramis. You're one of the first people to believe in something big. We'll be
          in touch soon.
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[#c4b5fd]/80">
          Check your email — something is coming.
        </p>
        <button
          onClick={onClose}
          className="mt-12 text-xs uppercase tracking-[0.2em] text-white/40 transition hover:text-white/80"
        >
          Close
        </button>
      </div>
    </div>
  );
}

/* -------------------------------- Counter -------------------------------- */
function Counter() {
  const stats = [
    { v: String(WAITLIST_COUNT), l: "On Waitlist" },
    { v: "6", l: "Platforms" },
    { v: "∞", l: "Reach" },
  ];
  return (
    <section className="mx-auto max-w-4xl px-6 pb-20">
      <div className="grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/[0.07] bg-white/[0.02] py-8">
        {stats.map((s) => (
          <div key={s.l} className="px-4 text-center">
            <div className="text-3xl font-semibold tracking-tight md:text-4xl">{s.v}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/50 md:text-xs">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- Scarcity ------------------------------- */
function Scarcity() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <div className="card-hairline relative flex flex-col items-start justify-between gap-6 rounded-2xl p-6 md:flex-row md:items-center md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c4b5fd]/30 bg-[#c4b5fd]/10">
            <Zap className="h-5 w-5 text-[#c4b5fd]" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">
              First 100 get Founder Access — forever.
            </div>
            <p className="mt-1 max-w-xl text-sm text-white/55">
              Locked-in pricing, direct line to the team, and your name on our early believers
              page. Closes permanently at 100.
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-full border border-[#c4b5fd]/30 bg-[#c4b5fd]/10 px-4 py-2 text-sm font-medium text-[#c4b5fd]">
          {FOUNDER_REMAINING} Founder spots remaining
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Features ------------------------------- */
function Features() {
  const features = [
    {
      n: "01",
      t: "Cross-platform distribution",
      d: "Publish once. Land natively on every platform with the right format, ratio, and caption.",
      icon: Share2,
    },
    {
      n: "02",
      t: "AI caption engine",
      d: "Captions trained on your voice, your audience, and what's converting right now.",
      icon: Sparkles,
    },
    {
      n: "03",
      t: "Smart scheduling",
      d: "Posts go live the exact moment your audience is most active — no guesswork.",
      icon: Clock,
    },
    {
      n: "04",
      t: "Trending sound discovery",
      d: "Surface sounds before they peak. Get on the wave, not behind it.",
      icon: Music2,
    },
    {
      n: "05",
      t: "Watermark removal",
      d: "Repurpose any clip cleanly across platforms without leaving traces.",
      icon: Eraser,
    },
    {
      n: "06",
      t: "Analytics dashboard",
      d: "Every metric that matters in one place. Track growth, not vanity.",
      icon: BarChart3,
    },
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
                  <Icon className="h-4 w-4 text-[#c4b5fd]" />
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

/* --------------------------------- Tiers --------------------------------- */
function Tiers() {
  const tiers = [
    {
      name: "Early Adopter",
      tag: "Tier 3",
      spots: "Spots 301–1000",
      perks: [
        "Beta access before public launch",
        "30% off first 3 months",
        "Founding member badge",
      ],
    },
    {
      name: "Priority Access",
      tag: "Tier 2",
      spots: "Spots 101–300",
      perks: [
        "First wave of beta invites",
        "50% off for first 6 months",
        "Priority support forever",
        "Early feature access",
      ],
      featured: true,
    },
    {
      name: "Founder Access",
      tag: "Tier 1",
      spots: "First 100 only",
      perks: [
        "Locked-in founder pricing forever",
        "Name on early believers page",
        "Direct line to the founding team",
        "Shape the product roadmap",
        "Lifetime deal eligible",
      ],
      highlight: true,
    },
  ];

  const [open, setOpen] = useState(false);

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
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#c4b5fd] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#080808]">
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

            {t.highlight && (
              <div className="mt-5 rounded-xl border border-[#c4b5fd]/15 bg-[#c4b5fd]/[0.04]">
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-xs uppercase tracking-[0.18em] text-[#c4b5fd]/90"
                >
                  What is Founder Access?
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  style={{
                    maxHeight: open ? 220 : 0,
                    transition: "max-height 400ms ease",
                    overflow: "hidden",
                  }}
                >
                  <p className="px-4 pb-4 text-sm leading-relaxed text-white/65">
                    Founder Access means you believed in Gramis before anyone else. You get
                    locked-in pricing forever, your name on our early believers page, and a direct
                    line to the team to shape what we build.
                  </p>
                </div>
              </div>
            )}

            <button
              className={`mt-6 h-11 rounded-xl text-sm font-semibold transition ${
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

/* -------------------------------- Footer --------------------------------- */
function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-white/50 sm:flex-row">
        <Logo iconSize="h-14 w-14" showText={false} />
        <div>© 2026 Gramis. Built for serious creators.</div>
        <Link
          to="/guides/best-times-to-post"
          className="text-white/70 transition hover:text-[#c4b5fd]"
        >
          Guides
        </Link>
      </div>
    </footer>
  );
}
