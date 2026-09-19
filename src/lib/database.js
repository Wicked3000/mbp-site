import mysql from 'mysql2/promise';

let pool = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'hayabusa.proxy.rlwy.net',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 39501,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'railway',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 10000,
    });
  }
  return pool;
}

export async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export async function testConnection() {
  try {
    const pool = getPool();
    const [rows] = await pool.execute('SELECT 1 as test');
    return rows[0].test === 1;
  } catch (error) {
    console.error('Database connection test failed:', error.message);
    return false;
  }
}