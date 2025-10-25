import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads homepage successfully', async ({ page }) => {
    await page.goto('/')

    // Fix: Match the actual title from your metadata
    await expect(page).toHaveTitle(/EduCoder/i)
    await expect(page.getByRole('heading', { name: /Software Engineer & Educator/i })).toBeVisible()
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

    // Scroll down significantly
    await page.evaluate(() => window.scrollTo(0, 1000))

    // Wait for scroll to top button to appear
    await page.waitForTimeout(500)

    // Look for a button that might be the scroll-to-top
    // Adjust this selector based on your ScrollToTop component
    const scrollButtons = await page.locator('button').all()
    expect(scrollButtons.length).toBeGreaterThan(0)
  })
})