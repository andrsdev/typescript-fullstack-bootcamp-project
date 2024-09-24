import { test, expect } from '@playwright/test';

test.describe('Search Products E2E', () => {
  test('should navigate, apply filters, select a product, and check details', async ({ page }) => {
    console.log('Navigating to search page...');
    await page.goto('/search', { timeout: 20000 }); // Aumenta el timeout a 20s para dar más tiempo a la carga
    await expect(page).toHaveURL('/search');
    console.log('Search page loaded successfully.');

    // Localiza el filtro
    const filterElement = page.locator('select#filter');
    await expect(filterElement).toBeVisible();
    console.log('Filter element is visible.');

    // Aplica el filtro
    await filterElement.selectOption('filterOption');
    console.log('Filter option selected.');

    // Espera a que aparezca el producto
    const productElement = page.locator('text="Product Name"');
    await productElement.waitFor({ timeout: 10000 }); // Aumenta el timeout para la aparición del producto
    await productElement.click();
    console.log('Product selected.');

    // Espera a que se cargue la página de detalles
    await page.waitForURL('/product-details', { timeout: 10000 });
    console.log('Navigated to product details page.');

    // Verifica que los detalles del producto estén presentes
    const productTitle = page.locator('h1');
    await expect(productTitle).toHaveText('Product Name');
    console.log('Product details verified.');
  });
});
