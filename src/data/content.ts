/**
 * Edit every piece of copy from a single file.
 * Keep strings short and punchy — headlines especially.
 */

export const site = {
  name: "Nizaal Khot",
  role: "Forward Deployed AI Engineer",
  subRole: "Agentic Systems & Enterprise Deployment",
  pitch: "I deploy autonomous AI systems that replace manual work, not decks.",
  description:
    "Forward Deployed AI Engineer architecting autonomous multi-agent systems with LangGraph, Google ADK, MCP, and frontier LLMs. 86% coding-time reduction. 52% manual data entry cut. Based in Mumbai.",
  url: "https://nizaalkhot.com",
  location: "Mumbai, India",
  email: "nijaal.khot.1@gmail.com",
  phone: "+91 9594988780",
  socials: {
    linkedin: "https://www.linkedin.com/in/nizaalkhot/",
    github: "https://github.com/nizaalkhot",
    credly: "https://www.credly.com/users/nizaal_khot",
    instagram: "https://www.instagram.com/nizaal._._/",
    hackerrank: "https://www.hackerrank.com/profile/nijaal_khot_1",
  },
  resumeUrl: "/resume.pdf",
};

export const CAREER_START_DATE = new Date("2022-05-01");

export function getYearsOfExperience(startDate: Date = CAREER_START_DATE): string {
  const now = new Date();
  const months =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());
  const years = Math.max(0, months / 12);
  return (Math.round(years * 10) / 10).toFixed(1);
}

export function getStats() {
  const yrs = getYearsOfExperience();
  return [
    { value: `${yrs}+ yrs`, label: "Engineering" },
    { value: "86% ↓", label: "Coding time" },
    { value: "52% ↓", label: "Manual data entry" },
    { value: "28% ↑", label: "Compliance adherence" },
  ];
}

export const stats = getStats();

export const tickerTech = [
  "LangGraph",
  "CrewAI",
  "MCP",
  "DSPy",
  "AWS Bedrock",
  "Pinecone",
  "RAGAS",
  "LangSmith",
  "Claude 4.5",
  "GPT-4.1",
  "Gemini 2.5",
  "LoRA",
  "PyTorch",
  "FastAPI",
  "Neo4j",
  "Weaviate",
];

export type Capability = {
  title: string;
  slug: string;
  tag: string;
  definition: string;
};

export const capabilities: Capability[] = [
  {
    title: "Agentic AI",
    slug: "agentic",
    tag: "core",
    definition:
      "Designing multi-agent ecosystems where specialized agents collaborate through orchestration graphs.",
  },
  {
    title: "Model Context Protocol",
    slug: "mcp",
    tag: "protocol",
    definition:
      "Building and integrating MCP tool-calling servers that let LLMs interact with real systems.",
  },
  {
    title: "Vibe Coding",
    slug: "vibe",
    tag: "method",
    definition:
      "Agent-first, AI-augmented development where the human directs and agents execute.",
  },
  {
    title: "Multi-Agent Systems",
    slug: "multi-agent",
    tag: "pattern",
    definition:
      "Hierarchical, supervisor, and swarm patterns in LangGraph and CrewAI.",
  },
  {
    title: "RAG at Scale",
    slug: "rag",
    tag: "retrieval",
    definition:
      "Hybrid search, re-ranking, and evaluation pipelines for enterprise knowledge.",
  },
  {
    title: "LLM Ops",
    slug: "llmops",
    tag: "production",
    definition:
      "Fine-tuning, evaluation (RAGAS / LangSmith), cost & latency optimization.",
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Agentic Frameworks",
    items: [
      "LangChain",
      "LangGraph",
      "CrewAI",
      "Microsoft Agent Framework",
      "Google ADK",
      "AWS Strands",
    ],
  },
  {
    label: "Generative AI",
    items: [
      "GPT-4 / 4.1",
      "Claude 4.5",
      "Gemini 2.5",
      "Hybrid RAG",
      "Re-ranking",
      "CoT · ReAct · DSPy",
    ],
  },
  {
    label: "Protocols & Tooling",
    items: ["Model Context Protocol", "Tool-calling", "Function-calling"],
  },
  {
    label: "Machine Learning",
    items: ["PyTorch", "Hugging Face", "LoRA / QLoRA", "Scikit-learn"],
  },
  {
    label: "Data & Memory",
    items: ["Pinecone", "Weaviate", "Neo4j", "PostgreSQL", "Graphiti"],
  },
  {
    label: "LLMOps & Evals",
    items: ["RAGAS", "LangSmith", "AWS Bedrock", "SageMaker", "CI/CD for ML"],
  },
  {
    label: "Languages",
    items: ["Python", "Asyncio", "Pydantic", "FastAPI", "SQL", "JavaScript"],
  },
];

