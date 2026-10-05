import { profile } from "@/data/profile";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = `${profile.name} — ${profile.title}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Portfolio",
    title: profile.headline,
    subtitle: `${profile.yearsOfExperience} years building business applications and process automation in Cairo, Egypt.`,
    tags: ["Laravel", "PHP", "MySQL", "REST APIs", "Low-Code"],
  });
}
