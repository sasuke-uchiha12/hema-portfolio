insert into public.profile (
  id,
  identity,
  hero_stats,
  hero_image,
  about,
  social,
  tech_stack,
  footer_tagline,
  footer_credit
)
values (
  1,
  $${
    "name": "Hemashruthi Durairaj",
    "title": "AI & ML Engineer",
    "tagline": "Pursuing a Master's in Data Science & AI at Universität des Saarlandes. I build intelligent systems — from vision transformers and RAG pipelines to generative AI applications — blending research rigour with hands-on engineering.",
    "email": "hemashruthi1220@gmail.com",
    "resumeUrl": "#",
    "location": "Saarbrücken, Germany",
    "locationSub": "Open to remote & relocation",
    "focus": "Data Science & AI",
    "focusSub": "GenAI, CV, ML research",
    "availability": "Open to opportunities",
    "availabilitySub": "Internships & research roles"
  }$$::jsonb,
  $$[
    { "value": "8.58", "label": "CGPA" },
    { "value": "5+", "label": "projects" },
    { "value": "7+", "label": "certifications" }
  ]$$::jsonb,
  $${ "src": "/images/hema-dp1.jpeg", "alt": "Hemashruthi Durairaj" }$$::jsonb,
  $${
    "image": "/images/e636d5f8-9fec-44fe-b4dd-4ccb5a90c3da_1600w.jpg",
    "imageAlt": "Workspace",
    "bio": "I'm Hemashruthi — an AI and ML enthusiast currently pursuing my Master's in Data Science and AI at Universität des Saarlandes. I'm drawn to research that turns curiosity into impact: vision transformers, generative AI, retrieval-augmented systems, and intelligent applications. I also have a strong creative side — design thinking runs through everything I build.",
    "stats": [
      { "value": "8.58", "label": "CGPA" },
      { "value": "5+", "label": "Projects" },
      { "value": "7+", "label": "Certifications" }
    ],
    "currentlyLearning": "Deep diving into Data Science & AI foundations at Saarland, exploring advanced NLP, diffusion models, and building more intuition around transformer architectures."
  }$$::jsonb,
  $${
    "twitter": "#",
    "github": "https://github.com/Hemashruthi",
    "website": "#",
    "linkedin": "https://www.linkedin.com/in/hemashruthi0712/",
    "bookingUrl": "#"
  }$$::jsonb,
  $${
    "frontend": ["Python", "React.js", "TypeScript", "Vuetify", "GIMP"],
    "ai": ["PyTorch", "Scikit-learn", "Hugging Face", "LangChain", "Generative AI", "RAG", "Vision Transformers", "CNNs / LSTMs"],
    "focus": "Machine learning research, generative AI, retrieval-augmented generation, computer vision with Transformers, and building intelligent end-to-end applications."
  }$$::jsonb,
  'Build with AI.',
  'Hemashruthi Durairaj — Open to internships & research roles'
)
on conflict (id) do update
set identity = excluded.identity,
    hero_stats = excluded.hero_stats,
    hero_image = excluded.hero_image,
    about = excluded.about,
    social = excluded.social,
    tech_stack = excluded.tech_stack,
    footer_tagline = excluded.footer_tagline,
    footer_credit = excluded.footer_credit,
    updated_at = now();

