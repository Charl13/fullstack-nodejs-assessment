const { test, expect } = require('@playwright/test');

test('filters the cocktail list by search term', async ({ page }) => {
  await page.goto('/');

  const cocktailItems = page.locator('li:has(p)');

  await expect(cocktailItems).toHaveCount(15);

  await page.getByLabel('Search by description:').fill('mint');

  await expect(cocktailItems).not.toHaveCount(15);
  await expect(cocktailItems.first()).toBeVisible();
});
