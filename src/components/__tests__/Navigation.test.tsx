import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Navigation from '../Navigation'

describe('Navigation', () => {
  it('matches snapshot', () => {
    const { container } = render(<Navigation />)
    expect(container).toMatchSnapshot()
  })
})