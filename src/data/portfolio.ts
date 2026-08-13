/**
 * Structured portfolio data.
 * Sources of truth:
 *  - resume (SakethVarma_ResumeMain.pdf) -> profile, education, skills, projects, achievements
 *  - internship documents -> experience + documentary evidence
 *  - certificates archive -> credentials
 * Nothing here is invented; every field is backed by one of those documents.
 */

export const profile = {
  name: "Budde Saketh Varma",
  shortName: "Saketh Varma",
  title: "Software Engineer • Full Stack • AI & ML",
  tagline: "Building software that solves real problems.",
  objective:
    "B.Tech CSE (AI & ML) student with hands-on experience in software development, full-stack applications, and machine learning through internships and academic projects. Skilled in Java, Python, JavaScript, React.js, Node.js, PostgreSQL, REST APIs, and problem-solving. Seeking an entry-level software engineering role to contribute technical skills, learn from experienced professionals, and build reliable, impactful solutions.",
  location: "Hyderabad, Telangana, India",
  phone: "+91-9704131164",
  email: "buddesaketh@gmail.com",
  linkedin: "https://linkedin.com/in/saketh-varma-285633357",
  github: "https://github.com/SAKETHVARMA552",
  resume: "/resume.pdf",
  resumeFilename: "Budde_Saketh_Varma_Resume.pdf",
};

export const education = [
  {
    degree: "Bachelor of Technology — Computer Science & Engineering (AI & ML)",
    school: "Malla Reddy College of Engineering, Hyderabad",
    period: "2023 – 2027",
    score: "CGPA 7.98 / 10.0",
    coursework: [
      "Data Structures",
      "DBMS",
      "Operating Systems",
      "OOP",
      "Computer Networks",
      "Machine Learning",
      "Artificial Intelligence",
    ],
  },
  {
    degree: "Intermediate (MPC)",
    school: "SR Junior College, Hyderabad",
    period: "2023",
    score: "95.9%",
    coursework: [],
  },
  {
    degree: "SSC",
    school: "Aryabhata Concept School, Mahabubabad",
    period: "2021",
    score: "97%",
    coursework: [],
  },
];

export type SkillCategory = {
  id: string;
  name: string;
  accent: string; // css color token
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    name: "Programming Languages",
    accent: "var(--violet)",
    skills: ["Python", "Java", "JavaScript", "SQL", "C"],
  },
  {
    id: "frontend",
    name: "Frontend & Web",
    accent: "var(--cyan)",
    skills: ["HTML5", "CSS3", "React.js", "Responsive UI"],
  },
  {
    id: "backend",
    name: "Backend",
    accent: "var(--blue)",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
  },
  {
    id: "databases",
    name: "Databases",
    accent: "var(--indigo)",
    skills: ["PostgreSQL", "MySQL", "Prisma ORM", "Database Design"],
  },
  {
    id: "aiml",
    name: "AI & Machine Learning",
    accent: "var(--magenta)",
    skills: [
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Machine Learning",
      "Data Preprocessing",
      "Feature Engineering",
      "Model Evaluation",
    ],
  },
  {
    id: "genai",
    name: "Generative AI",
    accent: "var(--pink)",
    skills: ["Generative AI", "LLMs", "Prompt Engineering", "AI-Assisted Development"],
  },
  {
    id: "tools",
    name: "Developer Tools",
    accent: "var(--blue)",
    skills: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Postman", "Google Colab"],
  },
  {
    id: "soft",
    name: "Soft Skills",
    accent: "var(--amber)",
    skills: ["Leadership", "Communication", "Teamwork", "Problem Solving", "Adaptability"],
  },
];

export const fundamentals = [
  { title: "Object-Oriented Programming", note: "Core subject — resume & Infosys OOP course" },
  { title: "Data Structures & Algorithms", note: "Core subject" },
  { title: "DBMS", note: "Core subject" },
  { title: "Operating Systems", note: "Core subject" },
  { title: "Computer Networks", note: "Core subject" },
  { title: "REST API Design", note: "Applied in School Management System" },
  { title: "Authentication & JWT", note: "Applied in School Management System" },
  { title: "Role-Based Access Control", note: "Applied in School Management System" },
  { title: "Database Design", note: "PostgreSQL + Prisma ORM" },
  { title: "Software Testing", note: "ICT internship — testing & issue tracking" },
  { title: "Git & Version Control", note: "Developer tooling" },
];

