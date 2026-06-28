// server.js  — simple Node.js HTTP server (no Express framework)
// Handles: auth, portfolio data persistence, image uploads

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const PORT       = 3001;
const DATA_DIR   = path.join(__dirname, 'data');
const DATA_FILE  = path.join(DATA_DIR, 'portfolio.json');
const PUBLIC_DIR = path.join(__dirname, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'portfolio', 'images');

// ── ensure dirs exist ─────────────────────────────────────────────────────────
if (!fs.existsSync(DATA_DIR))  fs.mkdirSync(DATA_DIR,  { recursive: true });
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

// ── tiny helpers ──────────────────────────────────────────────────────────────
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return null;
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch { return null; }
}

function writeData(obj) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), 'utf8');
}

/** Collect all request body bytes into a Buffer */
function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end',  () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

/** Parse multipart/form-data manually (simple single-file implementation) */
function parseMultipart(buffer, boundary) {
  const boundaryBuf = Buffer.from('--' + boundary);
  const CRLF = Buffer.from('\r\n');
  const parts = [];
  let start = 0;

  while (start < buffer.length) {
    const bStart = buffer.indexOf(boundaryBuf, start);
    if (bStart === -1) break;
    start = bStart + boundaryBuf.length;

    // Check for final boundary (--)
    if (buffer[start] === 45 && buffer[start + 1] === 45) break;
    // Skip CRLF after boundary line
    if (buffer[start] === 13 && buffer[start + 1] === 10) start += 2;

    // Find header/body separator (double CRLF)
    const doubleCRLF = Buffer.from('\r\n\r\n');
    const headerEnd = buffer.indexOf(doubleCRLF, start);
    if (headerEnd === -1) break;

    const rawHeaders = buffer.slice(start, headerEnd).toString();
    const bodyStart = headerEnd + 4;

    // Find next boundary start
    const nextBound = buffer.indexOf(boundaryBuf, bodyStart);
    const bodyEnd = nextBound === -1 ? buffer.length : nextBound - 2; // strip CRLF before boundary

    // Parse Content-Disposition
    const cdMatch = rawHeaders.match(/Content-Disposition:[^\r\n]*name="([^"]+)"(?:;\s*filename="([^"]*)")?/i);
    const ctMatch = rawHeaders.match(/Content-Type:\s*([^\r\n]+)/i);

    if (cdMatch) {
      parts.push({
        name:        cdMatch[1],
        filename:    cdMatch[2] || null,
        contentType: ctMatch ? ctMatch[1].trim() : 'application/octet-stream',
        data:        buffer.slice(bodyStart, bodyEnd),
      });
    }

    start = nextBound !== -1 ? nextBound : buffer.length;
  }
  return parts;
}

// ── CORS headers ──────────────────────────────────────────────────────────────
function setCORS(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function json(res, statusCode, obj) {
  setCORS(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(obj));
}

// ── router ────────────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  setCORS(res);
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url.split('?')[0];

  try {
    // POST /api/auth/login
    if (req.method === 'POST' && url === '/api/auth/login') {
      const body = await readBody(req);
      const { username, password } = JSON.parse(body.toString());
      if (username === 'jeff' && password === '123456') {
        return json(res, 200, { success: true });
      }
      return json(res, 401, { success: false, message: 'Invalid credentials' });
    }

    // GET /api/portfolio
    if (req.method === 'GET' && url === '/api/portfolio') {
      return json(res, 200, { data: readData() });
    }

    // POST /api/portfolio  — save full portfolio state
    if (req.method === 'POST' && url === '/api/portfolio') {
      const body = await readBody(req);
      writeData(JSON.parse(body.toString()));
      return json(res, 200, { success: true });
    }

    // POST /api/upload  — multipart image upload
    if (req.method === 'POST' && url === '/api/upload') {
      const ct = req.headers['content-type'] || '';
      const bmatch = ct.match(/boundary=([^\s;]+)/);
      if (!bmatch) return json(res, 400, { success: false, message: 'No boundary' });

      const buffer = await readBody(req);
      const parts  = parseMultipart(buffer, bmatch[1]);

      const catPart  = parts.find(p => p.name === 'category');
      const filePart = parts.find(p => p.name === 'image' && p.filename);

      if (!filePart) return json(res, 400, { success: false, message: 'No file part' });

      const category = catPart ? catPart.data.toString().trim() : 'uncategorized';
      const ext      = path.extname(filePart.filename || '.jpg') || '.jpg';
      const filename = `${Date.now()}${ext}`;
      const destDir  = path.join(IMAGES_DIR, category);
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

      fs.writeFileSync(path.join(destDir, filename), filePart.data);
      return json(res, 200, { success: true, path: `/portfolio/images/${category}/${filename}` });
    }

    // DELETE /api/file
    if (req.method === 'DELETE' && url === '/api/file') {
      const body = await readBody(req);
      const { filePath } = JSON.parse(body.toString());
      if (!filePath) return json(res, 400, { success: false });
      const abs = path.join(PUBLIC_DIR, filePath);
      // safety check — only allow deleting inside portfolio/images
      if (!abs.startsWith(IMAGES_DIR)) return json(res, 403, { success: false });
      if (fs.existsSync(abs)) fs.unlinkSync(abs);
      return json(res, 200, { success: true });
    }

    // 404
    json(res, 404, { message: 'Not found' });

  } catch (err) {
    console.error('[server error]', err);
    json(res, 500, { success: false, message: err.message });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Admin API → http://localhost:${PORT}`);
});
