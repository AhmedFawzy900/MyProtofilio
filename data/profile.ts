export type LinkItem = { label: string; href: string };

export type ProjectCategory = "Production" | "Freelance" | "Side Project" | "Graduation";

export type Project = {
  slug: string;
  live?: boolean;
  name: string;
  tagline: string;
  taglineAr: string;
  category: ProjectCategory;
  company?: string;
  experienceSlug?: string;
  year: string;
  tech: string[];
  overview: string;
  features: string[];
  role: string[];
  links: LinkItem[];
  accent: [string, string];
  keywords: string[];
};

export type Experience = {
  slug: string;
  role: string;
  company: string;
  type: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  summaryAr: string;
  highlights: string[];
  tech: string[];
  accent: [string, string];
  keywords: string[];
};

export type SkillGroup = {
  title: string;
  icon: "workflow" | "server" | "layout" | "database" | "tool";
  skills: string[];
};

export const profile = {
  name: "Ahmed Fawzy Attia",
  firstName: "Ahmed",
  initials: "AF",
  title: "Software Developer",
  headline: "Backend (Laravel) & Low-Code Workflow Automation",
  location: "Nasr City, Cairo, Egypt",
  email: "ahmedfawzy69513@gmail.com",
  phone: "+201092127269",
  phoneDisplay: "+20 109 212 7269",
  linkedin: "https://linkedin.com/in/ahmed-attia-95bb83232",
  github: "https://github.com/ahmedfawzy900",
  cv: "/Ahmed_Fawzy_Attia_CV.pdf",
  yearsOfExperience: 3,
  currentRole: "Software Developer (Low-Code Workflow)",
  currentCompany: "Archirodon Group N.V.",
  summary:
    "Software Developer with 3 years of experience delivering business applications and process automation. Currently designing and deploying low-code workflow processes at Archirodon Group N.V., building on a strong backend foundation in PHP, Laravel, and MySQL. Experienced in RESTful APIs, authentication, and database design, with a track record of turning business requirements into reliable, secure, and maintainable solutions.",
  about: [
    "I'm a software developer based in Cairo who loves turning messy business requirements into clean, reliable systems. My roots are in backend engineering — PHP, Laravel and MySQL — where I've built CRMs, accounting tools, booking platforms, real-estate portals and e-commerce backends.",
    "Today I design and ship low-code workflow processes at Archirodon Group N.V., a global marine construction and engineering group: mapping processes, building forms and approval routes, wiring business rules, and supporting them in production.",
    "I care about security, maintainability and the people who actually use what I build.",
  ],
  certifications: [
    { name: "ITI", full: "Information Technology Institute", note: "Certified" },
    { name: "NTI", full: "National Telecommunication Institute", note: "Certified" },
  ],
  education: {
    degree: "Bachelor of Computer Science",
    school: "Menofia University",
    location: "Menofia, Egypt",
    period: "2020 – 2024",
    project: "Tadawy – Blood Donation Management System",
    projectSlug: "tadawy",
  },
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional Working Proficiency" },
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Low-Code & Workflow",
    icon: "workflow",
    skills: [
      "Business Process Design",
      "Workflow Automation",
      "Forms & Approval Routing",
      "Business Rules",
      "Process Maintenance & Support",
    ],
  },
  {
    title: "Backend",
    icon: "server",
    skills: ["PHP", "Laravel (MVC & API)", "RESTful APIs", "JWT Auth", "OAuth", "JSON"],
  },
  {
    title: "Frontend",
    icon: "layout",
    skills: ["React.js", "JavaScript", "AJAX", "Axios", "Bootstrap", "Material UI", "Chart.js"],
  },
  {
    title: "Database",
    icon: "database",
    skills: ["MySQL", "Database Design"],
  },
  {
    title: "Tools",
    icon: "tool",
    skills: ["Git", "GitHub", "Composer"],
  },
];

export const techMarquee = [
  "PHP",
  "Laravel",
  "MySQL",
  "REST APIs",
  "JWT",
  "OAuth",
  "React.js",
  "JavaScript",
  "Axios",
  "Bootstrap",
  "Material UI",
  "Chart.js",
  "Git",
  "GitHub",
  "Composer",
  "Low-Code",
  "Workflow Automation",
];

