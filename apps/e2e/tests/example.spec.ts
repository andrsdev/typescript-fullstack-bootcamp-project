import { test, expect } from '@playwright/test';


test.describe('search page', () => {
  test('basic test', async ({ page }) => {
    await page.goto('http://localhost:4173');
    await expect(page.getByText('Collections')).toBeVisible();
    await expect(page.getByText('Genres')).toBeVisible();
    
    //navigating
    await page.getByRole('button', { name: 'View more' }).nth(1).click();
    expect(page.url()).toBe('http://localhost:4173/product/2');

    await expect(page.getByText('Add To Cart')).toBeVisible();

  })


})