import vitPost from '../content/blog/building-a-vision-transformer.md?raw'

// ─── IDENTITY ────────────────────────────────────────────────────────────────
export const identity = {
  name: 'Hemashruthi Durairaj',
  title: 'AI & ML Engineer',
  tagline:
    'Pursuing a Master\'s in Data Science & AI at Universität des Saarlandes. I build intelligent systems — from vision transformers and RAG pipelines to generative AI applications — blending research rigour with hands-on engineering.',
  email: 'hemashruthi1220@gmail.com',
  resumeUrl: '#',
  location: 'Saarbrücken, Germany',
  locationSub: 'Open to remote & relocation',
  focus: 'Data Science & AI',
  focusSub: 'GenAI, CV, ML research',
  availability: 'Open to opportunities',
  availabilitySub: 'Internships & research roles',
}

// ─── HERO STATS (overlay on photo) ───────────────────────────────────────────
export const heroStats = [
  { value: '8.58', label: 'CGPA' },
  { value: '5+', label: 'projects' },
  { value: '7+', label: 'certifications' },
]

// ─── HERO PHOTO ───────────────────────────────────────────────────────────────
// TODO: Replace with Hema's actual photo
export const heroImage = {
  src: '/images/hema-dp1.jpeg',
  alt: 'Hemashruthi Durairaj',
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
export type Project = {
  slug: string
  // Real screenshot or architecture diagram. Optional — cards/detail pages
  // fall back to a clean monochrome placeholder until a real image is added.
  image?: string
  alt: string
  aspect: '16/9' | '4/3'
  category: string
  categoryIcon: string
  title: string
  description: string
  year?: string
  // Longer case-study write-up shown on the project detail page.
  details?: string
  highlights?: string[]
  tech?: string[]
  link?: string
  // Shown on the homepage Recent Work section. All projects (featured or
  // not) always appear on the full /projects page.
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'hiveshield',
    image: '/images/f16eab49-7c29-4933-aca8-f41b2c337f6f_800w.jpg',
    alt: 'HIVESHIELD',
    aspect: '16/9',
    category: 'Cybersecurity ML',
    categoryIcon: 'Shield',
    title: 'HIVESHIELD — DDoS Detection',
    description:
      'Swarm-intelligence ML system using MOHADA (hybrid Dragonfly + Bee Colony algorithm) with SVM classifiers to detect and mitigate DDoS attacks in Software-Defined Networks. Simulated in Mininet.',
    year: 'Mar 2024 — Oct 2024',
    details:
      'HIVESHIELD is an ML-based solution leveraging advanced swarm intelligence with MOHADA (Multi-Objective Hybrid Artificial Dragonfly Algorithm) — a hybrid feature-selection framework combining the Dragonfly and Artificial Bee Colony algorithms with SVM classifiers to detect and mitigate DDoS attacks. Network simulations in Mininet provided realistic testing and evaluation of the system in a controlled environment, contributing to the application of swarm intelligence in SDN cybersecurity.',
    highlights: [
      'Hybrid MOHADA feature selection (Dragonfly + Artificial Bee Colony)',
      'SVM classifiers for DDoS detection and mitigation',
      'Realistic network simulation and evaluation in Mininet',
    ],
    tech: ['Python', 'Machine Learning', 'SVM', 'Mininet', 'SDN'],
    link: 'https://github.com/Hemashruthi/Hiveshield',
    featured: true,
  },
  {
    slug: 'vision-transformer',
    image: '/images/7fc6a2de-15db-4034-8a23-06b7a43997f6_800w.jpg',
    alt: 'Vision Transformer',
    aspect: '4/3',
    category: 'Computer Vision',
    categoryIcon: 'Eye',
    title: 'Vision Transformer (ViT)',
    description:
      'From-scratch ViT implementation with patch embeddings, multi-head self-attention, and positional encodings applied to CIFAR-10 classification using PyTorch.',
    year: 'Sep 2024 — Oct 2024',
    details:
      'A from-scratch Vision Transformer exploring how Transformers — originally designed for NLP — can achieve high performance in computer vision by representing images as sequences of patches. Built and trained on the CIFAR-10 dataset for multiclass image classification.',
    highlights: [
      'Patch embedding mechanism converting images into patch sequences',
      'Multi-head self-attention, positional embeddings, and transformer encoder layers',
      'Complete ViT architecture applied to CIFAR-10 multiclass classification',
    ],
    tech: ['Python', 'PyTorch', 'Torchvision', 'NumPy', 'CIFAR-10'],
    link: 'https://github.com/Hemashruthi/VisionTransformer-CIFAR10',
    featured: true,
  },
  {
    slug: 'genai-threat-hunting',
    image: '/images/41f44e91-a4d8-4042-8253-0c6a79be833b_800w.jpg',
    alt: 'GenAI Threat Hunting',
    aspect: '4/3',
    category: 'Generative AI',
    categoryIcon: 'Bot',
    title: 'GenAI for Threat Hunting',
    description:
      'Integrated Generative AI into the cyber threat hunting pipeline at SETS (Govt. of India), delivering context-rich, explainable threat insights for improved detection.',
    year: 'Jan 2025 — Jul 2025',
    tech: ['Generative AI', 'LLMs', 'Threat Intelligence'],
    featured: true,
  },
  {
    slug: 'anpr-face-recognition',
    image: '/images/a2cd53da-e321-41c2-9467-565b1a1b0b52_800w.jpg',
    alt: 'ANPR System',
    aspect: '16/9',
    category: 'Computer Vision',
    categoryIcon: 'Camera',
    title: 'ANPR + Face Recognition',
    description:
      'Automatic Number Plate Recognition system integrated with face recognition, built as part of applied GenAI coursework.',
    tech: ['Computer Vision', 'Face Recognition', 'Generative AI'],
    featured: true,
  },
  {
    slug: 'rag-pipeline',
    image: '/images/f826149d-7e8d-4b68-a4fd-cc16fb762142_800w.jpg',
    alt: 'RAG pipeline',
    aspect: '16/9',
    category: 'RAG / LLMs',
    categoryIcon: 'Database',
    title: 'RAG Pipeline Experiments',
    description:
      'Hands-on exploration of vector embeddings, hybrid retrieval, chunk strategies, and graph-based RAG for enhanced LLM context retrieval.',
    tech: ['RAG', 'Vector Embeddings', 'LLMs'],
    featured: true,
  },
  {
    slug: 'ngp-websmart',
    image: '/images/36460156-d7ce-43aa-89af-e013fb87ccfc_800w.jpg',
    alt: 'Frontend projects',
    aspect: '4/3',
    category: 'Frontend',
    categoryIcon: 'Code2',
    title: 'Web Development @ NGP Websmart',
    description:
      'Built and shipped frontend features using React.js and Vuetify during a 7-month software developer internship.',
    year: 'Jun 2023 — Dec 2023',
    tech: ['React.js', 'Vuetify', 'JavaScript'],
    featured: true,
  },
]

