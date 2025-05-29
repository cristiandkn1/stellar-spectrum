// src/pages/api/ots.js
import { pool } from '../../lib/db.js';

export async function GET() {
  const [rows] = await pool.query('SELECT * FROM ordenes_trabajo');
  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
