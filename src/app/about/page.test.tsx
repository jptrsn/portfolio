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

  it('renders the heading', () => {
    render(<AboutPage />)
    expect(screen.getByRole('heading', { name: "Hi, I'm James" })).toBeInTheDocument()
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
    expect(screen.getByText(/full-stack software developer/i)).toBeInTheDocument()
    expect(screen.getByText(/decade of web development experience/i)).toBeInTheDocument()
  })

  it('renders the teacher background paragraph', () => {
    render(<AboutPage />)
    expect(screen.getByText(/former teacher/i)).toBeInTheDocument()
    expect(screen.getByText(/empower learners/i)).toBeInTheDocument()
  })

  it('renders the knowledge sharing philosophy', () => {
    render(<AboutPage />)
    expect(screen.getByText(/knowledge should be shared freely/i)).toBeInTheDocument()
    expect(screen.getByText(/people are more important that profits/i)).toBeInTheDocument()
  })

  it('renders the problem solving paragraph', () => {
    render(<AboutPage />)
    expect(screen.getByText(/love solving problems/i)).toBeInTheDocument()
    expect(screen.getByText(/brainstorming new ideas/i)).toBeInTheDocument()
  })

  it('renders the hobby electronics paragraph', () => {
    render(<AboutPage />)
    expect(screen.getByText(/hobby electronics/i)).toBeInTheDocument()
    expect(screen.getByText(/3D printing/i)).toBeInTheDocument()
    expect(screen.getByText(/blinking lights/i)).toBeInTheDocument()
  })

  it('has correct page structure with proper classes', () => {
    const { container } = render(<AboutPage />)
    const pageContainer = container.firstChild as HTMLElement
    expect(pageContainer).toHaveClass('min-h-screen', 'bg-background', 'text-foreground', 'pt-24', 'px-6')
  })

  it('has correct container max-width', () => {
    const { container } = render(<AboutPage />)
    const mainContainer = container.querySelector('.max-w-4xl')
    expect(mainContainer).toBeInTheDocument()
    expect(mainContainer).toHaveClass('container', 'mx-auto')
  })

  it('renders all 5 content paragraphs', () => {
    const { container } = render(<AboutPage />)
    const paragraphs = container.querySelectorAll('.flex-col > p')
    expect(paragraphs.length).toBe(5)
  })

  it('has proper vertical spacing between paragraphs', () => {
    const { container } = render(<AboutPage />)
    const contentDiv = container.querySelector('.flex-col.gap-6')
    expect(contentDiv).toBeInTheDocument()
    expect(contentDiv).toHaveClass('my-8')
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

    // Verify heading exists and is h2
    const heading = screen.getByRole('heading', { name: "Hi, I'm James" })
    expect(heading.tagName).toBe('H2')

    // Verify image container exists
    const imageContainer = container.querySelector('.flex.items-center.justify-center')
    expect(imageContainer).toBeInTheDocument()

    // Verify content container with paragraphs
    const contentDiv = container.querySelector('.flex-col.gap-6.my-8')
    expect(contentDiv).toBeInTheDocument()

    // Verify all 5 paragraphs are present
    const paragraphs = contentDiv?.querySelectorAll('p')
    expect(paragraphs?.length).toBe(5)
  })
})