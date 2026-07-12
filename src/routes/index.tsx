import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import maskedHero from "@/assets/harshit-masked.jpg";
import harshitAsset from "@/assets/harshit-real.png.asset.json";
import emailsviaAsset from "@/assets/emailsvia.png.asset.json";
import pujapathsewaAsset from "@/assets/pujapathsewa.png.asset.json";
import bubAiAsset from "@/assets/bub-ai.png.asset.json";
import mutanexAsset from "@/assets/mutanex.png.asset.json";
import nokturnAsset from "@/assets/nokturn.png.asset.json";

const realHero = harshitAsset.url;
const BUILD_IMAGES: Record<string, string> = {
  EMAILSVIA_SCREENSHOT: emailsviaAsset.url,
  PUJAPATHSEVA_SCREENSHOT: pujapathsewaAsset.url,
  BUB_AI_SCREENSHOT: bubAiAsset.url,
  MUTANEX_APP_SCREENSHOT: mutanexAsset.url,
  NOKTURN_SCREENSHOT: nokturnAsset.url,
};

export const Route = createFileRoute("/")({
  component: Portfolio,
});

// -- Data ------------------------------------------------------------------
const ROLES = ["Product Manager", "0→1 Builder", "IIT Kharagpur", "Growth & Strategy"];

const SKILLS: { title: string; items: string[] }[] = [
  {
    title: "Research & Analytics",
    items: ["A/B Testing", "Funnel Analysis", "Cohort Analysis", "Retention Metrics", "Usability (SUS)", "User Research", "KPI Definition", "NPS", "North Star Metric"],
  },
  {
    title: "Tools",
    items: ["SQL", "Python", "Figma", "Notion", "Mixpanel", "GA", "Amplitude", "Miro", "Adobe XD", "Canva", "Photoshop", "Illustrator"],
  },
  {
    title: "Product Craft",
    items: ["Product Strategy", "Roadmapping", "Discovery", "PRD Writing", "User Stories", "Agile/Scrum", "Stakeholder Mgmt", "GTM", "MoSCoW", "JTBD"],
  },
];

const MISSIONS = [
  {
    company: "Devlaunch",
    role: "Product Intern",
    period: "May – Jul 2025",
    bullets: [
      "Increased sprint velocity 20% in 8 weeks via PRD authoring and Agile ceremonies.",
      "Improved user engagement 15% through cross-functional collaboration.",
      "Drove 18% WAU growth by fixing 3 critical funnel drop-offs.",
    ],
  },
  {
    company: "Mutanex Healthcare",
    role: "Founder's Office Intern",
    period: "Feb 2025",
    bullets: [
      "Supported fundraising for an AI cancer-risk platform — contributed to ₹8L in early-stage funding.",
      "Reduced product complexity 30% via redesigned upload journey.",
      "Maintained 87% model prediction accuracy alongside data science.",
    ],
  },
  {
    company: "QuickVerse",
    role: "Product Intern",
    period: "May – Jul 2024",
    bullets: [
      "Defined 3 MVP-ready modules by benchmarking 12+ competitors.",
      "Improved roadmap efficiency 25% via backlog grooming and MoSCoW prioritization.",
      "Authored PRDs and user story maps for 3 shipped features.",
    ],
  },
];

