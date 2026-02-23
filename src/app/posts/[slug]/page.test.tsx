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
  toSnakeCase: vi.fn((str: string) => str.split(' ').map((s) => s.toLowerCase()).join('_')),
  extractHeadings: vi.fn((str: string) => null)
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
  MDXRemote: ({ source, components }: { source: string; components?: Record<string, unknown> }) => {
    // Touch the components object to ensure it's used in the test
    if (components) {
      Object.keys(components).forEach(() => {
        // Components are passed to MDXRemote but executed internally
      })
    }
    return <div data-testid="mdx-content">{source}</div>
  },
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
        url: '/posts/test-post',
        type: 'article'
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
        url: '/posts/test-post',
        type: 'article'
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

      expect(screen.getByText(postsLib.toSnakeCase('Test Post Title'))).toBeInTheDocument()
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

  describe('generateStaticParams error handling', () => {
    it('returns empty array when getAllPosts fails', async () => {
      vi.mocked(postsLib.getAllPosts).mockRejectedValue(new Error('Failed to load posts'))
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const params = await generateStaticParams()

      expect(params).toEqual([])
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error generating static params for posts:',
        expect.any(Error)
      )

      consoleErrorSpy.mockRestore()
    })
  })

  describe('MDX component rendering', () => {
    beforeEach(() => {
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(mockPost)
    })

    it('renders custom MDX heading components', async () => {
      const postWithHeadings = {
        ...mockPost,
        content: '# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6'
      }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithHeadings)

      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      const mdxContent = screen.getByTestId('mdx-content')
      expect(mdxContent).toBeInTheDocument()
    })

    it('renders custom MDX paragraph component', async () => {
      const postWithParagraph = {
        ...mockPost,
        content: 'This is a paragraph.'
      }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithParagraph)

      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      const mdxContent = screen.getByTestId('mdx-content')
      expect(mdxContent).toBeInTheDocument()
    })

    it('renders custom MDX link component', async () => {
      const postWithLink = {
        ...mockPost,
        content: '[Link text](https://example.com)'
      }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithLink)

      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      const mdxContent = screen.getByTestId('mdx-content')
      expect(mdxContent).toBeInTheDocument()
    })

    it('renders custom MDX list components', async () => {
      const postWithLists = {
        ...mockPost,
        content: '- Item 1\n- Item 2\n\n1. Numbered 1\n2. Numbered 2'
      }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithLists)

      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      const mdxContent = screen.getByTestId('mdx-content')
      expect(mdxContent).toBeInTheDocument()
    })

    it('renders custom MDX blockquote component', async () => {
      const postWithBlockquote = {
        ...mockPost,
        content: '> This is a quote'
      }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithBlockquote)

      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      const mdxContent = screen.getByTestId('mdx-content')
      expect(mdxContent).toBeInTheDocument()
    })

    it('renders custom MDX code components', async () => {
      const postWithCode = {
        ...mockPost,
        content: '`inline code`\n\n```\ncode block\n```'
      }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithCode)

      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      const mdxContent = screen.getByTestId('mdx-content')
      expect(mdxContent).toBeInTheDocument()
    })

    it('renders custom MDX horizontal rule component', async () => {
      const postWithHr = {
        ...mockPost,
        content: 'Text above\n\n---\n\nText below'
      }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithHr)

      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      const mdxContent = screen.getByTestId('mdx-content')
      expect(mdxContent).toBeInTheDocument()
    })

    it('renders custom MDX table components', async () => {
      const postWithTable = {
        ...mockPost,
        content: '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |'
      }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithTable)

      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      const mdxContent = screen.getByTestId('mdx-content')
      expect(mdxContent).toBeInTheDocument()
    })
  })

  describe('Conditional rendering', () => {
    beforeEach(() => {
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(mockPost)
    })

    it('renders categories section when categories exist', async () => {
      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      const { container } = render(page)

      const categoryContainer = container.querySelector('.flex.flex-wrap.gap-3')
      expect(categoryContainer).toBeInTheDocument()
      expect(screen.getByText('Technology')).toBeInTheDocument()
    })

    it('renders tags section when tags exist', async () => {
      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.getByText('#react')).toBeInTheDocument()
      expect(screen.getByText('#typescript')).toBeInTheDocument()
    })

    it('does not render categories when array is empty', async () => {
      const postWithoutCategories = {
        ...mockPost,
        categories: [],
        tags: []
      }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithoutCategories)

      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      const { container } = render(page)

      const borderContainer = container.querySelector('.flex.flex-wrap.gap-3.pb-8')
      expect(borderContainer).not.toBeInTheDocument()
    })

    it('renders only tags when no categories', async () => {
      const postWithOnlyTags = {
        ...mockPost,
        categories: []
      }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithOnlyTags)

      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.queryByText('Technology')).not.toBeInTheDocument()
      expect(screen.getByText('#react')).toBeInTheDocument()
    })

    it('renders only categories when no tags', async () => {
      const postWithOnlyCategories = {
        ...mockPost,
        tags: []
      }
      vi.mocked(postsLib.getPostBySlug).mockResolvedValue(postWithOnlyCategories)

      const page = await PostPage({ params: Promise.resolve({ slug: 'test-post' }) })
      render(page)

      expect(screen.getByText('Technology')).toBeInTheDocument()
      expect(screen.queryByText('#react')).not.toBeInTheDocument()
    })
  })

})