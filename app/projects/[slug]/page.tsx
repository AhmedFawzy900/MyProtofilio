import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AskButton } from "@/components/chat/ask-button";
import { Icon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { ProjectCover } from "@/components/project-cover";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { getExperience, getProject, projects } from "@/data/profile";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: `${project.tagline}. ${project.overview}` };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const experience = project.experienceSlug ? getExperience(project.experienceSlug) : undefined;
  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const related = projects
    .filter((p) => p.slug !== project.slug)
    .sort(
      (a, b) =>
        Number(b.category === project.category) +
        Number(b.experienceSlug === project.experienceSlug && !!b.experienceSlug) -
        (Number(a.category === project.category) + Number(a.experienceSlug === project.experienceSlug && !!a.experienceSlug)),
    )
    .slice(0, 3);
  const [from, to] = project.accent;

  return (
    <article className="px-4 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Link href="/#projects" className="group inline-flex items-center gap-2 text-sm text-muted transition hover:text-white">
            <Icon name="arrow-left" className="size-4 transition group-hover:-translate-x-1" />
            All projects
          </Link>
        </Reveal>

        <header className="mt-8 grid grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <Reveal delay={50} className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium tracking-wide text-slate-300 uppercase">
                {project.category}
              </span>
              {project.live && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                <Icon name="calendar" className="size-3.5" />
                {project.year}
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-5 text-5xl font-bold tracking-tight text-white sm:text-6xl">{project.name}</h1>
            </Reveal>
            <Reveal delay={150}>
              <p
                className="mt-4 bg-clip-text text-xl font-medium text-transparent sm:text-2xl"
                style={{ backgroundImage: `linear-gradient(90deg, ${from}, ${to})` }}
              >
                {project.tagline}
              </p>
            </Reveal>
          </div>
          <Reveal delay={200} className="flex flex-wrap gap-3 lg:justify-end">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-medium text-white shadow-lg transition hover:brightness-110"
                style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
              >
                {l.label}
                <Icon name="arrow-up-right" className="size-4" />
              </a>
            ))}
            <AskButton
              question={`Tell me about ${project.name}`}
              className="glass inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-medium text-white transition hover:bg-white/10"
            >
              <Icon name="sparkles" className="size-4 text-indigo-300" />
              Ask AI about it
            </AskButton>
          </Reveal>
        </header>

        <Reveal delay={250} className="mt-12">
          <ProjectCover project={project} large />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-8">
            <Reveal>
              <SpotlightCard className="p-8">
                <h2 className="text-sm font-medium tracking-widest text-indigo-300 uppercase">Overview</h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-300">{project.overview}</p>
              </SpotlightCard>
            </Reveal>
            <Reveal>
              <SpotlightCard className="p-8">
                <h2 className="text-sm font-medium tracking-widest text-indigo-300 uppercase">Key features</h2>
                <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-slate-200">
                      <span
                        className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg text-white"
                        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                      >
                        <Icon name="check" className="size-3.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
            <Reveal>
              <SpotlightCard className="p-8">
                <h2 className="text-sm font-medium tracking-widest text-indigo-300 uppercase">My role</h2>
                <ul className="mt-6 space-y-4">
                  {project.role.map((r, i) => (
                    <li key={r} className="flex items-start gap-4 text-slate-200">
                      <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          </div>

          <aside>
            <Reveal className="lg:sticky lg:top-28">
              <div className="glass space-y-6 rounded-3xl p-7">
                <div>
                  <div className="text-xs tracking-wider text-muted uppercase">Type</div>
                  <div className="mt-1 text-white">{project.category}</div>
                </div>
                {experience && (
                  <div>
                    <div className="text-xs tracking-wider text-muted uppercase">Built at</div>
                    <Link
                      href={`/experience/${experience.slug}`}
                      className="group mt-1 inline-flex items-center gap-1.5 text-white transition hover:text-indigo-300"
                    >
                      {experience.company}
                      <Icon name="arrow-right" className="size-3.5 transition group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                )}
                <div>
                  <div className="text-xs tracking-wider text-muted uppercase">Timeline</div>
                  <div className="mt-1 text-white">{project.year}</div>
                </div>
                <div>
                  <div className="text-xs tracking-wider text-muted uppercase">Tech stack</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {project.links.length === 0 && (
                  <p className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-sm text-muted">
                    This is an internal / client system, so there&apos;s no public link — happy to walk you through it in a call.
                  </p>
                )}
              </div>
            </Reveal>
          </aside>
        </div>

        <nav className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} className="glass group rounded-2xl p-5 transition hover:bg-white/[0.06]">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted">
              <Icon name="arrow-left" className="size-3.5 transition group-hover:-translate-x-1" /> Previous
            </span>
            <span className="mt-1 block font-semibold text-white">{prev.name}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="glass group rounded-2xl p-5 text-right transition hover:bg-white/[0.06]">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted">
              Next <Icon name="arrow-right" className="size-3.5 transition group-hover:translate-x-1" />
            </span>
            <span className="mt-1 block font-semibold text-white">{next.name}</span>
          </Link>
        </nav>

        <section className="mt-24">
          <h2 className="mb-8 text-2xl font-bold text-white">More projects</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
