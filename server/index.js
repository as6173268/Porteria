#!/usr/bin/env node
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const cors = require('cors');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';

const app = express();
app.use(cors());
app.use(express.json());

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const STRIPS_DIR = path.join(PUBLIC_DIR, 'strips');
const DATA_FILE = path.join(PUBLIC_DIR, 'data', 'strips.json');

fs.ensureDirSync(STRIPS_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, STRIPS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '';
    const name = `strip-${Date.now()}-${Math.random().toString(36).slice(2,9)}${ext}`;
    cb(null, name);
  }
});

const upload = multer({ storage, limits: { fileSize: 200 * 1024 * 1024 } });

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'missing' });
  if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
    // very small demo token
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    return res.json({ ok: true, token });
  }
  return res.status(401).json({ ok: false });
});

app.post('/api/upload-strip', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'no file' });

    const { title = null, publishDate } = req.body || {};
    const fileName = req.file.filename;

    // Read existing strips JSON
    const data = await fs.readJson(DATA_FILE).catch(() => ({ strips: [] }));
    const ids = (data.strips || []).map(s => parseInt(String(s.id).replace(/\D/g, ''), 10)).filter(Boolean);
    const maxId = ids.length ? Math.max(...ids) : 0;
    const newId = `strip-${String(maxId + 1).padStart(3, '0')}`;

    const ext = path.extname(fileName).toLowerCase();
    const media_type = ['.mp4', '.webm', '.ogg'].includes(ext) ? 'video' : 'image';

    const newStrip = {
      id: newId,
      title: title || null,
      image_url: media_type === 'image' ? `/Porterias/strips/${fileName}` : null,
      video_url: media_type === 'video' ? `/Porterias/strips/${fileName}` : null,
      media_type,
      publish_date: publishDate || new Date().toISOString().split('T')[0]
    };

    data.strips = [newStrip].concat(data.strips || []);
    await fs.writeJson(DATA_FILE, data, { spaces: 2 });

    res.json({ ok: true, newStrip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server' });
  }
});

app.post('/api/delete-strip', express.json(), async (req, res) => {
  try {
    const { id } = req.body || {};
    if (!id) return res.status(400).json({ error: 'missing id' });

    const data = await fs.readJson(DATA_FILE).catch(() => ({ strips: [] }));
    const idx = (data.strips || []).findIndex(s => s.id === id);
    if (idx === -1) return res.status(404).json({ error: 'not found' });

    const entry = data.strips.splice(idx, 1)[0];
    // remove file if exists
    const url = entry.image_url || entry.video_url || '';
    const fileName = url.split('/').pop();
    if (fileName) {
      const p = path.join(STRIPS_DIR, fileName);
      if (await fs.pathExists(p)) await fs.remove(p);
    }

    await fs.writeJson(DATA_FILE, data, { spaces: 2 });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server' });
  }
});

// Serve static files so public/ is reachable
app.use('/', express.static(PUBLIC_DIR));

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => console.log(`Local server running on http://localhost:${PORT}`));
