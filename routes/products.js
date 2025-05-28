const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
       console.error("Error:", err); // 👈 log it
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Create a new product
router.post("/", async (req, res) => {
  const {
    name,
    category,
    size,
    packSize,
    unitPrice,
    packPrice,
    emoji,
    soldOut,
    image,
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO products 
       (name, category, size, packSize, unitPrice, packPrice, emoji, soldOut, image) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, category, size, packSize, unitPrice, packPrice, emoji, soldOut, image]
    );
    res.json({ id: result.insertId, message: "Product created" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Update a product
router.put("/:id", async (req, res) => {
  const {
    name,
    category,
    size,
    packSize,
    unitPrice,
    packPrice,
    emoji,
    soldOut,
    image,
  } = req.body;

  try {
    await db.query(
      `UPDATE products SET name=?, category=?, size=?, packSize=?, unitPrice=?, packPrice=?, emoji=?, soldOut=?, image=? WHERE id=?`,
      [name, category, size, packSize, unitPrice, packPrice, emoji, soldOut, image, req.params.id]
    );
    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Delete a product
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
