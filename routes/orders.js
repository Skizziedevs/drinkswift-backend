const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyAdmin = require("../middleware/auth");

// Auto-initialize orders table if not present
const initOrdersTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS public.orders (
        id SERIAL PRIMARY KEY,
        order_ref VARCHAR(50) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        delivery_method VARCHAR(50) NOT NULL,
        delivery_zone VARCHAR(100),
        address TEXT,
        landmark TEXT,
        items JSONB NOT NULL,
        subtotal NUMERIC NOT NULL,
        delivery_fee NUMERIC NOT NULL,
        total NUMERIC NOT NULL,
        payment_method VARCHAR(100) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
  } catch (err) {
    console.error("Failed to initialize orders table:", err);
  }
};
initOrdersTable();

// Generate unique order reference (e.g. CR-8492)
const generateOrderRef = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `CR-${random}`;
};

// Create a new order (PUBLIC: Customers submitting cart)
router.post("/", async (req, res) => {
  const {
    name,
    phone,
    deliveryMethod = "delivery",
    deliveryZone = "",
    address = "",
    landmark = "",
    items = [],
    subtotal = 0,
    deliveryFee = 0,
    total = 0,
    paymentMethod = "",
  } = req.body;

  if (!name || !phone || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Name, phone, and order items are required" });
  }

  const orderRef = generateOrderRef();

  try {
    const result = await db.query(
      `INSERT INTO public.orders 
       (order_ref, customer_name, phone, delivery_method, delivery_zone, address, landmark, items, subtotal, delivery_fee, total, payment_method) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        orderRef,
        name,
        phone,
        deliveryMethod,
        deliveryZone,
        address,
        landmark,
        JSON.stringify(items),
        subtotal,
        deliveryFee,
        total,
        paymentMethod,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(500).json({ error: "Failed to log order to database", details: err.message });
  }
});

// Get all orders (PROTECTED: Admin only)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM public.orders ORDER BY created_at DESC LIMIT 100"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Update order status (PROTECTED: Admin only)
router.patch("/:id/status", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "confirmed", "dispatched", "completed", "cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const result = await db.query(
      "UPDATE public.orders SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Failed to update order status:", err);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

module.exports = router;
