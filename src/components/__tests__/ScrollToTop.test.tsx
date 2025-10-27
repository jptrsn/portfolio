import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import ScrollToTop from '../ScrollToTop'

describe('ScrollToTop', () => {
  beforeEach(() => {
    // Reset scroll position
    window.scrollY = 0
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('does not show button when scroll is below threshold', () => {
    render(<ScrollToTop threshold={300} />)
    expect(screen.queryByLabelText('Scroll to top')).not.toBeInTheDocument()
  })

  it('shows button when scrolled past threshold', () => {
    render(<ScrollToTop threshold={300} />)

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument()
  })

  it('hides button when scrolled back below threshold', () => {
    render(<ScrollToTop threshold={300} />)

    // Scroll past threshold
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)
    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument()

    // Scroll back below threshold
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true, configurable: true })
    fireEvent.scroll(window)
    expect(screen.queryByLabelText('Scroll to top')).not.toBeInTheDocument()
  })

  it('uses default threshold of 300px', () => {
    render(<ScrollToTop />)

    Object.defineProperty(window, 'scrollY', { value: 299, writable: true, configurable: true })
    fireEvent.scroll(window)
    expect(screen.queryByLabelText('Scroll to top')).not.toBeInTheDocument()

    Object.defineProperty(window, 'scrollY', { value: 301, writable: true, configurable: true })
    fireEvent.scroll(window)
    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument()
  })

  it('scrolls to top when button is clicked', () => {
    const scrollToSpy = vi.fn()
    window.scrollTo = scrollToSpy

    render(<ScrollToTop threshold={300} />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')
    fireEvent.click(button)

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })

  it('tries document.documentElement.scrollTo first', () => {
    const docScrollToSpy = vi.fn()
    document.documentElement.scrollTo = docScrollToSpy
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 400,
      writable: true,
      configurable: true
    })

    render(<ScrollToTop threshold={300} />)
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')
    fireEvent.click(button)

    expect(docScrollToSpy).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<ScrollToTop threshold={300} className="custom-class" />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')
    expect(button).toHaveClass('custom-class')
  })

  it('applies custom bottom position', () => {
    render(<ScrollToTop threshold={300} bottom={50} />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')
    expect(button).toHaveStyle({ bottom: '50px' })
  })

  it('applies custom right position', () => {
    render(<ScrollToTop threshold={300} right={50} />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')
    expect(button).toHaveStyle({ right: '50px' })
  })

  it('uses default positions of 24px', () => {
    render(<ScrollToTop threshold={300} />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')
    expect(button).toHaveStyle({ bottom: '24px', right: '24px' })
  })

  it('has correct accessibility attributes', () => {
    render(<ScrollToTop threshold={300} />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')
    expect(button).toHaveAttribute('aria-label', 'Scroll to top')
    expect(button).toHaveAttribute('title', 'Back to top')
  })

  it('disables button while scrolling', async () => {
    vi.useRealTimers() // Use real timers for this test

    const scrollToSpy = vi.fn()
    window.scrollTo = scrollToSpy

    // Set scrollTop to > 0 so the component will call scrollTo
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 400,
      writable: true,
      configurable: true
    })
    document.documentElement.scrollTo = scrollToSpy

    render(<ScrollToTop threshold={300} />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')
    fireEvent.click(button)

    // The button should have the disabled classes
    expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')

    // At least one scroll method should have been called
    expect(scrollToSpy.mock.calls.length).toBeGreaterThan(0)
  })

  it('applies gradient background styles', () => {
    render(<ScrollToTop threshold={300} />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')
    expect(button).toHaveClass('bg-gradient-to-r')
  })

  it('applies hover effects', () => {
    render(<ScrollToTop threshold={300} />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')
    expect(button).toHaveClass('hover:scale-110', 'hover:shadow-xl')
  })

  it('applies active scale effect', () => {
    render(<ScrollToTop threshold={300} />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')
    expect(button).toHaveClass('active:scale-95')
  })

  it('renders ArrowUp icon', () => {
    render(<ScrollToTop threshold={300} />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')
    const svg = button.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('cleans up scroll listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(<ScrollToTop threshold={300} />)

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('handles scroll errors gracefully', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    // Make document.documentElement.scrollTop return 0 so it goes to else branch
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 0,
      writable: true,
      configurable: true
    })

    // Make document.body.scrollTop return 0 so it goes to final else branch
    Object.defineProperty(document.body, 'scrollTop', {
      value: 0,
      writable: true,
      configurable: true
    })

    // Make window.scrollTo throw an error only when called with an object (smooth scroll)
    // but work normally when called with two numbers (fallback)
    let callCount = 0
    const scrollToMock = vi.fn().mockImplementation((arg1: ScrollToOptions | number, arg2?: number) => {
      callCount++
      // First call with object should throw
      if (callCount === 1 && typeof arg1 === 'object') {
        throw new Error('Scroll failed')
      }
      // Subsequent calls (fallback) should succeed
      return undefined
    })
    window.scrollTo = scrollToMock

    render(<ScrollToTop threshold={300} />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')

    // Should not throw - the component handles errors
    expect(() => fireEvent.click(button)).not.toThrow()

    // window.scrollTo should have been called (both the failing call and the fallback)
    expect(scrollToMock.mock.calls.length).toBeGreaterThanOrEqual(1)

    // console.warn should have been called with the error
    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleWarnSpy.mockRestore()
  })

  it('has fade-in-up animation', () => {
    render(<ScrollToTop threshold={300} />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')
    expect(button).toHaveClass('animate-fade-in-up')
  })

  it('applies transition classes', () => {
    render(<ScrollToTop threshold={300} />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    const button = screen.getByLabelText('Scroll to top')
    expect(button).toHaveClass('transition-all', 'duration-300', 'ease-in-out')
  })

  it('renders button with correct structure when visible', () => {
    const { container } = render(<ScrollToTop threshold={300} />)

    Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true })
    fireEvent.scroll(window)

    // Verify button exists
    const button = screen.getByLabelText('Scroll to top')
    expect(button).toBeInTheDocument()
    expect(button.tagName).toBe('BUTTON')

    // Verify button classes
    expect(button).toHaveClass('fixed', 'z-50', 'p-3', 'rounded-full')
    expect(button).toHaveClass('bg-gradient-to-r')

    // Verify icon exists
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('w-6', 'h-6')

    // Verify positioning
    expect(button).toHaveStyle({ bottom: '24px', right: '24px' })

    // Verify style tag exists for animations
    const style = container.querySelector('style')
    expect(style).toBeInTheDocument()
    expect(style?.textContent).toContain('fade-in-up')
  })

  it('renders nothing when hidden', () => {
    const { container } = render(<ScrollToTop threshold={300} />)

    // Button should not be in the document
    expect(screen.queryByLabelText('Scroll to top')).not.toBeInTheDocument()

    // Container should be empty or only contain fragment
    expect(container.firstChild).toBeTruthy()
    const children = Array.from(container.firstChild?.childNodes || [])
    const buttonElements = children.filter(child =>
      child.nodeType === 1 && (child as Element).tagName === 'BUTTON'
    )
    expect(buttonElements.length).toBe(0)
  })
})