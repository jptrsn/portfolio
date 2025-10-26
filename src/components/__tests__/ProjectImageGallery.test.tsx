import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import ProjectImageGallery from '../ProjectImageGallery'
import { Project } from '@/types/types'

describe('ProjectImageGallery', () => {
  const mockProject: Project = {
    id: '1',
    slug: 'test-project',
    title: 'Test Project',
    shortDescription: 'Short desc',
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
      duration: '2 months'
    },
    tags: [],
    technologies: [],
    images: [
      { url: '/hero.jpg', alt: 'Hero image', isHero: true, caption: 'Hero caption' },
      { url: '/image1.jpg', alt: 'Image 1', isHero: false, caption: 'Caption 1' },
      { url: '/image2.jpg', alt: 'Image 2', isHero: false }
    ],
    links: [],
  }

  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = 'unset'
  })

  afterEach(() => {
    // Cleanup
    document.body.style.overflow = 'unset'
  })

  it('returns null when no images', () => {
    const noImagesProject = { ...mockProject, images: [] }
    const { container } = render(<ProjectImageGallery project={noImagesProject} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders hero image', () => {
    render(<ProjectImageGallery project={mockProject} />)
    const heroImage = screen.getByAltText('Hero image')
    expect(heroImage).toBeInTheDocument()
  })

  it('renders hero caption when available', () => {
    render(<ProjectImageGallery project={mockProject} />)
    expect(screen.getByText('Hero caption')).toBeInTheDocument()
  })

  it('renders additional gallery images', () => {
    render(<ProjectImageGallery project={mockProject} />)
    expect(screen.getByAltText('Image 1')).toBeInTheDocument()
    expect(screen.getByAltText('Image 2')).toBeInTheDocument()
  })

  it('renders image captions when available', () => {
    render(<ProjectImageGallery project={mockProject} />)
    expect(screen.getByText('Caption 1')).toBeInTheDocument()
  })

  it('opens lightbox when hero image is clicked', () => {
    render(<ProjectImageGallery project={mockProject} />)
    const heroContainer = screen.getByAltText('Hero image').closest('.cursor-pointer')
    fireEvent.click(heroContainer!)

    expect(screen.getByLabelText('Close lightbox')).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('opens lightbox when gallery image is clicked', () => {
    render(<ProjectImageGallery project={mockProject} />)
    const galleryImage = screen.getByAltText('Image 1').closest('.cursor-pointer')
    fireEvent.click(galleryImage!)

    expect(screen.getByLabelText('Close lightbox')).toBeInTheDocument()
  })

  it('closes lightbox when close button is clicked', async () => {
    render(<ProjectImageGallery project={mockProject} />)
    const heroContainer = screen.getByAltText('Hero image').closest('.cursor-pointer')
    fireEvent.click(heroContainer!)

    const closeButton = screen.getByLabelText('Close lightbox')
    fireEvent.click(closeButton)

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('unset')
    })
  })

  it('closes lightbox when backdrop is clicked', async () => {
    render(<ProjectImageGallery project={mockProject} />)
    const heroContainer = screen.getByAltText('Hero image').closest('.cursor-pointer')
    fireEvent.click(heroContainer!)

    const lightbox = screen.getByLabelText('Close lightbox').closest('.fixed')
    fireEvent.click(lightbox!)

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('unset')
    })
  })

  it('navigates to next image in lightbox', () => {
    render(<ProjectImageGallery project={mockProject} />)
    const heroContainer = screen.getByAltText('Hero image').closest('.cursor-pointer')
    fireEvent.click(heroContainer!)

    const nextButton = screen.getByLabelText('Next image')
    fireEvent.click(nextButton)

    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('navigates to previous image in lightbox', () => {
    render(<ProjectImageGallery project={mockProject} />)
    const galleryImage = screen.getByAltText('Image 1').closest('.cursor-pointer')
    fireEvent.click(galleryImage!)

    const prevButton = screen.getByLabelText('Previous image')
    fireEvent.click(prevButton)

    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('wraps to first image when next is clicked on last image', () => {
    render(<ProjectImageGallery project={mockProject} />)
    const lastImage = screen.getByAltText('Image 2').closest('.cursor-pointer')
    fireEvent.click(lastImage!)

    expect(screen.getByText('3 / 3')).toBeInTheDocument()

    const nextButton = screen.getByLabelText('Next image')
    fireEvent.click(nextButton)

    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('wraps to last image when previous is clicked on first image', () => {
    render(<ProjectImageGallery project={mockProject} />)
    const heroContainer = screen.getByAltText('Hero image').closest('.cursor-pointer')
    fireEvent.click(heroContainer!)

    const prevButton = screen.getByLabelText('Previous image')
    fireEvent.click(prevButton)

    expect(screen.getByText('3 / 3')).toBeInTheDocument()
  })

  it('closes lightbox on Escape key', async () => {
    render(<ProjectImageGallery project={mockProject} />)
    const heroContainer = screen.getByAltText('Hero image').closest('.cursor-pointer')
    fireEvent.click(heroContainer!)

    fireEvent.keyDown(document, { key: 'Escape' })

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('unset')
    })
  })

  it('navigates with arrow keys in lightbox', () => {
    render(<ProjectImageGallery project={mockProject} />)
    const heroContainer = screen.getByAltText('Hero image').closest('.cursor-pointer')
    fireEvent.click(heroContainer!)

    expect(screen.getByText('1 / 3')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'ArrowRight' })
    expect(screen.getByText('2 / 3')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'ArrowLeft' })
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('displays image counter in lightbox', () => {
    render(<ProjectImageGallery project={mockProject} />)
    const heroContainer = screen.getByAltText('Hero image').closest('.cursor-pointer')
    fireEvent.click(heroContainer!)

    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('displays caption in lightbox', () => {
    render(<ProjectImageGallery project={mockProject} />)
    const heroContainer = screen.getByAltText('Hero image').closest('.cursor-pointer')
    fireEvent.click(heroContainer!)

    expect(screen.getAllByText('Hero caption').length).toBeGreaterThan(0)
  })

  it('handles touch swipe left', () => {
    render(<ProjectImageGallery project={mockProject} />)
    const heroContainer = screen.getByAltText('Hero image').closest('.cursor-pointer')
    fireEvent.click(heroContainer!)

    const imageContainer = screen.getAllByAltText('Hero image')[1].closest('.relative')

    fireEvent.touchStart(imageContainer!, { targetTouches: [{ clientX: 200 }] })
    fireEvent.touchMove(imageContainer!, { targetTouches: [{ clientX: 100 }] })
    fireEvent.touchEnd(imageContainer!)

    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('handles touch swipe right', () => {
    render(<ProjectImageGallery project={mockProject} />)
    const galleryImage = screen.getByAltText('Image 1').closest('.cursor-pointer')
    fireEvent.click(galleryImage!)

    const imageContainer = screen.getAllByAltText('Image 1')[1].closest('.relative')

    fireEvent.touchStart(imageContainer!, { targetTouches: [{ clientX: 100 }] })
    fireEvent.touchMove(imageContainer!, { targetTouches: [{ clientX: 200 }] })
    fireEvent.touchEnd(imageContainer!)

    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('does not navigate on short swipes', () => {
    render(<ProjectImageGallery project={mockProject} />)
    const heroContainer = screen.getByAltText('Hero image').closest('.cursor-pointer')
    fireEvent.click(heroContainer!)

    const imageContainer = screen.getAllByAltText('Hero image')[1].closest('.relative')

    fireEvent.touchStart(imageContainer!, { targetTouches: [{ clientX: 100 }] })
    fireEvent.touchMove(imageContainer!, { targetTouches: [{ clientX: 90 }] })
    fireEvent.touchEnd(imageContainer!)

    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('stops event propagation on navigation buttons', () => {
    render(<ProjectImageGallery project={mockProject} />)
    const heroContainer = screen.getByAltText('Hero image').closest('.cursor-pointer')
    fireEvent.click(heroContainer!)

    const nextButton = screen.getByLabelText('Next image')
    const clickEvent = new MouseEvent('click', { bubbles: true })
    const stopPropagationSpy = vi.spyOn(clickEvent, 'stopPropagation')

    nextButton.dispatchEvent(clickEvent)
    expect(stopPropagationSpy).toHaveBeenCalled()
  })

  it('applies hover effects to images', () => {
    const { container } = render(<ProjectImageGallery project={mockProject} />)
    const heroContainer = container.querySelector('.cursor-pointer')
    expect(heroContainer).toHaveClass('group')
  })

  it('cleans up body overflow on unmount', () => {
    const { unmount } = render(<ProjectImageGallery project={mockProject} />)
    const heroContainer = screen.getByAltText('Hero image').closest('.cursor-pointer')
    fireEvent.click(heroContainer!)

    expect(document.body.style.overflow).toBe('hidden')

    unmount()
    expect(document.body.style.overflow).toBe('unset')
  })
})