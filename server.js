const express = require("express");
const app = express();
const cors = require("cors");
const authorizeAdmin = require("./middleware/auth");
app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);
const authRoutes = require("./routes/auth");
app.use("/api/auth", authorizeAdmin, authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
