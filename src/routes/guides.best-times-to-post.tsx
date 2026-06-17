import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Calendar, Sparkles, ArrowRight, Instagram, Music2 } from "lucide-react";
import gramisLogo from "@/assets/gramis-logo.png.asset.json";

export const Route = createFileRoute("/guides/best-times-to-post")({
  head: () => ({
    meta: [
      { title: "The Best Time to Post on Instagram and TikTok in 2026 — Gramis" },
      {
        name: "description",
        content:
          "Discover the best times to post on Instagram and TikTok in 2026. Data-driven peak hours, day-by-day breakdowns, and how Gramis AI schedules your content automatically for maximum reach.",
      },
      {
        property: "og:title",
        content: "The Best Time to Post on Instagram and TikTok in 2026",
      },
      {
        property: "og:description",
        content:
          "Data-driven peak hours and day-by-day breakdowns for Instagram and TikTok in 2026. Plus how Gramis AI automates perfect timing.",
      },
      { property: "og:url", content: "https://gramis.lovable.app/guides/best-times-to-post" },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: "The Best Time to Post on Instagram and TikTok in 2026" },
      {
        name: "twitter:description",
        content:
          "Data-driven peak hours and day-by-day breakdowns for Instagram and TikTok in 2026. Plus how Gramis AI automates perfect timing.",
      },
    ],
    links: [{ rel: "canonical", href: "https://gramis.lovable.app/guides/best-times-to-post" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The Best Time to Post on Instagram and TikTok in 2026",
          description:
            "Discover the best times to post on Instagram and TikTok in 2026. Data-driven peak hours, day-by-day breakdowns, and how Gramis AI schedules your content automatically for maximum reach.",
          author: { "@type": "Organization", name: "Gramis" },
          publisher: {
            "@type": "Organization",
            name: "Gramis",
            logo: {
              "@type": "ImageObject",
              url: "https://gramis.lovable.app/favicon.ico",
            },
          },
          datePublished: "2026-01-06",
          dateModified: "2026-01-06",
          url: "https://gramis.lovable.app/guides/best-times-to-post",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://gramis.lovable.app/guides/best-times-to-post",
          },
        }),
      },
    ],
  }),
  component: BestTimesGuide,
});

