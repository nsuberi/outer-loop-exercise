import type { Cuisine, Product, Video } from '../types';

// Local-only demo records: no real Amazon products, checkout, or video hosting.
export const cuisines: Cuisine[] = [
  {
    id: 'mexican', name: 'Mexican', emoji: '🌽', tagline: 'From masa to memorable meals',
    intro: 'Practice the foundations behind warm tortillas and vibrant salsas.',
    color: '#F3B263',
    techniques: [
      {
        id: 'handmade-tortillas', name: 'Handmade corn tortillas',
        summary: 'Press fresh masa evenly, then cook it on a hot surface.',
        minutes: 25, level: 'Beginner',
        steps: ['Hydrate masa harina until soft but not sticky.', 'Press a golf-ball-sized portion evenly.', 'Cook on a heated comal, flipping once or twice.'],
        equipment: [
          { productId: 'tortilla-press', reason: 'Press masa into evenly thin discs.' },
          { productId: 'tortilla-press-liners', reason: 'Keep masa from sticking to the press plates.' },
          { productId: 'cast-iron-comal', reason: 'Cook tortillas over stable, direct heat.' }
        ], videoId: 'press-tortillas'
      },
      {
        id: 'salsa-roja', name: 'Charred salsa roja',
        summary: 'Char tomatoes and chiles for depth before blending.',
        minutes: 20, level: 'Beginner',
        steps: ['Dry-roast tomatoes and chiles until blistered.', 'Blend with onion, garlic, and salt.', 'Adjust acidity and heat to taste.'],
        equipment: [{ productId: 'cast-iron-comal', reason: 'Blister vegetables over direct heat.' }, { productId: 'mortar-pestle', reason: 'Crush ingredients to control texture.' }],
        videoId: 'salsa-char'
      }
    ]
  },
  {
    id: 'japanese', name: 'Japanese', emoji: '🍚', tagline: 'Precision in everyday preparation',
    intro: 'Build a foundation in rice texture and quick, delicate broths.',
    color: '#C3D6CD',
    techniques: [
      {
        id: 'sushi-rice', name: 'Seasoned sushi rice',
        summary: 'Rinse, cook, season, and cool rice without crushing the grains.',
        minutes: 45, level: 'Intermediate',
        steps: ['Rinse rice until the water is nearly clear.', 'Cook and rest rice with measured water.', 'Fold in seasoned vinegar while cooling.'],
        equipment: [{ productId: 'rice-cooker', reason: 'Maintain repeatable water-to-rice cooking.' }, { productId: 'rice-paddle', reason: 'Fold seasoning without mashing grains.' }],
        videoId: 'rice-fold'
      },
      {
        id: 'miso-soup', name: 'Gentle miso soup',
        summary: 'Keep the broth below a boil after adding miso.',
        minutes: 15, level: 'Beginner',
        steps: ['Warm dashi gently.', 'Dissolve miso in a ladle of warm broth.', 'Return to the pot off the boil and add garnishes.'],
        equipment: [{ productId: 'saucepan', reason: 'Heat broth steadily without boiling.' }],
        videoId: 'miso-dissolve'
      }
    ]
  },
  {
    id: 'italian', name: 'Italian', emoji: '🍝', tagline: 'Simple ingredients, intentional technique',
    intro: 'Explore dough and sauce-making fundamentals you can repeat.',
    color: '#EFC7AD',
    techniques: [
      {
        id: 'fresh-pasta', name: 'Fresh egg pasta',
        summary: 'Knead dough, let it rest, and roll it into silky sheets.',
        minutes: 60, level: 'Intermediate',
        steps: ['Mix flour and eggs into a shaggy dough.', 'Knead until smooth and rest covered.', 'Roll through progressively thinner settings.'],
        equipment: [{ productId: 'pasta-roller', reason: 'Create thin, even sheets for noodles.' }],
        videoId: 'pasta-rolling'
      },
      {
        id: 'tomato-sauce', name: 'Weeknight tomato sauce',
        summary: 'Build gentle sweetness with low heat and a wide pan.',
        minutes: 30, level: 'Beginner',
        steps: ['Gently cook garlic in olive oil.', 'Add crushed tomatoes and simmer uncovered.', 'Finish with salt and torn basil.'],
        equipment: [{ productId: 'saute-pan', reason: 'Reduce sauce quickly in a wide surface area.' }],
        videoId: 'sauce-simmer'
      }
    ]
  }
];

