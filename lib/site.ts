import { profile } from "@/data/profile";

function resolveSiteUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);
  return (fromEnv ?? "http://localhost:3000").replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const site = {
  name: `${profile.name} — Portfolio`,
  title: `${profile.name} — ${profile.title} | Laravel & Low-Code Workflow Automation`,
  description:
    "Ahmed Attia is a Cairo-based software developer specializing in Laravel backend development, RESTful APIs, MySQL and low-code workflow automation. Explore his projects, experience and skills.",
  keywords: [
    profile.name,
    profile.fullName,
    "Ahmed Attia portfolio",
    "Software Developer",
    "Backend Developer",
    "Laravel Developer",
    "PHP Developer",
    "Low-Code Developer",
    "Workflow Automation",
    "RESTful APIs",
    "MySQL",
    "React.js",
    "Laravel Developer Egypt",
    "Backend Developer Cairo",
    "مطور Laravel",
    "مطور باك إند",
  ],
  locale: "en_US",
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bingVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
};
