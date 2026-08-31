const { test, expect } = require('@playwright/test');

test('filters the cocktail list by search term', async ({ page }) => {
  await page.goto('/');

  const cocktailRows = page.locator('tbody tr');

  await expect(cocktailRows.first()).toBeVisible();
  const initialCount = await cocktailRows.count();

  await page.getByPlaceholder("Type 'Nojito'...").fill('mint');

  await expect(cocktailRows).not.toHaveCount(initialCount);
  await expect(cocktailRows.first()).toBeVisible();
});