export const products: Product[] = [
  // New accessory: featured first in the storefront.
  { id: 'tortilla-press-liners', name: 'Tortilla Press Liners', emoji: '🧻', price: '$7.50', description: 'Precut parchment rounds that keep masa from sticking to your press.', features: ['Pack of 100', 'Fits 6.5" and 8" presses', 'Compostable'] },
  { id: 'tortilla-press', name: 'Tortilla Press', emoji: '🫓', price: '$24.00', description: 'A sturdy press for thin, even corn tortillas.', features: ['Cast aluminum plates', 'Easy-grip handle', 'For everyday masa dough'] },
  { id: 'cast-iron-comal', name: 'Cast-Iron Comal', emoji: '🍳', price: '$32.00', description: 'A flat cooking surface for toasting tortillas and charring vegetables.', features: ['Pre-seasoned iron', 'Even heat retention', 'Stovetop friendly'] },
  { id: 'mortar-pestle', name: 'Mortar and Pestle', emoji: '🪨', price: '$28.00', description: 'A stone bowl and pestle for rustic salsas and spice blends.', features: ['Textured grinding surface', 'Compact footprint', 'Hand wash'] },
  { id: 'rice-cooker', name: 'Compact Rice Cooker', emoji: '🍚', price: '$69.00', description: 'A small rice cooker for consistent grain texture.', features: ['Measured inner pot', 'Keep warm setting', 'Countertop sized'] },
  { id: 'rice-paddle', name: 'Rice Paddle', emoji: '🥄', price: '$9.00', description: 'A wide paddle for gently folding cooked rice.', features: ['Nonstick texture', 'Comfortable handle', 'Lightweight'] },
  { id: 'saucepan', name: 'Stainless Saucepan', emoji: '🥘', price: '$39.00', description: 'A versatile saucepan for warming stocks and soups.', features: ['Heavy base', 'Stay-cool grip', 'Easy-pour edge'] },
  { id: 'pasta-roller', name: 'Hand-Crank Pasta Roller', emoji: '🍝', price: '$58.00', description: 'A roller to turn rested pasta dough into thin sheets.', features: ['Adjustable thickness', 'Table clamp', 'Manual crank'] },
  { id: 'saute-pan', name: 'Wide Sauté Pan', emoji: '🍅', price: '$44.00', description: 'A broad pan for sautéing aromatics and reducing sauces.', features: ['Wide cooking area', 'Lid included', 'Comfortable handle'] }
];

export const videos: Video[] = [
  { id: 'press-tortillas', title: 'Pressing tortillas evenly', duration: '03:42', teaser: 'See the ideal masa consistency and an even press.', keyFrames: ['Shape the masa', 'Line and press', 'Release gently'], gradient: 'linear-gradient(135deg,#bd7c3d,#e5c78a)' },
  { id: 'salsa-char', title: 'Charring vegetables for salsa', duration: '04:11', teaser: 'Learn what the blistered spots contribute to flavor.', keyFrames: ['Heat the pan', 'Turn tomatoes and chiles', 'Blend to texture'], gradient: 'linear-gradient(135deg,#8d3c2a,#e6a15a)' },
  { id: 'rice-fold', title: 'Folding seasoned sushi rice', duration: '05:08', teaser: 'A gentle fold that preserves distinct grains.', keyFrames: ['Prepare vinegar', 'Fold and fan', 'Check the sheen'], gradient: 'linear-gradient(135deg,#577c70,#b0c9bd)' },
  { id: 'miso-dissolve', title: 'Dissolving miso without boiling', duration: '02:58', teaser: 'Protect aroma with gentle heat.', keyFrames: ['Warm broth', 'Dissolve miso separately', 'Finish off heat'], gradient: 'linear-gradient(135deg,#616f5b,#b7bb83)' },
  { id: 'pasta-rolling', title: 'Rolling fresh pasta sheets', duration: '06:12', teaser: 'Progressively thin dough without tearing it.', keyFrames: ['Rest dough', 'Begin on wide setting', 'Roll thinner'], gradient: 'linear-gradient(135deg,#a55a45,#f2bf87)' },
  { id: 'sauce-simmer', title: 'Building tomato sauce', duration: '04:24', teaser: 'Balance aromatics, reduction, and seasoning.', keyFrames: ['Sweat garlic', 'Simmer gently', 'Finish with herbs'], gradient: 'linear-gradient(135deg,#aa493a,#ec9564)' }
];

export const getCuisine = (id?: string) => cuisines.find((item) => item.id === id);
export const getProduct = (id?: string) => products.find((item) => item.id === id);
export const getVideo = (id?: string) => videos.find((item) => item.id === id);
