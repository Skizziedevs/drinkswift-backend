// routes/auth.js
const jwt = require('jsonwebtoken');
const router = require('express').Router();
require('dotenv').config();


const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL, 
  password: process.env.ADMIN_PASSWORD
};

router.post('/admin-login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '8h' } // Token expires in 8 hours
    );
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;