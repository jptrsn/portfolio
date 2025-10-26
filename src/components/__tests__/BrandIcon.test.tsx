import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BrandIcon } from '../BrandIcon'

describe('BrandIcon', () => {
  it('renders github icon', () => {
    const { container } = render(<BrandIcon name="github" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(container.querySelector('path')).toBeInTheDocument()
  })

  it('renders linkedin icon', () => {
    const { container } = render(<BrandIcon name="linkedin" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders mail icon', () => {
    const { container } = render(<BrandIcon name="mail" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders mastodon icon', () => {
    const { container } = render(<BrandIcon name="mastodon" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders discourse icon', () => {
    const { container } = render(<BrandIcon name="discourse" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('applies default className', () => {
    const { container } = render(<BrandIcon name="github" />)
    const div = container.querySelector('div')
    expect(div).toHaveClass('w-6', 'h-6')
  })

  it('applies custom className', () => {
    const { container } = render(<BrandIcon name="github" className="w-8 h-8" />)
    const div = container.querySelector('div')
    expect(div).toHaveClass('w-8', 'h-8')
  })

  it('matches snapshot for each icon type', () => {
    const icons: Array<'github' | 'linkedin' | 'mail' | 'mastodon' | 'discourse'> = [
      'github', 'linkedin', 'mail', 'mastodon', 'discourse'
    ]

    icons.forEach(iconName => {
      const { container } = render(<BrandIcon name={iconName} />)
      expect(container).toMatchSnapshot(`BrandIcon-${iconName}`)
    })
  })
})