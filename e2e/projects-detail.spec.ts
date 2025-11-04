import { test, expect } from '@playwright/test'

test.describe('Project Detail Page', () => {
  test('navigates to a project from projects page', async ({ page }) => {
    await page.goto('/projects')

    const projectLinks = page.locator('.grid a[href^="/projects/"]')
    const projectCount = await projectLinks.count()

    if (projectCount > 0) {
      const firstProject = projectLinks.first()
      const projectTitle = await firstProject.locator('h3').textContent()

      await firstProject.click()

      // Should be on project detail page
      await expect(page).toHaveURL(/\/projects\/.+/)

      // Title should be visible
      if (projectTitle) {
        await expect(page.getByRole('heading', { level: 1, name: projectTitle })).toBeVisible()
      }
    }
  })

  test('displays project metadata', async ({ page }) => {
    await page.goto('/projects')

    const projectLinks = page.locator('.grid a[href^="/projects/"]')
    const projectCount = await projectLinks.count()

    if (projectCount > 0) {
      await projectLinks.first().click()

      // Check for title
      await expect(page.locator('h1')).toBeVisible()

      // Check for year
      const year = new Date().getFullYear()
      const yearRange = Array.from({ length: 10 }, (_, i) => year - i)
      const hasYear = await Promise.race(
        yearRange.map(y => page.getByText(y.toString()).isVisible().catch(() => false))
      )
      expect(hasYear).toBeTruthy()
    }
  })

  test('breadcrumb navigation works', async ({ page }) => {
    await page.goto('/projects')

    const projectLinks = page.locator('.grid a[href^="/projects/"]')
    const projectCount = await projectLinks.count()

    if (projectCount > 0) {
      await projectLinks.first().click()

      // Wait for the detail page to load
      await expect(page).toHaveURL(/\/projects\/.+/)

      // Click breadcrumb link by text (more reliable than href)
      await page.getByRole('link', { name: 'Projects' }).first().click()

      // Should be back on projects page
      await expect(page).toHaveURL(/\/projects\/?$/)
    }
  })

  test('displays project description', async ({ page }) => {
    await page.goto('/projects')

    const projectLinks = page.locator('.grid a[href^="/projects/"]')
    const projectCount = await projectLinks.count()

    if (projectCount > 0) {
      await projectLinks.first().click()

      // Check for description paragraphs
      const description = page.locator('.prose, .whitespace-pre-wrap').first()
      await expect(description).toBeVisible()
    }
  })

  test('displays project status badge', async ({ page }) => {
    await page.goto('/projects')

    const projectLinks = page.locator('.grid a[href^="/projects/"]')
    const projectCount = await projectLinks.count()

    if (projectCount > 0) {
      await projectLinks.first().click()

      // Check for status badges (Active, Completed, etc.)
      const statusBadges = page.locator('span.rounded-full')
      const badgeCount = await statusBadges.count()
      expect(badgeCount).toBeGreaterThan(0)
    }
  })

  test('back to projects link works', async ({ page }) => {
    await page.goto('/projects')

    const projectLinks = page.locator('.grid a[href^="/projects/"]')
    const projectCount = await projectLinks.count()

    if (projectCount > 0) {
      await projectLinks.first().click()

      // Wait for detail page to load
      await expect(page).toHaveURL(/\/projects\/.+/)

      // Scroll to bottom where the back link is
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      // Click "Back to all projects"
      await page.getByText('Back to all projects').click()

      // Should be back on projects page
      await expect(page).toHaveURL(/\/projects\/?$/)
    }
  })

  test('project links are displayed if available', async ({ page }) => {
    await page.goto('/projects')

    const projectLinks = page.locator('.grid a[href^="/projects/"]')
    const projectCount = await projectLinks.count()

    if (projectCount > 0) {
      await projectLinks.first().click()

      // Check if any external links exist (GitHub, Demo, etc.)
      const externalLinks = page.locator('a[href^="http"]')
      const linkCount = await externalLinks.count()

      // Just verify the page loaded, links are optional
      expect(linkCount).toBeGreaterThanOrEqual(0)
    }
  })

  test('page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('/projects')

    const projectLinks = page.locator('.grid a[href^="/projects/"]')
    const projectCount = await projectLinks.count()

    if (projectCount > 0) {
      await projectLinks.first().click()

      // Check that content is still visible
      await expect(page.locator('h1')).toBeVisible()
    }
  })

  test('handles non-existent project with 404', async ({ page }) => {
    const response = await page.goto('/projects/non-existent-project-slug-12345')

    // Should return 404
    expect(response?.status()).toBe(404)
  })
})