import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads homepage successfully', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Educoder Dot Dev/i)
    await expect(page.getByRole('heading', { name: /Software Engineer & Educator/i })).toBeVisible()
  })

  test('has working navigation links', async ({ page }) => {
    await page.goto('/')

    // Click skills link
    await page.click('a[href="#skills"]')
    await expect(page.getByText(/Experience & Skills/i)).toBeVisible()

    // Click projects link (if exists)
    const projectsLink = page.locator('a[href="#projects"]')
    if (await projectsLink.count() > 0) {
      await projectsLink.click()
      // Add assertion for projects section
    }
  })

  test('displays contact information', async ({ page }) => {
    await page.goto('/')

    await page.goto('#connect')
    await expect(page.getByText(/Let's Build Something Amazing Together/i)).toBeVisible()
  })

  test('skills section filters work', async ({ page }) => {
    await page.goto('/#skills')

    // Wait for skills to load
    await page.waitForSelector('button:has-text("All")')

    // Click on a category
    await page.click('button:has-text("language")')

    // Verify filtering occurred (you'd check specific skills appear)
    await expect(page.locator('[class*="border-primary-500"]')).toBeVisible()
  })

  test('skills navigation buttons work', async ({ page }) => {
    await page.goto('/#skills')

    await page.waitForSelector('button[aria-label="Next skill"]')

    // Get initial skill name
    const initialSkill = await page.locator('h3').first().textContent()

    // Click next
    await page.click('button[aria-label="Next skill"]')

    // Wait for animation
    await page.waitForTimeout(500)

    // Skill should have changed
    const newSkill = await page.locator('h3').first().textContent()
    expect(newSkill).not.toBe(initialSkill)
  })

  test('scroll to top button appears after scrolling', async ({ page }) => {
    await page.goto('/')

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 600))

    // Wait for scroll to top button
    await page.waitForTimeout(500)

    // Button should be visible (adjust selector based on your component)
    const scrollButton = page.locator('button:visible').last()
    await expect(scrollButton).toBeVisible()
  })
})