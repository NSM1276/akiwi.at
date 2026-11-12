// Merges the group JSON files into one table for the owner: ALL-VENUES.csv + numbers for REPORT.md.
// Run: node docs/research/venues-2026-11/_merge.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const groups = ['g1-chains-a', 'g2-chains-b', 'g3-meidling', 'g4-vienna-restaurants', 'g5-various', 'g6-new-wien-west', 'g7-new-wien-east', 'g8-new-bundeslaender'];

const rows = [];
for (const g of groups) {
  const f = path.join(dir, `${g}.json`);
  if (!fs.existsSync(f)) { console.warn('missing', g); continue; }
  for (const v of JSON.parse(fs.readFileSync(f, 'utf8'))) rows.push({ group: g, ...v });
}

const kind = (v) => (v.id ? 'existing' : v.new_branch ? 'new_branch' : 'new');
const yn = (o) => (o && o.value === true ? 'ja' : o && o.value === false ? 'nein' : '?');
const hours = (h) => (h ? ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((d) => `${d} ${h[d] ?? '?'}`).join('; ') : '');
const cell = (s) => `"${String(s ?? '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;

const cols = ['Gruppe', 'Art', 'Akiwi-ID', 'Vorschlag-ID', 'Name', 'Status', 'Adresse', 'Telefon', 'Website', 'Halal-Beleg', 'Halal-Zitat', 'Alkohol', 'Schwein', 'Öffnungszeiten', 'Speisekarte', 'Vertrauen', 'Notizen'];
const lines = [cols.map(cell).join(';')];
for (const v of rows) {
  lines.push([
    v.group, kind(v), v.id, v.proposed_id, v.name, v.status, v.address, v.phone, v.website,
    v.halal?.evidence, v.halal?.quote, yn(v.alcohol), yn(v.pork), hours(v.hours), v.menu_url, v.confidence, v.notes,
  ].map(cell).join(';'));
}
fs.writeFileSync(path.join(dir, 'ALL-VENUES.csv'), '﻿' + lines.join('\r\n'), 'utf8');

const count = (pred) => rows.filter(pred).length;
const by = (list, key) => list.reduce((m, v) => ((m[key(v)] = (m[key(v)] || 0) + 1), m), {});
const ex = rows.filter((v) => kind(v) === 'existing');
const nw = rows.filter((v) => kind(v) !== 'existing');
console.log(JSON.stringify({
  total: rows.length,
  existing: ex.length,
  existing_status: by(ex, (v) => v.status),
  existing_halal: by(ex, (v) => v.halal?.evidence),
  new_total: nw.length,
  new_by_kind: by(nw, kind),
  new_status: by(nw, (v) => v.status),
  new_halal: by(nw, (v) => v.halal?.evidence),
  new_no_alcohol_no_pork_claim: count((v) => kind(v) === 'new' && ['venue_claim', 'certificate'].includes(v.halal?.evidence) && v.alcohol?.value === false),
}, null, 1));
