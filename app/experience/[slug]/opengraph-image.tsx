import { experiences, getExperience } from "@/data/profile";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Experience of Ahmed Attia";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experience = getExperience(slug);
  return renderOg({
    eyebrow: experience ? `${experience.start} — ${experience.end}` : "Experience",
    title: experience?.company ?? "Experience",
    subtitle: experience?.role ?? "",
    tags: experience?.tech,
    accent: experience?.accent,
  });
}
