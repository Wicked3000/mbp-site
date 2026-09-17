const mysql = require('mysql2/promise');

module.exports = async function handler(req, res) {
  // Allow CORS headers on all responses
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

  // Parse body for Vercel serverless
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    let data;
    try {
      data = body ? JSON.parse(body) : {};
    } catch {
      data = {};
    }

    let connection;
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'hayabusa.proxy.rlwy.net',
        port: process.env.DB_PORT || 39501,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'ydxqzsUvGTMEbFhBqmSJrcuPAXcKsJqS',
        database: process.env.DB_NAME || 'railway',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      if (data.name && data.email && data.message) {
        const [result] = await connection.execute(
          'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
          [data.name, data.email, data.message]
        );

        res.status(200).json({ message: 'Message sent successfully.' });
      } else {
        res.status(400).json({ message: 'Incomplete data. Please provide name, email, and message.' });
      }
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Connection failed: ' + error.message });
    } finally {
      if (connection) await connection.end();
    }
  });
};