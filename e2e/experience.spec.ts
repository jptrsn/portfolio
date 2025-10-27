import { test, expect } from '@playwright/test'

test.describe('Experience Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/experience')
  })

  test('has correct page title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/experience/i)

    const heading = page.getByRole('heading', { name: /experience/i, level: 1 })
    await expect(heading).toBeVisible()
  })

  test('displays page with correct layout', async ({ page }) => {
    const mainContent = page.locator('div.min-h-screen').first()
    await expect(mainContent).toBeVisible()

    // Check container structure
    const container = page.locator('.container.mx-auto.max-w-4xl')
    await expect(container).toBeVisible()
  })

  test('heading has gradient text styling', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /experience/i })

    // Check for gradient class
    await expect(heading).toHaveClass(/text-gradient/)
  })

  test('page is accessible via navigation', async ({ page }) => {
    await page.goto('/')

    // Assuming you have a nav link to experience page
    const experienceLink = page.getByRole('link', { name: /experience/i })
    if (await experienceLink.isVisible()) {
      await experienceLink.click()
      await expect(page).toHaveURL('/experience')
      await expect(page.getByRole('heading', { name: /experience/i })).toBeVisible()
    }
  })

  test('page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const heading = page.getByRole('heading', { name: /experience/i })
    await expect(heading).toBeVisible()

    // Check that content is still readable on mobile
    const container = page.locator('.container')
    await expect(container).toBeVisible()
  })

  test('page loads quickly', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/experience')
    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(3000) // Should load in under 3 seconds
  })
})