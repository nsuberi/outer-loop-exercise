/** Source: curated customer journeys from Product, Design, and Data. */
export const equipmentJourneys = [
  {
    scenario: 'First tortilla press shopper',
    cuisinePath: '/cuisines/mexican',
    linkName: 'Shop tortilla press',
    expectedProductId: 'tortilla-press',
    expectedProductName: 'Tortilla Press',
    lookalikeProductNames: ['Tortilla Press Liners']
  },
  {
    scenario: 'Tortilla maker restocking liners',
    cuisinePath: '/cuisines/mexican',
    linkName: 'Shop tortilla press liners',
    expectedProductId: 'tortilla-press-liners',
    expectedProductName: 'Tortilla Press Liners'
  },
  {
    scenario: 'Home cook looking for a comal',
    cuisinePath: '/cuisines/mexican',
    linkName: 'Shop cast-iron comal',
    expectedProductId: 'cast-iron-comal',
    expectedProductName: 'Cast-Iron Comal'
  },
  {
    scenario: 'Rice preparation student',
    cuisinePath: '/cuisines/japanese',
    linkName: 'Shop compact rice cooker',
    expectedProductId: 'rice-cooker',
    expectedProductName: 'Compact Rice Cooker'
  }
] as const;
