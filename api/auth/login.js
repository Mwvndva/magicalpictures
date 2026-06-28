// api/auth/login.js  — Vercel Serverless Function
// POST /api/auth/login
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false });

  const { username, password } = req.body ?? {};
  if (username === 'jeff' && password === '123456') {
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
}
