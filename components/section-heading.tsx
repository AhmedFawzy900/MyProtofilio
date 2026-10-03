import { Reveal } from "@/components/reveal";

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 font-mono text-sm tracking-widest text-indigo-300 uppercase">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-lg text-muted">{description}</p>}
    </Reveal>
  );
}
