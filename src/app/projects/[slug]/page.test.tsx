import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProjectDetailPage, { generateMetadata, generateStaticParams } from './page'
import * as projectsLib from '@/lib/projects'
import * as metadataLib from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { Project } from '@/types/portfolio'

// Mock dependencies
vi.mock('@/lib/projects', () => ({
  getProjectBySlug: vi.fn(),
  getAllProjectSlugs: vi.fn(),
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

// Mock components
vi.mock('@/components/ProjectImageGallery', () => ({
  default: ({ project }: { project: Project }) => (
    <div data-testid="project-image-gallery">{project.title} Gallery</div>
  ),
}))

vi.mock('@/components/ProjectLink', () => ({
  default: ({ link }: { link: { label: string } }) => (
    <a data-testid="project-link">{link.label}</a>
  ),
}))

vi.mock('@/components/RelatedProjects', () => ({
  default: ({ currentProject }: { currentProject: Project }) => (
    <div data-testid="related-projects">Related to {currentProject.title}</div>
  ),
}))

describe('ProjectDetailPage', () => {
  const mockProject: Project = {
    id: 'test-project',
    slug: 'test-project',
    title: 'Test Project',
    shortDescription: 'A test project description',
    longDescription: 'This is a longer description\nwith multiple lines.',
    year: 2024,
    tags: [
      { name: 'React', category: 'framework', color: '#61DAFB' },
      { name: 'TypeScript', category: 'language', color: '#3178C6' },
      { name: 'PostgreSQL', category: 'database' },
    ],
    technologies: ['React', 'TypeScript', 'PostgreSQL'],
    images: [
      { url: '/test-image.jpg', alt: 'Test image', isHero: true },
    ],
    links: [
      { type: 'github', url: 'https://github.com/test', label: 'View on GitHub', isAvailable: true },
      { type: 'demo', url: 'https://demo.test', label: 'Live Demo', isAvailable: true },
    ],
    status: { current: 'active', deploymentStatus: 'live' },
    metadata: {
      difficulty: 'intermediate',
      teamSize: 2,
      duration: '3 months',
      role: 'Lead Developer',
    },
    featured: true,
    challenges: 'Building a scalable architecture',
    learnings: 'Learned about advanced state management',
    futureImprovements: 'Add real-time features',
    isOpenSource: true,
    hasCustomHardware: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateStaticParams', () => {
    it('generates params for all projects', async () => {
      const mockSlugs = ['project-1', 'project-2', 'project-3']
      vi.mocked(projectsLib.getAllProjectSlugs).mockReturnValue(mockSlugs)

      const params = await generateStaticParams()

      expect(params).toEqual([
        { slug: 'project-1' },
        { slug: 'project-2' },
        { slug: 'project-3' },
      ])
    })
  })

  describe('generateMetadata', () => {
    it('generates metadata for existing project', async () => {
      vi.mocked(projectsLib.getProjectBySlug).mockReturnValue(mockProject)

      await generateMetadata({ params: Promise.resolve({ slug: 'test-project' }) })

      expect(projectsLib.getProjectBySlug).toHaveBeenCalledWith('test-project')
      expect(metadataLib.generateExtendedMetadata).toHaveBeenCalledWith({
        title: 'Test Project | Projects',
        description: mockProject.shortDescription,
        image: mockProject.images[0].url,
      })
    })

    it('returns not found metadata for non-existent project', async () => {
      vi.mocked(projectsLib.getProjectBySlug).mockReturnValue(null)

      const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'non-existent' }) })

      expect(metadata).toEqual({ title: 'Project Not Found' })
    })
  })

  describe('Project rendering', () => {
    beforeEach(() => {
      vi.mocked(projectsLib.getProjectBySlug).mockReturnValue(mockProject)
    })

    it('renders project title', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      // Use heading role to specifically target the h1
      expect(screen.getByRole('heading', { level: 1, name: 'Test Project' })).toBeInTheDocument()
    })

    it('renders project short description', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByText('A test project description')).toBeInTheDocument()
    })

    it('renders project year', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByText('2024')).toBeInTheDocument()
    })

    it('renders project status badge', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByText('Active')).toBeInTheDocument()
    })

    it('renders open source badge when isOpenSource is true', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByText('Open Source')).toBeInTheDocument()
    })

    it('renders team size when greater than 1', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByText('Team of 2')).toBeInTheDocument()
    })

    it('renders project links', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      const links = screen.getAllByTestId('project-link')
      expect(links).toHaveLength(2)
    })

    it('renders image gallery', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByTestId('project-image-gallery')).toBeInTheDocument()
    })

    it('renders long description', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByText(/This is a longer description/)).toBeInTheDocument()
    })

    it('renders technologies by category', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
    })

    it('renders challenges section', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByRole('heading', { name: 'Challenges' })).toBeInTheDocument()
      expect(screen.getByText('Building a scalable architecture')).toBeInTheDocument()
    })

    it('renders learnings section', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByRole('heading', { name: 'Key Learnings' })).toBeInTheDocument()
      expect(screen.getByText('Learned about advanced state management')).toBeInTheDocument()
    })

    it('renders future improvements section', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByRole('heading', { name: 'Future Improvements' })).toBeInTheDocument()
      expect(screen.getByText('Add real-time features')).toBeInTheDocument()
    })

    it('renders project metadata details', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByText('Difficulty')).toBeInTheDocument()
      expect(screen.getByText('intermediate')).toBeInTheDocument()
      expect(screen.getByText('Duration')).toBeInTheDocument()
      expect(screen.getByText('Team Size')).toBeInTheDocument()
      expect(screen.getByText('Role')).toBeInTheDocument()
      expect(screen.getByText('Lead Developer')).toBeInTheDocument()

      // Verify duration appears in the details
      const durationElements = screen.getAllByText('3 months')
      expect(durationElements.length).toBeGreaterThanOrEqual(1)
    })

    it('renders related projects', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByTestId('related-projects')).toBeInTheDocument()
    })

    it('renders breadcrumb navigation', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      const { container } = render(page)

      const breadcrumbLink = container.querySelector('a[href="/projects"]')
      expect(breadcrumbLink).toBeInTheDocument()
      expect(breadcrumbLink).toHaveTextContent('Projects')
    })

    it('renders back to projects link', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByText('Back to all projects')).toBeInTheDocument()
    })

    it('does not render custom hardware badge when false', async () => {
      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.queryByText('Custom Hardware')).not.toBeInTheDocument()
    })

    it('renders custom hardware badge when true', async () => {
      const projectWithHardware = { ...mockProject, hasCustomHardware: true }
      vi.mocked(projectsLib.getProjectBySlug).mockReturnValue(projectWithHardware)

      const page = await ProjectDetailPage({ params: Promise.resolve({ slug: 'test-project' }) })
      render(page)

      expect(screen.getByText('Custom Hardware')).toBeInTheDocument()
    })
  })

  describe('Error handling', () => {
    it('calls notFound when project does not exist', async () => {
      vi.mocked(projectsLib.getProjectBySlug).mockReturnValue(null)

      await expect(async () => {
        await ProjectDetailPage({ params: Promise.resolve({ slug: 'non-existent' }) })
      }).rejects.toThrow('NEXT_NOT_FOUND')

      expect(notFound).toHaveBeenCalled()
    })
  })
})