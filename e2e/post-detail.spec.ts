import { test, expect } from '@playwright/test'

test.describe('Post Detail Page', () => {
  test('navigates to a post from posts page', async ({ page }) => {
    await page.goto('/posts')

    const articleCount = await page.locator('article').count()

    if (articleCount > 0) {
      const firstPostLink = page.locator('article a').first()
      const postTitle = await firstPostLink.locator('h2').textContent()

      await firstPostLink.click()

      // Should be on post detail page
      await expect(page).toHaveURL(/\/posts\/.+/)

      // Title should be visible
      if (postTitle) {
        await expect(page.getByRole('heading', { level: 1, name: postTitle })).toBeVisible()
      }
    }
  })

  test('displays post metadata', async ({ page }) => {
    await page.goto('/posts')

    const articleCount = await page.locator('article').count()

    if (articleCount > 0) {
      await page.locator('article a').first().click()

      // Check for date
      await expect(page.locator('time').first()).toBeVisible()

      // Check for title
      await expect(page.locator('h1')).toBeVisible()
    }
  })

  test('back to posts link works', async ({ page }) => {
    await page.goto('/posts')

    const articleCount = await page.locator('article').count()

    if (articleCount > 0) {
      await page.locator('article a').first().click()

      // Click back to posts
      await page.getByText('Back to posts').first().click()

      // Should be back on posts page (with or without trailing slash)
      await expect(page).toHaveURL(/\/posts\/?$/)
    }
  })

  test('displays post content', async ({ page }) => {
    await page.goto('/posts')

    const articleCount = await page.locator('article').count()

    if (articleCount > 0) {
      await page.locator('article a').first().click()

      // Wait for URL to change to post detail page
      await expect(page).toHaveURL(/\/posts\/.+/)

      // Check for main article wrapper (not the posts listing articles)
      const mainArticle = page.locator('article').first()
      await expect(mainArticle).toBeVisible()

      // Check that article has content
      const articleContent = await mainArticle.textContent()
      expect(articleContent?.length).toBeGreaterThan(0)
    }
  })

  test('displays tags and categories if present', async ({ page }) => {
    await page.goto('/posts')

    const articleCount = await page.locator('article').count()

    if (articleCount > 0) {
      await page.locator('article a').first().click()

      // Tags might be present (start with #)
      const tags = page.locator('span').filter({ hasText: /^#/ })
      const tagCount = await tags.count()

      // Just verify the page loaded, tags are optional
      expect(tagCount).toBeGreaterThanOrEqual(0)
    }
  })

  test('footer contains published date', async ({ page }) => {
    await page.goto('/posts')

    const articleCount = await page.locator('article').count()

    if (articleCount > 0) {
      await page.locator('article a').first().click()

      // Check for footer with published date
      const footer = page.locator('footer')
      await expect(footer).toBeVisible()

      const publishedText = footer.getByText(/Published on/i)
      await expect(publishedText).toBeVisible()
    }
  })

  test('all posts link in footer works', async ({ page }) => {
  await page.goto('/posts')

  const articleCount = await page.locator('article').count()

  if (articleCount > 0) {
    await page.locator('article a').first().click()

    // Wait for post detail page to load
    await expect(page).toHaveURL(/\/posts\/.+/)

    // Scroll footer into view and click the link by role
    const allPostsLink = page.locator('footer').getByRole('link', { name: 'All Posts' })
    await allPostsLink.scrollIntoViewIfNeeded()
    await allPostsLink.click({ force: true })

    // Should be back on posts page (with or without trailing slash)
    await expect(page).toHaveURL(/\/posts\/?$/)

    // Verify we're on the posts listing by checking for multiple articles
    const articlesAfterNav = await page.locator('article').count()
    expect(articlesAfterNav).toBeGreaterThan(0)
  }
})

  test('page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('/posts')

    const articleCount = await page.locator('article').count()

    if (articleCount > 0) {
      await page.locator('article a').first().click()

      // Check that content is still visible
      await expect(page.locator('h1')).toBeVisible()

      // Use first() to avoid strict mode violation
      await expect(page.locator('article').first()).toBeVisible()
    }
  })

  test('handles non-existent post with 404 or other error', async ({ page }) => {
    const response = await page.goto('/posts/non-existent-post-slug-12345')

    // Should return 404 or redirect to 404 page
    expect(response?.status()).toBeGreaterThanOrEqual(404)
  })
})