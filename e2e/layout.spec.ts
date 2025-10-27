import { test, expect } from '@playwright/test'

test.describe('Root Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct page title from metadata', async ({ page }) => {
    await expect(page).toHaveTitle('Educoder Dot Dev')
  })

  test('has correct meta description', async ({ page }) => {
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toBe(
      'Professional portfolio and blog, showcasing a combination of technical achievement and varied interests, with a passion for Education Technology.'
    )
  })

  test('has favicon set correctly', async ({ page }) => {
    const favicon = page.locator('link[rel="icon"]')
    const href = await favicon.getAttribute('href')
    expect(href).toContain('avatar_me.png')
  })

  test('html has correct lang attribute', async ({ page }) => {
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'en')
  })

  test('html has smooth scroll behavior', async ({ page }) => {
    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-scroll-behavior', 'smooth')
  })

  test('body has antialiased class', async ({ page }) => {
    const body = page.locator('body')
    const className = await body.getAttribute('class')
    expect(className).toContain('antialiased')
  })

  test('fonts are loaded correctly', async ({ page }) => {
    const body = page.locator('body')
    const className = await body.getAttribute('class')

    // Check that font variable classes are present
    expect(className).toMatch(/--font-geist/)
  })

  test('layout persists across page navigation', async ({ page }) => {
    // Check initial page
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    // Navigate to another page (if it exists)
    const experienceLink = page.getByRole('link', { name: /experience/i }).first()
    if (await experienceLink.isVisible().catch(() => false)) {
      await experienceLink.click()

      // Layout should still be present
      await expect(page.locator('html')).toHaveAttribute('lang', 'en')
      await expect(page.locator('body')).toHaveClass(/antialiased/)
    }
  })

  test('layout is accessible', async ({ page }) => {
    // Check for basic accessibility
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang')

    // Ensure body can receive focus for keyboard navigation
    const body = page.locator('body')
    await expect(body).toBeVisible()
  })
})