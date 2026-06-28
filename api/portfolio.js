// api/portfolio.js — Vercel Serverless Function
// GET  /api/portfolio  → returns saved portfolio data
// POST /api/portfolio  → saves portfolio data
//
// Storage strategy:
//   - On Vercel: uses @vercel/blob (set BLOB_READ_WRITE_TOKEN env var in Vercel dashboard)
//   - Locally:   falls through to server.js which handles this route instead

import { list, put, del, head } from '@vercel/blob';

const BLOB_PATHNAME = 'admin/portfolio.json';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      // Try to fetch the stored blob
      const { blobs } = await list({ prefix: 'admin/' });
      const existing = blobs.find(b => b.pathname === BLOB_PATHNAME);
      if (!existing) return res.status(200).json({ data: null });

      const response = await fetch(existing.url);
      const data = await response.json();
      return res.status(200).json({ data });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      await put(BLOB_PATHNAME, body, {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
      });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    console.error('[portfolio api]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
