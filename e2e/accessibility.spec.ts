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
      const ariaLabel = await img.getAttribute('aria-label')
      const ariaHidden = await img.getAttribute('aria-hidden')

      // Images should have alt text OR be decorative (aria-hidden)
      expect(alt !== null || ariaHidden === 'true').toBeTruthy()
    }
  })

  test('links have accessible names', async ({ page }) => {
  await page.goto('/')

  // Gather all link information at once before any potential navigation
  const linkData = await page.locator('a').evaluateAll((links) => {
    return links.map(link => ({
      text: link.textContent?.trim() || '',
      ariaLabel: link.getAttribute('aria-label'),
      ariaLabelledBy: link.getAttribute('aria-labelledby'),
      title: link.getAttribute('title'),
      href: link.getAttribute('href'),
      imgAlt: link.querySelector('img')?.getAttribute('alt') || null,
    }))
  })

  // Now validate the collected data
  for (const link of linkData) {
    const hasAccessibleName = (link.text && link.text.length > 0) ||
                              link.ariaLabel ||
                              link.ariaLabelledBy ||
                              link.title ||
                              link.imgAlt

    // If this fails, log the link for debugging
    if (!hasAccessibleName) {
      console.log(`Link without accessible name:`)
      console.log(`  href: ${link.href}`)
      console.log(`  text: ${link.text}`)
    }

    expect(hasAccessibleName).toBeTruthy()
  }
})

  test('buttons have accessible labels', async ({ page }) => {
    await page.goto('/')

    const buttons = await page.locator('button').all()
    for (const button of buttons) {
      const text = await button.textContent()
      const ariaLabel = await button.getAttribute('aria-label')
      const ariaLabelledBy = await button.getAttribute('aria-labelledby')
      const title = await button.getAttribute('title')

      // Buttons should have text, aria-label, aria-labelledby, or title
      const hasAccessibleLabel = (text && text.trim().length > 0) ||
                                  ariaLabel ||
                                  ariaLabelledBy ||
                                  title

      expect(hasAccessibleLabel).toBeTruthy()
    }
  })

  test('page is keyboard navigable', async ({ page }) => {
    await page.goto('/')

    // Tab through first few interactive elements
    await page.keyboard.press('Tab')

    // Check that something is focused
    const focused = await page.evaluate(() => {
      const el = document.activeElement
      return el ? el.tagName : null
    })

    expect(focused).toBeTruthy()
  })
})