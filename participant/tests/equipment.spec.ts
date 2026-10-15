import { expect, test } from '@playwright/test';

test('the tortilla press recommendation opens its in-app shopping page', async ({ page }) => {
  await page.goto('/cuisines/mexican');
  const equipmentLink = page.getByRole('link', { name: 'Shop tortilla press →', exact: true });
  await expect(equipmentLink).toHaveAttribute('href', '/shop/tortilla-press');
  await equipmentLink.click();
  await expect(page).toHaveURL(/\/shop\/tortilla-press$/);
  await expect(page.getByText('Simulated storefront')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Tortilla Press');
});
