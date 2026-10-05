import Link from "next/link";
import { AskButton } from "@/components/chat/ask-button";
import { Icon, type IconName } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { ProjectsGrid } from "@/components/projects-grid";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SpotlightCard } from "@/components/spotlight-card";
import { experiences, profile, projects, skillGroups, techMarquee } from "@/data/profile";
import { homeSchema } from "@/lib/structured-data";

const stats = [
  { value: `${profile.yearsOfExperience}`, label: "Years of experience" },
  { value: `${projects.length}`, label: "Projects delivered" },
  { value: `${projects.filter((p) => p.live).length}`, label: "Live products" },
  { value: `${experiences.length}`, label: "Companies" },
];

const sampleQuestions = [
  "Why should I hire Ahmed?",
  "Does he know React?",
  "Tell me about ChairLocation",
  "What does he do at Archirodon?",
  "إيه خبرته في Laravel؟",
  "أتواصل معاه إزاي؟",
];

export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema()} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <section id="projects" className="px-4 py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects I've built"
            description="Production platforms, freelance builds and side projects — click any card for the full story."
          />
          <ProjectsGrid />
        </div>
      </section>
      <Education />
      <AskSection />
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section className="relative px-4 pt-28 pb-16 sm:pt-44 sm:pb-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <Reveal>
            <span className="glass inline-flex max-w-full items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-slate-300 sm:px-4 sm:text-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Currently @ {profile.currentCompany}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-5 text-[2.6rem] leading-[1.05] font-bold tracking-tight text-white sm:mt-6 sm:text-6xl lg:text-7xl">
              Hi, I&apos;m <span className="text-gradient">{profile.firstName}</span>
              <br />
              Fawzy Attia
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-lg font-medium text-slate-200 sm:mt-6 sm:text-2xl">
              {profile.title} <span className="text-muted">—</span> {profile.headline}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
              I turn business requirements into reliable, secure and maintainable systems — from Laravel APIs and MySQL
              schemas to automated approval workflows.
            </p>
          </Reveal>
          <Reveal delay={400} className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            <Link
              href="/#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 px-6 py-3.5 font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
            >
              View my work
              <Icon name="arrow-right" className="size-4 transition group-hover:translate-x-1" />
            </Link>
            <AskButton className="glass inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-medium text-white transition hover:bg-white/10">
              <Icon name="sparkles" className="size-4 text-indigo-300" />
              Ask my AI assistant
            </AskButton>
            <a
              href={profile.cv}
              download
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-medium text-slate-300 transition hover:text-white sm:py-3.5"
            >
              <Icon name="download" className="size-4" />
              Download CV
            </a>
          </Reveal>
          <Reveal
            delay={500}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-muted sm:mt-10 sm:justify-start"
          >
            <span className="inline-flex items-center gap-1.5">
              <Icon name="map-pin" className="size-4" />
              {profile.location}
            </span>
            <span className="h-4 w-px bg-white/10" />
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition hover:text-white">
              <Icon name="github" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition hover:text-white">
              <Icon name="linkedin" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="transition hover:text-white">
              <Icon name="mail" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <CodeCard />
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 sm:mt-20 sm:gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100}>
            <div className="glass h-full rounded-2xl px-3 py-4 text-center sm:px-6 sm:py-5">
              <div className="text-gradient text-3xl font-bold sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs text-muted sm:text-sm">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CodeCard() {
  const k = "text-fuchsia-400";
  const t = "text-cyan-300";
  const s = "text-emerald-300";
  const v = "text-amber-200";
  const f = "text-indigo-300";
  return (
    <div className="animate-float relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-cyan-500/20 via-indigo-500/20 to-fuchsia-500/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0c1a]/90 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5">
          <span className="size-2.5 shrink-0 rounded-full bg-rose-400/80 sm:size-3" />
          <span className="size-2.5 shrink-0 rounded-full bg-amber-400/80 sm:size-3" />
          <span className="size-2.5 shrink-0 rounded-full bg-emerald-400/80 sm:size-3" />
          <span className="ms-2 min-w-0 truncate font-mono text-[0.65rem] text-slate-500 sm:ms-3 sm:text-xs">
            app/Developers/AhmedFawzy.php
          </span>
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-[0.68rem] leading-6 text-slate-300 sm:p-6 sm:text-sm sm:leading-7">
          <code>
            <span className="text-slate-500">&lt;?php</span>
            {"\n\n"}
            <span className={k}>class</span> <span className={t}>AhmedFawzy</span> <span className={k}>extends</span>{" "}
            <span className={t}>Developer</span>
            {"\n{\n"}
            {"    "}
            <span className={k}>public</span> <span className={t}>string</span> <span className={v}>$role</span> ={" "}
            <span className={s}>&apos;Backend &amp; Low-Code&apos;</span>;{"\n"}
            {"    "}
            <span className={k}>public</span> <span className={t}>array</span> <span className={v}>$stack</span> = [
            {"\n        "}
            <span className={s}>&apos;Laravel&apos;</span>, <span className={s}>&apos;MySQL&apos;</span>,{" "}
            <span className={s}>&apos;REST&apos;</span>, <span className={s}>&apos;React&apos;</span>,{"\n    "}];
            {"\n\n"}
            {"    "}
            <span className={k}>public function</span> <span className={f}>solve</span>(<span className={t}>Problem</span>{" "}
            <span className={v}>$p</span>): <span className={t}>Solution</span>
            {"\n    {\n"}
            {"        "}
            <span className={k}>return</span> <span className={v}>$this</span>
            {"\n            "}-&gt;<span className={f}>understand</span>(<span className={v}>$p</span>)
            {"\n            "}-&gt;<span className={f}>design</span>()
            {"\n            "}-&gt;<span className={f}>secure</span>()
            {"\n            "}-&gt;<span className={f}>ship</span>();
            <span className="ms-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-indigo-400" />
            {"\n    }\n}"}
          </code>
        </pre>
      </div>
    </div>
  );
}

