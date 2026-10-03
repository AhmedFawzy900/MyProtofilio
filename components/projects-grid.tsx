"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { projectCategories, projects } from "@/data/profile";

export function ProjectsGrid() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:mb-10 sm:flex-wrap sm:justify-center sm:px-0">
        {projectCategories.map((c) => {
          const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
          const active = filter === c;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm whitespace-nowrap transition ${
                active
                  ? "bg-white text-slate-900 shadow-lg shadow-indigo-500/20"
                  : "border border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:text-white"
              }`}
            >
              {c}
              <span className="ms-2 text-xs text-slate-500">{count}</span>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {visible.map((p, i) => (
          <div key={p.slug} className="animate-pop" style={{ animationDelay: `${i * 50}ms` }}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
