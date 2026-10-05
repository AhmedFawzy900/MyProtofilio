import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: profile.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#05060f",
    theme_color: "#05060f",
    icons: [{ src: "/logo.jpg", sizes: "600x600", type: "image/jpeg", purpose: "any" }],
  };
}
