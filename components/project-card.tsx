import Link from "next/link";
import { Icon } from "@/components/icons";
import { ProjectCover } from "@/components/project-cover";
import { SpotlightCard } from "@/components/spotlight-card";
import type { Project } from "@/data/profile";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="group h-full transition duration-300 hover:-translate-y-1">
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col p-3">
        <div className="transition duration-500 group-hover:scale-[1.02]">
          <ProjectCover project={project} />
        </div>
        <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[0.7rem] font-medium tracking-wide text-slate-300 uppercase">
              {project.category}
            </span>
            {project.live && (
              <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium text-emerald-300">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                Live
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{project.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[0.7rem] text-slate-400">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-medium text-indigo-300 transition group-hover:gap-2.5 group-hover:text-white">
            View details <Icon name="arrow-right" className="size-4" />
          </div>
        </div>
      </Link>
    </SpotlightCard>
  );
}
