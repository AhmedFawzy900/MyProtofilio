"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { openChat } from "@/components/chat/open-chat";
import { profile } from "@/data/profile";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
          scrolled || menuOpen ? "glass shadow-lg shadow-black/20" : "border border-transparent"
        }`}
      >
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <Image
            src="/logo.jpg"
            alt={`${profile.name} logo`}
            width={44}
            height={44}
            preload
            className="size-11 rounded-xl ring-1 ring-orange-400/30 transition group-hover:scale-105 group-hover:ring-orange-400/70"
          />
          <span className="hidden font-semibold tracking-tight text-white sm:block">
            Ahmed<span className="text-indigo-400">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <Link
                href={`/#${l.id}`}
                className={`relative rounded-lg px-3 py-2 text-sm transition ${
                  active === l.id && isHome ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {l.label}
                {active === l.id && isHome && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-linear-to-r from-cyan-400 to-fuchsia-500" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openChat()}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-sm font-medium text-slate-900 transition hover:bg-indigo-100"
          >
            <Icon name="sparkles" className="size-4" />
            <span>Ask AI</span>
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="rounded-xl p-2 text-slate-300 transition hover:bg-white/5 md:hidden"
          >
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
        </div>
      </nav>

      <div
        className={`glass mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 border-transparent opacity-0"
        }`}
      >
        <ul className="p-2">
          {links.map((l) => (
            <li key={l.id}>
              <Link
                href={`/#${l.id}`}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
