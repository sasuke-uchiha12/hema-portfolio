export type Identity = {
  name: string
  title: string
  tagline: string
  email: string
  resumeUrl: string
  location: string
  locationSub: string
  focus: string
  focusSub: string
  availability: string
  availabilitySub: string
}

export type Stat = {
  value: string
  label: string
}

export type HeroImage = {
  src: string
  alt: string
}

export type Project = {
  id?: string
  slug: string
  image?: string
  alt: string
  aspect: '16/9' | '4/3'
  category: string
  categoryIcon: string
  title: string
  description: string
  year?: string
  details?: string
  highlights?: string[]
  tech?: string[]
  link?: string
  featured?: boolean
}

export type TechStack = {
  frontend: string[]
  ai: string[]
  focus: string
}

export type TimelineItem = {
  id?: string
  year: string
  role: string
  description: string
  type: 'education' | 'work'
  current?: boolean
}

export type Certification = {
  id?: string
  title: string
  issuer: string
  date: string
  url?: string
}

export type About = {
  image: string
  imageAlt: string
  bio: string
  stats: Stat[]
  currentlyLearning: string
}

export type Social = {
  twitter: string
  github: string
  website: string
  linkedin: string
  bookingUrl: string
}

export type BlogPost = {
  id?: string
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  tags: string[]
  coverImage?: string
  content: string
  published?: boolean
}

export type Profile = {
  identity: Identity
  heroStats: Stat[]
  heroImage: HeroImage
  about: About
  social: Social
  techStack: TechStack
  footerTagline: string
  footerCredit: string
}
