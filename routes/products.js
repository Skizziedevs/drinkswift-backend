const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM public.products");
    res.json(result.rows); // ✅ send only the actual rows
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Create a new product
router.post("/", async (req, res) => {
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

  try {
    const result = await db.query(
      `INSERT INTO public.products 
       (name, category, size, packsize, unitprice, packprice, soldOut, image) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [name, category, size, packsize, unitprice, packprice, emoji, soldOut, image]
    );
    res.json({ id: result.rows[0].id, message: "Product created" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Update a product
router.put("/:id", async (req, res) => {
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

  try {
    await db.query(
      `UPDATE public.products 
       SET name=$1, category=$2, size=$3, packsize=$4, unitprice=$5, 
           packprice=$6, emoji=$7, soldOut=$8, image=$9 
       WHERE id=$10`,
      [
        name,
        category,
        size,
        packsize,
        unitprice,
        packprice,
        
        soldOut,
        image,
        req.params.id,
      ]
    );
    res.json({ message: "Product updated" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Delete a product
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM public.products WHERE id = $1", [req.params.id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});
module.exports = router;
