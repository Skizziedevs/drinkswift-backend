const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Health check endpoint (for Cron-job / UptimeRobot to keep Render server awake)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

const orderRoutes = require("./routes/orders");
app.use("/api/orders", orderRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const bundleRoutes = require("./routes/bundles");
app.use("/api/bundles", bundleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Crates.ng backend running on port ${PORT}`));
