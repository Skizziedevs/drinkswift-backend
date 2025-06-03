const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all products
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM public.products ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  const {
    name,
    category,
    size,
    packsize,
    unitprice,
    packprice,
    soldOut = false, // default value
    image = null,    // default value
  } = req.body;

  // Input validation
  if (!name || !category || unitprice === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await db.query(
      `INSERT INTO public.products 
       (name, category, size, packsize, unitprice, packprice, soldOut, image) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`, // Return all fields for confirmation
      [
        name,
        category,
        size || null,
        packsize || null,
        unitprice,
        packprice || null,
        soldOut,
        image
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

// Update a product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    category,
    size,
    packsize,
    unitprice,
    packprice,
    soldOut,
    image,
  } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const result = await db.query(
      `UPDATE public.products 
       SET name=$1, category=$2, size=$3, packsize=$4, unitprice=$5, 
           packprice=$6, soldOut=$7, image=$8 
       WHERE id=$9
       RETURNING *`,
      [
        name,
        category,
        size,
        packsize,
        unitprice,
        packprice,
        soldOut,
        image,
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

// Delete a product
router.delete("/:id", async (req, res) => {
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

module.exports = router;