// ─── AFFILIATED WITH ──────────────────────────────────────────────────────────
export const trustedBy = {
  heading: 'Affiliated With',
  subheading: 'Research labs, universities, and government organisations.',
  logos: [
    { name: 'Univ. des Saarlandes', font: '' },
    { name: 'SETS — Govt. of India', font: 'font-semibold' },
    { name: 'Anna University', font: '' },
    { name: 'CEG Tech Forum', font: 'font-bold' },
    { name: 'IIT Madras', font: 'font-semibold' },
    { name: 'NGP Websmart', font: '' },
    { name: 'NCC Naval Wing', font: 'font-semibold' },
  ],
}

// ─── TECH STACK ───────────────────────────────────────────────────────────────
export const techStack = {
  frontend: ['Python', 'React.js', 'TypeScript', 'Vuetify', 'GIMP'],
  ai: [
    'PyTorch',
    'Scikit-learn',
    'Hugging Face',
    'LangChain',
    'Generative AI',
    'RAG',
    'Vision Transformers',
    'CNNs / LSTMs',
  ],
  focus:
    'Machine learning research, generative AI, retrieval-augmented generation, computer vision with Transformers, and building intelligent end-to-end applications.',
}

// ─── TIMELINE ────────────────────────────────────────────────────────────────
export type TimelineItem = {
  year: string
  role: string
  description: string
  type: 'education' | 'work'
  current?: boolean
}

