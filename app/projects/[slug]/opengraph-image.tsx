import { getProject, projects } from "@/data/profile";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Project by Ahmed Attia";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOg({
    eyebrow: project ? `${project.category} project` : "Project",
    title: project?.name ?? "Project",
    subtitle: project?.tagline ?? "",
    tags: project?.tech,
    accent: project?.accent,
  });
}