export type Project = {
  id: string;
  name: string;
  category: string;
  summary: string;
  problem: string;
  tech: string[];
  features: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    id: "school-management-system",
    name: "School Management System",
    category: "Full Stack Web Application",
    summary:
      "A full-stack School Management System to streamline student, teacher, attendance, class, and subject management.",
    problem:
      "Academic administration spread across disconnected records makes student, teacher, attendance, class and subject management slow and error-prone.",
    tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "JWT"],
    features: [
      "Developed a full-stack School Management System to streamline student, teacher, attendance, class, and subject management.",
      "Implemented secure authentication and role-based access control using JWT.",
      "Designed REST APIs and integrated PostgreSQL using Prisma ORM for efficient data management.",
      "Built responsive React.js dashboards to improve academic administration and user experience.",
    ],
    accent: "var(--indigo)",
  },
  {
    id: "crop-recommendation-system",
    name: "Crop Recommendation System",
    category: "Machine Learning",
    summary:
      "A Machine Learning model that recommends suitable crops based on soil nutrients and environmental conditions.",
    problem:
      "Choosing the right crop depends on soil nutrients and environmental conditions that are hard to reason about manually.",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    features: [
      "Developed a Machine Learning model to recommend suitable crops based on soil nutrients and environmental conditions.",
      "Performed data preprocessing, feature engineering, and model training using agricultural datasets.",
      "Compared and evaluated multiple Machine Learning algorithms using standard performance metrics to identify the best-performing prediction model.",
    ],
    accent: "var(--cyan)",
  },
];

export type DocKind = "Internship Certificate" | "Offer Letter" | "Letter of Recommendation" | "Training Certificate";

export type ExperienceItem = {
  id: string;
  org: string;
  role: string;
  location?: string;
  period: string;
  type: string;
  featured?: boolean;
  points: string[];
  documents: { label: string; kind: DocKind; file: string; download: string }[];
};