insert into public.projects (
  slug, image, alt, aspect, category, category_icon, title, description, year, details,
  highlights, tech, link, featured, sort_order
)
values
(
  'hiveshield',
  '/images/f16eab49-7c29-4933-aca8-f41b2c337f6f_800w.jpg',
  'HIVESHIELD',
  '16/9',
  'Cybersecurity ML',
  'Shield',
  'HIVESHIELD — DDoS Detection',
  'Swarm-intelligence ML system using MOHADA (hybrid Dragonfly + Bee Colony algorithm) with SVM classifiers to detect and mitigate DDoS attacks in Software-Defined Networks. Simulated in Mininet.',
  'Mar 2024 — Oct 2024',
  'HIVESHIELD is an ML-based solution leveraging advanced swarm intelligence with MOHADA (Multi-Objective Hybrid Artificial Dragonfly Algorithm) — a hybrid feature-selection framework combining the Dragonfly and Artificial Bee Colony algorithms with SVM classifiers to detect and mitigate DDoS attacks. Network simulations in Mininet provided realistic testing and evaluation of the system in a controlled environment, contributing to the application of swarm intelligence in SDN cybersecurity.',
  array['Hybrid MOHADA feature selection (Dragonfly + Artificial Bee Colony)', 'SVM classifiers for DDoS detection and mitigation', 'Realistic network simulation and evaluation in Mininet'],
  array['Python', 'Machine Learning', 'SVM', 'Mininet', 'SDN'],
  'https://github.com/Hemashruthi/Hiveshield',
  true,
  0
),
(
  'vision-transformer',
  '/images/7fc6a2de-15db-4034-8a23-06b7a43997f6_800w.jpg',
  'Vision Transformer',
  '4/3',
  'Computer Vision',
  'Eye',
  'Vision Transformer (ViT)',
  'From-scratch ViT implementation with patch embeddings, multi-head self-attention, and positional encodings applied to CIFAR-10 classification using PyTorch.',
  'Sep 2024 — Oct 2024',
  'A from-scratch Vision Transformer exploring how Transformers — originally designed for NLP — can achieve high performance in computer vision by representing images as sequences of patches. Built and trained on the CIFAR-10 dataset for multiclass image classification.',
  array['Patch embedding mechanism converting images into patch sequences', 'Multi-head self-attention, positional embeddings, and transformer encoder layers', 'Complete ViT architecture applied to CIFAR-10 multiclass classification'],
  array['Python', 'PyTorch', 'Torchvision', 'NumPy', 'CIFAR-10'],
  'https://github.com/Hemashruthi/VisionTransformer-CIFAR10',
  true,
  1
),
(
  'genai-threat-hunting',
  '/images/41f44e91-a4d8-4042-8253-0c6a79be833b_800w.jpg',
  'GenAI Threat Hunting',
  '4/3',
  'Generative AI',
  'Bot',
  'GenAI for Threat Hunting',
  'Integrated Generative AI into the cyber threat hunting pipeline at SETS (Govt. of India), delivering context-rich, explainable threat insights for improved detection.',
  'Jan 2025 — Jul 2025',
  null,
  array[]::text[],
  array['Generative AI', 'LLMs', 'Threat Intelligence'],
  null,
  true,
  2
),
(
  'anpr-face-recognition',
  '/images/a2cd53da-e321-41c2-9467-565b1a1b0b52_800w.jpg',
  'ANPR System',
  '16/9',
  'Computer Vision',
  'Camera',
  'ANPR + Face Recognition',
  'Automatic Number Plate Recognition system integrated with face recognition, built as part of applied GenAI coursework.',
  null,
  null,
  array[]::text[],
  array['Computer Vision', 'Face Recognition', 'Generative AI'],
  null,
  true,
  3
),
(
  'rag-pipeline',
  '/images/f826149d-7e8d-4b68-a4fd-cc16fb762142_800w.jpg',
  'RAG pipeline',
  '16/9',
  'RAG / LLMs',
  'Database',
  'RAG Pipeline Experiments',
  'Hands-on exploration of vector embeddings, hybrid retrieval, chunk strategies, and graph-based RAG for enhanced LLM context retrieval.',
  null,
  null,
  array[]::text[],
  array['RAG', 'Vector Embeddings', 'LLMs'],
  null,
  true,
  4
),
(
  'ngp-websmart',
  '/images/36460156-d7ce-43aa-89af-e013fb87ccfc_800w.jpg',
  'Frontend projects',
  '4/3',
  'Frontend',
  'Code2',
  'Web Development @ NGP Websmart',
  'Built and shipped frontend features using React.js and Vuetify during a 7-month software developer internship.',
  'Jun 2023 — Dec 2023',
  null,
  array[]::text[],
  array['React.js', 'Vuetify', 'JavaScript'],
  null,
  true,
  5
)
on conflict (slug) do update
set image = excluded.image,
    alt = excluded.alt,
    aspect = excluded.aspect,
    category = excluded.category,
    category_icon = excluded.category_icon,
    title = excluded.title,
    description = excluded.description,
    year = excluded.year,
    details = excluded.details,
    highlights = excluded.highlights,
    tech = excluded.tech,
    link = excluded.link,
    featured = excluded.featured,
    sort_order = excluded.sort_order,
    updated_at = now();

