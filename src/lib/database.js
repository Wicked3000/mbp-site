import mysql from 'mysql2/promise';

let pool = null;

const DEFAULT_HOST = 'caboose.proxy.rlwy.net';
const DEFAULT_PORT = 57633;
const DEFAULT_USER = 'root';
const DEFAULT_DATABASE = 'demo_db';

function parsePublicUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (!parsed.hostname) return null;
    return {
      host: parsed.hostname,
      port: parsed.port ? parseInt(parsed.port, 10) : 3306,
      user: decodeURIComponent(parsed.username || 'root'),
      password: decodeURIComponent(parsed.password || ''),
      database: decodeURIComponent((parsed.pathname || '/').replace(/^\//, '')) || DEFAULT_DATABASE,
    };
  } catch {
    return null;
  }
}

export function getPool() {
  if (!pool) {
    const fromUrl = parsePublicUrl(process.env.MYSQL_PUBLIC_URL || process.env.DATABASE_URL) || {};
    const password = process.env.DB_PASS ?? process.env.MYSQLPASSWORD ?? process.env.MYSQL_PASSWORD ?? fromUrl.password ?? '';

    pool = mysql.createPool({
      host: process.env.DB_HOST || process.env.MYSQLHOST || process.env.MYSQL_HOST || fromUrl.host || DEFAULT_HOST,
      port: parseInt(process.env.DB_PORT || process.env.MYSQLPORT || process.env.MYSQL_PORT || fromUrl.port || DEFAULT_PORT, 10),
      user: process.env.DB_USER || process.env.MYSQLUSER || process.env.MYSQL_USER || fromUrl.user || DEFAULT_USER,
      password,
      database: process.env.DB_NAME || process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || fromUrl.database || DEFAULT_DATABASE,
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
    console.log('Database connection successful');
    return rows[0].test === 1;
  } catch (error) {
    console.error('Database connection test failed:', error.message);
    return false;
  }
}