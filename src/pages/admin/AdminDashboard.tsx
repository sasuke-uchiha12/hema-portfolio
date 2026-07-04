import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ImageUp, LogOut, Plus, Save, Trash2 } from 'lucide-react'
import Markdown from '../../components/Markdown'
import {
  blogPostFromRow,
  blogPostToRow,
  certificationToRow,
  experienceToRow,
  getCertifications,
  getExperience,
  getProfile,
  getProjects,
  profileToRow,
  projectToRow,
} from '../../lib/api'
import { isSupabaseConfigured, supabase } from '../../lib/supabase'
import type { BlogPost, Certification, Profile, Project, TimelineItem } from '../../types'

const emptyProject: Project = {
  slug: '',
  image: '',
  alt: '',
  aspect: '16/9',
  category: '',
  categoryIcon: 'Bot',
  title: '',
  description: '',
  year: '',
  details: '',
  highlights: [],
  tech: [],
  link: '',
  featured: false,
}

const emptyPost: BlogPost = {
  slug: '',
  title: '',
  excerpt: '',
  date: '',
  readingTime: '',
  tags: [],
  coverImage: '',
  content: '',
  published: true,
}

const emptyExperience: TimelineItem = {
  year: '',
  role: '',
  description: '',
  type: 'work',
  current: false,
}

const emptyCertification: Certification = {
  title: '',
  issuer: '',
  date: '',
  url: '',
}

function listToText(items?: string[]) {
  return (items ?? []).join('\n')
}

function textToList(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function fieldValue(value: string | undefined) {
  return value ?? ''
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
}) {
  return (
    <label className="block text-xs uppercase tracking-widest text-white/40">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm normal-case tracking-normal text-white outline-none focus:border-white/30"
      />
    </label>
  )
}

function Textarea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  rows?: number
}) {
  return (
    <label className="block text-xs uppercase tracking-widest text-white/40">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm normal-case tracking-normal text-white outline-none focus:border-white/30"
      />
    </label>
  )
}

function ImageUpload({
  folder,
  onUploaded,
}: {
  folder: string
  onUploaded: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)

  async function upload(file: File) {
    if (!supabase) return

    setUploading(true)
    const safeName = file.name.replace(/[^a-z0-9_.-]/gi, '-').toLowerCase()
    const path = `${folder}/${crypto.randomUUID()}-${safeName}`
    const { error } = await supabase.storage.from('images').upload(path, file)
    setUploading(false)

    if (error) {
      window.alert(error.message)
      return
    }

    const { data } = supabase.storage.from('images').getPublicUrl(path)
    onUploaded(data.publicUrl)
  }

  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-white/70 hover:bg-white/[0.1]">
      <ImageUp className="h-4 w-4" />
      <span>{uploading ? 'Uploading...' : 'Upload image'}</span>
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) void upload(file)
        }}
      />
    </label>
  )
}

