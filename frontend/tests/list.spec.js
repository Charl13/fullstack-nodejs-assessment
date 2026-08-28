const { test, expect } = require('@playwright/test');

test('shows the cocktail list', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Cocktails List' }),
  ).toBeVisible();
});
