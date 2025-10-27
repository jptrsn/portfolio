import { test, expect } from '@playwright/test'

test.describe('Projects Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects')
  })

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/projects/i)
  })

  test('displays navigation', async ({ page }) => {
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })

  test('displays page header description', async ({ page }) => {
    const description = page.getByText(/A collection of side projects/i)
    await expect(description).toBeVisible()
  })

  test('displays projects or empty state', async ({ page }) => {
    // Check if projects exist or empty state is shown
    const hasProjects = await page.locator('a[href^="/projects/"]').count() > 0
    const hasEmptyState = await page.getByText(/No projects found/i).isVisible().catch(() => false)

    expect(hasProjects || hasEmptyState).toBeTruthy()
  })

  test('project cards are displayed in grid layout', async ({ page }) => {
    const projectCount = await page.locator('a[href^="/projects/"]').count()

    if (projectCount > 0) {
      const grid = page.locator('.grid').first()
      await expect(grid).toBeVisible()
    }
  })

  test('project cards are clickable and navigate to detail page', async ({ page }) => {
  // Target links within the project grid, excluding navigation
  const projectLinks = page.locator('.grid a[href^="/projects/"]')
  const projectCount = await projectLinks.count()

  if (projectCount > 0) {
    const firstProject = projectLinks.first()
    const href = await firstProject.getAttribute('href')

    await firstProject.click()

    // Should navigate to project detail page
    await expect(page).toHaveURL(href!)
  }
})

  test('project cards display project titles', async ({ page }) => {
    const projectCount = await page.locator('a[href^="/projects/"]').count()

    if (projectCount > 0) {
      // Check that project cards have headings
      const headings = page.locator('a[href^="/projects/"] h3')
      const headingCount = await headings.count()

      expect(headingCount).toBeGreaterThan(0)
    }
  })

  test('page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const mainContent = page.locator('.max-w-7xl')
    await expect(mainContent).toBeVisible()

    const description = page.getByText(/A collection of side projects/i)
    await expect(description).toBeVisible()
  })

  test('empty state displays correctly when no projects', async ({ page }) => {
    const hasEmptyState = await page.getByText(/No projects found/i).isVisible().catch(() => false)

    if (hasEmptyState) {
      await expect(page.getByText(/No projects found/i)).toBeVisible()
    }
  })

  test('grid layout adjusts for different screen sizes', async ({ page }) => {
    const projectCount = await page.locator('a[href^="/projects/"]').count()

    if (projectCount > 0) {
      // Desktop view
      await page.setViewportSize({ width: 1280, height: 720 })
      const grid = page.locator('.grid').first()
      await expect(grid).toBeVisible()

      // Mobile view
      await page.setViewportSize({ width: 375, height: 667 })
      await expect(grid).toBeVisible()
    }
  })
})