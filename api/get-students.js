const mysql = require('mysql2/promise');

module.exports = async function handler(req, res) {
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

    const school = req.query.school || '';
    const grade = parseInt(req.query.grade) || 0;

    const [rows] = await connection.execute(
      'SELECT * FROM students WHERE destination_school = ? AND grade = ?',
      [school, grade]
    );

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Connection failed: ' + error.message });
  } finally {
    if (connection) await connection.end();
  }
};