export type Role = {
  title: string;
  company: string;
  dates: string;
  location: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    title: "Senior Software Engineer (AI)",
    company: "Dentsu Global Services",
    dates: "Jul 2025 — Present",
    location: "Mumbai, India",
    bullets: [
      "Architected a hierarchical multi-agent ecosystem in LangGraph with 3 specialized agents — Code Generator, Reviewer, Feedback — reducing coding time by 86% via autonomous production-ready Python generation.",
      "Replaced brittle manual prompts with DSPy optimizers, improving enterprise compliance adherence by 28% and cutting token latency.",
      "Deployed a Multimodal Agent on AWS Bedrock for handwritten document ingestion using multi-model ensemble approaches — reducing manual data entry by 52%.",
      "Engineered an autonomous end-to-end QA agent pipeline (LangGraph) that fully replicated QA engineer duties for email campaign validation, accelerating launch cycle times significantly.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Dentsu Global Services",
    dates: "Mar 2024 — Jul 2025",
    location: "Thane, India",
    bullets: [
      "Designed Generative AI pipelines using GPT / Gemini models to automate customer workflows and cut manual processing overhead.",
      "Engineered large-scale ETL pipelines ensuring data quality, integrity, and reliability across enterprise datasets.",
      "Mentored junior engineers on prompt engineering, MLOps, and model optimization best practices.",
    ],
  },
  {
    title: "Associate Software Engineer",
    company: "Dentsu Global Services",
    dates: "May 2023 — Mar 2024",
    location: "Thane, India",
    bullets: [
      "Conducted R&D on GitHub Copilot integration strategies, identifying workflow optimizations adopted across the engineering team.",
      "Built Python web-scraping pipelines (2.x / 3.x) for large-scale e-commerce data extraction.",
      "Delivered automated scraping solutions that cut human effort significantly across data operations.",
      "Collaborated in Agile sprints using JIRA for task tracking, sprint planning, and cross-team support.",
    ],
  },
  {
    title: "Consultant",
    company: "Dentsu Global Services",
    dates: "May 2022 — May 2023",
    location: "Thane, India",
    bullets: [
      "Developed Python 2.x / 3.x web-crawling scripts for e-commerce platforms supporting data ops and cluster-based processing.",
      "Provided cross-team technical support and site analysis for data scraping and collection workflows.",
    ],
  },
];

export type Project = {
  name: string;
  tagline: string;
  stack: string[];
  description: string;
  href?: string;
  github?: string;
  live?: string;
  kind: "featured" | "work" | "opensource";
  category: "Agentic Systems" | "Production AI" | "Benchmarks & DevTools";
  badge?: string;
};

