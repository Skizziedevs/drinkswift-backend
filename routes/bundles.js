const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyAdmin = require("../middleware/auth");

const INITIAL_BUNDLES_SEED = [
  {
    id: "bundle-hard-chapman",
    name: "Lagos Hard Chapman Party Pack (Spiked)",
    type: "cocktail",
    is_alcoholic: true,
    category: "Cocktail Packs",
    badge: "🔥 Spiked with Campari (Top Seller)",
    emoji: "🍹",
    price: 49500,
    packprice: 49500,
    unitprice: 49500,
    packsize: 1,
    size: "Full Cocktail Kit (Makes 45–50 Cups)",
    servings: "Makes 45–50 Party Cups",
    servings_count: 50,
    cost_per_serving: "₦990 / Cup",
    savings_highlight: "Lounges charge ₦3,500/cup • Save 72%!",
    description: "The legendary Lagos club & party Chapman. Spiked with original Campari for that authentic bitter-sweet alcoholic kick.",
    items: [
      "1x Carton Fanta (12 x 50cl PET)",
      "1x Carton Sprite (12 x 50cl PET)",
      "1x Bottle Campari Bitter Liqueur (75cl)",
      "1x Bottle Angostura / Alomo Bitters (75cl)",
      "1x Bottle Grenadine Cocktail Syrup (75cl)"
    ],
    recipe: "1. Fill a glass/cup 3/4 with ice cubes.\n2. Pour 1 shot (30ml) of Campari.\n3. Add equal parts Fanta and Sprite (fill to near brim).\n4. Add 2 dashes of Angostura/Alomo Bitters.\n5. Drizzle 1 tablespoon of Grenadine syrup (sinks to the bottom for that classic red sunset look).\n6. Garnish with cucumber slice and lemon wheel. Stir gently & serve cold!",
    image: "/bundles/lagos_chapman.jpg"
  },
  {
    id: "bundle-virgin-chapman",
    name: "Classic Virgin Chapman Party Pack",
    type: "cocktail",
    is_alcoholic: false,
    category: "Cocktail Packs",
    badge: "🧃 Non-Alcoholic (Family & Church Events)",
    emoji: "🥤",
    price: 28500,
    packprice: 28500,
    unitprice: 28500,
    packsize: 1,
    size: "Full Cocktail Kit (Makes 45–50 Cups)",
    servings: "Makes 45–50 Cups (Zero Alcohol)",
    servings_count: 50,
    cost_per_serving: "₦570 / Cup",
    savings_highlight: "Zero alcohol • Perfect for kids & receptions",
    description: "Traditional refreshing Nigerian Chapman with zero alcohol. Ideal for family events, church receptions, kids parties, and bridal showers.",
    items: [
      "1x Carton Fanta (12 x 50cl PET)",
      "1x Carton Sprite (12 x 50cl PET)",
      "1x Bottle Non-Alcoholic Cocktail Bitters (75cl)",
      "1x Bottle Grenadine Cocktail Syrup (75cl)",
      "1x Pack Eva Water (12 x 75cl)"
    ],
    recipe: "1. Fill cup with plenty of ice.\n2. Pour 50% Fanta and 50% Sprite.\n3. Add 2 dashes of Bitters for aroma.\n4. Drizzle 1-2 tablespoons of Grenadine syrup down the center.\n5. Garnish with a thick slice of fresh cucumber and orange wedge.",
    image: "/bundles/virgin_chapman.jpg"
  },
  {
    id: "bundle-tequila-sunrise",
    name: "Owambe Tequila Sunrise Pack",
    type: "cocktail",
    is_alcoholic: true,
    category: "Cocktail Packs",
    badge: "🌵 Spiked Party Punch",
    emoji: "🍹",
    price: 43000,
    packprice: 43000,
    unitprice: 43000,
    packsize: 1,
    size: "Full Cocktail Kit (Makes 35–40 Drinks)",
    servings: "Makes 35–40 Cocktails",
    servings_count: 40,
    cost_per_serving: "₦1,075 / Cocktail",
    savings_highlight: "Clubs charge ₦4,000/glass • Save 73%!",
    description: "Vibrant, high-energy party cocktail with gold tequila, pure orange juice, and sweet grenadine syrup. Guaranteed crowd-pleaser for birthdays and poolside events.",
    items: [
      "1x Bottle Sierra / Olmeca Tequila (75cl)",
      "1x Carton Chi Exotic / Chivita Orange (10 x 1 Litre)",
      "1x Bottle Grenadine Cocktail Syrup (75cl)"
    ],
    recipe: "1. Fill tall glass with fresh ice cubes.\n2. Pour 1.5 shots (45ml) of Tequila.\n3. Top with chilled Orange Juice leaving 1 inch at the top.\n4. Slowly pour 1 tablespoon of Grenadine down the side of the glass so it settles at the bottom to form the sunset layers.\n5. Do not stir before serving! Garnish with orange wheel.",
    image: "/bundles/tequila_sunrise.jpg"
  },
  {
    id: "bundle-whiskey-sour",
    name: "VIP Lounge Whiskey Sour / Old Fashioned Pack",
    type: "cocktail",
    is_alcoholic: true,
    category: "Cocktail Packs",
    badge: "🥃 Executive Lounge Grade",
    emoji: "🥃",
    price: 54000,
    packprice: 54000,
    unitprice: 54000,
    packsize: 1,
    size: "Full Cocktail Kit (Makes 30–35 Drinks)",
    servings: "Makes 30–35 Cocktails",
    servings_count: 35,
    cost_per_serving: "₦1,540 / Cocktail",
    savings_highlight: "VIP lounges charge ₦6,000/glass • Premium quality",
    description: "Premium cocktail kit for upscale lounges, VIP sections, and corporate celebrations. Uses original Jameson whiskey paired with citrus mixers and aromatic bitters.",
    items: [
      "1x Bottle Jameson Irish Whiskey (75cl)",
      "1x Carton Schweppes Soda Water (24 Cans)",
      "1x Bottle Angostura Aromatic Bitters (20cl)",
      "1x Bottle Cocktail Lemon/Sour Mix Cordial (75cl)"
    ],
    recipe: "1. Pour 50ml Jameson Whiskey into shaker with ice.\n2. Add 25ml Lemon/Sour mix and 2 dashes of Angostura Bitters.\n3. Shake well for 15 seconds until chilled.\n4. Strain into lowball glass over a large ice rock.\n5. Top with a splash of Schweppes Soda Water for effervescence. Garnish with a cherry or lemon twist.",
    image: "/bundles/whiskey_sour.jpg"
  },
  {
    id: "bundle-vodka-energy-punch",
    name: "Club Energy Vodka Punch Pack",
    type: "cocktail",
    is_alcoholic: true,
    category: "Cocktail Packs",
    badge: "⚡ High Octane Party Fuel",
    emoji: "🍸",
    price: 36500,
    packprice: 36500,
    unitprice: 36500,
    packsize: 1,
    size: "Full Cocktail Kit (Makes 35–40 Cups)",
    servings: "Makes 35–40 Party Cups",
    servings_count: 40,
    cost_per_serving: "₦910 / Cup",
    savings_highlight: "Nightclub favorite • Fast, high-energy party mix",
    description: "Fast-paced club and house party favorite. Pure triple-distilled vodka paired with chilled herbal energy drinks and cranberry/citrus mixer.",
    items: [
      "1x Bottle Smirnoff / Absolut Vodka (75cl)",
      "1x Carton Fearless / Climax Energy Drinks (12 x 50cl Can)",
      "1x Carton Chivita Active / Cranberry Juice (10 x 1 Litre)"
    ],
    recipe: "1. Fill cup with plenty of crushed ice.\n2. Add 1 shot (40ml) Vodka.\n3. Fill half with chilled Energy Drink and half with Cranberry juice.\n4. Stir lightly. Serve immediately for an instant party spark!",
    image: "/bundles/vodka_energy_punch.jpg"
  },
  {
    id: "bundle-baileys-dessert",
    name: "Sweet Cream Baileys Dessert Cocktail Pack",
    type: "cocktail",
    is_alcoholic: true,
    category: "Cocktail Packs",
    badge: "🥛 Velvety Dessert Cocktail",
    emoji: "🥛",
    price: 48000,
    packprice: 48000,
    unitprice: 48000,
    packsize: 1,
    size: "Full Cocktail Kit (Makes 25–30 Servings)",
    servings: "Makes 25–30 Servings",
    servings_count: 30,
    cost_per_serving: "₦1,600 / Serving",
    savings_highlight: "Velvety & luxurious • Ideal for dinners & showers",
    description: "Rich, indulgent dessert cocktail kit for bridal showers, ladies nights, and birthday dinners. Luxurious Irish cream blended over ice with chocolate/coffee notes.",
    items: [
      "1x Bottle Baileys Original Irish Cream (75cl)",
      "1x Bottle Coffee Liqueur / Kahlua (75cl)",
      "1x Carton Hollandia Evaporated Full Cream Milk (24 packs)"
    ],
    recipe: "1. Add equal parts Baileys (35ml) and Coffee Liqueur (35ml) into a shaker with ice.\n2. Add 20ml evaporated milk/cream.\n3. Shake vigorously and strain into cocktail glass.\n4. Dust with cocoa powder or grated chocolate.",
    image: "/bundles/baileys_dessert.jpg"
  },
  {
    id: "bundle-office-tech-crunch",
    name: "Tech Hub / Startup Weekly Refreshment Pack",
    type: "office",
    is_alcoholic: false,
    category: "Office Supply",
    badge: "🏢 Supplies 10–15 Staff for 1 Week",
    emoji: "⚡",
    price: 32000,
    packprice: 32000,
    unitprice: 32000,
    packsize: 1,
    size: "Weekly Office Pantry Supply",
    servings: "Supplies 10–15 Team Members",
    servings_count: 15,
    cost_per_serving: "₦2,130 / Staff / Week",
    savings_highlight: "Full Monday-to-Friday pantry supply",
    description: "Keep your engineering, sales, and design team energized all week. High-protein yoghurts, 100% fruit juices, energy boosters for late shifts, and pure table water.",
    items: [
      "1x Carton Hollandia Yoghurt (10 x 1 Litre)",
      "1x Carton Chivita 100% Real Juice (10 x 1 Litre)",
      "1x Carton Fearless Energy Drinks (12 x 50cl Can)",
      "2x Packs Eva Drinking Water (24 x 75cl Bottles)"
    ],
    recipe: "Weekly Corporate Schedule: Delivered every Monday at 9:00 AM directly to your office reception at direct Ojuwoye wholesale rate.",
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
    price: 29500,
    packprice: 29500,
    unitprice: 29500,
    packsize: 1,
    size: "Executive Meeting Supply",
    servings: "Supplies 20+ Executive Meetings",
    servings_count: 20,
    cost_per_serving: "₦1,475 / Meeting",
    savings_highlight: "Compact cans & bottled waters for boardroom ease",
    description: "Sophisticated refreshments for visiting clients, board meetings, and executive suites. Compact bottles and cans with zero mess.",
    items: [
      "2x Packs Eva Natural Mineral Water (24 x 50cl Compact Size)",
      "1x Carton Chivita Premium Real Fruit Juice (10 x 1 Litre)",
      "1x Carton Schweppes Tonic / Soda / Bitter Lemon (24 x 33cl Cans)",
      "1x Carton 5 Alive Pulpy Orange (12 x 40cl Bottles)"
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
    price: 41000,
    packprice: 41000,
    unitprice: 41000,
    packsize: 1,
    size: "Friday Office Mixer Kit",
    servings: "Supplies 15–20 Team Members",
    servings_count: 20,
    cost_per_serving: "₦2,050 / Team Member",
    savings_highlight: "Chilled reward for hitting Friday targets",
    description: "Reward your team at 4:00 PM on Friday! Mix of cold premium beers, ciders, malt drinks, and soft drinks to celebrate hitting weekly targets.",
    items: [
      "1x Carton Heineken Premium Cans (24 x 33cl)",
      "1x Carton Star Radler Citrus Beer (24 Cans)",
      "1x Carton Maltina Cans (24 x 33cl)",
      "1x Carton Coca-Cola PET (12 x 50cl)"
    ],
    recipe: "Deliver Friday afternoon at 2:00 PM chilled and ready for team celebration.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=600&auto=format&fit=crop"
  }
];

const initBundlesTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS public.bundles (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) DEFAULT 'cocktail',
        is_alcoholic BOOLEAN DEFAULT false,
        category VARCHAR(100) DEFAULT 'Cocktail Packs',
        badge VARCHAR(150),
        emoji VARCHAR(50) DEFAULT '🍹',
        price NUMERIC NOT NULL,
        packprice NUMERIC,
        unitprice NUMERIC,
        packsize INT DEFAULT 1,
        size VARCHAR(100),
        servings VARCHAR(100),
        servings_count INT,
        cost_per_serving VARCHAR(100),
        savings_highlight VARCHAR(255),
        description TEXT,
        items JSONB DEFAULT '[]'::jsonb,
        recipe TEXT,
        image TEXT,
        sold_out BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if table is empty; if so, seed with initial bundles
    const countRes = await db.query("SELECT COUNT(*) FROM public.bundles");
    if (parseInt(countRes.rows[0].count, 10) === 0) {
      console.log("Seeding initial bundles into database...");
      for (const b of INITIAL_BUNDLES_SEED) {
        await db.query(
          `INSERT INTO public.bundles 
           (id, name, type, is_alcoholic, category, badge, emoji, price, packprice, unitprice, packsize, size, servings, servings_count, cost_per_serving, savings_highlight, description, items, recipe, image, sold_out)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
           ON CONFLICT (id) DO NOTHING`,
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
      }
      console.log("Initial bundles successfully seeded!");
    }
  } catch (err) {
    console.error("Bundles table init error:", err);
  }
};
initBundlesTable();

