const { test, expect } = require('@playwright/test');

test('shows the cocktail list', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('button', { name: 'Add cocktail' }),
  ).toBeVisible();
  await expect(page.locator('tbody tr').first()).toBeVisible();
});
