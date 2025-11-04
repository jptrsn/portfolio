import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProjectsPage, { metadata } from './page'
import * as projectsLib from '@/lib/projects'
import { Project } from '@/types/portfolio'

// Mock the projects library
vi.mock('@/lib/projects', () => ({
  getAllProjects: vi.fn(),
}))

// Mock Navigation component
vi.mock('@/components/Navigation', () => ({
  default: () => <nav data-testid="navigation">Navigation</nav>,
}))

// Mock ProjectCard component
vi.mock('@/components/ProjectCard', () => ({
  default: ({ project }: { project: Project }) => (
    <div data-testid={`project-card-${project.id}`}>
      <h3>{project.title}</h3>
    </div>
  ),
}))

describe('ProjectsPage', () => {
  const mockProjects: Project[] = [
    {
      id: 'project-1',
      slug: 'test-project-1',
      title: 'Test Project 1',
      shortDescription: 'First test project',
      longDescription: 'Long description for first project',
      year: 2024,
      tags: [
        { name: 'React', category: 'framework' },
        { name: 'TypeScript', category: 'language' }
      ],
      images: [],
      links: [],
      status: { current: 'active' },
      metadata: { difficulty: 'intermediate' },
      featured: true,
      isOpenSource: false,
      hasCustomHardware: false,
    },
    {
      id: 'project-2',
      slug: 'test-project-2',
      title: 'Test Project 2',
      shortDescription: 'Second test project',
      longDescription: 'Long description for second project',
      year: 2023,
      tags: [
        { name: 'Node.js', category: 'platform' },
        { name: 'PostgreSQL', category: 'database' }
      ],
      images: [],
      links: [],
      status: { current: 'completed' },
      metadata: { difficulty: 'advanced' },
      featured: false,
      isOpenSource: true,
      hasCustomHardware: false,
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Metadata', () => {
    it('has correct title', () => {
      expect(metadata.title).toContain('Projects')
    })

    it('has correct description', () => {
      expect(metadata.description).toBeTruthy()
      expect(typeof metadata.description).toBe('string')
    })
  })

  describe('With projects', () => {
    beforeEach(() => {
      vi.mocked(projectsLib.getAllProjects).mockReturnValue(mockProjects)
    })

    it('renders navigation component', () => {
      render(<ProjectsPage />)
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
    })

    it('renders page header text', () => {
      render(<ProjectsPage />)
      expect(screen.getByText(/A collection of side projects/i)).toBeInTheDocument()
    })

    it('renders all project cards', () => {
      render(<ProjectsPage />)

      expect(screen.getByTestId('project-card-project-1')).toBeInTheDocument()
      expect(screen.getByTestId('project-card-project-2')).toBeInTheDocument()
    })

    it('renders project titles', () => {
      render(<ProjectsPage />)

      expect(screen.getByText('Test Project 1')).toBeInTheDocument()
      expect(screen.getByText('Test Project 2')).toBeInTheDocument()
    })

    it('applies correct layout classes', () => {
      const { container } = render(<ProjectsPage />)

      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv).toHaveClass('min-h-screen')
      expect(mainDiv).toHaveClass('bg-background')
      expect(mainDiv).toHaveClass('text-foreground')
    })

    it('renders projects in a grid', () => {
      const { container } = render(<ProjectsPage />)

      const grid = container.querySelector('.grid')
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('md:grid-cols-2')
      expect(grid).toHaveClass('lg:grid-cols-3')
    })
  })

  describe('Empty state', () => {
    beforeEach(() => {
      vi.mocked(projectsLib.getAllProjects).mockReturnValue([])
    })

    it('renders empty state when no projects exist', () => {
      render(<ProjectsPage />)

      expect(screen.getByText(/No projects found matching your criteria/i)).toBeInTheDocument()
    })

    it('does not render project cards in empty state', () => {
      const { container } = render(<ProjectsPage />)

      const projectCards = container.querySelectorAll('[data-testid^="project-card-"]')
      expect(projectCards.length).toBe(0)
    })

    it('still renders navigation in empty state', () => {
      render(<ProjectsPage />)

      expect(screen.getByTestId('navigation')).toBeInTheDocument()
    })
  })
})