const BUILDS = [
  {
    name: "NOKTURN",
    type: "Live Product" as const,
    cta: "Visit Live Site →",
    href: "https://nokturn.lovable.app/",
    subtitle: "Dark-Glam Streetwear E-Commerce Brand (2026)",
    desc: "Designed and built a full-stack fashion e-commerce experience from scratch — brand identity, product catalog, cart and wishlist flows, and a cinematic dark-glam visual language across corsets, mesh, leather, and metallics. Balanced editorial storytelling (campaign film, manifesto, lookbook) with functional commerce UX, including quick-add, size selection, and category browsing.",
    placeholder: "NOKTURN_SCREENSHOT",
  },
  {
    name: "EmailsVia",
    type: "Live Product" as const,
    cta: "Visit Live Site →",
    href: "https://www.emailsvia.com/",
    subtitle: "Self-Hosted Cold-Email Outreach Platform (May 2026)",
    desc: "Built and shipped a SaaS product from scratch — campaign flows, monetization, AI-driven reply classification, and automated follow-up infrastructure.",
    placeholder: "EMAILSVIA_SCREENSHOT",
  },
  {
    name: "PujaPathSeva",
    type: "Live Product" as const,
    cta: "Visit Live Site →",
    href: "https://www.pujapathsewa.com/",
    subtitle: "Temple Booking Platform, 0→1 (July 2025)",
    desc: "Defined product vision and architecture for a 0→1 booking platform; led a 3-developer team to MVP in 4 weeks; 22% improvement in task completion; 20+ Figma wireframes/prototypes.",
    placeholder: "PUJAPATHSEVA_SCREENSHOT",
  },
  {
    name: "BUB AI",
    type: "Figma Prototype" as const,
    cta: "View Prototype →",
    href: "https://www.figma.com/design/KpXfGi2y5kTE2NliadprTr/BUB-NEW?node-id=319-343&p=f&t=dZrGKoFm8GhmFvtY-0",
    subtitle: "Mental Health Peer-Support App (April 2025)",
    desc: "Validated product-market fit through 15+ structured user interviews synthesized into 4 core personas; designed accessible, safety-focused user journeys and prototypes.",
    placeholder: "BUB_AI_SCREENSHOT",
  },
  {
    name: "Mutanex Healthcare — Mobile App",
    type: "Figma Prototype" as const,
    cta: "View Prototype →",
    href: "https://www.figma.com/design/CdxnyMPF6ZptrxL72HVTkA/Mutanex-app?node-id=164-3214&p=f&t=jfvK4WAju2mufY9n-0",
    subtitle: "Feb 2025",
    desc: "Owned requirements and UX across 8 screens (onboarding, multi-step forms, report upload, data viz); achieved SUS score of 80+ in usability testing.",
    placeholder: "MUTANEX_APP_SCREENSHOT",
  },
];

const TROPHIES = [
  { title: "Gold — Open IIT Product Management", date: "Oct 2024", desc: "Gold among 400+ IIT participants. Pitched FITSCAN (AI body analysis) and FITCOM (social fitness) with full GTM, monetization, and metrics strategy." },
  { title: "Finalist — GC Product Design", date: "Mar 2025", desc: "Led wearable design (GPS, SOS, sensors, gesture control). Built architecture and financial model for 5,800-unit production with eSIM and solar." },
  { title: "Captain — Illumination'25", date: "Nov 2025", desc: "Led IIT KGP's largest cultural event (250+ participants) to Gold among 23 halls. Managed ₹7L budget, 15-member team, zero incidents." },
];

// -- Hooks -----------------------------------------------------------------
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function useRoleCycle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % ROLES.length), 2200);
    return () => clearInterval(t);
  }, []);
  return ROLES[i];
}

