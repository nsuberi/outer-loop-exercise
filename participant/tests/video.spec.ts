import { expect, test } from '@playwright/test';

test('a technique opens its local simulated video lesson', async ({ page }) => {
  await page.goto('/cuisines/mexican');
  await page.getByRole('link', { name: 'View video preview' }).first().click();
  await expect(page.getByRole('heading', { name: 'Pressing tortillas evenly' })).toBeVisible();
  await page.getByRole('button', { name: 'Play video preview' }).click();
  await expect(page.getByText('Preview only — video playback is simulated')).toBeVisible();
});
