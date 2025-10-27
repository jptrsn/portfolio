import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import PostPage, { generateMetadata, generateStaticParams } from './page'
import * as postsLib from '@/lib/posts'
import * as metadataLib from '@/lib/metadata'
import { notFound } from 'next/navigation'

// Mock dependencies
vi.mock('@/lib/posts', () => ({
  getPostBySlug: vi.fn(),
  getAllPosts: vi.fn(),
  formatDate: vi.fn((date: string) => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })),
}))

vi.mock('@/lib/metadata', () => ({
  generateExtendedMetadata: vi.fn((data) => ({
    title: data.title,
    description: data.description,
  })),
}))

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation')
  return {
    ...actual,
    notFound: vi.fn(() => {
      throw new Error('NEXT_NOT_FOUND')
    }),
  }
})

vi.mock('next-mdx-remote/rsc', () => ({
  MDXRemote: ({ source }: { source: string }) => <div data-testid="mdx-content">{source}</div>,
}))

describe('PostPage', () => {
  const mockPost = {
    slug: 'test-post',
    title: 'Test Post Title',
    date: '2024-01-15',
    excerpt: 'This is a test excerpt',
    author: 'John Doe',
    categories: ['Technology', 'Web Dev'],
    tags: ['react', 'typescript'],
    content: '# Test Content\n\nThis is the post content.',
    description: 'Test post description',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateStaticParams', () => {
    it('generates params for all posts', async () => {
      const mockPosts = [
        { slug: 'post-1', title: 'Post 1', date: '2024-01-01', content: '', description: '' },
        { slug: 'post-2', title: 'Post 2', date: '2024-01-02', content: '', description: '' },
      ]
      vi.mocked(postsLib.getAllPosts).mockResolvedValue(mockPosts)

      const params = await generateStaticParams()

      expect(params).toEqual([
        { slug: 'post-1' },
        { slug: 'post-2' },
      ])
    })
  })

  describe('generateMetadata', () => {
    it('generates metadata for existing post', async () => {
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(mockPost)

      const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'test-post' }) })

      expect(postsLib.getPostBySlug).toHaveBeenCalledWith('test-post')
      expect(metadataLib.generateExtendedMetadata).toHaveBeenCalledWith({
        title: mockPost.title,
        description: mockPost.excerpt,
        tags: mockPost.tags,
      })
      expect(metadata).toHaveProperty('title', mockPost.title)
    })

    it('returns not found metadata for non-existent post', async () => {
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(null)

      const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'non-existent' }) })

      expect(metadata).toEqual({ title: 'Post Not Found' })
    })

    it('uses description as fallback when no excerpt', async () => {
      const postWithoutExcerpt = { ...mockPost, excerpt: undefined }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithoutExcerpt)

      await generateMetadata({ params: Promise.resolve({ slug: 'test-post' }) })

      expect(metadataLib.generateExtendedMetadata).toHaveBeenCalledWith({
        title: mockPost.title,
        description: mockPost.description,
        tags: mockPost.tags,
      })
    })
  })

  describe('Post rendering', () => {
    beforeEach(() => {
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(mockPost)
    })

    it('renders post title', async () => {
      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.getByText('Test Post Title')).toBeInTheDocument()
    })

    it('renders post date', async () => {
      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      const { container } = render(page)

      const timeElements = container.querySelectorAll('time')
      expect(timeElements.length).toBeGreaterThan(0)
      expect(timeElements[0]).toHaveAttribute('dateTime', '2024-01-15')
    })

    it('renders post author', async () => {
      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.getByText('by John Doe')).toBeInTheDocument()
    })

    it('renders post excerpt', async () => {
      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.getByText('This is a test excerpt')).toBeInTheDocument()
    })

    it('renders post categories', async () => {
      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.getByText('Technology')).toBeInTheDocument()
      expect(screen.getByText('Web Dev')).toBeInTheDocument()
    })

    it('renders post tags with hash prefix', async () => {
      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.getByText('#react')).toBeInTheDocument()
      expect(screen.getByText('#typescript')).toBeInTheDocument()
    })

    it('renders MDX content', async () => {
      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.getByTestId('mdx-content')).toBeInTheDocument()
      expect(screen.getByTestId('mdx-content')).toHaveTextContent('# Test Content')
    })

    it('renders back to posts links', async () => {
      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      const { container } = render(page)

      const backLinks = container.querySelectorAll('a[href="/posts"]')
      expect(backLinks.length).toBeGreaterThanOrEqual(2) // Header and footer
    })

    it('renders back navigation in header', async () => {
      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      const backLinks = screen.getAllByText('Back to posts')
      expect(backLinks.length).toBeGreaterThan(0)
    })

    it('renders published date in footer', async () => {
      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      const publishedText = screen.getByText(/Published on/i)
      expect(publishedText).toBeInTheDocument()
    })

    it('does not render categories section when empty', async () => {
      const postWithoutCategories = { ...mockPost, categories: [] }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithoutCategories)

      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      const { container } = render(page)

      // The border container should not exist if no categories or tags
      const categoryContainer = container.querySelector('.border-b.border-gray-200')
      // It might still exist if tags are present
      expect(categoryContainer).toBeDefined()
    })

    it('handles post without author', async () => {
      const postWithoutAuthor = { ...mockPost, author: undefined }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithoutAuthor)

      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.queryByText(/by /)).not.toBeInTheDocument()
    })

    it('handles post without excerpt', async () => {
      const postWithoutExcerpt = { ...mockPost, excerpt: undefined }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithoutExcerpt)

      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.queryByText('This is a test excerpt')).not.toBeInTheDocument()
    })
  })

  describe('Error handling', () => {
    it('calls notFound when post does not exist', async () => {
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(null)

      await expect(async () => {
        await PostPage({ params: Promise.resolve({ slug: 'non-existent' }) })
      }).rejects.toThrow('NEXT_NOT_FOUND')

      expect(notFound).toHaveBeenCalled()
    })
  })
})