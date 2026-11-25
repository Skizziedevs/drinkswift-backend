const pool = require('../db');

const cocktails = [
  {
    id: 'bundle-pink-berry-chapman',
    name: 'The Pink Berry Chapman',
    category: 'Cocktail Packs',
    price: 36500,
    cost: 29300,
    servings: '20–25 Party Cups (5 Litres)',
    baseVolumeLiters: 5,
    servingsCount: 25,
    costPerServing: '₦1,460/cup',
    savingsHighlight: 'Save ₦2,000/cup vs Lagos Lounge Price',
    description: 'Modern ruby-pink berry twist on the classic Lagos party pitcher. Sparkling, crisp, and thirst-quenching with zero mixology stress.',
    recipe: '1. In a 5L drink dispenser or large punch bowl, pour 1 full bottle of Gordon\'s Pink Berry Gin (75cl).\n2. Add 150ml of Action Bitters and 250ml of Grenadine Syrup.\n3. Fill dispenser half-way with ice blocks.\n4. Gently pour in 3 bottles (1.5L) of Fanta Orange and 3 bottles (1.5L) of Sprite to preserve the fizz.\n5. Stir gently with a bar spoon. Garnish with sliced cucumber ribbons, orange wheels, and lemon slices.\n*Note: Keep remaining 9 bottles of Fanta and 9 bottles of Sprite chilled in the cooler for guests!*',
    image: '/bundles/pink_berry_chapman.jpg',
    type: 'cocktail',
    isAlcoholic: true,
    emoji: '🍓',
    badge: 'Trending Lagos Hit',
    soldOut: false,
    garnishSuggestions: ['Cucumber ribbons', 'Orange wheels', 'Lemon slices', 'Ice blocks'],
    prepSteps: [
      'Pour Gordon\'s Pink Berry Gin, Action Bitters, and Grenadine into your dispenser over ice.',
      'Gently pour in Fanta and Sprite last to preserve effervescence and fizz.',
      'Stir lightly for 10 seconds and top with sliced cucumber ribbons and fresh citrus.'
    ],
    items: [
      '1x Gordon\'s London Pink Berry Gin (75cl)',
      '1x Action Bitters (75cl)',
      '1x Bardinet Grenadine Cocktail Syrup (1L)',
      '1x Pack of 12 Fanta Orange (50cl PET)',
      '1x Pack of 12 Sprite (50cl PET)',
      '1x Step-by-Step Bartender Mixing Card'
    ],
    structuredIngredients: [
      { productId: 54, name: 'Gordon\'s London Pink Berry Gin', role: 'spirit', baseMl: 750, unitMl: 750, sellType: 'unit', unitPrice: 3500 },
      { productId: 15, name: 'Action Bitters', role: 'bitters', baseMl: 150, unitMl: 750, sellType: 'unit', unitPrice: 3000 },
      { productId: 26, name: 'Bardinet Grenadine Cocktail Syrup', role: 'syrup', baseMl: 250, unitMl: 1000, sellType: 'unit', unitPrice: 11200 },
      { productId: 45, name: 'Fanta Orange (12x50cl)', role: 'mixer', baseMl: 1500, unitMl: 500, unitsPerCarton: 12, sellType: 'carton', unitPrice: 5800 },
      { productId: 44, name: 'Sprite (12x50cl)', role: 'mixer', baseMl: 1500, unitMl: 500, unitsPerCarton: 12, sellType: 'carton', unitPrice: 5800 }
    ]
  },
  {
    id: 'bundle-blue-lagoon',
    name: 'Electric Blue Lagoon Punch',
    category: 'Cocktail Packs',
    price: 37000,
    cost: 29400,
    servings: '20–25 Party Cups (5 Litres)',
    baseVolumeLiters: 5,
    servingsCount: 25,
    costPerServing: '₦1,480/cup',
    savingsHighlight: 'Save ₦2,200/cup vs VIP Island Lounges',
    description: 'Vivid turquoise Caribbean citrus cocktail with smooth vodka, Blue Curacao, and refreshing lime-lemon fizz.',
    recipe: '1. In your dispenser over plenty of ice, pour 1.5 bottles (approx. 1,000ml) of Smirnoff No. 21 Vodka.\n2. Add 400ml of Blue Curacao syrup for that glowing azure electric color.\n3. Pour in 5 bottles (2.5L) of chilled Sprite and 3 cans/bottles of Schweppes Bitter Lemon.\n4. Stir lightly to create the ocean-blue blend. Drop in fresh yellow lemon wheels and mint sprigs.',
    image: '/bundles/blue_lagoon.jpg',
    type: 'cocktail',
    isAlcoholic: true,
    emoji: '🍸',
    badge: 'Party Crowd Magnet',
    soldOut: false,
    garnishSuggestions: ['Lemon wheels', 'Fresh mint leaves', 'Maraschino cherries'],
    prepSteps: [
      'Fill dispenser half-way with crystal ice blocks.',
      'Add Smirnoff Vodka and Blue Curacao syrup.',
      'Top up with chilled Sprite and Bitter Lemon soda. Stir gently.'
    ],
    items: [
      '2x Smirnoff No. 21 Triple Distilled Vodka (75cl)',
      '1x Blue Curacao Cocktail Syrup (1L)',
      '1x Pack of 12 Sprite (50cl PET)',
      '1x Step-by-Step Bartender Mixing Card'
    ],
    structuredIngredients: [
      { productId: 49, name: 'Smirnoff No. 21 Vodka', role: 'spirit', baseMl: 1000, unitMl: 750, sellType: 'unit', unitPrice: 5800 },
      { productId: 37, name: 'Blue Curacao Cocktail Syrup', role: 'syrup', baseMl: 400, unitMl: 1000, sellType: 'unit', unitPrice: 12000 },
      { productId: 44, name: 'Sprite (12x50cl)', role: 'mixer', baseMl: 2500, unitMl: 500, unitsPerCarton: 12, sellType: 'carton', unitPrice: 5800 }
    ]
  },
  {
    id: 'bundle-sunset-cosmo',
    name: 'Sunset Cosmopolitan Punch',
    category: 'Cocktail Packs',
    price: 36500,
    cost: 29100,
    servings: '20–25 Party Cups (5 Litres)',
    baseVolumeLiters: 5,
    servingsCount: 25,
    costPerServing: '₦1,460/cup',
    savingsHighlight: 'Save ₦2,500/cup vs Rooftop Bars',
    description: 'Crisp, elegant sunset-crimson cocktail punch blending sweet orange botanicals, smooth vodka, and tart cranberry juice.',
    recipe: '1. In a glass dispenser over ice, combine 1 bottle of Gordon\'s Sunset Orange Gin (75cl) and 1 bottle of Smirnoff Vodka (75cl).\n2. Pour in 1.5 bottles (approx. 2,000ml) of STUTE Cranberry Juice.\n3. Top with 3 bottles (1.5L) of crisp Sprite.\n4. Stir with fresh blood orange wheels and lime slices.',
    image: '/bundles/sunset_cosmo.jpg',
    type: 'cocktail',
    isAlcoholic: true,
    emoji: '🌅',
    badge: 'Chic Lounge Favorite',
    soldOut: false,
    garnishSuggestions: ['Blood orange wheels', 'Lime wheels', 'Rosemary sprigs'],
    prepSteps: [
      'Pour Sunset Orange Gin and Smirnoff Vodka over ice.',
      'Add chilled Cranberry Juice and stir gently.',
      'Top with Sprite and float fresh orange and lime slices.'
    ],
    items: [
      '1x Gordon\'s London Sunset Orange Gin (75cl)',
      '1x Smirnoff No. 21 Vodka (75cl)',
      '2x STUTE Cranberry Juice (1.5L)',
      '1x Pack of 12 Sprite (50cl PET)',
      '1x Step-by-Step Bartender Mixing Card'
    ],
    structuredIngredients: [
      { productId: 55, name: 'Gordon\'s Sunset Orange Gin', role: 'spirit', baseMl: 750, unitMl: 750, sellType: 'unit', unitPrice: 3500 },
      { productId: 49, name: 'Smirnoff No. 21 Vodka', role: 'spirit', baseMl: 750, unitMl: 750, sellType: 'unit', unitPrice: 5800 },
      { productId: 46, name: 'STUTE Cranberry Juice (1.5L)', role: 'juice', baseMl: 2000, unitMl: 1500, sellType: 'unit', unitPrice: 7000 },
      { productId: 44, name: 'Sprite (12x50cl)', role: 'mixer', baseMl: 1500, unitMl: 500, unitsPerCarton: 12, sellType: 'carton', unitPrice: 5800 }
    ]
  },
  {
    id: 'bundle-sex-on-the-beach',
    name: 'Island Sex on the Beach',
    category: 'Cocktail Packs',
    price: 45000,
    cost: 36500,
    servings: '20–25 Party Cups (5 Litres)',
    baseVolumeLiters: 5,
    servingsCount: 25,
    costPerServing: '₦1,800/cup',
    savingsHighlight: 'Save ₦2,200/cup vs Beach Club Rates',
    description: 'Iconic beach club sunrise punch with smooth triple-distilled vodka, rich orange nectar, tart cranberry juice, and a grenadine sunset float.',
    recipe: '1. Fill dispenser with plenty of solid ice blocks.\n2. Pour in 1.5 bottles (approx. 1,000ml) of Smirnoff Vodka.\n3. Add 3 cartons (approx. 2,000ml) of 5alive Pulpy Orange Juice and 1 bottle (1,500ml) of Cranberry Juice.\n4. Drizzle 200ml of Grenadine syrup slowly along the inside of the dispenser so it sinks to create the gorgeous layered sunset effect.\n5. Top with pineapple wedges and orange wheels.',
    image: '/bundles/sex_on_the_beach.jpg',
    type: 'cocktail',
    isAlcoholic: true,
    emoji: '🏖️',
    badge: 'Beach & Pool Party Pick',
    soldOut: false,
    garnishSuggestions: ['Pineapple wedges', 'Orange wheels', 'Cocktail cherries'],
    prepSteps: [
      'Fill dispenser with ice and pour in Smirnoff Vodka.',
      'Blend Orange Juice and Cranberry Juice over ice.',
      'Slowly drizzle Grenadine down the sides for a layered sunrise effect.'
    ],
    items: [
      '2x Smirnoff No. 21 Vodka (75cl)',
      '1x Pack of 6 5alive Pulpy Orange Juice (78cl)',
      '1x STUTE Cranberry Juice (1.5L)',
      '1x Bardinet Grenadine Cocktail Syrup (1L)',
      '1x Step-by-Step Bartender Mixing Card'
    ],
    structuredIngredients: [
      { productId: 49, name: 'Smirnoff No. 21 Vodka', role: 'spirit', baseMl: 1000, unitMl: 750, sellType: 'unit', unitPrice: 5800 },
      { productId: 39, name: '5alive Pulpy Orange (Pack of 6)', role: 'juice', baseMl: 2000, unitMl: 780, unitsPerCarton: 6, sellType: 'carton', unitPrice: 6700 },
      { productId: 46, name: 'STUTE Cranberry Juice (1.5L)', role: 'juice', baseMl: 1500, unitMl: 1500, sellType: 'unit', unitPrice: 7000 },
      { productId: 26, name: 'Bardinet Grenadine Syrup', role: 'syrup', baseMl: 200, unitMl: 1000, sellType: 'unit', unitPrice: 11200 }
    ]
  },
  {
    id: 'bundle-sangria-fiesta',
    name: 'Sangria Fiesta Bowl',
    category: 'Cocktail Packs',
    price: 49500,
    cost: 40500,
    servings: '20–25 Party Cups (5 Litres)',
    baseVolumeLiters: 5,
    servingsCount: 25,
    costPerServing: '₦1,980/cup',
    savingsHighlight: 'Save ₦2,500/cup vs Spanish Wine Lounges',
    description: 'Deep ruby-red wine sangria punch loaded with berry notes, citrus slices, and crisp sparkling fizz. The ultimate brunch and dinner party showstopper.',
    recipe: '1. In a large punch bowl or dispenser, add chopped red apples, oranges, and lime wheels.\n2. Pour 2 full bottles (1,500ml) of Carlo Rossi Sweet Red wine over the fruits.\n3. Add 2 cartons (1,500ml) of 5alive Berry Blast Juice and 200ml of Grenadine syrup.\n4. Let steep over ice for 5 minutes, then gently top with 3 bottles (1.5L) of Sprite.\n5. Ladle into cups with ice and fruit chunks.',
    image: '/bundles/sangria_fiesta.jpg',
    type: 'cocktail',
    isAlcoholic: true,
    emoji: '🍷',
    badge: 'Brunch & Sunday Cookout',
    soldOut: false,
    garnishSuggestions: ['Diced red apples', 'Orange wheels', 'Pineapple chunks'],
    prepSteps: [
      'Chop fresh apples, oranges, and limes into your dispenser or bowl.',
      'Pour Carlo Rossi Sweet Red wine and Berry Blast juice over fruits.',
      'Add Grenadine and top with cold Sprite right before serving.'
    ],
    items: [
      '2x Carlo Rossi Sweet Red Wine (75cl)',
      '1x Pack of 6 5alive Berry Blast Juice (85cl)',
      '1x Pack of 12 Sprite (50cl PET)',
      '1x Bardinet Grenadine Cocktail Syrup (1L)',
      '1x Step-by-Step Bartender Mixing Card'
    ],
    structuredIngredients: [
      { productId: 78, name: 'Carlo Rossi Sweet Red Wine', role: 'spirit', baseMl: 1500, unitMl: 750, sellType: 'unit', unitPrice: 8000 },
      { productId: 77, name: '5alive Berry Blast (Pack of 6)', role: 'juice', baseMl: 1500, unitMl: 850, unitsPerCarton: 6, sellType: 'carton', unitPrice: 7500 },
      { productId: 44, name: 'Sprite (12x50cl)', role: 'mixer', baseMl: 1500, unitMl: 500, unitsPerCarton: 12, sellType: 'carton', unitPrice: 5800 },
      { productId: 26, name: 'Bardinet Grenadine Syrup', role: 'syrup', baseMl: 200, unitMl: 1000, sellType: 'unit', unitPrice: 11200 }
    ]
  },
  {
    id: 'bundle-velvet-mudslide',
    name: 'Velvet Mocha Mudslide Bar',
    category: 'Cocktail Packs',
    price: 42500,
    cost: 34300,
    servings: '20–25 Party Cups (5 Litres)',
    baseVolumeLiters: 5,
    servingsCount: 25,
    costPerServing: '₦1,700/cup',
    savingsHighlight: 'Save ₦3,000/cup vs Luxury Dessert Bars',
    description: 'Decadent, silky dessert cocktail blending genuine Baileys Irish Cream, chocolate vodka, coffee cream liqueur, and chilled sweet cream.',
    recipe: '1. Swirl chocolate syrup along the inner glass walls of your dispenser or pitcher.\n2. In a large bowl or shaker, combine 1 bottle of Baileys Irish Cream (75cl), 1 bottle of Big Ben Chocolate Vodka (75cl), and 1 bottle of Ivory Coffee Cream (75cl).\n3. Add 2 Litres of chilled Hollandia Yoghurt / Full Cream.\n4. Pour over crushed ice in the dispenser and dust with cocoa powder or grated chocolate.',
    image: '/bundles/velvet_mudslide.jpg',
    type: 'cocktail',
    isAlcoholic: true,
    emoji: '🍫',
    badge: 'Decadent Dessert Cocktails',
    soldOut: false,
    garnishSuggestions: ['Chocolate drizzle', 'Cocoa powder dusting', 'Whipped cream'],
    prepSteps: [
      'Drizzle chocolate syrup on dispenser walls.',
      'Blend Baileys, Chocolate Vodka, Coffee Cream, and Hollandia over ice.',
      'Serve chilled over crushed ice with chocolate dusting.'
    ],
    items: [
      '1x Baileys Original Irish Cream (75cl)',
      '1x Big Ben Chocolate Vodka (75cl)',
      '1x Ivory Cream Coffee Liqueur (75cl)',
      '2x Hollandia Yoghurt / Cream (1L)',
      '1x Step-by-Step Bartender Mixing Card'
    ],
    structuredIngredients: [
      { productId: 19, name: 'Baileys Original Irish Cream', role: 'spirit', baseMl: 750, unitMl: 750, sellType: 'unit', unitPrice: 21000 },
      { productId: 35, name: 'Big Ben Chocolate Vodka', role: 'spirit', baseMl: 750, unitMl: 750, sellType: 'unit', unitPrice: 3500 },
      { productId: 22, name: 'Ivory Cream Coffee Liqueur', role: 'spirit', baseMl: 750, unitMl: 750, sellType: 'unit', unitPrice: 6500 },
      { productId: 32, name: 'Hollandia Yoghurt (1L)', role: 'mixer', baseMl: 2000, unitMl: 1000, sellType: 'unit', unitPrice: 1650 }
    ]
  },
  {
    id: 'bundle-rum-malt-cooler',
    name: 'Spiced Rum & Dark Malt Cooler',
    category: 'Cocktail Packs',
    price: 22500,
    cost: 16800,
    servings: '20–25 Party Cups (5 Litres)',
    baseVolumeLiters: 5,
    servingsCount: 25,
    costPerServing: '₦900/cup',
    savingsHighlight: 'Save ₦2,100/cup vs Lounge Rates',
    description: 'Deep amber-mahogany dark rum punch packed with molasses notes, aromatic herbs, zesty lime wheels, and crisp sparkling bubbles.',
    recipe: '1. In dispenser, pour 1 bottle of Bull Dark Rhum (75cl) and 1 bottle of Captain Jack Rhum (75cl) over solid ice.\n2. Add 100ml of Action Herbal Bitters for deep aromatic undertones.\n3. Top with 4 bottles (2,000ml) of chilled Sprite.\n4. Stir with fresh lime wheels and mint sprigs.',
    image: '/bundles/rum_malt_cooler.jpg',
    type: 'cocktail',
    isAlcoholic: true,
    emoji: '🌴',
    badge: 'High-Energy Party Punch',
    soldOut: false,
    garnishSuggestions: ['Lime wheels', 'Fresh mint leaves', 'Cinnamon sticks'],
    prepSteps: [
      'Fill dispenser half-way with ice blocks.',
      'Pour Bull Dark Rhum, Captain Jack, and Action Bitters.',
      'Top with chilled Sprite and stir with fresh lime wheels.'
    ],
    items: [
      '1x Bull Dark Rhum (75cl)',
      '1x Captain Jack Rhum (75cl)',
      '1x Action Bitters (75cl)',
      '1x Pack of 12 Sprite (50cl PET)',
      '1x Step-by-Step Bartender Mixing Card'
    ],
    structuredIngredients: [
      { productId: 30, name: 'Bull Dark Rhum', role: 'spirit', baseMl: 750, unitMl: 750, sellType: 'unit', unitPrice: 4500 },
      { productId: 29, name: 'Captain Jack Rhum', role: 'spirit', baseMl: 750, unitMl: 750, sellType: 'unit', unitPrice: 3500 },
      { productId: 15, name: 'Action Bitters', role: 'bitters', baseMl: 100, unitMl: 750, sellType: 'unit', unitPrice: 3000 },
      { productId: 44, name: 'Sprite (12x50cl)', role: 'mixer', baseMl: 2000, unitMl: 500, unitsPerCarton: 12, sellType: 'carton', unitPrice: 5800 }
    ]
  },
  {
    id: 'bundle-whiskey-smash',
    name: 'Herbal Ginger & Whiskey Smash',
    category: 'Cocktail Packs',
    price: 54000,
    cost: 44100,
    servings: '20–25 Party Cups (5 Litres)',
    baseVolumeLiters: 5,
    servingsCount: 25,
    costPerServing: '₦2,160/cup',
    savingsHighlight: 'Save ₦2,800/cup vs VIP Whiskey Bars',
    description: 'Golden premium cocktail punch starring genuine Jameson Irish Whiskey, balanced by herbal bitters, fresh ginger root, and citrus fizz.',
    recipe: '1. In dispenser, lightly muddle fresh sliced ginger root and lemon slices at the base.\n2. Add plenty of solid ice blocks.\n3. Pour 1 full bottle of Jameson Irish Whiskey (75cl) and 200ml of Action Bitters.\n4. Top with 4 bottles (2,000ml) of Sprite.\n5. Stir gently with a bar spoon and garnish with lime wheels.',
    image: '/bundles/whiskey_smash.jpg',
    type: 'cocktail',
    isAlcoholic: true,
    emoji: '🥃',
    badge: 'VIP Executive Choice',
    soldOut: false,
    garnishSuggestions: ['Sliced fresh ginger root', 'Lime wheels', 'Lemon twists'],
    prepSteps: [
      'Add fresh ginger slices and ice blocks to dispenser.',
      'Pour Jameson Irish Whiskey and Action Bitters.',
      'Top with Sprite and float fresh lime wheels.'
    ],
    items: [
      '1x Jameson Irish Whiskey (75cl)',
      '1x Action Bitters (75cl)',
      '1x Pack of 12 Sprite (50cl PET)',
      '1x Step-by-Step Bartender Mixing Card'
    ],
    structuredIngredients: [
      { productId: 40, name: 'Jameson Irish Whiskey', role: 'spirit', baseMl: 750, unitMl: 750, sellType: 'unit', unitPrice: 24500 },
      { productId: 15, name: 'Action Bitters', role: 'bitters', baseMl: 200, unitMl: 750, sellType: 'unit', unitPrice: 3000 },
      { productId: 44, name: 'Sprite (12x50cl)', role: 'mixer', baseMl: 2000, unitMl: 500, unitsPerCarton: 12, sellType: 'carton', unitPrice: 5800 }
    ]
  },
  {
    id: 'bundle-virgin-chapman',
    name: 'The Virgin Ojuwoye Chapman',
    category: 'Mocktail Packs',
    price: 24000,
    cost: 18800,
    servings: '20–25 Party Cups (5 Litres)',
    baseVolumeLiters: 5,
    servingsCount: 25,
    costPerServing: '₦960/cup',
    savingsHighlight: 'Save ₦1,500/cup vs Lagos Restaurants',
    description: '100% non-alcoholic Nigerian Chapman for families, church receptions, and guests who love authentic taste without liquor.',
    recipe: '1. In dispenser, combine 250ml of Bardinet Grenadine Syrup with 2 dashes of Angostura Bitters over plenty of ice.\n2. Gently pour in equal parts Fanta Orange (2 Litres) and Sprite (2 Litres).\n3. Float sliced cucumber ribbons and fresh orange slices.\n4. Stir gently and serve in chilled cups.',
    image: '/bundles/virgin_chapman.jpg',
    type: 'cocktail',
    isAlcoholic: false,
    emoji: '🧃',
    badge: '100% Alcohol-Free',
    soldOut: false,
    garnishSuggestions: ['Cucumber ribbons', 'Orange slices', 'Maraschino cherries'],
    prepSteps: [
      'Add ice and pour Grenadine syrup into dispenser.',
      'Pour equal parts Fanta and Sprite gently to preserve fizz.',
      'Garnish generously with fresh cucumbers and orange wheels.'
    ],
    items: [
      '1x Bardinet Grenadine Cocktail Syrup (1L)',
      '1x Pack of 12 Fanta Orange (50cl PET)',
      '1x Pack of 12 Sprite (50cl PET)',
      '1x Step-by-Step Bartender Mixing Card'
    ],
    structuredIngredients: [
      { productId: 26, name: 'Bardinet Grenadine Syrup', role: 'syrup', baseMl: 250, unitMl: 1000, sellType: 'unit', unitPrice: 11200 },
      { productId: 45, name: 'Fanta Orange (12x50cl)', role: 'mixer', baseMl: 2000, unitMl: 500, unitsPerCarton: 12, sellType: 'carton', unitPrice: 5800 },
      { productId: 44, name: 'Sprite (12x50cl)', role: 'mixer', baseMl: 2000, unitMl: 500, unitsPerCarton: 12, sellType: 'carton', unitPrice: 5800 }
    ]
  }
];

