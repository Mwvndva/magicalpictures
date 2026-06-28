// src/lib/api.ts
// All requests go through a relative /api path, which Vite proxies to the
// Express admin server on port 3001 in development.

const BASE = '/api';

export async function apiLogin(username: string, password: string) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function apiGetPortfolio() {
  const res = await fetch(`${BASE}/portfolio`);
  return res.json();
}

export async function apiSavePortfolio(data: unknown) {
  const res = await fetch(`${BASE}/portfolio`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function apiUploadImage(
  file: File,
  category: string,
): Promise<{ success: boolean; path?: string; message?: string }> {
  const form = new FormData();
  form.append('category', category);
  form.append('image', file);
  const res = await fetch(`${BASE}/upload`, { method: 'POST', body: form });
  return res.json();
}

export async function apiDeleteFile(filePath: string) {
  const res = await fetch(`${BASE}/file`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filePath }),
  });
  return res.json();
}
