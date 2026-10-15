// PRIVATE facilitator reference. Copy this file to participant/tests/return-navigation.spec.ts.
import { expect, test } from '@playwright/test';

test('back from a shared item returns to the technique it was opened from', async ({ page }) => {
  await page.goto('/cuisines/mexican');
  await page.getByRole('region', { name: 'Charred salsa roja' }).getByRole('link', { name: 'Shop cast-iron comal →', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cast-Iron Comal');
  await page.getByRole('link', { name: '← Back to Charred salsa roja' }).click();
  await expect(page).toHaveURL(/\/cuisines\/mexican#salsa-roja$/);
  await expect(page.getByRole('heading', { name: 'Charred salsa roja' })).toBeInViewport();
});

test('back from a video lesson returns to its technique', async ({ page }) => {
  await page.goto('/cuisines/japanese');
  await page.getByRole('region', { name: 'Seasoned sushi rice' }).getByRole('link', { name: 'View video preview' }).click();
  await page.getByRole('link', { name: '← Back to Seasoned sushi rice' }).click();
  await expect(page).toHaveURL(/\/cuisines\/japanese#sushi-rice$/);
});

test('a directly opened product page offers an honest way home', async ({ page }) => {
  await page.goto('/shop/cast-iron-comal');
  await expect(page.getByRole('link', { name: /Browse techniques/ })).toHaveCount(0);
  await page.getByRole('link', { name: '← Explore cuisines' }).first().click();
  await expect(page.getByRole('heading', { name: 'Start with a cuisine' })).toBeVisible();
});