export const experience: ExperienceItem[] = [
  {
    id: "art-of-living",
    org: "The Art of Living International Center",
    role: "ICT Intern",
    location: "Bengaluru",
    period: "Jun 2026 – Jul 2026",
    type: "Internship",
    featured: true,
    points: [
      "Contributed to the development and enhancement of a Student Management System by assisting with implementation, testing, and documentation.",
      "Assisted in project planning, documentation, software testing, and issue tracking to support project execution.",
      "Participated in Agile meetings, coordinated assigned tasks, and collaborated with team members to ensure timely project delivery.",
      "Prepared and maintained technical documentation, reports, and project updates.",
      "Strengthened problem-solving, teamwork, communication, and software development skills by working in a professional IT environment.",
    ],
    documents: [
      {
        label: "Internship Certificate — ICT Department, Software Trainee (08/06/2026 – 08/07/2026)",
        kind: "Internship Certificate",
        file: "/internships/art-of-living-ict-internship-certificate.pdf",
        download: "Art_of_Living_ICT_Internship_Certificate.pdf",
      },
    ],
  },
  {
    id: "codtech",
    org: "Codtech IT Solutions Private Limited",
    role: "Machine Learning Intern",
    location: "Hyderabad",
    period: "21 Jan 2026 – 18 Mar 2026 (8 weeks)",
    type: "Internship",
    points: [
      "Domain: Machine Learning. Program type: Internship, 8 weeks, successfully completed (Intern ID: CTIS3246).",
    ],
    documents: [
      {
        label: "Certificate of Internship Experience",
        kind: "Internship Certificate",
        file: "/internships/codtech-machine-learning-internship.pdf",
        download: "Codtech_Machine_Learning_Internship_Certificate.pdf",
      },
    ],
  },
  {
    id: "codec",
    org: "Codec Technologies Pvt. Ltd.",
    role: "Artificial Intelligence Intern",
    location: "Hybrid / India",
    period: "16 Jan 2026 – 15 Feb 2026 (1 month)",
    type: "Internship (AICTE & ICAC approved)",
    points: [
      "Completed the 1-month AICTE & ICAC approved internship program as Artificial Intelligence Intern.",
      "Offered as Project Intern with the designation Artificial Intelligence Intern, reporting to assigned Project Head(s).",
    ],
    documents: [
      {
        label: "Certificate of Internship",
        kind: "Internship Certificate",
        file: "/internships/codec-technologies-internship-certificate.pdf",
        download: "Codec_Technologies_Internship_Certificate.pdf",
      },
      {
        label: "Internship Offer Letter",
        kind: "Offer Letter",
        file: "/internships/codec-technologies-offer-letter.pdf",
        download: "Codec_Technologies_Internship_Offer_Letter.pdf",
      },
      {
        label: "Letter of Recommendation",
        kind: "Letter of Recommendation",
        file: "/internships/codec-technologies-letter-of-recommendation.pdf",
        download: "Codec_Technologies_Letter_of_Recommendation.pdf",
      },
      {
        label: "Artificial Intelligence Training — Certificate of Completion (15 Feb 2026)",
        kind: "Training Certificate",
        file: "/certificates/codec-technologies-ai-training.pdf",
        download: "Codec_Technologies_AI_Training_Certificate.pdf",
      },
    ],
  },
  {
    id: "aicte-edunet-shell",
    org: "AICTE • Edunet Foundation • Shell India Markets",
    role: "Virtual Intern — AI & Data Analytics (Green Skills)",
    period: "25 Aug 2025 – 25 Sep 2025 (4 weeks)",
    type: "Virtual Internship — Skills4Future program",
    points: [
      "Completed a 4-week virtual internship on Artificial Intelligence and Data Analytics focused on Green Skills under the Skills4Future program.",
    ],
    documents: [
      {
        label: "Certificate of Completion",
        kind: "Internship Certificate",
        file: "/internships/aicte-edunet-shell-green-skills-internship.pdf",
        download: "AICTE_Edunet_Shell_Green_Skills_Internship_Certificate.pdf",
      },
    ],
  },
];

export const achievements = [
  {
    title: "Winner — Internal Smart India Hackathon (SIH)",
    detail: "Malla Reddy College of Engineering — 2025",
    accent: "var(--amber)",
  },
  {
    title: "Led academic software project development",
    detail: "Coordinated team activities and contributed to successful project completion.",
    accent: "var(--violet)",
  },
  {
    title: "Cisco Cybersecurity Certification",
    detail: "Demonstrating foundational cybersecurity knowledge.",
    accent: "var(--cyan)",
  },
  {
    title: "TCS iON Career Edge — Young Professional",
    detail: "Successfully completed certification.",
    accent: "var(--blue)",
  },
  {
    title: "Volleyball Tournament Finalist",
    detail:
      "Represented the B.Tech CSE (AI & ML) department in the college sports tournament and reached the finals.",
    accent: "var(--pink)",
  },
];

export const extracurricular = [
  "Active participant in coding workshops and technical learning sessions.",
  "Volunteer in community service and campus activities.",
  "Collaborated on team-based software development projects.",
  "Volleyball Finalist — represented the B.Tech CSE (AI & ML) department and reached the finals.",
];

export const languages = [
  { name: "English", level: "Professional Proficiency" },
  { name: "Telugu", level: "Native Proficiency" },
  { name: "Hindi", level: "Conversational Proficiency" },
];

export type CertCategory =
  | "AI & ML"
  | "Generative AI"
  | "Cybersecurity"
  | "Programming"
  | "Data Analytics"
  | "Professional"
  | "Job Simulations";

export type Credential = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: CertCategory;
  kind: "Certification" | "Course Certificate" | "Job Simulation";
  credentialId?: string;
  skills: string[];
  file: string;
  download: string;
  featured?: boolean;
};

