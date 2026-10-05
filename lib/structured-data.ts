import { experiences, profile, skillGroups, type Experience, type Project } from "@/data/profile";
import { absoluteUrl, site } from "@/lib/site";

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

function toIsoMonth(date: string) {
  const [month, year] = date.toLowerCase().split(" ");
  const index = MONTHS.indexOf(month);
  return index >= 0 && year ? `${year}-${String(index + 1).padStart(2, "0")}` : undefined;
}

const personId = absoluteUrl("/#person");
const websiteId = absoluteUrl("/#website");

export function personSchema() {
  const current = experiences.find((e) => e.end === "Present");
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    alternateName: profile.fullName,
    givenName: profile.firstName,
    familyName: "Attia",
    url: absoluteUrl("/"),
    image: absoluteUrl("/logo.jpg"),
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    jobTitle: profile.title,
    description: profile.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nasr City, Cairo",
      addressCountry: "EG",
    },
    ...(current && {
      worksFor: { "@type": "Organization", name: current.company },
    }),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.school,
    },
    hasCredential: profile.certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: `${c.full} (${c.name}) certification`,
      recognizedBy: { "@type": "Organization", name: c.full },
    })),
    knowsAbout: skillGroups.flatMap((g) => g.skills),
    knowsLanguage: profile.languages.map((l) => l.name),
    sameAs: [profile.linkedin, profile.github],
  };
}

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteUrl("/"),
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/#profilepage"),
        url: absoluteUrl("/"),
        name: site.title,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        inLanguage: "en",
      },
    ],
  };
}

function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectSchema(project: Project) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: project.name,
        headline: project.tagline,
        description: project.overview,
        url,
        image: absoluteUrl(`/projects/${project.slug}/opengraph-image`),
        keywords: project.tech.join(", "),
        genre: project.category,
        author: { "@id": personId, "@type": "Person", name: profile.name },
        creator: { "@id": personId },
        ...(project.links[0] && { sameAs: project.links.map((l) => l.href) }),
        ...(project.company && { sourceOrganization: { "@type": "Organization", name: project.company } }),
        isPartOf: { "@id": websiteId },
      },
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/#projects" },
        { name: project.name, path: `/projects/${project.slug}` },
      ]),
    ],
  };
}

export function experienceSchema(experience: Experience) {
  const url = absoluteUrl(`/experience/${experience.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${experience.role} at ${experience.company}`,
        description: experience.summary,
        isPartOf: { "@id": websiteId },
        about: {
          "@type": "OrganizationRole",
          roleName: experience.role,
          startDate: toIsoMonth(experience.start),
          ...(experience.end !== "Present" && { endDate: toIsoMonth(experience.end) }),
          member: { "@id": personId, "@type": "Person", name: profile.name },
          memberOf: { "@type": "Organization", name: experience.company },
        },
      },
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Experience", path: "/#experience" },
        { name: experience.company, path: `/experience/${experience.slug}` },
      ]),
    ],
  };
}
