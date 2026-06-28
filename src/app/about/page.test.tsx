import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AboutPage from '@/app/about/page'

vi.mock('@/components/Navigation', () => ({
  default: () => <nav data-testid="navigation">Navigation</nav>
}))

describe('AboutPage', () => {
  it('renders without crashing', () => {
    render(<AboutPage />)
    expect(screen.getByTestId('navigation')).toBeInTheDocument()
  })

  it('renders the headshot image', () => {
    const { container } = render(<AboutPage />)
    const image = container.querySelector('img[alt="Headshot"]')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src')
    expect(image).toHaveAttribute('width', '215')
    expect(image).toHaveAttribute('height', '215')
  })

  it('image has correct styling classes', () => {
    const { container } = render(<AboutPage />)
    const image = container.querySelector('img')
    expect(image).toHaveClass('rounded-xl', 'object-cover', 'aspect-1/1')
  })

  it('renders the introduction paragraph', () => {
    render(<AboutPage />)
    expect(screen.getByText(/full-stack engineer/i)).toBeInTheDocument()
  })

  it('renders the education origin story', () => {
    render(<AboutPage />)
    expect(screen.getByText(/licensed to teach/i)).toBeInTheDocument()
    expect(screen.getByText(/builder's mindset to software/i)).toBeInTheDocument()
  })

  it('renders the tinkerer identity', () => {
    render(<AboutPage />)
    expect(screen.getByText(/tinkerer/i)).toBeInTheDocument()
    expect(screen.getByText(/relentless curiosity/i)).toBeInTheDocument()
  })

  it('renders the values paragraph', () => {
    render(<AboutPage />)
    expect(screen.getByText(/deep end-to-end ownership/i)).toBeInTheDocument()
    expect(screen.getByText(/open source/i)).toBeInTheDocument()
  })

  it('renders the forward-looking paragraph', () => {
    render(<AboutPage />)
    expect(screen.getByText(/learning is the point/i)).toBeInTheDocument()
    expect(screen.getByText(/stretching beyond/i)).toBeInTheDocument()
  })

  it('has correct page structure with proper classes', () => {
    const { container } = render(<AboutPage />)
    const pageContainer = container.firstChild as HTMLElement
    expect(pageContainer).toHaveClass('min-h-screen', 'bg-secondary-700/50', 'text-foreground', 'pt-24', 'px-6')
  })

  it('has correct container max-width', () => {
    const { container } = render(<AboutPage />)
    const mainContainer = container.querySelector('.max-w-4xl')
    expect(mainContainer).toBeInTheDocument()
    expect(mainContainer).toHaveClass('container', 'mx-auto')
  })

  it('renders 5 content paragraphs', () => {
    const { container } = render(<AboutPage />)
    const paragraphs = container.querySelectorAll('.flex-col > p')
    expect(paragraphs.length).toBe(5)
  })

  it('has proper vertical spacing between paragraphs', () => {
    const { container } = render(<AboutPage />)
    const contentDiv = container.querySelector('.flex-col.gap-6')
    expect(contentDiv).toBeInTheDocument()
    expect(contentDiv).toHaveClass('mt-8')
  })

  it('image is centered', () => {
    const { container } = render(<AboutPage />)
    const imageContainer = container.querySelector('.flex.items-center.justify-center')
    expect(imageContainer).toBeInTheDocument()
  })

  it('renders all required sections with correct structure', () => {
    const { container } = render(<AboutPage />)

    // Verify main container structure
    const mainContainer = container.firstChild as HTMLElement
    expect(mainContainer).toBeInTheDocument()
    expect(mainContainer.tagName).toBe('DIV')

    // Verify image container exists (heading removed)
    const imageContainer = container.querySelector('.flex.items-center.justify-center')
    expect(imageContainer).toBeInTheDocument()

    // Verify content container with paragraphs
    const contentDiv = container.querySelector('.flex-col.gap-6.mt-8.pb-12')
    expect(contentDiv).toBeInTheDocument()

    // Verify all 5 paragraphs are present
    const paragraphs = contentDiv?.querySelectorAll('p')
    expect(paragraphs?.length).toBe(5)
  })
})