import {
  experiences,
  getExperience,
  getProject,
  profile,
  projects,
  skillGroups,
  type Experience,
  type Project,
} from "@/data/profile";

export type ChatAction = { label: string; href: string; external?: boolean };
export type ChatReply = { text: string; actions?: ChatAction[]; suggestions?: string[] };
export type ChatContext = { lastProject?: string; lastExperience?: string };
type Lang = "en" | "ar";

const ARABIC = /[\u0600-\u06FF]/;

function normalize(input: string) {
  return input
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\p{L}\p{N}\s+#]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const matcherCache = new Map<string, (text: string) => boolean>();

function matcher(keyword: string) {
  const cached = matcherCache.get(keyword);
  if (cached) return cached;
  const k = normalize(keyword);
  let fn: (text: string) => boolean;
  if (ARABIC.test(k)) {
    if (k.length >= 4) {
      fn = (text) => text.includes(k);
    } else {
      const re = new RegExp(`(^|\\s)(و|ف|ب|ل|ك)?(ال)?${escapeRegex(k)}(ك|ه|ي|ها|كم|ات|ين)?(\\s|$)`);
      fn = (text) => re.test(text);
    }
  } else {
    const re = new RegExp(`(^|\\s)${escapeRegex(k)}(s|es)?(\\s|$)`);
    fn = (text) => re.test(text);
  }
  matcherCache.set(keyword, fn);
  return fn;
}

function score(text: string, keywords: string[]) {
  let total = 0;
  for (const kw of keywords) {
    if (matcher(kw)(text)) total += normalize(kw).split(" ").length;
  }
  return total;
}

type IntentId =
  | "greeting"
  | "thanks"
  | "bye"
  | "help"
  | "about"
  | "contact"
  | "hire"
  | "location"
  | "experience"
  | "current"
  | "skills"
  | "projects"
  | "education"
  | "certifications"
  | "languages"
  | "cv"
  | "social"
  | "salary"
  | "strengths"
  | "personal"
  | "more";

const intents: { id: IntentId; keywords: string[] }[] = [
  { id: "help", keywords: ["help", "what can you do", "what can i ask", "what do you know", "options", "ساعدني", "مساعده", "اسال عن ايه", "تعرف ايه"] },
  { id: "contact", keywords: ["contact", "email", "mail", "e mail", "phone", "number", "call", "whatsapp", "reach", "message", "تواصل", "ايميل", "بريد", "رقم", "تليفون", "موبايل", "واتس", "واتساب", "اكلمه", "اتواصل"] },
  { id: "hire", keywords: ["hire", "hiring", "available", "availability", "open to work", "freelance", "job offer", "opportunity", "recruit", "work with", "collaborate", "collaboration", "توظيف", "اوظف", "متاح", "فرصه", "يشتغل معانا", "عرض شغل", "فريلانس", "تعاون"] },
  { id: "experience", keywords: ["experience", "years", "work history", "career", "worked", "jobs", "companies", "employment", "previous", "خبره", "سنين", "سنوات", "اشتغل", "شركات", "الشغل", "وظايف", "وظائف"] },
  { id: "current", keywords: ["current", "currently", "now", "present", "today", "these days", "working at", "حاليا", "دلوقتي", "الحالي", "بيشتغل فين", "الان"] },
  { id: "skills", keywords: ["skills", "skill", "stack", "technologies", "tech", "tools", "programming", "expertise", "know", "frameworks", "backend", "frontend", "مهارات", "تقنيات", "لغات برمجه", "بيعرف", "برمجه", "تكنولوجي", "ادوات"] },
  { id: "projects", keywords: ["projects", "project", "portfolio", "built", "build", "apps", "websites", "examples", "work samples", "مشاريع", "مشروع", "اعمال", "شغله", "عمل ايه", "برامج"] },
  { id: "education", keywords: ["education", "degree", "university", "study", "studied", "graduate", "graduated", "college", "bachelor", "faculty", "تعليم", "جامعه", "دراسه", "درس", "اتخرج", "تخرج", "بكالوريوس", "كليه", "مؤهل"] },
  { id: "certifications", keywords: ["certificate", "certification", "certifications", "certified", "iti", "nti", "course", "courses", "training", "شهادات", "شهاده", "كورسات", "كورس", "دورات"] },
  { id: "languages", keywords: ["languages", "language", "english", "arabic", "speak", "speaks", "لغات", "لغه", "انجليزي", "عربي", "بيتكلم"] },
  { id: "cv", keywords: ["cv", "resume", "résumé", "download", "pdf", "السيره", "سي في", "الcv"] },
  { id: "social", keywords: ["github", "linkedin", "social", "profiles", "git hub", "لينكدان", "لينكد ان", "جيت هب", "جيتهب"] },
  { id: "salary", keywords: ["salary", "rate", "rates", "price", "pricing", "cost", "expected salary", "how much", "pay", "مرتب", "راتب", "سعر", "فلوس", "بكام", "تكلفه"] },
  { id: "strengths", keywords: ["why hire", "why should", "strength", "strengths", "good at", "special", "unique", "stand out", "value", "مميزات", "ليه اختار", "نقاط القوه", "مميز", "ليه"] },
  { id: "about", keywords: ["who", "about", "yourself", "himself", "introduce", "summary", "background", "profile", "bio", "tell me about ahmed", "مين", "من هو", "عرفني", "نبذه", "عن احمد", "اتكلم عن", "تعريف", "مين احمد"] },
  { id: "location", keywords: ["where", "location", "live", "lives", "based", "city", "country", "relocate", "remote", "address", "فين", "مكان", "يسكن", "ساكن", "عنوان", "منين", "بلد"] },
  { id: "personal", keywords: ["age", "old", "married", "religion", "birthday", "born", "hobbies", "hobby", "family", "عمره", "سنه كام", "متجوز", "هوايات", "هوايه", "عيلته"] },
  { id: "greeting", keywords: ["hi", "hello", "hey", "hiya", "yo", "good morning", "good evening", "good afternoon", "salam", "السلام", "اهلا", "مرحبا", "هاي", "هلو", "ازيك", "صباح الخير", "مساء الخير", "بالعربي", "كلمني بالعربي", "رد بالعربي"] },
  { id: "thanks", keywords: ["thanks", "thank you", "thx", "appreciate", "great", "awesome", "cool", "شكرا", "متشكر", "تسلم", "جميل", "حلو"] },
  { id: "bye", keywords: ["bye", "goodbye", "see you", "later", "مع السلامه", "باي", "سلام"] },
  { id: "more", keywords: ["more", "details", "detail", "elaborate", "tell me more", "explain", "اكتر", "تفاصيل", "كمان", "وضح", "زيادة"] },
];

type Tech = { name: string; aliases: string[]; needles: string[]; en: string; ar: string };

const knownTech: Tech[] = [
  { name: "Laravel", aliases: ["laravel", "لارافيل", "لارافل", "لارفل"], needles: ["laravel"], en: "Laravel is Ahmed's main backend framework — he builds both MVC applications and RESTful APIs with it.", ar: "Laravel هو الفريمورك الأساسي لأحمد في الباك إند — بيبني بيه تطبيقات MVC و RESTful APIs." },
  { name: "PHP", aliases: ["php", "بي اتش بي"], needles: ["php", "laravel"], en: "PHP is Ahmed's core backend language, used across all of his Laravel work.", ar: "PHP هي لغة الباك إند الأساسية لأحمد، وبيستخدمها في كل شغله على Laravel." },
  { name: "MySQL", aliases: ["mysql", "sql", "database", "databases", "db", "ماي اس كيو ال", "قواعد بيانات", "داتابيز", "قاعده بيانات"], needles: ["mysql"], en: "MySQL is Ahmed's database of choice — he handles schema design and data modeling for every backend he builds.", ar: "MySQL هي قاعدة البيانات الأساسية لأحمد — بيعمل تصميم الداتابيز والـ data modeling لكل مشروع." },
  { name: "React.js", aliases: ["react", "react js", "reactjs", "رياكت"], needles: ["react"], en: "Ahmed uses React.js on the frontend, consuming Laravel REST APIs.", ar: "أحمد بيستخدم React.js في الفرونت إند وبيربطه مع Laravel REST APIs." },
  { name: "JavaScript", aliases: ["javascript", "js", "جافاسكريبت", "جافا سكريبت"], needles: ["react", "javascript", "chart"], en: "Ahmed works with JavaScript on the frontend — React.js, AJAX, Axios and Chart.js.", ar: "أحمد بيشتغل بـ JavaScript في الفرونت إند — React.js و AJAX و Axios و Chart.js." },
  { name: "RESTful APIs", aliases: ["api", "apis", "rest", "restful", "rest api", "ابي اي", "واجهات برمجيه"], needles: ["rest", "api"], en: "Designing RESTful APIs is a core part of Ahmed's work — clean endpoints for frontends and mobile apps, secured with JWT / OAuth.", ar: "تصميم RESTful APIs جزء أساسي من شغل أحمد — endpoints نضيفة للفرونت والموبايل، ومؤمنة بـ JWT و OAuth." },
  { name: "JWT & OAuth", aliases: ["jwt", "oauth", "auth", "authentication", "security", "token", "مصادقه", "امان", "حمايه"], needles: [], en: "Ahmed implements authentication with JWT and OAuth, and treats security as a first-class concern in every API he builds.", ar: "أحمد بيعمل الـ authentication باستخدام JWT و OAuth، والأمان أولوية عنده في كل API." },
  { name: "AJAX & Axios", aliases: ["ajax", "axios"], needles: [], en: "Ahmed uses AJAX and Axios to connect frontends to backend APIs.", ar: "أحمد بيستخدم AJAX و Axios لربط الفرونت إند بالـ APIs." },
  { name: "Bootstrap & Material UI", aliases: ["bootstrap", "material ui", "mui", "material", "بوتستراب"], needles: ["bootstrap", "material"], en: "Ahmed builds responsive UIs with Bootstrap and Material UI.", ar: "أحمد بيعمل واجهات responsive باستخدام Bootstrap و Material UI." },
  { name: "Chart.js", aliases: ["chart js", "chartjs", "charts", "dashboards", "dashboard", "visualization", "داشبورد", "رسوم بيانيه"], needles: ["chart"], en: "Ahmed builds interactive dashboards and data visualizations with Chart.js.", ar: "أحمد بيعمل داشبوردات تفاعلية ورسوم بيانية باستخدام Chart.js." },
  { name: "Git", aliases: ["git", "version control", "composer", "جيت"], needles: [], en: "Ahmed uses Git & GitHub for version control and Composer for PHP dependency management.", ar: "أحمد بيستخدم Git و GitHub للـ version control و Composer لإدارة الـ packages في PHP." },
  { name: "Low-Code Workflow", aliases: ["low code", "lowcode", "workflow", "workflows", "automation", "bpm", "approval", "approvals", "process", "processes", "لو كود", "اتمته", "ورك فلو", "موافقات"], needles: ["low-code", "workflow"], en: "Low-code workflow automation is Ahmed's current focus at Archirodon Group: process maps, forms, approval routes, business rules and integrations — designed, released and supported in production.", ar: "أتمتة الـ workflows بالـ Low-Code هي تركيز أحمد الحالي في Archirodon: process maps وفورمز ومسارات موافقات وbusiness rules وتكاملات — من التصميم لحد الدعم في البرودكشن." },
  { name: "AI Integration", aliases: ["ai", "artificial intelligence", "openai", "gpt", "llm", "ذكاء اصطناعي", "الذكاء"], needles: ["ai integration"], en: "Ahmed integrated AI into the Remedies App admin dashboard to generate remedy content, speeding up content creation for admins.", ar: "أحمد دمج الذكاء الاصطناعي في داشبورد Remedies App لتوليد المحتوى، وده سرّع شغل الأدمنز." },
];

const unknownTech: { name: string; aliases: string[] }[] = [
  { name: "Python", aliases: ["python", "بايثون"] },
  { name: "Django", aliases: ["django"] },
  { name: "Node.js", aliases: ["node", "node js", "nodejs", "express", "نود"] },
  { name: "Java", aliases: ["java", "spring", "جافا"] },
  { name: ".NET / C#", aliases: ["net", "dotnet", "c#", "csharp", "asp"] },
  { name: "Angular", aliases: ["angular"] },
  { name: "Vue.js", aliases: ["vue", "vuejs", "nuxt"] },
  { name: "Next.js", aliases: ["next js", "nextjs"] },
  { name: "TypeScript", aliases: ["typescript", "ts"] },
  { name: "Docker", aliases: ["docker", "kubernetes", "k8s", "دوكر"] },
  { name: "AWS / Cloud", aliases: ["aws", "azure", "gcp", "cloud"] },
  { name: "MongoDB", aliases: ["mongodb", "mongo", "nosql"] },
  { name: "PostgreSQL", aliases: ["postgres", "postgresql"] },
  { name: "Redis", aliases: ["redis"] },
  { name: "Flutter", aliases: ["flutter", "dart", "فلاتر"] },
  { name: "Go", aliases: ["golang"] },
  { name: "Ruby", aliases: ["ruby", "rails"] },
];

const categoryAr: Record<Project["category"], string> = {
  Production: "مشروع بروداكشن",
  "Side Project": "مشروع جانبي",
  Freelance: "مشروع فريلانس",
  Graduation: "مشروع التخرج",
};

function projectAction(p: Project, lang: Lang): ChatAction {
  return { label: lang === "ar" ? `تفاصيل ${p.name}` : `Open ${p.name}`, href: `/projects/${p.slug}` };
}

function experienceAction(e: Experience, lang: Lang): ChatAction {
  return { label: lang === "ar" ? `تفاصيل ${e.company}` : `Open ${e.company}`, href: `/experience/${e.slug}` };
}

function contactActions(lang: Lang): ChatAction[] {
  return [
    { label: lang === "ar" ? "ابعت إيميل" : "Send an email", href: `mailto:${profile.email}`, external: true },
    { label: "LinkedIn", href: profile.linkedin, external: true },
  ];
}

const S = {
  en: {
    skills: "What are his skills?",
    projects: "Show me his projects",
    experience: "What's his experience?",
    contact: "How can I contact him?",
    current: "Where does he work now?",
    education: "Where did he study?",
    laravel: "Does he know Laravel?",
    why: "Why should I hire Ahmed?",
    cv: "Download his CV",
    more: "Tell me more",
  },
  ar: {
    skills: "إيه مهاراته؟",
    projects: "وريني مشاريعه",
    experience: "خبرته إيه؟",
    contact: "أتواصل معاه إزاي؟",
    current: "بيشتغل فين دلوقتي؟",
    education: "درس فين؟",
    laravel: "بيعرف Laravel؟",
    why: "ليه أختار أحمد؟",
    cv: "حمّل الـ CV",
    more: "تفاصيل أكتر",
  },
};

function projectReply(p: Project, lang: Lang): ChatReply {
  const external = p.links.map((l) => ({ label: l.label, href: l.href, external: true }));
  if (lang === "ar") {
    return {
      text: `**${p.name}** — ${p.taglineAr}\n\n• النوع: ${categoryAr[p.category]}${p.company ? `\n• اتعمل في: ${p.company}` : ""}\n• التقنيات: ${p.tech.join("، ")}\n\nتقدر تشوف كل التفاصيل في صفحة المشروع.`,
      actions: [projectAction(p, lang), ...external],
      suggestions: [S.ar.more, S.ar.projects, S.ar.contact],
    };
  }
  return {
    text: `**${p.name}** — ${p.tagline}\n\n${p.overview}\n\n• Type: ${p.category}${p.company ? `\n• Built at: ${p.company}` : ""}\n• Tech: ${p.tech.join(", ")}`,
    actions: [projectAction(p, lang), ...external],
    suggestions: [S.en.more, S.en.projects, S.en.contact],
  };
}

function projectDeepReply(p: Project, lang: Lang): ChatReply {
  const head = lang === "ar" ? `**${p.name}** — المميزات:` : `**${p.name}** — key features:`;
  const roleHead = lang === "ar" ? "**دور أحمد:**" : "**Ahmed's role:**";
  return {
    text: `${head}\n${p.features.map((f) => `• ${f}`).join("\n")}\n\n${roleHead}\n${p.role.map((r) => `• ${r}`).join("\n")}`,
    actions: [projectAction(p, lang), ...p.links.map((l) => ({ label: l.label, href: l.href, external: true }))],
    suggestions: lang === "ar" ? [S.ar.projects, S.ar.contact] : [S.en.projects, S.en.contact],
  };
}

function experienceReply(e: Experience, lang: Lang): ChatReply {
  const related = projects.filter((p) => p.experienceSlug === e.slug);
  if (lang === "ar") {
    return {
      text: `**${e.role}** في **${e.company}**\n${e.start} – ${e.end === "Present" ? "حتى الآن" : e.end} · ${e.location}\n\n${e.summaryAr}${related.length ? `\n\nمشاريع من الفترة دي: ${related.map((p) => p.name).join("، ")}` : ""}`,
      actions: [experienceAction(e, lang), ...related.slice(0, 2).map((p) => projectAction(p, lang))],
      suggestions: [S.ar.more, S.ar.experience, S.ar.skills],
    };
  }
  return {
    text: `**${e.role}** at **${e.company}**\n${e.start} – ${e.end} · ${e.location}\n\n${e.summary}${related.length ? `\n\nProjects from this role: ${related.map((p) => p.name).join(", ")}` : ""}`,
    actions: [experienceAction(e, lang), ...related.slice(0, 2).map((p) => projectAction(p, lang))],
    suggestions: [S.en.more, S.en.experience, S.en.skills],
  };
}

function experienceDeepReply(e: Experience, lang: Lang): ChatReply {
  return {
    text: `**${e.company}** — ${lang === "ar" ? "أهم المسؤوليات:" : "highlights:"}\n${e.highlights.map((h) => `• ${h}`).join("\n")}`,
    actions: [experienceAction(e, lang)],
    suggestions: lang === "ar" ? [S.ar.experience, S.ar.projects] : [S.en.experience, S.en.projects],
  };
}

function techReply(t: Tech, lang: Lang): ChatReply {
  const used = t.needles.length
    ? projects.filter((p) => p.tech.some((x) => t.needles.some((n) => x.toLowerCase().includes(n))))
    : [];
  const inRoles = t.needles.length
    ? experiences.filter((e) => e.tech.some((x) => t.needles.some((n) => x.toLowerCase().includes(n))))
    : [];
  const lines: string[] = [lang === "ar" ? `**أيوه ✓ ${t.name}**` : `**Yes ✓ ${t.name}**`, "", lang === "ar" ? t.ar : t.en];
  if (inRoles.length) {
    lines.push("", lang === "ar" ? `استخدمه في: ${inRoles.map((e) => e.company).join("، ")}` : `Used at: ${inRoles.map((e) => e.company).join(", ")}`);
  }
  if (used.length) {
    lines.push(lang === "ar" ? `مشاريع: ${used.map((p) => p.name).join("، ")}` : `Projects: ${used.map((p) => p.name).join(", ")}`);
  }
  return {
    text: lines.join("\n"),
    actions: used.slice(0, 3).map((p) => projectAction(p, lang)),
    suggestions: lang === "ar" ? [S.ar.skills, S.ar.projects, S.ar.why] : [S.en.skills, S.en.projects, S.en.why],
  };
}

function unknownTechReply(name: string, lang: Lang): ChatReply {
  if (lang === "ar") {
    return {
      text: `**${name}** مش مذكور في الـ CV بتاع أحمد.\n\nالـ stack الأساسي عنده: PHP و Laravel و MySQL و RESTful APIs، ومعاهم React.js في الفرونت، وحاليًا أتمتة الـ workflows بالـ Low-Code.\n\nلو المشروع محتاج ${name}، الأفضل تتواصل معاه مباشرة وتتكلموا.`,
      actions: contactActions(lang),
      suggestions: [S.ar.skills, S.ar.contact],
    };
  }
  return {
    text: `**${name}** isn't listed on Ahmed's CV.\n\nHis core stack is PHP, Laravel, MySQL and RESTful APIs, with React.js on the frontend — and low-code workflow automation in his current role.\n\nIf your project needs ${name}, it's best to reach out to him directly and discuss it.`,
    actions: contactActions(lang),
    suggestions: [S.en.skills, S.en.contact],
  };
}

function intentReply(id: IntentId, lang: Lang): ChatReply {
  const ar = lang === "ar";
  const s = S[lang];
  const liveProjects = projects.filter((p) => p.live);
  switch (id) {
    case "greeting":
      return {
        text: ar
          ? `أهلاً بيك! 👋 أنا المساعد الذكي بتاع **${profile.name}**.\nاسألني أي حاجة عن خبرته أو مهاراته أو مشاريعه أو إزاي تتواصل معاه.`
          : `Hey there! 👋 I'm **${profile.firstName}'s** portfolio assistant.\nAsk me anything about his experience, skills, projects, education or how to reach him.`,
        suggestions: [s.experience, s.projects, s.skills, s.contact],
      };
    case "thanks":
      return {
        text: ar ? "العفو! 😊 لو عندك أي سؤال تاني أنا موجود." : "You're welcome! 😊 Anything else you'd like to know about Ahmed?",
        suggestions: [s.why, s.contact, s.cv],
      };
    case "bye":
      return {
        text: ar ? "مع السلامة! 👋 متنساش تتواصل مع أحمد لو حابب تشتغلوا سوا." : "Goodbye! 👋 Don't hesitate to reach out to Ahmed if you'd like to work together.",
        actions: contactActions(lang),
      };
    case "help":
      return {
        text: ar
          ? "تقدر تسألني عن:\n• نبذة عن أحمد\n• خبرته والشركات اللي اشتغل فيها\n• مهاراته والتقنيات (مثلاً: بيعرف React؟)\n• أي مشروع بالاسم (مثلاً: ChairLocation)\n• التعليم والشهادات واللغات\n• التواصل وتحميل الـ CV"
          : "You can ask me about:\n• Who Ahmed is\n• His experience & companies\n• His skills — e.g. \"Does he know React?\"\n• Any project by name — e.g. \"Tell me about ChairLocation\"\n• Education, certifications & languages\n• Contact info & his CV",
        suggestions: [s.experience, s.projects, s.laravel, s.contact],
      };
    case "about":
      return {
        text: ar
          ? `**${profile.name}** — مطوّر برمجيات من القاهرة، متخصص في **الباك إند (Laravel)** و **أتمتة الـ Workflows بالـ Low-Code**.\n\nعنده ${profile.yearsOfExperience} سنين خبرة في بناء تطبيقات أعمال وأتمتة العمليات. حاليًا بيشتغل ${profile.currentRole} في **${profile.currentCompany}**، وعنده أساس قوي في PHP و Laravel و MySQL و RESTful APIs. حاصل على شهادات من ITI و NTI.`
          : `**${profile.name}** is a Cairo-based software developer specializing in **backend development (Laravel)** and **low-code workflow automation**.\n\nHe has ${profile.yearsOfExperience} years of experience delivering business applications and process automation. He currently works as a ${profile.currentRole} at **${profile.currentCompany}**, building on a strong foundation in PHP, Laravel, MySQL and RESTful APIs. He's certified by ITI and NTI.`,
        actions: [{ label: ar ? "اقرأ أكتر" : "Read more", href: "/#about" }],
        suggestions: [s.experience, s.projects, s.why],
      };
    case "contact":
      return {
        text: ar
          ? `تقدر تتواصل مع أحمد عن طريق:\n• الإيميل: ${profile.email}\n• الموبايل / واتساب: ${profile.phoneDisplay}\n• LinkedIn و GitHub من الأزرار تحت\n\n📍 ${profile.location}`
          : `You can reach Ahmed via:\n• Email: ${profile.email}\n• Phone / WhatsApp: ${profile.phoneDisplay}\n• LinkedIn & GitHub — links below\n\n📍 ${profile.location}`,
        actions: [
          ...contactActions(lang),
          { label: "WhatsApp", href: `https://wa.me/${profile.phone.replace(/\D/g, "")}`, external: true },
          { label: "GitHub", href: profile.github, external: true },
        ],
        suggestions: [s.cv, s.why],
      };
    case "hire":
      return {
        text: ar
          ? `أحمد حاليًا شغال ${profile.currentRole} في **${profile.currentCompany}**.\n\nلو عندك فرصة شغل أو مشروع أو تعاون، أفضل طريقة إنك تكلمه مباشرة على ${profile.email} أو ${profile.phoneDisplay} — وهو هيرد عليك بالتفاصيل.`
          : `Ahmed currently works as a ${profile.currentRole} at **${profile.currentCompany}**.\n\nFor job opportunities, projects or collaboration, the best way is to reach him directly at ${profile.email} or ${profile.phoneDisplay} — he'll get back to you with the details.`,
        actions: contactActions(lang),
        suggestions: [s.why, s.cv],
      };
    case "location":
      return {
        text: ar
          ? `أحمد عايش في **${profile.location}** 📍\nشغله الحالي في New Cairo مع ${profile.currentCompany}.`
          : `Ahmed is based in **${profile.location}** 📍\nHis current role is in New Cairo with ${profile.currentCompany}.`,
        suggestions: [s.current, s.contact],
      };
    case "experience":
      return {
        text: ar
          ? `أحمد عنده **${profile.yearsOfExperience} سنين خبرة** في ${experiences.length} أماكن:\n${experiences.map((e) => `• **${e.company}** — ${e.role} (${e.start} – ${e.end === "Present" ? "حتى الآن" : e.end})`).join("\n")}`
          : `Ahmed has **${profile.yearsOfExperience} years of experience** across ${experiences.length} roles:\n${experiences.map((e) => `• **${e.company}** — ${e.role} (${e.start} – ${e.end})`).join("\n")}`,
        actions: experiences.slice(0, 2).map((e) => experienceAction(e, lang)),
        suggestions: [s.current, s.projects, s.skills],
      };
    case "current": {
      const e = experiences[0];
      return experienceReply(e, lang);
    }
    case "skills":
      return {
        text: `${ar ? "**مهارات أحمد التقنية:**" : "**Ahmed's technical skills:**"}\n${skillGroups.map((g) => `• **${g.title}:** ${g.skills.join(", ")}`).join("\n")}`,
        actions: [{ label: ar ? "شوف المهارات" : "View skills", href: "/#skills" }],
        suggestions: [s.laravel, s.projects, s.why],
      };
    case "projects":
      return {
        text: ar
          ? `أحمد اشتغل على **${projects.length} مشروع** — منهم ${liveProjects.length} لايف:\n${projects.map((p) => `• **${p.name}** — ${p.taglineAr}`).join("\n")}\n\nاسألني عن أي مشروع بالاسم!`
          : `Ahmed has worked on **${projects.length} projects** — ${liveProjects.length} of them live:\n${projects.map((p) => `• **${p.name}** — ${p.tagline}`).join("\n")}\n\nAsk me about any of them by name!`,
        actions: [{ label: ar ? "كل المشاريع" : "Browse all projects", href: "/#projects" }, ...liveProjects.slice(0, 2).map((p) => projectAction(p, lang))],
        suggestions: ar ? ["احكيلي عن ChairLocation", "إيه هو Tadawy؟", "مشروع ABC Juice"] : ["Tell me about ChairLocation", "What is Tadawy?", "Tell me about ABC Juice"],
      };
    case "education":
      return {
        text: ar
          ? `🎓 **${profile.education.degree}** (بكالوريوس علوم الحاسب)\n${profile.education.school} — ${profile.education.location}\n${profile.education.period}\n\nمشروع التخرج: **Tadawy** — نظام لإدارة التبرع بالدم.`
          : `🎓 **${profile.education.degree}**\n${profile.education.school} — ${profile.education.location}\n${profile.education.period}\n\nGraduation project: **Tadawy** — a blood donation management system.`,
        actions: [{ label: ar ? "مشروع Tadawy" : "Open Tadawy", href: "/projects/tadawy" }],
        suggestions: [s.experience, ar ? "عنده شهادات؟" : "Any certifications?"],
      };
    case "certifications":
      return {
        text: ar
          ? `أحمد حاصل على شهادات من:\n${profile.certifications.map((c) => `• **${c.name}** — ${c.full}`).join("\n")}`
          : `Ahmed is certified by:\n${profile.certifications.map((c) => `• **${c.name}** — ${c.full}`).join("\n")}`,
        suggestions: [s.education, s.skills],
      };
    case "languages":
      return {
        text: ar
          ? "اللغات اللي بيتكلمها أحمد:\n• **العربية** — اللغة الأم\n• **الإنجليزية** — مستوى احترافي في العمل"
          : `Languages Ahmed speaks:\n${profile.languages.map((l) => `• **${l.name}** — ${l.level}`).join("\n")}`,
        suggestions: [s.education, s.contact],
      };
    case "cv":
      return {
        text: ar ? "اتفضل، تقدر تحمّل الـ CV بتاع أحمد بصيغة PDF من الزرار تحت 📄" : "Here you go — you can download Ahmed's CV as a PDF below 📄",
        actions: [{ label: ar ? "تحميل الـ CV" : "Download CV (PDF)", href: profile.cv, external: true }],
        suggestions: [s.contact, s.why],
      };
    case "social":
      return {
        text: ar ? "حسابات أحمد:" : "Ahmed's profiles:",
        actions: [
          { label: "GitHub", href: profile.github, external: true },
          { label: "LinkedIn", href: profile.linkedin, external: true },
        ],
        suggestions: [s.projects, s.contact],
      };
    case "salary":
      return {
        text: ar
          ? "موضوع المرتب أو التسعير بيتحدد حسب المشروع أو الدور، وأحمد بيفضّل يتكلم فيه مباشرة. تقدر تتواصل معاه وتتفقوا على التفاصيل."
          : "Compensation depends on the role or project scope, and Ahmed prefers to discuss it directly. Feel free to reach out to him to talk details.",
        actions: contactActions(lang),
        suggestions: [s.why, s.cv],
      };
    case "strengths":
      return {
        text: ar
          ? "ليه أحمد؟\n• **خبرة عملية:** " + profile.yearsOfExperience + " سنين بيسلّم تطبيقات أعمال حقيقية — CRM ومحاسبة وحجوزات وعقارات وتجارة إلكترونية.\n• **مشاريع لايف:** ChairLocation و Amtalek و ABC Juice و Remedies App شغالين فعلًا.\n• **باك إند قوي:** Laravel و MySQL و RESTful APIs مع JWT و OAuth.\n• **فاهم البيزنس:** بيحوّل متطلبات أصحاب المصلحة لـ workflows و business rules.\n• **Full-stack لما يلزم:** React.js و Chart.js للداشبوردات.\n• **معتمد:** من ITI و NTI."
          : `Why Ahmed?\n• **Proven delivery:** ${profile.yearsOfExperience} years shipping real business apps — CRM, accounting, booking, real estate and e-commerce.\n• **Live products:** ChairLocation, Amtalek, ABC Juice and the Remedies App are all in production.\n• **Solid backend:** Laravel, MySQL and RESTful APIs secured with JWT & OAuth.\n• **Business-minded:** turns stakeholder requirements into workflows, forms and business rules.\n• **Full-stack when needed:** React.js and Chart.js dashboards.\n• **Certified** by ITI and NTI.`,
        actions: contactActions(lang),
        suggestions: [s.projects, s.cv],
      };
    case "personal":
      return {
        text: ar
          ? "معنديش معلومات عن الحاجات الشخصية دي 🙂 أنا أعرف بس الملف المهني لأحمد — خبرته ومهاراته ومشاريعه."
          : "I don't have info on personal details like that 🙂 I only know about Ahmed's professional profile — his experience, skills and projects.",
        suggestions: [s.experience, s.skills, s.contact],
      };
    case "more":
      return fallback(lang);
  }
}

function fallback(lang: Lang): ChatReply {
  const s = S[lang];
  return {
    text:
      lang === "ar"
        ? "مش متأكد إني فاهم السؤال 🤔 جرّب تسألني عن خبرة أحمد أو مهاراته أو أي مشروع بالاسم — أو تواصل معاه مباشرة."
        : "Hmm, I'm not sure I got that 🤔 Try asking about Ahmed's experience, skills or any project by name — or reach out to him directly.",
    actions: contactActions(lang),
    suggestions: [s.experience, s.projects, s.skills, s.contact],
  };
}

function findBest<T>(text: string, items: T[], keywordsOf: (item: T) => string[]) {
  let best: T | undefined;
  let bestScore = 0;
  for (const item of items) {
    const sc = score(text, keywordsOf(item));
    if (sc > bestScore) {
      best = item;
      bestScore = sc;
    }
  }
  return best;
}

export function answer(question: string, context: ChatContext = {}): { reply: ChatReply; context: ChatContext } {
  const lang: Lang = ARABIC.test(question) ? "ar" : "en";
  const text = normalize(question);
  if (!text) return { reply: fallback(lang), context };

  const ranked = intents
    .map((i) => ({ id: i.id, score: score(text, i.keywords) }))
    .filter((i) => i.score > 0)
    .sort((a, b) => b.score - a.score);
  const top = ranked[0]?.id;

  if (top && (["salary", "contact", "cv", "social", "personal"] as IntentId[]).includes(top)) {
    return { reply: intentReply(top, lang), context: {} };
  }

  const project = findBest(text, projects, (p) => [p.name, ...p.keywords]);
  const experience = findBest(text, experiences, (e) => [e.company, ...e.keywords]);

  if (project) return { reply: projectReply(project, lang), context: { lastProject: project.slug } };
  if (experience) return { reply: experienceReply(experience, lang), context: { lastExperience: experience.slug } };

  if (top === "more" || (ranked.length === 0 && text.split(" ").length <= 3)) {
    const lastP = context.lastProject && getProject(context.lastProject);
    if (lastP) return { reply: projectDeepReply(lastP, lang), context };
    const lastE = context.lastExperience && getExperience(context.lastExperience);
    if (lastE) return { reply: experienceDeepReply(lastE, lang), context };
  }

  const directIntents: IntentId[] = ["contact", "cv", "social", "salary", "languages", "education", "certifications"];
  if (!top || !directIntents.includes(top)) {
    const tech = findBest(text, knownTech, (t) => t.aliases);
    if (tech) return { reply: techReply(tech, lang), context: {} };
    const unknown = findBest(text, unknownTech, (t) => t.aliases);
    if (unknown) return { reply: unknownTechReply(unknown.name, lang), context: {} };
  }

  if (top === "current") return { reply: experienceReply(experiences[0], lang), context: { lastExperience: experiences[0].slug } };
  if (top === "languages" && ranked.some((r) => r.id === "skills") && /programming|برمجه/.test(text)) {
    return { reply: intentReply("skills", lang), context: {} };
  }
  if (top) return { reply: intentReply(top, lang), context: {} };

  return { reply: fallback(lang), context: {} };
}