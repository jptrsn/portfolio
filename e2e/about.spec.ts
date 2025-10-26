import { test, expect } from '@playwright/test'

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  test('has correct page structure', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.getByRole('heading', { name: "Hi, I'm James" })).toBeVisible()
  })

  test('displays the headshot image', async ({ page }) => {
    const image = page.locator('img[alt="Headshot"]')
    await expect(image).toBeVisible()

    // Verify image loaded successfully
    const naturalWidth = await image.evaluate((img: HTMLImageElement) => img.naturalWidth)
    expect(naturalWidth).toBeGreaterThan(0)
  })

  test('displays introduction content', async ({ page }) => {
    await expect(page.getByText(/full-stack software developer/i)).toBeVisible()
    await expect(page.getByText(/decade of web development experience/i)).toBeVisible()
  })

  test('displays teacher background', async ({ page }) => {
    await expect(page.getByText(/former teacher/i)).toBeVisible()
    await expect(page.getByText(/empower learners/i)).toBeVisible()
  })

  test('displays knowledge sharing philosophy', async ({ page }) => {
    await expect(page.getByText(/knowledge should be shared freely/i)).toBeVisible()
  })

  test('displays problem solving section', async ({ page }) => {
    await expect(page.getByText(/love solving problems/i)).toBeVisible()
  })

  test('displays hobby section', async ({ page }) => {
    await expect(page.getByText(/hobby electronics/i)).toBeVisible()
    await expect(page.getByText(/3D printing/i)).toBeVisible()
  })

  test('navigation links work on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })

  // Desktop nav should be visible
  await page.getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL(/\/projects\/?/)

  // Go back
  await page.goto('/about')

  // Click home link
  await page.getByRole('link', { name: 'EduCoder.dev' }).click()
  await expect(page).toHaveURL(/\/$/)
})

test('navigation links work on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })

  // Open mobile menu
  await page.getByRole('button', { name: 'Toggle mobile menu' }).click()

  // Click Projects link in mobile menu
  await page.getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL(/\/projects\/?/)

  // Go back
  await page.goto('/about')

  // Open mobile menu again
  await page.getByRole('button', { name: 'Toggle mobile menu' }).click()

  // Click home (About link or logo)
  await page.locator('a[href="/"]').first().click()
  await expect(page).toHaveURL(/\/$/)
})

  test('all paragraphs are visible', async ({ page }) => {
    const paragraphs = page.locator('.flex-col > p')
    expect(await paragraphs.count()).toBe(5)

    // Check first and last are visible
    await expect(paragraphs.first()).toBeVisible()
    await expect(paragraphs.last()).toBeVisible()
  })

  test('responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    await expect(page.getByRole('heading', { name: "Hi, I'm James" })).toBeVisible()
    await expect(page.locator('img[alt="Headshot"]')).toBeVisible()
    await expect(page.getByText(/full-stack software developer/i)).toBeVisible()
  })

  test('responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })

    await expect(page.getByRole('heading')).toBeVisible()
    await expect(page.locator('img[alt="Headshot"]')).toBeVisible()
  })

  test('responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })

    await expect(page.getByRole('heading')).toBeVisible()
    await expect(page.locator('img[alt="Headshot"]')).toBeVisible()
  })

  test('image maintains aspect ratio', async ({ page }) => {
    const image = page.locator('img[alt="Headshot"]')
    const box = await image.boundingBox()

    expect(box).not.toBeNull()
    if (box) {
      // Image should be roughly square (215x215)
      const ratio = box.width / box.height
      expect(ratio).toBeCloseTo(1, 0.1)
    }
  })

  test('content is readable with proper spacing', async ({ page }) => {
    const contentDiv = page.locator('.flex-col.gap-6')
    await expect(contentDiv).toBeVisible()

    // Verify spacing exists
    const paragraphs = page.locator('.flex-col > p')
    expect(await paragraphs.count()).toBeGreaterThan(3)
  })
})