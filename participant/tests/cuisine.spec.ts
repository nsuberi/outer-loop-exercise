import { expect, test } from '@playwright/test';

test('home page helps a visitor explore cuisines and techniques', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Learn the techniques behind the food.' })).toBeVisible();
  await page.getByRole('link', { name: /Explore Mexican cooking/ }).click();
  await expect(page.getByRole('heading', { name: 'Mexican cooking' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Handmade corn tortillas' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Charred salsa roja' })).toBeVisible();
});
