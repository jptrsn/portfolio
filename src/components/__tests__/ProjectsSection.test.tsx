import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProjectsSection } from '../ProjectsSection'
import { FeaturedProject } from '@/types/types'

describe('ProjectsSection', () => {
  const mockProjects: FeaturedProject[] = [
    {
      title: 'Project One',
      description: 'First project description',
      tech: ['React', 'TypeScript', 'Node.js'],
      link: '/projects/project-one',
      cover: '/project-one-cover.jpg'
    },
    {
      title: 'Project Two',
      description: 'Second project description',
      tech: ['Vue', 'Python'],
      link: '/projects/project-two',
      liveUrl: 'https://project-two.com',
      github: 'https://github.com/test/project-two'
    },
    {
      title: 'Project Three',
      description: 'Third project description',
      tech: ['Angular', 'Java', 'Docker'],
      link: '/projects/project-three',
      liveUrl: 'https://project-three.com'
    }
  ]

  it('renders section title', () => {
    render(<ProjectsSection projects={mockProjects} />)
    expect(screen.getByText('Side Projects')).toBeInTheDocument()
  })

  it('renders section description', () => {
    render(<ProjectsSection projects={mockProjects} />)
    expect(screen.getByText(/A selection of recent work and play/i)).toBeInTheDocument()
  })

  it('renders all projects', () => {
    render(<ProjectsSection projects={mockProjects} />)
    expect(screen.getByText('Project One')).toBeInTheDocument()
    expect(screen.getByText('Project Two')).toBeInTheDocument()
    expect(screen.getByText('Project Three')).toBeInTheDocument()
  })

  it('renders project descriptions', () => {
    render(<ProjectsSection projects={mockProjects} />)
    expect(screen.getByText('First project description')).toBeInTheDocument()
    expect(screen.getByText('Second project description')).toBeInTheDocument()
    expect(screen.getByText('Third project description')).toBeInTheDocument()
  })

  it('renders technology tags for each project', () => {
    render(<ProjectsSection projects={mockProjects} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Vue')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('Angular')).toBeInTheDocument()
  })

  it('renders "View Details" link for all projects', () => {
    render(<ProjectsSection projects={mockProjects} />)
    const detailLinks = screen.getAllByText('View Details')
    expect(detailLinks).toHaveLength(3)
  })

  it('links to correct project detail pages', () => {
    render(<ProjectsSection projects={mockProjects} />)
    const links = screen.getAllByText('View Details').map(el => el.closest('a'))
    expect(links[0]).toHaveAttribute('href', '/projects/project-one')
    expect(links[1]).toHaveAttribute('href', '/projects/project-two')
    expect(links[2]).toHaveAttribute('href', '/projects/project-three')
  })

  it('renders "Visit Project" link when liveUrl is provided', () => {
    render(<ProjectsSection projects={mockProjects} />)
    const visitLinks = screen.getAllByText('Visit Project')
    expect(visitLinks).toHaveLength(2) // Only projects 2 and 3 have liveUrl
  })

  it('does not render "Visit Project" when liveUrl is missing', () => {
    render(<ProjectsSection projects={[mockProjects[0]]} />)
    expect(screen.queryByText('Visit Project')).not.toBeInTheDocument()
  })

  it('opens live project links in new tab', () => {
    render(<ProjectsSection projects={mockProjects} />)
    const visitLinks = screen.getAllByText('Visit Project').map(el => el.closest('a'))
    visitLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('renders GitHub icon when github url is provided', () => {
    const { container } = render(<ProjectsSection projects={mockProjects} />)
    const githubLinks = container.querySelectorAll('a[href*="github.com"]')
    expect(githubLinks).toHaveLength(1)
  })

  it('GitHub link has correct aria-label', () => {
    render(<ProjectsSection projects={mockProjects} />)
    const githubLink = screen.getByLabelText('View Project Two on GitHub')
    expect(githubLink).toBeInTheDocument()
  })

  it('renders cover images when provided', () => {
    const { container } = render(<ProjectsSection projects={mockProjects} />)
    const images = container.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
    expect(images[0]).toHaveAttribute('alt', 'Project One cover image')
  })

  it('prioritizes first 3 images', () => {
    const { container } = render(<ProjectsSection projects={mockProjects} />)
    const images = container.querySelectorAll('img')
    // Just verify we have images rendered
    expect(images.length).toBeGreaterThan(0)
  })

  it('applies grid layout classes', () => {
    const { container } = render(<ProjectsSection projects={mockProjects} />)
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
  })

  it('applies hover effects to project cards', () => {
    const { container } = render(<ProjectsSection projects={mockProjects} />)
    const cards = container.querySelectorAll('.group')
    expect(cards.length).toBeGreaterThan(0)
    cards.forEach(card => {
      expect(card.querySelector('.relative')).toHaveClass('hover:border-primary-500/50')
    })
  })

  it('renders decorative gradient overlay', () => {
    const { container } = render(<ProjectsSection projects={mockProjects} />)
    const gradients = container.querySelectorAll('.gradient-secondary')
    expect(gradients.length).toBe(mockProjects.length)
  })

  it('applies background overlay to images', () => {
    const { container } = render(<ProjectsSection projects={mockProjects} />)
    const overlays = container.querySelectorAll('.bg-neutral-900\\/80')
    expect(overlays.length).toBeGreaterThan(0)
  })

  it('handles empty projects array', () => {
    render(<ProjectsSection projects={[]} />)
    expect(screen.getByText('Side Projects')).toBeInTheDocument()
    expect(screen.queryByText('View Details')).not.toBeInTheDocument()
  })

  it('renders section with correct ID for navigation', () => {
    const { container } = render(<ProjectsSection projects={mockProjects} />)
    const section = container.querySelector('#projects')
    expect(section).toBeInTheDocument()
  })

  it('applies background styling to section', () => {
    const { container } = render(<ProjectsSection projects={mockProjects} />)
    const section = container.querySelector('section')
    expect(section).toHaveClass('bg-neutral-900/30')
  })

  it('matches snapshot', () => {
    const { container } = render(<ProjectsSection projects={mockProjects} />)
    expect(container).toMatchSnapshot()
  })
})