// drinkswift-backend/scripts/addRecommendedDrinks.js
// Inserts the AI-researched recommended mixology & high-margin drinks into Neon PostgreSQL.

const db = require("../db");

const RECOMMENDED_DRINKS = [
  {
    name: "Jameson Irish Whiskey",
    category: "Alcoholic Drink",
    subcategory: "Whiskey",
    size: "75cl Blended Whiskey",
    packsize: 12,
    packprice: 270000,
    unitprice: 24500,
    allow_single: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Jameson_Irish_Whiskey.PNG",
    emoji: "🥃",
  },
  {
    name: "Schweppes Indian Tonic Water",
    category: "Soft Drinks",
    subcategory: "Mixers",
    size: "33cl Can",
    packsize: 24,
    packprice: 13000,
    unitprice: 600,
    allow_single: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Schweppes_Indian_Tonic_Water_%28front_laying_down%29.jpg",
    emoji: "🥤",
  },
  {
    name: "Schweppes Soda Water",
    category: "Soft Drinks",
    subcategory: "Mixers",
    size: "33cl Can",
    packsize: 24,
    packprice: 13000,
    unitprice: 600,
    allow_single: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Schweppes_Indian_Tonic_Water_%28front_laying_down%29.jpg",
    emoji: "🥤",
  },
  {
    name: "Schweppes Bitter Lemon",
    category: "Soft Drinks",
    subcategory: "Mixers",
    size: "33cl Can",
    packsize: 24,
    packprice: 13000,
    unitprice: 600,
    allow_single: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Schweppes_Indian_Tonic_Water_%28front_laying_down%29.jpg",
    emoji: "🍋",
  },
  {
    name: "Sprite",
    category: "Soft Drinks",
    subcategory: "Soda",
    size: "50cl PET",
    packsize: 12,
    packprice: 5800,
    unitprice: 500,
    allow_single: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Sprite_bottle.JPG",
    emoji: "🟢",
  },
  {
    name: "Fanta Orange",
    category: "Soft Drinks",
    subcategory: "Soda",
    size: "50cl PET",
    packsize: 12,
    packprice: 5800,
    unitprice: 500,
    allow_single: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Fanta_1500ml.jpg",
    emoji: "🍊",
  },
  {
    name: "Ocean Spray Cranberry Juice",
    category: "Juice",
    subcategory: "Cocktail Mixer",
    size: "1 Liter",
    packsize: 12,
    packprice: 34500,
    unitprice: 3200,
    allow_single: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/2021-04-20_19_08_19_A_bottle_of_Ocean_Spray_Cranberry_Juice_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg",
    emoji: "🍒",
  },
  {
    name: "Sierra Tequila Silver (Blanco)",
    category: "Spirits",
    subcategory: "Tequila",
    size: "70cl Tequila",
    packsize: 12,
    packprice: 162000,
    unitprice: 15000,
    allow_single: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Casamigos_Blanco_Tequila_01.jpg",
    emoji: "🌵",
  },
  {
    name: "Bacardi Superior White Rum",
    category: "Spirits",
    subcategory: "Rum",
    size: "75cl White Rum",
    packsize: 6,
    packprice: 82000,
    unitprice: 15000,
    allow_single: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Bacardi_Superior.jpg",
    emoji: "🍹",
  },
  {
    name: "Smirnoff No. 21 Vodka",
    category: "Spirits",
    subcategory: "Vodka",
    size: "75cl Vodka",
    packsize: 12,
    packprice: 62000,
    unitprice: 5800,
    allow_single: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Smirnoff_vodka.jpg",
    emoji: "🍸",
  },
  {
    name: "Bardinet Triple Sec Orange Liqueur",
    category: "Syrup",
    subcategory: "Cocktail Liqueur",
    size: "70cl Liqueur",
    packsize: 6,
    packprice: 72000,
    unitprice: 13500,
    allow_single: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Triple_Sec.jpg",
    emoji: "🍊",
  },
  {
    name: "Angostura Aromatic Bitters",
    category: "Alcoholic Drink",
    subcategory: "Cocktail Bitters",
    size: "20cl Bitters",
    packsize: 12,
    packprice: 410000,
    unitprice: 36500,
    allow_single: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Angostura_aromatic_bitters_dD.jpg",
    emoji: "🪵",
  },
];

async function addDrinks() {
  console.log("Checking and inserting recommended drinks into public.products...");

  for (const item of RECOMMENDED_DRINKS) {
    // Check if item already exists by similar name
    const existing = await db.query(
      "SELECT id, name FROM public.products WHERE LOWER(name) = LOWER($1)",
      [item.name]
    );

    if (existing.rows.length > 0) {
      console.log(`Product already exists: [${existing.rows[0].id}] ${item.name} - Updating prices...`);
      await db.query(
        `UPDATE public.products 
         SET category = $1, subcategory = $2, size = $3, packsize = $4, packprice = $5, unitprice = $6, allow_single = $7, image = $8, emoji = $9
         WHERE id = $10`,
        [
          item.category,
          item.subcategory,
          item.size,
          item.packsize,
          item.packprice,
          item.unitprice,
          item.allow_single,
          item.image,
          item.emoji,
          existing.rows[0].id,
        ]
      );
    } else {
      const res = await db.query(
        `INSERT INTO public.products 
         (name, category, subcategory, size, packsize, unitprice, packprice, soldOut, image, allow_single, emoji)
         VALUES ($1, $2, $3, $4, $5, $6, $7, false, $8, $9, $10)
         RETURNING id, name`,
        [
          item.name,
          item.category,
          item.subcategory,
          item.size,
          item.packsize,
          item.unitprice,
          item.packprice,
          item.image,
          item.allow_single,
          item.emoji,
        ]
      );
      console.log(`Added new product: [${res.rows[0].id}] ${res.rows[0].name}`);
    }
  }

  const countRes = await db.query("SELECT COUNT(*) FROM public.products");
  console.log(`Total products now in database: ${countRes.rows[0].count}`);
  process.exit(0);
}

addDrinks().catch((err) => {
  console.error("Error adding drinks:", err);
  process.exit(1);
});