function About() {
  const facts: { icon: IconName; label: string; value: string; href?: string }[] = [
    { icon: "briefcase", label: "Current role", value: `${profile.currentRole} @ ${profile.currentCompany}` },
    { icon: "map-pin", label: "Based in", value: profile.location },
    { icon: "graduation", label: "Education", value: `${profile.education.degree}, ${profile.education.school}` },
    { icon: "languages", label: "Languages", value: profile.languages.map((l) => `${l.name} (${l.level})`).join(" · ") },
    { icon: "mail", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  ];
  return (
    <section id="about" className="px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About me" title="Backend engineer, process automator" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <Reveal>
            <SpotlightCard className="h-full p-8 sm:p-10">
              <div className="space-y-5 text-lg leading-relaxed text-slate-300">
                {profile.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {profile.certifications.map((c) => (
                  <span key={c.name} className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/5 px-3 py-1 text-sm text-amber-200">
                    <Icon name="award" className="size-4" />
                    {c.name} Certified
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
          <div className="grid grid-cols-1 gap-4">
            {facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 80}>
                <div className="glass flex items-start gap-4 rounded-2xl p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-cyan-400/15 to-indigo-500/25 text-indigo-200">
                    <Icon name={f.icon} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs tracking-wider text-muted uppercase">{f.label}</div>
                    {f.href ? (
                      <a href={f.href} className="mt-0.5 block truncate text-slate-100 transition hover:text-indigo-300">
                        {f.value}
                      </a>
                    ) : (
                      <div className="mt-0.5 text-slate-100">{f.value}</div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Toolbox" title="Skills & technologies" description="The stack I use to design, build and ship business systems." />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 80} className={i === 0 ? "lg:col-span-2" : ""}>
              <SpotlightCard className="h-full p-7">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-linear-to-br from-indigo-500/25 to-fuchsia-500/20 text-indigo-200">
                    <Icon name={g.icon} />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{g.title}</h3>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-slate-300 transition hover:border-indigo-400/40 hover:text-white"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="relative mt-16 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div className="animate-marquee flex w-max gap-4">
          {[...techMarquee, ...techMarquee].map((t, i) => (
            <span key={i} className="glass rounded-full px-5 py-2 font-mono text-sm whitespace-nowrap text-slate-400">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="px-4 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Career" title="Where I've worked" description="From internship to enterprise workflow automation." />
        <ol className="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[19px] before:w-px before:bg-linear-to-b before:from-cyan-400/60 before:via-indigo-500/40 before:to-transparent sm:before:left-[23px]">
          {experiences.map((e, i) => (
            <Reveal as="li" key={e.slug} delay={i * 80} className="relative ps-14 sm:ps-16">
              <span
                className="absolute top-6 left-0 grid size-10 place-items-center rounded-xl border border-white/10 text-white shadow-lg sm:size-12"
                style={{ background: `linear-gradient(135deg, ${e.accent[0]}, ${e.accent[1]})` }}
              >
                <Icon name={i === 0 ? "workflow" : "briefcase"} className="size-5" />
              </span>
              <SpotlightCard className="group transition hover:-translate-y-0.5">
                <Link href={`/experience/${e.slug}`} className="block p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs tracking-wider text-indigo-300 uppercase">
                      {e.start} — {e.end}
                    </span>
                    <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-slate-400">{e.type}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">{e.role}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 text-slate-300">
                    <span className="font-medium">{e.company}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-sm text-muted">{e.location}</span>
                  </p>
                  <p className="mt-4 leading-relaxed text-muted">{e.summary}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {e.tech.slice(0, 5).map((t) => (
                        <span key={t} className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[0.7rem] text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-300 transition group-hover:gap-2.5 group-hover:text-white">
                      Details <Icon name="arrow-right" className="size-4" />
                    </span>
                  </div>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Learning" title="Education & certifications" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <SpotlightCard className="h-full p-8">
              <div className="flex items-start gap-5">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-cyan-400 to-indigo-500 text-white">
                  <Icon name="graduation" className="size-7" />
                </span>
                <div>
                  <p className="font-mono text-xs tracking-wider text-indigo-300 uppercase">{profile.education.period}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{profile.education.degree}</h3>
                  <p className="mt-1 text-slate-300">
                    {profile.education.school} · <span className="text-muted">{profile.education.location}</span>
                  </p>
                  <Link
                    href={`/projects/${profile.education.projectSlug}`}
                    className="group mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 pe-5 transition hover:border-rose-400/40"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-rose-500 to-pink-500 font-bold text-white">T</span>
                    <span>
                      <span className="block text-xs text-muted">Graduation project</span>
                      <span className="block font-medium text-white">{profile.education.project}</span>
                    </span>
                    <Icon name="arrow-right" className="size-4 text-muted transition group-hover:translate-x-1 group-hover:text-white" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
          <div className="grid grid-cols-1 gap-5">
            {profile.certifications.map((c, i) => (
              <Reveal key={c.name} delay={(i + 1) * 100}>
                <div className="glass flex items-center gap-4 rounded-3xl p-6">
                  <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-amber-400/25 to-orange-500/20 text-amber-200">
                    <Icon name="award" className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{c.name} Certified</h3>
                    <p className="text-sm text-muted">{c.full}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AskSection() {
  return (
    <section className="px-4 py-20">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-cyan-400/60 via-indigo-500/60 to-fuchsia-500/60 p-px">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#080a17] px-6 py-14 text-center sm:px-14">
            <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl" />
            <div className="relative">
              <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-linear-to-br from-cyan-400 via-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/40">
                <Icon name="bot" className="size-8" />
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">Got a question? Just ask.</h2>
              <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
                My assistant knows everything on my CV — experience, skills, projects, education — and answers instantly in
                English or Arabic.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2.5">
                {sampleQuestions.map((q) => (
                  <AskButton
                    key={q}
                    question={q}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200 transition hover:-translate-y-0.5 hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white"
                  >
                    <span dir="auto">{q}</span>
                  </AskButton>
                ))}
              </div>
              <AskButton className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-medium text-slate-900 transition hover:bg-indigo-100">
                <Icon name="chat" className="size-4" />
                Start a conversation
              </AskButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Contact() {
  const items: { icon: IconName; label: string; value: string; href: string }[] = [
    { icon: "mail", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: "phone", label: "Phone / WhatsApp", value: profile.phoneDisplay, href: `tel:${profile.phone}` },
    { icon: "linkedin", label: "LinkedIn", value: "ahmed-attia", href: profile.linkedin },
    { icon: "github", label: "GitHub", value: "ahmedfawzy900", href: profile.github },
  ];
  return (
    <section id="contact" className="px-4 pt-20 pb-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great"
          description="Have a project, a role or an idea? My inbox is always open."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 80}>
              <a
                href={it.href}
                target={it.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <SpotlightCard className="h-full p-6 transition group-hover:-translate-y-1">
                  <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-cyan-400/15 to-indigo-500/25 text-indigo-200 transition group-hover:from-cyan-400 group-hover:to-indigo-500 group-hover:text-white">
                    <Icon name={it.icon} />
                  </span>
                  <div className="mt-5 text-xs tracking-wider text-muted uppercase">{it.label}</div>
                  <div className="mt-1 truncate font-medium text-white">{it.value}</div>
                </SpotlightCard>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.email}?subject=Hello%20Ahmed`}
            className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 px-7 py-3.5 font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50"
          >
            <Icon name="send" className="size-4" />
            Send me an email
          </a>
          <a href={profile.cv} download className="glass inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 font-medium text-white transition hover:bg-white/10">
            <Icon name="download" className="size-4" />
            Download CV
          </a>
        </Reveal>
      </div>
    </section>
  );
}
