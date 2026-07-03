import { supabase } from './supabase'
import {
  blogPosts as fallbackBlogPosts,
  certifications as fallbackCertifications,
  profile as fallbackProfile,
  projects as fallbackProjects,
  timeline as fallbackExperience,
} from '../data/content'
import type { BlogPost, Certification, Profile, Project, TimelineItem } from '../types'

type ProjectRow = {
  id?: string
  slug: string
  image: string | null
  alt: string
  aspect: '16/9' | '4/3'
  category: string
  category_icon: string
  title: string
  description: string
  year: string | null
  details: string | null
  highlights: string[] | null
  tech: string[] | null
  link: string | null
  featured: boolean | null
  sort_order: number | null
}

type BlogPostRow = {
  id?: string
  slug: string
  title: string
  excerpt: string
  date: string
  reading_time: string
  tags: string[] | null
  cover_image: string | null
  content: string
  published: boolean | null
  sort_order: number | null
}

type ExperienceRow = {
  id?: string
  year: string
  role: string
  description: string
  type: 'education' | 'work'
  current: boolean | null
  sort_order: number | null
}

type CertificationRow = {
  id?: string
  title: string
  issuer: string
  date: string
  url: string | null
  sort_order: number | null
}

type ProfileRow = {
  identity: Profile['identity']
  hero_stats: Profile['heroStats']
  hero_image: Profile['heroImage']
  about: Profile['about']
  social: Profile['social']
  tech_stack: Profile['techStack']
  footer_tagline: string
  footer_credit: string
}

export const fallbackData = {
  profile: fallbackProfile,
  projects: fallbackProjects,
  blogPosts: fallbackBlogPosts.map((post) => ({ ...post, published: true })),
  experience: fallbackExperience,
  certifications: fallbackCertifications,
}

function requireClient() {
  if (!supabase) {
    return null
  }
  return supabase
}

function throwIfError(error: { message: string } | null) {
  if (error) {
    throw new Error(error.message)
  }
}

export function projectToRow(project: Project, sortOrder = 0): Omit<ProjectRow, 'id'> {
  return {
    slug: project.slug,
    image: project.image ?? null,
    alt: project.alt,
    aspect: project.aspect,
    category: project.category,
    category_icon: project.categoryIcon,
    title: project.title,
    description: project.description,
    year: project.year ?? null,
    details: project.details ?? null,
    highlights: project.highlights ?? [],
    tech: project.tech ?? [],
    link: project.link ?? null,
    featured: Boolean(project.featured),
    sort_order: sortOrder,
  }
}

export function projectFromRow(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    image: row.image ?? undefined,
    alt: row.alt,
    aspect: row.aspect,
    category: row.category,
    categoryIcon: row.category_icon,
    title: row.title,
    description: row.description,
    year: row.year ?? undefined,
    details: row.details ?? undefined,
    highlights: row.highlights ?? [],
    tech: row.tech ?? [],
    link: row.link ?? undefined,
    featured: Boolean(row.featured),
  }
}

export function blogPostToRow(post: BlogPost, sortOrder = 0): Omit<BlogPostRow, 'id'> {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    reading_time: post.readingTime,
    tags: post.tags,
    cover_image: post.coverImage ?? null,
    content: post.content,
    published: post.published ?? true,
    sort_order: sortOrder,
  }
}

export function blogPostFromRow(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date,
    readingTime: row.reading_time,
    tags: row.tags ?? [],
    coverImage: row.cover_image ?? undefined,
    content: row.content,
    published: row.published ?? true,
  }
}

export function experienceToRow(item: TimelineItem, sortOrder = 0): Omit<ExperienceRow, 'id'> {
  return {
    year: item.year,
    role: item.role,
    description: item.description,
    type: item.type,
    current: Boolean(item.current),
    sort_order: sortOrder,
  }
}