// -- Sections --------------------------------------------------------------
function Hero() {
  const [revealed, setRevealed] = useState(false);
  const role = useRoleCycle();

  return (
    <section className="relative min-h-dvh w-full overflow-hidden">
      {/* Grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      {/* Signal glow */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full opacity-40 blur-[120px]" style={{ background: "var(--signal)" }} />

      {/* Nav */}
      <nav className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 md:px-12">
        <a href="#top" className="display text-xl tracking-widest">
          H·P<span className="signal-text">.</span>
        </a>
        <div className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
          <a href="#origin" className="hover:text-foreground transition">Origin</a>
          <a href="#powers" className="hover:text-foreground transition">Powers</a>
          <a href="#missions" className="hover:text-foreground transition">Missions</a>
          <a href="#builds" className="hover:text-foreground transition">Builds</a>
          <a href="#signal" className="hover:text-foreground transition">Signal</a>
        </div>
      </nav>

      <div className="relative z-10 mx-auto grid min-h-dvh max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 pb-16 md:grid-cols-12 md:px-12">
        {/* Left copy */}
        <div className="order-2 md:order-1 md:col-span-5">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal)] pulse-signal" />
            Available for product roles · 2026
          </div>
          <h1 className="display text-6xl leading-[0.85] md:text-8xl">
            Harshit
            <br />
            <span className="signal-text signal-glow">Paliwal</span>
          </h1>
          <div className="mt-6 flex items-baseline gap-3 font-mono text-sm text-muted-foreground">
            <span className="text-[var(--signal)]">▍</span>
            <span key={role} className="rise-in">{role}</span>
          </div>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            Behind the mask: a product builder who ships. I turn foggy problems into shipped products —
            0→1 launches, growth loops, and the discipline to see them through.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#builds" className="magnetic inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
              See the builds <span aria-hidden>→</span>
            </a>
            <a href="#signal" className="magnetic inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:border-[var(--signal)]">
              Send a signal
            </a>
          </div>
        </div>

        {/* Right: mask reveal */}
        <div className="order-1 md:order-2 md:col-span-7">
          <div
            className="relative mx-auto aspect-[4/5] w-full max-w-[520px] cursor-pointer select-none overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-[0_40px_120px_-40px_rgba(220,38,38,0.35)]"
            onMouseEnter={() => setRevealed(true)}
            onMouseLeave={() => setRevealed(false)}
            onClick={() => setRevealed(v => !v)}
            role="button"
            tabIndex={0}
            aria-label="Unmask"
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setRevealed(v => !v); }}
          >
            <img
              src={maskedHero}
              alt="The Builder — masked hero identity of Harshit Paliwal"
              className="absolute inset-0 h-full w-full object-cover"
              width={1408}
              height={1152}
            />
            <img
              src={realHero}
              alt="Harshit Paliwal"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
              style={{
                opacity: revealed ? 1 : 0,
                filter: revealed ? "none" : "blur(8px)",
              }}
            />
            {/* Scanline on hover */}
            <div className={`absolute inset-0 overflow-hidden ${revealed ? "scanline" : ""}`} />
            {/* Vignette */}
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 120px 20px rgba(0,0,0,0.75)" }} />

            {/* HUD label */}
            <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
              <span className={`h-1.5 w-1.5 rounded-full ${revealed ? "bg-emerald-400" : "bg-[var(--signal)]"} pulse-signal`} />
              {revealed ? "Identity : Harshit Paliwal" : "Identity : Encrypted"}
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
              {revealed ? "hover · to · mask" : "hover · to · unmask"}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>Scroll to see the story</span>
        <span className="chevron-bounce text-[var(--signal)]">▾</span>
      </div>
    </section>
  );
}

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: React.ReactNode; children: React.ReactNode }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section id={id} className="relative border-t border-border/50 py-24 md:py-36">
      <div ref={ref} className={`mx-auto max-w-7xl px-6 md:px-12 transition-all duration-700 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="mb-14 flex items-end justify-between gap-8">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-px w-8 bg-[var(--signal)]" />{kicker}
            </div>
            <h2 className="display text-5xl md:text-7xl">{title}</h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function Origin() {
  return (
    <Section id="origin" kicker="Chapter 01" title={<>Origin <span className="signal-text">Story</span></>}>
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            It started with a simple habit — pull a thing apart, figure out why it works, put it back together sharper.
            Somewhere between an Economics degree at IIT Kharagpur and shipping products at 3 AM, that habit became a discipline.
          </p>
          <p className="text-foreground">
            I'm Harshit. I build products end-to-end: talk to users, write the PRD, argue the roadmap, ship the launch,
            watch the funnel, iterate. No hand-offs. No excuses.
          </p>
          <p>
            When I'm not shipping, I'm captaining 250-person teams, running fundraising decks, or losing to my own KPIs on purpose so I learn something new.
          </p>
        </div>
        <div className="md:col-span-2 space-y-3">
          {[
            { k: "Institution", v: "IIT Kharagpur" },
            { k: "Discipline", v: "Economics" },
            { k: "CGPA", v: "8.29 / 10" },
            { k: "Class of", v: "2026" },
          ].map((r) => (
            <div key={r.k} className="flex items-baseline justify-between border-b border-border/60 py-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{r.k}</span>
              <span className="display text-2xl">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Powers() {
  return (
    <Section id="powers" kicker="Chapter 02" title={<><span className="signal-text">Powers</span> & Kit</>}>
      <div className="grid gap-6 md:grid-cols-3">
        {SKILLS.map((cat, i) => (
          <div key={cat.title} className="group relative overflow-hidden rounded-xl border border-border/60 bg-card/50 p-8 transition hover:border-[var(--signal)]/60 hover:bg-card">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">0{i + 1}</span>
              <span className="h-2 w-2 rounded-full bg-[var(--signal)] pulse-signal" />
            </div>
            <h3 className="display mb-6 text-3xl">{cat.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {cat.items.map((it) => (
                <li key={it} className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground transition group-hover:border-border">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Missions() {
  return (
    <Section id="missions" kicker="Chapter 03" title={<><span className="signal-text">Missions</span> Log</>}>
      <div className="relative">
        <div aria-hidden className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[var(--signal)] via-border to-transparent md:left-1/2" />
        <div className="space-y-12">
          {MISSIONS.map((m, idx) => (
            <div key={m.company} className={`relative grid gap-6 md:grid-cols-2 md:gap-16 ${idx % 2 ? "md:[&>*:first-child]:col-start-2" : ""}`}>
              <div className="absolute left-4 top-2 -translate-x-1/2 md:left-1/2">
                <div className="relative h-3 w-3 rounded-full bg-[var(--signal)]">
                  <span className="absolute inset-0 rounded-full bg-[var(--signal)] opacity-40 pulse-signal" style={{ transform: "scale(2.5)" }} />
                </div>
              </div>
              <div className={`pl-10 md:pl-0 ${idx % 2 ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--signal)]">{m.period}</div>
                <h3 className="display mt-2 text-4xl">{m.company}</h3>
                <div className="mt-1 text-sm text-muted-foreground">{m.role}</div>
              </div>
              <div className={`pl-10 md:pl-0 ${idx % 2 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <ul className="space-y-3 text-muted-foreground">
                  {m.bullets.map((b) => (
                    <li key={b} className="text-sm leading-relaxed">{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Builds() {
  return (
    <Section id="builds" kicker="Chapter 04" title={<><span className="signal-text">Builds</span></>}>
      <p className="mb-14 max-w-xl text-lg leading-relaxed text-muted-foreground">
        Things I've shipped, 0→1.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {BUILDS.map((b) => (
          <a
            key={b.name}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/40 transition duration-300 hover:-translate-y-1 hover:border-[var(--signal)]/60 hover:shadow-[0_24px_60px_-24px_color-mix(in_oklab,var(--signal)_25%,transparent)]"
          >
            {/* Image placeholder slot */}
            <div className="relative aspect-[16/10] overflow-hidden border-b border-border/60 bg-[oklch(0.16_0.008_285)]">
              <img
                src={BUILD_IMAGES[b.placeholder]}
                alt={`${b.name} screenshot`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay with CTA */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--signal)] px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform duration-300 group-hover:scale-100 scale-95">
                  {b.cta}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-8">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span
                  className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] ${
                    b.type === "Live Product"
                      ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30"
                      : "bg-[var(--signal)]/10 text-[var(--signal)] ring-1 ring-[var(--signal)]/30"
                  }`}
                >
                  {b.type}
                </span>
              </div>
              <h3 className="display text-3xl">{b.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.subtitle}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--signal)] transition-transform duration-300 group-hover:translate-x-1">
                {b.cta}
              </span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

