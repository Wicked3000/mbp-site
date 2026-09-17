const mysql = require('mysql2/promise');

module.exports = async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only accept POST
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

    // Hardcoded admin credentials
    const validUsername = 'admin';
    const validPassword = 'mbp-admin-2026';

    if (username === validUsername && password === validPassword) {
      res.status(200).json({ success: true, token: 'admin-session-2026' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
};