// PRIVATE facilitator reference. Copy this file to participant/tests/equipment-identity.spec.ts.
import { expect, test } from '@playwright/test';
import { equipmentJourneys } from './fixtures/equipment-journeys';

// Some items (the comal) are recommended by more than one technique, so scope each link to its technique.
const techniqueByCuisine: Record<string, string> = {
  '/cuisines/mexican': 'Handmade corn tortillas',
  '/cuisines/japanese': 'Seasoned sushi rice'
};

for (const journey of equipmentJourneys) {
  test(`${journey.scenario}: equipment destination preserves product identity`, async ({ page }) => {
    await page.goto(journey.cuisinePath);
    const technique = page.getByRole('region', { name: techniqueByCuisine[journey.cuisinePath] });
    const link = technique.getByRole('link', { name: `${journey.linkName} →`, exact: true });
    await expect(link).toHaveAttribute('href', `/shop/${journey.expectedProductId}`);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`/shop/${journey.expectedProductId}$`));
    // Exact text, not a substring match: "Tortilla Press Liners" contains "Tortilla Press".
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(journey.expectedProductName);
  });
}

test('a shortened legacy link still lands on a product', async ({ page }) => {
  await page.goto('/shop/rice');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Compact Rice Cooker');
});
