import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FeaturedProjectsGrid from '../FeaturedProjectsGrid'
import { Project } from '@/types/types'

// Mock ProjectCard to capture render count and props
vi.mock('@/components/ProjectCard', () => ({
  default: ({ project }: { project: Project }) => (
    <div data-testid={`project-card-${project.id}`}>
      <h3>{project.title}</h3>
    </div>
  ),
}))

describe('FeaturedProjectsGrid', () => {
  const mockProjects: Project[] = [
    {
      id: 'proj-1',
      slug: 'test-project-one',
      title: 'Test Project One',
      shortDescription: 'First featured project',
      longDescription: 'Long description for first project',
      startDate: '2024-06-15',
      tags: [{ name: 'React', category: 'framework' }],
      images: [{ url: '/test1.jpg', alt: 'Test 1', isHero: true }],
      links: [],
      status: { current: 'active' },
      metadata: { difficulty: 'intermediate' },
      featured: true,
      isOpenSource: false,
      hasCustomHardware: false,
    },
    {
      id: 'proj-2',
      slug: 'test-project-two',
      title: 'Test Project Two',
      shortDescription: 'Second featured project',
      longDescription: 'Long description for second project',
      startDate: '2023-01-10',
      tags: [{ name: 'Node.js', category: 'platform' }],
      images: [],
      links: [{ type: 'github', url: 'https://github.com/test', label: 'Source', isAvailable: true }],
      status: { current: 'completed' },
      metadata: { difficulty: 'advanced' },
      featured: true,
      isOpenSource: true,
      hasCustomHardware: false,
    },
  ]

  it('renders section title', () => {
    render(<FeaturedProjectsGrid projects={mockProjects} />)
    expect(screen.getByText('Side Projects')).toBeInTheDocument()
  })

  it('renders section description', () => {
    render(<FeaturedProjectsGrid projects={mockProjects} />)
    expect(screen.getByText(/A selection of recent work and play/i)).toBeInTheDocument()
  })

  it('renders all projects', () => {
    render(<FeaturedProjectsGrid projects={mockProjects} />)
    expect(screen.getByText('Test Project One')).toBeInTheDocument()
    expect(screen.getByText('Test Project Two')).toBeInTheDocument()
  })

  it('renders project cards with correct ids', () => {
    render(<FeaturedProjectsGrid projects={mockProjects} />)
    expect(screen.getByTestId('project-card-proj-1')).toBeInTheDocument()
    expect(screen.getByTestId('project-card-proj-2')).toBeInTheDocument()
  })

  it('renders "View All Projects" link to /projects', () => {
    render(<FeaturedProjectsGrid projects={mockProjects} />)
    const link = screen.getByRole('link', { name: /View All Projects/i })
    expect(link).toHaveAttribute('href', '/projects')
  })

  it('renders section with correct id for navigation', () => {
    const { container } = render(<FeaturedProjectsGrid projects={mockProjects} />)
    const section = container.querySelector('#projects')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('id', 'projects')
  })

  it('applies correct grid layout classes', () => {
    const { container } = render(<FeaturedProjectsGrid projects={mockProjects} />)
    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
  })

  it('applies section styling classes', () => {
    const { container } = render(<FeaturedProjectsGrid projects={mockProjects} />)
    const section = container.querySelector('section')
    expect(section).toHaveClass('py-20', 'px-6', 'bg-primary-900/50')
  })

  it('handles empty projects array', () => {
    render(<FeaturedProjectsGrid projects={[]} />)
    expect(screen.getByText('Side Projects')).toBeInTheDocument()
    expect(screen.queryByTestId('project-card-proj-1')).not.toBeInTheDocument()
  })

  it('renders container element', () => {
    const { container } = render(<FeaturedProjectsGrid projects={mockProjects} />)
    const section = container.querySelector('#projects')
    expect(section?.querySelector('.container')).toBeInTheDocument()
  })

  it('applies View All Projects link styling classes', () => {
    const { container } = render(<FeaturedProjectsGrid projects={mockProjects} />)
    const link = container.querySelector('a[href="/projects"]')
    expect(link).toHaveClass(
      'inline-flex',
      'flex-row',
      'gap-3',
      'cursor-pointer',
      'border',
      'rounded-lg',
      'border-primary-700'
    )
  })
})
