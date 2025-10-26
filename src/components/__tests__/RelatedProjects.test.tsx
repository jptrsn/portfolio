import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import RelatedProjects from '../RelatedProjects'
import { Project } from '@/types/types'
import * as projectsLib from '@/lib/projects'

// Mock the getRelatedProjects function
vi.mock('@/lib/projects', () => ({
  getRelatedProjects: vi.fn()
}))

describe('RelatedProjects', () => {
  const currentProject: Project = {
    id: '1',
    slug: 'current-project',
    title: 'Current Project',
    shortDescription: 'Current project description',
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
    tags: [{ name: 'React', category: 'framework' }],
    technologies: ['React', 'TypeScript'],
    images: [],
    links: [],
  }

  const relatedProjects: Project[] = [
    {
      id: '2',
      slug: 'related-one',
      title: 'Related Project One',
      shortDescription: 'First related project',
      longDescription: 'Full detailed description of first related project',
      year: 2023,
      status: {
        current: 'completed',
        deploymentStatus: 'live'
      },
      metadata: {
        difficulty: 'intermediate',
        duration: '2 months'
      },
      tags: [
        { name: 'React', category: 'framework' },
        { name: 'TypeScript', category: 'language' }
      ],
      technologies: ['React', 'TypeScript'],
      images: [
        { url: '/related-one.jpg', alt: 'Related One', isHero: true }
      ],
      links: [],
    },
    {
      id: '3',
      slug: 'related-two',
      title: 'Related Project Two',
      shortDescription: 'Second related project',
      longDescription: 'Full detailed description of second related project',
      year: 2023,
      status: {
        current: 'active',
        deploymentStatus: 'live',
        maintenanceLevel: 'maintained'
      },
      metadata: {
        difficulty: 'advanced',
        duration: '6 months'
      },
      hasCustomHardware: true,
      tags: [
        { name: 'Vue', category: 'framework' },
        { name: 'Python', category: 'language' },
        { name: 'Docker', category: 'tool' }
      ],
      technologies: ['Vue', 'Python', 'Docker'],
      images: [
        { url: '/related-two-1.jpg', alt: 'Related Two Image 1', isHero: false },
        { url: '/related-two-2.jpg', alt: 'Related Two Image 2', isHero: false }
      ],
      links: [],
    },
    {
      id: '4',
      slug: 'related-three',
      title: 'Related Project Three',
      shortDescription: 'Third related project',
      longDescription: 'Full detailed description of third related project',
      year: 2022,
      status: {
        current: 'archived',
        deploymentStatus: 'offline'
      },
      metadata: {
        difficulty: 'beginner',
        duration: '1 month'
      },
      tags: [{ name: 'Angular', category: 'framework' }],
      technologies: ['Angular', 'Java'],
      images: [],
      links: [],
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns null when no related projects', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue([])
    const { container } = render(<RelatedProjects currentProject={currentProject} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders section title when related projects exist', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue(relatedProjects)
    render(<RelatedProjects currentProject={currentProject} />)
    expect(screen.getByText('Related Projects')).toBeInTheDocument()
  })

  it('renders all related projects', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue(relatedProjects)
    render(<RelatedProjects currentProject={currentProject} />)

    expect(screen.getByText('Related Project One')).toBeInTheDocument()
    expect(screen.getByText('Related Project Two')).toBeInTheDocument()
    expect(screen.getByText('Related Project Three')).toBeInTheDocument()
  })

  it('renders project short descriptions', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue(relatedProjects)
    render(<RelatedProjects currentProject={currentProject} />)

    expect(screen.getByText('First related project')).toBeInTheDocument()
    expect(screen.getByText('Second related project')).toBeInTheDocument()
    expect(screen.getByText('Third related project')).toBeInTheDocument()
  })

  it('calls getRelatedProjects with correct parameters', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue(relatedProjects)
    render(<RelatedProjects currentProject={currentProject} />)

    expect(projectsLib.getRelatedProjects).toHaveBeenCalledWith(currentProject, 3)
  })

  it('renders links to project detail pages', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue(relatedProjects)
    render(<RelatedProjects currentProject={currentProject} />)

    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/projects/related-one')
    expect(links[1]).toHaveAttribute('href', '/projects/related-two')
    expect(links[2]).toHaveAttribute('href', '/projects/related-three')
  })

  it('renders hero images when available', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue(relatedProjects.slice(0, 1))
    render(<RelatedProjects currentProject={currentProject} />)

    const image = screen.getByAltText('Related One')
    expect(image).toBeInTheDocument()
  })

  it('renders first image when no hero image', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue([relatedProjects[1]])
    render(<RelatedProjects currentProject={currentProject} />)

    const image = screen.getByAltText('Related Two Image 1')
    expect(image).toBeInTheDocument()
  })

  it('renders gradient background when no images', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue([relatedProjects[2]])
    const { container } = render(<RelatedProjects currentProject={currentProject} />)

    const gradient = container.querySelector('.bg-gradient-to-br')
    expect(gradient).toBeInTheDocument()
  })

  it('displays first 2 tags for each project', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue(relatedProjects)
    render(<RelatedProjects currentProject={currentProject} />)

    // First project has React and TypeScript
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()

    // Second project shows Vue and Python (first 2 of 3 tags)
    expect(screen.getByText('Vue')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
  })

  it('limits tags to 2 per project', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue([relatedProjects[1]])
    render(<RelatedProjects currentProject={currentProject} />)

    // Project has 3 tags but only 2 should be displayed
    expect(screen.getByText('Vue')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.queryByText('Docker')).not.toBeInTheDocument()
  })

  it('applies hover effects', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue(relatedProjects)
    const { container } = render(<RelatedProjects currentProject={currentProject} />)

    // Get all links - there should be 3
    const links = container.querySelectorAll('a')
    expect(links.length).toBe(3)

    // Check that the links have the expected classes
    links.forEach(link => {
      expect(link).toHaveClass('group')
      expect(link).toHaveClass('hover:border-gray-300')
    })
  })

  it('applies scale transform on hover', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue(relatedProjects)
    const { container } = render(<RelatedProjects currentProject={currentProject} />)

    const images = container.querySelectorAll('img')
    images.forEach(img => {
      expect(img).toHaveClass('group-hover:scale-105')
    })
  })

  it('applies line-clamp to descriptions', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue(relatedProjects)
    render(<RelatedProjects currentProject={currentProject} />)

    const descriptions = screen.getAllByText(/related project/)
    descriptions.forEach(desc => {
      expect(desc).toHaveClass('line-clamp-2')
    })
  })

  it('renders in 3-column grid on desktop', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue(relatedProjects)
    const { container } = render(<RelatedProjects currentProject={currentProject} />)

    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('md:grid-cols-3')
  })

  it('applies border top styling', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue(relatedProjects)
    const { container } = render(<RelatedProjects currentProject={currentProject} />)

    const section = container.querySelector('.border-t')
    expect(section).toHaveClass('border-gray-200')
  })

  it('applies gradient background to section', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue(relatedProjects)
    const { container } = render(<RelatedProjects currentProject={currentProject} />)

    const section = container.querySelector('.bg-gradient-primary')
    expect(section).toBeInTheDocument()
  })

  it('renders correct image dimensions', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue([relatedProjects[0]])
    render(<RelatedProjects currentProject={currentProject} />)

    const image = screen.getByAltText('Related One')
    expect(image).toHaveAttribute('width', '300')
    expect(image).toHaveAttribute('height', '180')
  })

  it('matches snapshot with related projects', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue(relatedProjects)
    const { container } = render(<RelatedProjects currentProject={currentProject} />)
    expect(container).toMatchSnapshot()
  })

  it('matches snapshot with no related projects', () => {
    vi.mocked(projectsLib.getRelatedProjects).mockReturnValue([])
    const { container } = render(<RelatedProjects currentProject={currentProject} />)
    expect(container).toMatchSnapshot('RelatedProjects-empty')
  })
})