export const timeline: TimelineItem[] = [
  {
    year: 'Oct 2025 — present',
    role: "Master's — Data Science & AI",
    description:
      'Pursuing M.Sc. in Data Science and Artificial Intelligence at Universität des Saarlandes, Germany — one of Europe\'s leading AI research hubs (CISPA, DFKI, MPI).',
    type: 'education',
    current: true,
  },
  {
    year: 'Jan 2025 — Jul 2025',
    role: 'Project Intern — SETS, Govt. of India',
    description:
      'Integrated Generative AI into cyber threat hunting at SETS-STARS program. Delivered context-rich, explainable threat insights under Scientist-C guidance.',
    type: 'work',
  },
  {
    year: 'Feb 2024 — Sep 2024',
    role: 'Research Intern — CEG / Anna University',
    description:
      'Engineered HIVESHIELD in the RCC Lab under Prof. Dr. K. Murugan — a DDoS detection system using Swarm Intelligence ML in Software-Defined Networking.',
    type: 'work',
  },
  {
    year: 'Jun 2023 — Dec 2023',
    role: 'Software Developer Intern — NGP Websmart',
    description:
      'Built and delivered frontend features with React.js and Vuetify in a 7-month internship at NGP Websmart Pvt. Ltd., Chennai.',
    type: 'work',
  },
  {
    year: '2020 — Jun 2025',
    role: 'Master of Science — Information Technology',
    description:
      'Completed an M.S. in Information Technology at College of Engineering, Guindy, Anna University — graduating with a CGPA of 8.58.',
    type: 'education',
  },
]

// ─── CERTIFICATIONS ──────────────────────────────────────────────────────────
export type Certification = {
  title: string
  issuer: string
  date: string
  url?: string
}

export const certifications: Certification[] = [
  {
    title: "CS50's Introduction to Artificial Intelligence with Python",
    issuer: 'edX (Harvard University)',
    date: 'Dec 2024',
    url: 'https://courses.edx.org/certificates/f793bbdacf4a4135b923eaa858045413',
  },
  {
    title: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'DeepLearning.AI · Stanford Online',
    date: 'Oct 2024',
    url: 'https://www.coursera.org/account/accomplishments/verify/9X1Z8ZDNUBPX',
  },
  {
    title: 'AI & Cloud Conference 2024',
    issuer: 'TechXConf',
    date: 'Nov 2024',
    url: 'https://badge.techxconf.com/badge/15D1FC9D-41F4-4F49-9CD9-44A3DD048381',
  },
  {
    title: 'IBM Z Day 2024 — AI & Data Certificate',
    issuer: 'BeMyApp',
    date: 'Oct 2024',
    url: 'https://www.virtualbadge.io/certificate-validator?credential=2f53ccd6-2782-4735-89d6-6e63927a517c',
  },
  {
    title: 'AI For Everyone',
    issuer: 'DeepLearning.AI',
    date: 'Sep 2024',
    url: 'https://www.coursera.org/account/accomplishments/verify/J4GHYNXKKD24',
  },
  {
    title: 'NextGen Intelli: Generative AI',
    issuer: 'College of Engineering, Guindy',
    date: 'Mar 2024',
  },
  {
    title: 'Python Programming for AI & Data Science',
    issuer: 'Anna University Chennai',
    date: 'Dec 2022',
  },
]

