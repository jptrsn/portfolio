import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads homepage successfully', async ({ page }) => {
    await page.goto('/')

    // Fix: Match the actual title from your metadata
    await expect(page).toHaveTitle(/EduCoder/i)
    // The h1 is a typewriter animation (~3.3s to type out); allow extra
    // time when the machine is loaded with parallel browser workers.
    await expect(page.getByRole('heading', { name: /Software Engineer & Educator/i })).toBeVisible({ timeout: 15000 })
  })

  test('has working navigation links', async ({ page }) => {
    await page.goto('/')

    // Click skills link - don't wait for URL change since it's just a hash
    await page.click('a[href="#skills"]')

    // Wait for the skills section to be visible instead
    await expect(page.getByText(/Experience & Skills/i)).toBeVisible({ timeout: 5000 })

    // Verify we scrolled to the section
    const skillsSection = page.locator('#skills')
    await expect(skillsSection).toBeInViewport()
  })

  test('displays contact information', async ({ page }) => {
    await page.goto('/')

    // Scroll to connect section
    await page.locator('#connect').scrollIntoViewIfNeeded()
    await expect(page.getByText(/Let's Build Something Amazing Together/i)).toBeVisible()
  })

  test('skills section filters work', async ({ page }) => {
    await page.goto('/#skills')

    // Wait for skills to load
    await page.waitForSelector('button:has-text("All")')

    // Click on Language category (capital L to match your UI)
    await page.click('button:has-text("Language")')

    // Wait a moment for filtering
    await page.waitForTimeout(300)

    // Verify an active element exists
    await expect(page.locator('.border-primary-500')).toBeVisible()
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

    // Button should not be visible initially
    const scrollButton = page.getByRole('button', { name: 'Scroll to top' })
    await expect(scrollButton).not.toBeVisible()

    // Scroll down past the threshold in steps. A single scrollTo can fire
    // its scroll event before React hydration attaches the listener, so
    // keep scrolling until an event lands after hydration.
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => window.scrollBy(0, 100))
      await page.waitForTimeout(150)
    }

    // Button should appear
    await expect(scrollButton).toBeVisible({ timeout: 5000 })

    // Test that it actually scrolls to top
    await scrollButton.click()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(100)
  })
})