function Toolbar({
  onSave,
  onDelete,
  canDelete,
}: {
  onSave: () => void
  onDelete?: () => void
  canDelete?: boolean
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onSave}
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-white/90"
      >
        <Save className="h-4 w-4" />
        <span>Save</span>
      </button>
      {onDelete && canDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-400/10 px-4 py-2 text-sm text-red-200 hover:bg-red-400/15"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </button>
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [profile, setProfile] = useState<Profile | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [projectForm, setProjectForm] = useState<Project>(emptyProject)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [postForm, setPostForm] = useState<BlogPost>(emptyPost)
  const [experience, setExperience] = useState<TimelineItem[]>([])
  const [experienceForm, setExperienceForm] = useState<TimelineItem>(emptyExperience)
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [certificationForm, setCertificationForm] = useState<Certification>(emptyCertification)

  const sortedProjects = useMemo(() => projects, [projects])

  async function loadData() {
    if (!supabase) return

    setLoading(true)
    setMessage(null)
    try {
      const [profileData, projectData, experienceData, certificationData] = await Promise.all([
        getProfile(),
        getProjects(),
        getExperience(),
        getCertifications(),
      ])
      const { data: allPosts, error: postsError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('sort_order')

      if (postsError) throw postsError

      setProfile(profileData)
      setProjects(projectData)
      setProjectForm(projectData[0] ?? emptyProject)
      setPosts((allPosts ?? []).map((row) => blogPostFromRow(row as never)))
      setPostForm(allPosts?.[0] ? blogPostFromRow(allPosts[0] as never) : emptyPost)
      setExperience(experienceData)
      setExperienceForm(experienceData[0] ?? emptyExperience)
      setCertifications(certificationData)
      setCertificationForm(certificationData[0] ?? emptyCertification)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not load admin data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!supabase) {
      setChecking(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      const hasSession = Boolean(data.session)
      setAuthenticated(hasSession)
      setChecking(false)
      if (hasSession) void loadData()
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(Boolean(session))
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  async function saveProfile() {
    if (!supabase || !profile) return
    const { error } = await supabase.from('profile').upsert({ id: 1, ...profileToRow(profile) })
    setMessage(error ? error.message : 'Profile saved.')
  }

  async function saveProject() {
    if (!supabase) return
    const payload = projectToRow(projectForm, projects.findIndex((item) => item.id === projectForm.id))
    const result = projectForm.id
      ? await supabase.from('projects').update(payload).eq('id', projectForm.id)
      : await supabase.from('projects').insert(payload)
    setMessage(result.error ? result.error.message : 'Project saved.')
    if (!result.error) void loadData()
  }

  async function deleteProject() {
    if (!supabase || !projectForm.id) return
    const { error } = await supabase.from('projects').delete().eq('id', projectForm.id)
    setMessage(error ? error.message : 'Project deleted.')
    if (!error) void loadData()
  }

  async function savePost() {
    if (!supabase) return
    const payload = blogPostToRow(postForm, posts.findIndex((item) => item.id === postForm.id))
    const result = postForm.id
      ? await supabase.from('blog_posts').update(payload).eq('id', postForm.id)
      : await supabase.from('blog_posts').insert(payload)
    setMessage(result.error ? result.error.message : 'Blog post saved.')
    if (!result.error) void loadData()
  }

  async function deletePost() {
    if (!supabase || !postForm.id) return
    const { error } = await supabase.from('blog_posts').delete().eq('id', postForm.id)
    setMessage(error ? error.message : 'Blog post deleted.')
    if (!error) void loadData()
  }

  async function saveExperience() {
    if (!supabase) return
    const payload = experienceToRow(
      experienceForm,
      experience.findIndex((item) => item.id === experienceForm.id),
    )
    const result = experienceForm.id
      ? await supabase.from('experience').update(payload).eq('id', experienceForm.id)
      : await supabase.from('experience').insert(payload)
    setMessage(result.error ? result.error.message : 'Experience saved.')
    if (!result.error) void loadData()
  }

  async function deleteExperience() {
    if (!supabase || !experienceForm.id) return
    const { error } = await supabase.from('experience').delete().eq('id', experienceForm.id)
    setMessage(error ? error.message : 'Experience deleted.')
    if (!error) void loadData()
  }

  async function saveCertification() {
    if (!supabase) return
    const payload = certificationToRow(
      certificationForm,
      certifications.findIndex((item) => item.id === certificationForm.id),
    )
    const result = certificationForm.id
      ? await supabase.from('certifications').update(payload).eq('id', certificationForm.id)
      : await supabase.from('certifications').insert(payload)
    setMessage(result.error ? result.error.message : 'Certification saved.')
    if (!result.error) void loadData()
  }

  async function deleteCertification() {
    if (!supabase || !certificationForm.id) return
    const { error } = await supabase.from('certifications').delete().eq('id', certificationForm.id)
    setMessage(error ? error.message : 'Certification deleted.')
    if (!error) void loadData()
  }

  if (!isSupabaseConfigured) {
    return <Navigate to="/admin/login" replace />
  }

  if (checking) return null
  if (!authenticated) return <Navigate to="/admin/login" replace />

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-2xl tracking-tight text-white">Portfolio Admin</h1>
            <p className="mt-1 text-sm text-white/50">Edit content stored in Supabase.</p>
          </div>
          <button
            type="button"
            onClick={() => void signOut()}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/70 hover:bg-white/[0.1]"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </header>

        {message && (
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70">
            {message}
          </div>
        )}

        {loading && <p className="mt-8 text-sm text-white/50">Loading admin data...</p>}

        {!loading && profile && (
          <div className="mt-8 grid gap-8">
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg tracking-tight">Profile</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Input
                  label="Name"
                  value={profile.identity.name}
                  onChange={(value) =>
                    setProfile({ ...profile, identity: { ...profile.identity, name: value } })
                  }
                />
                <Input
                  label="Title"
                  value={profile.identity.title}
                  onChange={(value) =>
                    setProfile({ ...profile, identity: { ...profile.identity, title: value } })
                  }
                />
                <Input
                  label="Email"
                  value={profile.identity.email}
                  onChange={(value) =>
                    setProfile({ ...profile, identity: { ...profile.identity, email: value } })
                  }
                />
                <Input
                  label="Location"
                  value={profile.identity.location}
                  onChange={(value) =>
                    setProfile({ ...profile, identity: { ...profile.identity, location: value } })
                  }
                />
                <Textarea
                  label="Tagline"
                  value={profile.identity.tagline}
                  onChange={(value) =>
                    setProfile({ ...profile, identity: { ...profile.identity, tagline: value } })
                  }
                  rows={3}
                />
                <Textarea
                  label="About bio"
                  value={profile.about.bio}
                  onChange={(value) => setProfile({ ...profile, about: { ...profile.about, bio: value } })}
                  rows={3}
                />
                <div>
                  <Input
                    label="Hero image URL"
                    value={profile.heroImage.src}
                    onChange={(value) =>
                      setProfile({
                        ...profile,
                        heroImage: { ...profile.heroImage, src: value },
                      })
                    }
                  />
                  <div className="mt-3">
                    <ImageUpload
                      folder="profile"
                      onUploaded={(url) =>
                        setProfile({
                          ...profile,
                          heroImage: { ...profile.heroImage, src: url },
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Input
                    label="About image URL"
                    value={profile.about.image}
                    onChange={(value) =>
                      setProfile({ ...profile, about: { ...profile.about, image: value } })
                    }
                  />
                  <div className="mt-3">
                    <ImageUpload
                      folder="profile"
                      onUploaded={(url) =>
                        setProfile({ ...profile, about: { ...profile.about, image: url } })
                      }
                    />
                  </div>
                </div>
                <Input
                  label="LinkedIn"
                  value={profile.social.linkedin}
                  onChange={(value) =>
                    setProfile({ ...profile, social: { ...profile.social, linkedin: value } })
                  }
                />
                <Input
                  label="GitHub"
                  value={profile.social.github}
                  onChange={(value) =>
                    setProfile({ ...profile, social: { ...profile.social, github: value } })
                  }
                />
                <Textarea
                  label="Tech focus"
                  value={profile.techStack.focus}
                  onChange={(value) =>
                    setProfile({
                      ...profile,
                      techStack: { ...profile.techStack, focus: value },
                    })
                  }
                  rows={3}
                />
                <Input
                  label="Footer credit"
                  value={profile.footerCredit}
                  onChange={(value) => setProfile({ ...profile, footerCredit: value })}
                />
              </div>
              <Toolbar onSave={() => void saveProfile()} />
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg tracking-tight">Projects</h2>
                <button
                  type="button"
                  onClick={() => setProjectForm(emptyProject)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-white/70"
                >
                  <Plus className="h-4 w-4" />
                  <span>New</span>
                </button>
              </div>
              <select
                value={projectForm.id ?? ''}
                onChange={(event) =>
                  setProjectForm(
                    projects.find((item) => item.id === event.target.value) ?? emptyProject,
                  )
                }
                className="mt-4 w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-sm text-white"
              >
                <option value="">New project</option>
                {sortedProjects.map((project) => (
                  <option key={project.id ?? project.slug} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Input label="Title" value={projectForm.title} onChange={(title) => setProjectForm({ ...projectForm, title })} />
                <Input label="Slug" value={projectForm.slug} onChange={(slug) => setProjectForm({ ...projectForm, slug })} />
                <Input label="Category" value={projectForm.category} onChange={(category) => setProjectForm({ ...projectForm, category })} />
                <Input label="Category icon" value={projectForm.categoryIcon} onChange={(categoryIcon) => setProjectForm({ ...projectForm, categoryIcon })} />
                <Input label="Year" value={fieldValue(projectForm.year)} onChange={(year) => setProjectForm({ ...projectForm, year })} />
                <Input label="Link" value={fieldValue(projectForm.link)} onChange={(link) => setProjectForm({ ...projectForm, link })} />
                <div>
                  <Input label="Image URL" value={fieldValue(projectForm.image)} onChange={(image) => setProjectForm({ ...projectForm, image })} />
                  <div className="mt-3">
                    <ImageUpload folder="projects" onUploaded={(image) => setProjectForm({ ...projectForm, image })} />
                  </div>
                </div>
                <Input label="Alt text" value={projectForm.alt} onChange={(alt) => setProjectForm({ ...projectForm, alt })} />
                <label className="block text-xs uppercase tracking-widest text-white/40">
                  Aspect
                  <select
                    value={projectForm.aspect}
                    onChange={(event) =>
                      setProjectForm({ ...projectForm, aspect: event.target.value as Project['aspect'] })
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-sm normal-case tracking-normal text-white"
                  >
                    <option value="16/9">16/9</option>
                    <option value="4/3">4/3</option>
                  </select>
                </label>
                <label className="mt-7 flex items-center gap-2 text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={Boolean(projectForm.featured)}
                    onChange={(event) => setProjectForm({ ...projectForm, featured: event.target.checked })}
                  />
                  Featured
                </label>
                <Textarea label="Description" value={projectForm.description} onChange={(description) => setProjectForm({ ...projectForm, description })} rows={4} />
                <Textarea label="Details" value={fieldValue(projectForm.details)} onChange={(details) => setProjectForm({ ...projectForm, details })} rows={4} />
                <Textarea label="Highlights, one per line" value={listToText(projectForm.highlights)} onChange={(value) => setProjectForm({ ...projectForm, highlights: textToList(value) })} rows={4} />
                <Textarea label="Tech, one per line" value={listToText(projectForm.tech)} onChange={(value) => setProjectForm({ ...projectForm, tech: textToList(value) })} rows={4} />
              </div>
              <Toolbar
                onSave={() => void saveProject()}
                onDelete={() => void deleteProject()}
                canDelete={Boolean(projectForm.id)}
              />
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg tracking-tight">Blog</h2>
                <button
                  type="button"
                  onClick={() => setPostForm(emptyPost)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-white/70"
                >
                  <Plus className="h-4 w-4" />
                  <span>New</span>
                </button>
              </div>
              <select
                value={postForm.id ?? ''}
                onChange={(event) =>
                  setPostForm(posts.find((item) => item.id === event.target.value) ?? emptyPost)
                }
                className="mt-4 w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-sm text-white"
              >
                <option value="">New post</option>
                {posts.map((post) => (
                  <option key={post.id ?? post.slug} value={post.id}>
                    {post.title}
                  </option>
                ))}
              </select>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Input label="Title" value={postForm.title} onChange={(title) => setPostForm({ ...postForm, title })} />
                <Input label="Slug" value={postForm.slug} onChange={(slug) => setPostForm({ ...postForm, slug })} />
                <Input label="Date" value={postForm.date} onChange={(date) => setPostForm({ ...postForm, date })} />
                <Input label="Reading time" value={postForm.readingTime} onChange={(readingTime) => setPostForm({ ...postForm, readingTime })} />
                <Textarea label="Excerpt" value={postForm.excerpt} onChange={(excerpt) => setPostForm({ ...postForm, excerpt })} rows={3} />
                <Textarea label="Tags, one per line" value={listToText(postForm.tags)} onChange={(value) => setPostForm({ ...postForm, tags: textToList(value) })} rows={3} />
                <div>
                  <Input label="Cover image URL" value={fieldValue(postForm.coverImage)} onChange={(coverImage) => setPostForm({ ...postForm, coverImage })} />
                  <div className="mt-3">
                    <ImageUpload folder="blog" onUploaded={(coverImage) => setPostForm({ ...postForm, coverImage })} />
                  </div>
                </div>
                <label className="mt-7 flex items-center gap-2 text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={postForm.published ?? true}
                    onChange={(event) => setPostForm({ ...postForm, published: event.target.checked })}
                  />
                  Published
                </label>
              </div>
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <Textarea label="Markdown content" value={postForm.content} onChange={(content) => setPostForm({ ...postForm, content })} rows={18} />
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="mb-3 text-xs uppercase tracking-widest text-white/40">Preview</p>
                  <Markdown>{postForm.content || 'Nothing to preview yet.'}</Markdown>
                </div>
              </div>
              <Toolbar
                onSave={() => void savePost()}
                onDelete={() => void deletePost()}
                canDelete={Boolean(postForm.id)}
              />
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg tracking-tight">Experience</h2>
              <select
                value={experienceForm.id ?? ''}
                onChange={(event) =>
                  setExperienceForm(
                    experience.find((item) => item.id === event.target.value) ?? emptyExperience,
                  )
                }
                className="mt-4 w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-sm text-white"
              >
                <option value="">New experience</option>
                {experience.map((item) => (
                  <option key={item.id ?? item.role} value={item.id}>
                    {item.role}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setExperienceForm(emptyExperience)}
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-white/70"
              >
                <Plus className="h-4 w-4" />
                <span>New</span>
              </button>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Input label="Year" value={experienceForm.year} onChange={(year) => setExperienceForm({ ...experienceForm, year })} />
                <Input label="Role" value={experienceForm.role} onChange={(role) => setExperienceForm({ ...experienceForm, role })} />
                <label className="block text-xs uppercase tracking-widest text-white/40">
                  Type
                  <select
                    value={experienceForm.type}
                    onChange={(event) => setExperienceForm({ ...experienceForm, type: event.target.value as TimelineItem['type'] })}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-sm normal-case tracking-normal text-white"
                  >
                    <option value="work">Work</option>
                    <option value="education">Education</option>
                  </select>
                </label>
                <label className="mt-7 flex items-center gap-2 text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={Boolean(experienceForm.current)}
                    onChange={(event) => setExperienceForm({ ...experienceForm, current: event.target.checked })}
                  />
                  Current
                </label>
                <Textarea label="Description" value={experienceForm.description} onChange={(description) => setExperienceForm({ ...experienceForm, description })} rows={4} />
              </div>
              <Toolbar
                onSave={() => void saveExperience()}
                onDelete={() => void deleteExperience()}
                canDelete={Boolean(experienceForm.id)}
              />
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg tracking-tight">Certifications</h2>
              <select
                value={certificationForm.id ?? ''}
                onChange={(event) =>
                  setCertificationForm(
                    certifications.find((item) => item.id === event.target.value) ??
                      emptyCertification,
                  )
                }
                className="mt-4 w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-sm text-white"
              >
                <option value="">New certification</option>
                {certifications.map((item) => (
                  <option key={item.id ?? item.title} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setCertificationForm(emptyCertification)}
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-white/70"
              >
                <Plus className="h-4 w-4" />
                <span>New</span>
              </button>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Input label="Title" value={certificationForm.title} onChange={(title) => setCertificationForm({ ...certificationForm, title })} />
                <Input label="Issuer" value={certificationForm.issuer} onChange={(issuer) => setCertificationForm({ ...certificationForm, issuer })} />
                <Input label="Date" value={certificationForm.date} onChange={(date) => setCertificationForm({ ...certificationForm, date })} />
                <Input label="URL" value={fieldValue(certificationForm.url)} onChange={(url) => setCertificationForm({ ...certificationForm, url })} />
              </div>
              <Toolbar
                onSave={() => void saveCertification()}
                onDelete={() => void deleteCertification()}
                canDelete={Boolean(certificationForm.id)}
              />
            </section>
          </div>
        )}
      </div>
    </main>
  )
}
