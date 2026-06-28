// api/upload.js — Vercel Serverless Function
// POST /api/upload  (multipart form: category + image file)
// Stores images in Vercel Blob under portfolio/images/{category}/{filename}

import { put } from '@vercel/blob';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false });

  try {
    const form = new IncomingForm({ maxFileSize: 50 * 1024 * 1024 });
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const category = Array.isArray(fields.category) ? fields.category[0] : fields.category ?? 'uncategorized';
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!imageFile) return res.status(400).json({ success: false, message: 'No file received' });

    const ext = path.extname(imageFile.originalFilename || '.jpg') || '.jpg';
    const filename = `${Date.now()}${ext}`;
    const blobPath = `portfolio/images/${category}/${filename}`;

    const fileBuffer = fs.readFileSync(imageFile.filepath);
    const blob = await put(blobPath, fileBuffer, {
      access: 'public',
      contentType: imageFile.mimetype || 'image/jpeg',
      addRandomSuffix: false,
    });

    return res.status(200).json({ success: true, path: blob.url });
  } catch (err) {
    console.error('[upload api]', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
