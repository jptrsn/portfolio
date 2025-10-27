import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Experience from './page'

describe('Experience Page', () => {
  it('renders the page heading', () => {
    render(<Experience />)
    const heading = screen.getByRole('heading', { name: /experience/i, level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('applies correct layout classes', () => {
    const { container } = render(<Experience />)
    const mainDiv = container.firstChild as HTMLElement

    expect(mainDiv).toHaveClass('min-h-screen')
    expect(mainDiv).toHaveClass('bg-background')
    expect(mainDiv).toHaveClass('text-foreground')
    expect(mainDiv).toHaveClass('pt-24')
    expect(mainDiv).toHaveClass('px-6')
  })

  it('renders container with correct max-width', () => {
    render(<Experience />)
    const container = screen.getByRole('heading').parentElement

    expect(container).toHaveClass('container')
    expect(container).toHaveClass('mx-auto')
    expect(container).toHaveClass('max-w-4xl')
  })

  it('applies gradient text class to heading', () => {
    render(<Experience />)
    const heading = screen.getByRole('heading', { name: /experience/i })

    expect(heading).toHaveClass('text-gradient')
    expect(heading).toHaveClass('mb-8')
  })
})