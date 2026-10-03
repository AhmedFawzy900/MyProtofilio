import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AskButton } from "@/components/chat/ask-button";
import { Icon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { experiences, getExperience, projectsForExperience } from "@/data/profile";

export const dynamicParams = false;

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/experience/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) return {};
  return { title: `${experience.role} @ ${experience.company}`, description: experience.summary };
}

export default async function ExperiencePage({ params }: PageProps<"/experience/[slug]">) {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) notFound();

  const related = projectsForExperience(experience.slug);
  const index = experiences.findIndex((e) => e.slug === experience.slug);
  const newer = experiences[index - 1];
  const older = experiences[index + 1];
  const [from, to] = experience.accent;

  return (
    <article className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Link href="/#experience" className="group inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
            <Icon name="arrow-left" className="size-4 transition group-hover:-translate-x-1" />
            Career timeline
          </Link>
        </Reveal>

        <header className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 p-8 sm:p-12">
          <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(135deg, ${from}30, ${to}18 55%, transparent)` }} />
          <div className="absolute -top-24 -right-24 -z-10 size-72 rounded-full blur-3xl" style={{ background: `${from}40` }} />
          <Reveal className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-200">{experience.type}</span>
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-300">
              <Icon name="calendar" className="size-4" />
              {experience.start} — {experience.end}
            </span>
            {experience.end === "Present" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                Current role
              </span>
            )}
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">{experience.role}</h1>
          </Reveal>
          <Reveal delay={150} className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-lg text-slate-200">
            <span className="inline-flex items-center gap-2">
              <Icon name="building" className="size-5 text-slate-400" />
              {experience.company}
            </span>
            <span className="inline-flex items-center gap-2 text-base text-slate-300">
              <Icon name="map-pin" className="size-5 text-slate-400" />
              {experience.location}
            </span>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{experience.summary}</p>
          </Reveal>
          <Reveal delay={250} className="mt-8">
            <AskButton
              question={`Tell me about ${experience.company}`}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-indigo-100"
            >
              <Icon name="sparkles" className="size-4" />
              Ask AI about this role
            </AskButton>
          </Reveal>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <Reveal>
            <SpotlightCard className="h-full p-8">
              <h2 className="text-sm font-medium tracking-widest text-indigo-300 uppercase">Responsibilities & highlights</h2>
              <ul className="mt-6 space-y-4">
                {experience.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-4 leading-relaxed text-slate-200">
                    <span
                      className="mt-1 grid size-6 shrink-0 place-items-center rounded-lg text-white"
                      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                    >
                      <Icon name="check" className="size-3.5" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={100}>
            <div className="glass h-full rounded-3xl p-7">
              <h2 className="text-xs tracking-wider text-muted uppercase">Tools & tech</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {experience.tech.map((t) => (
                  <span key={t} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-8 text-xs tracking-wider text-muted uppercase">Duration</div>
              <div className="mt-1 text-white">
                {experience.start} — {experience.end}
              </div>
              <div className="mt-6 text-xs tracking-wider text-muted uppercase">Employment</div>
              <div className="mt-1 text-white">{experience.type}</div>
            </div>
          </Reveal>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 text-2xl font-bold text-white">Projects from this role</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <nav className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {newer ? (
            <Link href={`/experience/${newer.slug}`} className="glass group rounded-2xl p-5 transition hover:bg-white/[0.06]">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                <Icon name="arrow-left" className="size-3.5 transition group-hover:-translate-x-1" /> Newer role
              </span>
              <span className="mt-1 block font-semibold text-white">{newer.company}</span>
            </Link>
          ) : (
            <span />
          )}
          {older && (
            <Link href={`/experience/${older.slug}`} className="glass group rounded-2xl p-5 text-right transition hover:bg-white/[0.06]">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                Earlier role <Icon name="arrow-right" className="size-3.5 transition group-hover:translate-x-1" />
              </span>
              <span className="mt-1 block font-semibold text-white">{older.company}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
