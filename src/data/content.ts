/**
 * Edit every piece of copy from a single file.
 * Keep strings short and punchy — headlines especially.
 */

export const site = {
  name: "Nizaal Khot",
  role: "AI Engineer",
  subRole: "Generative AI & Agentic Systems",
  pitch: "I build autonomous AI systems that replace manual work, not decks.",
  description:
    "AI Engineer architecting autonomous multi-agent systems with LangGraph, MCP, and frontier LLMs. 86% coding-time reduction. 52% manual data entry cut. Based in Mumbai.",
  url: "https://nizaalkhot.com",
  location: "Mumbai, India",
  email: "nijaal.khot.1@gmail.com",
  phone: "+91 9594988780",
  socials: {
    linkedin: "https://www.linkedin.com/in/nizaalkhot/",
    github: "https://github.com/nizaalkhot",
    instagram: "https://www.instagram.com/nizaal._._/",
    hackerrank: "https://www.hackerrank.com/profile/nijaal_khot_1",
  },
  resumeUrl: "/resume.pdf",
};

export const stats = [
  { value: "3.5+ yrs", label: "Engineering" },
  { value: "86% ↓", label: "Coding time" },
  { value: "52% ↓", label: "Manual data entry" },
  { value: "28% ↑", label: "Compliance adherence" },
];

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
  kind: "featured" | "work";
};

export const projects: Project[] = [
  {
    name: "Autonomous Market Research Agent",
    tagline: "Agent team → web → PDF report",
    stack: ["Python", "CrewAI", "SerperDev"],
    description:
      "Team of autonomous agents (Research, Analyst, Writer) that scrapes web data, analyzes market trends, and generates comprehensive PDF reports. Tool-calling browses, scrapes, and stores structured findings in a shared vector memory.",
    href: "https://github.com/nizaalkhot",
    kind: "featured",
  },
  {
    name: "Hierarchical Code Agent",
    tagline: "Generator → Reviewer → Feedback",
    stack: ["LangGraph", "Claude 4.5", "DSPy"],
    description:
      "Production multi-agent system delivering autonomous Python generation with built-in review and compliance loops. 86% coding-time reduction in enterprise workflows.",
    kind: "work",
  },
  {
    name: "Multimodal Ingestion Agent",
    tagline: "Handwritten docs → structured data",
    stack: ["AWS Bedrock", "Python", "Ensemble"],
    description:
      "Deployed on AWS Bedrock for handwritten document ingestion using a multi-model ensemble — reduced manual data entry by 52% across enterprise operations.",
    kind: "work",
  },
  {
    name: "QA Agent Pipeline",
    tagline: "End-to-end email campaign QA",
    stack: ["LangGraph", "Python", "LangSmith"],
    description:
      "Autonomous agent pipeline that replicates QA engineer duties for email campaign validation — accelerating launch cycle times across marketing ops.",
    kind: "work",
  },
];

export const certifications = [
  {
    name: "AWS Certified: Machine Learning — Specialty",
    issuer: "Amazon Web Services",
    href: "https://www.credly.com/badges/2918b234-8c4b-49c7-8edc-e74a318b3106/public_url",
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
