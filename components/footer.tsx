import { Icon } from "@/components/icons";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}.
        </p>
        <div className="flex items-center gap-2">
          {[
            { href: profile.github, icon: "github" as const, label: "GitHub" },
            { href: profile.linkedin, icon: "linkedin" as const, label: "LinkedIn" },
            { href: `mailto:${profile.email}`, icon: "mail" as const, label: "Email" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.icon === "mail" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="rounded-xl p-2 transition hover:bg-white/5 hover:text-white"
            >
              <Icon name={s.icon} className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
