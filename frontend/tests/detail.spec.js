const { test, expect } = require('@playwright/test');

test('navigates to a cocktail detail page', async ({ page }) => {
  await page.goto('/');

  const firstLink = page.locator('li:has(p) a').first();
  const title = (await firstLink.textContent()).trim();
  await firstLink.click();

  await expect(page.getByRole('heading', { name: title })).toBeVisible();
});