async function sync() {
  console.log(`Syncing ${cocktails.length} authentic cocktails to Neon PostgreSQL...`);

  // Delete old cocktail bundles to prevent stale mismatches, keeping office bundles intact
  await pool.query(`DELETE FROM bundles WHERE type = 'cocktail';`);

  for (const c of cocktails) {
    await pool.query(
      `INSERT INTO bundles (
        id, name, category, price, packprice, unitprice, description, servings, servings_count, cost_per_serving, savings_highlight, items, recipe, image, type, is_alcoholic, sold_out, cost, badge, emoji, structured_ingredients, prep_steps, garnish_suggestions, base_volume_liters
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        category = EXCLUDED.category,
        price = EXCLUDED.price,
        packprice = EXCLUDED.packprice,
        unitprice = EXCLUDED.unitprice,
        description = EXCLUDED.description,
        servings = EXCLUDED.servings,
        servings_count = EXCLUDED.servings_count,
        cost_per_serving = EXCLUDED.cost_per_serving,
        savings_highlight = EXCLUDED.savings_highlight,
        items = EXCLUDED.items,
        recipe = EXCLUDED.recipe,
        image = EXCLUDED.image,
        type = EXCLUDED.type,
        is_alcoholic = EXCLUDED.is_alcoholic,
        sold_out = EXCLUDED.sold_out,
        cost = EXCLUDED.cost,
        badge = EXCLUDED.badge,
        emoji = EXCLUDED.emoji,
        structured_ingredients = EXCLUDED.structured_ingredients,
        prep_steps = EXCLUDED.prep_steps,
        garnish_suggestions = EXCLUDED.garnish_suggestions,
        base_volume_liters = EXCLUDED.base_volume_liters;`,
      [
        c.id,
        c.name,
        c.category,
        c.price,
        c.price,
        c.price,
        c.description,
        c.servings,
        c.servingsCount,
        c.costPerServing,
        c.savingsHighlight,
        JSON.stringify(c.items),
        c.recipe,
        c.image,
        c.type,
        c.isAlcoholic,
        c.soldOut,
        c.cost,
        c.badge,
        c.emoji,
        JSON.stringify(c.structuredIngredients),
        JSON.stringify(c.prepSteps),
        JSON.stringify(c.garnishSuggestions),
        c.baseVolumeLiters || 5
      ]
    );
    console.log(`✓ Upserted ${c.name} (${c.id})`);
  }

  console.log(`Sync completed successfully! Total cocktails: ${cocktails.length}`);
  process.exit(0);
}

sync().catch(err => {
  console.error('Error during bundle sync:', err);
  process.exit(1);
});
