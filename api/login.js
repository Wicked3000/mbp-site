const mysql = require('mysql2/promise');

module.exports = async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Only POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    let data;
    try {
      data = body ? JSON.parse(body) : {};
    } catch {
      data = {};
    }

    const username = data.username || '';
    const password = data.password || '';

    // Hardcoded admin credentials (matching the original PHP admin panel)
    const validUsername = 'admin';
    const validPassword = 'mbp-admin-2026';

    if (username === validUsername && password === validPassword) {
      res.status(200).json({ success: true, token: 'admin-session-2026' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
};