insert into public.blog_posts (
  slug, title, excerpt, date, reading_time, tags, cover_image, content, published, sort_order
)
values (
  'building-a-vision-transformer',
  'Building a Vision Transformer from scratch',
  'No timm, no pretrained weights — just attention. What I learned typing out every layer of a ViT and training it on CIFAR-10.',
  'June 12, 2026',
  '5 min read',
  array['Computer Vision', 'PyTorch', 'Deep Learning'],
  null,
  $markdown$When I first read *"An Image is Worth 16x16 Words,"* the idea felt almost too simple to work: take an image, chop it into little squares, pretend each square is a word, and hand the whole thing to a Transformer. No convolutions. No hand-crafted feature maps. Just attention.

So I decided to build one from scratch — no `timm`, no pretrained weights — and train it on CIFAR-10 to actually understand what every line does.

## Why patches?

A Transformer operates on a sequence of tokens. Text gives you that for free: words are already discrete units. Images don't — they're a dense grid of pixels, and feeding 32×32×3 = 3,072 individual pixels as tokens would be hopeless for attention, which scales quadratically with sequence length.

The trick is to **split the image into fixed-size patches** and treat each patch as a token. A 32×32 image with 4×4 patches becomes a neat sequence of 64 tokens — small enough for attention to handle, large enough to carry real structure.

## The patch embedding

The elegant part is that "cut into patches and project each one" is *exactly* what a strided convolution does. One `Conv2d` with `kernel_size = stride = patch_size` gives you patch embedding in a single, fast operation:

```python
class PatchEmbedding(nn.Module):
    def __init__(self, img_size=32, patch_size=4, in_channels=3, embed_dim=128):
        super().__init__()
        self.proj = nn.Conv2d(
            in_channels, embed_dim, patch_size, patch_size
        )
        self.cls_token = nn.Parameter(torch.zeros(1, 1, embed_dim))

    def forward(self, x):
        x = self.proj(x).flatten(2).transpose(1, 2)
        cls = self.cls_token.expand(x.shape[0], -1, -1)
        return torch.cat([cls, x], dim=1)
```

That `cls_token` is a learnable vector prepended to the sequence. After all the attention layers, its final state becomes the summary we classify from — a neat idea borrowed straight from BERT.

## Attention is the whole game

Once you have a sequence of patch embeddings, the rest is a standard Transformer encoder. The pieces I implemented, in order:

- **Positional embeddings** — attention is permutation-invariant, so without these the model has no idea *where* each patch came from.
- **Multi-head self-attention** — every patch gets to look at every other patch and decide what's relevant.
- **MLP blocks with residual connections** — the per-token processing between attention layers.
- **A classification head** — a single linear layer on the final `cls_token`.

> The thing that surprised me most: a from-scratch ViT *underperforms* a small CNN on CIFAR-10 unless you add heavy augmentation. Transformers have almost no built-in inductive bias about images, so they need far more data — or clever tricks — to catch up.

## What I actually learned

Building it by hand made two things click that no diagram ever did. First, **the CNN and the Transformer aren't opposites** — the patch embedding *is* a convolution, so a ViT is really "one conv layer, then pure attention." Second, **inductive bias is a real, tangible tradeoff**: CNNs bake in locality and translation-invariance for free, and when you throw that away, the data has to teach it back.

If you're learning this stuff, I'd genuinely recommend skipping the library wrapper once and typing out every layer. The paper stops being abstract the moment your own `forward()` runs.
$markdown$,
  true,
  0
)
on conflict (slug) do update
set title = excluded.title,
    excerpt = excluded.excerpt,
    date = excluded.date,
    reading_time = excluded.reading_time,
    tags = excluded.tags,
    cover_image = excluded.cover_image,
    content = excluded.content,
    published = excluded.published,
    sort_order = excluded.sort_order,
    updated_at = now();

insert into public.experience (year, role, description, type, current, sort_order)
values
('Oct 2025 — present', 'Master''s — Data Science & AI', 'Pursuing M.Sc. in Data Science and Artificial Intelligence at Universität des Saarlandes, Germany — one of Europe''s leading AI research hubs (CISPA, DFKI, MPI).', 'education', true, 0),
('Jan 2025 — Jul 2025', 'Project Intern — SETS, Govt. of India', 'Integrated Generative AI into cyber threat hunting at SETS-STARS program. Delivered context-rich, explainable threat insights under Scientist-C guidance.', 'work', false, 1),
('Feb 2024 — Sep 2024', 'Research Intern — CEG / Anna University', 'Engineered HIVESHIELD in the RCC Lab under Prof. Dr. K. Murugan — a DDoS detection system using Swarm Intelligence ML in Software-Defined Networking.', 'work', false, 2),
('Jun 2023 — Dec 2023', 'Software Developer Intern — NGP Websmart', 'Built and delivered frontend features with React.js and Vuetify in a 7-month internship at NGP Websmart Pvt. Ltd., Chennai.', 'work', false, 3),
('2020 — Jun 2025', 'Master of Science — Information Technology', 'Completed an M.S. in Information Technology at College of Engineering, Guindy, Anna University — graduating with a CGPA of 8.58.', 'education', false, 4)
on conflict (year, role) do update
set description = excluded.description,
    type = excluded.type,
    current = excluded.current,
    sort_order = excluded.sort_order,
    updated_at = now();

insert into public.certifications (title, issuer, date, url, sort_order)
values
('CS50''s Introduction to Artificial Intelligence with Python', 'edX (Harvard University)', 'Dec 2024', 'https://courses.edx.org/certificates/f793bbdacf4a4135b923eaa858045413', 0),
('Supervised Machine Learning: Regression and Classification', 'DeepLearning.AI · Stanford Online', 'Oct 2024', 'https://www.coursera.org/account/accomplishments/verify/9X1Z8ZDNUBPX', 1),
('AI & Cloud Conference 2024', 'TechXConf', 'Nov 2024', 'https://badge.techxconf.com/badge/15D1FC9D-41F4-4F49-9CD9-44A3DD048381', 2),
('IBM Z Day 2024 — AI & Data Certificate', 'BeMyApp', 'Oct 2024', 'https://www.virtualbadge.io/certificate-validator?credential=2f53ccd6-2782-4735-89d6-6e63927a517c', 3),
('AI For Everyone', 'DeepLearning.AI', 'Sep 2024', 'https://www.coursera.org/account/accomplishments/verify/J4GHYNXKKD24', 4),
('NextGen Intelli: Generative AI', 'College of Engineering, Guindy', 'Mar 2024', null, 5),
('Python Programming for AI & Data Science', 'Anna University Chennai', 'Dec 2022', null, 6)
on conflict (title, issuer) do update
set date = excluded.date,
    url = excluded.url,
    sort_order = excluded.sort_order,
    updated_at = now();
