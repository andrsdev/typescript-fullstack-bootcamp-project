import { test, expect } from '@playwright/test'

test('Search', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  // Expect to page has an input with the specified placeholder
  await expect(page.getByPlaceholder('Search...')).toBeVisible()

  // Filter collections
  await page.getByText('Dog Products').click()

  // Sort by price
  await page.getByText('Sort by price').click()

  // Enter text on the search input
  await page.fill('#input-search', 'Leash')

  // Submit the value
  await page.press('#input-search', 'Enter')

  // Check if the product was found
  await expect(page.getByText('Dog Leash')).toBeVisible()

  // Click on product card
  await page.getByRole('link').click()

  // Check if its on detail product page
  await expect(
    page.getByRole('heading', { name: 'Small Dog Leash' }),
  ).toBeVisible()
  await expect(page.getByAltText('Small Dog Leash')).toBeVisible()
})
