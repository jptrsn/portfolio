import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('homepage has proper heading hierarchy', async ({ page }) => {
    await page.goto('/')

    const h1 = await page.locator('h1').count()
    expect(h1).toBe(1)

    // Should have h2s for sections
    const h2s = await page.locator('h2').count()
    expect(h2s).toBeGreaterThan(0)
  })

  test('all images have alt text', async ({ page }) => {
    await page.goto('/')

    const images = await page.locator('img').all()
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('links have accessible names', async ({ page }) => {
    await page.goto('/')

    const links = await page.locator('a').all()
    for (const link of links) {
      const text = await link.textContent()
      const ariaLabel = await link.getAttribute('aria-label')

      // Link should have either text content or aria-label
      expect(text || ariaLabel).toBeTruthy()
    }
  })

  test('buttons have accessible labels', async ({ page }) => {
    await page.goto('/')

    const buttons = await page.locator('button').all()
    for (const button of buttons) {
      const text = await button.textContent()
      const ariaLabel = await button.getAttribute('aria-label')

      expect(text || ariaLabel).toBeTruthy()
    }
  })

  test('page is keyboard navigable', async ({ page }) => {
    await page.goto('/')

    // Tab through interactive elements
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Check that focus is visible
    const focused = await page.evaluate(() => document.activeElement?.tagName)
    expect(focused).toBeTruthy()
  })
})