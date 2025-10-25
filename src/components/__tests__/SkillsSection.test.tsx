import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { SkillsSection } from '../SkillSection'
import { SkillNode } from '@/types/types'

describe('SkillsSection', () => {
  const mockSkills: SkillNode[] = [
    {
      id: '1',
      label: 'TypeScript',
      category: 'language',
      proficiencyLevel: 'expert',
      description: 'Strongly-typed JavaScript',
      relatedTo: ['2'],
    },
    {
      id: '2',
      label: 'React',
      category: 'framework',
      proficiencyLevel: 'expert',
      description: 'UI library',
      relatedTo: ['1'],
    },
    {
      id: '3',
      label: 'PostgreSQL',
      category: 'database',
      proficiencyLevel: 'advanced',
      description: 'Relational database',
      relatedTo: [],
    },
  ]

  beforeEach(() => {
    // Reset any state between tests
  })

  it('renders the section title', () => {
    render(<SkillsSection skills={mockSkills} />)
    expect(screen.getByText(/Experience & Skills/i)).toBeInTheDocument()
  })

  it('displays all category filters', () => {
    render(<SkillsSection skills={mockSkills} />)

    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /language/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /framework/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /database/i })).toBeInTheDocument()
  })

  it('filters skills by category when category button is clicked', () => {
    render(<SkillsSection skills={mockSkills} />)

    // Initially shows first skill (TypeScript) - use heading role for main card
    expect(screen.getByRole('heading', { name: 'TypeScript' })).toBeInTheDocument()

    // Click database category
    const databaseButton = screen.getByRole('button', { name: /database/i })
    fireEvent.click(databaseButton)

    // Should show PostgreSQL in the main card
    expect(screen.getByRole('heading', { name: 'PostgreSQL' })).toBeInTheDocument()

    // TypeScript heading should not be in the main card anymore
    expect(screen.queryByRole('heading', { name: 'TypeScript' })).not.toBeInTheDocument()
  })

  it('navigates through skills with next/previous buttons', () => {
    render(<SkillsSection skills={mockSkills} />)

    // Initially shows TypeScript in main card
    expect(screen.getByRole('heading', { name: 'TypeScript' })).toBeInTheDocument()

    // Click next
    const nextButton = screen.getByRole('button', { name: /Next skill/i })
    fireEvent.click(nextButton)

    // Should show React in main card
    expect(screen.getByRole('heading', { name: 'React' })).toBeInTheDocument()

    // Click previous
    const prevButton = screen.getByRole('button', { name: /Previous skill/i })
    fireEvent.click(prevButton)

    // Back to TypeScript
    expect(screen.getByRole('heading', { name: 'TypeScript' })).toBeInTheDocument()
  })

  it('navigates with keyboard arrows', () => {
    render(<SkillsSection skills={mockSkills} />)

    expect(screen.getByRole('heading', { name: 'TypeScript' })).toBeInTheDocument()

    // Press right arrow
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(screen.getByRole('heading', { name: 'React' })).toBeInTheDocument()

    // Press left arrow
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    expect(screen.getByRole('heading', { name: 'TypeScript' })).toBeInTheDocument()
  })

  it('displays proficiency level when available', () => {
    render(<SkillsSection skills={mockSkills} />)
    expect(screen.getByText('expert')).toBeInTheDocument()
  })

  it('displays skill description', () => {
    render(<SkillsSection skills={mockSkills} />)
    expect(screen.getByText('Strongly-typed JavaScript')).toBeInTheDocument()
  })

  it('shows related skills section when skills have relations', () => {
    render(<SkillsSection skills={mockSkills} />)

    expect(screen.getByText('Related Skills')).toBeInTheDocument()

    // React should be listed as related (look for it in a button, not the main heading)
    const relatedButtons = screen.getAllByRole('button')
    const reactRelatedButton = relatedButtons.find(btn =>
      btn.textContent?.includes('React') && btn.className.includes('bg-neutral-800')
    )
    expect(reactRelatedButton).toBeInTheDocument()
  })

  it('navigates to related skill when clicked', () => {
    render(<SkillsSection skills={mockSkills} />)

    // Currently on TypeScript (in main card)
    expect(screen.getByRole('heading', { name: 'TypeScript', level: 3 })).toBeInTheDocument()

    // Find and click on the related React skill button (not the thumbnail)
    const relatedButtons = screen.getAllByRole('button')
    const reactRelatedButton = relatedButtons.find(btn =>
      btn.textContent?.includes('React') && btn.className.includes('bg-neutral-800')
    )

    fireEvent.click(reactRelatedButton!)

    // Should navigate to React in main card
    expect(screen.getByRole('heading', { name: 'React', level: 3 })).toBeInTheDocument()
  })

  it('renders thumbnails for all filtered skills', () => {
    render(<SkillsSection skills={mockSkills} />)

    // Get all thumbnail buttons - they have the specific styling class
    const thumbnails = screen.getAllByRole('button').filter(btn =>
      btn.className.includes('flex-shrink-0') && btn.className.includes('w-32')
    )

    expect(thumbnails.length).toBe(3)
  })

  it('highlights active thumbnail', () => {
    render(<SkillsSection skills={mockSkills} />)

    // Find all thumbnail buttons
    const thumbnails = screen.getAllByRole('button').filter(btn =>
      btn.className.includes('flex-shrink-0') && btn.className.includes('w-32')
    )

    // First thumbnail should be active
    expect(thumbnails[0]).toHaveClass('border-primary-500')

    // Others should not be active
    expect(thumbnails[1]).not.toHaveClass('border-primary-500')
  })

  it('updates pagination dots based on current index', () => {
    render(<SkillsSection skills={mockSkills} />)

    const dots = screen.getAllByLabelText(/Go to skill/i)
    expect(dots).toHaveLength(3)

    // First dot should be active (wider)
    expect(dots[0]).toHaveClass('w-8')
    expect(dots[1]).toHaveClass('w-2')
  })
})