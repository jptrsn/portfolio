import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProjectCard from '../ProjectCard'
import { Project } from '@/types/portfolio'

describe('ProjectCard', () => {
  const mockProject: Project = {
    id: '1',
    slug: 'test-project',
    title: 'Test Project',
    shortDescription: 'A test project description',
    longDescription: 'Full detailed description',
    year: 2024,
    status: {
      current: 'active',
      deploymentStatus: 'live',
      maintenanceLevel: 'maintained'
    },
    metadata: {
      difficulty: 'intermediate',
      teamSize: 1,
      duration: '3 months'
    },
    hasCustomHardware: false,
    tags: [
      { name: 'React', category: 'framework' },
      { name: 'TypeScript', category: 'language' },
      { name: 'Node.js', category: 'platform' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'Docker', category: 'tool' },
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    images: [
      { url: '/test-image.jpg', alt: 'Test image', isHero: true }
    ],
    links: [],
  }

  it('renders project title', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('renders project year', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('renders short description', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('A test project description')).toBeInTheDocument()
  })

  it('displays active status badge', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('active')).toBeInTheDocument()
    expect(screen.getByText('active')).toHaveClass('bg-secondary-100', 'text-secondary-800')
  })

  it('displays completed status badge', () => {
    const completedProject = {
      ...mockProject,
      status: {
        current: 'completed' as const,
        deploymentStatus: 'live' as const
      }
    }
    render(<ProjectCard project={completedProject} />)
    expect(screen.getByText('completed')).toHaveClass('bg-primary-100', 'text-primary-800')
  })

  it('displays archived status badge', () => {
    const archivedProject = {
      ...mockProject,
      status: {
        current: 'archived' as const,
        deploymentStatus: 'offline' as const
      }
    }
    render(<ProjectCard project={archivedProject} />)
    expect(screen.getByText('archived')).toHaveClass('bg-neutral-100', 'text-neutral-800')
  })

  it('displays hardware badge when hasCustomHardware is true', () => {
    const hardwareProject = { ...mockProject, hasCustomHardware: true }
    render(<ProjectCard project={hardwareProject} />)
    expect(screen.getByText('Hardware')).toBeInTheDocument()
  })

  it('does not display hardware badge when hasCustomHardware is false', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.queryByText('Hardware')).not.toBeInTheDocument()
  })

  it('displays first 4 tags', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
  })

  it('shows "+X more" for additional tags', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('+1 more')).toBeInTheDocument()
  })

  it('does not show "+X more" when 4 or fewer tags', () => {
    const fewTagsProject = { ...mockProject, tags: mockProject.tags.slice(0, 3) }
    render(<ProjectCard project={fewTagsProject} />)
    expect(screen.queryByText(/more/i)).not.toBeInTheDocument()
  })

  it('renders as a link to project detail page', () => {
    render(<ProjectCard project={mockProject} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/projects/test-project')
  })

  it('applies hover classes', () => {
    const { container } = render(<ProjectCard project={mockProject} />)
    const link = container.querySelector('a')
    expect(link).toHaveClass('group', 'hover:border-neutral-600', 'hover:scale-[1.05]')
  })

  it('renders hero image when available', () => {
    const { container } = render(<ProjectCard project={mockProject} />)
    const image = container.querySelector('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'Test image')
  })

  it('uses first image when no hero image', () => {
    const noHeroProject = {
      ...mockProject,
      images: [
        { url: '/first-image.jpg', alt: 'First image', isHero: false },
        { url: '/second-image.jpg', alt: 'Second image', isHero: false }
      ]
    }
    const { container } = render(<ProjectCard project={noHeroProject} />)
    const image = container.querySelector('img')
    expect(image).toHaveAttribute('alt', 'First image')
  })

  it('applies tag colors when specified', () => {
    const coloredTagProject = {
      ...mockProject,
      tags: [{ name: 'Colored', category: 'framework' as const, color: '#FF5733' }]
    }
    render(<ProjectCard project={coloredTagProject} />)
    const tag = screen.getByText('Colored')
    expect(tag).toHaveStyle({ backgroundColor: '#FF573320', color: '#FF5733' })
  })

  it('renders complete card structure with all elements', () => {
    const { container } = render(<ProjectCard project={mockProject} />)

    // Verify link wrapper exists
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/projects/test-project')
    expect(link).toHaveClass('group', 'block', 'rounded-lg')

    // Verify card container exists
    const cardContainer = link.querySelector('.relative.flex.flex-col')
    expect(cardContainer).toBeInTheDocument()

    // Verify image exists
    const image = container.querySelector('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'Test image')

    // Verify content section exists
    const contentSection = container.querySelector('.p-6')
    expect(contentSection).toBeInTheDocument()

    // Verify title
    const title = screen.getByText('Test Project')
    expect(title).toBeInTheDocument()
    expect(title.tagName).toBe('H3')

    // Verify description
    expect(screen.getByText('A test project description')).toBeInTheDocument()

    // Verify year
    expect(screen.getByText('2024')).toBeInTheDocument()

    // Verify status badge
    const statusBadge = screen.getByText('active')
    expect(statusBadge.tagName).toBe('SPAN')

    // Verify tags section exists
    const tagsContainer = container.querySelector('.flex.flex-wrap.gap-1')
    expect(tagsContainer).toBeInTheDocument()

    // Verify at least some tags are rendered
    expect(screen.getByText('React')).toBeInTheDocument()
  })
})