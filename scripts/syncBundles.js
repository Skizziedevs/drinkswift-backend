// drinkswift-backend/scripts/syncBundles.js
// Synchronizes Neon PostgreSQL public.bundles table with real in-stock cocktail & office bundles.

const db = require("../db");

const BUNDLES = [
  {
    id: "bundle-hard-chapman",
    name: "Lagos Hard Chapman Party Pack (Spiked)",
    type: "cocktail",
    is_alcoholic: true,
    category: "Cocktail Packs",
    badge: "🔥 Spiked Party Legend • 850 CL Total Liquid",
    emoji: "🍹",
    price: 34500,
    packprice: 34500,
    unitprice: 34500,
    packsize: 1,
    size: "Full Cocktail Kit (850 CL Total • 40 Party Cups)",
    servings: "Makes 40 Cold Party Cups",
    servings_count: 40,
    cost_per_serving: "₦860 / Cup",
    savings_highlight: "Lounges charge ₦3,500/cup • Save 75%!",
    description: "The iconic Lagos club & owambe Chapman. Curated with authentic Bardinet Grenadine, Alomo Ghana Bitters, Lords Dry Gin, and chilled sodas. Calculated down to the centilitre.",
    items: [
      "1x Carton Coca-Cola / Soda (12 x 50cl PET = 600 CL)",
      "1x Bottle Bardinet Grenadine Cocktail Syrup (1 Liter = 100 CL)",
      "1x Bottle Alomo Ghana Aromatic Bitters (75cl = 75 CL)",
      "1x Bottle Lords London Dry Gin (75cl = 75 CL)"
    ],
    recipe: "Exact Centilitre (CL) Pour per 35cl Party Cup:\n1. Fill cup 40% with fresh ice cubes (approx 14cl volume).\n2. Pour 3.5 CL (1 shot) Lords Dry Gin.\n3. Add 15 CL chilled Soda.\n4. Drizzle 2.5 CL Bardinet Grenadine syrup (sinks for iconic sunset red ombre).\n5. Add 0.5 CL (2 dashes) Alomo Bitters.\n6. Garnish with cucumber slice & lemon wheel.\nTotal Liquid: 21.5 CL per cup. Total Pack Volume: 850 CL = Exactly 40 Party Cups!",
    image: "/bundles/lagos_chapman.jpg"
  },
  {
    id: "bundle-virgin-chapman",
    name: "Classic Virgin Chapman Party Pack",
    type: "cocktail",
    is_alcoholic: false,
    category: "Cocktail Packs",
    badge: "🧃 Zero Alcohol • 775 CL Total Liquid",
    emoji: "🥤",
    price: 24500,
    packprice: 24500,
    unitprice: 24500,
    packsize: 1,
    size: "Full Cocktail Kit (775 CL Total • 40 Party Cups)",
    servings: "Makes 40 Cups (Zero Alcohol)",
    servings_count: 40,
    cost_per_serving: "₦610 / Cup",
    savings_highlight: "Zero alcohol • Perfect for kids, church & family owambe",
    description: "Traditional refreshing Nigerian Chapman with zero alcohol. Genuine Bardinet cocktail grenadine paired with citrus sodas and aromatic bitters.",
    items: [
      "1x Carton Coca-Cola / Citrus Soda (12 x 50cl PET = 600 CL)",
      "1x Bottle Bardinet Grenadine Cocktail Syrup (1 Liter = 100 CL)",
      "1x Bottle Appetite / Alomo Bitters (75cl = 75 CL)"
    ],
    recipe: "Exact Centilitre (CL) Pour per 35cl Cup:\n1. Fill cup 40% with fresh ice cubes.\n2. Pour 16.5 CL chilled Soda.\n3. Drizzle 2.5 CL Bardinet Grenadine syrup.\n4. Add 0.5 CL (2 dashes) Bitters for signature aroma.\n5. Garnish with cucumber slice and orange wedge.\nTotal Liquid: 19.5 CL per cup. Total Pack Volume: 775 CL = Exactly 40 Full Cups!",
    image: "/bundles/virgin_chapman.jpg"
  },
  {
    id: "bundle-blue-lagoon",
    name: "Electric Blue Lagoon Caribbean Punch Pack",
    type: "cocktail",
    is_alcoholic: true,
    category: "Cocktail Packs",
    badge: "🌊 Electric Blue Party Mix • 775 CL Total",
    emoji: "🍸",
    price: 39500,
    packprice: 39500,
    unitprice: 39500,
    packsize: 1,
    size: "Full Cocktail Kit (775 CL Total • 25–30 Cocktails)",
    servings: "Makes 25–30 Highball Cocktails",
    servings_count: 25,
    cost_per_serving: "₦1,580 / Cocktail",
    savings_highlight: "VIP lounges charge ₦5,000/glass • Save 68%!",
    description: "Stunning, high-energy neon blue party cocktail. Built with authentic French Blue Curacao cocktail syrup, triple-distilled Absolut Vodka, and chilled sparkling mixer.",
    items: [
      "1x Bottle Blue Curacao Cocktail Syrup (1 Liter = 100 CL)",
      "1x Bottle Absolut Pure Vodka (75cl = 75 CL)",
      "1x Carton Citrus / Soda Cans (12 x 50cl = 600 CL)"
    ],
    recipe: "Exact Centilitre (CL) Pour per Highball Glass:\n1. Fill highball glass with crystal ice cubes.\n2. Pour 3.5 CL Absolut Vodka.\n3. Add 3 CL Blue Curacao syrup (creates deep Caribbean electric blue).\n4. Top with 15 CL chilled Soda.\n5. Stir gently with bar spoon. Garnish with a lime wheel or maraschino cherry.\nTotal Liquid: 21.5 CL per cocktail. Yield: 25 Large Cocktails (or 40 cups with 2nd vodka bottle)!",
    image: "/bundles/tequila_sunrise.jpg"
  },
  {
    id: "bundle-tropical-rum-sunset",
    name: "Owambe Dark Rum & Tropical Sunset Punch",
    type: "cocktail",
    is_alcoholic: true,
    category: "Cocktail Packs",
    badge: "🌴 Caribbean Rum Punch • 1,643 CL Liquid",
    emoji: "🍹",
    price: 38000,
    packprice: 38000,
    unitprice: 38000,
    packsize: 1,
    size: "Full Party Punch Kit (1,643 CL Total • 50+ Cups)",
    servings: "Makes 50+ Party Cups",
    servings_count: 50,
    cost_per_serving: "₦760 / Cup",
    savings_highlight: "Massive 16.4 Litres total liquid • Ideal for big parties",
    description: "Vibrant high-volume tropical punch with Bull Rhum Dark Rhum, 10 packs of Chivita Exotic Pineapple & Coconut, 5Alive Pulpy Orange, and layered Bardinet Grenadine.",
    items: [
      "1x Bottle Bull Rhum Dark Rhum (75cl = 75 CL)",
      "1x Carton Chivita Exotic Pineapple & Coconut (10 x 1 Liter = 1,000 CL)",
      "1x Carton 5Alive Pulpy Orange (6 x 78cl = 468 CL)",
      "1x Bottle Bardinet Grenadine Cocktail Syrup (1 Liter = 100 CL)"
    ],
    recipe: "Exact Centilitre (CL) Pour per 35cl Party Cup:\n1. Fill cup with crushed ice.\n2. Pour 3.5 CL Bull Rhum Dark Rhum.\n3. Pour 10 CL Chivita Exotic Pineapple & Coconut.\n4. Pour 7 CL 5Alive Pulpy Orange.\n5. Slowly drizzle 2 CL Bardinet Grenadine down the side so it settles into a sunset gradient.\nTotal Liquid: 22.5 CL per cup. Total Pack Volume: 1,643 CL = Over 50 Generous Party Cups!",
    image: "/bundles/whiskey_sour.jpg"
  },
  {
    id: "bundle-baileys-dessert",
    name: "Baileys Coffee & Chocolate Cream Dessert Pack",
    type: "cocktail",
    is_alcoholic: true,
    category: "Cocktail Packs",
    badge: "🥛 Velvety Dessert Bar • 225 CL Liqueurs",
    emoji: "🥛",
    price: 33500,
    packprice: 33500,
    unitprice: 33500,
    packsize: 1,
    size: "Full Dessert Kit (225 CL Liqueurs • 25–30 Servings)",
    servings: "Makes 25–30 Dessert Glasses",
    servings_count: 28,
    cost_per_serving: "₦1,190 / Serving",
    savings_highlight: "Lounges charge ₦4,500/glass • Rich & indulgent",
    description: "Rich, velvety dessert cocktail kit for bridal showers, birthdays, and dinner parties. Genuine Baileys Irish cream, Ivory Coffee Cream, and Big Ben Chocolate Vodka shaken over ice.",
    items: [
      "1x Bottle Baileys Original Irish Cream (75cl = 75 CL)",
      "1x Bottle Ivory Cream Coffee Liqueur (75cl = 75 CL)",
      "1x Bottle Big Ben Chocolate Vodka (75cl = 75 CL)"
    ],
    recipe: "Exact Centilitre (CL) Pour per Lowball Rock Glass:\n1. Add ice rock to glass or cocktail shaker.\n2. Pour 3 CL Baileys Irish Cream.\n3. Pour 3 CL Ivory Coffee Cream.\n4. Pour 2.5 CL Big Ben Chocolate Vodka.\n5. Shake vigorously for 15 seconds until frosted.\n6. Strain over fresh ice rock and dust with cocoa powder.\nTotal Liquid: 8.5 CL pure liqueur per serving = Exactly 28 Luxurious Servings!",
    image: "/bundles/baileys_dessert.jpg"
  },
  {
    id: "bundle-vodka-energy-punch",
    name: "Club Energy Vodka Punch Pack",
    type: "cocktail",
    is_alcoholic: true,
    category: "Cocktail Packs",
    badge: "⚡ High Energy Party Fuel • 1,675 CL Liquid",
    emoji: "⚡",
    price: 42500,
    packprice: 42500,
    unitprice: 42500,
    packsize: 1,
    size: "Full High-Energy Kit (1,675 CL Total • 40 Party Cups)",
    servings: "Makes 40 Energy Party Cups",
    servings_count: 40,
    cost_per_serving: "₦1,060 / Cup",
    savings_highlight: "Nightclub favorite • Keeps dance floor moving all night",
    description: "Fast-paced club and house party fuel. Triple-distilled Absolut Vodka paired with 12 cans of Fearless Energy Drinks and chilled Chivita Exotic juice.",
    items: [
      "1x Bottle Absolut Pure Vodka (75cl = 75 CL)",
      "1x Carton Fearless Energy Drink (12 x 50cl = 600 CL)",
      "1x Carton Chivita Exotic Juice (10 x 1 Liter = 1,000 CL)"
    ],
    recipe: "Exact Centilitre (CL) Pour per 35cl Cup:\n1. Fill cup with crushed ice.\n2. Pour 3.5 CL Absolut Vodka.\n3. Pour 12 CL chilled Fearless Energy Drink.\n4. Top with 6 CL Chivita Exotic Juice.\n5. Stir lightly. Serve immediately for an instant party spark!\nTotal Liquid: 21.5 CL per cup. Total Pack Volume: 1,675 CL = 40+ Highball Party Drinks!",
    image: "/bundles/vodka_energy_punch.jpg"
  },
  {
    id: "bundle-office-tech-crunch",
    name: "Tech Hub / Startup Weekly Refreshment Pack",
    type: "office",
    is_alcoholic: false,
    category: "Office Supply",
    badge: "🏢 Supplies 10–15 Staff for 1 Week",
    emoji: "⚡",
    price: 36500,
    packprice: 36500,
    unitprice: 36500,
    packsize: 1,
    size: "Weekly Office Pantry Supply (3,200 CL Total)",
    servings: "Supplies 10–15 Team Members",
    servings_count: 15,
    cost_per_serving: "₦2,430 / Staff / Week",
    savings_highlight: "Full Monday-to-Friday pantry supply at direct depot prices",
    description: "Keep your engineering, sales, and design team energized all week. High-protein Hollandia yoghurts, 100% Chivita fruit juices, Fearless energy boosters for late shifts, and table water.",
    items: [
      "1x Carton Hollandia Yoghurt (10 x 1 Liter = 1,000 CL)",
      "1x Carton Chivita Exotic Real Juice (10 x 1 Liter = 1,000 CL)",
      "1x Carton Fearless Energy Drinks (12 x 50cl Can = 600 CL)",
      "1x Carton Lucozade Boost Energy (6 x 1 Liter = 600 CL)"
    ],
    recipe: "Weekly Corporate Schedule: Delivered every Monday at 9:00 AM directly to your office reception at direct Ojuwoye wholesale rate. Itemized VAT-ready invoice included.",
    image: "/bundles/office_tech_crunch.jpg"
  },
  {
    id: "bundle-office-boardroom",
    name: "Executive Boardroom & Client Hospitality Pack",
    type: "office",
    is_alcoholic: false,
    category: "Office Supply",
    badge: "💼 Premium Corporate Grade",
    emoji: "🍇",
    price: 32000,
    packprice: 32000,
    unitprice: 32000,
    packsize: 1,
    size: "Executive Meeting Supply",
    servings: "Supplies 25+ Executive Meetings",
    servings_count: 25,
    cost_per_serving: "₦1,280 / Meeting",
    savings_highlight: "Premium hospitality at direct depot rate",
    description: "Sophisticated refreshments for visiting clients, board meetings, and executive suites. Compact bottles and cans with zero mess.",
    items: [
      "1x Carton 5Alive Pulpy Orange (6 x 78cl = 468 CL)",
      "1x Carton Chivita Exotic Premium Juice (10 x 1 Liter = 1,000 CL)",
      "1x Carton Coca-Cola PET (12 x 50cl = 600 CL)",
      "1x Carton Dudu Yoghurt Green (12 x 50cl = 600 CL)"
    ],
    recipe: "Weekly or bi-weekly replenishment available. Clean corporate billing and VAT-ready invoice sent via WhatsApp / Email.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "bundle-office-friday-happy-hour",
    name: "Corporate Friday TGIF & Mixer Pack",
    type: "office",
    is_alcoholic: true,
    category: "Office Supply",
    badge: "🍻 Friday Team Bonding",
    emoji: "🍻",
    price: 39500,
    packprice: 39500,
    unitprice: 39500,
    packsize: 1,
    size: "Friday Office Mixer Kit",
    servings: "Supplies 15–20 Team Members",
    servings_count: 20,
    cost_per_serving: "₦1,975 / Team Member",
    savings_highlight: "Chilled reward for hitting Friday targets",
    description: "Reward your team at 4:00 PM on Friday! Mix of chilled red wine, refreshing malt drinks, and sodas to celebrate hitting weekly targets.",
    items: [
      "1x Carton Baron Romero / 4th Street Red Wine (6 x 75cl = 450 CL)",
      "1x Carton Maltina Cans (24 x 33cl = 792 CL)",
      "1x Carton Coca-Cola PET (12 x 50cl = 600 CL)"
    ],
    recipe: "Deliver Friday afternoon at 2:00 PM chilled and ready for team celebration.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=600&auto=format&fit=crop"
  }
];