function BestTimesGuide() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#080808" }}>
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.6]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] purple-glow" />

      <div className="relative">
        <header className="sticky top-0 z-40 border-b border-white/[0.06] backdrop-blur-md bg-[#080808]/70">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-3 font-semibold tracking-tight text-3xl"
            >
              <img src={gramisLogo.url} alt="Gramis logo" className="h-14 w-14 object-contain" />
              <span>
                Gram<span className="text-gradient-purple">is</span>
              </span>
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c4b5fd]/20 bg-[#c4b5fd]/[0.06] px-3 py-1.5 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c4b5fd] shadow-[0_0_8px_#c4b5fd]" />
              <span className="text-white/80">Private Waitlist</span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          {/* Hero */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/60">
              <Calendar className="h-3 w-3" />
              2026 Guide
            </div>
            <h1 className="mt-8 text-4xl font-semibold leading-[1.1] tracking-[-0.04em] md:text-5xl lg:text-6xl">
              The Best Time to Post on <span className="text-gradient-purple">Instagram</span> and{" "}
              <span className="text-gradient-purple">TikTok</span> in 2026
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              Stop guessing. Here are the exact windows when your audience is most active — and how
              to hit them every time without lifting a finger.
            </p>
          </div>

          {/* Instagram Section */}
          <section className="mt-20">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#c4b5fd]/30 bg-[#c4b5fd]/10">
                <Instagram className="h-5 w-5 text-[#c4b5fd]" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Best Times to Post on Instagram
              </h2>
            </div>
            <p className="mt-4 leading-relaxed text-white/65">
              Instagram&apos;s algorithm still rewards early engagement. Posts that collect likes,
              saves, and comments in the first 30 minutes get pushed to Explore and onto more feeds.
              In 2026, the platform has doubled down on Reels, but static carousels and Stories
              still drive strong reach when timed well.
            </p>

            <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-8">
              <h3 className="text-lg font-semibold tracking-tight">
                Peak Instagram Hours (All Times Local)
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {instagramTimes.map((item) => (
                  <TimeCard key={item.day} platform="instagram" {...item} />
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#c4b5fd]/15 bg-[#c4b5fd]/[0.04] p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#c4b5fd]" />
                <div>
                  <h4 className="font-semibold tracking-tight">Pro Tip for 2026</h4>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">
                    Tuesday and Thursday mornings remain the highest-engagement slots across all
                    industries. If you only post twice a week, choose 9:00–10:00 AM on those days.
                    Reels posted at 7:00 PM on weekdays see 23% higher completion rates than midday
                    uploads.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* TikTok Section */}
          <section className="mt-20">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#c4b5fd]/30 bg-[#c4b5fd]/10">
                <Music2 className="h-5 w-5 text-[#c4b5fd]" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Best Times to Post on TikTok
              </h2>
            </div>
            <p className="mt-4 leading-relaxed text-white/65">
              TikTok&apos;s For You Page is relentless — a video can go viral 12 hours after posting
              if the early loop rate is strong. In 2026, the platform rewards consistent creators
              more than ever. Posting at the same high-traffic windows trains the algorithm to push
              your content to the same engaged audience.
            </p>

            <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-8">
              <h3 className="text-lg font-semibold tracking-tight">
                Peak TikTok Hours (All Times Local)
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {tiktokTimes.map((item) => (
                  <TimeCard key={item.day} platform="tiktok" {...item} />
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#c4b5fd]/15 bg-[#c4b5fd]/[0.04] p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#c4b5fd]" />
                <div>
                  <h4 className="font-semibold tracking-tight">Pro Tip for 2026</h4>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">
                    Tuesday at 7:00 PM and Friday at 5:00 PM are the two highest-traffic moments on
                    TikTok right now. Post 15 minutes before the peak so your video is already
                    circulating when the wave hits. Thursday afternoons are also strong for
                    educational and tutorial content.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Reference Table */}
          <section className="mt-20">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Side-by-Side Quick Reference
            </h2>
            <p className="mt-3 text-white/60">The safest windows that overlap on both platforms.</p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.07] text-left text-white/50">
                    <th className="px-6 py-4 font-medium">Day</th>
                    <th className="px-6 py-4 font-medium">Instagram</th>
                    <th className="px-6 py-4 font-medium">TikTok</th>
                    <th className="px-6 py-4 font-medium">Overlap</th>
                  </tr>
                </thead>
                <tbody>
                  {quickRef.map((row) => (
                    <tr key={row.day} className="border-b border-white/[0.05] last:border-b-0">
                      <td className="px-6 py-4 font-medium text-white/90">{row.day}</td>
                      <td className="px-6 py-4 text-white/70">{row.ig}</td>
                      <td className="px-6 py-4 text-white/70">{row.tt}</td>
                      <td className="px-6 py-4 text-[#c4b5fd]">{row.overlap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Gramis CTA */}
          <section className="mt-20">
            <div className="card-hairline relative rounded-2xl p-8 md:p-10">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c4b5fd]/30 bg-[#c4b5fd]/10">
                  <Clock className="h-6 w-6 text-[#c4b5fd]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold tracking-tight">
                    Let AI Hit Every Window Automatically
                  </h3>
                  <p className="mt-2 leading-relaxed text-white/65">
                    Gramis analyzes your audience&apos;s real activity patterns — not generic
                    averages — and publishes your content at the exact minute engagement is peaking.
                    No spreadsheets. No alarms. Just perfect timing, every time.
                  </p>
                </div>
                <Link
                  to="/"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#c4b5fd] px-6 py-3 text-sm font-semibold text-[#080808] shadow-[0_8px_30px_-8px_rgba(196,181,253,0.6)] transition hover:bg-white hover:shadow-[0_8px_30px_-4px_rgba(196,181,253,0.8)]"
                >
                  Get Early Access
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-20">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                  <h3 className="font-semibold tracking-tight">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/[0.06]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-white/50 sm:flex-row">
            <span className="inline-flex items-center">
              <img src={gramisLogo.url} alt="Gramis logo" className="h-14 w-14 object-contain" />
            </span>
            <div>© 2026 Gramis. Built for serious creators.</div>
            <Link
              to="/guides/best-times-to-post"
              className="text-white/70 transition hover:text-[#c4b5fd]"
            >
              Guides
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

function TimeCard({
  day,
  time,
  note,
}: {
  day: string;
  time: string;
  note?: string;
  platform: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition hover:border-[#c4b5fd]/20">
      <div className="text-xs uppercase tracking-[0.18em] text-white/40">{day}</div>
      <div className="mt-2 text-lg font-semibold tracking-tight text-[#c4b5fd]">{time}</div>
      {note && <p className="mt-1 text-xs text-white/50">{note}</p>}
    </div>
  );
}

const instagramTimes = [
  { day: "Monday", time: "6:00 – 8:00 AM", note: "Early commuters scrolling before work" },
  { day: "Tuesday", time: "9:00 – 10:00 AM", note: "Highest engagement window of the week" },
  { day: "Wednesday", time: "11:00 AM – 12:00 PM", note: "Mid-week lunch-break peak" },
  { day: "Thursday", time: "9:00 – 10:00 AM", note: "Second-best day; Reels perform strongly" },
  { day: "Friday", time: "7:00 – 9:00 AM", note: "Pre-weekend planning mood" },
  { day: "Saturday", time: "10:00 AM – 12:00 PM", note: "Relaxed weekend browsing" },
  { day: "Sunday", time: "6:00 – 8:00 PM", note: "Sunday scaries = high screen time" },
];

const tiktokTimes = [
  { day: "Monday", time: "6:00 – 8:00 PM", note: "Post-work scroll session" },
  { day: "Tuesday", time: "7:00 – 9:00 PM", note: "Highest traffic night of the week" },
  { day: "Wednesday", time: "5:00 – 7:00 PM", note: "Hump-day entertainment spike" },
  { day: "Thursday", time: "4:00 – 6:00 PM", note: "Strong for tutorials and how-tos" },
  { day: "Friday", time: "5:00 – 7:00 PM", note: "Weekend vibe starts early" },
  { day: "Saturday", time: "2:00 – 4:00 PM", note: "Afternoon leisure peak" },
  { day: "Sunday", time: "7:00 – 9:00 PM", note: "Sunday evening wind-down" },
];

const quickRef = [
  { day: "Monday", ig: "6–8 AM", tt: "6–8 PM", overlap: "—" },
  { day: "Tuesday", ig: "9–10 AM", tt: "7–9 PM", overlap: "—" },
  { day: "Wednesday", ig: "11 AM–12 PM", tt: "5–7 PM", overlap: "—" },
  { day: "Thursday", ig: "9–10 AM", tt: "4–6 PM", overlap: "—" },
  { day: "Friday", ig: "7–9 AM", tt: "5–7 PM", overlap: "—" },
  { day: "Saturday", ig: "10 AM–12 PM", tt: "2–4 PM", overlap: "—" },
  { day: "Sunday", ig: "6–8 PM", tt: "7–9 PM", overlap: "7–8 PM" },
];

const faqs = [
  {
    q: "Does the best time to post vary by niche?",
    a: "Yes. Beauty and fashion content performs well in the evenings when audiences unwind, while B2B and educational content hits harder during weekday mornings. Gramis learns your specific audience behavior rather than relying on generic averages.",
  },
  {
    q: "Should I post at the exact same time every day?",
    a: "Consistency matters, but platform-specific timing matters more. Instagram rewards morning slots; TikTok thrives in the evening. Use a tool that adapts per platform instead of forcing a one-size-fits-all schedule.",
  },
  {
    q: "What about time zones?",
    a: "If your audience is global, post during the peak hours of your largest segment first, then repurpose or duet for secondary time zones. Gramis handles multi-timezone scheduling automatically.",
  },
  {
    q: "Do Reels and TikToks need different timing than static posts?",
    a: "Generally yes. Short-form video tends to perform better in the evening when users have uninterrupted attention. Static carousels and Stories can succeed earlier in the day during commute and lunch breaks.",
  },
];