export function experienceFromRow(row: ExperienceRow): TimelineItem {
  return {
    id: row.id,
    year: row.year,
    role: row.role,
    description: row.description,
    type: row.type,
    current: Boolean(row.current),
  }
}

export function certificationToRow(
  item: Certification,
  sortOrder = 0,
): Omit<CertificationRow, 'id'> {
  return {
    title: item.title,
    issuer: item.issuer,
    date: item.date,
    url: item.url ?? null,
    sort_order: sortOrder,
  }
}

export function certificationFromRow(row: CertificationRow): Certification {
  return {
    id: row.id,
    title: row.title,
    issuer: row.issuer,
    date: row.date,
    url: row.url ?? undefined,
  }
}

export function profileToRow(profile: Profile): ProfileRow {
  return {
    identity: profile.identity,
    hero_stats: profile.heroStats,
    hero_image: profile.heroImage,
    about: profile.about,
    social: profile.social,
    tech_stack: profile.techStack,
    footer_tagline: profile.footerTagline,
    footer_credit: profile.footerCredit,
  }
}

export function profileFromRow(row: ProfileRow): Profile {
  return {
    identity: row.identity,
    heroStats: row.hero_stats,
    heroImage: row.hero_image,
    about: row.about,
    social: row.social,
    techStack: row.tech_stack,
    footerTagline: row.footer_tagline,
    footerCredit: row.footer_credit,
  }
}

export async function getProfile(): Promise<Profile> {
  const client = requireClient()
  if (!client) return fallbackData.profile

  const { data, error } = await client.from('profile').select('*').eq('id', 1).single()
  throwIfError(error)
  return profileFromRow(data as ProfileRow)
}

export async function getProjects(): Promise<Project[]> {
  const client = requireClient()
  if (!client) return fallbackData.projects

  const { data, error } = await client.from('projects').select('*').order('sort_order')
  throwIfError(error)
  return ((data ?? []) as ProjectRow[]).map(projectFromRow)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const client = requireClient()
  if (!client) return fallbackData.projects.filter((project) => project.featured)

  const { data, error } = await client
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('sort_order')
  throwIfError(error)
  return ((data ?? []) as ProjectRow[]).map(projectFromRow)
}

export async function getProject(slug: string): Promise<Project | null> {
  const client = requireClient()
  if (!client) return fallbackData.projects.find((project) => project.slug === slug) ?? null

  const { data, error } = await client.from('projects').select('*').eq('slug', slug).maybeSingle()
  throwIfError(error)
  return data ? projectFromRow(data as ProjectRow) : null
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const client = requireClient()
  if (!client) return fallbackData.blogPosts

  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('sort_order')
  throwIfError(error)
  return ((data ?? []) as BlogPostRow[]).map(blogPostFromRow)
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const client = requireClient()
  if (!client) return fallbackData.blogPosts.find((post) => post.slug === slug) ?? null

  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()
  throwIfError(error)
  return data ? blogPostFromRow(data as BlogPostRow) : null
}

export async function getExperience(): Promise<TimelineItem[]> {
  const client = requireClient()
  if (!client) return fallbackData.experience

  const { data, error } = await client.from('experience').select('*').order('sort_order')
  throwIfError(error)
  return ((data ?? []) as ExperienceRow[]).map(experienceFromRow)
}

export async function getCertifications(): Promise<Certification[]> {
  const client = requireClient()
  if (!client) return fallbackData.certifications

  const { data, error } = await client.from('certifications').select('*').order('sort_order')
  throwIfError(error)
  return ((data ?? []) as CertificationRow[]).map(certificationFromRow)
}

export async function getAdminBlogPost(slug: string): Promise<BlogPost | null> {
  const client = requireClient()
  if (!client) return fallbackData.blogPosts.find((post) => post.slug === slug) ?? null

  const { data, error } = await client.from('blog_posts').select('*').eq('slug', slug).maybeSingle()
  throwIfError(error)
  return data ? blogPostFromRow(data as BlogPostRow) : null
}
