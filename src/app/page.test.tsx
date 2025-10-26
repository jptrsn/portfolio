import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HomePage from '@/app/page'

// Mock the child components
vi.mock('@/components/Navigation', () => ({
  default: () => <nav data-testid="navigation">Navigation</nav>
}))

vi.mock('@/components/ProjectsSection', () => ({
  ProjectsSection: ({ projects }: { projects: unknown[] }) => (
    <section data-testid="projects-section">Projects: {projects.length}</section>
  )
}))

vi.mock('@/components/ScrollToTop', () => ({
  default: ({ threshold }: { threshold: number }) => (
    <button data-testid="scroll-to-top">Scroll {threshold}</button>
  )
}))

vi.mock('@/components/SkillSection', () => ({
  SkillsSection: ({ skills }: { skills: unknown[] }) => (
    <section data-testid="skills-section">Skills: {skills.length}</section>
  )
}))

vi.mock('@/components/Typewriter', () => ({
  Typewriter: ({ text }: { text: string }) => <span data-testid="typewriter">{text}</span>
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ChevronDown: () => <svg data-testid="chevron-down" />,
  Code: () => <svg data-testid="code-icon" />
}))

// Mock the data modules
vi.mock('@/data/contactInfo', () => ({
  contactInfo: [
    { href: 'https://github.com', label: 'GitHub', icon: <span>GitHub</span> },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: <span>LinkedIn</span> }
  ]
}))

vi.mock('@/data/projectInfo', () => ({
  sideProjects: [
    { title: 'Project 1' },
    { title: 'Project 2' }
  ]
}))

vi.mock('@/lib/skill', () => ({
  getSkillsData: () => [
    { id: 'skill1', label: 'TypeScript' },
    { id: 'skill2', label: 'React' }
  ]
}))

vi.mock('@/lib/metadata', () => ({
  generateExtendedMetadata: () => ({
    title: 'EduCoder Dot Dev',
    description: 'Portfolio'
  })
}))

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />)
    expect(screen.getByTestId('navigation')).toBeInTheDocument()
  })

  it('renders the hero section with typewriter text', () => {
    render(<HomePage />)
    expect(screen.getByTestId('typewriter')).toHaveTextContent('Software Engineer & Educator')
  })

  it('renders the tagline', () => {
    render(<HomePage />)
    expect(screen.getByText(/Building human-centric applications/i)).toBeInTheDocument()
  })

  it('renders the Code icon', () => {
    render(<HomePage />)
    expect(screen.getByTestId('code-icon')).toBeInTheDocument()
  })

  it('renders contact links in hero section', () => {
    render(<HomePage />)
    const links = screen.getAllByRole('link')
    const githubLinks = links.filter(link => link.getAttribute('href') === 'https://github.com')
    const linkedinLinks = links.filter(link => link.getAttribute('href') === 'https://linkedin.com')

    expect(githubLinks.length).toBeGreaterThan(0)
    expect(linkedinLinks.length).toBeGreaterThan(0)
  })

  it('contact links have aria-labels', () => {
    render(<HomePage />)
    expect(screen.getAllByLabelText('GitHub').length).toBeGreaterThan(0)
    expect(screen.getAllByLabelText('LinkedIn').length).toBeGreaterThan(0)
  })

  it('contact links open in new tab', () => {
    render(<HomePage />)
    const links = screen.getAllByRole('link').filter(link =>
      link.getAttribute('target') === '_blank'
    )
    expect(links.length).toBeGreaterThan(0)
  })

  it('renders scroll indicator with correct link', () => {
    render(<HomePage />)
    const scrollLink = screen.getByLabelText('Skills')
    expect(scrollLink).toHaveAttribute('href', '#skills')
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument()
  })

  it('renders skills section with skills data', () => {
    render(<HomePage />)
    expect(screen.getByTestId('skills-section')).toHaveTextContent('Skills: 2')
  })

  it('renders projects section with projects data', () => {
    render(<HomePage />)
    expect(screen.getByTestId('projects-section')).toHaveTextContent('Projects: 2')
  })

  it('renders connect section', () => {
    render(<HomePage />)
    expect(screen.getByText(/Let's/i)).toBeInTheDocument()
    expect(screen.getByText(/Build Something/i)).toBeInTheDocument()
    expect(screen.getByText(/Amazing Together/i)).toBeInTheDocument()
  })

  it('renders connect section description', () => {
    render(<HomePage />)
    expect(screen.getByText(/I'm always interested in discussing/i)).toBeInTheDocument()
  })

  it('renders contact info in connect section with labels', () => {
    render(<HomePage />)
    // In connect section, labels are displayed as text
    const githubLabels = screen.getAllByText('GitHub')
    const linkedinLabels = screen.getAllByText('LinkedIn')

    expect(githubLabels.length).toBeGreaterThan(0)
    expect(linkedinLabels.length).toBeGreaterThan(0)
  })

  it('renders footer with copyright', () => {
    render(<HomePage />)
    expect(screen.getByText('© 2025 EduCoder.dev')).toBeInTheDocument()
  })

  it('renders scroll to top button with correct threshold', () => {
    render(<HomePage />)
    expect(screen.getByTestId('scroll-to-top')).toHaveTextContent('500')
  })

  it('has correct section IDs for navigation', () => {
    const { container } = render(<HomePage />)
    expect(container.querySelector('#top')).toBeInTheDocument()
    expect(container.querySelector('#connect')).toBeInTheDocument()
    // #skills is inside SkillsSection component which is mocked
  })

  it('applies correct CSS classes to main container', () => {
    const { container } = render(<HomePage />)
    const main = container.firstChild as HTMLElement
    expect(main).toHaveClass('min-h-screen', 'bg-background', 'text-foreground')
  })

  it('hero section has correct structure', () => {
    const { container } = render(<HomePage />)
    const heroSection = container.querySelector('#top')
    expect(heroSection).toHaveClass('pt-24', 'pb-16', 'px-6', 'min-h-screen')
  })

  it('matches snapshot', () => {
    const { container } = render(<HomePage />)
    expect(container).toMatchSnapshot()
  })
})