export const experiences: Experience[] = [
  {
    slug: "archirodon",
    role: "Software Developer (Low-Code Workflow)",
    company: "Archirodon Group N.V.",
    type: "Full-time",
    location: "New Cairo, Cairo, Egypt",
    start: "October 2025",
    end: "Present",
    summary:
      "Designing, building and deploying business workflow processes on a low-code workflow management system that supports a global marine construction and engineering group.",
    highlights: [
      "Design, build, and deploy business workflow processes on a low-code workflow management system supporting a global marine construction and engineering group.",
      "Translate requirements from business stakeholders into process maps, forms, approval routes, and business rules.",
      "Configure forms, data fields, and integration logic to connect processes with business data.",
      "Test, release, and support live processes; troubleshoot issues and deliver enhancements based on user feedback.",
    ],
    tech: ["Low-Code Platform", "Workflow Automation", "Process Mapping", "Forms", "Approval Routing", "Integrations"],
    accent: ["#22d3ee", "#6366f1"],
    summaryAr:
      "بيصمم ويبني وينشر workflows للأعمال على منصة Low-Code لإدارة العمليات، لخدمة مجموعة عالمية في مجال الإنشاءات البحرية والهندسة.",
    keywords: ["archirodon", "low code", "lowcode", "workflow", "اركيرودون", "ارشيرودون"],
  },
  {
    slug: "e-ramo",
    role: "Backend Developer",
    company: "e-RAMO for Digital Solutions",
    type: "Full-time",
    location: "Nasr City, Cairo, Egypt",
    start: "October 2024",
    end: "September 2025",
    summary:
      "Developed and maintained scalable server-side applications for CRM, accounting, booking and real-estate systems using Laravel and MySQL.",
    highlights: [
      "Developed and maintained scalable server-side applications for CRM, accounting, booking, and real estate systems using Laravel and MySQL.",
      "CRM System: lead, deal, and task management with progress tracking to keep deals on schedule.",
      "Accounting System: income, expense, and employee salary management with detailed financial reports for decision-making.",
      "ChairLocation (chairlocation.com): booking of workspace chairs, offices and desks, with order statuses and membership packages backed by a points-based rewards system.",
      "Amtalek (amtalek.com): property listings, search and filtering, and handling of user inquiries and booking requests.",
      "Collaborated with cross-functional teams to deliver high-quality software solutions.",
    ],
    tech: ["PHP", "Laravel", "MySQL", "RESTful APIs", "Git"],
    accent: ["#a855f7", "#ec4899"],
    summaryAr:
      "طوّر وصان تطبيقات باك إند قابلة للتوسع لأنظمة CRM ومحاسبة وحجوزات وعقارات باستخدام Laravel و MySQL.",
    keywords: ["eramo", "e-ramo", "e ramo", "ايرامو", "اي رامو"],
  },
  {
    slug: "money-leek",
    role: "Backend Developer",
    company: "Money Leek",
    type: "Freelance",
    location: "Tanta, Gharbia, Egypt",
    start: "August 2024",
    end: "October 2024",
    summary:
      "Built and maintained Laravel + MySQL backends and designed RESTful APIs for frontend integration, with a focus on security and performance.",
    highlights: [
      "Developed and maintained backend systems with Laravel and MySQL, and designed RESTful APIs for frontend integration.",
      "Ensured security and performance through robust coding practices and regular testing.",
      "Hanakol Eah: food delivery website built with Laravel MVC and MySQL.",
      "Monza Car: car rental website built with Laravel MVC and MySQL.",
    ],
    tech: ["PHP", "Laravel MVC", "MySQL", "RESTful APIs"],
    accent: ["#f59e0b", "#ef4444"],
    summaryAr:
      "بنى وصان أنظمة باك إند بـ Laravel و MySQL وصمم RESTful APIs للربط مع الفرونت إند، مع التركيز على الأمان والأداء.",
    keywords: ["money leek", "moneyleek", "موني ليك"],
  },
  {
    slug: "al-noras",
    role: "Backend Developer Intern",
    company: "Al-Noras Company",
    type: "Internship",
    location: "Digital Marketing & Information Technology",
    start: "February 2024",
    end: "April 2024",
    summary:
      "Developed RESTful APIs with Laravel for multiple client projects, integrating databases and server-side logic.",
    highlights: [
      "Developed RESTful APIs with Laravel for multiple client projects, integrating databases and server-side logic.",
      "Scientific Journal: journal platform for the Faculty of Science built with React.js, a Laravel API and MySQL.",
    ],
    tech: ["Laravel API", "React.js", "MySQL", "RESTful APIs"],
    accent: ["#10b981", "#22d3ee"],
    summaryAr: "طوّر RESTful APIs بـ Laravel لعدة مشاريع عملاء، مع ربط قواعد البيانات والـ server-side logic.",
    keywords: ["al noras", "alnoras", "noras", "intern", "internship", "النورس", "انترن", "تدريب عملي"],
  },
];

