const pool = require('../db');

async function checkProducts() {
  const ids = [15, 19, 22, 26, 28, 29, 30, 32, 35, 37, 39, 40, 41, 42, 43, 44, 45, 46, 47, 49, 50, 51, 53, 54, 55, 77, 78, 79, 80];
  const res = await pool.query(`SELECT id, name, category, subcategory, unitprice, packprice, packsize, size FROM products WHERE id = ANY($1) ORDER BY id`, [ids]);
  console.log(JSON.stringify(res.rows, null, 2));
  process.exit(0);
}

checkProducts().catch(err => {
  console.error(err);
  process.exit(1);
});
