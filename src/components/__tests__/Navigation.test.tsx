import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navigation from '../Navigation'

describe('Navigation', () => {
  it('renders navigation bar with logo', () => {
    const { container } = render(<Navigation />)

    // Verify nav element exists
    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass('fixed', 'top-0', 'w-full', 'z-50')

    // Verify logo/brand link exists (the link has no accessible name due to Typewriter component)
    const brandLink = container.querySelector('a[href="/"]')
    expect(brandLink).toBeInTheDocument()
    expect(brandLink).toHaveClass('text-xl', 'font-bold')
  })

  it('renders all navigation links on desktop', () => {
    const { container } = render(<Navigation />)

    // Get desktop navigation links (they're in the hidden md:flex container)
    const desktopNav = container.querySelector('.hidden.md\\:flex')
    expect(desktopNav).toBeInTheDocument()

    const desktopLinks = desktopNav?.querySelectorAll('a')
    expect(desktopLinks?.length).toBe(3)

    // Verify each link exists with correct href
    const aboutLink = Array.from(desktopLinks || []).find(link =>
      link.getAttribute('href') === '/about' && link.textContent === 'About'
    )
    const projectsLink = Array.from(desktopLinks || []).find(link =>
      link.getAttribute('href') === '/projects' && link.textContent === 'Projects'
    )
    const postsLink = Array.from(desktopLinks || []).find(link =>
      link.getAttribute('href') === '/posts' && link.textContent === 'Posts'
    )

    expect(aboutLink).toBeInTheDocument()
    expect(projectsLink).toBeInTheDocument()
    expect(postsLink).toBeInTheDocument()
  })

  it('renders mobile menu button', () => {
    render(<Navigation />)

    const menuButton = screen.getByRole('button', { name: /toggle mobile menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', async () => {
    render(<Navigation />)

    const menuButton = screen.getByRole('button', { name: /toggle mobile menu/i })

    // Initially closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    // Open menu
    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    // Wait for animation to complete (300ms as per the component)
    await waitFor(() => {
      // After clicking again, wait for the state to update
      fireEvent.click(menuButton)
    }, { timeout: 500 })

    // The menu is animating closed, but aria-expanded updates immediately
    // We need to wait for the animation timer
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    }, { timeout: 500 })
  })
})