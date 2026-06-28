// api/file.js — Vercel Serverless Function
// DELETE /api/file  — removes a blob-stored image
import { del } from '@vercel/blob';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'DELETE') return res.status(405).json({ success: false });

  try {
    const { filePath } = req.body ?? {};
    if (!filePath) return res.status(400).json({ success: false });
    // filePath will be the full Vercel Blob URL when on Vercel
    await del(filePath);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
