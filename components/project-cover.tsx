import type { Project } from "@/data/profile";

export function ProjectCover({ project, large = false }: { project: Project; large?: boolean }) {
  const [from, to] = project.accent;
  const host = project.links[0]?.href.replace(/^https?:\/\//, "").replace(/\/.*$/, "") ?? `${project.slug}.app`;

  return (
    <div
      className={`relative overflow-hidden ${large ? "rounded-3xl" : "rounded-2xl"}`}
      style={{ background: `linear-gradient(135deg, ${from}33, ${to}22 60%, transparent)` }}
    >
      <div
        className="absolute -top-16 -right-16 size-56 rounded-full blur-3xl"
        style={{ background: `${from}55` }}
      />
      <div className="absolute -bottom-20 -left-10 size-56 rounded-full blur-3xl" style={{ background: `${to}40` }} />

      <div className={`relative ${large ? "p-4 sm:p-10" : "p-4 sm:p-5"}`}>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0d1c]/80 shadow-2xl backdrop-blur">
          <div className="flex min-w-0 items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <span className="size-2.5 shrink-0 rounded-full bg-rose-400/80" />
            <span className="size-2.5 shrink-0 rounded-full bg-amber-400/80" />
            <span className="size-2.5 shrink-0 rounded-full bg-emerald-400/80" />
            <span className="ms-3 min-w-0 truncate rounded-md bg-white/5 px-2 py-0.5 font-mono text-[0.65rem] text-slate-400">
              {host}
            </span>
          </div>
          <div className={`flex items-center gap-4 ${large ? "p-6 sm:p-8" : "p-4"}`}>
            <div
              className={`grid shrink-0 place-items-center rounded-2xl font-bold text-white shadow-lg ${
                large ? "size-14 text-2xl sm:size-20 sm:text-3xl" : "size-12 text-lg"
              }`}
              style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
            >
              {project.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <div className={`truncate font-semibold text-white ${large ? "text-lg sm:text-2xl" : "text-sm"}`}>{project.name}</div>
              <div className="h-2 w-4/5 rounded-full bg-white/10" />
              <div className="h-2 w-3/5 rounded-full bg-white/[0.06]" />
            </div>
          </div>
          <div className={`grid grid-cols-3 gap-2 ${large ? "px-6 pb-6 sm:px-8 sm:pb-8" : "px-4 pb-4"}`}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`rounded-lg border border-white/5 ${large ? "h-16" : "h-8"}`}
                style={{ background: `linear-gradient(135deg, ${i === 1 ? to : from}${i === 1 ? "30" : "22"}, transparent)` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
