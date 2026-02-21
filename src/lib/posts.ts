import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remarkHtml from 'remark-html'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'

export interface PostMetadata {
  title: string
  date: string
  slug: string
  excerpt?: string
  description?: string
  tags?: string[]
  draft?: boolean
  author?: string
  categories?: string[]
}

export interface Post extends PostMetadata {
  content: string
}

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

// Only create directory in development (not needed for static export)
if (process.env.NODE_ENV === 'development' && !fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const posts = fileNames
      .filter(name => name.endsWith('.mdx'))
      .map(name => {
        const slug = name.replace(/\.mdx$/, '')
        const fullPath = path.join(postsDirectory, name)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || data.description || '',
          description: data.description,
          tags: data.tags || [],
          draft: data.draft || false,
          author: data.author,
          categories: data.categories || [],
        } as PostMetadata
      })
      .filter(post => !post.draft) // Filter out draft posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return posts
  } catch (error) {
    console.error('Error loading posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || data.description || '',
      description: data.description,
      tags: data.tags || [],
      draft: data.draft || false,
      author: data.author,
      categories: data.categories || [],
      content,
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

export async function getPostContentAsHtml(slug: string): Promise<string> {
  const post = await getPostBySlug(slug)
  if (!post) return ''

  const normalized = post.content
    .replace(/<Details/g, '<details')
    .replace(/<\/Details>/g, '</details>')
    .replace(/<Summary/g, '<summary')
    .replace(/<\/Summary>/g, '</summary>')

  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(normalized)

  return result.toString()
}

export function formatDate(dateString: string): string {
  try {

    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    })
  } catch {
    return dateString
  }
}

export function dateStringToYear(dateString: string): string {
  try {
    const year = new Date(dateString).getUTCFullYear();
    if (isNaN(year)) {
      return dateString;
    }
    return year.toString();
  } catch {
    return dateString;
  }
}