const mapBundleRow = (row) => ({
  id: row.id,
  name: row.name,
  type: row.type || "cocktail",
  isAlcoholic: Boolean(row.is_alcoholic),
  category: row.category || "Cocktail Packs",
  badge: row.badge,
  emoji: row.emoji || "🍹",
  price: Number(row.price),
  packprice: Number(row.packprice || row.price),
  unitprice: Number(row.unitprice || row.price),
  packsize: Number(row.packsize || 1),
  size: row.size,
  servings: row.servings,
  servingsCount: row.servings_count,
  costPerServing: row.cost_per_serving,
  savingsHighlight: row.savings_highlight,
  description: row.description,
  items: Array.isArray(row.items) ? row.items : (typeof row.items === "string" ? JSON.parse(row.items) : []),
  recipe: row.recipe,
  image: row.image,
  soldOut: Boolean(row.sold_out),
  createdAt: row.created_at,
});

// GET all bundles (Public)
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM public.bundles ORDER BY created_at ASC");
    res.json(result.rows.map(mapBundleRow));
  } catch (err) {
    console.error("Error fetching bundles:", err);
    res.status(500).json({ error: "Failed to fetch bundles" });
  }
});

// POST a new bundle (Admin Only)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const {
      name,
      type = "cocktail",
      isAlcoholic = false,
      category = "Cocktail Packs",
      badge = null,
      emoji = "🍹",
      price,
      size = null,
      servings = null,
      servingsCount = null,
      costPerServing = null,
      savingsHighlight = null,
      description = null,
      items = [],
      recipe = null,
      image = null,
      soldOut = false,
    } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: "Name and Price are required" });
    }

    // Auto-generate slug ID if not provided
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const id = req.body.id || `bundle-${slug}-${Date.now().toString().slice(-4)}`;

    const result = await db.query(
      `INSERT INTO public.bundles
       (id, name, type, is_alcoholic, category, badge, emoji, price, packprice, unitprice, packsize, size, servings, servings_count, cost_per_serving, savings_highlight, description, items, recipe, image, sold_out)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
       RETURNING *`,
      [
        id,
        name,
        type,
        Boolean(isAlcoholic),
        category,
        badge,
        emoji,
        Number(price),
        Number(price),
        Number(price),
        1,
        size,
        servings,
        servingsCount,
        costPerServing,
        savingsHighlight,
        description,
        JSON.stringify(Array.isArray(items) ? items : [items]),
        recipe,
        image,
        Boolean(soldOut),
      ]
    );

    res.status(201).json(mapBundleRow(result.rows[0]));
  } catch (err) {
    console.error("Error creating bundle:", err);
    res.status(500).json({ error: "Failed to create bundle", details: err.message });
  }
});

