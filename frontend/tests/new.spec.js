const { test, expect } = require('@playwright/test');

test('navigates to the new cocktail page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'New Cocktail' }).click();

  await expect(page.getByLabel('Name')).toBeVisible();
  await expect(page.getByLabel('Price')).toBeVisible();
  await expect(page.getByLabel('Description')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
});