export const projects: Project[] = [
  {
    name: "Drishti: Agentic Scam & Fraud Intelligence",
    tagline: "Real-time APP fraud interceptor for banking",
    stack: ["Google ADK", "Python", "FastAPI", "React", "FIU-IND"],
    description:
      "Production multi-agent intelligence platform intercepting Authorised Push Payment (APP) fraud—digital arrest, malicious KYC APKs, and mule rings—utilizing Google ADK agent architecture and banking compliance rails.",
    href: "https://github.com/nizaalkhot/Drishti",
    github: "https://github.com/nizaalkhot/Drishti",
    kind: "featured",
    category: "Agentic Systems",
    badge: "Flagship",
  },
  {
    name: "Kaleido: Multi-Format Personalization",
    tagline: "Fact-invariant audience personalization",
    stack: ["Vertex AI Gemini", "Next.js", "FastAPI", "BigQuery", "Stripe"],
    description:
      "End-to-end personalization platform that transforms single source stories into verified, multi-format experiences (audio briefings, briefs, deep dives) powered by Vertex AI Gemini, edge-tts, and BigQuery.",
    href: "https://github.com/nizaalkhot/Kaleido",
    github: "https://github.com/nizaalkhot/Kaleido",
    kind: "opensource",
    category: "Agentic Systems",
    badge: "Full-Stack AI",
  },
  {
    name: "JanSetu: Citizen-to-Policy Intelligence",
    tagline: "Citizen voice → evidence-backed budget priorities",
    stack: ["Python", "Cloud Run", "Multilingual LLMs", "GeoAnalytics"],
    description:
      "Sovereign Digital Public Good (DPG) turning citizen grievances across BRICS languages and dialects into explainable development priorities, comparing demand against infrastructure budgets.",
    href: "https://github.com/nizaalkhot/JanSetu",
    github: "https://github.com/nizaalkhot/JanSetu",
    kind: "opensource",
    category: "Agentic Systems",
    badge: "Digital Public Good",
  },
  {
    name: "Tanglefoot: Agent Chaos Engineering Suite",
    tagline: "Adversarial stress-testing for LLM frameworks",
    stack: ["LangGraph", "CrewAI", "AutoGen", "LlamaIndex", "Python"],
    description:
      "A rigorous public benchmark and interactive dashboard evaluating multi-agent frameworks under intentional adversarial chaos: flaky APIs, tool hallucinations, slow scrapers, and circular execution traps.",
    href: "https://github.com/nizaalkhot/tanglefoot",
    github: "https://github.com/nizaalkhot/tanglefoot",
    kind: "opensource",
    category: "Benchmarks & DevTools",
    badge: "Benchmark",
  },
  {
    name: "Mintwright: Self-Evolving Toolmaker Agent",
    tagline: "Autonomous runtime tool synthesis",
    stack: ["Gemini 2.0", "Python", "AST / Metaprogramming", "Tool Synthesis"],
    description:
      "Self-evolving agent architecture that synthesizes, tests, isolates, and dynamically mounts its own custom tools at runtime when confronted with novel environment obstacles.",
    href: "https://github.com/nizaalkhot/mintwright",
    github: "https://github.com/nizaalkhot/mintwright",
    kind: "opensource",
    category: "Benchmarks & DevTools",
    badge: "Tool Synthesis",
  },
  {
    name: "Spec-Driven Multi-Agent Skills",
    tagline: "Spec, architecture, and TDD skills for coding agents",
    stack: ["Agent Skills", "Claude Code", "Cursor", "Windsurf", "TDD"],
    description:
      "Production multi-agent engineering suite enabling autonomous PRD drafting, system architecture, database modeling, security boundaries, and strict test-driven development for AI coding agents.",
    href: "https://github.com/nizaalkhot/skills",
    github: "https://github.com/nizaalkhot/skills",
    kind: "opensource",
    category: "Benchmarks & DevTools",
    badge: "Agent Skills",
  },
  {
    name: "Multi-Agent Resume Optimizer",
    tagline: "Collaborative agentic resume & ATS optimization",
    stack: ["LangGraph", "Google Gemini API", "Streamlit", "Python"],
    description:
      "Multi-agent pipeline featuring specialized Advisor, ATS Evaluator, and Optimizer nodes that collaboratively parse, critique, and align resumes with target job profiles.",
    href: "https://github.com/nizaalkhot/multi-agent-resume-optimizer",
    github: "https://github.com/nizaalkhot/multi-agent-resume-optimizer",
    kind: "opensource",
    category: "Agentic Systems",
  },
  {
    name: "Maths Agent: Local Multimodal Solver",
    tagline: "Image & text math problem solver with local LLMs",
    stack: ["Python", "Local LLM", "Vision Reasoning", "Streamlit"],
    description:
      "Multimodal AI agent capable of parsing handwritten and printed math equations, executing symbolic verification, and returning step-by-step reasoning using local vision LLMs.",
    href: "https://github.com/nizaalkhot/maths-agent",
    github: "https://github.com/nizaalkhot/maths-agent",
    kind: "opensource",
    category: "Agentic Systems",
  },
  {
    name: "Hierarchical Code Agent",
    tagline: "Generator → Reviewer → Feedback orchestration",
    stack: ["LangGraph", "Claude 4.5", "DSPy", "FastAPI"],
    description:
      "Production enterprise multi-agent system delivering autonomous Python generation with built-in review and compliance loops. 86% coding-time reduction in enterprise workflows.",
    kind: "work",
    category: "Production AI",
    badge: "Enterprise Case",
  },
  {
    name: "Multimodal Ingestion Agent",
    tagline: "Handwritten docs → structured data",
    stack: ["AWS Bedrock", "Python", "Multi-Model Ensemble"],
    description:
      "Deployed on AWS Bedrock for handwritten document ingestion using a multi-model ensemble—reduced manual data entry by 52% across enterprise operations.",
    kind: "work",
    category: "Production AI",
    badge: "Enterprise Case",
  },
  {
    name: "Autonomous QA Agent Pipeline",
    tagline: "End-to-end email campaign validation",
    stack: ["LangGraph", "Python", "LangSmith", "CI/CD"],
    description:
      "Autonomous agent pipeline that replicates QA engineer duties for email campaign validation—accelerating launch cycle times across marketing ops.",
    kind: "work",
    category: "Production AI",
    badge: "Enterprise Case",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  category: "Cloud & AI" | "Data & Deep Learning";
  href: string;
  badgeUrl: string;
};

export type Publication = {
  title: string;
  journal: string;
  year: string;
  volume: string;
  authors: string[];
  description: string;
  href?: string;
};

export const publications: Publication[] = [
  {
    title: "University Exam Result Analysis",
    journal: "International Journal of Innovative Research in Engineering (IJIRE)",
    year: "2022",
    volume: "Vol. 3, Issue 2, pp. 267–271",
    authors: ["Nijaal Khot", "Amtulla Baranwala", "Iqra Khan", "Er. Shrinidhi A. Gindi"],
    description:
      "Peer-reviewed research establishing data-driven statistical analysis models and automated evaluation pipelines for institutional university examination outcomes.",
    href: "https://theijire.com/",
  },
];

export const certifications: Certification[] = [
  {
    name: "AWS Certified: Machine Learning – Specialty",
    issuer: "Amazon Web Services",
    category: "Cloud & AI",
    href: "https://www.credly.com/badges/2918b234-8c4b-49c7-8edc-e74a318b3106/public_url",
    badgeUrl: "https://images.credly.com/size/340x340/images/778bde6c-ad1c-4312-ac33-2fa40d50a147/image.png",
  },
  {
    name: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    category: "Cloud & AI",
    href: "https://www.credly.com/badges/a96c8895-cea0-4025-a95f-dd8f51d8dec1/public_url",
    badgeUrl: "https://images.credly.com/size/720x720/images/4136ced8-75d5-4afb-8677-40b6236e2672/azure-ai-fundamentals-600x600.png",
  },
  {
    name: "Google Cloud: Build an AI-Powered Analytics Agent",
    issuer: "Google Cloud",
    category: "Cloud & AI",
    href: "https://www.credly.com/badges/18cf70cc-d5d9-4576-abbe-9036ab6ce66c/public_url",
    badgeUrl: "https://images.credly.com/size/340x340/images/09f19df7-70ce-4a12-9854-5c5f23077137/blob",
  },
  {
    name: "Google Cloud: ADK Builder",
    issuer: "Google Cloud",
    category: "Cloud & AI",
    href: "https://www.credly.com/badges/d4abf7c1-cda8-46de-ba5b-da51691bbd7a/public_url",
    badgeUrl: "https://images.credly.com/size/340x340/images/872f83f2-357f-4877-b8e3-52adf19b8ea7/blob",
  },
  {
    name: "Data Science Professional Certificate",
    issuer: "IBM",
    category: "Data & Deep Learning",
    href: "https://www.credly.com/badges/e491e07b-6d9e-4e72-851d-77ba148d5e6e/public_url",
    badgeUrl: "https://images.credly.com/size/340x340/images/0da411a5-24e9-4991-9756-ca5f6073e7af/image.png",
  },
  {
    name: "Deep Learning Essentials with Keras",
    issuer: "IBM",
    category: "Data & Deep Learning",
    href: "https://www.credly.com/badges/bc724258-3243-47dd-af4d-1d7396a6419d/public_url",
    badgeUrl: "https://images.credly.com/size/340x340/images/91de936a-1322-446d-9ea6-949d78c57428/image.png",
  },
  {
    name: "Accelerated Deep Learning with GPU",
    issuer: "IBM",
    category: "Data & Deep Learning",
    href: "https://www.credly.com/badges/4070f4d2-c51d-45f4-ab9b-b5efaf8df280/public_url",
    badgeUrl: "https://images.credly.com/size/340x340/images/ce22d252-c0ef-4e57-9840-9e1ce22820a9/blob",
  },
  {
    name: "Data Engineering Essentials",
    issuer: "IBM",
    category: "Data & Deep Learning",
    href: "https://www.credly.com/badges/8ed04451-dd57-4089-9098-6bbc21788d55/public_url",
    badgeUrl: "https://images.credly.com/size/340x340/images/c0b439e5-79d5-498e-abc9-2b71cdf08c34/image.png",
  },
];

export const education = [
  {
    degree: "B.E. Information Technology",
    institution: "M.H. Saboo Siddik College of Engineering",
    location: "Mumbai",
    year: "2022",
    grade: "CGPA 8.48 / 10",
  },
];

export const navLinks = [
  { label: "Playground", href: "#playground" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];