// ─── MODEL EVALS / RESEARCH METRICS ──────────────────────────────────────────
export const evals = {
  chartData: [
    { week: 'M1', score: 62 },
    { week: 'M2', score: 67 },
    { week: 'M3', score: 72 },
    { week: 'M4', score: 76 },
    { week: 'M5', score: 80 },
    { week: 'M6', score: 85 },
  ],
  summaryCards: [
    { label: 'Best accuracy', value: '85%', sub: 'HIVESHIELD DDoS', subColor: 'text-green-400' },
    { label: 'ViT CIFAR-10', value: 'Top-5', subColor: 'text-white/50', sub: 'classification' },
    { label: 'CGPA', value: '8.58', sub: 'MS — CEG', subColor: 'text-yellow-400' },
  ],
  categories: [
    { label: 'Machine Learning', score: '87%' },
    { label: 'Computer Vision', score: '82%' },
    { label: 'Generative AI', score: '79%' },
    { label: 'Cybersecurity', score: '75%' },
  ],
  recentTests: [
    { name: 'HIVESHIELD — DDoS detection eval', time: 'Oct 2024', color: 'bg-green-400' },
    { name: 'ViT CIFAR-10 classification', time: 'Oct 2024', color: 'bg-blue-400' },
    { name: 'GenAI threat hunting pipeline', time: 'Jul 2025', color: 'bg-yellow-400' },
  ],
  frameworkStats: '5+ projects',
  frameworkDesc:
    'Research spanning swarm intelligence, vision transformers, and generative AI for cybersecurity. Coursework-certified through HarvardX CS50 AI, TechXConf 2024, and a 5-day NextGen Intelli GenAI workshop covering GANs, LLMs, RAG, and fine-tuning.',
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
export const about = {
  image: '/images/e636d5f8-9fec-44fe-b4dd-4ccb5a90c3da_1600w.jpg',
  imageAlt: 'Workspace',
  bio: "I'm Hemashruthi — an AI and ML enthusiast currently pursuing my Master's in Data Science and AI at Universität des Saarlandes. I'm drawn to research that turns curiosity into impact: vision transformers, generative AI, retrieval-augmented systems, and intelligent applications. I also have a strong creative side — design thinking runs through everything I build.",
  stats: [
    { value: '8.58', label: 'CGPA' },
    { value: '5+', label: 'Projects' },
    { value: '7+', label: 'Certifications' },
  ],
  currentlyLearning:
    'Deep diving into Data Science & AI foundations at Saarland, exploring advanced NLP, diffusion models, and building more intuition around transformer architectures.',
}

// ─── SOCIAL / CONTACT ────────────────────────────────────────────────────────
export const social = {
  twitter: '#',
  github: 'https://github.com/Hemashruthi',
  website: '#',
  linkedin: 'https://www.linkedin.com/in/hemashruthi0712/',
  bookingUrl: '#',
}

export const footerTagline = 'Build with AI.'
export const footerCredit = 'Hemashruthi Durairaj — Open to internships & research roles'

// ─── BLOG ────────────────────────────────────────────────────────────────────
// NOTE: mock content for now. Maps 1:1 to a future Supabase `blog_posts` table:
// slug, title, excerpt, date, readingTime, tags, coverImage, content (markdown).
export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  tags: string[]
  coverImage?: string
  content: string // markdown
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-a-vision-transformer',
    title: 'Building a Vision Transformer from scratch',
    excerpt:
      'No timm, no pretrained weights — just attention. What I learned typing out every layer of a ViT and training it on CIFAR-10.',
    date: 'June 12, 2026',
    readingTime: '5 min read',
    tags: ['Computer Vision', 'PyTorch', 'Deep Learning'],
    content: vitPost,
  },
]