export const credentials: Credential[] = [
  {
    id: "ibm-ai-fundamentals",
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "Jan 09, 2026",
    category: "AI & ML",
    kind: "Certification",
    credentialId: "credly.com/badges/8fa04e1c-f20f-4c7e-8a8f-5caa6dd38133",
    skills: ["Artificial Intelligence", "Machine Learning Concepts"],
    file: "/certificates/ibm-ai-fundamentals.pdf",
    download: "IBM_Artificial_Intelligence_Fundamentals.pdf",
    featured: true,
  },
  {
    id: "accenture-digital-skills-ai",
    title: "Digital Skills: Artificial Intelligence",
    issuer: "Accenture (via FutureLearn)",
    date: "Jun 20, 2026",
    category: "AI & ML",
    kind: "Course Certificate",
    credentialId: "futurelearn.com/certificates/dbfm5jj",
    skills: ["Artificial Intelligence", "AI in the Workplace"],
    file: "/certificates/accenture-digital-skills-ai.pdf",
    download: "Accenture_Digital_Skills_Artificial_Intelligence.pdf",
    featured: true,
  },
  {
    id: "cisco-intro-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "May 26, 2025",
    category: "Cybersecurity",
    kind: "Certification",
    skills: ["Cybersecurity Fundamentals", "Threats & Attacks"],
    file: "/certificates/cisco-intro-cybersecurity.pdf",
    download: "Cisco_Introduction_to_Cybersecurity.pdf",
    featured: true,
  },
  {
    id: "google-cloud-generative-ai-studio",
    title: "Introduction to Generative AI Studio",
    issuer: "Google Cloud",
    date: "Jul 27, 2025",
    category: "Generative AI",
    kind: "Certification",
    credentialId: "8692211",
    skills: ["Generative AI", "Prompt Design"],
    file: "/certificates/google-cloud-generative-ai-studio.pdf",
    download: "Google_Cloud_Introduction_to_Generative_AI_Studio.pdf",
    featured: true,
  },
  {
    id: "tcs-ion-career-edge",
    title: "TCS iON Career Edge — Young Professional",
    issuer: "Tata Consultancy Services (TCS iON)",
    date: "Jul 27, 2025",
    category: "Professional",
    kind: "Certification",
    credentialId: "119854-27177294-1016",
    skills: [
      "Communication Skills",
      "Business Etiquette",
      "IT Foundational Skills",
      "Overview of Artificial Intelligence",
    ],
    file: "/certificates/tcs-ion-career-edge.pdf",
    download: "TCS_iON_Career_Edge_Young_Professional.pdf",
    featured: true,
  },
  {
    id: "ibm-getting-started-generative-ai",
    title: "Getting Started with Generative AI",
    issuer: "IBM SkillsBuild",
    date: "Dec 23, 2025",
    category: "Generative AI",
    kind: "Certification",
    credentialId: "credly.com/go/58HePJQo",
    skills: ["Generative AI", "LLMs"],
    file: "/certificates/ibm-getting-started-generative-ai.pdf",
    download: "IBM_Getting_Started_with_Generative_AI.pdf",
    featured: true,
  },
  {
    id: "ibm-getting-started-ai",
    title: "Getting Started with Artificial Intelligence",
    issuer: "IBM SkillsBuild",
    date: "Dec 23, 2025",
    category: "AI & ML",
    kind: "Certification",
    credentialId: "credly.com/badges/7de5cf06-9bb5-4256-92d4-faffef3b0254",
    skills: ["Artificial Intelligence"],
    file: "/certificates/ibm-getting-started-ai.pdf",
    download: "IBM_Getting_Started_with_Artificial_Intelligence.pdf",
  },
  {
    id: "infosys-oop-using-python",
    title: "Object Oriented Programming using Python",
    issuer: "Infosys Springboard",
    date: "Nov 07, 2024",
    category: "Programming",
    kind: "Course Certificate",
    skills: ["Python", "OOP"],
    file: "/certificates/infosys-oop-using-python.pdf",
    download: "Infosys_Object_Oriented_Programming_using_Python.pdf",
  },
  {
    id: "infosys-programming-fundamentals-python-1",
    title: "Programming Fundamentals using Python — Part 1",
    issuer: "Infosys Springboard",
    date: "Feb 19, 2025",
    category: "Programming",
    kind: "Course Certificate",
    skills: ["Python"],
    file: "/certificates/infosys-programming-fundamentals-python-1.pdf",
    download: "Infosys_Programming_Fundamentals_using_Python_Part_1.pdf",
  },
  {
    id: "infosys-programming-fundamentals-python-2",
    title: "Programming Fundamentals using Python — Part 2",
    issuer: "Infosys Springboard",
    date: "Feb 19, 2025",
    category: "Programming",
    kind: "Course Certificate",
    skills: ["Python"],
    file: "/certificates/infosys-programming-fundamentals-python-2.pdf",
    download: "Infosys_Programming_Fundamentals_using_Python_Part_2.pdf",
  },
  {
    id: "infosys-basics-of-python",
    title: "Basics of Python",
    issuer: "Infosys Springboard",
    date: "Feb 23, 2025",
    category: "Programming",
    kind: "Course Certificate",
    skills: ["Python"],
    file: "/certificates/infosys-basics-of-python.pdf",
    download: "Infosys_Basics_of_Python.pdf",
  },
  {
    id: "infosys-introduction-to-python",
    title: "Introduction to Python",
    issuer: "Infosys Springboard",
    date: "Feb 23, 2025",
    category: "Programming",
    kind: "Course Certificate",
    skills: ["Python"],
    file: "/certificates/infosys-introduction-to-python.pdf",
    download: "Infosys_Introduction_to_Python.pdf",
  },
  {
    id: "codec-technologies-ai-training",
    title: "Artificial Intelligence Training — Certificate of Completion",
    issuer: "Codec Technologies",
    date: "Feb 15, 2026",
    category: "AI & ML",
    kind: "Course Certificate",
    credentialId: "NCS ID: E19E86-0116588288923",
    skills: ["Artificial Intelligence"],
    file: "/certificates/codec-technologies-ai-training.pdf",
    download: "Codec_Technologies_AI_Training_Certificate.pdf",
  },
  {
    id: "cambridge-english-empower-b2",
    title: "Cambridge English Empower B2 Level Course",
    issuer: "Cambridge University Press & Assessment",
    date: "2025",
    category: "Professional",
    kind: "Course Certificate",
    skills: ["English Communication (B2)"],
    file: "/certificates/cambridge-english-empower-b2.pdf",
    download: "Cambridge_English_Empower_B2_Certificate.pdf",
  },
  {
    id: "deloitte-technology-job-simulation",
    title: "Technology Job Simulation",
    issuer: "Deloitte (via Forage)",
    date: "Jun 19, 2026",
    category: "Job Simulations",
    kind: "Job Simulation",
    credentialId: "yeJxA4aFegHYPqF3X",
    skills: ["Coding", "Development"],
    file: "/certificates/deloitte-technology-job-simulation.pdf",
    download: "Deloitte_Technology_Job_Simulation.pdf",
  },
  {
    id: "tata-genai-data-analytics-job-simulation",
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata (via Forage)",
    date: "Jun 23, 2026",
    category: "Job Simulations",
    kind: "Job Simulation",
    credentialId: "oZjCZJTqZWhBLNHx8",
    skills: [
      "Exploratory Data Analysis",
      "Risk Profiling",
      "Predicting Delinquency with AI",
      "Data Storytelling",
    ],
    file: "/certificates/tata-genai-data-analytics-job-simulation.pdf",
    download: "Tata_GenAI_Powered_Data_Analytics_Job_Simulation.pdf",
  },
  {
    id: "tata-cybersecurity-analyst-job-simulation",
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata (via Forage)",
    date: "Jun 23, 2026",
    category: "Job Simulations",
    kind: "Job Simulation",
    credentialId: "jzZ4m2scHZ9LtHapf",
    skills: [
      "IAM Fundamentals",
      "IAM Strategy Assessment",
      "Custom IAM Solutions",
      "Platform Integration",
    ],
    file: "/certificates/tata-cybersecurity-analyst-job-simulation.pdf",
    download: "Tata_Cybersecurity_Analyst_Job_Simulation.pdf",
  },
];

export const certFilters: ("All" | CertCategory)[] = [
  "All",
  "AI & ML",
  "Generative AI",
  "Cybersecurity",
  "Programming",
  "Data Analytics",
  "Professional",
  "Job Simulations",
].filter(
  (f) => f === "All" || credentials.some((c) => c.category === f),
) as ("All" | CertCategory)[];

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];
