const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyAdmin = require("../middleware/auth");

// Auto-verify table structure and ensure image column is TEXT (capable of holding base64 data)
const initProductsTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS public.products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        subcategory VARCHAR(100),
        size VARCHAR(100),
        packsize INT DEFAULT 1,
        unitprice NUMERIC NOT NULL,
        packprice NUMERIC,
        soldOut BOOLEAN DEFAULT false,
        image TEXT
      );
    `);
    await db.query("ALTER TABLE public.products ALTER COLUMN image TYPE TEXT;").catch(() => {});
    await db.query("ALTER TABLE public.products ADD COLUMN IF NOT EXISTS subcategory VARCHAR(100);").catch(() => {});
    await db.query("ALTER TABLE public.products ADD COLUMN IF NOT EXISTS allow_single BOOLEAN DEFAULT true;").catch(() => {});
    await db.query("ALTER TABLE public.products ADD COLUMN IF NOT EXISTS emoji VARCHAR(50);").catch(() => {});
    await db.query(`
      UPDATE public.products 
      SET allow_single = false 
      WHERE (
        category ILIKE '%soft%' OR 
        category ILIKE '%beer%' OR 
        category ILIKE '%energy%' OR 
        category ILIKE '%water%'
      ) AND (allow_single IS NULL OR allow_single = true);
    `).catch(() => {});
  } catch (err) {
    console.error("Products table init error:", err);
  }
};
initProductsTable();

// Get all products (PUBLIC: Customers browsing catalog)
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM public.products ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new product (PROTECTED: Admin only)
router.post("/", verifyAdmin, async (req, res) => {
  const {
    name,
    category,
    subcategory,
    size,
    packsize,
    unitprice,
    packprice,
    soldOut = false,
    image = null,
    allow_single = true,
    emoji = null,
  } = req.body;

  if (!name || !category || unitprice === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await db.query(
      `INSERT INTO public.products 
       (name, category, subcategory, size, packsize, unitprice, packprice, soldOut, image, allow_single, emoji) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        name,
        category,
        subcategory || null,
        size || null,
        packsize || null,
        unitprice,
        packprice || null,
        soldOut,
        image,
        allow_single !== undefined ? allow_single : true,
        emoji || null,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ 
      error: "Failed to create product",
      details: err.code === '23505' ? 'Duplicate entry' : err.message 
    });
  }
});

// Batch update product prices and stock status (PROTECTED: Admin only)
router.put("/batch-prices", verifyAdmin, async (req, res) => {
  const { updates } = req.body;
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ error: "No updates provided" });
  }

  const client = await db.connect();
  try {
    await client.query("BEGIN");
    for (const item of updates) {
      await client.query(
        `UPDATE public.products 
         SET unitprice = COALESCE($1, unitprice), 
             packprice = COALESCE($2, packprice), 
             soldOut = COALESCE($3, soldOut)
         WHERE id = $4`,
        [
          item.unitprice !== undefined ? Number(item.unitprice) : null,
          item.packprice !== undefined ? Number(item.packprice) : null,
          item.soldOut !== undefined ? item.soldOut : null,
          item.id
        ]
      );
    }
    await client.query("COMMIT");
    res.json({ message: "Successfully updated prices", count: updates.length });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Batch update error:", err);
    res.status(500).json({ error: "Failed to update prices", details: err.message });
  } finally {
    client.release();
  }
});

// Update emoji icon for a category or subcategory across products (PROTECTED: Admin only)
router.put("/category-icon", verifyAdmin, async (req, res) => {
  const { category, emoji } = req.body;
  if (!category || !emoji) {
    return res.status(400).json({ error: "Category name and emoji icon are required" });
  }

  try {
    const result = await db.query(
      `UPDATE public.products 
       SET emoji = $1 
       WHERE subcategory ILIKE $2 OR category ILIKE $2
       RETURNING id, name, category, subcategory, emoji`,
      [emoji, category]
    );

    res.json({
      message: `Updated icon for '${category}' to ${emoji}`,
      updatedCount: result.rowCount,
      products: result.rows,
    });
  } catch (err) {
    console.error("Category icon update failed:", err);
    res.status(500).json({ error: "Failed to update category icon", details: err.message });
  }
});

// Update a product (PROTECTED: Admin only)
router.put("/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const {
    name,
    category,
    subcategory,
    size,
    packsize,
    unitprice,
    packprice,
    soldOut,
    image,
    allow_single,
    emoji,
  } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const result = await db.query(
      `UPDATE public.products 
       SET name=$1, category=$2, subcategory=$3, size=$4, packsize=$5, unitprice=$6, 
           packprice=$7, soldOut=$8, image=$9, 
           allow_single=COALESCE($10, allow_single),
           emoji=COALESCE($11, emoji)
       WHERE id=$12
       RETURNING *`,
      [
        name,
        category,
        subcategory !== undefined ? (subcategory || null) : null,
        size,
        packsize,
        unitprice,
        packprice,
        soldOut,
        image,
        allow_single !== undefined ? allow_single : null,
        emoji !== undefined ? (emoji || null) : null,
        id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ 
      error: "Failed to update product",
      details: err.message 
    });
  }
});

// Delete a product (PROTECTED: Admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const result = await db.query(
      "DELETE FROM public.products WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ 
      error: "Failed to delete product",
      details: err.message 
    });
  }
});

// Batch create multiple products at once (PROTECTED: Admin only)
router.post("/batch", verifyAdmin, async (req, res) => {
  const { products } = req.body;
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "No products provided in batch array" });
  }

  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const inserted = [];
    for (const p of products) {
      if (!p.name || !p.category || p.unitprice === undefined) continue;
      const result = await client.query(
        `INSERT INTO public.products 
         (name, category, subcategory, size, packsize, unitprice, packprice, soldOut, image, allow_single, emoji) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         RETURNING *`,
        [
          p.name,
          p.category,
          p.subcategory || null,
          p.size || null,
          p.packsize || 1,
          Number(p.unitprice),
          p.packprice ? Number(p.packprice) : null,
          p.soldOut || false,
          p.image || null,
          p.allow_single !== undefined ? p.allow_single : true,
          p.emoji || null,
        ]
      );
      inserted.push(result.rows[0]);
    }
    await client.query("COMMIT");
    res.status(201).json({
      message: `Successfully imported ${inserted.length} product(s)`,
      count: inserted.length,
      products: inserted,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Batch insert error:", err);
    res.status(500).json({ error: "Failed to batch insert products", details: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;