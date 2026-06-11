// ─── IDENTITY ────────────────────────────────────────────────────────────────
export const identity = {
  name: 'Maya Chen',
  title: 'AI Engineer & Frontend',
  tagline:
    'Shipping agentic systems, RAG pipelines, and developer UX. I blend product intuition with systems engineering to build fast, reliable LLM apps.',
  email: 'hello@mayachen.dev',
  resumeUrl: '#',
  location: 'Based in San Francisco',
  locationSub: 'Open to remote work',
  focus: 'AI Systems + Frontend',
  focusSub: 'RAG, agents, benchmarks',
  availability: 'Currently available',
  availabilitySub: 'Starting mid‑September',
}

// ─── HERO STATS (overlay on photo) ───────────────────────────────────────────
export const heroStats = [
  { value: '82%', label: 'pass@1 eval' },
  { value: '780ms', label: 'p95 latency' },
  { value: '1.2k', label: 'tests' },
]

// ─── HERO PHOTO ───────────────────────────────────────────────────────────────
export const heroImage = {
  src: '/images/9b22c33a-b017-42bd-bab5-89be63576edd_800w.jpg',
  alt: 'Maya at work',
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
export type Project = {
  image: string
  alt: string
  aspect: '16/9' | '4/3'
  category: string
  categoryIcon: string
  title: string
  description: string
}

export const projects: Project[] = [
  {
    image: '/images/f16eab49-7c29-4933-aca8-f41b2c337f6f_800w.jpg',
    alt: 'RAG dashboard',
    aspect: '16/9',
    category: 'RAG Platform',
    categoryIcon: 'Bot',
    title: 'Vector‑backed Retrieval',
    description: 'Hybrid search, chunking, schema‑aware re‑ranking, observability.',
  },
  {
    image: '/images/41f44e91-a4d8-4042-8253-0c6a79be833b_800w.jpg',
    alt: 'Agentic workflow',
    aspect: '4/3',
    category: 'Agents',
    categoryIcon: 'Workflow',
    title: 'Agent Orchestrator',
    description: 'Multi‑tool planning, retries, guardrails, tracing via OpenTelemetry.',
  },
  {
    image: '/images/7fc6a2de-15db-4034-8a23-06b7a43997f6_800w.jpg',
    alt: 'Code copilot',
    aspect: '4/3',
    category: 'Developer UX',
    categoryIcon: 'Code2',
    title: 'Code Copilot',
    description: 'Inline suggestions, context windows, evals, and latency budgets.',
  },
  {
    image: '/images/a2cd53da-e321-41c2-9467-565b1a1b0b52_800w.jpg',
    alt: 'Data pipeline',
    aspect: '16/9',
    category: 'Data Pipeline',
    categoryIcon: 'Database',
    title: 'Real‑time Analytics',
    description: 'Streaming data processing with Apache Kafka and real‑time dashboards.',
  },
  {
    image: '/images/f826149d-7e8d-4b68-a4fd-cc16fb762142_800w.jpg',
    alt: 'ML model',
    aspect: '16/9',
    category: 'Machine Learning',
    categoryIcon: 'Brain',
    title: 'Custom Model Training',
    description: 'Fine‑tuned transformers for domain‑specific tasks with custom datasets.',
  },
  {
    image: '/images/36460156-d7ce-43aa-89af-e013fb87ccfc_800w.jpg',
    alt: 'API system',
    aspect: '4/3',
    category: 'API Architecture',
    categoryIcon: 'Server',
    title: 'Scalable Backend',
    description: 'Microservices architecture with GraphQL, Redis caching, and auto‑scaling.',
  },
]

// ─── TRUSTED BY ───────────────────────────────────────────────────────────────
export const trustedBy = {
  heading: 'Trusted by product teams',
  subheading: 'From seed‑stage startups to enterprise platform groups.',
  logos: [
    { name: 'TechFlow', font: '' },
    { name: 'Nexus Labs', font: 'font-bold font-bricolage' },
    { name: 'DataSync', font: 'font-semibold font-merriweather' },
    { name: 'VisionCorp', font: 'font-normal font-instrument-serif' },
    { name: 'CloudBase', font: 'font-semibold font-playfair' },
    { name: 'InnovateTech', font: '' },
    { name: 'FlowState', font: 'font-bold' },
  ],
}

// ─── TECH STACK ───────────────────────────────────────────────────────────────
export const techStack = {
  frontend: ['TypeScript', 'Next.js 14', 'React 18', 'Tailwind CSS', 'Framer Motion'],
  ai: ['Python 3.11+', 'FastAPI', 'LangChain', 'OpenAI API', 'Claude API', 'vLLM', 'Ollama'],
  focus:
    'RAG optimization, agentic workflows, prompt engineering, model evaluation, and production-ready AI systems with sub-second latency.',
}

// ─── RAG CODE SNIPPET ─────────────────────────────────────────────────────────
export const ragSnippet = `from fastapi import FastAPI
from rag import embed, search, rerank, answer
from tracers import trace

app = FastAPI()

@app.post("/ask")
@trace("ask")
def ask(q: str, user_id: str):
    q_vec = embed(q)
    chunks = search(q_vec, k=20, filters={"user": user_id})
    ranked = rerank(q, chunks)[:6]
    return answer(q, ranked, tools=["browser", "code"], guardrails=True)`

// ─── TIMELINE ────────────────────────────────────────────────────────────────
export type TimelineItem = {
  year: string
  role: string
  description: string
  current?: boolean
}

export const timeline: TimelineItem[] = [
  {
    year: '2025',
    role: 'Independent — AI Engineer',
    description:
      'Building production AI systems, RAG pipelines, and agentic workflows for startups and enterprise teams.',
    current: true,
  },
  {
    year: '2022 — 2024',
    role: 'Senior Product Designer — Analytics',
    description:
      'Led design for data visualization platform, shipped ML-powered insights dashboard used by 10k+ analysts.',
  },
  {
    year: '2017 — 2021',
    role: 'Frontend Engineer — Commerce',
    description:
      'Built responsive e-commerce platform with React/Node.js, optimized for mobile conversion and performance.',
  },
]

// ─── MODEL EVALS ─────────────────────────────────────────────────────────────
export const evals = {
  chartData: [
    { week: 'W1', score: 64 },
    { week: 'W2', score: 68 },
    { week: 'W3', score: 71 },
    { week: 'W4', score: 74 },
    { week: 'W5', score: 78 },
    { week: 'W6', score: 82 },
  ],
  summaryCards: [
    { label: 'Current best', value: '82%', sub: '+4% this week', subColor: 'text-green-400' },
    { label: 'Context win', value: '+10% RAG', sub: 'vs baseline', subColor: 'text-white/50' },
    { label: 'Latency p95', value: '780ms', sub: 'Within SLA', subColor: 'text-yellow-400' },
  ],
  categories: [
    { label: 'Code generation', score: '87%' },
    { label: 'Q&A retrieval', score: '82%' },
    { label: 'Tool usage', score: '76%' },
    { label: 'Reasoning', score: '73%' },
  ],
  recentTests: [
    { name: 'GPT-4o prompt optimization', time: '2 hours ago', color: 'bg-green-400' },
    { name: 'Claude-3.5 tool calling', time: '6 hours ago', color: 'bg-blue-400' },
    { name: 'RAG chunk size A/B test', time: '12 hours ago', color: 'bg-yellow-400' },
  ],
  frameworkStats: '1,247 total tests',
  frameworkDesc:
    'Automated testing pipeline with custom metrics, human feedback loops, and A/B testing. Tracks accuracy, hallucination rates, tool usage effectiveness, and user satisfaction scores across different model versions and prompt templates.',
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
export const about = {
  image: '/images/e636d5f8-9fec-44fe-b4dd-4ccb5a90c3da_1600w.jpg',
  imageAlt: 'Workspace',
  bio: 'I build AI products end‑to‑end: data ingestion, retrieval, prompt/tooling, evals, and production UI. Pragmatic about latency, cost, and safety — with strong attention to developer experience.',
  stats: [
    { value: '8+', label: 'Years' },
    { value: '120+', label: 'Projects' },
    { value: '50+', label: 'Clients' },
  ],
  currentlyLearning:
    'Structured outputs, memory architectures, and low‑latency tool use with vLLM + GPU batching.',
}

// ─── SOCIAL / CONTACT ────────────────────────────────────────────────────────
export const social = {
  twitter: '#',
  github: '#',
  website: '#',
  linkedin: '#',
  bookingUrl: '#',
}

export const footerTagline = 'Build with AI.'
export const footerCredit = 'Maya Chen — Available for freelance & contracts'
