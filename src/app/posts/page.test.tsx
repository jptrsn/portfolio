import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import PostsPage, { metadata } from './page'
import * as postsLib from '@/lib/posts'

// Mock the posts library
vi.mock('@/lib/posts', () => ({
  getAllPosts: vi.fn(),
  formatDate: vi.fn((date: string) => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })),
  toSnakeCase: vi.fn((str: string) => str.split(' ').map((s) => s.toLowerCase()).join('_')),
}))

// Mock Navigation component
vi.mock('@/components/Navigation', () => ({
  default: () => <nav data-testid="navigation">Navigation</nav>,
}))

describe('PostsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Metadata', () => {
    it('has correct title', () => {
      expect(metadata.title).toBe('Blog Posts')
    })

    it('has correct description', () => {
      expect(metadata.description).toBe('All blog posts')
    })
  })

  describe('With posts', () => {
    const mockPosts = [
      {
        slug: 'test-post-1',
        title: 'Test Post 1',
        date: '2024-01-15',
        excerpt: 'This is the first test post excerpt',
        author: 'John Doe',
        categories: ['Technology', 'Web Dev'],
        tags: ['react', 'typescript'],
        content: 'Post content',
        description: 'Post description',
      },
      {
        slug: 'test-post-2',
        title: 'Test Post 2',
        date: '2024-01-10',
        excerpt: 'This is the second test post excerpt',
        author: 'Jane Smith',
        categories: ['Design'],
        tags: ['ui', 'ux'],
        content: 'Post content',
        description: 'Post description',
      },
    ]

    beforeEach(() => {
      vi.mocked(postsLib.getAllPosts).mockResolvedValue(mockPosts)
    })

    it('renders navigation component', async () => {
      const page = await PostsPage()
      render(page)

      expect(screen.getByTestId('navigation')).toBeInTheDocument()
    })

    it('renders all posts', async () => {
      const page = await PostsPage()
      render(page)

      expect(screen.getByText(postsLib.toSnakeCase('Test Post 1'))).toBeInTheDocument()
      expect(screen.getByText(postsLib.toSnakeCase('Test Post 2'))).toBeInTheDocument()
    })

    it('renders post excerpts', async () => {
      const page = await PostsPage()
      render(page)

      expect(screen.getByText('This is the first test post excerpt')).toBeInTheDocument()
      expect(screen.getByText('This is the second test post excerpt')).toBeInTheDocument()
    })

    it('renders post authors', async () => {
      const page = await PostsPage()
      render(page)

      expect(screen.getByText('by John Doe')).toBeInTheDocument()
      expect(screen.getByText('by Jane Smith')).toBeInTheDocument()
    })

    it('renders post categories', async () => {
      const page = await PostsPage()
      render(page)

      expect(screen.getByText('Technology')).toBeInTheDocument()
      expect(screen.getByText('Web Dev')).toBeInTheDocument()
      expect(screen.getByText('Design')).toBeInTheDocument()
    })

    it('renders post tags with hash prefix', async () => {
      const page = await PostsPage()
      render(page)

      expect(screen.getByText('#react')).toBeInTheDocument()
      expect(screen.getByText('#typescript')).toBeInTheDocument()
      expect(screen.getByText('#ui')).toBeInTheDocument()
      expect(screen.getByText('#ux')).toBeInTheDocument()
    })

    it('renders links to individual posts', async () => {
      const page = await PostsPage()
      const { container } = render(page)

      const links = container.querySelectorAll('a[href^="/posts/"]')
      expect(links.length).toBe(2)
      expect(links[0]).toHaveAttribute('href', '/posts/test-post-1')
      expect(links[1]).toHaveAttribute('href', '/posts/test-post-2')
    })

    it('renders formatted dates', async () => {
      const page = await PostsPage()
      render(page)

      const dates = screen.getAllByRole('time')
      expect(dates.length).toBe(2)
      expect(dates[0]).toHaveAttribute('dateTime', '2024-01-15')
      expect(dates[1]).toHaveAttribute('dateTime', '2024-01-10')
    })

    it('renders read more indicators', async () => {
      const page = await PostsPage()
      render(page)

      const readMoreLinks = screen.getAllByText('Read more')
      expect(readMoreLinks.length).toBe(2)
    })

    it('applies correct layout classes', async () => {
      const page = await PostsPage()
      const { container } = render(page)

      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv).toHaveClass('min-h-screen')
      expect(mainDiv).toHaveClass('background')
    })
  })

  describe('Empty state', () => {
    beforeEach(() => {
      vi.mocked(postsLib.getAllPosts).mockResolvedValue([])
    })

    it('renders empty state when no posts exist', async () => {
      const page = await PostsPage()
      render(page)

      expect(screen.getByText('No posts yet')).toBeInTheDocument()
      expect(screen.getByText('Create your first post in the src/content/posts directory')).toBeInTheDocument()
    })

    it('renders empty state icon', async () => {
      const page = await PostsPage()
      const { container } = render(page)

      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('does not render post articles in empty state', async () => {
      const page = await PostsPage()
      const { container } = render(page)

      const articles = container.querySelectorAll('article')
      expect(articles.length).toBe(0)
    })
  })
})