function Trophies() {
  return (
    <Section id="trophies" kicker="Chapter 05" title={<><span className="signal-text">Trophy</span> Room</>}>
      <div className="grid gap-6 md:grid-cols-3">
        {TROPHIES.map((t) => (
          <div key={t.title} className="relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-card to-background p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-[var(--signal)]/60 text-[var(--signal)]">
                ★
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t.date}</span>
            </div>
            <h3 className="display text-2xl leading-tight">{t.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Signal() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="signal" kicker="Chapter 06" title={<>Send a <span className="signal-text">Signal</span></>}>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            Building something worth shipping? I read every message. Fastest way to reach me is email — but the form works too.
          </p>
          <div className="mt-10 space-y-4">
            <a href="mailto:harshitpaliwal2004@gmail.com" className="group flex items-center justify-between border-b border-border/60 py-4 hover:border-[var(--signal)]">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</span>
              <span className="text-lg group-hover:text-[var(--signal)] transition">harshitpaliwal2004@gmail.com</span>
            </a>
            <a href="tel:+917414035009" className="group flex items-center justify-between border-b border-border/60 py-4 hover:border-[var(--signal)]">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Phone</span>
              <span className="text-lg group-hover:text-[var(--signal)] transition">+91 74140 35009</span>
            </a>
            <a href="#" className="group flex items-center justify-between border-b border-border/60 py-4 hover:border-[var(--signal)]" aria-label="LinkedIn (add URL)">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">LinkedIn</span>
              <span className="text-lg group-hover:text-[var(--signal)] transition">/in/harshit-paliwal →</span>
            </a>
          </div>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="space-y-5 rounded-xl border border-border/60 bg-card/40 p-8"
        >
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Name</label>
            <input required className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--signal)]" placeholder="Your name" />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</label>
            <input type="email" required className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--signal)]" placeholder="you@company.com" />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Message</label>
            <textarea required rows={5} className="w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--signal)]" placeholder="What are you building?" />
          </div>
          <button
            type="submit"
            className="magnetic inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            {sent ? "Signal received ✓" : "Transmit"}
          </button>
        </form>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          © 2026 · Harshit Paliwal · Built with intent.
        </div>
        <a href="#top" className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-[var(--signal)]">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

function Portfolio() {
  return (
    <main id="top" className="relative">
      <Hero />
      <Origin />
      <Powers />
      <Missions />
      <Builds />
      <Trophies />
      <Signal />
      <Footer />
    </main>
  );
}