export const projects: Project[] = [
  {
    slug: "chairlocation",
    live: true,
    name: "ChairLocation",
    tagline: "Workspace booking platform with memberships & rewards",
    taglineAr: "منصة حجز مساحات عمل مع باقات عضوية ونظام نقاط ومكافآت",
    category: "Production",
    company: "e-RAMO for Digital Solutions",
    experienceSlug: "e-ramo",
    year: "2024 – 2025",
    tech: ["Laravel", "PHP", "MySQL", "RESTful APIs"],
    overview:
      "A live booking system where users reserve workspace chairs, private offices and desks. The backend powers bookings, order lifecycles and a membership program with a points-based rewards system.",
    features: [
      "Booking of workspace chairs, offices and desks",
      "Order statuses to track every booking end-to-end",
      "Membership packages for recurring customers",
      "Points-based rewards system tied to memberships",
    ],
    role: [
      "Built and maintained the Laravel + MySQL backend",
      "Modeled bookings, orders, memberships and points in the database",
      "Exposed RESTful APIs consumed by the frontend",
    ],
    links: [{ label: "Visit chairlocation.com", href: "https://chairlocation.com/en" }],
    accent: ["#6366f1", "#22d3ee"],
    keywords: ["chairlocation", "chair location", "chair", "booking", "workspace", "coworking", "حجز", "شير لوكيشن"],
  },
  {
    slug: "amtalek",
    live: true,
    name: "Amtalek",
    tagline: "Real-estate portal with search, filters & inquiries",
    taglineAr: "بوابة عقارات مع بحث وفلترة واستفسارات وطلبات حجز",
    category: "Production",
    company: "e-RAMO for Digital Solutions",
    experienceSlug: "e-ramo",
    year: "2024 – 2025",
    tech: ["Laravel", "PHP", "MySQL", "RESTful APIs"],
    overview:
      "A live real-estate platform for listing and discovering properties. The backend manages listings with location, price and features, powers search and filtering, and handles user inquiries and booking requests.",
    features: [
      "Property listings with location, price and features",
      "Search and multi-criteria filtering",
      "User inquiries and booking requests",
    ],
    role: [
      "Developed the server-side logic with Laravel and MySQL",
      "Designed the data model for properties and their attributes",
      "Built endpoints for search, filtering and inquiry handling",
    ],
    links: [{ label: "Visit amtalek.com", href: "https://www.amtalek.com/en" }],
    accent: ["#0ea5e9", "#10b981"],
    keywords: ["amtalek", "real estate", "realestate", "property", "properties", "عقارات", "امتلك", "عقار"],
  },
  {
    slug: "crm-system",
    name: "CRM System",
    tagline: "Leads, deals and tasks — with progress tracking",
    taglineAr: "إدارة العملاء المحتملين والصفقات والمهام مع متابعة التقدم",
    category: "Production",
    company: "e-RAMO for Digital Solutions",
    experienceSlug: "e-ramo",
    year: "2024 – 2025",
    tech: ["Laravel", "PHP", "MySQL"],
    overview:
      "A customer relationship management system that helps sales teams manage leads, deals and tasks, with progress tracking to keep every deal on schedule.",
    features: ["Lead management", "Deal pipeline management", "Task management", "Progress tracking to keep deals on schedule"],
    role: ["Built scalable server-side features with Laravel and MySQL", "Collaborated with cross-functional teams on delivery"],
    links: [],
    accent: ["#8b5cf6", "#ec4899"],
    keywords: ["crm", "leads", "lead", "deals", "sales", "سي ار ام", "عملاء"],
  },
  {
    slug: "accounting-system",
    name: "Accounting System",
    tagline: "Income, expenses, salaries & financial reports",
    taglineAr: "إدارة الإيرادات والمصروفات والمرتبات مع تقارير مالية",
    category: "Production",
    company: "e-RAMO for Digital Solutions",
    experienceSlug: "e-ramo",
    year: "2024 – 2025",
    tech: ["Laravel", "PHP", "MySQL"],
    overview:
      "An accounting system for managing income, expenses and employee salaries, with detailed financial reports that support decision-making.",
    features: ["Income management", "Expense management", "Employee salary management", "Detailed financial reports for decision-making"],
    role: ["Developed the backend with Laravel and MySQL", "Built the reporting logic behind financial reports"],
    links: [],
    accent: ["#14b8a6", "#84cc16"],
    keywords: ["accounting", "accounting system", "finance", "expenses", "محاسبه", "محاسبة", "حسابات"],
  },
  {
    slug: "abc-juice",
    live: true,
    name: "ABC Juice",
    tagline: "E-commerce backend with wallet, points & packages",
    taglineAr: "باك إند متجر إلكتروني مع محفظة ونقاط وباقات ودفع أونلاين",
    category: "Side Project",
    year: "Side project",
    tech: ["Laravel", "PHP", "MySQL", "Payments"],
    overview:
      "The backend of a full e-commerce platform covering product management, order processing and online payments — plus a customer wallet, a points-based rewards system and purchasable packages.",
    features: [
      "Product management",
      "Order processing",
      "Online payment handling",
      "Customer wallet",
      "Points-based rewards system",
      "Purchasable packages",
    ],
    role: [
      "Developed the entire backend with Laravel and MySQL",
      "Wrote server-side logic that keeps balances and orders consistent",
    ],
    links: [{ label: "Visit abcjuice.com", href: "https://abcjuice.com/" }],
    accent: ["#f97316", "#facc15"],
    keywords: ["abc", "abc juice", "juice", "ecommerce", "e-commerce", "shop", "store", "wallet", "عصير", "متجر"],
  },
  {
    slug: "remedies-app",
    live: true,
    name: "Remedies App",
    tagline: "Subscriptions, courses & AI-generated content",
    taglineAr: "تطبيق علاجات طبيعية باشتراكات وكورسات ومحتوى بالذكاء الاصطناعي",
    category: "Side Project",
    year: "Side project",
    tech: ["Laravel", "PHP", "MySQL", "In-App Purchases", "AI Integration"],
    overview:
      "The backend and admin dashboard for a natural-remedies mobile app where users browse remedies, take courses and subscribe to paid plans. AI is integrated into the dashboard to generate remedy content for admins.",
    features: [
      "Browse remedies and take courses",
      "Paid subscription plans via in-app purchases",
      "Admin dashboard for content management",
      "AI-powered remedy content generation",
    ],
    role: [
      "Built the backend and admin dashboard",
      "Integrated in-app purchases for paid subscriptions",
      "Integrated AI into the dashboard to speed up content creation",
    ],
    links: [{ label: "Google Play", href: "https://play.google.com/store/apps/details?id=natural.remedies.app" }],
    accent: ["#22c55e", "#06b6d4"],
    keywords: ["remedies", "remedy", "natural", "subscription", "subscriptions", "courses", "ai", "in-app", "علاج", "اعشاب", "ذكاء"],
  },
  {
    slug: "ghali-group",
    live: true,
    name: "Ghali Group",
    tagline: "Corporate website & admin dashboard",
    taglineAr: "موقع رسمي للمجموعة مع لوحة تحكم",
    category: "Side Project",
    year: "Side project",
    tech: ["Laravel", "PHP", "MySQL"],
    overview:
      "The backend and admin dashboard behind Ghali Group's official website, with a focus on performance, security and scalability.",
    features: ["Content-managed corporate website", "Admin dashboard", "Performance, security and scalability focus"],
    role: ["Developed and maintained the backend", "Built the admin dashboard"],
    links: [{ label: "Visit ghali-group.org", href: "https://www.ghali-group.org/" }],
    accent: ["#eab308", "#a855f7"],
    keywords: ["ghali", "ghali group", "غالي"],
  },
  {
    slug: "scientific-journal",
    live: true,
    name: "Scientific Journal",
    tagline: "Journal platform for the Faculty of Science",
    taglineAr: "منصة مجلة علمية لكلية العلوم",
    category: "Production",
    company: "Al-Noras Company",
    experienceSlug: "al-noras",
    year: "2024",
    tech: ["React.js", "Laravel API", "MySQL"],
    overview:
      "A journal platform built for the Faculty of Science, with a React.js frontend consuming a Laravel API backed by MySQL.",
    features: ["Journal publishing platform", "React.js frontend", "Laravel REST API", "MySQL database"],
    role: ["Developed the Laravel REST API", "Integrated the database and server-side logic", "Worked with the React.js frontend"],
    links: [{ label: "Live demo", href: "https://jornal-project-finish-updates.vercel.app/" }],
    accent: ["#3b82f6", "#8b5cf6"],
    keywords: ["journal", "scientific journal", "مجله", "مجلة"],
  },
  {
    slug: "tadawy",
    name: "Tadawy",
    tagline: "Blood donation management system (graduation project)",
    taglineAr: "نظام إدارة التبرع بالدم (مشروع التخرج)",
    category: "Graduation",
    year: "2024",
    tech: ["React.js", "Laravel API", "MySQL", "Chart.js", "Bootstrap", "Material UI"],
    overview:
      "A graduation project: a comprehensive blood donation management system with a React.js frontend consuming a Laravel REST API, interactive dashboards and a responsive UI.",
    features: [
      "Blood donation management end-to-end",
      "Interactive dashboards & data visualizations (Chart.js)",
      "Responsive UI with Bootstrap and Material UI",
      "React.js frontend + Laravel REST API",
    ],
    role: ["Designed and built the full system", "Developed both the React.js frontend and the Laravel API"],
    links: [{ label: "Watch demo", href: "https://lnkd.in/p/dGX2MfCg" }],
    accent: ["#ef4444", "#f43f5e"],
    keywords: ["tadawy", "blood", "donation", "graduation project", "تداوي", "تبرع", "دم", "مشروع التخرج"],
  },
  {
    slug: "hanakol-eah",
    name: "Hanakol Eah",
    tagline: "Food delivery website",
    taglineAr: "موقع توصيل أكل",
    category: "Freelance",
    company: "Money Leek",
    experienceSlug: "money-leek",
    year: "2024",
    tech: ["Laravel MVC", "PHP", "MySQL"],
    overview: "A food delivery website built with Laravel MVC and MySQL as part of freelance work with Money Leek.",
    features: ["Food delivery ordering", "Laravel MVC architecture", "MySQL database"],
    role: ["Developed the backend with Laravel MVC and MySQL", "Focused on security and performance through testing"],
    links: [],
    accent: ["#f43f5e", "#f97316"],
    keywords: ["hanakol", "hanakol eah", "food", "delivery", "restaurant", "هناكل", "اكل", "توصيل"],
  },
  {
    slug: "monza-car",
    name: "Monza Car",
    tagline: "Car rental website",
    taglineAr: "موقع تأجير سيارات",
    category: "Freelance",
    company: "Money Leek",
    experienceSlug: "money-leek",
    year: "2024",
    tech: ["Laravel MVC", "PHP", "MySQL"],
    overview: "A car rental website built with Laravel MVC and MySQL as part of freelance work with Money Leek.",
    features: ["Car rental listings & bookings", "Laravel MVC architecture", "MySQL database"],
    role: ["Developed the backend with Laravel MVC and MySQL", "Focused on security and performance through testing"],
    links: [],
    accent: ["#64748b", "#22d3ee"],
    keywords: ["monza", "monza car", "car", "rental", "rent", "مونزا", "عربيات", "سيارات", "ايجار"],
  },
];

export const projectCategories: ("All" | ProjectCategory)[] = ["All", "Production", "Side Project", "Freelance", "Graduation"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getExperience(slug: string) {
  return experiences.find((e) => e.slug === slug);
}

export function projectsForExperience(slug: string) {
  return projects.filter((p) => p.experienceSlug === slug);
}
