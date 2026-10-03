import Link from "next/link";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-4 pt-24 text-center">
      <div>
        <p className="text-gradient text-8xl font-bold">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-white">This page took a wrong route</h1>
        <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-medium text-slate-900 transition hover:bg-indigo-100"
        >
          <Icon name="arrow-left" className="size-4" />
          Back home
        </Link>
      </div>
    </section>
  );
}
