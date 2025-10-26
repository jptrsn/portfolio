import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Typewriter, TypewriterSimple } from '../Typewriter'

describe('Typewriter', () => {
  it('renders with cursor visible initially', () => {
    const { container } = render(<Typewriter text="Hello" />)
    const visibleSpan = container.querySelector('.absolute')
    // Cursor is visible from the start
    expect(visibleSpan?.textContent).toBe('|')
  })

  it('shows cursor by default', () => {
    const { container } = render(<Typewriter text="Hello" />)
    const cursor = container.querySelector('.typewriter-cursor')
    expect(cursor).toBeInTheDocument()
  })

  it('hides cursor when showCursor is false', () => {
    const { container } = render(<Typewriter text="Hello" showCursor={false} />)
    const cursor = container.querySelector('.typewriter-cursor')
    expect(cursor).not.toBeInTheDocument()
  })

  it('uses default cursor character |', () => {
    const { container } = render(<Typewriter text="Hi" />)
    const cursor = container.querySelector('.typewriter-cursor')
    expect(cursor?.textContent).toBe('|')
  })

  it('uses custom cursor character', () => {
    const { container } = render(<Typewriter text="Hi" cursorChar="_" />)
    const cursor = container.querySelector('.typewriter-cursor')
    expect(cursor?.textContent).toBe('_')
  })

  it('applies custom className', () => {
    const { container } = render(<Typewriter text="Hello" className="custom-class" />)
    const hiddenSpan = container.querySelector('.invisible')
    const visibleSpan = container.querySelector('.absolute')

    expect(hiddenSpan).toHaveClass('custom-class')
    expect(visibleSpan).toHaveClass('custom-class')
  })

  it('renders hidden text for space reservation', () => {
    const { container } = render(<Typewriter text="Hello World" />)
    const hiddenSpan = container.querySelector('.invisible')

    expect(hiddenSpan).toHaveTextContent('Hello World')
    expect(hiddenSpan).toHaveClass('w-full', 'inline-block')
  })

  it('positions visible text absolutely', () => {
    const { container } = render(<Typewriter text="Hello" />)
    const visibleSpan = container.querySelector('.absolute')

    expect(visibleSpan).toHaveClass('absolute', 'top-0', 'left-0', 'w-full')
  })

  it('handles empty text', () => {
    const { container } = render(<Typewriter text="" />)
    expect(container.querySelector('.absolute')).toBeInTheDocument()
  })

  it('maintains word wrapping', () => {
    const { container } = render(<Typewriter text="Hello World" />)
    const visibleSpan = container.querySelector('.absolute')

    expect(visibleSpan).toHaveStyle({ maxWidth: '100%', wordWrap: 'break-word' })
  })

  it('renders with correct structure', () => {
    const { container } = render(<Typewriter text="Test" />)

    // Should have a container span
    const containerSpan = container.querySelector('.relative.inline-block.w-full')
    expect(containerSpan).toBeInTheDocument()

    // Should have hidden text
    const hiddenText = container.querySelector('.invisible')
    expect(hiddenText).toBeInTheDocument()

    // Should have visible text
    const visibleText = container.querySelector('.absolute')
    expect(visibleText).toBeInTheDocument()

    // Should have cursor
    const cursor = container.querySelector('.typewriter-cursor')
    expect(cursor).toBeInTheDocument()
  })

  it('cursor does not have animate-pulse class initially', () => {
    const { container } = render(<Typewriter text="Hello" />)
    const cursor = container.querySelector('.typewriter-cursor')

    // Initially cursor should not be blinking
    expect(cursor).not.toHaveClass('animate-pulse')
  })

  it('resets display text when text prop changes', () => {
    const { container, rerender } = render(<Typewriter text="Hello" />)

    // Rerender with new text
    rerender(<Typewriter text="World" />)

    const visibleSpan = container.querySelector('.absolute')
    // After text change, should reset to just cursor
    expect(visibleSpan?.textContent).toBe('|')
  })

  it('hidden text updates when prop changes', () => {
    const { container, rerender } = render(<Typewriter text="Hello" />)
    const hiddenSpan = container.querySelector('.invisible')

    expect(hiddenSpan).toHaveTextContent('Hello')

    rerender(<Typewriter text="Goodbye" />)
    expect(hiddenSpan).toHaveTextContent('Goodbye')
  })
})

describe('TypewriterSimple', () => {
  it('renders with cursor visible initially', () => {
    const { container } = render(<TypewriterSimple text="Hello" />)
    const visibleSpan = container.querySelector('.absolute')
    expect(visibleSpan?.textContent).toBe('|')
  })

  it('shows cursor by default', () => {
    const { container } = render(<TypewriterSimple text="Hello" />)
    const visibleSpan = container.querySelector('.absolute')
    expect(visibleSpan?.textContent).toContain('|')
  })

  it('uses custom cursor character', () => {
    const { container } = render(<TypewriterSimple text="Hi" cursorChar="_" />)
    const visibleSpan = container.querySelector('.absolute')
    expect(visibleSpan?.textContent).toContain('_')
  })

  it('applies custom className', () => {
    const { container } = render(<TypewriterSimple text="Hello" className="test-class" />)
    const hiddenSpan = container.querySelector('.invisible')
    const visibleSpan = container.querySelector('.absolute')

    expect(hiddenSpan).toHaveClass('test-class')
    expect(visibleSpan).toHaveClass('test-class')
  })

  it('includes global blink animation styles', () => {
    const { container } = render(<TypewriterSimple text="Hello" />)
    const style = container.querySelector('style')

    expect(style?.textContent).toContain('@keyframes typewriter-blink')
  })

  it('renders with correct structure', () => {
    const { container } = render(<TypewriterSimple text="Test" />)

    // Should have a container span
    const containerSpan = container.querySelector('.relative.inline-block.w-full')
    expect(containerSpan).toBeInTheDocument()

    // Should have hidden text
    const hiddenText = container.querySelector('.invisible')
    expect(hiddenText).toBeInTheDocument()

    // Should have visible text
    const visibleText = container.querySelector('.absolute')
    expect(visibleText).toBeInTheDocument()
  })

  it('resets display text when text prop changes', () => {
    const { container, rerender } = render(<TypewriterSimple text="Hello" />)

    rerender(<TypewriterSimple text="Goodbye" />)

    const visibleSpan = container.querySelector('.absolute')
    // After text change, should reset to just cursor
    expect(visibleSpan?.textContent).toBe('|')
  })

  it('cursor does not have animate-pulse class initially', () => {
    const { container } = render(<TypewriterSimple text="Hello" />)
    const visibleSpan = container.querySelector('.absolute')
    const cursorSpan = visibleSpan?.querySelector('.animate-pulse')

    // Initially cursor should not be blinking
    expect(cursorSpan).not.toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { container } = render(<TypewriterSimple text="Hello World" />)
    expect(container).toMatchSnapshot()
  })
})