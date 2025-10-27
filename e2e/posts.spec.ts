import { test, expect } from '@playwright/test'

test.describe('Posts Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
  })

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/blog posts/i)
  })

  test('displays navigation', async ({ page }) => {
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })

  test('displays page header', async ({ page }) => {
    const header = page.getByText('Thoughts on web development and technology')
    await expect(header).toBeVisible()
  })

  test('displays posts or empty state', async ({ page }) => {
    // Check if posts exist or empty state is shown
    const hasArticles = await page.locator('article').count() > 0
    const hasEmptyState = await page.getByText('No posts yet').isVisible().catch(() => false)

    expect(hasArticles || hasEmptyState).toBeTruthy()
  })

  test('posts have required elements', async ({ page }) => {
    const articleCount = await page.locator('article').count()

    if (articleCount > 0) {
      const firstPost = page.locator('article').first()

      // Check for title
      await expect(firstPost.locator('h2')).toBeVisible()

      // Check for date
      await expect(firstPost.locator('time')).toBeVisible()

      // Check for read more link
      await expect(firstPost.getByText('Read more')).toBeVisible()
    }
  })

  test('post cards are clickable', async ({ page }) => {
    const articleCount = await page.locator('article').count()

    if (articleCount > 0) {
      const firstPostLink = page.locator('article a').first()
      await expect(firstPostLink).toBeVisible()

      const href = await firstPostLink.getAttribute('href')
      // Allow any valid slug characters including hyphens, underscores, and numbers
      expect(href).toMatch(/^\/posts\/.+$/)
    }
  })

  test('clicking a post navigates to post detail page', async ({ page }) => {
    const articleCount = await page.locator('article').count()

    if (articleCount > 0) {
      const firstPostLink = page.locator('article a').first()
      const href = await firstPostLink.getAttribute('href')

      await firstPostLink.click()
      await expect(page).toHaveURL(href!)
    }
  })

  test('dates are properly formatted', async ({ page }) => {
    const dates = page.locator('time')
    const dateCount = await dates.count()

    if (dateCount > 0) {
      const firstDate = dates.first()
      await expect(firstDate).toHaveAttribute('dateTime')

      const dateText = await firstDate.textContent()
      expect(dateText).toBeTruthy()
      expect(dateText!.length).toBeGreaterThan(0)
    }
  })

  test('page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // Check that content is still visible
    const mainContent = page.locator('.max-w-4xl')
    await expect(mainContent).toBeVisible()
  })

  test('empty state displays correctly when no posts', async ({ page }) => {
    const hasEmptyState = await page.getByText('No posts yet').isVisible().catch(() => false)

    if (hasEmptyState) {
      await expect(page.getByText('No posts yet')).toBeVisible()
      await expect(page.getByText('Create your first post in the src/content/posts directory')).toBeVisible()

      // Check for icon
      const icon = page.locator('svg').first()
      await expect(icon).toBeVisible()
    }
  })
})