// PUT update an existing bundle (Admin Only)
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      type,
      isAlcoholic,
      category,
      badge,
      emoji,
      price,
      size,
      servings,
      servingsCount,
      costPerServing,
      savingsHighlight,
      description,
      items,
      recipe,
      image,
      soldOut,
    } = req.body;

    const result = await db.query(
      `UPDATE public.bundles SET
        name = COALESCE($1, name),
        type = COALESCE($2, type),
        is_alcoholic = COALESCE($3, is_alcoholic),
        category = COALESCE($4, category),
        badge = $5,
        emoji = COALESCE($6, emoji),
        price = COALESCE($7, price),
        packprice = COALESCE($7, packprice),
        unitprice = COALESCE($7, unitprice),
        size = COALESCE($8, size),
        servings = COALESCE($9, servings),
        servings_count = $10,
        cost_per_serving = $11,
        savings_highlight = $12,
        description = COALESCE($13, description),
        items = COALESCE($14, items),
        recipe = COALESCE($15, recipe),
        image = COALESCE($16, image),
        sold_out = COALESCE($17, sold_out)
       WHERE id = $18
       RETURNING *`,
      [
        name,
        type,
        isAlcoholic !== undefined ? Boolean(isAlcoholic) : null,
        category,
        badge,
        emoji,
        price !== undefined ? Number(price) : null,
        size,
        servings,
        servingsCount,
        costPerServing,
        savingsHighlight,
        description,
        items ? JSON.stringify(Array.isArray(items) ? items : [items]) : null,
        recipe,
        image,
        soldOut !== undefined ? Boolean(soldOut) : null,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Bundle not found" });
    }

    res.json(mapBundleRow(result.rows[0]));
  } catch (err) {
    console.error("Error updating bundle:", err);
    res.status(500).json({ error: "Failed to update bundle", details: err.message });
  }
});

// DELETE a bundle (Admin Only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE FROM public.bundles WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Bundle not found" });
    }
    res.json({ message: "Bundle deleted successfully", id });
  } catch (err) {
    console.error("Error deleting bundle:", err);
    res.status(500).json({ error: "Failed to delete bundle" });
  }
});

module.exports = router;