async function sync() {
  console.log("Starting Neon DB bundle sync...");
  
  // Clean up legacy mock bundle IDs
  await db.query("DELETE FROM public.bundles WHERE id IN ('bundle-tequila-sunrise', 'bundle-whiskey-sour')");

  for (const b of BUNDLES) {
    await db.query(
      `INSERT INTO public.bundles 
       (id, name, type, is_alcoholic, category, badge, emoji, price, packprice, unitprice, packsize, size, servings, servings_count, cost_per_serving, savings_highlight, description, items, recipe, image, sold_out)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         type = EXCLUDED.type,
         is_alcoholic = EXCLUDED.is_alcoholic,
         category = EXCLUDED.category,
         badge = EXCLUDED.badge,
         emoji = EXCLUDED.emoji,
         price = EXCLUDED.price,
         packprice = EXCLUDED.packprice,
         unitprice = EXCLUDED.unitprice,
         packsize = EXCLUDED.packsize,
         size = EXCLUDED.size,
         servings = EXCLUDED.servings,
         servings_count = EXCLUDED.servings_count,
         cost_per_serving = EXCLUDED.cost_per_serving,
         savings_highlight = EXCLUDED.savings_highlight,
         description = EXCLUDED.description,
         items = EXCLUDED.items,
         recipe = EXCLUDED.recipe,
         image = EXCLUDED.image,
         sold_out = false;`,
      [
        b.id,
        b.name,
        b.type,
        b.is_alcoholic,
        b.category,
        b.badge,
        b.emoji,
        b.price,
        b.packprice,
        b.unitprice,
        b.packsize,
        b.size,
        b.servings,
        b.servings_count,
        b.cost_per_serving,
        b.savings_highlight,
        b.description,
        JSON.stringify(b.items),
        b.recipe,
        b.image,
        false,
      ]
    );
    console.log(`Synced: [${b.id}] - ${b.name}`);
  }

  console.log("SUCCESS: All bundles synced to PostgreSQL!");
  process.exit(0);
}

sync().catch((err) => {
  console.error("Sync error:", err);
  process.exit(1);
});
