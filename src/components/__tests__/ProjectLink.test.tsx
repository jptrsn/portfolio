import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProjectLinkButton from '../ProjectLink'
import { ProjectLink } from '@/types/types'

describe('ProjectLinkButton', () => {
  const baseLink: ProjectLink = {
    type: 'github',
    label: 'View on GitHub',
    url: 'https://github.com/test/repo',
    isAvailable: true
  }

  it('renders github link with correct icon', () => {
    render(<ProjectLinkButton link={baseLink} />)
    expect(screen.getByText('View on GitHub')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://github.com/test/repo')
  })

  it('renders demo link with correct icon', () => {
    const demoLink: ProjectLink = {
      ...baseLink,
      type: 'demo',
      label: 'View Demo',
      url: 'https://demo.test.com'
    }
    render(<ProjectLinkButton link={demoLink} />)
    expect(screen.getByText('View Demo')).toBeInTheDocument()
  })

  it('renders video link with correct icon', () => {
    const videoLink: ProjectLink = {
      ...baseLink,
      type: 'video',
      label: 'Watch Video'
    }
    render(<ProjectLinkButton link={videoLink} />)
    expect(screen.getByText('Watch Video')).toBeInTheDocument()
  })

  it('renders documentation link with correct icon', () => {
    const docLink: ProjectLink = {
      ...baseLink,
      type: 'documentation',
      label: 'Read Docs'
    }
    render(<ProjectLinkButton link={docLink} />)
    expect(screen.getByText('Read Docs')).toBeInTheDocument()
  })

  it('renders other link type with generic icon', () => {
    const otherLink: ProjectLink = {
      ...baseLink,
      type: 'other',
      label: 'Other Link'
    }
    render(<ProjectLinkButton link={otherLink} />)
    expect(screen.getByText('Other Link')).toBeInTheDocument()
  })

  it('applies github-specific styles', () => {
    render(<ProjectLinkButton link={baseLink} />)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('bg-neutral-900', 'dark:bg-neutral-700')
  })

  it('applies non-github link styles', () => {
    const demoLink: ProjectLink = { ...baseLink, type: 'demo' }
    render(<ProjectLinkButton link={demoLink} />)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('bg-blue-600')
  })

  it('opens link in new tab', () => {
    render(<ProjectLinkButton link={baseLink} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders unavailable link as disabled div', () => {
    const unavailableLink: ProjectLink = {
      ...baseLink,
      isAvailable: false,
      note: 'Coming soon'
    }
    render(<ProjectLinkButton link={unavailableLink} />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText('View on GitHub')).toBeInTheDocument()
    expect(screen.getByText('(Coming soon)')).toBeInTheDocument()
  })

  it('applies disabled styles to unavailable links', () => {
    const unavailableLink: ProjectLink = {
      ...baseLink,
      isAvailable: false
    }
    const { container } = render(<ProjectLinkButton link={unavailableLink} />)
    const div = container.querySelector('.cursor-not-allowed')
    expect(div).toHaveClass('bg-neutral-100', 'dark:bg-neutral-700', 'text-gray-400')
  })

  it('displays note when provided for unavailable link', () => {
    const unavailableLink: ProjectLink = {
      ...baseLink,
      isAvailable: false,
      note: 'Private repository'
    }
    render(<ProjectLinkButton link={unavailableLink} />)
    expect(screen.getByText('(Private repository)')).toBeInTheDocument()
  })

  it('renders icon for each link type', () => {
    const linkTypes: Array<ProjectLink['type']> = ['github', 'demo', 'video', 'documentation', 'other']

    linkTypes.forEach(type => {
      const { container, unmount } = render(
        <ProjectLinkButton link={{ ...baseLink, type }} />
      )
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveClass('w-4', 'h-4')
      unmount()
    })
  })

  it('includes icon and label in link', () => {
    const { container } = render(<ProjectLinkButton link={baseLink} />)
    const link = screen.getByRole('link')
    const svg = container.querySelector('svg')

    expect(link).toContainElement(svg)
    expect(link).toHaveTextContent('View on GitHub')
  })

  it('applies transition and hover effects', () => {
    render(<ProjectLinkButton link={baseLink} />)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('transition-all', 'duration-200')
  })

  it('renders available link with complete structure', () => {
    const { container } = render(<ProjectLinkButton link={baseLink} />)

    // Verify link element exists
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link.tagName).toBe('A')

    // Verify link has correct classes
    expect(link).toHaveClass('inline-flex', 'items-center', 'gap-2')

    // Verify icon exists
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('w-4', 'h-4')

    // Verify label text
    expect(link).toHaveTextContent('View on GitHub')

    // Verify attributes
    expect(link).toHaveAttribute('href', 'https://github.com/test/repo')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders unavailable link with complete structure', () => {
    const unavailableLink: ProjectLink = {
      ...baseLink,
      isAvailable: false,
      note: 'Coming soon'
    }
    const { container } = render(<ProjectLinkButton link={unavailableLink} />)

    // Verify it's a div, not a link
    expect(screen.queryByRole('link')).not.toBeInTheDocument()

    // Verify container div exists
    const div = container.querySelector('.cursor-not-allowed')
    expect(div).toBeInTheDocument()
    expect(div?.tagName).toBe('DIV')

    // Verify disabled styling
    expect(div).toHaveClass('bg-neutral-100', 'text-gray-400')

    // Verify icon exists
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()

    // Verify label and note text
    expect(div).toHaveTextContent('View on GitHub')
    expect(div).toHaveTextContent('(Coming soon)')
  })
})