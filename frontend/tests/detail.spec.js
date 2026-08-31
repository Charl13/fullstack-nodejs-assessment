const { test, expect } = require('@playwright/test');

test('navigates to a cocktail detail page', async ({ page }) => {
  await page.goto('/');

  const firstRow = page.locator('tbody tr').first();
  const title = (await firstRow.locator('td').first().textContent()).trim();
  await firstRow.click();

  await expect(page.locator('.v-card-title')).toHaveText(title);
});
